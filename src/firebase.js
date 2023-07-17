import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import {collection,addDoc} from "firebase/firestore";  
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAFwguJuTtplyjeDbx5ZR6ahWS8z2jyqnk",
  authDomain: "minor2-ac0d8.firebaseapp.com",
  projectId: "minor2-ac0d8",
  storageBucket: "minor2-ac0d8.appspot.com",
  messagingSenderId: "917552159930",
  appId: "1:917552159930:web:0dc8c62cee259d5e79f683",
  measurementId: "G-YH2GF2VVW0"
};
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
  export { db ,provider,auth,storage};

  
  // we will use firebase hooks
  