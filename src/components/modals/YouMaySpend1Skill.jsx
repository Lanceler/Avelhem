import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const YouMaySpend1Skill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const {
    animationDelay,
    avelhemToScion,
    canAscend,
    drawSkill,
    enterMoveMode,
    enterSelectUnitMode,
    getVacantAdjacentZones,
    getZonesWithAllies,
    getZonesWithEnemies,
    isMuted,
  } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let SkipMessage = "Skip";

  if (props.details.reason === "Destine") {
    SkipMessage = "Return";
  }

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const canBeDiscarded = (skill) => {
    if (props.details.reason === "Destine") {
      //get facet of skill
      const skillCode = skill.substring(0, 2);

      //if facet is non-sovereign, check if can ascend
      if (!isNaN(parseInt(skillCode))) {
        if (
          canAscend(localGameState, self, avelhemToScion(parseInt(skillCode)))
        ) {
          return true;
        }
      }
      return false;
    }

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

    unit.blossom = unit.blossom - 2;

    //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

    switch (props.details.reason) {
      case "Efflorescence1":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          details: {
            title: "Efflorescence",
            reason: "Efflorescence",
            restriction: ["08-01", "08-03", "08-04"],
            message: "Recover 1 Plant skill other than “Efflorescence”.",
            outcome: "Add",
            reveal: true,
          },
        });

        newGameState.currentResolution.push({
          resolution: "Discard Skill",
          unit: unit,
          player: unit.player,
          canSkip: false,
          details: {
            title: "Efflorescence",
            message: "Choose the second skill to spend.",
            restriction: null,
            reason: "Efflorescence2",
          },
        });

        newGameState = animationDelay(newGameState, self);
        break;

      case "Viridian Grave":
        unit.enhancements.shield
          ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
          : (unit.enhancements.shield = 2);
        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Castle of Thorns1":
        newGameState.currentResolution.push({
          resolution: "Search Card",
          player: self,
          details: {
            restriction: ["08-01", "08-02", "08-03"],
            exclusion: [],
            searchTitle: "Castle of Thorns",
            searchMessage: "Search for 1 Plant skill.",
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
          details: {
            title: "Castle of Thorns",
            reason: "Castle of Thorns",
            restriction: ["08-01", "08-02", "08-03"],
            message: "Recover 1 Plant skill.",
            outcome: "Add",
          },
        });
        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    //props.updateFirebase(newGameState);
  };

  const handleEmber = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    delete unit.ember;

    switch (props.details.reason) {
      case "From the Ashes":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          details: {
            title: "From the Ashes",
            reason: "From the Ashes",
            restriction: ["01-01", "01-02", "01-03", "01-04"],
            message: "Recover then float 1 Fire skill.",
            outcome: "Float",
          },
        });
        break;

      case "Resplendence":
        newGameState.currentResolution.push({
          resolution: "Fire Skill",
          resolution2: "Resplendence4",
          unit: unit,
        });
        break;
    }

    dispatch(updateState(newGameState));
    //props.updateFirebase(newGameState);
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = props.unit
      ? newGameState[props.unit.player].units[props.unit.unitIndex]
      : null;

    let ability = null;

    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    //send selected skill to vestige
    newGameState[self].skillVestige.push(
      newGameState[self].skillHand.splice(
        usableSkills[selectedSkill].handIndex,
        1
      )[0]
    );

    if (unit && unit.unitClass === "Fire Scion" && !isMuted(unit)) {
      ability = "Eternal Ember";
    }

    switch (props.details.reason) {
      case "From the Ashes":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          details: {
            title: "From the Ashes",
            reason: "From the Ashes",
            restriction: ["01-01", "01-02", "01-03", "01-04"],
            message: "Recover then float 1 Fire skill.",
            outcome: "Float",
          },
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
          victim: props.details.victim,
        });
        break;

      case "Thunder Thaumaturge":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          details: {
            title: "Thunder Thaumaturge",
            reason: "Thunder Thaumaturge",
            restriction: ["05-01", "05-02", "05-04"],
            message:
              "Recover then float 1 Lightning skill other than “Thunder Thaumaturge”.",
            outcome: "Float",
            reveal: true,
          },
        });
        break;

      case "Lightning Rod":
        unit.charge
          ? (unit.charge = Math.min(3, unit.charge + 1))
          : (unit.charge = 1);
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
          details: {
            title: "Efflorescence",
            reason: "Efflorescence",
            restriction: ["08-01", "08-03", "08-04"],
            message: "Recover 1 Plant skill other than “Efflorescence”.",
            outcome: "Add",
            reveal: true,
          },
        });

        newGameState.currentResolution.push({
          resolution: "Discard Skill",
          unit: unit,
          player: unit.player,
          canSkip: false,
          details: {
            title: "Efflorescence",
            message: "Choose the second skill to spend.",
            restriction: null,
            reason: "Efflorescence2",
          },
        });

        newGameState = animationDelay(newGameState, self);
        break;

      case "Viridian Grave":
        unit.enhancements.shield
          ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
          : (unit.enhancements.shield = 2);
        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Castle of Thorns1":
        newGameState.currentResolution.push({
          resolution: "Search Card",
          player: self,
          details: {
            restriction: ["08-01", "08-02", "08-03"],
            exclusion: [],
            searchTitle: "Castle of Thorns",
            searchMessage: "Search for 1 Plant skill.",
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
          details: {
            title: "Castle of Thorns",
            reason: "Castle of Thorns",
            restriction: ["08-01", "08-02", "08-03"],
            message: "Recover 1 Plant skill.",
            outcome: "Add",
          },
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

      case "Rooted Aether-blast (Invoke)":
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

        if (localGameState[unit.player].bountyUpgrades.tactics > 0) {
          newGameState.currentResolution.push({
            resolution: "Misc.",
            resolution2: "Aether-blast - Upgraded",
            unit: unit,
          });
        }

        enterSelectUnitMode(
          getZonesWithEnemies(unit, 1),
          unit,
          newGameState,
          props.details.tactic,
          "aether-blast",
          null
        );
        break;

      case "Vanguard Fleet1":
        enterMoveMode(getVacantAdjacentZones(unit), unit, newGameState, null);
        break;

      case "Vanguard Fleet2":
        enterSelectUnitMode(
          props.details.zonesWithMovableAllies,
          unit,
          newGameState,
          null,
          "vanguard fleet",
          null
        );
        break;

      case "Destine":
        //end Defiance Phase Selection
        newGameState.currentResolution.pop();

        //Spend DP
        newGameState[self].defiancePoints -= props.details.defianceCost;

        const skillCode = usableSkills[selectedSkill].id.substring(0, 2);

        newGameState.currentResolution.push({
          resolution: "Defiance Options",
          resolution2: "Select Destine Pawn",
          player: self,
          scionClass: avelhemToScion(parseInt(skillCode)),
        });

        break;

      default:
        break;
    }

    switch (ability) {
      case "Eternal Ember":
        newGameState.activatingUnit.push(unit);
        newGameState.activatingSkill.push("EternalEmber");

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: unit,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Activating Eternal Ember",
          unit: unit,
        });

        newGameState = animationDelay(newGameState, unit.player);

        break;
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

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (
          demoCount
          // case 107:
          //   return element2 === 2;

          // case 108:
          //   return element1 === "Select Button";
        ) {
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (
          demoCount
          // case 107:
          // case 108:
          //   dispatch(updateDemoCount(demoCount + 1));
          //   break;
        ) {
        }
    }
  };

  const demoSkip = () => {
    if (demoGuide === "Learn-overview" && demoCount === 110) {
      handleSkip();
    }
  };

  return (
    <div className="modalBackdrop">
      {demoSkip()}
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
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedSkill === i ? "modalCardOptionOutlineSelected" : ""
                }`}
                onClick={() => {
                  handleClick(canBeDiscarded(usableSkill.id), i);
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
                    canActivateSkill={canBeDiscarded(usableSkill.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {props.canSkip !== false && selectedSkill === null && (
            <button
              className={`redButton2 ${
                canClick("Skip Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleSkip();
                handleUpdateDemoGuide();
              }}
            >
              {SkipMessage}
            </button>
          )}

          {selectedSkill === null && props.unit?.blossom > 1 && (
            <button className="redButton2" onClick={() => handleBlossom()}>
              Spend 2 Blossoms
            </button>
          )}

          {selectedSkill === null && props.unit?.ember >= 2 && (
            <button className="redButton2" onClick={() => handleEmber()}>
              Spend 2 Embers
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

export default YouMaySpend1Skill;
