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

  const validResonators = [props.skill.id, "SA-02"]; //skill itself & Tea for Two

  if (props.unit !== null && props.unit.enhancements.ravager) {
    validResonators.push("SA-04"); // only Ravagers can resonate with Dark Halo
  } else if (props.unit === null) {
    validResonators.push("SA-01"); // only Sovereign Skills can resonate with Heir’s Endeavor
  }

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
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Select skill to resonate with.</h2>

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
                canActivateSkill={true} // skills that cannot be chosen are filtered out
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          ))}
        </div>

        <button onClick={() => handleCancel()}>Cancel</button>

        {selectedSkill !== null && (
          <button onClick={() => handleSelect()}>Select</button>
        )}
      </div>
    </div>
  );
};

export default SelectSkillResonator;
