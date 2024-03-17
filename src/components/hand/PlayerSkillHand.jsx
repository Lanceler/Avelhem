import React from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const PlayerSkillHand = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getImage } = useCardImageSwitch();
  const { getSkillById } = useCardDatabase();

  return (
    <div className="">
      {localGameState[self] && (
        <div className="player-hand-container">
          {localGameState[self].skillHand.map((card, index) => (
            <div
              key={index}
              className="player-hand-card"
              style={{
                backgroundImage: `url(${getImage(getSkillById(card).Name)})`,
                top: Math.floor(index / 5) * -110,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerSkillHand;
