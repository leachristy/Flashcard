import { Dashboard } from "./dashboard";
import {useState} from "react";
//import {Definition} from "./api.js";

var definitionArray = [];
var handle = 0;
var currentCard = 0;

export function InputWords() {
    const [counter, setCounter] = useState(1);
    const [terms, setTerms] = useState([""]);
    const header = {
      margin: "10px",
      fontSize: "25px",
      fontWeight: "bold",
      textAlign: "center",
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Lucida Console"
    };

    const body = {
      margin: "10px",
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "left",
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Lucida Console"
    }

    const buttons = {
      color: "white",
      backgroundColor: "DarkBlue",
      margin: "10px",
      padding: "10px",
      borderStyle: "solid",
      borderColor: "black"
    }

    const flashcardButtons = {
      padding: "15px",
      float: "right",
      margin: "auto",
      color: "white",
      backgroundColor: "DarkBlue",
      margin: "10px",
      padding: "10px",
      borderStyle: "solid",
      borderColor: "black"
    }

    const flashcard = {
      float: "right",
      height: "300px",
      width: "600px",
      backgroundColor: "DarkBlue",
      color: "white",
      textAlign: "center",
      fontFamily: "Lucida Console",
      margin: "auto"
    }

    function AddField() {
      setCounter(counter + 1);
      setTerms([...terms, ""]);
    }

    function DeleteField(index) {
      if (counter !== 0) {
        setCounter(counter - 1);
      }
      const remove = [...terms];
      remove.splice(index, 1);
      setTerms(remove);
    }

    function ChangeInput(event, index) {
      const {value} = event.target;
      const changeValue = [...terms];
      changeValue[index] = value;
      setTerms(changeValue);
    }

    function Clear() {
      const clear = [];
      setTerms(clear);
      setCounter(0);
    }
    
    function Definition(words) {
      let flag = 0;
      const definitionAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";
      for (let j = 0; j < words.length; j++) {
        if (words[j] == "") {
            alert("Error. Please finish before submitting.");
            flag = 1;
            definitionArray = [];
            break;
        }
      }
      if (flag == 0) {
        handle++;
          for (let i = 0; i < words.length; i++) {
              let url = definitionAPI.concat(words[i]);
              fetch(url)
                  .then((res) => res.json())
                  .then((data) => {
                      if (data[0].meanings != undefined) {
                        console.log(data[0].meanings[0].definitions[0].definition);
                        definitionArray[i] = data[0].meanings[0].definitions[0].definition;
                      }
                  });
          }
          if (definitionArray.length > 0) {
            document.getElementById("card").innerHTML = words[0];
            currentCard = 0;
          }
      }
    }

    function flip(words) {
      for (let i = 0; i < words.length; i++) {
        if (document.getElementById("card").innerHTML == words[i]) {
          document.getElementById("card").innerHTML = definitionArray[i];
          break;
        }
        else if (document.getElementById("card").innerHTML == definitionArray[i]) {
          document.getElementById("card").innerHTML = words[i];
          break;
        }
      }
    }

    function next(words) {
      if (currentCard < (words.length - 1)) {
        currentCard++;
        document.getElementById("card").innerHTML = words[currentCard];
      }
    }

    function back(words) {
      if (currentCard > 0) {
        currentCard--;
        document.getElementById("card").innerHTML = words[currentCard];
      }
    }

    function CallDefinition(words){
      Definition(words)
    }

    return (
      <Dashboard>
      <div style={{backgroundColor:"DodgerBlue"}}>
        <h1 style={header}>Local Flashcard Generator with Dictionary API (Please make sure to spell all words correctly)</h1>
          <div style={body}>
            <button style={buttons} disabled={counter>=10} onClick={AddField}>Add New Word</button>
            <button style={buttons} onClick={Clear}>Clear All Words</button>
            <button style={buttons} onClick={() => CallDefinition(terms)}>Create Flashcard Set</button><br />
            <div>
                <p id="card" style={flashcard}></p><br />
                <button style={flashcardButtons} onClick={() => flip(terms)}>Flip</button>
                <button style={flashcardButtons} onClick={() => next(terms)}>Next</button>
                <button style={flashcardButtons} onClick={() => back(terms)}>Back</button>
            </div>
                <label>Enter word(s) (Max 10):</label>
                {terms.map((content, index) =>
                    <div>
                      <input value={content} style={{color:"DarkBlue"}}onChange={(event) => ChangeInput(event, index)}></input>
                      <button style={buttons} onClick={() => DeleteField(index)}>Delete Word</button>
                    </div>
                )}
          </div>
      </div>
      </Dashboard>
    );
}
