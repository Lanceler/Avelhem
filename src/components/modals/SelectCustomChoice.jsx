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

  const {
    blast,
    canMove,
    canSowAndReapBlast,
    canSowAndReapStrike,
    canStrike,
    drawSkill,
    getVacantAdjacentZones,
    getZonesAerialImpetusAlly,
    getZonesWithEnemies,
    strike,
  } = useRecurringEffects();

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

  let updateLocal = true;
  let updateData = false;

  switch (props.details.reason) {
    case "Ignition Propulsion":
      canFirstChoice = canMove(unit);
      canSecondChoice = canStrike(unit);
      ChoiceFirstMessage = "Traverse.";
      ChoiceSecondMessage = "Strike. This cannot affect Fire Scions.";
      break;

    case "Aerial Impetus":
      canFirstChoice = getZonesAerialImpetusAlly(unit).length > 0;
      canSecondChoice = getZonesWithEnemies(unit, 1).length > 0;
      ChoiceFirstMessage =
        "Prompt an adjacent ally in the row behind you to traverse.";
      ChoiceSecondMessage = "Purge an adjacent enemy’s Virtue and Shield.";
      break;

    case "Upheaval":
      canFirstChoice =
        canMove(unit) && localGameState[props.unit.player].skillHand.length > 0;
      canSecondChoice = true;
      ChoiceFirstMessage = "Spend 1 skill to traverse.";
      ChoiceSecondMessage = "Search for then float 1 non-burst Land skill.";
      break;

    case "Geomancy":
      canFirstChoice = true;
      canSecondChoice = ["04-01", "04-02", "04-03"].some((s) =>
        localGameState[self].skillVestige.includes(s)
      );
      ChoiceFirstMessage = "Gain 1 HP (Max 3).";
      ChoiceSecondMessage = "Recover then float 1 Land skill.";
      break;

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

    case "Sow and Reap":
      canFirstChoice = canSowAndReapBlast(unit);
      canSecondChoice = canSowAndReapStrike(unit);
      ChoiceFirstMessage = "Blast (bypass Shield) an adjacent rooted enemy.";
      ChoiceSecondMessage = "Prompt an adjacent ally to strike a rooted enemy.";
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
      case "TEMPLATE":
        if (selectedChoice === 1) {
          //1st choice
        } else {
          //2nd choice
        }
        break;

      case "Ignition Propulsion":
        updateLocal = false;
        if (selectedChoice === 1) {
          props.enterMoveMode(
            getVacantAdjacentZones(unit),
            unit,
            newGameState,
            null
          );
        } else {
          props.enterSelectUnitMode(
            getZonesWithEnemies(unit, 1),
            unit,
            newGameState,
            null,
            "strike",
            "Fire Scion"
          );
        }
        break;

      case "Upheaval":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Land Skill",
            resolution2: "UpheavalR3",
            unit: unit,
          });

          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: self,
            message: "Spend 1 skill.",
            restriction: null,
          });
        } else {
          updateData = true;
          newGameState.currentResolution.push({
            resolution: "Search Skill",
            player: self,
            restriction: ["04-01", "04-02", "04-03"],
            message: "Search for then float 1 non-burst Land skill.",
            outcome: "Float",
          });
        }
        break;

      case "Geomancy":
        if (selectedChoice === 1) {
          unit.hp = Math.min(unit.hp + 1, 3);
          newGameState[unit.player].units[unit.unitIndex] = unit;
        } else {
          newGameState.currentResolution.push({
            resolution: "Recover Skill",
            player: self,
            restriction: ["04-01", "04-02", "04-03"],
            message: "Recover then float 1 Land skill.",
            outcome: "Float",
          });
        }
        break;

      case "Aerial Impetus":
        updateLocal = false;
        if (selectedChoice === 1) {
          props.enterSelectUnitMode(
            getZonesAerialImpetusAlly(unit),
            unit,
            newGameState,
            null,
            "aerial impetus prompt",
            null
          );
        } else {
          props.enterSelectUnitMode(
            getZonesWithEnemies(unit, 1),
            unit,
            newGameState,
            null,
            "aerial impetus purge",
            null
          );
        }
        break;

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
        updateData = true;
        if (selectedChoice === 1) {
          newGameState = strike(newGameState, unit, props.details.victim, null);
        } else {
          newGameState = blast(newGameState, unit, props.details.victim, null);
        }
        break;

      case "Sow and Reap":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Sow and Reap Blast",
            unit: unit,
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Select Sow and Reap Striker",
            unit: unit,
            player: self,
          });
        }
        break;
    }

    if (updateLocal) {
      dispatch(updateState(newGameState));
    }

    if (updateData) {
      props.updateFirebase(newGameState);
    }
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
