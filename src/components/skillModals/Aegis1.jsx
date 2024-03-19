import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const Aegis1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const {} = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let victim = newGameState[props.victim.player].units[props.victim.unitIndex];

  let canWard = false;
  if (newGameState[victim.player].skillHand.length > 0) {
    canWard = true;
  }

  const handleShield = () => {
    //end "Aegis1"
    newGameState.currentResolution.pop();

    victim.enhancements.shield
      ? Math.max(1, victim.enhancements.shield)
      : (victim.enhancements.shield = 1);

    newGameState[props.victim.player].units[props.victim.unitIndex] = victim;

    dispatch(updateState(newGameState));
  };

  const handleSkip = () => {
    //end "Aegis1"
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleWard = () => {
    if (canWard) {
      //end "Aegis1"
      newGameState.currentResolution.pop();

      victim.enhancements.ward
        ? Math.max(1, victim.enhancements.ward)
        : (victim.enhancements.ward = 1);

      newGameState[props.victim.player].units[props.victim.unitIndex] = victim;

      newGameState.currentResolution.push({
        resolution: "Discard Skill",
        unit: props.unit,
        player: self,
        message: "Spend 1 skill.",
        restriction: null,
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
        <h2>Aegis</h2>

        <div className="twoColumn">
          <div className="choiceWithDescription" onClick={() => handleShield()}>
            <h2>Shield</h2>
            <h4>Grant them Shield for 1 turn.</h4>
          </div>

          <div
            className={`choiceWithDescription ${
              canWard ? "" : "disabledOption"
            }`}
            onClick={() => handleWard()}
          >
            <h2>Ward</h2>
            <h4>Spend 1 skill to grant them Ward for 1 turn.</h4>
          </div>
        </div>
        <button onClick={() => handleSkip()}>Skip</button>
      </div>
    </div>
  );
};

export default Aegis1;
