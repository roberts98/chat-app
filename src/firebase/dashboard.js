import { v4 as uuid } from 'uuid';

import firebase, { firestore } from './';

export async function getAllUsers() {
  const snapshot = await firestore.collection('users').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllUsersExceptLoggedInUser(userId) {
  const snapshot = await firestore.collection('users').get();
  return snapshot.docs
    .filter(doc => doc.id !== userId)
    .map(doc => ({ id: doc.id, ...doc.data() }));
}

async function createChat(requestorId, receipentId) {
  const chatRef = await firestore
    .collection('chats')
    .add({ members: [requestorId, receipentId] });
  try {
    await firestore
      .doc(`userChats/${requestorId}`)
      .update({ chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id) });
    await firestore
      .doc(`userChats/${receipentId}`)
      .update({ chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id) });
  } catch (error) {
    await firestore
      .doc(`userChats/${requestorId}`)
      .set({ chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id) });
    await firestore
      .doc(`userChats/${receipentId}`)
      .set({ chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id) });
  }
}

export async function getChat(id) {
  return firestore.doc(`chats/${id}`).get();
}

export async function sendMessage(chatId, message) {
  const chatRef = firestore.doc(`chats/${chatId}`);
  const chatMessagesRef = firestore.doc(`chatMessages/${chatId}`);
  const chatMessagesSnapshot = await chatMessagesRef.get();
  const messageId = uuid();
  chatRef.update({ lastMessageId: messageId });

  if (!chatMessagesSnapshot.exists) {
    return chatMessagesRef.set({
      [messageId]: { ...message, date: new Date() }
    });
  }

  chatMessagesRef.update({ [messageId]: { ...message, date: new Date() } });
}

export async function getMessages(chatId) {
  return firestore.collection(`chats/${chatId}/messages`).get();
}

export async function getAvailableUsers(userId) {
  const allUsers = await getAllUsersExceptLoggedInUser(userId);
  const connectedUsersIds = [];
  const userChatsSnapshot = await firestore.doc(`userChats/${userId}`).get();
  const userChatsIds = userChatsSnapshot.data()?.chats || [];

  await Promise.all(
    userChatsIds.map(async chatId => {
      const chatSnapshot = await firestore.doc(`chats/${chatId}`).get();
      const { members } = chatSnapshot.data();
      const connectedUserId = members.filter(
        memberId => memberId !== userId
      )[0];

      if (connectedUserId) {
        connectedUsersIds.push(connectedUserId);
      }
    })
  );

  const availableUsers = allUsers.filter(
    user => connectedUsersIds.indexOf(user.id) === -1
  );

  return availableUsers;
}

export async function createChatProposal(requestorId, receipentId) {
  const requestorRef = firestore.doc(`users/${requestorId}`);
  const receipentRef = firestore.doc(`users/${receipentId}`);

  await requestorRef
    .collection('chatProposals')
    .add({ receipentId, isMine: true, date: new Date() });
  await receipentRef
    .collection('chatProposals')
    .add({ requestorId, isMine: false, date: new Date() });
}

async function deleteProposal(requestorId, userId) {
  const userProposalSnapshot = await firestore
    .collection(`users/${userId}/chatProposals`)
    .where('requestorId', '==', requestorId)
    .get();
  const requestorProposalSnapshot = await firestore
    .collection(`users/${requestorId}/chatProposals`)
    .where('receipentId', '==', userId)
    .get();

  userProposalSnapshot.forEach(doc => doc.ref.delete());
  requestorProposalSnapshot.forEach(doc => doc.ref.delete());
}

export async function acceptProposal(requestorId) {
  const userId = firebase.auth().currentUser.uid;
  await deleteProposal(requestorId, userId);
  await createChat(requestorId, userId);
}

export async function declineProposal(requestorId) {
  const userId = firebase.auth().currentUser.uid;
  await deleteProposal(requestorId, userId);
}
