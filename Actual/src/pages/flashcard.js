import React, { useState, useEffect } from "react";
import { Dictnavbar } from "../components/dictNavbar";
import "./Dictmain.css";


function decodeString(str) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
}

export const Flashcard = () => {
  
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevQuestion = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
    setIsFlipped(false);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch(
          "https://opentdb.com/api_category.php"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.trivia_categories);

        const flashcardsResponse = await fetch(
          `https://opentdb.com/api.php?amount=10&type=multiple${
            selectedCategory ? `&category=${selectedCategory}` : ""
          }`
        );
        const flashcardsData = await flashcardsResponse.json();

        const formattedData = flashcardsData.results.map((result, index) => ({
          id: index + 1,
          question: decodeString(result.question),
          correctAnswer: decodeString(result.correct_answer),
        }));

        setFlashcards(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <>
    <Dictnavbar/>
    <div className="flashcard-container">
      <h1>Flashcards that are created already for you!</h1>
      <div>
        <label htmlFor="category">Choose a category:</label>
        <select
          id="category"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="">Any Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {flashcards.length > 0 && (
        <div
          className={`flashcard ${isFlipped ? "flipped" : ""}`}
          onClick={handleClick}
        >
          <div className="card-content">
            <div className="front">{flashcards[currentIndex].question}</div>
            <div className="back">{flashcards[currentIndex].correctAnswer}</div>
          </div>
        </div>
      )}
      <div className="nextBackButtons">
        <button className="button" onClick={prevQuestion}>
          Back
        </button>
        <button className="button" onClick={nextQuestion}>
          Next
        </button>
      </div>
    </div>
    </>
  );
};
