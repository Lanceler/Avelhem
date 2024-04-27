import React, { useState, useEffect } from "react";
import "../hand/Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const PileOfCards = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { enemy } = useSelector((state) => state.teams);
  const { getImage2 } = useCardImageSwitch();

  let team = props.team;
  let pile = props.pile;

  const stack = localGameState[team][pile];

  const cardBack = pile[0] === "a" ? "AvelhemCardBack" : "SkillCardBack";

  let floatingCards = 0;
  switch (pile) {
    case "avelhemRepertoire":
      floatingCards = localGameState[team].avelhemFloat;
      break;
    case "skillRepertoire":
      floatingCards = localGameState[team].skillFloat;
      break;

    default:
      break;
  }

  const isFloating = (i) => {
    return i >= stack.length - floatingCards;

    //if there are 10 cards and 2 are floating
    //then indices 8 and 9 are floating
    //therefore, indice has to be >= difference
  };

  return (
    <div className="">
      <div className="pile-card-container">
        {stack.map((card, i) => (
          <div
            key={i}
            className={`pile-card ${isFloating(i) ? "pile-floating" : ""}`}
            style={{
              backgroundImage: `url(${getImage2(cardBack)})`,
              top: -i * 0.35,
            }}
          ></div>
        ))}
        <div className={`pile-label`}>Cards: {stack.length}</div>
      </div>
    </div>
  );
};

export default PileOfCards;
