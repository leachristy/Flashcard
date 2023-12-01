import { useEffect, useState, createContext, Children } from "react";
import { auth } from '../firebase-config'

const FireAuthContext = createContext();

const FireAuthProvider = (children) =>
{

      const [user, setUser] = useState(auth.currentUser);

      useEffect( () =>
      {
            const unsubscribe = auth.onAuthStateChanged
            (
                  (_usr) => setUser(_usr),
                  (_error) => console.log(console.error())
            );
                  
            console.log("USE-EFFECT:");
            console.log(user);

            return () =>
            {
                  unsubscribe();
            };

      }, []) ;

      const val = {user};
      return <FireAuthContext.Provider value={val} {...children} />;
}

export { FireAuthContext, FireAuthProvider};