import React from "react";
import { useState, useEffect } from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import Skill from "../hand/Skill";

const ContingentSurvivalEnemy = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { contingencySettings } = useSelector(
    (state) => state.contingencySettings
  );

  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const { triggerFrenzyBlade } = useRecurringEffects();

  let survivalAllyContingentSkills = ["02-03", "07-03", "SC-01"];

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    if (
      survivalAllyContingentSkills.includes(localGameState[self].skillHand[i])
    ) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const canActivateContingency = (skill) => {
    switch (skill) {
      case "02-03":
        return false;

      case "07-03":
        return triggerFrenzyBlade(props.victim);

      case "SC-01":
        return false;

      default:
        return false;
    }
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
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //pop "Triggering Survival Enemy"
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);

    //pop "Triggering Survival Enemy"
    newGameState.currentResolution.pop();

    if (
      //prevent enemy from activating their own contingent skill
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution2 === "Triggering Survival Ally"
    ) {
      newGameState.currentResolution.pop();
    }

    //remove activated card from hand but do not send to vestige
    newGameState[self].skillHand.splice(
      usableSkills[selectedSkill].handIndex,
      1
    );

    if (usableSkills[selectedSkill].id === "07-03") {
      newGameState.currentResolution.push({
        resolution: "Metal Skill",
        resolution2: "Select Frenzy Blade Activator",
        victim: props.victim,
        player: self,
      });
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const contingencySkip = () => {
    if (!contingencySettings.Survival) {
      for (let usableSkill of usableSkills) {
        if (canActivateContingency(usableSkill.id)) {
          return;
        }
      }

      handleSkip();
    }
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.146":
        return element2 && element2.id === "07-03";

      case "Learn1.147":
        return element === "Select Button";

      ////////////////////////////
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.146":
        dispatch(updateDemo("Learn1.147"));
        break;

      case "Learn1.147":
        dispatch(updateDemo("Learn1.148"));
        break;

      ////////////////
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Contigency: Survival Triggered</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedSkill === i ? "selectedSkill" : ""
                } ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}`}
                onClick={() => {
                  handleClick(canActivateContingency(usableSkill.id), i);
                  handleUpdateDemoGuide();
                }}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={canActivateContingency(usableSkill.id)}
                />
              </div>
            ))}
          </div>
        </div>
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
            onClick={() => {
              handleActivate();
              handleUpdateDemoGuide();
            }}
          >
            Activate
          </button>
        )}
      </div>
      {contingencySkip()}
    </div>
  );
};

export default ContingentSurvivalEnemy;
