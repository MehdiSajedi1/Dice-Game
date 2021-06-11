import React, { useState, useEffect } from 'react';
import Player from './components/Player';
import Dice from './components/Dice';
import Button from './components/Button';
import './App.css';

function App() {
  const [showDice, setShowDice] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(0);

  const [activePlayer1, setActivePlayer1] = useState(true);
  const [activePlayer2, setActivePlayer2] = useState(false);

  const [currentScore1, setCurrentScore1] = useState(0);
  const [currentScore2, setCurrentScore2] = useState(0);

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [winnerPlayer1, setWinnerPlayer1] = useState(false);
  const [winnerPlayer2, setWinnerPlayer2] = useState(false);

  const rollDice = () => {
    if (score1 >= 100 || score2 >= 100) return;
    setShowDice(true);

    if (activePlayer1) {
      const roll = Math.floor(Math.random() * 6 + 1);
      setCurrentRoll(roll);

      if (roll !== 1) {
        setCurrentScore1((prevState) => prevState + roll);
      }
    }

    if (activePlayer2) {
      const roll = Math.floor(Math.random() * 6 + 1);
      setCurrentRoll(roll);

      if (roll !== 1) {
        setCurrentScore2((prevState) => prevState + roll);
      }
    }
  };

  useEffect(() => {
    if (currentRoll === 1) {
      setActivePlayer1((prevState) => !prevState);
      setActivePlayer2((prevState) => !prevState);
      setCurrentScore1(0);
      setCurrentScore2(0);
    }
  }, [currentRoll]);

  useEffect(() => {
    if (score1 >= 100 || score2 >= 100)
      if (score1 >= 100) {
        setWinnerPlayer1(true);
      } else {
        setWinnerPlayer2(true);
      }
  }, [score1, score2]);

  const hold = () => {
    if (score1 >= 100 || score2 >= 100) return;

    if (activePlayer1) {
      setScore1((prevState) => prevState + currentScore1);
      setCurrentScore1(0);
    }

    if (activePlayer2) {
      setScore2((prevState) => prevState + currentScore2);
      setCurrentScore2(0);
    }
    setActivePlayer1((prevState) => !prevState);
    setActivePlayer2((prevState) => !prevState);
  };

  const newGame = () => {
    setScore1(0);
    setScore2(0);
    setCurrentScore1(0);
    setCurrentScore2(0);
    setWinnerPlayer1(false);
    setWinnerPlayer2(false);
    setActivePlayer1(true);
    setActivePlayer2(false);
    setShowDice(false);
  };

  return (
    <main className="App">
      <Player
        text="Player 1"
        activePlayer={activePlayer1}
        score={score1}
        currentScore={currentScore1}
        winnerPlayer={winnerPlayer1}
      />
      <Player
        text="Player 2"
        activePlayer={activePlayer2}
        score={score2}
        currentScore={currentScore2}
        winnerPlayer={winnerPlayer2}
      />
      {showDice ? <Dice currentRoll={currentRoll} /> : null}
      <Button text="🔄 New Game" className="btn--new" onClick={newGame} />
      <Button text="🎲 Roll Dice" className="btn--roll" onClick={rollDice} />
      <Button text="📥 Hold" className="btn--hold" onClick={hold} />
    </main>
  );
}

export default App;
