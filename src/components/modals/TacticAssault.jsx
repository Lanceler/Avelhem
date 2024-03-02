import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const TacticAssault = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { canStrike, canMove, getVacantAdjacentZones, getZonesWithEnemies } =
    useRecurringEffects();

  let canTraverse = false;
  if (canMove(props.unit)) {
    //to-do: rootedUnit must spend 1 skill

    canTraverse = true;
  } else {
    console.log(canMove(props.unit));
    console.log("Cannot Traverse.");
  }

  const handleReturn = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleTraverse = () => {
    if (canTraverse) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end Assault Tactic resolution
      newGameState.currentResolution.pop();

      props.enterMoveMode(
        getVacantAdjacentZones(props.unit),
        props.unit,
        newGameState,
        props.tactic
      );
    }
  };

  const handleStrike = () => {
    if (canStrike(props.unit)) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end Assault Tactic resolution
      newGameState.currentResolution.pop();

      //giveUnit activationCounter
      let unit = newGameState[props.unit.player].units[props.unit.unitIndex];
      console.log(unit);
      unit.temporary.activation
        ? (unit.temporary.activation = unit.activation + 1)
        : (unit.temporary.activation = 1);

      newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

      //newGameState.activatingSkill.push("Assault") <-- to do
      newGameState.activatingUnit.push(unit);

      newGameState.currentResolution.push({
        resolution: "Tactic End",
        unit: unit,
      });

      props.enterSelectUnitMode(
        getZonesWithEnemies(props.unit, 1),
        props.unit,
        newGameState,
        props.tactic,
        "strike",
        null
      );
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Assault Tactic</h2>

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

        <button onClick={() => handleReturn()}>Return</button>
      </div>
    </div>
  );
};

export default TacticAssault;
