import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SelectSkillReveal = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { drawSkill } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  if (props.details.restriction !== null) {
    usableSkills = usableSkills.filter((skill) =>
      props.details.restriction.includes(skill.id)
    );
  }

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

    //end
    newGameState.currentResolution.pop();

    let revealTitle = "";
    let revealMessage = "";

    switch (props.details.reason) {
      case "Purification":
        newGameState.currentResolution.push({
          resolution: "Search Skill",
          player: self,
          restriction: usableSkills[selectedSkill].id,
          message: "Search for then float the skill you revealed.",
          outcome: "Float",
        });

        revealTitle = "Purification";
        revealMessage = "Your opponent has revealed 1 Water Skill";

        break;

      case "Symphonic Screech":
        newGameState = drawSkill(newGameState);
        revealTitle = "Symphonic Screech";
        revealMessage = "Your opponent has revealed 1 Wind Skill";

        break;

      case "Valiant Spark":
        unit.boosts.valiantSpark = true;
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

        revealTitle = "Valiant Spark";
        revealMessage = "Your opponent has revealed 1 Lightning Skill";

        break;

      case "Arsenal Onslaught Paralyze":
        newGameState.currentResolution.push({
          resolution: "Metal Skill",
          resolution2: "Arsenal Onslaught3.5",
          unit: unit,
        });

        revealTitle = "Arsenal Onslaught";
        revealMessage = "Your opponent has revealed 1 Metal Skill";

        break;

      default:
        break;
    }

    newGameState.currentResolution.push({
      resolution: "Revealing Skill",
      player: enemy,
      skill: usableSkills[selectedSkill].id,
      title: revealTitle,
      message: revealMessage,
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.details.title}</h2> */}

        <div className="twoColumn3-1">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{props.details.message}</h3>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedSkill === i ? "selectedSkill" : ""
                }`}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={true} // any skill can be revealed
                  selectedSkill={selectedSkill}
                  setSelectedSkill={setSelectedSkill}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedSkill === null && (
          <button className="choiceButton noYes" onClick={() => handleSkip()}>
            Skip
          </button>
        )}

        {selectedSkill !== null && (
          <button className="choiceButton noYes" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectSkillReveal;
