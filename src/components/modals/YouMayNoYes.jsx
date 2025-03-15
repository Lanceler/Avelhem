import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

// import { useCardDatabase } from "../../hooks/useCardDatabase";

const YouMayNoYes = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  // const { allBurstSkills, getScionSet } = useCardDatabase();

  const {
    drawAvelhem,
    drawSkill,
    endExecutionPhase2,
    enterMoveMode,
    enterSelectUnitMode,
    getVacantAdjacentZones,
    getVacantFrontier,
    getZonesWithEnemies,
  } = useRecurringEffects();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  let updateData = false;
  if (
    [
      "Mana Feedback",
      "Mitigate Aether-Blast",
      "Fervent Prayer",
      "Press the Attack Avelhem",
    ].includes(props.details.reason)
  ) {
    updateData = true;
  }

  const handleNo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    if (props.details.reason === "Mitigate Aether-Blast") {
      newGameState.activatingTarget.pop();
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

    const popExceptions = ["Press the Attack Pawn"];

    if (!popExceptions.includes(props.details.reason)) {
      newGameState.currentResolution.pop();
    }

    switch (props.details.reason) {
      case "End Execution Phase": //"End Execution Phase Confirm"
        if (demoCount === 125 && demoGuide === "Learn-overview") {
          newGameState = drawSkill(newGameState);
          newGameState = drawSkill(newGameState);
          newGameState = drawSkill(newGameState);
          newGameState = drawSkill(newGameState);
          newGameState = drawSkill(newGameState);
          newGameState = drawSkill(newGameState);
        }

        newGameState = endExecutionPhase2(newGameState);
        break;

      case "Beseech Draw": //"Beseech - Upgraded"
        newGameState = drawAvelhem(newGameState);
        break;

      case "Cultivate Draw": //"Cultivate - Upgraded"
        newGameState[self].fateDefiance -= 1;
        newGameState = drawSkill(newGameState);
        break;

      case "Mitigate Aether-Blast": //"Mitigating Aether-Blast"
        newGameState.activatingTarget.pop();

        newGameState.currentResolution[
          newGameState.currentResolution.length - 1
        ].special = "Aether-blast-blocked";

        unit.aether = 0;

        newGameState[props.attacker.player].units[
          props.attacker.unitIndex
        ].aether = 1;
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

      case "Blaze of Glory Draw": //"Blaze of Glory5"
        unit.aether = 0;
        newGameState = drawSkill(newGameState);
        newGameState = drawSkill(newGameState);
        break;

      case "Resplendence": //Resplendence1
        updateData = true;
        newGameState.currentResolution.push({
          resolution: "Search Card",
          player: self,
          details: {
            restriction: ["01-01", "01-02", "01-03"],
            exclusion: [],
            searchTitle: "Resplendence",
            searchMessage: "Search for 1 Fire skill",
            outcome: "Add",
            revealTitle: null,
            revealMessage: null,
            messageTitle: null,
            message: null,
            specMessage: null,
          },
        });
        break;

      case "Aerial Impetus Purge Move": // Aerial Impetus Purge Move
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Aerial Impetus Purge Move2",
          player: props.player,
          victim: props.unit,
        });
        break;

      case "Gale Conjuration Restore": // "Gale ConjurationR2"
        enterSelectUnitMode(
          props.details.zones,
          props.unit,
          newGameState,
          null,
          "gale conjuration restore",
          "null"
        );
        break;

      case "Symphonic Screech Float": // "Symphonic Screech Float"
        updateData = true;
        const backtrack = 2;
        newGameState.currentResolution[
          newGameState.currentResolution.length - backtrack
        ].skillConclusion = "float";
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

      case "Upheaval Traverse": // "UpheavalR2"
        newGameState = enterMoveMode(
          getVacantAdjacentZones(unit),
          unit,
          newGameState,
          null
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
          "paralyze1",
          "Geomancy"
        );
        break;

      case "Leyline Convergence": // "Leyline Convergence1"
        newGameState = enterMoveMode(
          getVacantAdjacentZones(unit),
          unit,
          newGameState,
          null
        );
        break;

      case "Chain Lightning Blast": // "Chain Lightning3"
        unit.charge -= 1;
        newGameState.currentResolution.push({
          resolution: "Lightning Skill",
          resolution2: "Chain Lightning4",
          unit: props.unit,
          adjacentEnemies: props.details.adjacentEnemies,
        });

        break;

      case "Zip and Zap Shield": // "Zip And Zap3"
        unit.charge -= 1;
        unit.enhancements.shield
          ? (unit.enhancements.shield = Math.max(unit.enhancements.shield, 2))
          : (unit.enhancements.shield = 2);
        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Zip and Zap Blast": // "Zip And ZapR2"
        enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "blast",
          null
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

      case "Surge": // "Surge2"
        props.setMovingSpecial("Surge");

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
          resolution: "Search Card",
          player: self,
          details: {
            restriction: ["07-01"],
            exclusion: [],
            searchTitle: "Conduction",
            searchMessage: "Search for then float 1 “Magnetic Shockwave”.",
            outcome: "Float",
            revealTitle: null,
            revealMessage: null,
            messageTitle: null,
            message: null,
            specMessage: null,
          },
        });
        break;

      case "Ambiance Assimilation":
        updateData = true;

        newGameState.currentResolution.push({
          resolution: "Search Card",
          player: self,
          details: {
            restriction: ["06-01", "06-02", "06-03"],
            exclusion: [],
            searchTitle: "Ambiance Assimilation",
            searchMessage: "Search for 1 non-burst Mana skill",
            outcome: "Add",
            revealTitle: null,
            revealMessage: null,
            messageTitle: null,
            message: null,
            specMessage: null,
          },
        });
        break;

      case "Mana Feedback": //Activating Mana Restructure
        newGameState = drawSkill(newGameState);
        break;

      case "Foreshadow Draw": //"Foreshadow Draw"
        newGameState = drawSkill(newGameState);
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
      case "Learn-overview":
        switch (demoCount) {
          case 125:
            return element === "Yes Choice";

          // return element === "No Choice";

          ////////////////////////////
        }
    }

    ///////////////
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 125:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
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

        <div className="modalContent2">
          <div className="modalContentText">{props.details.message}</div>
        </div>

        <div className="modalFooter">
          <button
            className={`redButton2 ${canClick("No Choice") ? "demoClick" : ""}`}
            onClick={() => {
              handleNo();
              handleUpdateDemoGuide();
            }}
          >
            {props.details.no}
          </button>

          <button
            className={`redButton2 ${
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
  );
};

export default YouMayNoYes;
