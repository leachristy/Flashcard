//REACT
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

//USER CREATED @Hydro
import { Dashboard } from "./dashboard";

//USER CREATED @LeothEcRz
import CatDropdown from '../components/catdropdown'

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../redux/features/mainSlice";

//User Created
import { db as database, sanitizeForFirestorePath } from '../firebase-config'
import { FireAuthContext } from '../context/FireAuth';

//Firebase
import {
    doc,
    collection,
    addDoc,
    getDoc,
    setDoc,
    updateDoc
} from 'firebase/firestore'

export const New = () => 
{
  const { formData } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();

  const [successfullSubmitted, setSuccessfullSubmission] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
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
    
    //Get ref to sets collection of active user
    const setsCollection = collection(database, `/UserData/${userID}/Sets`); //Get Sets Collection
    const newSetDoc = doc(database, setsCollection.path, sanitizeForFirestorePath(title));
    const docCheck = await getDoc(newSetDoc); //snapshot doc
    
    if(docCheck.exists()) //Check if Set can be created with given tittle. Tittle is used as docID.
    {
      alert("Set Tittle Already Taken In Your Sets.")
      return;
    }

    let setCatIndex = -1;
    if(category && (category.value !== "None")) // Check Category Dropdown
    {
      const catDoc =  doc(database, `/UserData/${userID}/Categories/${sanitizeForFirestorePath(category.value)}`);
     
      try {
        const snap = await getDoc(catDoc);
        if(snap.exists())
        {
          const snapEntries = snap.data().entries || {};
          snapEntries[title] = title;
          await updateDoc( catDoc, {entries: snapEntries} )
        }
        else
        {
          console.log("Snap does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    //Create a new doc with that stores name of set
    await setDoc(newSetDoc, {
      Name: `"${title}"`,
      Description: description,
      Category: (category && (category.value !== "None")) ? category.value : null,
    });

    const cardsCollection = collection(database, `/UserData/${userID}/Sets`, sanitizeForFirestorePath(title), "Cards");
    for(const obj of newData.fields) // Add a card document with the fields Term and Definition to the Collection Cards within the new Set Document.
    {   
      try{
        await addDoc( cardsCollection, {
          Term: obj.termField,
          Definition: obj.defField
        });
      } catch (err)
      {
        console.error(err);
      }

    }

    setTitle("");
    setDescription("");
    setFields([]);
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

  //calback function for drop down.
  const handleSelectValue = (value) => 
  {
    setCategory(value);
  };

  return (
    <>
      {/* NAV */}
      <Dashboard />

      { successfullSubmitted ? 
      ( 
        <>
          {/* Submission Return Screen */}
          <div className="flex flex-col items-center justify-center ">
            
            <h1 className="text-4xl font-bold mb-4">
              Successfully Created.
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
          {/* Form Screen - Header */}
          <div className="flex justify-between w-[80%] m-auto">
            <h1 className="uppercase inline-block  px-14 p-2 shadow-xl font-bold text-xl rounded-xl">
              New
            </h1>

            <button className="bg-blue-400 hover:bg-blue-500 inline-block px-14 p-2 font-bold text-xl text-white uppercase shadow-xl rounded-xl"
              onClick={handleFinish}
            >
              Finish
            </button>
          </div>
          
          {/* Form Screen - Body */}
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

            <CatDropdown onSelectValue={handleSelectValue}/>

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
                className="bg-blue-400  ml-5 inline-block px-14 py-4 uppercase hover:bg-blue-300 text-2xl font-bold text-white rounded-xl"
                onClick={addNewField}
              >
                +
              </button>

              <button
                className="bg-blue-400 inline-block px-14 py-4  uppercase hover:bg-blue-300 text-2xl font-bold text-white rounded-xl"
                onClick={handleFinish}
              >
                Finish
              </button>
            </div>

          </div>

      </>)}
    </>);
};
