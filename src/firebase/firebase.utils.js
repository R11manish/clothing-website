import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCw1-ajRswZy8TZCgHEMT-owhUi5vLpqXQ',
  authDomain: 'crwn-app-7eb9a.firebaseapp.com',
  projectId: 'crwn-app-7eb9a',
  storageBucket: 'crwn-app-7eb9a.appspot.com',
  messagingSenderId: '549964142354',
  appId: '1:549964142354:web:56ebf21936af350cacc5cb',
  measurementId: 'G-HGNNQXJ83H',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
