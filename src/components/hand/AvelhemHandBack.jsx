import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useGetImages } from "../../hooks/useGetImages";

const AvelhemHandBack = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getCardImage } = useGetImages();

  let handNum = localGameState[props.team].avelhemHand.length;

  const cards = [1, 2, 3];

  return (
    <div className="mainSkillHand">
      <div className="skill-hand-back-container">
        {cards.map((i) => (
          <div
            key={i}
            className={`hand-back-card`}
            style={{
              backgroundImage: `url(${getCardImage("AvelhemCardBack")})`,
              marginRight: 40 * (Math.min(3, handNum) - (2 * i - 1)),
              marginBottom: handNum >= 3 && i === 2 ? 25 : 10,
              transform: `rotate(${
                -3.5 * (Math.min(3, handNum) - (2 * i - 1))
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

        {handNum > 3 && (
          <div
            className={`hand-back-label ${
              props.team === self ? "hand-back-label-top" : ""
            }  `}
          >
            Avelhems in hand: {handNum}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvelhemHandBack;
