import React, { useState } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const PlayerAvelhemHand = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getImage } = useCardImageSwitch();
  const { getAvelhemById } = useCardDatabase();

  const [raise, setRaise] = useState(false);

  const handleRaise = () => {
    setRaise(!raise);
  };

  return (
    <div className="">
      {localGameState[self] && (
        <div
          className="player-avelhemHand-container"
          style={{
            top: -40,
            height:
              170 +
              Math.floor((localGameState[self].avelhemHand.length - 5) / 5) *
                30,
          }}
        >
          {localGameState[self].avelhemHand.map((card, index) => (
            <div
              key={index}
              className="player-hand-card"
              style={{
                backgroundImage: `url(${getImage(getAvelhemById(card).Name)})`,
                top: Math.floor(index / 5) * -110,
                left: Math.floor(index / 5) * 11 + (index % 5) * -50,
                // left: (index % 5) * -30,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerAvelhemHand;
