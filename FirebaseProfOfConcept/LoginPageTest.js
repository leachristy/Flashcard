import React, { useEffect, useContext, useState } from "react";
import {useLocation, useNavigate} from 'react-router'

import { db, auth, googleProvider } from '../firebase-config' 
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';

import { UserContext } from "../App";

const LoginPage = () =>
{

    const { userAuth, setUserAuth } = useContext(UserContext); // Grab User Context To Update If Successfull
    const navigate = useNavigate(); //Redirector
    const location = useLocation(); //Location State Data
    
    const [userEmail, setUserEmail] = useState(''); //Email Field State
    const [userPass, setUserPass] = useState(''); //Pass Field State

    /**
     * Search DB for /UserData/userId.
     * If it exist then the user is not new.
     * @param {String} userId 
     * @returns 
     */
    const checkIfFirstSignIn = async (userId) => {
        // Use Firestore or another storage mechanism to check if it's the user's first sign-in
        const newSetDoc = await getDoc( doc(db, "/UserData", `${userID}`) );
        return !newSetDoc;
      };

    /**
     * Signs in With Google
     * @returns 
     */
    const signInwithGoogle = async () =>
    {
        if(userAuth.isLoggedIn) //If Already Logged In. Should Be Unreachable.
        {
            console.log("already logged in")
            return;
        }

        try
        {
            const results = await signInWithPopup(auth, googleProvider); //Use firebase Popup for Google Login
            setUserAuth({ isLoggedIn:true }); //Set State
            if ( checkIfFirstSignIn(results.user.uid) ) //Check if first time
            {
                const newSetDoc = doc(db, "/UserData", `${results.user.uid}`);
                await setDoc(newSetDoc, 
                {
                    name: `"${results.user.email}"`,
                });
            }
            if(location.state?.from) // If the user was redirected to login page send them back to page with auth.
            {
                navigate(location.state.from);
            }
        }
        catch(err)
        {
            console.error(err)
            //TODO HANDLE ERRORS
        }
        //On Success And when no redirect is needed then head to '/home'.
        navigate("/home");
    };

    /**
     * Signs in EMAIL and PASSWORD
     * @returns 
     */
    const SignInWithEmail = async () =>
    {
        if(userAuth.isLoggedIn) //If Already Logged In. Should Be Unreachable.
        {
            console.log("already logged in")
            return;
        }
        try
        {
            const results = await signInWithEmailAndPassword(auth, userEmail, userPass); //Use firebase Login
            setUserAuth({ isLoggedIn:true });
            if(location.state?.from) // If the user was redirected to login page send them back to page with auth.
            {
                navigate(location.state.from);
            }
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
        navigate("/home");
    };

    /**
     * 
     * @returns On Creation logs into newly created the account
     */
    const CreateAccountWithEmail = async () =>
    {
        if(userAuth.isLoggedIn) //If Already Logged In. Should Be Unreachable.
        {
            console.log("already logged in")
            return;
        }
        try
        {
            const results = await createUserWithEmailAndPassword(auth, userEmail, userPass); //User firebase registration.
            setUserAuth({ isLoggedIn:true });

            const newSetDoc = doc(db, "/UserData", `${results.user.uid}`); //create userid document.
            await setDoc(newSetDoc, 
            {
                name: `"${results.user.email}"`,
            });

            if(location.state?.from) // If the user was redirected to login page send them back to page with auth.
            {
                navigate(location.state.from);
            }
        }
        catch(err)
        {
            console.error(err)
        }

        //On Success And when no redirect is needed then head to '/home'.
        navigate("/home");
    };
    
    /**
     * Simple Login Form
     */
    return (
        <>
            <h2> LOGIN Page</h2>

            <label> Email: </label>
            <input 
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}></input>
            <br/><br/>

            <label> Password: </label>
            <input 
            type="password"
            onChange={(e) => setUserPass(e.target.value)}></input>
            <br/><br/>

            <button
                onClick={SignInWithEmail}>
                Sign In
            </button>
            <br/><br/>

            <button
                onClick={CreateAccountWithEmail}>
                Create Account
            </button>
            <br/><br/>

            <button
                onClick={signInwithGoogle}>
                Sign In With Google
            </button>
        </>
    );
}

export default LoginPage;