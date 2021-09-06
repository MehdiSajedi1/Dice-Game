import React, { useState, useEffect, useReducer } from 'react';
import Player from './components/Player';
import Dice from './components/Dice';
import Button from './components/Button';
import Rules from './components/Rules';
import RulesModal from './components/RulesModal';
import './App.css';

const gamePoint = 25;

const diceRoller = () => Math.floor(Math.random() * 6 + 1);

const initState = {
  activePlayer: true,
  currentScore: 0,
  score1: 0,
  score2: 0,
  currentRoll: 0,
};

const reducer = (state, action) => {
  if (action.type === 'ROLL') {
    const roll = diceRoller();
    return {
      ...state,
      currentRoll: roll,
      currentScore: state.currentScore + roll,
    };
  }

  if (action.type === 'ROLL-1') {
    return { ...state, activePlayer: !state.activePlayer, currentScore: 0 };
  }

  if (action.type === 'HOLD') {
    if (state.activePlayer) {
      return {
        ...state,
        activePlayer: !state.activePlayer,
        currentScore: 0,
        score1: state.score1 + state.currentScore,
      };
    }
    if (!state.activePlayer) {
      return {
        ...state,
        activePlayer: !state.activePlayer,
        currentScore: 0,
        score2: state.score2 + state.currentScore,
      };
    }
  }

  if (action.type === 'RESET') {
    return initState;
  }
};

function App() {
  const [gameState, dispatch] = useReducer(reducer, initState);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (gameState.currentRoll === 1) {
      dispatch({ type: 'ROLL-1' });
    }
  }, [gameState.currentRoll]);

  const rollDice = () => {
    if (gameState.score1 >= gamePoint || gameState.score2 >= gamePoint) return;
    return dispatch({ type: 'ROLL' });
  };

  const hold = () => {
    if (gameState.score1 >= gamePoint || gameState.score2 >= gamePoint) return;
    dispatch({ type: 'HOLD' });
  };

  const newGame = () => dispatch({ type: 'RESET' });

  return (
    <>
      <main className={showModal ? 'faded' : undefined}>
        <Player
          playerNum="1"
          score={gameState.score1}
          activePlayer={gameState.activePlayer}
          currentScore={gameState.currentScore}
          gamePoint={gamePoint}
        />
        <Player
          playerNum="2"
          score={gameState.score2}
          activePlayer={!gameState.activePlayer}
          currentScore={gameState.currentScore}
          gamePoint={gamePoint}
        />
        {gameState.currentRoll !== 0 && (
          <Dice currentRoll={gameState.currentRoll} />
        )}
        <Button text="🔄 New Game" className="btn--new" onClick={newGame} />
        <Button text="🎲 Roll Dice" className="btn--roll" onClick={rollDice} />
        <Button text="📥 Hold" className="btn--hold" onClick={hold} />
      </main>
      <Rules showModal={showModal} setShowModal={setShowModal} />
      <RulesModal showModal={showModal} />
    </>
  );
}

export default App;
