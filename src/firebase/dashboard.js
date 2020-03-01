import { v4 as uuid } from 'uuid';

import firebase, { firestore } from './';

export async function getAllUsersExceptLoggedInUser(userId) {
  const snapshot = await firestore.collection('users').get();
  return snapshot.docs
    .filter(doc => doc.id !== userId)
    .map(doc => ({ id: doc.id, ...doc.data() }));
}

async function createChat(requestorId, receipentId) {
  try {
    const chatRef = await firestore
      .collection('chats')
      .add({ members: [requestorId, receipentId] });
    const requestorChatSnapshot = await firestore
      .doc(`userChats/${requestorId}`)
      .get();
    const receipentChatSnapshot = await firestore
      .doc(`userChats/${receipentId}`)
      .get();

    if (requestorChatSnapshot.exists) {
      await requestorChatSnapshot.ref.update({
        chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id)
      });
    } else {
      await requestorChatSnapshot.ref.set({
        chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id)
      });
    }

    if (receipentChatSnapshot.exists) {
      await receipentChatSnapshot.ref.update({
        chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id)
      });
    } else {
      await receipentChatSnapshot.ref.set({
        chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id)
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getChat(id) {
  return firestore.doc(`chats/${id}`).get();
}

export async function getChatData(id) {
  const snapshot = await getChat(id);
  return snapshot.data();
}

export async function sendMessage(chatId, message) {
  const chatRef = firestore.doc(`chats/${chatId}`);
  const chatMessagesRef = firestore.doc(`chatMessages/${chatId}`);
  const chatMessagesSnapshot = await chatMessagesRef.get();
  const messageId = uuid();

  if (!chatMessagesSnapshot.exists) {
    chatMessagesRef.set({
      [messageId]: { ...message, date: new Date() }
    });
  } else {
    chatMessagesRef.update({
      [messageId]: { ...message, date: new Date() }
    });
  }

  chatRef.update({ lastMessageId: messageId });
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
  try {
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
  } catch (error) {
    console.log(error);
  }
}

export async function acceptProposal(requestorId) {
  const userId = firebase.auth().currentUser.uid;
  try {
    await createChat(requestorId, userId);
    await deleteProposal(requestorId, userId);
  } catch (error) {
    console.log(error);
  }
}

export async function declineProposal(requestorId) {
  const userId = firebase.auth().currentUser.uid;
  await deleteProposal(requestorId, userId);
}

export function userChatSubscriber(userId, callback) {
  return firestore.doc(`userChats/${userId}`).onSnapshot(snapshot => {
    if (!snapshot.data()) {
      return callback([]);
    }

    const { chats } = snapshot.data();
    callback(chats);
  });
}

export function chatSubscriber(chatId, userId, callback) {
  return firestore.doc(`chats/${chatId}`).onSnapshot(snapshot => {
    const { lastMessageId } = snapshot.data();
    const receipentId = snapshot
      .data()
      .members.filter(memberId => memberId !== userId)[0];

    callback(lastMessageId, receipentId);
  });
}

export async function getUserData(userId) {
  const userSnapshot = await firestore.doc(`/users/${userId}`).get();
  return userSnapshot.data();
}

export async function getChatMessagesData(chatId) {
  const chatMessagesSnapshot = await firestore
    .doc(`/chatMessages/${chatId}`)
    .get();
  return chatMessagesSnapshot.data();
}

export function messagesSubscriber(chatId, callback) {
  return firestore.doc(`chatMessages/${chatId}`).onSnapshot(snapshot => {
    const data = snapshot.data();

    if (!data) {
      return callback([]);
    }

    const messages = Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
    const sortedMessages = messages.sort(
      (a, b) => a.date.seconds - b.date.seconds
    );

    callback(sortedMessages);
  });
}

export function proposalsSubscriber(userId, callback) {
  return firestore
    .collection(`users/${userId}/chatProposals`)
    .onSnapshot(snapshot => {
      const proposals = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      callback(proposals);
    });
}
