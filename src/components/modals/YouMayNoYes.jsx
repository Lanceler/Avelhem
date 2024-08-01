import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const YouMayNoYes = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const {
    drawAvelhem,
    drawSkill,
    enterMoveMode,
    enterSelectUnitMode,
    getVacantAdjacentZones,
    getVacantFrontier,
    getZonesWithEnemies,
    virtueBlastYes,
  } = useRecurringEffects();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  let updateData = false;
  if (
    [
      "Mitigate Virtue-Blast",
      "Mana Restructure",
      "Fervent Prayer",
      "Press the Attack Avelhem",
    ].includes(props.details.reason)
  ) {
    updateData = true;
  }

  const handleNo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    if (props.details.reason === "Mitigate Virtue-Blast") {
      newGameState.activatingTarget.pop();
    }

    if (props.details.reason === "Advance Avelhem Draw") {
      newGameState.currentResolution.pop();
    }

    if (props.details.reason === "Mana Restructure") {
      newGameState[self].skillVestige.push(props.details.skill);
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleYes = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = null;
    if (props.unit) {
      unit = newGameState[props.unit.player].units[props.unit.unitIndex];
    }

    //end

    const popExceptions = ["Press the Attack Pawn"];

    if (!popExceptions.includes(props.details.reason)) {
      newGameState.currentResolution.pop();
    }

    switch (props.details.reason) {
      case "Mitigate Virtue-Blast": //"Mitigating Virtue-Blast"
        newGameState.activatingTarget.pop();
        newGameState = virtueBlastYes(newGameState, props.attacker, unit);
        break;

      case "Advance Avelhem Draw": //"Advance Avelhem Draw"
        updateData = true;
        newGameState = drawAvelhem(newGameState);
        newGameState.currentResolution.pop();
        break;

      case "Conflagration Ignite": //"ConflagrationR2"
        enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "ignite",
          null
        );
        break;

      case "Frigid Breath Blast": //"Frigid BreathR2"
        newGameState.currentResolution.push({
          resolution: "Water Skill",
          resolution2: "Frigid BreathR3",
          unit: props.unit,
        });
        break;

      case "Blaze of Glory Draw": //"Blaze of Glory3"
        unit.fever -= 1;
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        newGameState = drawSkill(newGameState);
        break;

      case "Aerial Impetus Purge Move": // Aerial Impetus Purge Move
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Aerial Impetus Purge Move2",
          player: props.player,
          victim: props.unit,
        });
        break;

      case "Gale Conjuration Purge": // "Gale ConjurationR2"
        enterSelectUnitMode(
          props.details.zones,
          props.unit,
          newGameState,
          null,
          "gale conjuration purge",
          "null"
        );
        break;

      case "Gale Conjuration Draw": // "Gale ConjurationR4"
        newGameState = drawSkill(newGameState);
        break;

      case "Symphonic Screech Float": // "Symphonic Screech Float"
        updateData = true;
        let backtrack = 2;
        if (
          newGameState.currentResolution[
            newGameState.currentResolution.length - 1
          ].resolution2 === "Symphonic Screech2"
        ) {
          backtrack = 3;
        }
        newGameState.currentResolution[
          newGameState.currentResolution.length - backtrack
        ].conclusion = "float";
        break;

      case "Cataclysmic Tempest 2nd Paralyze": // "Cataclysmic Tempest3"
        enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "paralyze1",
          "Cataclysmic Tempest"
        );
        break;

      case "Reap the Whirlwind": //Reap the Whirlwind1
        newGameState.currentResolution.push({
          resolution: "Unit Ability",
          resolution2: "Reap the Whirlwind2",
          unit: unit,
          details: {
            title: "Reap the Whirlwind",
            reason: "Reap the Whirlwind",
          },
        });
        break;

      case "Upheaval 2nd Paralyze": // "Upheaval3"
        enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "paralyze1",
          "Upheaval"
        );
        break;

      case "Geomancy Strike": // "Geomancy2"
        enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "strike",
          "Geomancy"
        );
        break;

      case "Geomancy Paralyze": // "Geomancy4"
        enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "paralyze2",
          "Geomancy"
        );
        break;

      case "Zip and Zap Shield": // "Zip And Zap3"
        unit.charge -= 1;
        unit.enhancements.shield
          ? (unit.enhancements.shield = Math.max(unit.enhancements.shield, 2))
          : (unit.enhancements.shield = 2);
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Zip and Zap Blast": // "Zip And ZapR2"
        enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "blast",
          "Lightning Scion"
        );
        break;

      case "Galvanize": // "Galvanize1"
        newGameState = enterMoveMode(
          getVacantAdjacentZones(unit),
          unit,
          newGameState,
          null
        );
        break;

      case "Arc Flash": // "Arc Flash1"
        newGameState = enterMoveMode(
          getVacantAdjacentZones(unit),
          unit,
          newGameState,
          null
        );
        break;

      case "Diffusion 2nd Blast": // "Diffusion4"
        enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "blast",
          null
        );
        break;

      case "Magnetic Shockwave 2nd Paralyze": // "Magnetic Shockwave2.1"
        enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "paralyze1",
          null
        );
        break;

      case "Magnetic Shockwave Blast": // "Magnetic Shockwave3.1"
        enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "blast",
          null
        );
        break;

      case "Conduction":
        updateData = true;
        newGameState.currentResolution.push({
          resolution: "Search Skill",
          player: self,
          restriction: ["07-01"],
          message: "Search for then float 1 “Magnetic Shockwave”.",
          outcome: "Float",
        });
        break;

      case "Ambiance Assimilation":
        updateData = true;
        newGameState.currentResolution.push({
          resolution: "Search Skill",
          player: self,
          restriction: ["06-01", "06-02", "06-03"],
          message: "Search for 1 non-burst Mana skill.",
          outcome: "Add",
        });
        break;

      case "Mana Restructure":
        newGameState[self].skillRepertoire.push(props.details.skill);
        newGameState[self].skillFloat += 1;

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Player",
          player: enemy,
          title: "Mana Restructure",
          message: "Your opponent has floated 1 Mana skill from their hand.",
          specMessage: `${
            self === "host" ? "Gold" : "Silver"
          } Sovereign has floated 1 Mana skill from their hand.`,
        });
        break;

      case "Everblooming": //"Activating Everblooming"
        newGameState = drawSkill(newGameState);
        break;

      case "Avelhem Resonance Shuffle":
        updateData = true;
        newGameState.currentResolution[
          newGameState.currentResolution.length - 1
        ].conclusion = "shuffle";
        break;

      case "Foreshadow Draw": //"Foreshadow Draw"
        newGameState = drawSkill(newGameState);
        break;

      case "Ambidexterity Conversion":
        newGameState.currentResolution.push({
          resolution: "Sovereign Resonant Skill",
          resolution2: "Ambidexterity Conversion",
          details: {
            title: "Ambidexterity",
            message: "Convert an Advance tactic into Invoke.",
            restriction: ["Advance"],
            stock: 1,
            reason: "Ambidexterity",
            canSkip: false,
          },
        });
        break;

      case "Providence Recovery":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          restriction: ["SX-01"],
          message: "Recover 1 “Transcendence”",
          outcome: "Add",
        });
        break;

      case "Fervent Prayer":
        newGameState = drawAvelhem(newGameState);

        const ferventPrayerLimit = props.details.limit;

        let ferventPrayerMessage = `You may draw 1 Avelhem up to ${
          ferventPrayerLimit - 1
        } more times.`;

        if (props.details.limit - 1 === 1) {
          ferventPrayerMessage = "You may draw 1 Avelhem 1 more time.";
        }

        if (ferventPrayerLimit - 1 > 0) {
          newGameState.currentResolution.push({
            resolution: "Sovereign Resonant Skill",
            resolution2: "Fervent Prayer1",
            player: self,
            details: {
              reason: "Fervent Prayer",
              title: "Fervent Prayer",
              message: ferventPrayerMessage,
              no: "Stop",
              yes: "Draw",
              limit: ferventPrayerLimit - 1,
            },
          });
        }
        break;

      case "Press the Attack Avelhem":
        newGameState = drawAvelhem(newGameState);
        newGameState = drawAvelhem(newGameState);
        break;

      case "Press the Attack Pawn":
        newGameState.currentResolution.push({
          resolution: "Deploying Pawn",
          zoneIds: getVacantFrontier(),
        });
        break;

      case "Continue Game":
        newGameState.currentResolution.pop(); // yes, pop again

        newGameState.winner = null;
        newGameState.winObjective = newGameState[enemy].score + 1;

        newGameState.turnPhase = "Acquisition";
        newGameState.turnPlayer = self;
        newGameState.turnCount = newGameState.turnCount + 1;
        newGameState.currentResolution.push({
          resolution: "Acquisition Phase Selection",
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

  const canClick = (element) => {
    switch (demoGuide) {
      case "Learn1.101":
      case "Learn1.158":
      case "Learn1.193":
      case "Learn1.194":
      case "Learn1.195":
      case "Learn1.264":
        return element === "Yes Choice";

      case "Learn1.216.1":
        return element === "No Choice";

      ///////////////
      case "Fire1.7":
        switch (element) {
          case "No Choice":
            return true;

          case "Yes Choice":
            return true;
        }
        break;

      case "Fire1.29.1":
      case "Fire1.36":
        switch (element) {
          case "Yes Choice":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.101":
        dispatch(updateDemo("Learn1.102"));
        break;

      case "Learn1.158":
        dispatch(updateDemo("Learn1.159"));
        break;

      case "Learn1.193":
        dispatch(updateDemo("Learn1.194"));
        break;

      case "Learn1.194":
        dispatch(updateDemo("Learn1.195"));
        break;

      case "Learn1.195":
        dispatch(updateDemo("Learn1.196"));
        break;

      case "Learn1.216.1":
        dispatch(updateDemo("Learn1.217"));
        break;

      case "Learn1.264":
        dispatch(updateDemo("Learn1.265"));
        break;

      ///////
      case "Fire1.7":
        dispatch(updateDemo("Fire1.8"));
        break;

      case "Fire1.29.1":
        dispatch(updateDemo("Fire1.30"));
        break;

      case "Fire1.36":
        dispatch(updateDemo("Fire1.36.1"));
        break;
    }
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

        <h3 style={{ maxWidth: 700 }}>{props.details.message}</h3>
        <br />

        <div className="modalBottomButton">
          <div className="multi-option-buttons">
            <button
              className={`redButton ${
                canClick("No Choice") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleNo();
                handleUpdateDemoGuide();
              }}
            >
              {props.details.no}
            </button>

            <button
              className={`redButton ${
                canClick("Yes Choice") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleYes();
                handleUpdateDemoGuide();
              }}
            >
              {props.details.yes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouMayNoYes;
