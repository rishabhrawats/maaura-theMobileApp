// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBHF0EtCrDHnodw-SLzCyGwB6z3apSFgNY",
  authDomain: "maaura-8caa9.firebaseapp.com",
  projectId: "maaura-8caa9",
  storageBucket: "maaura-8caa9.appspot.com", // Make sure the URL is correct
  messagingSenderId: "1033476075965",
  appId: "1:1033476075965:web:b384d9de19c448af90a2d4",
  measurementId: "G-HZ7PPPBQM9"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
