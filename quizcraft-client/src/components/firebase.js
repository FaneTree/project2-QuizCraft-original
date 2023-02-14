import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymousl, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxO9JBNdopZ7uLmdFqnMV_MgbIie2yA5g",
  authDomain: "chatroom-505af.firebaseapp.com",
  projectId: "chatroom-505af",
  storageBucket: "chatroom-505af.appspot.com",
  messagingSenderId: "129729820912",
  appId: "1:129729820912:web:600863400a1ab63ac72a35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Initialize Firebase Authentication and get a reference to the service
export { auth, database, db };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app);
