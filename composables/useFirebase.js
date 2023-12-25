// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Ini bisa diganti nanti kalo udah mau ganti project
const firebaseConfig = {
  apiKey: "AIzaSyCALhmppTWGO8DcP0Vt8nNXmgaxW0giP_E",
  authDomain: "letscvit.firebaseapp.com",
  projectId: "letscvit",
  storageBucket: "letscvit.appspot.com",
  messagingSenderId: "895378550028",
  appId: "1:895378550028:web:9ed1972f3e96c34a09ad29",
  measurementId: "G-B4Z65Y3XZ1",
};

// Initialize Firebase

export default async function () {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  return { auth, db };
}
