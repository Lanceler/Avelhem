import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const SymphonicScreechFloat = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const {} = useRecurringEffects();

  const handleFloat = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    newGameState.currentResolution[
      newGameState.currentResolution.length - 1
    ].conclusion = "float";

    dispatch(updateState(newGameState));

    // no need to update Firebase
  };

  const handleProceed = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));

    // no need to update Firebase
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const revealOptions = () => {
    if (props.canFloat) {
      return (
        <>
          <div>Do you want to float it?</div>
          <button onClick={() => handleProceed()}>No</button>
          <button onClick={() => handleFloat()}>Yes</button>
        </>
      );
    } else {
      return <button onClick={() => handleProceed()}>Proceed</button>;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Symphonic Screech</h2>
        <div>The effects of your skill have been negated!</div>
        {revealOptions()}
      </div>
    </div>
  );
};

export default SymphonicScreechFloat;
