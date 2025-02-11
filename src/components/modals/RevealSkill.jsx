import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const RevealSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { drawSkill } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let canSkip = true;

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
      case "Blaze of Glory":
        newGameState.currentResolution.push({
          resolution: "Fire Skill",
          resolution2: "Blaze of Glory3",
          unit: props.unit,
          adjacentEnemies: props.details.adjacentEnemies,
        });

        revealTitle = "Blaze of Glory";
        revealMessage = "Your opponent has revealed 1 “Blaze of Glory”.";
        break;

      case "Healing Rain":
        let healingRainUnit =
          newGameState[props.details.victim.player].units[
            props.details.victim.unitIndex
          ];

        healingRainUnit.hp = Math.max(2, healingRainUnit.hp);

        revealTitle = "Healing Rain";
        revealMessage = "Your opponent has revealed 1 Water Skill.";
        break;

      case "Symphonic Screech":
        newGameState = drawSkill(newGameState);
        revealTitle = "Symphonic Screech";
        revealMessage = "Your opponent has revealed 1 Wind Skill.";
        break;

      case "Cataclysmic Tempest":
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Cataclysmic Tempest7",
          unit: unit,
        });

        revealTitle = "Cataclysmic Tempest";
        revealMessage = "Your opponent has revealed 1 Wind Skill.";
        break;

      // case "Chain Lightning Blast":
      //   newGameState.currentResolution.push({
      //     resolution: "Lightning Skill",
      //     resolution2: "Chain Lightning4",
      //     unit: props.unit,
      //     adjacentEnemies: props.details.adjacentEnemies,
      //   });

      //   revealTitle = "Chain Lightning";
      //   revealMessage = "Your opponent has revealed 1 Lightning Skill.";

      //   break;

      case "Valiant Spark":
        unit.boosts.valiantSpark = true;
        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

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
      resolution: "Misc.",
      resolution2: "Revealing Skill",
      player: enemy,
      skill: usableSkills[selectedSkill].id,
      title: revealTitle,
      message: revealMessage,
      specMessage: revealMessage.replace(
        "Your opponent",
        `${self === "host" ? "Gold" : "Silver"} Sovereign`
      ),
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

  const canClick = (element, element2) => {};

  const handleUpdateDemoGuide = () => {};

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{props.details.title}</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{props.details.message}</div>
          <div className="modalContent4Column modalScrollableY">
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedSkill === i ? "modalCardOptionOutlineSelected" : ""
                }`}
                onClick={() => {
                  handleClick(true, i);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalCard 
                   ${canClick("Skill Card", i) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedSkill === i ? "none" : "",
                  }}
                >
                  <Skill
                    i={i}
                    usableSkill={usableSkill}
                    canActivateSkill={true} // any filtered skill can be revealed
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {canSkip && selectedSkill === null && (
            <button
              className={`redButton2 ${
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
            <button className="redButton2" onClick={() => handleSelect()}>
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevealSkill;
