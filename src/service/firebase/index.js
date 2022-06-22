// Import the functions you need from the SDKs you need
import {getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcAiwzWauSnRabwEifNrljjIt0EanNnCs",
  authDomain: "ecommerce-d45b4.firebaseapp.com",
  projectId: "ecommerce-d45b4",
  storageBucket: "ecommerce-d45b4.appspot.com",
  messagingSenderId: "207475851197",
  appId: "1:207475851197:web:98ae64f6954382edcc5cd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)