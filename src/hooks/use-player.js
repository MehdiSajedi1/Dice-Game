import { useState, useEffect } from 'react';

const usePlayer = (active = true) => {
  const [activePlayer, setActivePlayer] = useState(active);
  const [score, setScore] = useState(0);
  const [winnerPlayer, setWinnerPlayer] = useState(false);

  useEffect(() => {
    if (score >= 15) setWinnerPlayer(true);
  }, [score]);

  return {
    activePlayer,
    setActivePlayer,
    score,
    setScore,
    winnerPlayer,
    setWinnerPlayer,
  };
};

export default usePlayer;
