import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SelectSkillReveal = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { drawSkill, enterSelectUnitMode } = useRecurringEffects();

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

      case "Cataclysmic Tempest":
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Cataclysmic Tempest6.5",
          unit: unit,
        });

        revealTitle = "Cataclysmic Tempest";
        revealMessage = "Your opponent has revealed 1 Wind Skill";
        break;

      case "Upheaval":
        newGameState.currentResolution.push({
          resolution: "Land Skill",
          resolution2: "UpheavalR3",
          unit: unit,
        });

        revealTitle = "Upheaval";
        revealMessage = "Your opponent has revealed 1 Land Skill";
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

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedSkill === i) {
        setSelectedSkill(null);
      } else {
        setSelectedSkill(i);
      }
    }
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Fire1.42":
        switch (element) {
          case "Skip Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Fire1.42":
        dispatch(updateDemo("Fire1.43"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View</button>
        <h2>{props.details.title}</h2> */}

        <div className="twoColumn3-1">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View
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
                onClick={() => {
                  handleClick(true, i);
                  handleUpdateDemoGuide();
                }}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={true} // any filtered skill can be revealed
                />
              </div>
            ))}
          </div>
        </div>

        {selectedSkill === null && (
          <button
            className={`choiceButton ${
              canClick("Skip Button") ? "demoClick" : ""
            }`}
            onClick={() => {
              handleSkip();
              handleUpdateDemoGuide();
            }}
          >
            Skip
          </button>
        )}

        {selectedSkill !== null && (
          <button className="choiceButton" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectSkillReveal;
