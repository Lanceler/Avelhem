import React, { useState, useEffect } from "react";
import "../hand/Skill.css";

import { useSelector, useDispatch } from "react-redux";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const PileOfCards = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { enemy } = useSelector((state) => state.teams);
  const { getImage2 } = useCardImageSwitch();

  const [showPile, setShowPile] = useState(null);

  let team = props.team;
  let pile = props.pile;

  const stack = localGameState[team][pile];

  const cardBack = pile[0] === "a" ? "AvelhemCardBack" : "SkillCardBack";

  let floatingCards = 0;
  let isVestige = false;
  switch (pile) {
    case "avelhemRepertoire":
      floatingCards = localGameState[team].avelhemFloat;
      break;
    case "skillRepertoire":
      floatingCards = localGameState[team].skillFloat;
      break;

    case "avelhemVestige":
    case "skillVestige":
      isVestige = true;
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

  const handleClick = () => {
    if (team === self && pile === "setShowPile") {
      setShowPile("setShowPile");
    }

    console.log("clicked");
  };

  return (
    <div className="">
      <div className="pile-card-container" onClick={() => handleClick()}>
        {stack.map((card, i) => (
          <div
            key={i}
            className={`pile-card ${isFloating(i) ? "pile-floating" : ""} ${
              isVestige ? "pile-vestige" : ""
            }`}
            style={{
              backgroundImage: `url(${getImage2(cardBack)})`,
              top: -i * 0.35,
            }}
          ></div>
        ))}

        {stack.length > 0 && (
          <div className={`pile-label`}>Cards: {stack.length}</div>
        )}
      </div>
    </div>
  );
};

export default PileOfCards;
