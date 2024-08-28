// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQzqJapGRz25Zs6Qt5OIbGzGKbIpy44_s",
  authDomain: "proyecto-integrador-80db4.firebaseapp.com",
  projectId: "proyecto-integrador-80db4",
  storageBucket: "proyecto-integrador-80db4.appspot.com",
  messagingSenderId: "346920162516",
  appId: "1:346920162516:web:4f8bb817134e6e2e585741",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
