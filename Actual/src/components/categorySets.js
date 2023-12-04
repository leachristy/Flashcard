//React
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Firebase
import {
    doc,
    collection,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc
  } from 'firebase/firestore'
import { FireAuthContext } from '../context/FireAuth';
import { db, sanitizeForFirestorePath } from '../firebase-config'

const CategorySets = ( {CategoryID} ) =>
{
    const navigator = useNavigate();
    const [Sets, setSets] = useState([]);
    const [deleteState, setDeleteState] = useState(false);
    const userContext = useContext(FireAuthContext);
    const userID = userContext.user.uid;
    
    //Open The Given Set with ./dictmain
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
    //Remove a set
    const handleDelete = async (event, data) => 
    {
        event.stopPropagation();
        const isConfirmed = window.confirm(`Are you sure you want to delete "${data}"?`);

        if (isConfirmed) 
        {
            const DocToDelete = doc(db, `/UserData/${userID}/Sets/${sanitizeForFirestorePath(data)}`)
            const docSnapshot = await getDoc(DocToDelete);
            if (docSnapshot.exists()) 
            {

                const docSnapshotData = docSnapshot.data();
                const Cat = docSnapshotData.Category;
                if(Cat)
                {
                    const CatDoc = doc(db, `/UserData/${userID}/Categories/${sanitizeForFirestorePath(Cat)}`)
                    const CatDocSnapshot = await getDoc(CatDoc);
                    
                    const newCatEntries = {...CatDocSnapshot.data().entries};
                    delete newCatEntries[docSnapshotData.Name.replace(/^["']|["']$/g, '')]
                    await setDoc(CatDoc, { entries: newCatEntries }, { merge: true });
                }
            
                await deleteDoc(DocToDelete);
                setDeleteState(!deleteState);
            } else {
                console.log("Document does not exist.");
            }
        } 
        else 
        {
            console.log('Deletion canceled.');
        }
    }

    //Gather The Sets From the given CategoryID and populate field
    useEffect(() => {

        const getSets = async () => 
        {
            const data = CategoryID ? 
            ( doc(db, `/UserData/${userID}/Categories/${sanitizeForFirestorePath(CategoryID)}`) ) 
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
    }, [CategoryID,userID,deleteState]);

    return( 
    <div className="flex flex-col gap-4">
        {Sets.map((data, index) => (
            
            <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded shadow-md hover:cursor-pointer"
            onClick={() => handleRedirect(data)}
            >
                <button
                    className="text-lg text-blue-500 font-semibold hover:underline"
                >
                    {data}
                </button>

                <button
                    onClick={(event) => handleDelete(event, data)}
                    className="bg-red-500 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out hover:bg-red-600"
                >
                    Delete
                </button>

            </div>
        ))}
    </div>)

}

export default CategorySets;