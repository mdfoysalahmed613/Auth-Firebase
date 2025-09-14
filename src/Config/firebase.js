// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6uUPHdKruVL0-M-FUtYOJV6UFJCKbvHY",
  authDomain: "authenticaion-b6e2e.firebaseapp.com",
  projectId: "authenticaion-b6e2e",
  storageBucket: "authenticaion-b6e2e.firebasestorage.app",
  messagingSenderId: "645218129564",
  appId: "1:645218129564:web:6cc263d5bb57cdeba13f59",
  measurementId: "G-55V25LBPS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;