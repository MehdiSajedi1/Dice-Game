import React, { useState, useEffect, useReducer, useCallback } from 'react';
import Player from './components/Player';
import Dice from './components/Dice';
import Button from './components/Button';
import './App.css';

const gamePoint = 30;

const roller = () => Math.floor(Math.random() * 6 + 1);

const initState = {
  activePlayer: true,
  currentScore: 0,
  score1: 0,
  score2: 0,
  currentRoll: 0,
};
const reducer = (state, action) => {
  if (action.type === 'ROLL-NOT-1') {
    return {
      ...state,
      currentRoll: roller(),
      currentScore: state.currentScore + state.currentRoll,
    };
  }
  if (action.type === 'ROLL-1') {
    return { ...state, activePlayer: !state.activePlayer, currentScore: 0 };
  }
  if (action.type === 'HOLD') {
    return { ...state, activePlayer: !state.activePlayer, currentScore: 0 };
  }
  if (action.type === 'RESET') {
    return initState;
  }
};

function App() {
  const [activePlayer, setActivePlayer] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [currentRoll, setCurrentRoll] = useState(0);

  const [gameState, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (currentRoll === 1) {
      setActivePlayer((prevActive) => !prevActive);
      setCurrentScore(0);
    }
  }, [currentRoll, setActivePlayer]);

  const rollDice = useCallback(() => {
    console.log('tryna run rollDice');
    if (score1 >= gamePoint || score2 >= gamePoint) return;

    const roll = Math.floor(Math.random() * 6 + 1);
    setCurrentRoll(roll);

    if (roll !== 1) {
      setCurrentScore((prevRoll) => prevRoll + roll);
    }
  }, [score1, score2]);

  const hold = useCallback(() => {
    console.log('tryna run hold');
    if (score1 >= gamePoint || score2 >= gamePoint) return;

    switch (activePlayer) {
      case true:
        setScore1((prevScore) => prevScore + currentScore);
        break;

      case false:
        setScore2((prevScore) => prevScore + currentScore);
        break;

      default:
        break;
    }
    setCurrentScore(0);
    setActivePlayer((prevActive) => !prevActive);
  }, [activePlayer, currentScore, score1, score2]);

  const newGame = () => {
    setScore1(0);
    setScore2(0);
    setActivePlayer(true);
    setCurrentScore(0);
    setCurrentRoll(0);
  };

  // * AUTOPLAY - Comment out for user play
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     rollDice();
  //   }, 500);

  //   if (activePlayer) {
  //     if (score1 + currentScore >= gamePoint) hold();
  //   }

  //   if (!activePlayer) {
  //     if (score2 + currentScore >= gamePoint) hold();
  //   }

  //   if (currentScore >= 20) {
  //     hold();
  //   }

  //   return () => clearInterval(interval);
  // }, [score1, score2, currentScore, activePlayer, hold, rollDice]);

  return (
    <main className="App">
      <Player
        playerNum="1"
        activePlayer={activePlayer}
        currentScore={currentScore}
        score={score1}
        gamePoint={gamePoint}
      />
      <Player
        playerNum="2"
        activePlayer={!activePlayer}
        currentScore={currentScore}
        score={score2}
        gamePoint={gamePoint}
      />
      {currentRoll !== 0 && <Dice currentRoll={currentRoll} />}
      <Button text="🔄 New Game" className="btn--new" onClick={newGame} />
      <Button text="🎲 Roll Dice" className="btn--roll" onClick={rollDice} />
      <Button text="📥 Hold" className="btn--hold" onClick={hold} />
    </main>
  );
}

export default App;
