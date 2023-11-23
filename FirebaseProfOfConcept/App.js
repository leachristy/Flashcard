//REACT
import React, { createContext , useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//FIREBASE
import 'firebase/firestore';

//USER CREATED
import DynForm from './Components/FormTest';
import LoginPage from './Components/LoginPageTest'
import AuthCheck from './Components/AuthCheck';
import Home from './Components/Home';
import Nav from './Components/Nav'


//TESTING
export const UserContext = createContext(); // Context Is Share Throughout Entire APP. If The Componets want access they need to useContext.

export default function App()
{
    const [userAuth, setUserAuth] = useState({ isLoggedIn:false }) // User State
    /**
     * Context Provider Wraps Entire App.
     * Login Page Is Index Element.
     * 
     * After Login is redirected to home.
     * AuthCheck redirects to '/' if not logged in.
     * When Logged In AuthCheck is ignored.
     *  
     * App is protected by AuthCheck Route Wrap.
     * Any Route within auth check must pass a login check.
     *  
     */
    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
          <BrowserRouter>
            <Routes> 
              <Route path="/">

                <Route index element={<LoginPage/>}/>
                
                <Route element={ <AuthCheck/> }>
                  <Route element={<Nav/>}>
                    <Route path='form' element={<DynForm/>}></Route>
                    <Route path='home' element={<Home/>}></Route>
                  </Route>
                </Route>

              </Route> 
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
    );

}


  
