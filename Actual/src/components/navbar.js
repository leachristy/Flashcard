//REACT
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

//User Created
import Logo from "../images/logo.jpg";

//Firebase
import { auth } from '../firebase-config'

export const Navbar = () => 
{

  const handleSignOut = async () =>
  {
    try
    {
      await auth.signOut()
    }
    catch (error)
    {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center w-[100vw] h-[20vh] bg-blue-500 font-bold text-white mb-8 px-4">
        {/* first div */}
        <div className="flex gap-2  items-center ">
          
          <img
            onClick={() => {
              navigate("/maindashboard");
            }}
            src={Logo}
            alt="log"
            className="rounded-[50%] h-[100px] mx-10 hover:cursor-pointer"
          />

          <div className="relative h-20 w-40">
            <NavLink
              className="text-3xl hover:text-blue-300 hover:underline absolute inset-0 flex items-center justify-center transition duration-300"
              to="/sets"
            >
              Sets
            </NavLink>
          </div>

        </div>


        {/* second div */}
        <div className="flex  items-center gap-4 h-[50%] text-white">

          {/*instant cards*/}
          <div className="relative h-20 w-40">
            <NavLink
              className="text-3xl hover:text-blue-300 hover:underline absolute inset-0 flex items-center justify-center transition duration-300"
              to="/instantcards"
            >
              Instant Cards
            </NavLink>
          </div>

          <div className="relative h-20 w-40">
            <NavLink
              className="text-3xl hover:text-blue-300 hover:underline absolute inset-0 flex items-center justify-center transition duration-300"
              to=""
            >
              Dark Mode
            </NavLink>
          </div>

          {/* new */}
          <div className="text-3xl relative h-20 w-40">
            <NavLink
              className="hover:text-blue-300 hover:underline absolute inset-0 flex items-center justify-center transition duration-300"
              to="/new"
            >
              New
            </NavLink>
          </div>

          {/* Account */}
          <div className="text-3xl relative h-20 w-40">
            <button
              className="hover:text-blue-300 hover:underline absolute inset-0 flex items-center justify-center transition duration-300"
              onClick={handleSignOut}
            >
              Sign Out
            </button>

          </div>
        </div>
      </div>
    </>
  );
};
