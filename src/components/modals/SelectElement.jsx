import React, { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useGetImages } from "../../hooks/useGetImages";

const SelectElement = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const { ascendPawn } = useRecurringEffects();
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

  if (localGameState.expansion === "Familiars’ Followup") {
    aspects.push("Avian Scion");
  }

  let canSkip = false;
  if (props.details.reason === "Advance Deploy Scion") {
    canSkip = true;
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

  const canChoice = (choice) => {
    switch (props.details.reason) {
      case "Power at the Final Hour":
      case "Advance Deploy Scion":
        return !classList[choice] || classList[choice] < 2;

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
          "Power at the Final Hour",
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
    } else if (canChoice(aspect)) {
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

        <div className="modalContent2 modalScrollableY">
          <div className="modalContentText">{props.details.message}</div>

          <div className="modalContent4Column">
            {aspects.map((aspect, i) => (
              <div
                key={i}
                onClick={() => handleSelect(aspect)}
                className={`modalOptionOutline
                  modalElementOptionOutline
                  ${
                    selectedChoice === aspect
                      ? "modalElementOptionOutlineSelected"
                      : ""
                  } `}
              >
                <div
                  className={`modalElement
                    ${canChoice(aspect) ? "" : "disabledModal"}`}
                  style={{
                    boxShadow: selectedChoice === aspect ? "none" : "",
                  }}
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

        <div className="modalFooter">
          <div>
            {canSkip && selectedChoice === null && (
              <button className="redButton2" onClick={() => handleSkip()}>
                Return
              </button>
            )}

            {selectedChoice !== null && (
              <button className="redButton2" onClick={() => handleProceed()}>
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
