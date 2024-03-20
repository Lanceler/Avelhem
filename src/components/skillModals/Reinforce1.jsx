import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const Reinforce1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const {} = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

  const canHp = newGameState[props.unit.player].skillHand.length > 0;

  const handleHP = () => {
    if (canHp) {
      //end "Reinforce1"
      newGameState.currentResolution.pop();

      unit.hp = Math.max(2, unit.hp);

      newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

      newGameState.currentResolution.push({
        resolution: "Discard Skill",
        unit: unit,
        player: unit.player,
        message: "Spend 1 skill.",
        restriction: null,
      });

      dispatch(updateState(newGameState));
    }
  };

  const handleSharpness = () => {
    //end "Reinforce1"
    newGameState.currentResolution.pop();

    unit.sharpness
      ? (unit.sharpness = Math.min(2, unit.sharpness + 1))
      : (unit.sharpness = 1);

    newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Reinforce</h2>

        <div className="twoColumn">
          <div
            className="choiceWithDescription"
            onClick={() => handleSharpness()}
          >
            <h2>Gain 1 Sharpness (Max. 2)</h2>
            <h5>Current Sharpness: {unit.sharpness ? unit.sharpness : 0}</h5>
          </div>

          <div
            className={`choiceWithDescription ${canHp ? "" : "disabledOption"}`}
            onClick={() => handleHP()}
          >
            <h2>Gain 1 HP</h2>
            <h4>Spend 1 skill to gain 1 HP (Max. 2).</h4>
            <h5>Current HP: {unit.hp}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reinforce1;
