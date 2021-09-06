import React from 'react';

const Player = ({
  playerNum,
  score,
  gamePoint,
  currentScore,
  activePlayer,
}) => {
  return (
    <section
      className={`player ${activePlayer ? 'player--active' : ''} ${
        score >= gamePoint ? 'player--winner' : ''
      } `}
    >
      <h2 className="name">Player {playerNum}</h2>
      <p className="score">{score}</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score">{activePlayer ? currentScore : 0}</p>
      </div>
    </section>
  );
};

export default Player;
