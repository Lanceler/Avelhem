// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1o2bknIRQZ88DEdqMSy3K-9XqzSifEUY",
  authDomain: "avelhem-war-of-the-sovereigns.firebaseapp.com",
  projectId: "avelhem-war-of-the-sovereigns",
  storageBucket: "avelhem-war-of-the-sovereigns.appspot.com",
  messagingSenderId: "67921910833",
  appId: "1:67921910833:web:c23cb60da9003b20184910",
  measurementId: "G-B5HZZ01F5W",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
