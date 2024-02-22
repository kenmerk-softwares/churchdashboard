import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
apiKey: "AIzaSyAUYCdQgWC90s0NmtvJPhC3W1eP9Cl8CF8",
  authDomain: "church-aead4.firebaseapp.com",
  projectId: "church-aead4",
  storageBucket: "church-aead4.appspot.com",
  messagingSenderId: "374592208793",
  appId: "1:374592208793:web:c83205c26d42236c9e9d08",
  measurementId: "G-832KH367N4"
};
//const apikey = process.env.REACT_APP_APIKEY;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app,db };