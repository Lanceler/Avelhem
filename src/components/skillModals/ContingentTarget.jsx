import React from "react";
import { useState } from "react";

import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import Skill from "../hand/Skill";

const ContingentTarget = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let victim =
    localGameState[props.victim.player].units[props.victim.unitIndex];

  let targetType = "";

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

  const {
    activateBlazeOfGlory,
    activateThunderThaumaturge,
    triggerAegis,
    triggerBlazeOfGlory,
    triggerThunderThaumaturge,
  } = useRecurringEffects();

  let targetContingentSkills = ["01-03", "05-03", "06-03"];

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    if (targetContingentSkills.includes(localGameState[self].skillHand[i])) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const canActivateContingency = (skill) => {
    switch (skill) {
      case "01-03":
        return triggerBlazeOfGlory(victim, props.type);

      case "05-03":
        return triggerThunderThaumaturge(props.attacker, victim);

      case "06-03":
        return triggerAegis(victim);

      default:
        return false;
    }
  };

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //pop "Triggering Target"
    newGameState.currentResolution.pop();

    newGameState.activatingTarget.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);

    //pop "Triggering Target"
    newGameState.currentResolution.pop();

    newGameState.activatingTarget.pop();

    //remove activated card from hand but do not send to vestige
    newGameState[self].skillHand.splice(
      usableSkills[selectedSkill].handIndex,
      1
    );

    switch (usableSkills[selectedSkill].id) {
      case "01-03":
        newGameState = activateBlazeOfGlory(newGameState, victim);
        break;

      case "05-03":
        newGameState = activateThunderThaumaturge(
          newGameState,
          victim,
          props.attacker
        );
        break;

      case "06-03":
        newGameState.currentResolution.push({
          resolution: "Mana Skill",
          resolution2: "Select Aegis Activator",
          victim: victim,
          player: self,
        });

        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Fire1.34":
        switch (element) {
          case "Skill Card":
            return element2.id === "01-03";
        }
        break;

      case "Fire1.35":
        switch (element) {
          case "Select Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Fire1.34":
        dispatch(updateDemo("Fire1.35"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Contigency: Target Triggered</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>
          Your {props.victim.unitClass} was targeted via {targetType}.
        </h3>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedSkill === i ? "selectedSkill" : ""
                } ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}`}
                onClick={() => {
                  handleUpdateDemoGuide();
                }}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={canActivateContingency(usableSkill.id)}
                  selectedSkill={selectedSkill}
                  setSelectedSkill={setSelectedSkill}
                />
              </div>
            ))}
          </div>
        </div>

        {/* {selectedSkill === null && (
          <button onClick={() => handleSkip()}>Skip</button>
        )}
        {selectedSkill !== null && (
          <button onClick={() => handleActivate()}>Activate</button>
        )} */}

        {selectedSkill === null && (
          <button className="choiceButton" onClick={() => handleSkip()}>
            Skip
          </button>
        )}
        {selectedSkill !== null && (
          <button
            className={`choiceButton ${
              canClick("Select Button") ? "demoClick" : ""
            }`}
            onClick={() => handleActivate()}
          >
            Activate
          </button>
        )}
      </div>
    </div>
  );
};

export default ContingentTarget;
