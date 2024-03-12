import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const AerialImpetus2E = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  const handleMove = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Aerial Impetus Purge Move"
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Aerial Impetus Purge Move2",
      player: props.player,
      victim: props.victim,
    });

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>You may force them to move to an adjacent zone.</h2>

        <div className="twoColumn">
          <button onClick={() => handleSkip()}>Skip</button>
          <button onClick={() => handleMove()}>Move</button>
        </div>
      </div>
    </div>
  );
};

export default AerialImpetus2E;
