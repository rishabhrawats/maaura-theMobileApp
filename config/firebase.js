import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: 'your-web-client-id', // Get this from Firebase Console
});

export { auth, GoogleSignin };
