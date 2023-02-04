// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDUpzEP5fOJ9ruZQzE3gkO1PHnh9ihncBU",
    authDomain: "vaa-hackster-50d63.firebaseapp.com",
    databaseURL: "https://vaa-hackster-50d63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vaa-hackster-50d63",
    storageBucket: "vaa-hackster-50d63.appspot.com",
    messagingSenderId: "346246793449",
    appId: "1:346246793449:web:8e8375c05913130cb28878",
    measurementId: "G-DVC586K4MB"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};