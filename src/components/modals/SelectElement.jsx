import React, { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useGetImages } from "../../hooks/useGetImages";

const SelectElement = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const { ascendPawn, canAscend, getZonesWithEnemies } = useRecurringEffects();
  const { getElementImage } = useGetImages();

  const aspects = [
    "Fire Scion",
    "Water Scion",
    "Wind Scion",
    "Land Scion",
    "Lightning Scion",
    "Mana Scion",
    "Metal Scion",
    "Plant Scion",
  ];

  let canSkip = false;
  if (props.details.reason === "Advance Deploy Scion") {
    canSkip = true;
  }

  const fatedRivalryEnemies = [];
  if (props.details.reason === "Fated Rivalry") {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let zones = JSON.parse(newGameState.zones);

    const enemies = getZonesWithEnemies(props.unit, 2);

    for (let z of enemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const enemyUnit = newGameState[zone.player].units[zone.unitIndex];

      fatedRivalryEnemies.push(enemyUnit.unitClass);
    }
  }

  const canDeployScion = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let classList = {};

    for (let unit of newGameState[self].units) {
      if (unit) {
        classList[unit.unitClass]
          ? (classList[unit.unitClass] += 1)
          : (classList[unit.unitClass] = 1);
      }
    }

    return classList;
  };

  const classList = canDeployScion();

  canDeployScion();

  const canSelect = (choice) => {
    switch (props.details.reason) {
      // case "Power at the Final Hour":
      //   return canAscend(localGameState, props.unit.player, choice);

      case "Power at the Final Hour":
      case "Advance Deploy Scion":
        return !classList[choice] || classList[choice] < 2;

      case "Fated Rivalry":
        return (
          (!classList[choice] || classList[choice] < 2) &&
          fatedRivalryEnemies.includes(choice)
        );

      default:
        return false;
    }
  };

  const handleProceed = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();
    // console.log(selectedChoice);

    let updateData = true;

    switch (props.details.reason) {
      case "Power at the Final Hour":
        newGameState.currentResolution.push({
          resolution: "Sovereign Contingent Skill",
          resolution2: "Power at the Final Hour2",
          player: self,
          unit: props.unit,
        });

        newGameState = ascendPawn(
          newGameState,
          props.unit,
          selectedChoice,
          "Power at the Final Hour Proaction",
          null
        );
        break;

      case "Fated Rivalry":
        newGameState = ascendPawn(
          newGameState,
          props.unit,
          selectedChoice,
          "Fated Rivalry Proaction",
          null
        );
        break;

      case "Advance Deploy Scion":
        updateData = false;

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Advance Deploy Scion: Float Skill",
          player: self,
          details: {
            reason: "Advance Deploy Scion",
            restriction: null,
            title: "Deploy Scion",
            tactic: props.details.tactic,
            scionClass: selectedChoice,
            message: `Float 1 skill to deploy ${
              ["A", "E", "I", "O", "U"].includes(selectedChoice[1]) ? "an" : "a"
            } ${selectedChoice} in your frontier.`,
          },
        });
        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    if (updateData) {
      props.updateFirebase(newGameState);
    }
  };

  const handleSelect = (aspect) => {
    if (selectedChoice === aspect) {
      setSelectedChoice(null);
    } else if (canSelect(aspect)) {
      setSelectedChoice(aspect);
    }
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
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

        <h3>{props.details.message}</h3>

        <br />

        <div className="modalContent">
          <div className="fourColumn">
            {aspects.map((aspect, i) => (
              <div
                key={i}
                onClick={() => handleSelect(aspect)}
                className={` modal-option-outline 
                  ${selectedChoice === aspect ? "selected-modal-option" : ""} `}
              >
                <div
                  className={`modal-option-content modal-option-content-3   ${
                    canSelect(aspect) ? "" : "disabled-modal-option-content"
                  }`}
                >
                  <div className="modal-option-element">
                    <img
                      src={getElementImage(aspect)}
                      className="selectElementIcon"
                      alt={aspect.replace(" Scion", "element icon")}
                    />
                    <div className="modal-option-title">
                      {aspect.replace(" Scion", "")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalBottomButton">
          <div>
            {canSkip && selectedChoice === null && (
              <button className="redButton" onClick={() => handleSkip()}>
                Return
              </button>
            )}

            {selectedChoice !== null && (
              <button className="redButton" onClick={() => handleProceed()}>
                Select
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectElement;
