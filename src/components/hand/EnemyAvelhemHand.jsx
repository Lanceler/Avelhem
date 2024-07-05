import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const EnemyAvelhemHand = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { enemy } = useSelector((state) => state.teams);
  const { getCardImage } = useCardImageSwitch();

  let handNum = localGameState[enemy].avelhemHand.length;

  return (
    <div className="mainSkillHand">
      <div className="enemy-skillhand-container">
        {handNum > 0 && (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: `url(${getCardImage("AvelhemCardBack")})`,
              //   top: -131,
              top: handNum < 3 && handNum % 2 === 0 ? -103 : -111,
              //   left: 70,
              left: handNum < 3 && handNum % 2 === 0 ? 45 : 70,
              transform: `rotate(${
                handNum < 3 && handNum % 2 === 0 ? -7 : 0
              }deg)`,
              zIndex: 10,
            }}
          ></div>
        )}

        {handNum > 1 && (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: `url(${getCardImage("AvelhemCardBack")})`,
              top: -103,
              //   left: 110,
              left: handNum < 3 && handNum % 2 === 0 ? 105 : 130,
              //   background: "green",
              transform: `rotate(${7}deg)`,
              zIndex: 11,
            }}
          ></div>
        )}

        {handNum > 2 && (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: `url(${getCardImage("AvelhemCardBack")})`,
              //   top: -123,
              top: handNum < 3 && handNum % 2 === 0 ? -90 : -103,
              //   left: 10,
              left: handNum < 3 && handNum % 2 === 0 ? -15 : 10,
              //   background: "red",
              //   transform: "rotate(-7deg)",
              transform: `rotate(${
                handNum < 3 && handNum % 2 === 0 ? -17 : -7
              }deg)`,

              zIndex: 9,
            }}
          ></div>
        )}

        {handNum > 3 && (
          <div
            className={`enemy-hand-label`}
            style={{
              top: 10,
              left: 5,
              zIndex: 22,
            }}
          >
            Avelhems in hand: {handNum}
          </div>
        )}

        {/* line */}
      </div>
    </div>
  );
};

export default EnemyAvelhemHand;
