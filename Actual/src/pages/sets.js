import React, { useState, useEffect } from "react";
import { Dashboard } from "./dashboard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sets = () => {
  const { formData } = useSelector((state) => state.mainSlice);
  const navigator = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Sets");
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleButtonColor = (index) => {
    setSelectedButton(index);
  };

  const categoryButtons = ["Sets", "Cat1", "Cat2", "Cat3"];

  useEffect(() => {
    // Set the default selected button index to the "Link" tab
    const linkIndex = categoryButtons.indexOf("Sets");
    setSelectedButton(linkIndex);
  }, []);

  return (
    <Dashboard>
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
        <div className="ml-8 my-4 ">
          {selectedCategory === "Sets" && formData && (
            <div className="flex flex-col gap-4">
              {formData.map((data, index) => (
                <button
                  // onClick={() => navigator("/dictmain", { state: data })}
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
    </Dashboard>
  );
};
