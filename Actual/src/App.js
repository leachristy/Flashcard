//React
import { BrowserRouter, Routes, Route } from "react-router-dom";

//User Created @Hydro
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { Sets } from "./pages/sets";
import { New } from "./pages/new";
import { Dictmain } from "./pages/dictmain";
import { Maindashboard } from "./pages/maindashboard";

//User Created @lea
import {Flashcard} from "./pages/flashcard";

//User Created @LeothEcRz
import NoPage from "./pages/noPage";
import AuthWrap from "./fire/AuthWrap";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/maindashboard"
            element={ <AuthWrap element={<Maindashboard />}/> }
          />
          
          <Route
            path="/instantcards"
            element={ <AuthWrap element={<Flashcard />}/> }
          />

          <Route 
            path="/sets" 
            element={ <AuthWrap element={<Sets />} /> } 
          />

          <Route 
            path="/new"
            element={ <AuthWrap element={<New />} /> } 
          />

          <Route
            path="/dictmain"
            element={ <AuthWrap element={<Dictmain />}/> }
          />

          <Route
            path="*"
            element={ <NoPage /> }
          />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
