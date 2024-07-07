import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import Skill from "../hand/Skill";

const ContingentTriggered = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { contingencySettings } = useSelector(
    (state) => state.contingencySettings
  );

  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const {
    activateBlackBusinessCard,
    activateBlazeOfGlory,
    activateFatedRivalry,
    activateMatchMadeInHeaven,
    activatePowerAtTheFinalHour,
    activateThunderThaumaturge,
    activateVengefulLegacy,
    triggerAegis,
    triggerBlackBusinessCard,
    triggerBlazeOfGlory,
    triggerFatedRivalry,
    triggerFrenzyBlade,
    triggerHealingRain,
    triggerMatchMadeInHeaven,
    triggerPitfallTrap,
    triggerPowerAtTheFinalHour,
    triggerThunderThaumaturge,
    triggerVengefulLegacy,
    triggerViridianGrave,
  } = useRecurringEffects();

  const contingentSkills = [];
  const usableSkills = [];
  let contingencyMessage = null;
  let targetType = "";

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if (props.contingencyType === "Target") {
      newGameState.activatingTarget.pop();
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const filterSkills = () => {
    for (let i in localGameState[self].skillHand) {
      if (contingentSkills.includes(localGameState[self].skillHand[i])) {
        usableSkills.push({
          id: localGameState[self].skillHand[i],
          handIndex: i,
        });
      }
    }
  };

  const contingencySkip = (type) => {
    if (!contingencySettings[type]) {
      for (let usableSkill of usableSkills) {
        if (canActivateSkill(usableSkill.id)) {
          return;
        }
      }

      console.log("SKIP");
      handleSkip();
    }
  };

  const canActivateSkill = (skill) => {
    switch (skill) {
      //Activation
      case "03-03":
        return props.screech === true;

      //Ascension
      case "SC-02":
        return (
          props.team === "enemy" &&
          triggerFatedRivalry(
            localGameState,
            props.unit,
            props.scionClass,
            props.method
          )
        );

      case "SC-03":
        return (
          props.team === "ally" &&
          triggerMatchMadeInHeaven(
            localGameState,
            props.unit,
            props.scionClass,
            props.method
          )
        );

      //Elimination
      case "08-03":
        return triggerViridianGrave(props.unit, props.team);

      case "SC-04":
        return props.team === "ally" && triggerVengefulLegacy(props.unit);

      case "SC-05":
        return props.team === "enemy" && triggerBlackBusinessCard(props.unit);

      //Motion
      case "04-03":
        return triggerPitfallTrap(props.mover);

      //Survival
      case "02-03":
        return (
          props.team === "ally" && triggerHealingRain(props.victim, props.type)
        );

      case "07-03":
        return props.team === "enemy" && triggerFrenzyBlade(props.victim);

      case "SC-01":
        return (
          props.team === "ally" && triggerPowerAtTheFinalHour(props.victim)
        );

      //Target
      case "01-03":
        return triggerBlazeOfGlory(props.victim, props.type);

      case "05-03":
        return triggerThunderThaumaturge(props.attacker, props.victim);

      case "06-03":
        return triggerAegis(props.victim);

      default:
        return false;
    }
  };

  switch (props.contingencyType) {
    case "Activation":
      contingentSkills.push(...["03-03"]);
      filterSkills();
      contingencySkip(props.contingencyType);
      break;

    case "Ascension":
      contingentSkills.push(...["SC-02", "SC-03"]);
      filterSkills();
      contingencySkip(props.contingencyType);
      contingencyMessage = `Ascended via ${props.method}.`;
      break;

    case "Elimination":
      contingentSkills.push(...["08-03", "SC-04", "SC-05"]);
      filterSkills();
      contingencySkip(props.contingencyType);
      break;

    case "Motion":
      contingentSkills.push(...["04-03"]);
      filterSkills();
      contingencySkip(props.contingencyType);
      break;

    case "Survival":
      contingentSkills.push(...["02-03", "07-03", "SC-01"]);
      filterSkills();
      contingencySkip(props.contingencyType);
      break;

    case "Target":
      contingentSkills.push(...["01-03", "05-03", "06-03"]);
      filterSkills();
      contingencySkip(props.contingencyType);

      switch (props.type) {
        case "virtue-blast":
          targetType = "Virtue-blast";
          break;

        case "strike":
          targetType = "strike";
          break;

        case "blast":
          targetType = "blast";
          break;

        case "paralyze1":
          targetType = "paralyze (1 turn)";
          break;

        case "paralyze2":
          targetType = "paralyze (2 turns)";
          break;

        case "freeze1":
          targetType = "freeze (1 turn)";
          break;

        case "freeze2":
          targetType = "freeze (2 turns)";
          break;

        case "ignite":
          targetType = "ignite";
          break;
      }

      contingencyMessage = `Your ${props.victim.unitClass} was targeted via ${targetType}.`;

      break;
  }

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedSkill === i) {
        setSelectedSkill(null);
      } else {
        setSelectedSkill(i);
      }
    }
  };

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    switch (props.contingencyType) {
      //prevent enemy from activating their own contingent skill
      case "Ascension":
        if (
          ["Triggering Ascension Ally", "Triggering Ascension Enemy"].includes(
            newGameState.currentResolution[
              newGameState.currentResolution.length - 1
            ].resolution2
          )
        ) {
          newGameState.currentResolution.pop();
        }
        break;

      case "Elimination":
        if (
          [
            "Triggering Elimination Ally",
            "Triggering Elimination Enemy",
          ].includes(
            newGameState.currentResolution[
              newGameState.currentResolution.length - 1
            ].resolution2
          )
        ) {
          newGameState.currentResolution.pop();
        }
        break;

      case "Survival":
        if (
          ["Triggering Survival Ally", "Triggering Survival Enemy"].includes(
            newGameState.currentResolution[
              newGameState.currentResolution.length - 1
            ].resolution2
          )
        ) {
          newGameState.currentResolution.pop();
        }
        break;
    }

    if (props.contingencyType === "Target") {
      newGameState.activatingTarget.pop();
    }

    //remove activated card from hand but do not send to vestige
    newGameState[self].skillHand.splice(
      usableSkills[selectedSkill].handIndex,
      1
    );

    switch (usableSkills[selectedSkill].id) {
      //Motion
      case "03-03":
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Select Symphonic Screech Activator",
          activator: props.activator,
          player: self,
        });
        break;

      //Ascension
      case "SC-02":
        newGameState = activateFatedRivalry(newGameState, props.unit);
        break;

      case "SC-03":
        newGameState = activateMatchMadeInHeaven(newGameState, props.unit);
        break;

      //Elimination
      case "08-03":
        newGameState.currentResolution.push({
          resolution: "Plant Skill",
          resolution2: "Select Viridian Grave Activator",
          victim: props.unit,
          player: self,
        });
        break;

      case "SC-04":
        newGameState = activateVengefulLegacy(newGameState, props.unit);
        break;

      case "SC-05":
        newGameState = activateBlackBusinessCard(newGameState);
        break;

      //Motion
      case "04-03":
        newGameState.currentResolution.push({
          resolution: "Land Skill",
          resolution2: "Select Pitfall Trap Activator",
          mover: props.mover,
          player: self,
        });
        break;

      //Survival
      case "02-03":
        newGameState.currentResolution.push({
          resolution: "Water Skill",
          resolution2: "Select Healing Rain Activator",
          victim: props.victim,
          player: self,
        });
        break;

      case "07-03":
        newGameState.currentResolution.push({
          resolution: "Metal Skill",
          resolution2: "Select Frenzy Blade Activator",
          victim: props.victim,
          player: self,
        });
        break;

      case "SC-01":
        newGameState = activatePowerAtTheFinalHour(newGameState, props.victim);
        break;

      //Target
      case "01-03":
        newGameState = activateBlazeOfGlory(newGameState, props.victim);
        break;

      case "05-03":
        newGameState = activateThunderThaumaturge(
          newGameState,
          props.victim,
          props.attacker
        );
        break;

      case "06-03":
        newGameState.currentResolution.push({
          resolution: "Mana Skill",
          resolution2: "Select Aegis Activator",
          victim: props.victim,
          player: self,
        });
        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState); // might remove this line of code
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.139":
        return element === "Skill Card" && element2.id === "06-03";

      case "Learn1.146":
        return element === "Skill Card" && element2.id === "07-03";

      case "Learn1.163":
        return element === "Skill Card" && element2.id === "SC-04";

      case "Learn1.140":
      case "Learn1.147":
      case "Learn1.164":
        return element === "Select Button";

      case "Learn1.156":
        return element === "Skip Button";

      //////////////

      case "Fire1.34":
        return element === "Skill Card" && element2.id === "01-03";

      case "Fire1.36.1":
        switch (element) {
          case "Skill Card":
            return element2.id === "SC-04";
        }
        break;

      case "Fire1.35":
      case "Fire1.37":
        switch (element) {
          case "Select Button":
            return true;
        }
        break;

      case "Fire1.5":
        switch (element) {
          case "Skip Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.139":
        dispatch(updateDemo("Learn1.140"));
        break;

      case "Learn1.140":
        dispatch(updateDemo("Learn1.141"));
        break;

      case "Learn1.146":
        dispatch(updateDemo("Learn1.147"));
        break;

      case "Learn1.147":
        dispatch(updateDemo("Learn1.148"));
        break;

      case "Learn1.156":
        dispatch(updateDemo("Learn1.157"));
        break;

      case "Learn1.163":
        dispatch(updateDemo("Learn1.164"));
        break;

      case "Learn1.164":
        dispatch(updateDemo("Learn1.164.1"));
        break;
      /////////////////////////

      case "Fire1.5":
        dispatch(updateDemo("Fire1.6"));
        break;

      case "Fire1.34":
        dispatch(updateDemo("Fire1.35"));
        break;

      case "Fire1.36.1":
        dispatch(updateDemo("Fire1.37"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">
            Contigency Triggered: {props.contingencyType}{" "}
          </div>
          <div className="modalButton">
            <button className="choiceButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>
        <h3>{contingencyMessage}</h3>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedSkill === i ? "selectedSkill" : ""
                }
                ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}
                `}
                onClick={() => {
                  handleClick(canActivateSkill(usableSkill.id), i);
                  handleUpdateDemoGuide();
                }}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={canActivateSkill(usableSkill.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="modalBottomButton">
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
          {selectedSkill !== null && (
            <button
              className={`choiceButton ${
                canClick("Select Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleActivate();
                handleUpdateDemoGuide();
              }}
            >
              Activate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContingentTriggered;
