import React from 'react';

const Dice = ({ currentRoll }) => {
  return (
    <img
      src={`/images/dice-${currentRoll}.png`}
      className="dice"
      alt="Playing Dice"
    />
  );
};

export default Dice;
