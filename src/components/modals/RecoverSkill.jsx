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
    if (props.details.restriction === null) {
      return true;
    } else {
      return props.details.restriction.includes(skill);
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if (props.details.reveal) {
      let message = "Your opponent has recovered and revealed a skill.";
      let specMessage = `${
        self === "host" ? "Gold" : "Silver"
      } Sovereign has recovered and revealed a skill.`;

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
        title: props.details.title,
      });
    }

    if (props.details.outcome === "Add") {
      //add selected skill from vestige to hand
      newGameState[self].skillHand.unshift(
        newGameState[self].skillVestige.splice(
          newGameState[self].skillVestige.length - 1 - selectedSkill,
          1
        )[0]
      );
    } else if (props.details.outcome === "Float") {
      const skillToFloat = newGameState[self].skillVestige.splice(
        newGameState[self].skillVestige.length - 1 - selectedSkill,
        1
      )[0];

      //take selected card then put it at the top of deck (end of array)
      newGameState[self].skillRepertoire.push(skillToFloat);

      // increase floating count
      newGameState[self].skillFloat = newGameState[self].skillFloat + 1;
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
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{props.details.title}</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{props.details.message}</div>
          <div className="modalContent4Column modalScrollableY">
            {recoverVestige.map((usableSkill, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedSkill === i ? "modalCardOptionOutlineSelected" : ""
                }`}
                onClick={() => {
                  handleClick(canRecover(usableSkill.id), i);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalCard 
                   ${canClick("Skill Card", i) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedSkill === i ? "none" : "",
                  }}
                >
                  <Skill
                    i={i}
                    usableSkill={usableSkill}
                    canActivateSkill={canRecover(usableSkill.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {props.canSkip && selectedSkill === null && (
            <button className="redButton2" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedSkill !== null && (
            <button
              className={`redButton2 ${
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
