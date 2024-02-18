import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const ScionSkillSelect = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { activateSkill, canActivateSkill, getScionSet } =
    useRecurringEffects();

  let usableSkills = [];

  for (let i in localGameState[self].skillHand) {
    if (
      getScionSet(props.unit.unitClass).includes(
        localGameState[self].skillHand[i]
      )
    ) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const handleReturn = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleActivateSkill = (unit, skill) => {
    console.log("ACTIVATE SKILL");

    handleActivateSkill(unit, skill);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Select Skill</h2>

        <div className="fourColumn scrollable scrollable-y-only">
          {usableSkills.map((skill, i) => (
            <Skill
              key={i}
              skill={skill}
              unit={props.unit}
              canActivateSkill={canActivateSkill(props.unit, skill.id)}
              updateFirebase={props.updateFirebase}
            />
          ))}
        </div>

        <button onClick={() => handleReturn()}>Return</button>
      </div>
    </div>
  );
};

export default ScionSkillSelect;
