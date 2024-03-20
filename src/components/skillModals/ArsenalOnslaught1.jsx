import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const ArsenalOnslaught1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const { canStrike } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

  const handleBlast = () => {
    //end "Arsenal Onslaught6"
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Arsenal Onslaught1.1",
      unit: unit,
    });

    dispatch(updateState(newGameState));
  };

  const handleStrike = () => {
    if (canStrike(unit)) {
      //end "Arsenal Onslaught6"
      newGameState.currentResolution.pop();

      newGameState.currentResolution.push({
        resolution: "Arsenal Onslaught1",
        unit: unit,
      });

      dispatch(updateState(newGameState));
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Arsenal Onslaught</h2>

        <div className="twoColumn">
          <div
            className={`choiceWithDescription ${
              canStrike(unit) ? "" : "disabledOption"
            }`}
            onClick={() => handleStrike()}
          >
            <h2>Strike</h2>
          </div>

          <div className="choiceWithDescription" onClick={() => handleBlast()}>
            <h2>Blast</h2>
            <h4>Blast an adjacent enemy.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArsenalOnslaught1;
