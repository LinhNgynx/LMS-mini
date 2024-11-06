import { createContext, useState } from "react";
import { boards as BoardData} from "../db/board";
import { initialBoardStates } from "../db/board";
export const BoardContext=createContext();
export const BoardProvider =({children})=>{
     const [board, setBoard] = useState(BoardData);
     const [boardState, setBoardState]=useState(initialBoardStates);
    return (
     <BoardContext.Provider value={{board, setBoard, boardState, setBoardState}}>
        {children}
     </BoardContext.Provider>
    )
}