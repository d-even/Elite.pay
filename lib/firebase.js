// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Placeholder auth functions
export const handleLogin = async (email, password) => {
  console.log('Login called:', email);
  // TODO: signInWithEmailAndPassword(auth, email, password)
};

export const handleSignup = async (username, email, password) => {
  console.log('Signup called:', username, email);
  // TODO: createUserWithEmailAndPassword(auth, email, password)
};

export const handleLogout = async () => {
  console.log('Logout called');
  // TODO: signOut(auth)
};