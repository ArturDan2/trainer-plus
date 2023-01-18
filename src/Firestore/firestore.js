import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSxEXhtfnzWCQU1CGESi4Je51uQVLAQyc",
  authDomain: "trainer-plus-dc05c.firebaseapp.com",
  projectId: "trainer-plus-dc05c",
  storageBucket: "trainer-plus-dc05c.appspot.com",
  messagingSenderId: "475624783732",
  appId: "1:475624783732:web:73d0564bb7867ceac4b621",
  measurementId: "G-EVZR6P0SCB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
