import React from "react";
import { useState } from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import Skill from "../hand/Skill";

const ContingentAscension = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { contingencySettings } = useSelector(
    (state) => state.contingencySettings
  );

  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const {
    activateFatedRivalry,
    activateMatchMadeInHeaven,
    triggerFatedRivalry,
    triggerMatchMadeInHeaven,
  } = useRecurringEffects();

  let ascensionContingentSkills = ["SC-02", "SC-03"];

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    if (ascensionContingentSkills.includes(localGameState[self].skillHand[i])) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const canActivateContingency = (skill) => {
    switch (skill) {
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

    //pop "Triggering Ascension Ally/Enemy"
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);

    //pop "Triggering Ascension Ally/Enemy"
    newGameState.currentResolution.pop();

    if (
      //prevent enemy from activating their own contingent skill
      ["Triggering Ascension Ally", "Triggering Ascension Enemy"].includes(
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
      case "SC-02":
        newGameState = activateFatedRivalry(newGameState, props.unit);
        break;

      case "SC-03":
        newGameState = activateMatchMadeInHeaven(newGameState, props.unit);
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

  const canClick = (element) => {
    switch (demoGuide) {
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
      case "Fire1.5":
        dispatch(updateDemo("Fire1.6"));
        break;
    }
  };

  const contingencySkip = () => {
    if (!contingencySettings.Ascension) {
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
          <h2 className="choiceTitle">Contigency: Ascension Triggered</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>
        <h3>Ascended via {props.method}.</h3>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedSkill === i ? "selectedSkill" : ""
                }`}
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
          <button className="choiceButton" onClick={() => handleActivate()}>
            Activate
          </button>
        )}
      </div>
      {contingencySkip()}
    </div>
  );
};

export default ContingentAscension;
