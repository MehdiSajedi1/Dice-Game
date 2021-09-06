import React from 'react';
import RulesIcon from '../icons/rules.svg';

const Rules = ({ showModal, setShowModal }) => {
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <div className="rules-container" onClick={toggleModal}>
      <img src={RulesIcon} alt="rules" className="rules" />
    </div>
  );
};

export default Rules;
