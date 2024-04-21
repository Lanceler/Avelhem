import React from "react";
import "./DisplayedCard.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const SovereignTactics = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getTacticImage } = useRecurringEffects();

  const handleClick = (face, dice) => {
    if (
      localGameState.turnPlayer === self &&
      localGameState.currentResolution[
        localGameState.currentResolution.length - 1
      ].resolution === "Execution Phase"
    ) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Selecting Tactical Action - Sovereign",
        dice: dice,
        face: face,
      });

      dispatch(updateState(newGameState));
    }
  };

  return (
    <div className="tacticSovereignContainer">
      {localGameState.tactics.map((tactic, index) => (
        <div className="tacticSovereignDice" key={index}>
          <div
            className={` tacticSovereignBG ${
              tactic.stock < 1 ? "disabledtacticSovereignBG" : ""
            }`}
            onClick={() => handleClick(tactic.face, index)}
          >
            <div
              key={index}
              className="tacticSovereign"
              style={{
                backgroundImage: `url(${getTacticImage(tactic.face)})`,
              }}
            ></div>
          </div>
          <h2 className="tacticSovereignLabel">
            {tactic.face} ({tactic.stock})
          </h2>
        </div>
      ))}
    </div>
  );
};

export default SovereignTactics;
