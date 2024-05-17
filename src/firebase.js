// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKCZSNXXelTAy12JC8dbOO7U95SAnYzzc",
  authDomain: "my-map-app-f307a.firebaseapp.com",
  projectId: "my-map-app-f307a",
  storageBucket: "my-map-app-f307a.appspot.com",
  messagingSenderId: "490482570562",
  appId: "1:490482570562:web:497a44c2f248d67549a4db",
  measurementId: "G-3NWR36FMH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);