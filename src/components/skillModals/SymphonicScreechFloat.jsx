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

    let backtrack = 2;

    if (
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution === "Symphonic Screech2"
    ) {
      backtrack = 3;
    }

    newGameState.currentResolution[
      newGameState.currentResolution.length - backtrack
    ].conclusion = "float";

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleProceed = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const revealOptions = () => {
    if (props.canFloat) {
      return (
        <>
          <h3>
            Because they are 2 spaces from the activator, they may float it.
          </h3>
          <div className="twoColumn bottomAnchor">
            <button
              className="choiceButton noYes"
              onClick={() => handleProceed()}
            >
              Skip
            </button>
            <button
              className="choiceButton noYes"
              onClick={() => handleFloat()}
            >
              Float
            </button>
          </div>
        </>
      );
    } else {
      return (
        <button className="choiceButton noYes" onClick={() => handleProceed()}>
          Proceed
        </button>
      );
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal modalNoYes">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Symphonic Screech</h2> */}

        <div className="twoColumn">
          <h2 className="choiceTitle">Symphonic Screech</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>The effects of your unit’s skill have been negated!</h3>
        {revealOptions()}
      </div>
    </div>
  );
};

export default SymphonicScreechFloat;
