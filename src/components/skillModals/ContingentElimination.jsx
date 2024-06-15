import React from "react";
import { useState } from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import Skill from "../hand/Skill";

const ContingentElimination = (props) => {
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
    activateVengefulLegacy,
    triggerBlackBusinessCard,
    triggerVengefulLegacy,
    triggerViridianGrave,
  } = useRecurringEffects();

  let eliminationContingentSkills = ["08-03", "SC-04", "SC-05"];

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    if (
      eliminationContingentSkills.includes(localGameState[self].skillHand[i])
    ) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const canActivateContingency = (skill) => {
    switch (skill) {
      case "08-03":
        return triggerViridianGrave(props.unit, props.team);

      case "SC-04":
        return props.team === "ally" && triggerVengefulLegacy(props.unit);

      case "SC-05":
        return props.team === "enemy" && triggerBlackBusinessCard(props.unit);

      default:
        return false;
    }
  };

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //pop "Triggering Elimination Ally/Enemy"
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);

    //pop "Triggering Elimination Ally/Enemy"
    newGameState.currentResolution.pop();

    if (
      //prevent enemy from activating their own contingent skill
      ["Triggering Elimination Ally", "Triggering Elimination Enemy"].includes(
        newGameState.currentResolution[
          newGameState.currentResolution.length - 1
        ].resolution2
      )
    ) {
      newGameState.currentResolution.pop();
    }

    //remove activated card from hand but do not send to vestige
    newGameState[self].skillHand.splice(
      usableSkills[selectedSkill].handIndex,
      1
    );

    switch (usableSkills[selectedSkill].id) {
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
    }

    // if (usableSkills[selectedSkill].id === "08-03") {
    //   newGameState.currentResolution.push({
    //     resolution: "Plant Skill",
    //     resolution2: "Select Viridian Grave Activator",
    //     victim: props.unit,
    //     player: self,
    //   });
    // }

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

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Fire1.36.1":
        switch (element) {
          case "Skill Card":
            return element2.id === "SC-04";
        }
        break;

      case "Fire1.37":
        switch (element) {
          case "Select Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Fire1.36.1":
        dispatch(updateDemo("Fire1.37"));
        break;
    }
  };

  const contingencySkip = () => {
    if (!contingencySettings.Elimination) {
      for (let usableSkill of usableSkills) {
        if (canActivateContingency(usableSkill.id)) {
          return;
        }
      }

      handleSkip();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Contigency: Elimination Triggered</h2> */}

        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Contigency: Elimination Triggered</h2>
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
            onClick={() => handleActivate()}
          >
            Activate
          </button>
        )}
      </div>
      {contingencySkip()}
    </div>
  );
};

export default ContingentElimination;
