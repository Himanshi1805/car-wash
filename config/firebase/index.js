import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALLF_E0kh-Mi-3pI8EuWiMSHtW3W3kyWM",
  authDomain: "urban-car-wash.firebaseapp.com",
  projectId: "urban-car-wash",
  storageBucket: "urban-car-wash.appspot.com",
  messagingSenderId: "497078328524",
  appId: "1:497078328524:web:0d13022e9a257305453669"
};


let app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, db, auth };
