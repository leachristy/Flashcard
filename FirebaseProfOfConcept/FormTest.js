//React
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//User Created
import { db as database, auth } from '../firebase-config'
//Firebase
import {
    doc,
    collection,
    addDoc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const GrowingCardForm = () => 
{
    const navigate = useNavigate();
    const userID = auth.currentUser.uid; // From Auth Get UserID

    const [successfullSubmission, setSuccessfullSubmission] = useState(false); //Form State
    const [setTitle, setSetTitle] = useState(''); //Form Tittle
    const [cardFields, setCardFields] = useState([{ termName: '', termDefinition: '' },{ termName: '', termDefinition: '' }]); // Amount of card fields starts at 2
    //cardFields is array of objects each holding {termName:'', termDefinition:''}.

    //Keep State UPTO Date
    const handleChange = (index, field, value) => 
    {
        const nextFields = [...cardFields]; // Spread Fields To New Array
        nextFields[index][field] = value; // Add new val to state
        setCardFields(nextFields);
    };

    //Card Adding Logic. Max Can Be Set Here Or Elsewhere.
    const handleAddCard = () => 
    {
        if(cardFields.length === 25)
        {
            alert('Max Cards. Cannot Add Any More To This Set')
            return;
        }
        setCardFields([...cardFields, { termName: '', termDefinition: '' }]); // Add New Element To Array
    };

    //Card Removing Logic. Min is set at two.
    //Removing from withing the list reorders list.
    const handleRemoveCard = (index) => 
    {
        const nextFields = [...cardFields];

        if(nextFields.length === 2)
        {
            alert("Card Cannot Be Removed");
            console.log('Failed To Remove. Not Possible');
            return;
        }

        nextFields.splice(index, 1);
        setCardFields(nextFields);
    };

    //Submission Logic
    const handleSubmit = async (event) => 
    {
        event.preventDefault();// Cancel Form Defaults
        //Get ref to sets collection of active user
        const setsCollection = collection(database, `/UserData/${userID}/Sets`); //Get Sets Collection
        const newSetDoc = doc(database, setsCollection.path, setTitle);
        const docCheck = await getDoc(newSetDoc); //snapshot doc
        if(docCheck.exists()) //Check if Set can be created with given tittle. Tittle is used as docID.
        {
            alert("Set Tittle Already Taken In Your Sets.")
            return;
        }

        //Create a new doc with that stores name of set
        await setDoc(newSetDoc, 
        {
            name: `"${setTitle}"`,
        });

        const cardsCollection = collection(database, `/UserData/${userID}/Sets`, setTitle, "Cards");
        for(const obj of cardFields) // Add a card document with the fields Term and Definition to the Collection Cards within the new Set Document.
        {   
            try{
                await addDoc( cardsCollection, {
                    Term: `"${obj.termName}"`,
                    Definition: `"${obj.termDefinition}"`
                });
            } catch (err)
            {
                console.error(err);
            }
            
        }
        setSuccessfullSubmission(true); //Update State
    };
    
    /**
     * Depending On State
     *  Shows Either:
     *      Form Submit Success with Home Button
     * 
     *      Form to be filled.
     */
    return (
        <>
            {successfullSubmission ? (

                <div>
                    <p>Form submitted successfully!</p>
                    <button onClick={() => navigate("/home")}>Go to Home</button>
                </div>

            ) : (

                <form onSubmit={handleSubmit}>
                    <label>
                        Set Title:
                        <input
                        type="text"
                        value={setTitle}
                        onChange={(event) => setSetTitle(event.target.value)}
                        required
                        />
                    </label>
                    {cardFields.map((field, index) => (
                        <div key={index}>

                            <label> {`Card ${index} - Term: `} </label>
                            <input
                                required
                                type="text"
                                value={field.termName}
                                onChange={ (event) => handleChange(index, 'termName', event.target.value) }
                            />

                            <label> {`Card ${index} - Definition: `} </label>
                            <textarea
                                required
                                value={field.termDefinition}
                                onChange={ (event) => handleChange(index, 'termDefinition', event.target.value) }
                            />

                            <button type="button" onClick={() => handleRemoveCard(index)}> (-) Remove Card </button>
                        </div>
                    ))}

                    <button type="button" onClick={handleAddCard}> (+) Add More Cards </button>
                    <button type="submit">Submit</button>
                </form>

            )}
        </>
    );

};

export default GrowingCardForm;
