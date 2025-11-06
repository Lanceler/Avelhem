import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useCardDatabase } from "../../hooks/useCardDatabase";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const RevealEnemyHand = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const { allContingentSkills } = useCardDatabase();

  const { aetherRestoreSpecial } = useRecurringEffects();

  const dispatch = useDispatch();

  let usableSkills = [];
  for (let i in localGameState[enemy].skillHand) {
    usableSkills.push({
      id: localGameState[enemy].skillHand[i],
      handIndex: i,
    });
  }

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

    newGameState.currentResolution.pop();

    switch (props.details.title) {
      case "Reconnaissance":
        allContingentSkills().some((s) =>
          localGameState[enemy].skillHand.includes(s)
        )
          ? unit.enhancements.shield
            ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
            : (unit.enhancements.shield = 2)
          : null;

        newGameState = aetherRestoreSpecial(newGameState, unit);

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

  const canClick = (element, element2) => {};

  const handleUpdateDemoGuide = () => {};

  return (
    <div className="modalBackdrop">
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
          <div className="modalContentText">Viewing opponent’s skill hand.</div>
          <div className="modalContent4Column modalScrollableY">
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline`}
                onClick={() => {
                  handleClick(true, i);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalCard 
                   ${canClick("Skill Card", i) ? "demoClick" : ""}
                    `}
                >
                  <Skill
                    i={i}
                    usableSkill={usableSkill}
                    canActivateSkill={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          <button
            className={`redButton2 ${
              canClick("Skip Button") ? "demoClick" : ""
            }`}
            onClick={() => {
              handleSkip();
              handleUpdateDemoGuide();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevealEnemyHand;
