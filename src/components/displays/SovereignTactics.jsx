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

  return (
    <div className="tacticSovereignContainer">
      {localGameState.tactics.map((tactic, index) => (
        <div className="tacticSovereignDice" key={index}>
          <div className="tacticSovereignBG">
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
