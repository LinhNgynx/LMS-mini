import React, { useContext, useState, useEffect, useRef } from "react";
import { BoardContext } from "../../context/BoardContext";
import Card from "../Card/Card";
import { boards } from "../../db/board";

const shuffle2DArray = (array) => {
  const flatArray = array.flat();

  for (let i = flatArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatArray[i], flatArray[j]] = [flatArray[j], flatArray[i]];
  }

  const shuffled2DArray = [];
  let rowSize = array[0].length;

  for (let i = 0; i < flatArray.length; i += rowSize) {
    shuffled2DArray.push(flatArray.slice(i, i + rowSize));
  }

  return shuffled2DArray;
};

export default function Board() {
  const [move, setMove] = useState(0);
  const [timer, setTimer] = useState(0);
  const [pair, setPair] = useState([]);
  const [finished, setFinished] = useState(0);
  const { board, boardState, setBoardState, setBoard } = useContext(BoardContext);
  const deepCopy = (arr) => JSON.parse(JSON.stringify(arr));
  
  const [tempBoardState] = useState(deepCopy(boardState));
  const timerInterval = useRef(null);

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);
    
    return () => clearInterval(timerInterval.current); 
  }, []);

  useEffect(() => {
    if (finished === 8) { 
      clearInterval(timerInterval.current);
    }
  }, [finished]);

  const handleClick = (dx, dy) => {
    if (boardState[dx][dy].isDisabled || pair.length === 2) return;
    if (pair.some(p => p.x === dx && p.y === dy)) return;
    
    const updatedBoardState = [...boardState];
    updatedBoardState[dx][dy].isRevealed = true;
    setBoardState(updatedBoardState);
    
    const newPair = [...pair, { x: dx, y: dy }];
    setPair(newPair);
    
    if (newPair.length === 2) {
      const [first, second] = newPair;
      if (board[first.x][first.y] !== board[second.x][second.y]) {
        setTimeout(() => {
          updatedBoardState[first.x][first.y].isRevealed = false;
          updatedBoardState[second.x][second.y].isRevealed = false;
          setBoardState([...updatedBoardState]);
        }, 500);
      } else {
        updatedBoardState[first.x][first.y].isDisabled = true;
        updatedBoardState[second.x][second.y].isDisabled = true;
        setFinished((prev) => prev + 1);
      }
      
      setMove((prev) => prev + 1);
      setPair([]);
    }
  };

  const resetGame = () => {
    setTimer(0);
    setMove(0);
    setPair([]);
    setFinished(0);
    setBoard(shuffle2DArray(boards));
    setBoardState(deepCopy(tempBoardState));
    clearInterval(timerInterval.current); 
    timerInterval.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000); // Start a new timer
  };

  return (
    <>
      {finished === 8 ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            width: "300px",
            height: "400px",
            backgroundColor: "lavender",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <p>Moves: {move}</p>
            <p>Times: {timer} </p>
            <button onClick={resetGame}>Play again</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            width: "300px",
            height: "400px",
            backgroundColor: "lavender",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <p>Moves: {move}</p>
            <p>Times: {timer} </p>
            <table>
              <tbody>
                {board.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cellContent, colIndex) => (
                      <td key={colIndex}>
                        <Card
                          content={cellContent}
                          state={boardState[rowIndex][colIndex].isRevealed}
                          handleClick={() => handleClick(rowIndex, colIndex)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={resetGame}>Stop Game</button>
          </div>
        </div>
      )}
    </>
  );
}
