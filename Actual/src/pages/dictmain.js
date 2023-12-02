import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Dictnavbar } from "../components/dictNavbar";
import "./Dictmain.css";

export const Dictmain = () => {

  const location = useLocation();
  const receivedData = location.state;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const numCards = receivedData.fields.length;

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % numCards);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + numCards) % numCards);
    setIsFlipped(false);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <Dictnavbar />
      <div className="flashcard-container">
        <div
          className={`flashcard ${isFlipped ? "flipped" : ""}`}
          onClick={handleClick}
        >
          <div className="card-content">
            <div className={`front ${isFlipped ? "hidden" : ""}`}>
              {receivedData.fields[currentCardIndex].termField}
            </div>
            <div className={`back ${isFlipped ? "" : "hidden"}`}>
              {receivedData.fields[currentCardIndex].defField}
            </div>
          </div>
        </div>

        <div className="nextBackButtons">
          <button onClick={prevCard} className="button">
            Back
          </button>
          <button onClick={nextCard} className="button">
            Next
          </button>
        </div>
      </div>
    </>
  );
};


