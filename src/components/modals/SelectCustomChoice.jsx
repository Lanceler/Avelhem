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

  useEffect(() => {
    setSelectedChoice(null);
  }, [props.details.reason]);

  const {
    blast,
    canMove,
    canSowAndReapBlast,
    canSowAndReapStrike,
    canStrike,
    drawSkill,
    getVacantAdjacentZones,
    getZonesAerialImpetusAlly,
    getZonesWithAllies,
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

    case "Flash Fire":
      canFirstChoice = true;
      canSecondChoice =
        newGameState[unit.player].skillHand.length > 0 &&
        ["01-01", "01-02", "01-03"].some((s) =>
          localGameState[self].skillVestige.includes(s)
        );
      ChoiceFirstMessage = "Gain 2 Fevers (Max. 2).";
      ChoiceSecondMessage =
        "Spend 1 skill to recover then float 1 non-burst Fire skill.";
      break;

    case "Purification":
      canFirstChoice = true;
      canSecondChoice = true;
      ChoiceFirstMessage = "Draw 1 skill.";
      ChoiceSecondMessage = "Search for then float 1 non-burst Water skill.";
      break;

    case "Kleptothermy":
      canFirstChoice = true;
      canSecondChoice = getZonesWithEnemies(unit, 1).length > 0;
      ChoiceFirstMessage = "Restore your or an adjacent ally’s Virtue.";
      ChoiceSecondMessage =
        "Purge an adjacent enemy’s Virtue. This cannot affect Water Scions.";
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

    case "Mountain Stance":
      canFirstChoice = true;
      canSecondChoice = newGameState[unit.player].skillHand.length > 0;
      ChoiceFirstMessage =
        "Gain a boost: you can use <invoke> to activate “Boulder Crush”.";
      ChoiceSecondMessage = "Spend 1 skill to search for 1 “Crystallization”.";
      break;

    case "Surge2":
      canFirstChoice = canMove(unit);
      canSecondChoice = canStrike(unit);
      ChoiceFirstMessage = "Traverse.";
      ChoiceSecondMessage = "Strike (2 AP).";
      break;

    case "Surge3":
      canFirstChoice = canMove(unit);
      canSecondChoice = canStrike(unit);
      ChoiceFirstMessage = "Traverse.";
      ChoiceSecondMessage = "Strike (2 AP).";
      break;

    case "Aegis":
      canFirstChoice = true;
      canSecondChoice = newGameState[unit.player].skillHand.length > 0;
      ChoiceFirstMessage = "Grant them Shield for 1 turn.";
      ChoiceSecondMessage = "Spend 1 skill to grant them Ward for 1 turn.";
      break;

    case "Reinforce":
      canFirstChoice = true;
      canSecondChoice = newGameState[unit.player].skillHand.length > 0;
      ChoiceFirstMessage = "Gain 1 Sharpness (Max. 2).";
      ChoiceSecondMessage = "Spend 1 skill to gain 1 HP (Max. 2).";
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

    case "Arsenal Onslaught":
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

      case "Flash Fire":
        if (selectedChoice === 1) {
          unit.fever
            ? (unit.fever = Math.min(2, unit.fever + 2))
            : (unit.fever = 2);
          newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        } else {
          newGameState.currentResolution.push({
            resolution: "Recover Skill",
            player: self,
            restriction: ["01-01", "01-02", "01-03"],
            message: "Recover then float 1 non-burst Fire skill.",
            outcome: "Float",
          });

          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: unit.player,
            message: "Spend 1 skill.",
            restriction: null,
          });
        }
        break;

      case "Purification":
        if (selectedChoice === 1) {
          newGameState = drawSkill(newGameState);
        } else {
          updateData = true;
          newGameState.currentResolution.push({
            resolution: "Search Skill",
            player: self,
            restriction: ["02-01", "02-02", "02-03"],
            message: "Search for then float 1 non-burst Water skill.",
            outcome: "Float",
          });
        }
        break;

      case "Kleptothermy":
        updateLocal = false;
        if (selectedChoice === 1) {
          props.enterSelectUnitMode(
            getZonesWithAllies(unit, 1, true),
            null,
            newGameState,
            null,
            "kleptothermy ally",
            null
          );
        } else {
          props.enterSelectUnitMode(
            getZonesWithEnemies(unit, 1),
            null,
            newGameState,
            null,
            "kleptothermy enemy",
            null
          );
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

      case "Mountain Stance":
        if (selectedChoice === 1) {
          unit.boosts.mountainStance = true;
        } else {
          newGameState.currentResolution.push({
            resolution: "Search Skill",
            player: self,
            restriction: ["04-01"],
            message: "Search for 1 “Crystallization”.",
            outcome: "Add",
          });

          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: unit.player,
            message: "Spend 1 skill.",
            restriction: null,
          });
        }
        break;

      case "Surge2":
        updateLocal = false;
        if (selectedChoice === 1) {
          props.setMovingSpecial("Surge");

          newGameState.currentResolution.push({
            resolution: "Mana Skill",
            resolution2: "Surge3",
            unit: unit,
            details: {
              title: "Surge",
              reason: "Surge3",
            },
          });

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
            "Surge"
          );
        }
        break;

      case "Surge3":
        updateLocal = false;
        if (selectedChoice === 1) {
          props.setMovingSpecial("Surge");

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
            "Surge"
          );
        }
        break;

      case "Aegis":
        let victim =
          newGameState[props.victim.player].units[props.victim.unitIndex];
        if (selectedChoice === 1) {
          victim.enhancements.shield
            ? Math.max(1, victim.enhancements.shield)
            : (victim.enhancements.shield = 1);
        } else {
          victim.enhancements.ward
            ? Math.max(1, victim.enhancements.ward)
            : (victim.enhancements.ward = 1);

          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: props.unit,
            player: self,
            message: "Spend 1 skill.",
            restriction: null,
          });
        }

        newGameState[props.victim.player].units[props.victim.unitIndex] =
          victim;

        break;

      case "Reinforce":
        if (selectedChoice === 1) {
          unit.sharpness
            ? (unit.sharpness = Math.min(2, unit.sharpness + 1))
            : (unit.sharpness = 1);
          newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        } else {
          unit.hp = Math.max(2, unit.hp);
          newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: unit.player,
            message: "Spend 1 skill.",
            restriction: null,
          });
        }
        break;

      case "Frenzy Blade1":
        if (selectedChoice === 1) {
          newGameState = drawSkill(newGameState);
        } else {
          newGameState.currentResolution.push({
            resolution: "Metal Skill",
            resolution2: "Frenzy Blade1.5",
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

      case "Arsenal Onslaught":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Metal Skill",
            resolution2: "Arsenal Onslaught1",
            unit: unit,
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Metal Skill",
            resolution2: "Arsenal Onslaught1.1",
            unit: unit,
          });
        }
        break;

      case "Sow and Reap":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Plant Skill",
            resolution2: "Sow and Reap Blast",
            unit: unit,
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Plant Skill",
            resolution2: "Select Sow and Reap Striker",
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
