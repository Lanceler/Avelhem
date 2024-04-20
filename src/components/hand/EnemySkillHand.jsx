import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const EnemySkillHand = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { enemy } = useSelector((state) => state.teams);
  const { getImage2 } = useCardImageSwitch();

  let handNum = localGameState[enemy].skillHand.length;

  return (
    <div className="mainSkillHand">
      <div className="enemy-skillhand-container">
        {handNum > 0 && (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: `url(${getImage2("SkillCardBack")})`,
              //   top: -131,
              top: handNum < 5 && handNum % 2 === 0 ? -123 : -131,
              //   left: 160,
              left: handNum < 5 && handNum % 2 === 0 ? 135 : 160,
              transform: `rotate(${
                handNum < 5 && handNum % 2 === 0 ? -7 : 0
              }deg)`,
              zIndex: 10,
            }}
          ></div>
        )}

        {handNum > 1 && (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: `url(${getImage2("SkillCardBack")})`,
              top: -123,
              //   left: 220,
              left: handNum < 5 && handNum % 2 === 0 ? 195 : 220,
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
              backgroundImage: `url(${getImage2("SkillCardBack")})`,
              //   top: -123,
              top: handNum < 5 && handNum % 2 === 0 ? -110 : -123,
              //   left: 100,
              left: handNum < 5 && handNum % 2 === 0 ? 75 : 100,
              //   background: "red",
              //   transform: "rotate(-7deg)",
              transform: `rotate(${
                handNum < 5 && handNum % 2 === 0 ? -17 : -7
              }deg)`,

              zIndex: 9,
            }}
          ></div>
        )}

        {handNum > 3 && (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: `url(${getImage2("SkillCardBack")})`,
              top: -110,
              //   left: 265,
              left: handNum < 5 && handNum % 2 === 0 ? 240 : 265,
              //   background: "orange",
              transform: "rotate(17deg)",
              zIndex: 12,
            }}
          ></div>
        )}

        {handNum > 4 && (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: `url(${getImage2("SkillCardBack")})`,
              top: -110,
              left: 55,
              //   background: "azure",
              transform: "rotate(-17deg)",
              zIndex: 8,
            }}
          ></div>
        )}

        {handNum > 5 && (
          <div
            className={`enemy-hand-label`}
            style={{
              top: 10,
              left: 90,
              zIndex: 22,
            }}
          >
            Skills in hand: {handNum}
          </div>
        )}

        {/* line */}
      </div>
    </div>
  );
};

export default EnemySkillHand;
