// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Ini bisa diganti nanti kalo udah mau ganti project
const firebaseConfig = {
  apiKey: "AIzaSyCT9KGp43SVj4Qq7tNGjdeKi7yAf6-JL5w",
  authDomain: "alumni-template-target-mentari.firebaseapp.com",
  projectId: "alumni-template-target-mentari",
  storageBucket: "alumni-template-target-mentari.appspot.com",
  messagingSenderId: "230175930310",
  appId: "1:230175930310:web:3bfddf00eea017e4e6a4c7",
};

// Initialize Firebase

export default async function () {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return { auth };
}
