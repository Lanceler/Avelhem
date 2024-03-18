import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const Surge1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const { canStrike, canMove, getVacantAdjacentZones, getZonesWithEnemies } =
    useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

  const handleTraverse = () => {
    if (canMove(unit)) {
      //end "Surge2"
      newGameState.currentResolution.pop();

      props.setMovingSpecial("Surge");

      if (props.reason === "Surge2") {
        newGameState.currentResolution.push({
          resolution: "Surge3",
          unit: unit,
          reason: "Surge3",
        });
      }

      props.enterMoveMode(
        getVacantAdjacentZones(unit),
        unit,
        newGameState,
        null
      );
    }
  };

  const handleSkip = () => {
    //end "Surge2"
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleStrike = () => {
    if (canStrike(unit)) {
      //end "Surge2"
      newGameState.currentResolution.pop();

      props.enterSelectUnitMode(
        getZonesWithEnemies(unit, 1),
        unit,
        newGameState,
        null,
        "strike",
        "Surge"
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
        <h2>Surge</h2>

        <div className="twoColumn">
          <div
            className={`choiceWithDescription ${
              canStrike(unit) ? "" : "disabledOption"
            }`}
            onClick={() => handleStrike()}
          >
            <h2>Strike (2 AP)</h2>
          </div>

          <div
            className={`choiceWithDescription ${
              canMove(unit) ? "" : "disabledOption"
            }`}
            onClick={() => handleTraverse()}
          >
            <h2>Traverse</h2>
            <h4>Bypass motion contingent skills.</h4>
          </div>
        </div>
        <button onClick={() => handleSkip()}>Skip</button>
      </div>
    </div>
  );
};

export default Surge1;
