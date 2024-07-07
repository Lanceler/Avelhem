import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SelectResonatorSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const { activateSkillAndResonate, activateSovereignSkillAndResonate } =
    useRecurringEffects();

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const validResonators = [props.skill.id, "SA-01", "SA-02", "SA-03"];

  const canUseResonator = (resonator) => {
    switch (resonator) {
      case "SA-01":
        return props.unit === null; // only Sovereign Skills can resonate with Heir’s Endeavor
      case "SA-03":
        return props.unit !== null && props.unit.enhancements.ravager; // only Ravagers can resonate with Dark Halo
      default:
        return true;
    }
  };

  usableSkills = usableSkills.filter(
    (skill) =>
      validResonators.includes(skill.id) &&
      skill.handIndex * 1 !== props.skill.handIndex * 1
  );

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (props.unit) {
      newGameState = activateSkillAndResonate(
        newGameState,
        props.unit,
        props.skill.id,
        usableSkills[selectedSkill].id
      );
    } else {
      newGameState = activateSovereignSkillAndResonate(
        newGameState,
        props.skill.id,
        usableSkills[selectedSkill].id
      );
    }

    const skillHandIndexes = [
      props.skill.handIndex,
      usableSkills[selectedSkill].handIndex,
    ];

    //get index in descending order
    skillHandIndexes.sort((a, b) => b - a);

    //remove resonating cards from hand but do not send to vestige
    newGameState[self].skillHand.splice(skillHandIndexes[0], 1);
    newGameState[self].skillHand.splice(skillHandIndexes[1], 1);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleCancel = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
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
      case "Learn1.108":
        return element2.id === "07-02";

      case "Learn1.192":
        return element2.id === "SA-02";

      case "Learn1.109":
      case "Learn1.193":
        return element === "Select Button";

      ///////////////////

      case "Fire1.27":
        switch (element) {
          case "Skill Card":
            return element2.id === "SA-02";
        }
        break;

      case "Fire1.28":
        switch (element) {
          case "Select Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.108":
        dispatch(updateDemo("Learn1.109"));
        break;

      case "Learn1.109":
        dispatch(updateDemo("Learn1.109.1"));
        break;

      case "Learn1.192":
        dispatch(updateDemo("Learn1.193"));
        break;

      case "Learn1.193":
        dispatch(updateDemo("Learn1.194"));
        break;

      ///////////////////////
      case "Fire1.27":
        dispatch(updateDemo("Fire1.28"));
        break;

      case "Fire1.28":
        dispatch(updateDemo("Fire1.29"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Select resonator</div>
          <div className="modalButton">
            <button className="choiceButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="fourColumn scrollable scrollable-y-only">
          {usableSkills.map((usableSkill, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedSkill === i ? "selectedSkill" : ""
              } ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}`}
              onClick={() => {
                handleClick(canUseResonator(usableSkill.id), i);
                handleUpdateDemoGuide();
              }}
            >
              <Skill
                i={i}
                usableSkill={usableSkill}
                canActivateSkill={canUseResonator(usableSkill.id)}
              />
            </div>
          ))}
        </div>

        <div className="modalBottomButton">
          {selectedSkill === null && (
            <button className="choiceButton" onClick={() => handleCancel()}>
              Cancel
            </button>
          )}

          {selectedSkill !== null && (
            <button
              className={`choiceButton ${
                canClick("Select Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleSelect();
                handleUpdateDemoGuide();
              }}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectResonatorSkill;
