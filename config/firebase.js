import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import auth for authentication
import 'firebase/compat/firestore';  // Import Firestore for Firestore services

const firebaseConfig = {
  apiKey: "AIzaSyBHF0EtCrDHnodw-SLzCyGwB6z3apSFgNY",
  authDomain: "maaura-8caa9.firebaseapp.com",
  projectId: "maaura-8caa9",
  storageBucket: "maaura-8caa9.appspot.com",
  messagingSenderId: "1033476075965",
  appId: "1:1033476075965:web:b384d9de19c448af90a2d4",
  measurementId: "G-HZ7PPPBQM9"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // If Firebase is already initialized
}

export const auth = firebase.auth();  // Firebase Authentication
export const firestore = firebase.firestore();  // Firestore Service
