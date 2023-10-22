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
  apiKey: "AIzaSyDFWU8hI37p7oEQATz8Na0Dxo8LVnR438w",
  authDomain: "vaa-hackster.firebaseapp.com",
  databaseURL: "https://vaa-hackster-default-rtdb.firebaseio.com",
  projectId: "vaa-hackster",
  storageBucket: "vaa-hackster.appspot.com",
  messagingSenderId: "112101191220",
  appId: "1:112101191220:web:0822fab7f1c4410802e461",
  measurementId: "G-MWYH4M16DW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};
