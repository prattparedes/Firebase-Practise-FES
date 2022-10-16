// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products t;hat you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpKRH0tDNWFv9Hcbjga7PhKsUyLdquSC0",
  authDomain: "fir-practise-fes.firebaseapp.com",
  projectId: "fir-practise-fes",
  storageBucket: "fir-practise-fes.appspot.com",
  messagingSenderId: "383713631305",
  appId: "1:383713631305:web:94f68575e0e54f632bb398"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();