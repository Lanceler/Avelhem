import React, { useState, useEffect } from "react";
import "../hand/Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateDemoCount } from "../../redux/demoCount";

import { useGetImages } from "../../hooks/useGetImages";
import ViewVestige from "./ViewVestige";
import ViewRepertoireTrial from "./ViewRepertoireTrial";

const PileOfCards = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const [floatingCards, setFloatingCards] = useState(0);
  const [shatteredCards, setShatteredCards] = useState(0);
  const [isVestige, setIsVestige] = useState(false);

  const { getCardImage } = useGetImages();

  const [showPile, setShowPile] = useState(null);

  let team = props.team;
  let pile = props.pile;

  // let stack = [...localGameState[team][pile]];
  const [stack, setStack] = useState([...localGameState[team][pile]]);

  const cardBack = pile[0] === "a" ? "AvelhemCardBack" : "SkillCardBack";

  useEffect(() => {
    setStack([...localGameState[team][pile]]);

    switch (pile) {
      case "avelhemRepertoire":
        setFloatingCards(localGameState[team].avelhemFloat);
        break;
      case "skillRepertoire":
        setFloatingCards(localGameState[team].skillFloat);
        break;

      case "skillVestige":
        // stack.push(...localGameState[team].skillShattered);
        setStack([
          ...localGameState[team][pile],
          ...localGameState[team].skillShattered,
        ]);
        setShatteredCards(localGameState[team].skillShattered.length);
      //   break; DO NOT break
      case "avelhemVestige":
        setIsVestige(true);
        break;

      default:
        break;
    }
  }, [localGameState]);

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
    } else if (pile === "skillRepertoire" && localGameState.teaTrial) {
      setShowPile("Skill Repertoire");
    } else if (pile === "avelhemRepertoire" && localGameState.teaTrial) {
      setShowPile("Avelhem Repertoire");
    }
  };

  const canClick = () => {
    // switch (demoGuide) {
    //   case "Learn1.20.1":
    //     return (
    //       ["avelhemVestige", "skillVestige"].includes(pile) &&
    //       team === "host" &&
    //       stack.length
    //     );

    //   case "Learn1.229.1":
    //     return ["skillVestige"].includes(pile) && team === "host";
    // }

    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 84:
            return pile === "avelhemVestige" && team === "host";

          // return ["skillVestige"].includes(pile) && team === "host";

          ///////
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 84:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
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
              ${
                localGameState.teaTrial && !isVestige
                  ? "pile-tea-repertoire"
                  : ""
              }
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
            {`
            Cards: ${stack.length - shatteredCards}
            ${floatingCards > 0 ? "(" + floatingCards.toString() + ")" : ""}
            ${shatteredCards > 0 ? "(" + shatteredCards.toString() + ")" : ""}
            `}
          </div>
        )}
      </div>

      {["Skill", "Avelhem"].includes(showPile) && (
        <ViewVestige
          setShowPile={setShowPile}
          team={team}
          vestige={showPile}
          spectator={props.spectator}
        />
      )}

      {["Skill Repertoire", "Avelhem Repertoire"].includes(showPile) && (
        <ViewRepertoireTrial
          setShowPile={setShowPile}
          team={team}
          repertoire={showPile}
          spectator={props.spectator}
        />
      )}
    </div>
  );
};

export default PileOfCards;
