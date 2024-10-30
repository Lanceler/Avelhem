import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const FloatSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { getVacantFrontier } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const canBeFloated = (skill) => {
    if (props.details.restriction === null) {
      return true;
    }
    if (props.details.restriction.includes(skill)) {
      return true;
    }
    return false;
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = null;
    if (props.unit) {
      unit = newGameState[props.unit.player].units[props.unit.unitIndex];
    }

    //end Floating Skill resolution
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "Frigid Breath3":
        newGameState.currentResolution.push({
          resolution: "Water Skill",
          resolution2: "Frigid Breath4",
          unit: unit,
        });
        break;

      case "Fortify":
        newGameState.currentResolution.push({
          resolution: "Unit Ability",
          resolution2: "Fortify2",
          unit: unit,
          details: {
            title: "Fortify",
            reason: "Fortify",
          },
        });
        break;

      case "Match Made in Heaven":
        let unit1 =
          newGameState[props.details.unit1.player].units[
            props.details.unit1.unitIndex
          ];

        let unit2 =
          newGameState[props.details.unit2.player].units[
            props.details.unit2.unitIndex
          ];

        unit1.enhancements.ward
          ? (unit1.enhancements.ward = Math.max(2, unit1.enhancements.ward))
          : (unit1.enhancements.ward = 2);

        newGameState[props.details.unit1.player].units[
          props.details.unit1.unitIndex
        ] = unit1;

        unit2.enhancements.ward
          ? (unit2.enhancements.ward = Math.max(2, unit2.enhancements.ward))
          : (unit2.enhancements.ward = 2);

        newGameState[props.details.unit2.player].units[
          props.details.unit2.unitIndex
        ] = unit2;
        break;

      case "Advance Deploy Scion":
        //consume tactic
        newGameState.tactics[props.details.tactic].stock -= 1;

        newGameState.currentResolution.push({
          resolution: "Deploying Scion",
          zoneIds: getVacantFrontier(),
          scionClass: props.details.scionClass,
        });
        break;

      default:
        break;
    }

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

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedSkill === i) {
        setSelectedSkill(null);
      } else {
        setSelectedSkill(i);
      }
    }
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Floating Skill resolution
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // maybe not needed?
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.165":
        return element === "Skill Card" && element2 === 1;

      case "Learn1.166":
        return element === "Select Button";

      case "Learn1.234":
        return element === "Skip Button";

      //////////////////
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.165":
        dispatch(updateDemo("Learn1.166"));
        break;

      case "Learn1.166":
        dispatch(updateDemo("Learn1.167"));
        break;

      case "Learn1.234":
        dispatch(updateDemo("Learn1.235"));
        break;

      //////////
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">{props.details.title}</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <br />

        <h3>{props.details.message}</h3>

        <br />

        <div className="fourColumn scrollable scrollable-y-only">
          {usableSkills.map((usableSkill, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedSkill === i ? "selectedSkill" : ""
              } ${canClick("Skill Card", i) ? "demoClick" : ""}`}
              onClick={() => {
                handleClick(canBeFloated(usableSkill.id), i);
                handleUpdateDemoGuide();
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
          {!props.unSkippable && selectedSkill === null && (
            <button
              className={`redButton ${
                canClick("Skip Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleSkip();
                handleUpdateDemoGuide();
              }}
            >
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

export default FloatSkill;
