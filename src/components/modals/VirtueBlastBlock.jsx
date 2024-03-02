import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const VirtueBlastBlock = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { virtueBlastNo, virtueBlastYes } = useRecurringEffects();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const handleNo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState = virtueBlastNo(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleYes = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState = virtueBlastYes(newGameState, props.attacker, props.victim);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const message = `Enemy ${props.attacker.unitClass} is about to Virtue-blast your ${props.victim.unitClass} (Row ${props.victim.row} Col. ${props.victim.column}).`;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Block Virtue Blast</h2>
        <h3>{message}</h3>
        <h3>
          Do you want to spend your unit’s Virtue to reduce the attack’s AP by
          1? This will restore the attaking unit’s Virtue.
        </h3>
        <div className="twoColumn">
          <button onClick={() => handleNo()}>No</button>
          <button onClick={() => handleYes()}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default VirtueBlastBlock;
