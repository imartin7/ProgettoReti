// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsrxQrcmHupjzEHghaMELJL0INUJQ6OQs",
  authDomain: "todays-rrr-2022i.firebaseapp.com",
  projectId: "todays-rrr-2022i",
  storageBucket: "todays-rrr-2022i.appspot.com",
  messagingSenderId: "219184974337",
  appId: "1:219184974337:web:9f4ff6f8af939ebe38ce00",
  measurementId: "G-BLXP9JL7J9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);