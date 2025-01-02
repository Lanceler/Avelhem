import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SpendSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const { getZonesWithAllies, isMuted } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let newGameState = JSON.parse(JSON.stringify(localGameState));

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  let unit = null;
  if (props.unit) {
    unit = newGameState[props.unit.player].units[props.unit.unitIndex];
  }

  const canBeDiscarded = (skill) => {
    if (!props.restriction) {
      return true;
    }
    if (props.restriction.includes(skill)) {
      return true;
    }
    return false;
  };

  const handleBlossom = () => {
    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    unit.blossom -= 1;

    //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

    dispatch(updateState(newGameState));
    //props.updateFirebase(newGameState);
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
    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    //send selected skill to vestige
    newGameState[self].skillVestige.push(
      newGameState[self].skillHand.splice(
        usableSkills[selectedSkill].handIndex,
        1
      )[0]
    );

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 107:
            return element2.id === "SX-01";

          case 108:
            return element1 === "Select Button";
        }
    }

    //////////////////////
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 107:
          case 108:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };
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

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedSkill === i ? "selectedSkill" : ""
                } ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}`}
                onClick={() => {
                  handleClick(canBeDiscarded(usableSkill.id), i);
                  handleUpdateDemoGuide();
                }}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={canBeDiscarded(usableSkill.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="modalBottomButton">
          <div className="multi-option-buttons">
            {selectedSkill === null && unit && unit.blossom > 0 && (
              <button
                className={`redButton ${
                  canClick("Select Button") ? "demoClick" : ""
                }`}
                onClick={() => handleBlossom()}
              >
                Spend 1 Blossom
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
    </div>
  );
};

export default SpendSkill;
