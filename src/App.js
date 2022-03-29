import React, { useState, useEffect, useReducer } from 'react';
import Player from './components/Player';
import Dice from './components/Dice';
import Button from './components/Button';
import Rules from './components/Rules';
import RulesModal from './components/RulesModal';
import './App.css';
import './media.css';

const gamePoint = 100;

const diceRoller = () => Math.floor(Math.random() * 6 + 1);

const dices = [1, 2, 3, 4, 5, 6];

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
  const [game, dispatch] = useReducer(reducer, initState);
  const [showModal, setShowModal] = useState(false);

  // ROLL 1
  useEffect(() => {
    if (game.currentRoll === 1) {
      dispatch({ type: 'ROLL-1' });
    }
  }, [game.currentRoll]);

  // ROLL 2-6
  const rollDice = () => {
    if (game.score1 >= gamePoint || game.score2 >= gamePoint) return;
    return dispatch({ type: 'ROLL' });
  };

  // HOLD
  const hold = () => {
    if (game.score1 >= gamePoint || game.score2 >= gamePoint) return;
    dispatch({ type: 'HOLD' });
  };

  // NEW GAME
  const newGame = () => dispatch({ type: 'RESET' });

  return (
    <>
      <main className={`main ${showModal} ? 'faded' : ''`}>
        <Player
          playerNum="1"
          score={game.score1}
          activePlayer={game.activePlayer}
          currentScore={game.currentScore}
          gamePoint={gamePoint}
        />
        <Player
          playerNum="2"
          score={game.score2}
          activePlayer={!game.activePlayer}
          currentScore={game.currentScore}
          gamePoint={gamePoint}
        />
        {dices.map((dice) => {
          return <Dice roll={dice} currentRoll={game.currentRoll} />;
        })}
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
