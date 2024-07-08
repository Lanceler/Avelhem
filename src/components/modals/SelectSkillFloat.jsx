import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";

import Skill from "../hand/Skill";

const SelectSkillFloat = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const canBeFloated = (skill) => {
    if (!props.restriction) {
      return true;
    }
    if (props.restriction.includes(skill)) {
      return true;
    }
    return false;
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

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Floating Skill resolution
    newGameState.currentResolution.pop();

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

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">{props.title}</div>
          <div className="modalButton">
            <button className="choiceButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>
        <h3>{props.message}</h3>

        <div className="fourColumn scrollable scrollable-y-only">
          {usableSkills.map((usableSkill, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedSkill === i ? "selectedSkill" : ""
              }`}
              onClick={() => {
                handleClick(canBeFloated(usableSkill.id), i);
                // handleUpdateDemoGuide();
              }}
            >
              <Skill
                i={i}
                usableSkill={usableSkill}
                canActivateSkill={canBeFloated(usableSkill.id)}
              />
            </div>
          ))}
        </div>

        <div className="modalBottomButton">
          {selectedSkill !== null && (
            <button className="choiceButton" onClick={() => handleSelect()}>
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectSkillFloat;
