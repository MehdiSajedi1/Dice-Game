import React from 'react';

const Player = ({ text, activePlayer, score, currentScore, winnerPlayer }) => {
  return (
    <section
      className={`player ${activePlayer ? 'player--active' : ''} ${
        winnerPlayer ? 'player--winner' : ''
      } `}
    >
      <h2 className="name">{text}</h2>
      <p className="score">{score}</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score">{currentScore}</p>
      </div>
    </section>
  );
};

export default Player;
