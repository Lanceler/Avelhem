import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const YouMayFloat1Skill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { grantRavager } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const canBeFloated = (skill) => {
    if (props.restriction === null) {
      return true;
    }
    if (props.restriction.includes(skill)) {
      return true;
    }
    return false;
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = null;
    if (props.unit) {
      unit = newGameState[props.unit.player].units[props.unit.unitIndex];
    }

    //end Floating Skill resolution
    newGameState.currentResolution.pop();

    switch (props.reason) {
      case "Frigid Breath3":
        newGameState.currentResolution.push({
          resolution: "Water Skill",
          resolution2: "Frigid Breath4",
          unit: unit,
        });
        break;

      case "Gale Conjuration1":
        unit.virtue = 1;
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Vengeful Legacy Ravager":
        unit = grantRavager(unit);
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      default:
        break;
    }

    //send selected skill to repertoire
    //Transcendence is discarded rather than floated
    if (usableSkills[selectedSkill].id === "SX-01") {
      newGameState[self].skillVestige.push(
        ...newGameState[self].skillHand.splice(
          usableSkills[selectedSkill].handIndex,
          1
        )
      );
    } else {
      newGameState[self].skillRepertoire.push(
        ...newGameState[self].skillHand.splice(
          usableSkills[selectedSkill].handIndex,
          1
        )
      );

      //Increase floating count
      newGameState[self].skillFloat = newGameState[self].skillFloat + 1;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Floating Skill resolution
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // maybe not needed?
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">{props.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{props.message}</h3>

        <div className="fourColumn scrollable scrollable-y-only">
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
                canActivateSkill={canBeFloated(usableSkill.id)}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          ))}
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

export default YouMayFloat1Skill;
