//REACT
import React, { useContext, useState } from "react";

//USER CREATED @Hydro
import { Dashboard } from "./dashboard";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../redux/features/mainSlice";

//User Created
import { db as database, auth } from '../firebase-config'
import { FireAuthContext } from '../context/FireAuth';

//Firebase
import {
    doc,
    collection,
    addDoc,
    getDoc,
    setDoc
} from 'firebase/firestore'
import { Link, redirect, useNavigate } from "react-router-dom";

export const New = () => 
{
  const { formData } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();

  const [successfullSubmitted, setSuccessfullSubmission] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [termField, setTermField] = useState("");
  const [defField, setDefField] = useState("");
  const [fields, setFields] = useState([]);

  const userContext = useContext(FireAuthContext);
  const userID = userContext.user.uid;

  const handleFinish = async () => 
  {
    { /** Input Checks */
    if(title.length < 1)
    {
      alert("Set Needs A Tittle");
      return;
    }

    if(description.length < 1)
    {
      alert("Set description should not be empty")
      return;
    }

    if(fields.length < 2)
    {
      alert("Set Size Minimum is 2.")
      return;
    }
    }
    
    const newData = 
    {
      title,
      description,
      fields:
        [...fields]
    };

    // setFormData([...formData, newData]);
    dispatch(addData(newData));     //I HAVE NO IDEAD WHAT THIS DOES from: @LEOTHECRZ
    // Clear form fields after adding to the array
    setTitle("");
    setDescription("");
    setFields([]);

    //Get ref to sets collection of active user
    const setsCollection = collection(database, `/UserData/${userID}/Sets`); //Get Sets Collection
    const newSetDoc = doc(database, setsCollection.path, title);
    
    const docCheck = await getDoc(newSetDoc); //snapshot doc
    if(docCheck.exists()) //Check if Set can be created with given tittle. Tittle is used as docID.
    {
      alert("Set Tittle Already Taken In Your Sets.")
      return;
    }

    //Create a new doc with that stores name of set
    await setDoc(newSetDoc, 
      {
      name: `"${title}"`,
      });

    const cardsCollection = collection(database, `/UserData/${userID}/Sets`, title, "Cards");
    for(const obj of newData.fields) // Add a card document with the fields Term and Definition to the Collection Cards within the new Set Document.
    {   
      try{
        await addDoc( cardsCollection, {
          Term: `"${obj.termField}"`,
          Definition: `"${obj.defField}"`
        });
      } catch (err)
      {
        console.error(err);
      }

    }
    setSuccessfullSubmission(true);
  };
  
  // handle fields
  const addNewField = () => 
  {
    if(termField.length < 1)
    {
      alert("Cannot create empty card")
      return;
    }

    if(defField.length < 1)
    {
      alert("Cannot create card without a definition.")
      return;
    }

    setFields([...fields, { termField, defField }]);
    setDefField("");
    setTermField("");
  };

  //Card Removing Logic.
  //Removing from withing the list reorders list.
  const removeField = (index) => 
  {
      const nextFields = [...fields];
      nextFields.splice(index, 1);
      setFields(nextFields);
  };

  return (
    <>
      {/* NAV */}
      <Dashboard />
      { successfullSubmitted ? 
      (
        <>
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-4xl font-bold mb-4">
              Successfull Creation.
            </h1>
            
            <Link to="/maindashboard">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Go Home
              </button>
            </Link>
            
          </div>
        </>
      ) 
      : 
      (
        <>
     
      <div className="flex justify-between w-[80%] m-auto">
        <h1 className="uppercase inline-block  px-14 p-2 shadow-xl font-bold text-xl">
          New
        </h1>

        <button className="bg-blue-400  inline-block px-14 p-2 font-bold text-xl text-white uppercase shadow-xl"
          onClick={handleFinish}
        >
          Finish
        </button>

      </div>

      <div className="w-[80%] m-auto mt-4 p-2 shadow-2xl mb-8 py-4 px-10">
        <h1 className="text-2xl my-1">
           Create A New Set. 
        </h1>

        <input
          className="inline-block p-4 my-2 text-xl  border-2 border-blue-400 rounded-xl"
          placeholder="Title..."
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className=" p-4 my-2 block w-full text-xl border-2 border-blue-400 rounded-xl"
          placeholder="Enter a description of the set..."
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Terms / Defs */}
        {fields.map( (field, i) => (
            <div key={i}>
              <div className="py-2 w-full m-auto flex justify-between gap-2 my-2">
                
                <input
                  type="text"
                  placeholder="Term Text Field"
                  className=" w-[25%] uppercase text-s p-4 border-2 border-blue-400 rounded-xl"

                  value={field.termField}
                  readOnly
                />

                <input
                  type="text"
                  placeholder="Def Text Field"
                  className=" w-[75%] text-s p-4 border-2 border-blue-400 rounded-xl"

                  value={field.defField}
                  readOnly
                />
              
                <button 
                onClick={() => removeField(i)}
                className="bg-blue-400 inline-block py-4 uppercase hover:bg-blue-500 text-xs font-bold text-white"
                >
                  Remove Card 
                </button>


              </div>
            </div>
          ))}

        {/* Active Input */}
        <div className="py-2 w-full m-auto flex justify-between gap-2 my-2">
          <input
            type="text"
            placeholder="Term Text Field"
            className=" w-[30%] text-xl p-4 border-2 border-blue-400 rounded-xl"
            value={termField}
            onChange={(e) => setTermField(e.target.value)}
          />
          <input
            type="text"
            placeholder="Def Text Field"
            className="w-[70%] text-xl p-4 border-2 border-blue-400 rounded-xl"
            value={defField}
            onChange={(e) => setDefField(e.target.value)}
          />
        </div>
        
        {/* Buttons */}
        <div className="flex justify-around pt-4">
          <button
            className="bg-blue-400  ml-5 inline-block px-14 py-4 uppercase hover:bg-blue-300 text-2xl font-bold text-white"
            onClick={addNewField}
          >
            +
          </button>

          <button
            className="bg-blue-400 inline-block px-14 py-4  uppercase hover:bg-blue-300 text-2xl font-bold text-white"
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>

      </div>
      </>)}
    </>);
};
