import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBHKdCVihDOuV38ULHx1LjMlMkNWvzwmB8",
    authDomain: "imessage-clone-a5696.firebaseapp.com",
    projectId: "imessage-clone-a5696",
    storageBucket: "imessage-clone-a5696.appspot.com",
    messagingSenderId: "817555396385",
    appId: "1:817555396385:web:fdb2c138f5e0574c021060"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { provider , auth }
export default db;