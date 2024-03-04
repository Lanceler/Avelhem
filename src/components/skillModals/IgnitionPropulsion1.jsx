import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const IgnitionPropulsion1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const { canStrike, canMove, getVacantAdjacentZones, getZonesWithEnemies } =
    useRecurringEffects();

  let canTraverse = false;
  if (canMove(props.unit)) {
    canTraverse = true;
  } else {
    console.log(canMove(props.unit));
    console.log("Cannot Traverse.");
  }

  const handleTraverse = () => {
    if (canTraverse) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end "Ignition Propulsion1" resolution
      newGameState.currentResolution.pop();

      props.enterMoveMode(
        getVacantAdjacentZones(props.unit),
        props.unit,
        newGameState,
        null
      );
    }
  };

  const handleStrike = () => {
    if (canStrike(props.unit)) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end Assault Tactic resolution
      newGameState.currentResolution.pop();

      props.enterSelectUnitMode(
        getZonesWithEnemies(props.unit, 1),
        props.unit,
        newGameState,
        null,
        "strike",
        "Fire Scion"
      );
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Ignition Propulsion</h2>

        <div className="twoColumn">
          <div
            className={`choiceWithDescription ${
              canTraverse ? "" : "disabledOption"
            }`}
            onClick={() => handleTraverse()}
          >
            <h2>Traverse</h2>
            <h4>Move to an adjacent vacant zone.</h4>
          </div>

          <div
            className={`choiceWithDescription ${
              canStrike(props.unit) ? "" : "disabledOption"
            }`}
            onClick={() => handleStrike()}
          >
            <h2>Strike</h2>
            <h4>Target an adjacent enemy.</h4>
            <h4>Attack them.</h4>
            <h4>
              If the attack was lethal, move {"("}bypass motion contingent
              skills{")"} into the zone they were occupying.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IgnitionPropulsion1;
