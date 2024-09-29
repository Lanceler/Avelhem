import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const YouMaySpend1Skill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const {
    drawSkill,
    enterSelectUnitMode,
    getZonesWithAllies,
    getZonesWithEnemies,
    isMuted,
  } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const canBeDiscarded = (skill) => {
    if (props.details.restriction === null) {
      return true;
    }
    if (props.details.restriction.includes(skill)) {
      return true;
    }
    return false;
  };

  const handleBlossom = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[props.unit.player].units[props.unit.unitIndex];
    //note: unlike handleSelect, handleBlossom updates unit

    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    unit.blossom = unit.blossom - 1;

    //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

    switch (props.details.reason) {
      case "Efflorescence1":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          restriction: ["08-01", "08-03", "08-04"],
          message:
            "Recover then float 1 Plant skill other than “Efflorescence”.",
          outcome: "Float",
        });

        newGameState.currentResolution.push({
          resolution: "Discard Skill",
          unit: unit,
          player: self,
          message: "Choose 2nd skill to spend.",
          restriction: null,
        });

        newGameState.currentResolution.push({
          resolution: "Animation Delay",
          priority: self,
        });
        break;

      case "Viridian Grave":
        unit.enhancements.shield
          ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
          : (unit.enhancements.shield = 2);
        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Castle of Thorns1":
        newGameState.currentResolution.push({
          resolution: "Search Skill",
          player: self,
          details: {
            restriction: ["08-01", "08-02", "08-03"],
            exclusion: [],
            searchTitle: "Castle of Thorns",
            searchMessage: "Search for 1 Plant skill”",
            outcome: "Add",
            revealTitle: null,
            revealMessage: null,
            messageTitle: null,
            message: null,
            specMessage: null,
          },
        });
        break;

      case "Castle of Thorns2":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          restriction: ["08-01", "08-02", "08-03"],
          message: "Recover 1 Plant skill",
          outcome: "Add",
        });
        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    //props.updateFirebase(newGameState);
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = null;
    if (props.unit) {
      unit = newGameState[props.unit.player].units[props.unit.unitIndex];
    }

    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "From the Ashes":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          restriction: ["01-01", "01-02", "01-03"],
          message: "Recover then float 1 Fire skill",
          outcome: "Float",
        });
        break;

      case "Resplendence":
        newGameState.currentResolution.push({
          resolution: "Fire Skill",
          resolution2: "Resplendence4",
          unit: unit,
        });
        break;

      case "Crystallization1":
        newGameState.currentResolution.push({
          resolution: "Land Skill",
          resolution2: "Crystallization2",
          unit: unit,
        });
        break;

      case "Pitfall Trap":
        newGameState.currentResolution.push({
          resolution: "Land Skill",
          resolution2: "Pitfall Trap3",
          unit: unit,
          victim: props.victim,
        });
        break;

      case "Thunder Thaumaturge":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          restriction: ["05-01", "05-02", "05-04"],
          message:
            "Recover then float 1 Lightning skill other than “Thunder Thaumaturge”.",
          outcome: "Float",
        });
        break;

      case "Lightning Rod":
        unit.charge
          ? (unit.charge = Math.min(3, unit.charge + 1))
          : (unit.charge = 1);
        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Diffusion Shield":
        newGameState.currentResolution.push({
          resolution: "Mana Skill",
          resolution2: "DiffusionR3",
          unit: unit,
        });
        break;

      case "Arsenal Onslaught Attack":
        newGameState.currentResolution.push({
          resolution: "Metal Skill",
          resolution2: "Arsenal Onslaught6",
          unit: unit,
          details: {
            title: "Arsenal Onslaught",
            reason: "Arsenal Onslaught",
          },
        });
        break;

      case "Efflorescence1":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          restriction: ["08-01", "08-03", "08-04"],
          message:
            "Recover then float 1 Plant skill other than “Efflorescence”.",
          outcome: "Float",
        });

        newGameState.currentResolution.push({
          resolution: "Discard Skill",
          unit: unit,
          player: self,
          message: "Choose 2nd skill to spend.",
          restriction: null,
        });

        newGameState.currentResolution.push({
          resolution: "Animation Delay",
          priority: self,
        });
        break;

      case "Viridian Grave":
        unit.enhancements.shield
          ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
          : (unit.enhancements.shield = 2);
        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Castle of Thorns1":
        newGameState.currentResolution.push({
          resolution: "Search Skill",
          player: self,
          details: {
            restriction: ["08-01", "08-02", "08-03"],
            exclusion: [],
            searchTitle: "Castle of Thorns",
            searchMessage: "Search for 1 Plant skill”",
            outcome: "Add",
            revealTitle: null,
            revealMessage: null,
            messageTitle: null,
            message: null,
            specMessage: null,
          },
        });
        break;

      case "Castle of Thorns2":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          restriction: ["08-01", "08-02", "08-03"],
          message: "Recover 1 Plant skill",
          outcome: "Add",
        });
        break;

      case "Rooted Traverse":
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Rooted Traverse Movement",
          unit: unit,
          tactic: props.details.tactic,
        });
        break;

      case "Rooted Aether-blast":
        //give unit activationCounter
        unit.temporary.activation
          ? (unit.temporary.activation += 1)
          : (unit.temporary.activation = 1);

        //newGameState[unit.player].units[unit.unitIndex] = unit;
        newGameState.activatingUnit.push(unit);

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: unit,
        });

        enterSelectUnitMode(
          getZonesWithEnemies(unit, 1),
          unit,
          newGameState,
          props.details.tactic,
          "aether-blast",
          null
        );
        break;

      default:
        break;
    }

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

    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.72":
        return element === "Skill Card" && element2.id === "08-01";

      case "Learn1.73":
        return element === "Select Button";

      //////////////////////////
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.72":
        dispatch(updateDemo("Learn1.73"));
        break;

      case "Learn1.73":
        dispatch(updateDemo("Learn1.74"));
        break;

      //////////////////////
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

        {props.details.message && (
          <>
            <h3 style={{ maxWidth: 700 }}>{props.details.message}</h3>
          </>
        )}

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
            {selectedSkill === null && (
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

            {selectedSkill === null && props.unit && props.unit.blossom > 0 && (
              <button className="redButton" onClick={() => handleBlossom()}>
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

export default YouMaySpend1Skill;
