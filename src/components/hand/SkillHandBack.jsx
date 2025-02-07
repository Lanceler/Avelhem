import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useGetImages } from "../../hooks/useGetImages";

const SkillHandBack = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getCardImage } = useGetImages();

  let handNum = localGameState[props.team].skillHand.length;

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
      <div className="skill-hand-back-container">
        {cards.map((i) => (
          <div
            key={i}
            className={`hand-back-card`}
            style={{
              backgroundImage: `url(${getCardImage("SkillCardBack")})`,
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
          <div
            className={`hand-back-label ${
              props.team === self ? "hand-back-label-top" : ""
            }  `}
          >
            Skills in hand: {handNum}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillHandBack;
