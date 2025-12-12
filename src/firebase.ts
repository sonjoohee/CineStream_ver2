// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-disneyplus-8ca34.firebaseapp.com",
  projectId: "react-disneyplus-8ca34",
  storageBucket: "react-disneyplus-8ca34.appspot.com",
  messagingSenderId: "919519917012",
  appId: "1:919519917012:web:851dbd589746aab2a6dc41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;