// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-bafbe.firebaseapp.com",
  projectId: "blog-app-bafbe",
  storageBucket: "blog-app-bafbe.appspot.com",
  messagingSenderId: "191788614032",
  appId: "1:191788614032:web:53540f510f80dc3ab27315",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
