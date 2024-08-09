// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKGYu5xj8qO0AoZr5LsX8HDEPymyZuJSU",
  authDomain: "cam-millwork-design-portal.firebaseapp.com",
  projectId: "cam-millwork-design-portal",
  storageBucket: "cam-millwork-design-portal.appspot.com",
  messagingSenderId: "653912235719",
  appId: "1:653912235719:web:3ff25a66f94169290ea8e2",
  measurementId: "G-6G7MW7ZZ98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Use 'db' as a common alias for Firestore
const storage = getStorage(app); // Initialize Firebase Storage


// Export the initialized services
export { auth, db, storage };
