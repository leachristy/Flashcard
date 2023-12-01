//REACT
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//USER CREATED @Hydro
import { AuthScreen } from "../components/AuthScreen";

//USER CREATE @LeothEcRz
import { FireAuthContext } from "../context/FireAuth";

//FIREBASE
import { db, auth } from '../firebase-config' 
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export const Signup = () => 
{
  const navigate = useNavigate(); //Redirector
  const userContext = useContext(FireAuthContext); //USER CONTEXT
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');

  const isValidEmail = (email) => 
  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const CreateAccountWithEmail = async () =>
  {
    if(userContext.user) //If Already Logged In. Should Be Unreachable.
    {
        console.log("already logged in")
        return;
    }

    if(userName.length < 1)
    {
      alert("Name Field Cannot be empty. ");
      return;
    }

    if(!isValidEmail(userEmail))
    {
      alert("Email Is Not Valid.");
      return;
    }

    if(userPass.length < 1)
    {
      alert("Password Cannot be empty. ");
      return;
    }

    console.log("PASSED CHECKS");

    try
    {
      const results = await createUserWithEmailAndPassword(auth, userEmail, userPass); //User firebase registration.
      const newSetDoc = doc(db, "/UserData", `${results.user.uid}`); //create userid document.
      await setDoc(newSetDoc, 
      {
          email: `"${results.user.email}"`,
          name: `${userName}`,
      });
    }
    catch(err)
    {
        console.error(err)
    }

    //On Success And when no redirect is needed then head to '/home'.
    navigate("/maindashboard");
  };


  return (
    <AuthScreen auth={"signup"}>

      <div className="w-full">

        <div className="w-full ">
          <label className="text-center text-2xl">
            Full Name: 
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter Full Name"
            className="text-xl p-2 border-2  my-2 w-full border-blue-600 rounded-2xl"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="w-full ">
          <label className=" text-center text-2xl">
            Email
          </label>
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            className="text-xl p-2 border-2  my-2 w-full border-blue-600 rounded-2xl"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="w-full ">
          <label className=" text-center text-2xl">
            Password
          </label>
          <br />
          <input
            placeholder="Enter Password"
            type="password"
            className="text-xl p-2 border-2  my-2 w-full border-blue-600 rounded-2xl"
            onChange={(e) => setUserPass(e.target.value)}
          />
        </div>

        <div className="mt-2 flex flex-col w-[100%]  items-center justify-center pt-2 pb-6 gap-4 px-10">
              
          <button 
            className="p-2 border-2 bg-blue-800 hover:bg-blue-400 block w-[100%] text-white capitalize rounded-3xl px-6 text-2xl"
            onClick={CreateAccountWithEmail}>
              Create Account
          </button>

        </div>

      </div>
    </AuthScreen>
  );
};
