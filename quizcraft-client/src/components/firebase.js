import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymousl, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyButnK-Dk8UHulxj3lRrXp3cjRLKWdtz5o",
  authDomain: "ga-project-quizcraft.firebaseapp.com",
  projectId: "ga-project-quizcraft",
  storageBucket: "ga-project-quizcraft.appspot.com",
  messagingSenderId: "937516728945",
  appId: "1:937516728945:web:0c048ff474bc2ac35551d0",
  measurementId: "G-NL0RSD8BZ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
export const usersRef = collection(db, "users");

// Initialize Firebase Authentication and get a reference to the service
export { auth, database, db };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app);
