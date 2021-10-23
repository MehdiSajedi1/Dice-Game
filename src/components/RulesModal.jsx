import React from 'react';

const RulesModal = React.memo(({ showModal }) => {
  return (
    <div className={`rules-modal ${showModal && 'open'}`}>
      <h1>Rules</h1>
      <ul>
        <li>Roll the dice as many times as you want</li>
        <li>Hold to secure your current points and add them to your total</li>
        <li>
          If you roll a 1, you forfeit your turn and lose all your current
          points
        </li>
        <li>First player to reach 100 points wins!</li>
      </ul>
    </div>
  );
});

export default RulesModal;
