import React from "react";
import Start from "./components/Start/Start";
import Board from "./components/Board/Board";
import { BoardProvider } from "./context/BoardContext";
function App() {
  return (
    <>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </>
  );
}

export default App;
