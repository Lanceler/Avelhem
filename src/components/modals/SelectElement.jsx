import React, { useState } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const SelectElement = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const { ascendPawn, canAscend } = useRecurringEffects();
  const { getElementImage } = useCardImageSwitch();

  //const aspects = ["Fire Scion", "Water Scion", "Wind Scion", "Land Scion", "Lightning Scion", "Mana Scion", "Metal Scion", "Plant Scion"]

  const aspects = [
    "Fire",
    "Water",
    "Wind",
    "Land",
    "Lightning",
    "Mana",
    "Metal",
    "Plant",
  ];

  const canSelect = (choice) => {
    switch (props.details.reason) {
      case "Power at the Final Hour":
        return canAscend(localGameState, props.unit.player, choice + " Scion");

      default:
        return false;
    }
  };

  const handleProceed = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    console.log(selectedChoice);

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
          selectedChoice + " Scion",
          "Power at the Final Hour",
          null
        );

        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSelect = (aspect) => {
    if (selectedChoice === aspect) {
      setSelectedChoice(null);
    } else if (canSelect(aspect)) {
      setSelectedChoice(aspect);
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{props.details.message}</h3>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {aspects.map((aspect, i) => (
              <div
                key={i}
                onClick={() => handleSelect(aspect)}
                style={{ backgroundImage: `url(${GoldFrame})` }}
                className={` customChoice customChoiceElement ${
                  selectedChoice === aspect ? "selectedChoice" : ""
                } `}
              >
                <div
                  className={`customChoiceFrameElement  ${
                    canSelect(aspect) ? "" : "disabledChoice"
                  }`}
                >
                  <div>
                    <img
                      src={getElementImage(aspect + " Scion")}
                      className="selectElementIcon"
                    />
                    <p className="customChoiceDescription"> {aspect} </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {selectedChoice !== null && (
            <button
              className="choiceButton noYes"
              onClick={() => handleProceed()}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectElement;
