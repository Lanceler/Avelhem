import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const RecoverSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

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
      let specMessage = `${
        self === "host" ? "Gold" : "Silver"
      } Sovereign has recovered and revealed a skill.`;

      let title = "";

      switch (props.message) {
        case "Recover then float 1 Plant skill other than “Efflorescence”.":
          title = "Efflorescence";
          break;

        case "Recover then float 1 Lightning skill other than “Thunder Thaumaturge”.":
          title = "Thunder Thaumaturge";
          break;

        case "Recover then reveal 1 burst skill.":
          title = "Foreshadow";
          break;
      }

      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Revealing Skill",
        player: enemy,
        skill:
          newGameState[self].skillVestige[
            newGameState[self].skillVestige.length - 1 - selectedSkill
          ],
        message: message,
        specMessage: specMessage,
        title: title,
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
        newGameState[self].skillVestige.push(skillToFloat);
      }
    }

    if (props.cost === "1 FD") {
      newGameState[self].fateDefiance -= 1;
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

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedSkill === i) {
        setSelectedSkill(null);
      } else {
        setSelectedSkill(i);
      }
    }
  };

  const canClick = (element, element2) => {};

  const handleUpdateDemoGuide = () => {};

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">{props.message}</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <br />

        <div className="modalContent">
          <div className="fourColumn scrollable scrollable-y-only">
            {recoverVestige.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedSkill === i ? "selectedSkill" : ""
                } ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}`}
                onClick={() => {
                  handleClick(canRecover(usableSkill.id), i);
                  handleUpdateDemoGuide();
                }}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={canRecover(usableSkill.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="modalBottomButton">
          {props.canSkip && selectedSkill === null && (
            <button className="redButton" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedSkill !== null && (
            <button
              className={`redButton ${
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

export default RecoverSkill;
