import { useState, useEffect } from 'react';

const usePlayer = (active = true) => {
  const [activePlayer, setActivePlayer] = useState(active);
  const [currentScore, setCurrentScore] = useState(0);
  const [score, setScore] = useState(0);
  const [winnerPlayer, setWinnerPlayer] = useState(false);

  useEffect(() => {
    if (score >= 15) setWinnerPlayer(true);
  }, [score]);

 

  return {
    activePlayer,
    setActivePlayer,
    currentScore,
    setCurrentScore,
    score,
    setScore,
    winnerPlayer,
    setWinnerPlayer,
  };
};

export default usePlayer;
