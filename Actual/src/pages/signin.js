//REACT
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//FIREBASE
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { FireAuthContext } from "../context/FireAuth";
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth, googleProvider } from '../firebase-config' 

//USER CREATED @Hydro
import { AuthScreen } from "../components/AuthScreen";

export const Signin = () => 
{
  const [userEmail, setUserEmail] = useState(''); //Email Field State
  const [userPass, setUserPass] = useState(''); //Pass Field State
  
  const userContext = useContext( FireAuthContext ); // USER CONTEXT
  const navigate = useNavigate(); //Redirector

  const SignInWithEmail = async () =>
  {    
    if(userContext.currentUser) //If Already Logged In. Should Be Unreachable.
    {
        console.log("already logged in")
        return;
    }
    try
    {
        const results = await signInWithEmailAndPassword(auth, userEmail, userPass); //Use firebase Login
        console.log(results);
        console.log(auth);
    }
    catch(err)
    {
        console.error(err)
        //TODO HANDLE ERRORS
            //WRONG PASSWORD
            //UNKNOWN EMAIL
            //OTHER
    }
    //On Success And when no redirect is needed then head to '/home'.
    navigate("/maindashboard");
  }

  /**
     * Search DB for /UserData/userId.
     * If it exist then the user is not new.
     * @param {String} userId 
     * @returns 
     */
  const checkIfFirstSignIn = async (userId) => {
    // Use Firestore or another storage mechanism to check if it's the user's first sign-in
    const newSetDoc = await getDoc( doc(db, "/UserData", `${userId}`) );
    return !newSetDoc;
  };

  /**
   * Signs in With Google
   * @returns 
   */
  const SignInWithGoogle = async () =>
  {
    console.log(userContext);
    if(userContext.user) //If Already Logged In. Should Be Unreachable.
    {
        console.log("already logged in")
        return;
    }

    try
    {
        const results = await signInWithPopup(auth, googleProvider); //Use firebase Popup for Google Login
        
        if ( checkIfFirstSignIn(results.user.uid) ) //Check if first time
        {
            const newSetDoc = doc(db, "/UserData", `${results.user.uid}`);
            await setDoc(newSetDoc, 
            {
                email: `"${results.user.email}"`,
                name: "UNSET",
            });
        }
    }
    catch(err)
    {
        console.error(err)
        //TODO HANDLE ERRORS
    }
    //On Success And when no redirect is needed then head to '/home'.
    navigate("/maindashboard");
  };
  
  return (

    <AuthScreen auth={"signin"}>
      
        <div className="w-full mb-4">

          <label className="text-center text-2xl"> Email: </label>
          <br />
          <input

            className="text-xl p-2 border-2  my-2 w-full border-blue-600 rounded-2xl"
            type="text"
            placeholder="Enter Email..."
            onChange={(e) => setUserEmail(e.target.value)}
          />

        </div>

        <div className="w-full">
          
          <label className=" text-center text-2xl"> Password: </label>
          <br />
          <input
            className="text-xl p-2 border-2  my-2 w-full border-blue-600 rounded-2xl"
            type="password"
            placeholder="Enter Password..."
            onChange={(e) => setUserPass(e.target.value)}
          />
          
          <div className="mt-2 flex flex-col w-[100%]  items-center justify-center pt-2 pb-6 gap-4 px-10">
              
              <button 
                className="p-2 border-2 bg-blue-800 hover:bg-blue-400 block w-[100%] text-white capitalize rounded-3xl px-6 text-2xl"
                onClick={SignInWithEmail}>
                  Sign In
              </button>

              <button
                className="p-2 border-2 bg-blue-800 hover:bg-blue-400 block w-[100%] text-white capitalize rounded-3xl px-6 text-2xl"
                onClick={SignInWithGoogle}>
                  Sign In With Google
              </button> 

          </div>
          
        </div>

    </AuthScreen>
  );
};
