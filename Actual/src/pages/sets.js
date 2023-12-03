import React, { useState, useEffect, useContext } from "react";
import { Dashboard } from "./dashboard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//UserCreated
import CategorySets from "../components/categorySets";

//Firebase
import {
  collection,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebase-config';
import { FireAuthContext } from '../context/FireAuth';

export const Sets = () => 
{

  const { formData } = useSelector((state) => state.mainSlice);
  const navigator = useNavigate();
  const categoryButtons = ["Sets", "Cat1", "Cat2", "Cat3"];
  const [selectedCategory, setSelectedCategory] = useState("Sets");
  const [selectedButton, setSelectedButton] = useState(null);
  const handleClick = (category) => 
  {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  const handleButtonColor = (index) => 
  {
    setSelectedButton(index);
  };
  useEffect(() => {
    // Set the default selected button index to the "Link" tab
    const linkIndex = categoryButtons.indexOf("Sets");
    setSelectedButton(linkIndex);
    setSelecteFdButton(0);
  }, []);

  //Firebase
  const userContext = useContext(FireAuthContext);
  const userID = userContext.user.uid;
  const [firebaseCategories, setFirebaseCategories] = useState(["All"]);
  const [selectedFCategory, setSelectedFCategory] = useState("Sets");
  const [selectedFButton, setSelecteFdButton] = useState(null);
  const handlefClick = (category) => 
  {
    setSelectedFCategory(category === selectedFCategory ? null : category);
  };
  const handlefButtonColor = (index) => 
  {
    setSelecteFdButton(index);
  };

  const handleCatDelete = () =>
  {

  }

  useEffect(() => 
  { // Fetch Firebase User Categories
    const fetchCategories = async () => 
    {
        const data = await getDocs( collection(db, `/UserData/${userID}/Categories`) );
        const docNames = data.docs.map((doc) => doc.id);

        setFirebaseCategories(["All", ...docNames]);
    };
    fetchCategories();
  }, []);
  

  return (
    <Dashboard>
      {/* REDUX */}
      <div className="w-[80%] m-auto mt-[50px] border-2 border-blue-400 rounded-2xl shadow-2xl p-5 pb-8">
        <div className="flex justify-evenly items-end my-6">
          {categoryButtons.map((category, index) => (
            <button
              key={index}
              onClick={() => {
                handleClick(category);
                handleButtonColor(index);
              }}
              className={`hover:underline text-3xl hover:bg-blue-300 bg-blue-400 px-10 py-4 text-white font-bold inline-block p-3 capitalize ${
                selectedButton === index
                  ? "bg-blue-300 border-[3px] border-blue-500 rounded-xl underline uppercase"
                  : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* REDUX */}
        <div className="ml-8 my-4 ">
          {selectedCategory === "Sets" && formData && (
            <div className="flex flex-col gap-4">
              {formData.map((data, index) => (
                <button
                  onClick={() => navigator("/dictmain", { state: data })}
                  className="hover:underline text-xl hover:bg-blue-300 bg-blue-400 px-10 py-4 text-white font-semibold inline-block p-3 uppercase "
                  key={data.title}
                >
                  {data.title}
                </button>
              ))}
            </div>
          )}
        </div>
      

      </div>
              
      {/* Firebase */}
      <div className="w-[80%] m-auto mt-[50px] border-2 border-blue-400 rounded-2xl shadow-2xl p-5 pb-8">
                
        <div className="flex justify-evenly items-end my-6 flex-wrap space-y-4">
          {firebaseCategories.map((category, index) => (
            <div key={index} className="flex items-center space-x-4">
            <div
              onClick={() => {
                handlefClick(category);
                handlefButtonColor(index);
              }}
              className={`hover:underline text-3xl hover:bg-blue-300 bg-blue-400 px-10 py-4 text-white font-bold inline-block p-3 capitalize ${
                selectedFButton === index
                  ? "bg-blue-300 border-[3px] border-blue-500 rounded-xl underline uppercase"
                  : ""
              }`}
            >
              {category}
              {index !== 0 && (
                <button
                  onClick={() => handleCatDelete(category)}
                  className="hover:bg-red-300 bg-red-400 px-2 py-1 ml-2 text-white font-bold rounded-md uppercase focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-110"
                >
                  X
                </button>
              )}
            </div>
          </div>
          ))}
        </div>

        <div className="ml-8 my-4 ">
          { 
            (<CategorySets CategoryID={ selectedFButton !== 0 ? firebaseCategories[selectedFButton] : (null) } />) 
          }
        </div>

      </div>

    </Dashboard>
  );
};
