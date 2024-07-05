import React, { useState, useEffect } from "react";
import "../hand/Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../../redux/demoGuide";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import ViewSkillVestige from "./ViewSkillVestige";

const PileOfCards = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const [floatingCards, setFloatingCards] = useState(0);
  const [isVestige, setIsVestige] = useState(false);

  const dispatch = useDispatch();

  const { getCardImage } = useCardImageSwitch();

  const [showPile, setShowPile] = useState(null);

  let team = props.team;
  let pile = props.pile;

  let stack = [...localGameState[team][pile]];

  const cardBack = pile[0] === "a" ? "AvelhemCardBack" : "SkillCardBack";

  useEffect(() => {
    switch (pile) {
      case "avelhemRepertoire":
        // floatingCards = localGameState[team].avelhemFloat;
        setFloatingCards(localGameState[team].avelhemFloat);
        break;
      case "skillRepertoire":
        // floatingCards = localGameState[team].skillFloat;
        setFloatingCards(localGameState[team].skillFloat);
        break;

      case "skillVestige":
        stack.push(...localGameState[team].skillShattered);
      //   break; DO NOT break
      case "avelhemVestige":
        setIsVestige(true);
        console.log("VESTIGE");
        break;

      default:
        break;
    }
  }, []);

  const isFloating = (i) => {
    return i >= stack.length - floatingCards;

    //if there are 10 cards and 2 are floating
    //then indices 8 and 9 are floating
    //therefore, indice has to be >= difference
  };

  const handleClick = () => {
    if (pile === "skillVestige") {
      setShowPile("Skill");
    } else if (pile === "avelhemVestige") {
      setShowPile("Avelhem");
    }
  };

  const canClick = () => {
    switch (demoGuide) {
      case "Learn1.20.1":
        return (
          ["avelhemVestige", "skillVestige"].includes(pile) &&
          team === "host" &&
          stack.length
        );
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.20.1":
        dispatch(updateDemo("Learn1.20.2"));
        break;
    }
  };

  return (
    <div className="">
      <div
        className={`pile-card-container ${canClick() ? "demoClick" : ""}`}
        onClick={() => {
          handleClick();
          handleUpdateDemoGuide();
        }}
      >
        {stack.map((card, i) => (
          <div
            key={i}
            className={`
              pile-card 
              ${isFloating(i) ? "pile-floating" : ""} 
              ${isVestige ? "pile-vestige" : ""} 
              ${team === enemy ? "pile-enemy" : ""}                       
            `}
            style={{
              backgroundImage: `url(${getCardImage(cardBack)})`,
              top: -i * 0.3,
            }}
          ></div>
        ))}

        {stack.length > 0 && (
          <div
            className={`pile-label ${floatingCards > 0 ? "with-float" : ""}`}
          >
            {`Cards: ${stack.length}  ${
              floatingCards > 0 ? "(" + floatingCards.toString() + ")" : ""
            }`}
          </div>
        )}
      </div>

      {showPile !== null && (
        <ViewSkillVestige
          setShowPile={setShowPile}
          team={team}
          vestige={showPile}
        />
      )}
    </div>
  );
};

export default PileOfCards;
