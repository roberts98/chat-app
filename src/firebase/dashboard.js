import { v4 as uuid } from 'uuid';

import firebase, { firestore } from './';

export async function getAllUsers() {
  const snapshot = await firestore.collection('users').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllUsersExceptLoggedInUser(user) {
  const snapshot = await firestore.collection('users').get();
  return snapshot.docs
    .filter(doc => doc.id !== user.id)
    .map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createChat(name, member) {
  const chatRef = await firestore
    .collection('chats')
    .add({ name, members: [member] });
  try {
    await firestore
      .doc(`userChats/${member}`)
      .update({ chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id) });
  } catch (error) {
    await firestore
      .doc(`userChats/${member}`)
      .set({ chats: firebase.firestore.FieldValue.arrayUnion(chatRef.id) });
  }
}

export async function getChat(id) {
  return firestore.doc(`chats/${id}`).get();
}

export async function sendMessage(chatId, message) {
  const chatRef = firestore.doc(`chats/${chatId}`);
  const chatMessagesRef = firestore.doc(`chatMessages/${chatId}`);
  const messageId = uuid();

  try {
    chatMessagesRef.update({ [messageId]: { ...message, date: new Date() } });
  } catch (error) {
    chatMessagesRef.set({ [messageId]: { ...message, date: new Date() } });
  }

  chatRef.update({ lastMessageId: messageId });
}

export async function getMessages(chatId) {
  return firestore.collection(`chats/${chatId}/messages`).get();
}
