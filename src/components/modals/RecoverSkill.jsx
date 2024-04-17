import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const RecoverSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  console.log(localGameState[self].skillVestige);
  console.log(localGameState[self].skillRepertoire);

  const { shuffleCards } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let vestige = [...localGameState[self].skillVestige];

  //reverse display (for consistency with repertoire)
  let recoverVestige = [];
  for (let c in vestige) {
    recoverVestige.unshift({ id: vestige[c], vestigeIndex: c });
  }

  const canRecover = (skill) => {
    if (props.restriction === null) {
      return true;
    } else {
      return props.restriction.includes(skill);
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if (
      [
        "Recover then float 1 Plant skill other than “Efflorescence”.",
        "Recover 1 Lightning skill other than “Thunder Thaumaturge”.",
        "Recover then reveal 1 burst skill.",
      ].includes(props.message)
    ) {
      let message = "Your opponent has recovered and revealed a skill.";

      let title = "";

      switch (props.message) {
        case "Recover then float 1 Plant skill other than “Efflorescence”.":
          title = "Efflorescence";
          break;

        case "Recover 1 Lightning skill other than “Thunder Thaumaturge”.":
          title = "Thunder Thaumaturge";
          break;

        case "Recover then reveal 1 burst skill.":
          title = "Foreshadow";
          break;
      }

      newGameState.currentResolution.push({
        resolution: "Revealing Skill",
        player: enemy,
        skill:
          newGameState[self].skillVestige[
            newGameState[self].skillVestige.length - 1 - selectedSkill
          ],
        message: message,
      });
    }

    if (props.outcome === "Add") {
      //add selected skill from vestige to hand
      newGameState[self].skillHand.push(
        newGameState[self].skillVestige.splice(
          newGameState[self].skillVestige.length - 1 - selectedSkill,
          1
        )[0]
      );
    } else if (props.outcome === "Float") {
      const skillToFloat = newGameState[self].skillVestige.splice(
        newGameState[self].skillVestige.length - 1 - selectedSkill,
        1
      )[0];

      if (skillToFloat !== "SX-01") {
        //take selected card then put it at the top of deck (end of array)
        //EXCEPTION: "Transcendence" (SX-01) cannot be put in repertoire
        newGameState[self].skillRepertoire.push(skillToFloat);

        // increase floating count
        newGameState[self].skillFloat = newGameState[self].skillFloat + 1;
      } else {
        newGameState[self].skillVestige(skillToFloat);
      }
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
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.message}</h2> */}

        <div className="twoColumn3-1">
          <h2 className="choiceTitle">{props.message}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {recoverVestige.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedSkill === i ? "selectedSkill" : ""
                }`}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={canRecover(usableSkill.id)}
                  selectedSkill={selectedSkill}
                  setSelectedSkill={setSelectedSkill}
                />
              </div>
            ))}
          </div>
        </div>

        {props.canSkip && selectedSkill === null && (
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

export default RecoverSkill;
