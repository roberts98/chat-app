import firebase from 'firebase/app';
import 'firebase/auth';

import { auth, firestore } from './';

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export function signInWithGoogle() {
  auth.signInWithPopup(googleProvider);
}
export function signOut() {
  auth.signOut();
}

export async function createUserDocument(user, additionalData) {
  if (!user) return null;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error while creating user', { error });
    }
  }

  return userRef;
}
