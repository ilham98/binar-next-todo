// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaP6qpBJpvi9qUpl9z2bDm-7ep-uJ8MQc",
  authDomain: "todo-f7eeb.firebaseapp.com",
  projectId: "todo-f7eeb",
  storageBucket: "todo-f7eeb.appspot.com",
  messagingSenderId: "287429476925",
  appId: "1:287429476925:web:4413ea7b4cd06839d4a054",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
