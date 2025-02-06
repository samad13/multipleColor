
import React, { useState, useEffect } from 'react';
import style from './box.module.css';
import 'animate.css';
import { MdCelebration } from "react-icons/md";


const Box = () => {
  const colors = ['red', 'pink', 'green', 'yellow', 'purple', 'orange'];
  
  
  const [score, setScore] = useState(0);
  const[correct, setCorrect] = useState(null)
  const [targetColor, setTargetColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  const [shuffledColors, setShuffledColors] = useState([]);


  useEffect(() => {
    const newColors = [...colors].sort(() => Math.random() - 0.5);
    setShuffledColors(newColors);
  }, [targetColor]);

  const handleButtonClick = (color) => {
    setCorrect(color === targetColor);
    const newTargetColor = colors[Math.floor(Math.random() * colors.length)];
    setTimeout(() => {
    setTargetColor(newTargetColor);
  
    setShuffledColors([...colors].sort(() => Math.random() - 0.5));
    }, 1000);
    if (color === targetColor) {
        
      setScore(score + 1);
    }
    setTimeout(() => {
        setCorrect(null);
      }, 2000);
  };

  const reset = () => {
    setScore(0);
    setCorrect(null)
  };

  return (
   <>
     <h1 data-testid="gameInstructions" className={style.title}>Guess the correct color!</h1>
    <p className={style.text}>Click on the button that matches the color displayed</p>
    
    <div className='all'>
      <div 
        data-testid="colorBox" 
        className={style.targetColor} 
        style={{ backgroundColor: targetColor }}
      ></div>
      <div className={style.buttonContainer}>
        {shuffledColors.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            style={{ backgroundColor: color }}
            onClick={() => handleButtonClick(color)}
          ></button>
        ))}
      </div>
      <div className={style.scoreAndReset}>
        <div data-testid="score" className={style.score}>Score: {score}</div>
    
    
        {correct !== null && (
  <h1
    data-testid="gameStatus"
    className={`animate__animated animate__fadeOutUp status-message ${correct ? "correct" : "wrong"}`}
    style={{ color: 'white' }}
  >
    {correct ? <>Correct <MdCelebration /></>  : "Wrong"}
  </h1>
)}
        <button data-testid="newGameButton" className={style.reset} onClick={reset}>new game</button> 
      </div>
    </div>
    </>
  );
};

export default Box;