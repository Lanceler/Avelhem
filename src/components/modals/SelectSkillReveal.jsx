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

  if (props.restriction !== null) {
    usableSkills = usableSkills.filter((skill) =>
      props.restriction.includes(skill.id)
    );
  }

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState = drawSkill(newGameState);

    //end Reveal Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Revealing Skill",
      player: enemy,
      skill: usableSkills[selectedSkill].id,
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
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Reveal Skill</h2>
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
                canActivateSkill={true} // any skill can be revealed
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          ))}
        </div>

        <button onClick={() => handleSkip()}>Skip</button>

        {selectedSkill !== null && (
          <button onClick={() => handleSelect()}>Select</button>
        )}
      </div>
    </div>
  );
};

export default SelectSkillReveal;
