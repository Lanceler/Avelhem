import React from "react";
import { useState } from "react";
import "../modals/Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const PowerAtTheFinalHourProaction = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { avelhemToScion, canAscend } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let canSkip = false;
  let SkipMessage = "Skip";
  let message =
    "Reveal the aspect of 1 Scion skill to ascend an ally pawn to the matching class.";

  if (props.reason === "Discern") {
    canSkip = true;
    SkipMessage = "Return";
    message =
      "Spend 1 Scion skill to ascend an ally pawn to the matching class.";
  }

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

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    const skillCode = usableSkills[selectedSkill].id.substring(0, 2);
    const scionClass = avelhemToScion(parseInt(skillCode));
    // console.log(scionClass);

    if (props.reason === "Power at the Final Hour") {
      newGameState.currentResolution.push({
        resolution: "Sovereign Contingent Skill",
        resolution2: "Select Power at the Final Hour Pawn",
        player: self,
        scionClass: scionClass,
      });

      // newGameState.currentResolution.push({
      //   resolution: "Misc.",
      //   resolution2: "Message To Enemy",
      //   player: enemy,
      //   title: "Power at the Final Hour",
      //   message: `Your opponent has revealed the following aspect: ${scionClass.replace(
      //     " Scion",
      //     ""
      //   )}.`,
      // });
    } else if (props.reason === "Discern") {
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
        resolution2: "Select Discern Pawn",
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
        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Power at the Final Hour</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{message}</h3>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
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
                  canActivateSkill={canBeRevealed(usableSkill.id)}
                  selectedSkill={selectedSkill}
                  setSelectedSkill={setSelectedSkill}
                />
              </div>
            ))}
          </div>
        </div>

        {canSkip && selectedSkill === null && (
          <button className="choiceButton noYes" onClick={() => handleSkip()}>
            {SkipMessage}
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

export default PowerAtTheFinalHourProaction;
