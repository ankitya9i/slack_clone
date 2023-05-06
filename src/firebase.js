import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import {collection,addDoc} from "firebase/firestore";  
const firebaseConfig = {
    apiKey: "AIzaSyAKEZvvXZQlHEWap4v9sWhqKVf4_z3Drqk",
    authDomain: "projecteasy-c893c.firebaseapp.com",
    projectId: "projecteasy-c893c",
    storageBucket: "projecteasy-c893c.appspot.com",
    messagingSenderId: "193773942817",
    appId: "1:193773942817:web:c93f3564050516b8714b60"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
const provider = new GoogleAuthProvider();
  export { db ,provider,auth};
  
  // we will use firebase hooks
  