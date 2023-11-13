// import { useState } from "react"


export default function GameBoard({onSelectPlayer,board}){
    // const [gameSymbol,setGameSymbol]=useState(initialGameBoard);

    // function handleSquare(rowIndex,colIndex){
    //     setGameSymbol((prev)=>{
    //         const updatedBoard=[...prev.map(innerArray=>[...innerArray])];
    //         updatedBoard[rowIndex][colIndex]=activePlayerSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectPlayer()
    // }

    return(
        <ol id="game-board">
            {board.map((row,rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((col,colIndex)=>(
                            <li key={colIndex}><button onClick={()=>onSelectPlayer(rowIndex,colIndex)} 
                            disabled={col!==null}>
                                {col}
                                </button></li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}