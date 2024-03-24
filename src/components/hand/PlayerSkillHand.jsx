import React, { useState, useEffect } from "react";
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

  const [raise, setRaise] = useState(false);

  const [raiseHeight, setRaiseHeight] = useState(0);

  useEffect(() => {
    setRaiseHeight(Math.floor(localGameState[self].skillHand.length / 4) * 110);
  }, [localGameState[self].skillHand.length]);

  const handleRaise = () => {
    console.log("kappa");
    console.log(raise);
    setRaise(!raise);
  };

  return (
    <div className="">
      {localGameState[self] && (
        <div
          className="player-skillhand-container"
          style={{
            top: `${raise === true ? -raiseHeight : 0}px`,
          }}
          onClick={() => handleRaise()}
        >
          {localGameState[self].skillHand.map((card, index) => (
            <div
              key={index}
              className="player-hand-card"
              style={{
                backgroundImage: `url(${getImage(getSkillById(card).Name)})`,
                // transform: `rotate(${(index % 4) * 2.5 - 5}deg)`,
                top: Math.floor(index / 4) * -110,
                left: +(index % 4) * -60,
                // left: (index % 5) * -30,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerSkillHand;
