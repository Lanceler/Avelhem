import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SelectSkillResonator = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const { activateSkillAndResonate } = useRecurringEffects();

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const validResonators = [props.skill.id, "SA-01", "SA-02", "SA-04"];

  const canUseResonator = (resonator) => {
    switch (resonator) {
      case "SA-01":
        return props.unit === null; // only Sovereign Skills can resonate with Heir’s Endeavor
      case "SA-04":
        return props.unit !== null && props.unit.enhancements.ravager; // only Ravagers can resonate with Dark Halo
      default:
        return true;
    }
  };

  usableSkills = usableSkills.filter(
    (skill) =>
      validResonators.includes(skill.id) &&
      skill.handIndex !== props.skill.handIndex
  );

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState = activateSkillAndResonate(
      newGameState,
      props.unit,
      props.skill.id,
      usableSkills[selectedSkill].id
    );

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

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Select skill to resonate with.</h2> */}

        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Select skill to resonate with.</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

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
                canActivateSkill={canUseResonator(usableSkill.id)}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          ))}
        </div>

        {selectedSkill === null && (
          <button className="choiceButton noYes" onClick={() => handleCancel()}>
            Cancel
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

export default SelectSkillResonator;
