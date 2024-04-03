import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import Collapse from "../../assets/others/Collapse.png";

import SelectedSkill from "./SelectedSkill";

const PlayerSkillHand = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getImage2 } = useCardImageSwitch();
  const { getSkillById } = useCardDatabase();

  const [raise, setRaise] = useState(false);
  const [raiseHeight, setRaiseHeight] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    setRaiseHeight(
      -45 + Math.ceil(localGameState[self].skillHand.length / 4) * 86
    );
    setRaise(false);
  }, [localGameState[self].skillHand.length]);

  const handleCollapse = () => {
    setRaise(false);
  };

  const handleRaise = () => {
    if (!raise && localGameState[self].skillHand.length) {
      setRaise(true);
    }
  };

  // const handleCard = () => {
  //   if (raise) {
  //     console.log("Card");
  //   }
  // };

  const handleCard = (card, index) => {
    if (raise) {
      setSelectedSkill({ id: card, handIndex: index });
      //setRaise(false);
    }
  };

  return (
    <div className="mainSkillHand">
      {selectedSkill && (
        <SelectedSkill
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
          updateFirebase={props.updateFirebase}
          setRaise={setRaise}
        />
      )}

      {raise === true && (
        <button
          className="collapse"
          onClick={() => handleCollapse()}
          style={{
            top: `${-raiseHeight + 45}px`,
          }}
        >
          <img src={Collapse} className="collapseIcon" />
        </button>
      )}
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
      )}
    </div>
  );
};

export default PlayerSkillHand;
