// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6l6Et0J_CIHYCqKvjXDbhRQ-UnduC9iE",
  authDomain: "mealplan-7171f.firebaseapp.com",
  projectId: "mealplan-7171f",
  storageBucket: "mealplan-7171f.appspot.com",
  messagingSenderId: "648339305396",
  appId: "1:648339305396:web:3d55900eea3f885778b8e1",
  measurementId: "G-9D074G685D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
