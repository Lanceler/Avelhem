import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const Geomancy1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const {} = useRecurringEffects();

  let canRecover = false;

  if (
    ["04-01", "04-02", "04-03"].some((s) =>
      localGameState[self].skillVestige.includes(s)
    )
  ) {
    canRecover = true;
  }

  const handleGain = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

    //end "Geomancy1"
    newGameState.currentResolution.pop();

    unit.hp = Math.min(unit.hp + 1, 3);

    newGameState[unit.player].units[unit.unitIndex] = unit;

    dispatch(updateState(newGameState));
    //   props.updateFirebase(newGameState);
  };

  const handleRecover = () => {
    if (canRecover) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end "Geomancy1"
      newGameState.currentResolution.pop();

      newGameState.currentResolution.push({
        resolution: "Recover Skill",
        player: self,
        restriction: ["04-01", "04-02", "04-03"],
        message: "Recover then float 1 Land skill.",
        outcome: "Float",
      });

      dispatch(updateState(newGameState));
      // props.updateFirebase(newGameState);
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Geomancy</h2>

        <div className="twoColumn">
          <div className="choiceWithDescription" onClick={() => handleGain()}>
            <h2>Gain HP</h2>
            <h4>Gain 1 HP (Max 3).</h4>
          </div>

          <div
            className={`choiceWithDescription ${
              canRecover ? "" : "disabledOption"
            }`}
            onClick={() => handleRecover()}
          >
            <h2>Recover</h2>
            <h4>Recover then 1 Land skill.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geomancy1;
