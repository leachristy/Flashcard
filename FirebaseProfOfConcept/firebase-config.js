
import { initializeApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//Fill With Keys
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
  
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); //db can be imported into any file
export const auth = getAuth(app); //auth can be imported into any file
export const googleProvider = new GoogleAuthProvider(); //can be moved to login component
