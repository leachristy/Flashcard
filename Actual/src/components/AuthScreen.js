import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AuthScreen = ({ auth, authHandler, children }) => {
  const [userState, setUserState] = useState(auth);

  const gradientBackground = {
    background: "rgb(2,0,36)",
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 31%, rgba(0,212,255,1) 100%)",
  };

  return (
    <>
      <div className="flex h-screen" style={gradientBackground}>
        {/* Left Section */}
        <div className="w-1/2 border-r border-gray-700">
          {/* Content for left section */}
          <div className="h-screen flex justify-center items-center">
            <div className="h-[80%] w-[75%] bg-white rounded-3xl flex justify-center items-center border-2 border-gray-700 shadow-2xl ">
              <p className="border-2 border-gray-700 p-24">Welcome Message</p>
            </div>
          </div>
        </div>

        {/* Separator Line
        <div className="border-r border-gray-700"></div> */}

        {/* Right Section */}
        <div className="w-1/2">
          {/* Content for right section */}
          <div className="h-screen flex justify-center items-center">
            <div className="h-[80%] w-[75%] bg-white  rounded-3xl flex flex-col shadow-2xl">
              <div className="flex gap-4 justify-end p-3 pr-6 pt-5">
                <Link
                  to="/"
                  className="p-2 border-2 px-6 text-2xl bg-blue-800 hover:bg-blue-400 text-white uppercase rounded-3xl "
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="p-2 border-2 px-6 text-2xl bg-blue-800 hover:bg-blue-400 text-white uppercase rounded-3xl "
                >
                  Sign Up
                </Link>
              </div>

              <div className="mt-2 flex flex-col w-[100%]  items-center justify-center pt-2 pb-6 gap-4 px-10">
                {children}
               
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
