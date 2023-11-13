import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

function  derivedActivePlayer(gameTurns){

  let currentPlayer='X';
  
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer='O';
  }
  return currentPlayer;
}
// GameBoard function
function deriveGameBoard(gameTurns){
  //deep copy of initial array
  let gameSymbol=[...initialGameBoard.map(array=>[...array])];

  for(const turn of gameTurns){
      const {square,player}=turn;
      const {row,col}=square;

      gameSymbol[row][col]=player;
  }
  return gameSymbol;
}
// Winner Function
function deriveWinner(gameSymbol,players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameSymbol[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameSymbol[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameSymbol[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=players[firstSquareSymbol];
    }
  }
  return winner;
}


function App() {
  const [players,setPlayers]=useState({
    'X':'Player1',
    'O':'Player2',
  })
  const [gameTurns,setGameTurns]=useState([]);
  // const [activePlayer,setActive]=useState('X');
  // const [hashWinner,setHashWinner]=useState(false);

  const activePlayer=derivedActivePlayer(gameTurns);

  const gameSymbol=deriveGameBoard(gameTurns);
  
  const winner=deriveWinner(gameSymbol,players);
  
  const hasDraw=gameTurns.length===9 && !winner;  //Draw condition

  function handlePlayer(rowIndex,colIndex){
    // setActive((currPlayer)=>currPlayer==='X'?'O':'X');

    setGameTurns(prevturns=>{
      const currentPlayer=derivedActivePlayer(prevturns)
      const updatedTurns=[
        {square:{row:rowIndex,col:colIndex},player:currentPlayer},
        ...prevturns];
        return updatedTurns;
    })
  }
  // game restart function
  function handleRestart(){
    setGameTurns([]);
  }
  // show name on winning based on symbol
  function handlePlayerName(symbol,newName){
    setPlayers(prev=>{
      return{
      ...prev,
      [symbol]:newName
      }
    })
  }

  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerName}/>
        <Player initialName="Player2" symbol="O" isActive={activePlayer==='O'}  onChangeName={handlePlayerName}/>
      </ol>
      {/* {console.log(gameTurns)} */}
      {(winner ||hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectPlayer={handlePlayer} board={gameSymbol}/>
    </div>
    <Log turns={gameTurns}/>
   </main>
  );
}

export default App;
