import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SpendSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

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

    newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

    dispatch(updateState(newGameState));
    //props.updateFirebase(newGameState);
  };

  const handleFever = () => {
    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    unit.fever -= props.fever;

    newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

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

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.28":
      case "Learn1.111":
      case "Learn1.151":
        return element2.id === "SX-01";

      case "Learn1.29":
      case "Learn1.112":
      case "Learn1.152":
        return element === "Select Button";

      //////////////////////

      case "Fire1.11":
      case "Fire1.19":
        switch (element) {
          case "Skill Card":
            return element2.id === "SX-01";
        }
        break;

      case "Fire1.29":
        switch (element) {
          case "Skill Card":
            return element2.id === "02-03";
        }
        break;

      case "Fire1.38":
        switch (element) {
          case "Skill Card":
            return true;
        }
        break;

      case "Fire1.11.1":
      case "Fire1.20":
      case "Fire1.29.1":
      case "Fire1.39":
        switch (element) {
          case "Select Button":
            return true;
        }
        break;

      case "Fire1.14.1":
        switch (element) {
          case "Select Fever Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.28":
        dispatch(updateDemo("Learn1.29"));
        break;

      case "Learn1.29":
        dispatch(updateDemo("Learn1.30"));
        break;

      case "Learn1.111":
        dispatch(updateDemo("Learn1.112"));
        break;

      case "Learn1.112":
        dispatch(updateDemo("Learn1.113"));
        break;

      case "Learn1.151":
        dispatch(updateDemo("Learn1.152"));
        break;

      case "Learn1.152":
        dispatch(updateDemo("Learn1.153"));
        break;

      ////////////////////

      case "Fire1.11":
        dispatch(updateDemo("Fire1.11.1"));
        break;

      case "Fire1.11.1":
        dispatch(updateDemo("Fire1.12"));
        break;

      case "Fire1.14.1":
        dispatch(updateDemo("Fire1.15"));
        break;

      case "Fire1.19":
        dispatch(updateDemo("Fire1.20"));
        break;

      case "Fire1.29":
        dispatch(updateDemo("Fire1.29.1"));
        break;

      case "Fire1.38":
        dispatch(updateDemo("Fire1.39"));
        break;
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

            {selectedSkill === null &&
              props.fever &&
              unit.fever >= props.fever && (
                <button
                  className={`redButton ${
                    canClick("Select Fever Button") ? "demoClick" : ""
                  }`}
                  onClick={() => {
                    handleFever();
                    handleUpdateDemoGuide();
                  }}
                >
                  {`Spend ${props.fever === 1 ? "1 Fever" : "2 Fevers"}`}
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
