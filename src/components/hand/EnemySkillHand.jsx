import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import SelectedSkill from "./SelectedSkill";

const EnemySkillHand = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getImage2 } = useCardImageSwitch();

  let handNum = localGameState[self].skillHand.length;

  return (
    <div className="mainSkillHand">
      <div className="enemy-skillhand-container">
        {handNum > 0 && (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: `url(${getImage2("SkillCardBack")})`,
              top: -131,
              left: 160,
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
              left: 220,
              //   background: "green",
              transform: "rotate(7deg)",
              zIndex: 11,
            }}
          ></div>
        )}

        {handNum > 2 && (
          <div
            className={`enemy-hand-card`}
            style={{
              backgroundImage: `url(${getImage2("SkillCardBack")})`,
              top: -123,
              left: 100,
              background: "red",
              transform: "rotate(-7deg)",
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
              left: 265,
              background: "orange",
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
              background: "azure",
              transform: "rotate(-17deg)",
              zIndex: 8,
            }}
          ></div>
        )}

        {/* sfdf */}
      </div>

      {/* 
      {localGameState[self] && (
        <div
          className="player-skillhand-container"
          style={{
            // top: `${raise ? -raiseHeight : 55}px`,
            transform: `translateY(${raise ? -raiseHeight : 55}px)`,
          }}
          onClick={(e) => handleRaise(e)}
        >
          {localGameState[self].skillHand.map((card, index) => (
            <div
              onClick={() => handleCard(card, index)}
              key={index}
              className={`player-hand-card indivSkill ${
                raise ? "enlargable" : ""
              }`}
              style={{
                backgroundImage: `url(${getImage2(card)})`,
                // top: Math.floor(index / 4) * -110,
                top:
                  Math.floor(index / 4) * -110 -
                  Math.floor(((index + 1) % 4) / 2) * 10,
                left: (index % 4) * -60,
              }}
            ></div>
          ))}
          
        </div>
      )} */}
    </div>
  );
};

export default EnemySkillHand;
