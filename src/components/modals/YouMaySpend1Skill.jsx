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

  const { drawSkill, getZonesWithAllies, getVacantAdjacentZones, isMuted } =
    useRecurringEffects();

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

    newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

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
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Castle of Thorns":
        newGameState = drawSkill(newGameState);
        newGameState = drawSkill(newGameState);
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
      case "Cultivate":
        newGameState = drawSkill(newGameState);
        break;

      case "Resplendence1":
        newGameState.currentResolution.push({
          resolution: "Fire Skill",
          resolution2: "Resplendence2",
          // resolution: "Resplendence2",
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
            "Recover 1 Lightning skill other than “Thunder Thaumaturge”.",
          outcome: "Add",
        });
        break;

      case "Lightning Rod":
        unit.charge
          ? (unit.charge = Math.min(3, unit.charge + 1))
          : (unit.charge = 1);
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
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

      case "Adamant Armor":
        newGameState.activatingTarget.pop();
        unit.temporary.adamantArmor = true;
        unit.temporary.usedAdamantArmor = true;

        newGameState.activatingUnit.push(unit);
        newGameState.activatingSkill.push("AdamantArmor");

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: unit,
        });

        newGameState.currentResolution.push({
          resolution: "Animation Delay",
          priority: unit.player,
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
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Castle of Thorns":
        newGameState = drawSkill(newGameState);
        newGameState = drawSkill(newGameState);
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

      case "Rooted Traverse":
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Rooted Traverse Movement",
          unit: unit,
          tactic: props.details.tactic,
        });

        break;

      default:
        break;
    }

    const isAdjacentToManaScion = (unitInfo) => {
      const zones = JSON.parse(localGameState.zones);
      const adjacentAllies = getZonesWithAllies(unitInfo, 1, true); // includes self

      for (let i of adjacentAllies) {
        const zone = zones[Math.floor(i / 5)][i % 5];
        const unit = localGameState[zone.player].units[zone.unitIndex];

        if (unit.unitClass === "Mana Scion" && !isMuted(unit)) {
          return true;
        }
      }

      return false;
    };

    // Mana Scion talent: Mana Scions and their adjacent allies
    // may float Mana skills when spending them
    if (
      props.unit !== null &&
      ["06-01", "06-02", "06-03", "06-04"].includes(
        usableSkills[selectedSkill].id
      ) &&
      isAdjacentToManaScion(props.unit)
    ) {
      newGameState.currentResolution.push({
        resolution: "Mana Restructure",
        // player: self,
        unit: props.unit,
        details: {
          reason: "Mana Restructure",
          title: "Mana Restructure",
          message:
            "When a Mana Scion or their adjacent ally spends a Mana skill, they may float it instead.",
          no: "Discard",
          yes: "Float",
          skill: newGameState[self].skillHand.splice(
            usableSkills[selectedSkill].handIndex,
            1
          )[0],
        },
        // skill: usableSkills[selectedSkill],
      });
    } else {
      //send selected skill to vestige
      newGameState[self].skillVestige.push(
        newGameState[self].skillHand.splice(
          usableSkills[selectedSkill].handIndex,
          1
        )[0]
      );
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

    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    if (props.details.reason === "Adamant Armor") {
      newGameState.activatingTarget.pop();
    }

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
      case "Fire1.17.1":
        return element === "Skip Button";

      case "Fire1.43":
        return element === "Skill Card" && element2.id === "05-01";

      case "Fire1.44":
        return element === "Select Button";
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
      case "Fire1.17.1":
        dispatch(updateDemo("Fire1.18"));
        break;

      case "Fire1.43":
        dispatch(updateDemo("Fire1.44"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.details.title}</h2> */}

        <div className="twoColumn">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{props.details.message}</h3>

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

        {selectedSkill === null && (
          <button
            className={`choiceButton ${
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
          <button className="choiceButton" onClick={() => handleBlossom()}>
            Spend 1 Blossom
          </button>
        )}

        {selectedSkill !== null && (
          <button
            className={`choiceButton ${
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
  );
};

export default YouMaySpend1Skill;
