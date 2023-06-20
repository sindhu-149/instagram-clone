import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; 
import 'firebase/compat/auth';
import 'firebase/compat/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyDbOd6OuSKsdj6nHbCPZ9Jz4_P0WvyK-JE",
    authDomain: "instagram-clone-33b05.firebaseapp.com",
    databaseURL: "https://instagram-clone-33b05-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-33b05",
    storageBucket: "instagram-clone-33b05.appspot.com",
    messagingSenderId: "999726797213",
    appId: "1:999726797213:web:5ba2373b46014e14095f74"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
