import React from "react";
import { useState } from "react";
import "../modals/Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const Destine = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { avelhemToScion, canAscend } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let canSkip = true;
  let SkipMessage = "Return";
  let message =
    "Spend 1 Scion skill to ascend an ally pawn to the matching class.";

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const canBeRevealed = (skill) => {
    //get aspect of skill
    const skillCode = skill.substring(0, 2);

    //if aspect is non-sovereign, check if can ascend
    if (!isNaN(parseInt(skillCode))) {
      if (
        canAscend(localGameState, self, avelhemToScion(parseInt(skillCode)))
      ) {
        return true;
      }
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

    newGameState.currentResolution.pop();

    const skillCode = usableSkills[selectedSkill].id.substring(0, 2);
    const scionClass = avelhemToScion(parseInt(skillCode));
    // console.log(scionClass);

    if (props.reason === "Destine") {
      //Spend FD
      newGameState[self].fateDefiances -= props.defianceCost;

      //send selected skill to vestige
      newGameState[self].skillVestige.push(
        newGameState[self].skillHand.splice(
          usableSkills[selectedSkill].handIndex,
          1
        )[0]
      );

      newGameState.currentResolution.push({
        resolution: "Defiance Options",
        resolution2: "Select Destine Pawn",
        player: self,
        scionClass: scionClass,
      });
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">{props.reason}</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <h3>{message}</h3>

        <br />

        <div className="modalContent">
          <div className="scrollable scrollable-y-only">
            <div className="fourColumn">
              {usableSkills.map((usableSkill, i) => (
                <div
                  key={i}
                  className={`scionSkills ${
                    selectedSkill === i ? "selectedSkill" : ""
                  }`}
                  onClick={() => {
                    handleClick(canBeRevealed(usableSkill.id), i);
                  }}
                >
                  <Skill
                    i={i}
                    usableSkill={usableSkill}
                    canActivateSkill={canBeRevealed(usableSkill.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modalBottomButton">
          {canSkip && selectedSkill === null && (
            <button className="redButton" onClick={() => handleSkip()}>
              {SkipMessage}
            </button>
          )}

          {selectedSkill !== null && (
            <button className="redButton" onClick={() => handleSelect()}>
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destine;
