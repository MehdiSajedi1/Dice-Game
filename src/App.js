import React, { useState, useEffect } from 'react';
import Player from './components/Player';
import Dice from './components/Dice';
import Button from './components/Button';
import usePlayer from './hooks/use-player';
import './App.css';

function App() {
  const {
    activePlayer: activePlayer1,
    setActivePlayer: setActivePlayer1,
    score: score1,
    setScore: setScore1,
    winnerPlayer: winnerPlayer1,
    setWinnerPlayer: setWinnerPlayer1,
  } = usePlayer();

  const {
    activePlayer: activePlayer2,
    setActivePlayer: setActivePlayer2,
    score: score2,
    setScore: setScore2,
    winnerPlayer: winnerPlayer2,
    setWinnerPlayer: setWinnerPlayer2,
  } = usePlayer(false);

  const [showDice, setShowDice] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(0);

  const [currentScore, setCurrentScore] = useState(0);

  const rollDice = () => {
    if (score1 >= 15 || score2 >= 15) return;
    setShowDice(true);

    const roll = Math.floor(Math.random() * 6 + 1);
    setCurrentRoll(roll);

    if (roll !== 1) {
      setCurrentScore((prevState) => prevState + roll);
    }
  };

  useEffect(() => {
    if (currentRoll === 1) {
      setActivePlayer1((prevState) => !prevState);
      setActivePlayer2((prevState) => !prevState);
      setCurrentScore(0);
    }
  }, [currentRoll, setActivePlayer1, setActivePlayer2]);

  const hold = () => {
    if (score1 >= 15 || score2 >= 15) return;

    if (activePlayer1) {
      setScore1((prevState) => prevState + currentScore);
    }

    if (activePlayer2) {
      setScore2((prevState) => prevState + currentScore);
    }
    setCurrentScore(0);

    setActivePlayer1((prevState) => !prevState);
    setActivePlayer2((prevState) => !prevState);
  };

  const newGame = () => {
    setScore1(0);
    setScore2(0);
    setWinnerPlayer1(false);
    setWinnerPlayer2(false);
    setActivePlayer1(true);
    setActivePlayer2(false);

    setCurrentScore(0);
    setShowDice(false);
  };

  return (
    <main className="App">
      <Player
        text="Player 1"
        activePlayer={activePlayer1}
        score={score1}
        currentScore={currentScore}
        winnerPlayer={winnerPlayer1}
      />
      <Player
        text="Player 2"
        activePlayer={activePlayer2}
        score={score2}
        currentScore={currentScore}
        winnerPlayer={winnerPlayer2}
      />
      {showDice && <Dice currentRoll={currentRoll} />}
      <Button text="🔄 New Game" className="btn--new" onClick={newGame} />
      <Button text="🎲 Roll Dice" className="btn--roll" onClick={rollDice} />
      <Button text="📥 Hold" className="btn--hold" onClick={hold} />
    </main>
  );
}

export default App;
