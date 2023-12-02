//React
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Firebase
import {
    doc,
    collection,
    getDoc,
    getDocs,
  } from 'firebase/firestore'
import { FireAuthContext } from '../context/FireAuth';
import { db } from '../firebase-config'

const CategorySets = ( {CategoryID} ) =>
{
    const navigator = useNavigate();
    const [Sets, setSets] = useState([]);
    const userContext = useContext(FireAuthContext);
    const userID = userContext.user.uid;
    
    useEffect(() => {

        const getSets = async () => 
        {
            const data = CategoryID ? 
            ( doc(db, `/UserData/${userID}/Categories/${CategoryID}`) ) 
            : 
            ( collection(db, `/UserData/${userID}/Sets`) );

            try {
                if( data.type === "collection" )
                {
                    const collectionDocs = await getDocs( data );
                    const docNames = collectionDocs.docs.map((doc) => doc.id);
                    setSets(docNames);
                }
                else
                {
                    const categoryDoc = await getDoc( data );
                    if(categoryDoc.data() !== undefined)
                    {

                        const entries = categoryDoc.data().entries;
                        const categoryDocs = Object.values(entries);
                        setSets(categoryDocs);
                    }
                }
            } 
            catch (error) 
            {
                console.log(error);
            }
        }
        getSets();
    }, [CategoryID,userID]);

    
    const handleRedirect = async (id) =>
    {
        console.log(id);
        const setsCardCollection = collection(db, `/UserData/${userID}/Sets/${id}/Cards`); //Get Sets Collection
        const setsDoc = doc(db, `/UserData/${userID}/Sets/${id}`)

        try 
        {
            const SetDocsData = await getDocs(setsCardCollection);
            const termArray = SetDocsData.docs.map( (doc) => doc.data() )
            const SetDocData = await getDoc(setsDoc);    
            const SetDescriptions = SetDocData.data();
            const tittle = SetDescriptions.name;
            const description = "";
            const fields = [];

            termArray.map( (card) => {
                fields.push( {termField:card.Term,defField:card.Definition} )
                return null
            } )

            const newData = 
            {
                tittle,
                description,
                fields:
                    [...fields]
            };

            navigator("/dictmain", { state: newData })

        } 
        catch (error)
        {
            console.log(error);
        }

    }

    return( 
    <div className="flex flex-col gap-4">
        {Sets.map((data, index) => (
            <button
            onClick={() => handleRedirect(data)}
            className="hover:underline text-xl hover:bg-blue-300 bg-blue-400 px-10 py-4 text-white font-semibold inline-block p-3 uppercase "
            key={index}
            >
            {data}
            </button>
        ))}
    </div>)

}

export default CategorySets;