import React, { useContext, useState } from "react";
import { Dashboard } from "./dashboard";
import { GlobalInfo } from "../App";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../redux/features/mainSlice";
export const New = () => {
  const { formData } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  console.log(formData);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberValue, setNumberValue] = useState(0);
  const [termField, setTermField] = useState("");
  const [defField, setDefField] = useState("");
  const [fields, setFields] = useState([]);

  const handleFinish = () => {
    const newData = {
      title,
      description,
      numberValue,
      fields:
        fields.length > 0
          ? [...fields, { termField, defField }]
          : [{ termField, defField }],
    };

    // setFormData([...formData, newData]);
    dispatch(addData(newData));
    // Clear form fields after adding to the array
    setTitle("");
    setDescription("");
    setNumberValue(0);
    setFields([]);
    setImage(null);
  };

  const handleIncrement = () => {
    setNumberValue(numberValue + 1);
  };

  const handleDecrement = () => {
    if (numberValue > 0) {
      setNumberValue(numberValue - 1);
    }
  };

  const handleDelete = () => {
    setNumberValue(0);
  };

  // image
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  // handle fields
  const handleFields = () => {
    setFields([...fields, { termField, defField }]);
    setDefField("");
    setTermField("");
  };
  return (
    <>
      <Dashboard />
      <div className="flex justify-between w-[80%] m-auto">
        <h1 className="uppercase inline-block  px-14 p-2 shadow-xl font-bold text-xl">
          New
        </h1>
        <button className="bg-blue-400  inline-block px-14 p-2 font-bold text-xl text-white uppercase shadow-xl">
          Finish
        </button>
      </div>

      {/* div here */}
      <div className="w-[80%] m-auto mt-4 p-2 shadow-2xl mb-8 py-4 px-10">
        {/* title */}
        <h1 className="uppercase text-2xl my-1">title</h1>
        <input
          className="inline-block p-4 my-2 text-xl  border-2 border-blue-400 rounded-xl"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        {/* description */}
        <input
          className=" p-4 my-2 block w-full text-xl border-2 border-blue-400 rounded-xl"
          placeholder="Desc"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        {/* div */}
        <div className="m-auto  flex justify-between ">
          <input
            // <span>

            // </span>
            type="number"
            className="p-4 border-2 border-blue-400 rounded-xl my-2"
            value={numberValue}
            onChange={(e) => setNumberValue(parseInt(e.target.value) || 0)}
          ></input>

          <div>
            <button
              class="text-white font-bold ml-5 text-xl px-20 hover:bg-blue-300 bg-blue-400 inline-block p-4 uppercase my-2"
              onClick={handleIncrement}
            >
              UP
            </button>

            <button
              class="text-white font-bold ml-5 text-xl px-20 hover:bg-blue-300 bg-blue-400 inline-block p-4 uppercase my-2"
              onClick={handleDecrement}
            >
              DOWN
            </button>

            <button
              class="text-white font-bold ml-5 text-xl px-20 hover:bg-blue-300 bg-blue-400 inline-block p-4 uppercase my-2"
              onClick={handleDelete}
            >
              DEL
            </button>
          </div>
        </div>

        {/* div */}
        {fields.map((field, i) => {
          return (
            <div key={i}>
              <div className="py-2 w-full m-auto flex justify-between gap-2 my-2">
                <input
                  type="text"
                  placeholder="Term Text Field"
                  className=" w-[50%] text-xl p-4 border-2 border-blue-400 rounded-xl"
                  value={field.termField}
                  readOnly
                ></input>
                <input
                  type="text"
                  placeholder="Def Text Field"
                  className="w-[50%] text-xl p-4 border-2 border-blue-400 rounded-xl"
                  value={field.defField}
                  readOnly
                ></input>
                <input
                  type="text"
                  placeholder="Def Text Field"
                  className="w-[50%] text-xl p-4 border-2 border-blue-400 rounded-xl"
                  value={"No image added"}
                  readOnly
                ></input>
              </div>
            </div>
          );
        })}
        <div className="py-2 w-full m-auto flex justify-between gap-2 my-2">
          <input
            type="text"
            placeholder="Term Text Field"
            className=" w-[50%] text-xl p-4 border-2 border-blue-400 rounded-xl"
            value={termField}
            onChange={(e) => setTermField(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Def Text Field"
            className="w-[50%] text-xl p-4 border-2 border-blue-400 rounded-xl"
            value={defField}
            onChange={(e) => setDefField(e.target.value)}
          ></input>
        </div>
        {/* image */}
        <div className="w-full">
          <label htmlFor="upload" className="cursor-pointer">
            <input
              type="file"
              id="upload"
              accept="image/*"
              className="hidden w-full"
              onChange={handleImageUpload}
            />
            <div className="bg-gray-200 h-24 flex items-center justify-center rounded-lg border-dashed border-2 border-blue-400 w-full">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="max-h-full max-w-full"
                />
              ) : (
                <span className="text-gray-500">Upload an image</span>
              )}
            </div>
          </label>
        </div>

        {/* plus div */}
        <div className="flex justify-around pt-4">
          <button
            class="bg-blue-400  ml-5 inline-block px-14 py-4 uppercase hover:bg-blue-300 text-2xl font-bold text-white"
            onClick={handleFields}
          >
            +
          </button>

          <Link to="/maindashboard">
            <button
              className="bg-blue-400 inline-block px-14 py-4  uppercase hover:bg-blue-300 text-2xl font-bold text-white"
              onClick={handleFinish}
            >
              Finish
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
