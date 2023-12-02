import React, { useContext } from "react";
import { Dashboard } from "./dashboard";
import { NavLink, Navigate, redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//FireBase User Context
import { FireAuthContext } from '../context/FireAuth';

export const Maindashboard = () => 
{
  //Start Context
  const userContext = useContext(FireAuthContext);
  
  const { formData } = useSelector((state) => state.mainSlice);
  
  const navigator = useNavigate();

  return (
    <>
      <Dashboard>
        <div className="w-[80%] m-auto mt-4 flex flex-col gap-10">

          {/* div recent */}
          <div className="h-[25vh] border-2 border-blue-400 rounded-2xl shadow-2xl p-5 pb-8">
            <h1 className="text-3xl underline font-bold ">Recent</h1>

            {/* button */}
            <div className="flex justify-center my-4">

              {/* REDUX */}
              {formData.map((data, index) => (
                <button
                  onClick={() => navigator("/dictmain", { state: data })}
                  className="hover:bg-blue-300 bg-blue-400 px-10 py-4 text-white font-bold text-xl inline-block p-3 uppercase m-auto"
                  key={index}
                >
                  {data.title}
                </button>
              ))}

              {/* Firebase */}
                

            </div>

          </div>

          {/* div notification*/}
          <div className="h-[25vh] border-2 border-blue-400 rounded-2xl shadow-2xl p-5 pb-8">
            <h1 className="text-3xl underline font-bold ">Notifications</h1>
          </div>

        </div>
      </Dashboard>
    </>
  );
};
