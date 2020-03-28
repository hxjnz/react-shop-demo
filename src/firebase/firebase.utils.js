import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDk1-mrXV4T6HggrYTDSlvYpEIj2En6a1c",
    authDomain: "crwn-db-eric.firebaseapp.com",
    databaseURL: "https://crwn-db-eric.firebaseio.com",
    projectId: "crwn-db-eric",
    storageBucket: "crwn-db-eric.appspot.com",
    messagingSenderId: "888228394578",
    appId: "1:888228394578:web:114bebec501a6c0f11118b"
  };

  firebase.initializeApp(config)

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth
      const createAt = new Date()
      try {
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      } catch (error) {
        console.log(error)
      }
    }

    return userRef
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;