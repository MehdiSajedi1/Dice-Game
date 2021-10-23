import React from 'react';

const Dice = ({ roll, currentRoll }) => {
  return (
    <img
      src={`/images/dice-${roll}.png`}
      className={`dice ${currentRoll === roll && 'active'} `}
      alt="Playing Dice"
    />
  );
};

export default Dice;
