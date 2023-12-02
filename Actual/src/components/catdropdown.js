//REACT
import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';

//CSS
import './catdropdown.css';

//Firebase
import {
    doc,
    collection,
    getDoc,
    getDocs,
    setDoc
} from 'firebase/firestore'
import { db } from '../firebase-config';
import { FireAuthContext } from '../context/FireAuth';

const SelectAndModal = ({ onSelectValue }) => {

    const userContext = useContext(FireAuthContext);
    const userID = userContext.user.uid;

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const [fetchTrigger, setFetchTrigger] = useState(false); // New state variable

  const handleButtonClick = () => 
  {
      setShowModal(true);
  };

  const handleModalSubmit = async () => 
  {
    console.log(`Submitted text: ${modalText}`);

    const setsCollection = collection(db, `/UserData/${userID}/Categories`); //Get Sets Collection
    const newSetDoc = doc(db, setsCollection.path, modalText);

    const docCheck = await getDoc(newSetDoc); //snapshot doc
    if(docCheck.exists()) //Check if Set can be created with given tittle. Tittle is used as docID.
    {
      alert("Set Tittle Already Taken In Your Sets.")
      return;
    }

    //Create a new doc with that stores name of set
    try
    {
        await setDoc(newSetDoc, {
            entries: {},
        });

    }catch(e)
    {
        console.log(e);
    }
    
    setShowModal(false);
    setFetchTrigger((prev) => !prev);
  };

  useEffect(() => 
  {

    const fetchData = async () => 
    {
        const data = await getDocs( collection(db, `/UserData/${userID}/Categories`) );
        const docNames = data.docs.map((doc) => doc.id);

        setOptions(docNames);
    };

    fetchData();
  }, [fetchTrigger]);

  useEffect(() => 
  {
    onSelectValue(selectedOption);
  }, [selectedOption, onSelectValue]);

  return (
    <div>
        <div className="py-2 w-full m-auto flex justify-between gap-2 my-2">
            <Select
            options={options.map((id) => ({label: id, value: id}))}
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
            className=" w-[70%] text-s p-4 border-2 border-blue-400 rounded-xl"
            />

            <Button
                onClick={handleButtonClick}
                className=" w-[20%] bg-blue-400 inline-block py-4 uppercase hover:bg-blue-500 text-xs font-bold text-white rounded-xl"
                >
                Create A New Category
            </Button>
        </div>
      

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName="modal-container"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-lg font-bold">
            Create A New Category For Sets
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label className="block mb-2">
            Enter Category Title:
            <input
              type="text"
              value={modalText}
              onChange={(e) => setModalText(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>
        </Modal.Body>

        <Modal.Footer>
          
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Exit
          </Button>
          
          <Button
            variant="primary"
            onClick={handleModalSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default SelectAndModal;
