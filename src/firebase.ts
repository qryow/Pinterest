import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: 'AIzaSyAF9PIN-4wpOA32mQEIFXcHk_bgYNxN7UE',
  authDomain: 'pinterest-d7fd9.firebaseapp.com',
  projectId: 'pinterest-d7fd9',
  storageBucket: 'pinterest-d7fd9.appspot.com',
  messagingSenderId: '456035939580',
  appId: '1:456035939580:web:506e00fbf984483b7d5379',
  measurementId: 'G-53FE9WT6MS',
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage }

auth.languageCode = 'en'