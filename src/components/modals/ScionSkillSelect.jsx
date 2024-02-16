import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const ScionSkillSelect = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getScionSet } = useRecurringEffects();

  //   const usableSkills = [...localGameState[self].skillHand].filter((skill) =>
  //     getScionSet(props.unit.unitClass).includes(skill)
  //   );

  let usableSkills = [];

  for (let i in localGameState[self].skillHand) {
    if (
      getScionSet(props.unit.unitClass).includes(
        localGameState[self].skillHand[i]
      )
    ) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        index: i,
      });
    }
  }

  const handleReturn = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Select Skill</h2>

        {usableSkills.map((skill, i) => (
          <div key={i}>{skill.id}</div>
        ))}

        <button onClick={() => handleReturn()}>Return</button>
      </div>
    </div>
  );
};

export default ScionSkillSelect;
