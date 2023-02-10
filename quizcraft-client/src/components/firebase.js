// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyButnK-Dk8UHulxj3lRrXp3cjRLKWdtz5o",
  authDomain: "ga-project-quizcraft.firebaseapp.com",
  projectId: "ga-project-quizcraft",
  storageBucket: "ga-project-quizcraft.appspot.com",
  messagingSenderId: "937516728945",
  appId: "1:937516728945:web:0c048ff474bc2ac35551d0",
  measurementId: "G-NL0RSD8BZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;