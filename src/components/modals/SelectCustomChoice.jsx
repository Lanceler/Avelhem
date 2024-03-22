import React, { useState, useEffect } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const SelectCustomChoice = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { blast, canStrike, drawSkill, strike } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = null;
  if (props.unit !== undefined && props.unit !== null) {
    unit = newGameState[props.unit.player].units[props.unit.unitIndex];
  }

  let canFirstChoice = false;
  let canSecondChoice = false;
  let canSkip = false;

  let ChoiceFirstMessage = "";
  let ChoiceSecondMessage = "";

  switch (props.details.reason) {
    case "Frenzy Blade1":
      canFirstChoice = true;
      canSecondChoice = newGameState[self].skillHand.length > 0;
      ChoiceFirstMessage = "Draw 1 skill.";
      ChoiceSecondMessage = "Spend 1 skill to gain Shield for 2 turns.";
      break;

    case "Frenzy Blade2":
      canFirstChoice = canStrike(unit);
      canSecondChoice = true;
      ChoiceFirstMessage = "Strike.";
      ChoiceSecondMessage = "Blast.";
      break;
  }

  const handleFirstChoice = () => {
    if (selectedChoice === 1) {
      setSelectedChoice(null);
    } else if (canFirstChoice) {
      setSelectedChoice(1);
    }
  };

  const handleSecondChoice = () => {
    if (selectedChoice === 2) {
      setSelectedChoice(null);
    } else if (canSecondChoice) {
      setSelectedChoice(2);
    }
  };

  const handleSelect = () => {
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "Frenzy Blade1":
        if (selectedChoice === 1) {
          newGameState = drawSkill(newGameState);
        } else {
          newGameState.currentResolution.push({
            resolution: "Frenzy Blade1.5",
            unit: unit,
          });
          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: self,
            message: "Spend 1 skill.",
            restriction: null,
          });
        }
        break;

      case "Frenzy Blade2":
        if (selectedChoice === 1) {
          newGameState = strike(newGameState, unit, props.details.victim, null);
        } else {
          newGameState = blast(newGameState, unit, props.details.victim, null);
        }
        break;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    newGameState.currentResolution.pop();
    dispatch(updateState(newGameState));
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

        <div className="twoColumn">
          <div
            className={`customChoice ${
              selectedChoice === 1 ? "selectedChoice" : ""
            } `}
            style={{ backgroundImage: `url(${GoldFrame})` }}
            onClick={() => handleFirstChoice()}
          >
            <div
              className={`customChoiceFrame ${
                canFirstChoice ? "" : "disabledChoice"
              } `}
            >
              <h3 className="choiceText ">{ChoiceFirstMessage}</h3>
            </div>
          </div>

          <div
            className={`customChoice ${
              selectedChoice === 2 ? "selectedChoice" : ""
            } `}
            style={{ backgroundImage: `url(${GoldFrame})` }}
            onClick={() => handleSecondChoice()}
          >
            <div
              className={`customChoiceFrame ${
                canSecondChoice ? "" : "disabledChoice"
              } `}
            >
              <h3 className="choiceText ">{ChoiceSecondMessage}</h3>
            </div>
          </div>
        </div>

        {selectedChoice === null && canSkip && (
          <button className="choiceButton" onClick={() => handleSkip()}>
            Skip
          </button>
        )}

        {selectedChoice !== null && (
          <button className="choiceButton" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectCustomChoice;
