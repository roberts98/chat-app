import { firestore } from './';

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

export async function createChat(name, members) {
  const chat = await firestore.collection('chats').add({ name });

  members.forEach(member => {
    chat.collection('members').add({ member });
  });
}

export async function getChat(id) {
  return firestore.doc(`chats/${id}`).get();
}

export async function sendMessage(chatId, message) {
  const chatRef = firestore.doc(`chats/${chatId}`);

  chatRef.collection('/messages').add({ message });
}

export async function getMessages(chatId) {
  return firestore.collection(`chats/${chatId}/messages`).get();
}
