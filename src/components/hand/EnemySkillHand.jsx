import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useGetImages } from "../../hooks/useGetImages";

const EnemySkillHand = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { enemy } = useSelector((state) => state.teams);
  const { getCardImage } = useGetImages();

  let handNum = localGameState[enemy].skillHand.length;

  let transcendenceCount = 0;

  for (let i of localGameState[enemy].skillHand) {
    if (i === "SX-01") {
      transcendenceCount += 1;
    }
  }

  const cardImage = (position) => {
    if (transcendenceCount > Math.min(5, handNum) - position) {
      return `url(${getCardImage("SX-01")})`;
    } else {
      return `url(${getCardImage("SkillCardBack")})`;
    }
  };

  const cards = [1, 2, 3, 4, 5];

  const getMarginBottom = (i) => {
    if (i === 2 && handNum >= 3) {
      return 15;
    }

    if (i === 4 && handNum >= 5) {
      return 15;
    }

    if (i === 3) {
      if (handNum === 4) {
        return 15;
      }
      if (handNum >= 5) {
        return 27;
      }
    }

    return 0;
  };

  return (
    <div className="mainSkillHand">
      <div className="enemy-skillhand-container">
        {cards.map((i) => (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: cardImage(i),
              marginRight: 40 * (Math.min(5, handNum) - (2 * i - 1)),
              marginBottom: getMarginBottom(i),
              transform: `rotate(${
                -3.5 * (Math.min(5, handNum) - (2 * i - 1))
              }deg)`,
              transformOrigin:
                i === 1 || (i === 2 && handNum >= 3)
                  ? "bottom left"
                  : "bottom right",
              zIndex: i,
              opacity: handNum >= i ? 1 : 0,
            }}
          ></div>
        ))}

        {handNum > 5 && (
          <div className={`enemy-hand-label`}>Skills in hand: {handNum}</div>
        )}
      </div>
    </div>
  );
};

export default EnemySkillHand;
