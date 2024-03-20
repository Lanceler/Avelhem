import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const TacticAdvance = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const {
    canBlast,
    canMove,
    getVacantAdjacentZones,
    getZonesWithEnemies,
    isDisrupted,
    isMuted,
  } = useRecurringEffects();

  let canTraverse = false;
  if (canMove(props.unit)) {
    canTraverse = true;
  } else {
    console.log(canMove(props.unit));
  }

  let canVirtueBlast = false;

  if (
    props.unit.unitClass !== "Pawn" &&
    props.unit.virtue &&
    canBlast(props.unit) &&
    !props.unit.afflictions.root &&
    !isDisrupted(props.unit, 2)
  ) {
    canVirtueBlast = true;
  }

  const handleReturn = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleTraverse = () => {
    if (canTraverse) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end Advance Tactic resolution
      newGameState.currentResolution.pop();

      props.enterMoveMode(
        getVacantAdjacentZones(props.unit),
        props.unit,
        newGameState,
        props.tactic
      );
    }
  };

  const handleVirtueBlast = () => {
    if (canVirtueBlast) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end Advance Tactic resolution
      newGameState.currentResolution.pop();

      //giveUnit activationCounter
      let unit = newGameState[props.unit.player].units[props.unit.unitIndex];
      console.log(unit);
      unit.temporary.activation
        ? (unit.temporary.activation = unit.activation + 1)
        : (unit.temporary.activation = 1);

      newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

      //newGameState.activatingSkill.push("Advance") <-- to do
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
        "virtue-blast",
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
        <h2>Advance Tactic</h2>

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
              canVirtueBlast ? "" : "disabledOption"
            }`}
            onClick={() => handleVirtueBlast()}
          >
            <h2>Virtue-blast</h2>
            <h4>Spend your virtue to blast an adjcent enemy.</h4>
            <h4>
              The enemy may spend their Virtue to reduce the attack’s AP by 1.
              If they do, restore your Virtue.
            </h4>
          </div>
        </div>

        <button onClick={() => handleReturn()}>Return</button>
      </div>
    </div>
  );
};

export default TacticAdvance;
