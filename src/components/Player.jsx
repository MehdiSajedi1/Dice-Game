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
      className={`player player--${playerNum} ${
        activePlayer ? 'player--active' : ''
      } ${score >= gamePoint ? 'player--winner' : ''} `}
    >
      <div className="player-info">
        <div className="player-score-box">
          <h2 className="name">Player {playerNum}</h2>
          <p className="score">{score}</p>
        </div>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score">{activePlayer ? currentScore : 0}</p>
        </div>
      </div>
    </section>
  );
};

export default Player;
