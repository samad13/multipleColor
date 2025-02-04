// import React from 'react'
// import style from './box.module.css'
// import { useState } from 'react'
// // const [count, setCount] = useState(0)

// const Box = () => {
//    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

//     const randomColor = () => {
//     const randomIndex = Math.floor(Math.random() * colors.length)
//     return colors[randomIndex]
//     }
//     const shuffleColors = (colors) => {
//         for (let i = colors.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1))
//           ;[colors[i], colors[j]] = [colors[j], colors[i]]
//         }
//         return colors
//       }

//       const shuffledColors = shuffleColors([...colors])

//   const buttons = shuffledColors.map((color, index) => (
//     <button key={index} data-testid="colorOption" style={{ backgroundColor: color }}></button>
//   ))
//   return (
//     <>
    
//       <form>
//         <h1 className={style.title}>Guess the correct color!</h1>
//         <p className={style.text}>Click on the button that matches the color displayed</p>
       
        

//       <div className='all'>
//     <div data-testid="colorBox" className={style.targetColor} style={{ backgroundColor:  randomColor(colors)}}> </div>
//     <div className={style.buttonContainer}>
 
//        {buttons}
//       </div>
//      {/* <h1 className={style.result}>`scores:{count}`</h1>  */}
//       <button  className={style.reset}>Reset</button> 


     
//       </div>
//       </form>
//     </>
//   )
// }

// export default Box


// import React, { useState, useEffect } from 'react';
// import style from './box.module.css';

// const Box = () => {
//   const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  
//   // Initialize score from localStorage
//   const [score, setScore] = useState(() => {
//     const savedScore = localStorage.getItem('colorGameScore');
//     return savedScore ? parseInt(savedScore) : 0;
//   });

//   const [targetColor, setTargetColor] = useState(
//     colors[Math.floor(Math.random() * colors.length)]
//   );

//   const [shuffledColors, setShuffledColors] = useState([]);

//   // Persist score to localStorage
//   useEffect(() => {
//     localStorage.setItem('colorGameScore', score.toString());
//   }, [score]);

//   // Shuffle colors on mount and when target changes
//   useEffect(() => {
//     const newColors = [...colors].sort(() => Math.random() - 0.5);
//     setShuffledColors(newColors);
//   }, [targetColor]);

//   const handleButtonClick = (color) => {
//     if (color === targetColor) {
//       setScore(prev => prev + 1);
//       setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
//     }
//   };
//   const reset = () => {
//     setScore(0);
//   }

//   return (
//     <div className='all'>
//       <div 
//         data-testid="colorBox" 
//         className={style.targetColor} 
//         style={{ backgroundColor: targetColor }}
//       ></div>
//       <div className={style.buttonContainer}>
//         {shuffledColors.map((color, index) => (
//           <button
//             key={index}
//             data-testid="colorOption"
//             style={{ backgroundColor: color }}
//             onClick={() => handleButtonClick(color)}
//           ></button>
//         ))}
//       </div>
//       <div className={style.scoreAndReset}>
//       <div className={style.score}>Score: {score}</div>
//       <button  className={style.reset} onClick={reset}>Reset</button> 
//       </div>
//     </div>
//   );
// };

// export default Box;



///check the one that doesnt change if the color in the box is the same as the color in the button
/// even if it wrong or right it should still change the color in the box
import React, { useState, useEffect } from 'react';
import style from './box.module.css';

const Box = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  
  // Initialize score to 0 (no localStorage)
  const [score, setScore] = useState(0);
  const[correct, setCorrect] = useState(null)
  const [targetColor, setTargetColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  const [shuffledColors, setShuffledColors] = useState([]);

  // Removed localStorage useEffect

  useEffect(() => {
    const newColors = [...colors].sort(() => Math.random() - 0.5);
    setShuffledColors(newColors);
  }, [targetColor]);

  const handleButtonClick = (color) => {
    if (color === targetColor) {
      setScore(prev => prev + 1);
      setCorrect(true)
      setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    }else{
        setCorrect(false)
    }
  };

  const reset = () => {
    setScore(0);
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
        {correct !== null && (correct ? <h1 data-testid="gameStatus">Correct</h1> : <h1 data-testid="gameStatus">Wrong</h1>)}
        <button data-testid="newGameButton" className={style.reset} onClick={reset}>Reset</button> 
      </div>
    </div>
    </>
  );
};

export default Box;