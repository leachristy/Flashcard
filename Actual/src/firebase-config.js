

import { initializeApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//Fill With Keys
const firebaseConfig = 
{

    apiKey: process.env.REACT_APP_API_KEY,

    authDomain: process.env.REACT_APP_AUTH_DOMAIN,

    projectId: process.env.REACT_APP_PROJECT_ID,

    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

    appId: process.env.REACT_APP_APP_ID,

    measurementId: process.env.REACT_APP_MEASUREMENT_ID

};
  
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); //db can be imported into any file
export const auth = getAuth(app); //auth can be imported into any file
export const googleProvider = new GoogleAuthProvider(); //can be moved to login component

export const sanitizeForFirestorePath = (userInput) => {
    const sanitizedInput = userInput.replace(/[.*#\[\]\/$]/g, '_');
    const maxLength = 50;
    return sanitizedInput.slice(0, maxLength).trim();
}