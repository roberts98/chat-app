import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC6bZkVAAosV6zeFwq2zVj_ikhH10YQvQA',
  authDomain: 'chat-app-3172e.firebaseapp.com',
  databaseURL: 'https://chat-app-3172e.firebaseio.com',
  projectId: 'chat-app-3172e',
  storageBucket: 'chat-app-3172e.appspot.com',
  messagingSenderId: '772415789067',
  appId: '1:772415789067:web:067b7908cc2d363ca18f0e',
  measurementId: 'G-G616HDX65N'
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export function signInWithGoogle() {
  auth.signInWithPopup(googleProvider);
}
export function signOut() {
  auth.signOut();
}

export default firebase;
