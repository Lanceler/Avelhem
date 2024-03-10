import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const AerialImpetus1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  let unit = localGameState[props.unit.player].units[props.unit.unitIndex];

  const {
    getZonesAerialImpetusAlly,

    getZonesWithEnemies,
  } = useRecurringEffects();

  let canPrompt = false;
  if (getZonesAerialImpetusAlly(unit).length > 0) {
    canPrompt = true;
    console.log(getZonesAerialImpetusAlly(unit));
  }

  let canPurge = false;
  if (getZonesWithEnemies(unit, 1).length > 0) {
    canPurge = true;
  }

  const handlePrompt = () => {
    if (canPrompt) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end "Aerial Impetus1"
      newGameState.currentResolution.pop();

      props.enterSelectUnitMode(
        getZonesAerialImpetusAlly(unit),
        unit,
        newGameState,
        null,
        "aerial impetus prompt",
        null
      );
    }
  };

  const handlePurge = () => {
    if (canPurge) {
      //
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Aerial Impetus</h2>

        <div className="twoColumn">
          <div
            className={`choiceWithDescription ${
              canPrompt ? "" : "disabledOption"
            }`}
            onClick={() => handlePrompt()}
          >
            <h2>Prompt ally</h2>
            <h4>
              Prompt an adjacent ally in the row behind you to traverse (bypass
              motion contingent skills).
            </h4>
          </div>

          <div
            className={`choiceWithDescription ${
              canPurge ? "" : "disabledOption"
            }`}
            onClick={() => handlePurge()}
          >
            <h2>Purge enemy</h2>
            <h4>
              Purge an adjacent enemy’s Virtue and Shield; you may also force
              them to move to an adjacent zone. This cannot affect Wind Scions.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AerialImpetus1;
