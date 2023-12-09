//REACT
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
//USER CREATED
import Logo from "../images/logo.jpg";

//Firebase
import { auth } from '../firebase-config'

export const Dictnavbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ left: 0, top: 0 });

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

  const handleButtonClick = () => {
    setModalOpen(!modalOpen);
    const button = document.getElementById("dictionaryButton");
    if (button) {
      const rect = button.getBoundingClientRect();
      setButtonPosition({ left: rect.left, top: rect.bottom });
    }
  };

  const handleMouseLeave = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center w-[100vw] h-[10vh] bg-blue-500 font-bold text-white mb-8 px-4">
        {/* first div */}
        <div className="flex gap-2  items-center ">
          <img
            onClick={() => {
              navigate("/maindashboard");
            }}
            src={Logo}
            alt="log"
            className="rounded-[50%] h-[50px] mx-10 hover:cursor-pointer"
          />
          <div className="relative h-20 w-40">
            <NavLink
              className="text-xl hover:text-blue-300 hover:underline absolute inset-0 flex items-center justify-center transition duration-300"
              to="/sets"
            >
              Sets
            </NavLink>
          </div>
        </div>

        {/* second div */}
        <div className="flex items-center gap-4 h-[50%] text-white">
          {/* dict */}
          <div className="relative h-20 w-40">
            <button
              id="dictionaryButton"
              className="text-xl absolute inset-0 flex items-center justify-center hover:text-blue-300 hover:underline border-red-700 transition duration-300"
              onClick={handleButtonClick}
            >
              Dictionary
            </button>
            {modalOpen && (
              <div
                className="absolute bg-white border-2 border-blue-400 p-4 overflow-hidden"
                onMouseLeave={handleMouseLeave}
                style={{
                  width: "50vw",
                  height: "50vh",
                  top: `${buttonPosition.top}px`,
                  // right: `${window.innerWidth - buttonPosition.left - 25}px`,
                  left: `${buttonPosition.left - 900}px`, // Default, positioning from left side
                }}
              >
                {/* content div outer */}
                <div className=" w-[80%] m-auto">
                  {/* search div */}
                  <div className="w-[70%] flex p-4 justify-center m-auto">
                    <input
                      type="text"
                      placeholder="Search"
                      className="border-2 border-blue-400 p-2 w-[75%]"
                    />
                    <button className="border-2 bg-blue-400 p-2 text-white rounded hover:bg-blue-300 w-[25%]">
                      Search
                    </button>
                  </div>

                  {/* result div */}
                  <div className="w-[85%] m-auto">
                    <p className="text-center p-6 text-black">
                      dataionary data will be here
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* new */}
          <div className="text-xl relative h-20 w-40">
            <NavLink
              className="hover:text-blue-300 hover:underline absolute inset-0 flex items-center justify-center transition duration-300"
              to="/new"
            >
              New
            </NavLink>
          </div>

          {/* Account */}
          <div className="relative h-20 w-40">
            <NavLink
              className="text-xl hover:text-blue-300 hover:underline absolute inset-0 flex items-center justify-center  transition duration-300"
              to="/new"
            >
              Account
            </NavLink>
          </div>

          <div className="relative h-20 w-40">
            <NavLink
              className="text-xl hover:text-blue-300 hover:underline absolute inset-0 flex items-center justify-center  transition duration-300"
              to="/form"
            >
              Dictionary
            </NavLink>
          </div>

          {/* Account */}
          <div className="text-xl relative h-20 w-40">
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
