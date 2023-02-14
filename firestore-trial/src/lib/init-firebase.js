// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBp4VPOazJefdY6aZZ6BHzGVhpYUETmATw",
    authDomain: "tutorial-10f76.firebaseapp.com",
    projectId: "tutorial-10f76",
    storageBucket: "tutorial-10f76.appspot.com",
    messagingSenderId: "380461698842",
    appId: "1:380461698842:web:5f9193906247598cc326a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);