import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const BlazeOfGloryDraw = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const { drawSkill } = useRecurringEffects();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  const handleDraw = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

    unit.fever = unit.fever - 1;
    newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

    newGameState.currentResolution.pop();

    newGameState = drawSkill(newGameState);

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>You may spend 1 Fever to draw 1 skill.</h2>

        <div className="twoColumn">
          <button onClick={() => handleSkip()}>Skip</button>
          <button onClick={() => handleDraw()}>Draw</button>
        </div>
      </div>
    </div>
  );
};

export default BlazeOfGloryDraw;
