import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const YouMayNoYes = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  const dispatch = useDispatch();

  const { getZonesWithEnemies } = useRecurringEffects();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const handleNo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  const handleYes = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "Gale Conjuration Strike":
        newGameState.currentResolution.push({
          resolution: "Gale ConjurationR3",
          unit: props.unit,
        });

        props.enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "strike",
          "Gale Conjuration Strike"
        );

        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.details.title}</h2>
        <h3>{props.details.message}</h3>

        <div className="twoColumn">
          <button onClick={() => handleNo()}>{props.details.no}</button>
          <button onClick={() => handleYes()}>{props.details.yes}</button>
        </div>
      </div>
    </div>
  );
};

export default YouMayNoYes;
