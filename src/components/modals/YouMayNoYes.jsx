import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const YouMayNoYes = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  const dispatch = useDispatch();

  const {
    drawAvelhem,
    drawSkill,
    getVacantFrontier,
    getZonesWithEnemies,
    virtueBlastYes,
  } = useRecurringEffects();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  let updateData = false;
  if (
    ["Block Virtue-Blast", "Mana Restructure", "Fervent Prayer"].includes(
      props.details.reason
    )
  ) {
    updateData = true;
  }

  const handleNo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    if (props.details.reason === "Mana Restructure") {
      newGameState[self].skillVestige.push(props.details.skill);
    }

    dispatch(updateState(newGameState));

    if (updateData) {
      props.updateFirebase(newGameState);
    }
  };

  const handleYes = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = null;
    if (props.unit) {
      unit = newGameState[props.unit.player].units[props.unit.unitIndex];
    }

    //end
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "Block Virtue-Blast": //"Blocking Virtue-Blast"
        newGameState = virtueBlastYes(newGameState, props.attacker, unit);
        break;

      case "Conflagration Ignite": //"ConflagrationR2"
        props.enterSelectUnitMode(
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

      case "Gale Conjuration Strike": // "Gale ConjurationR2"
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Gale ConjurationR3",
          unit: props.unit,
        });

        props.enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "strike",
          "Gale Conjuration Strike"
        );
        break;

      case "Cataclysmic Tempest 2nd Paralyze": // "Cataclysmic Tempest3"
        props.enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "paralyze2",
          "Cataclysmic Tempest"
        );
        break;

      case "Cataclysmic Tempest Blast": // "Cataclysmic Tempest6"
        props.enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "blast",
          null
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
        props.enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "paralyze1",
          "Upheaval"
        );
        break;

      case "Geomancy Strike": // "Geomancy2"
        props.enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "strike",
          "Geomancy"
        );
        break;

      case "Geomancy Paralyze": // "Geomancy4"
        props.enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "paralyze2",
          "Geomancy"
        );
        break;

      case "Chain Lightning Blast": // "ChainLightning3"
        newGameState.currentResolution.push({
          resolution: "Lightning Skill",
          resolution2: "Chain Lightning4",
          unit: props.unit,
          adjacentEnemies: props.details.adjacentEnemies,
        });
        break;

      case "Zip and Zap Shield": //"Zip And Zap3"
        unit.charge -= 1;
        unit.enhancements.shield
          ? (unit.enhancements.shield = Math.max(unit.enhancements.shield, 2))
          : (unit.enhancements.shield = 2);
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Zip and Zap Blast": //"Zip And ZapR2"
        props.enterSelectUnitMode(
          getZonesWithEnemies(props.unit, 1),
          props.unit,
          newGameState,
          null,
          "blast",
          "Lightning Scion"
        );
        break;

      case "Diffusion 2nd Blast": // "Diffusion4"
        props.enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "blast",
          null
        );
        break;

      case "Magnetic Shockwave 2nd Paralyze": // "Magnetic Shockwave2.1"
        props.enterSelectUnitMode(
          props.details.adjacentEnemies,
          props.unit,
          newGameState,
          null,
          "paralyze1",
          null
        );
        break;

      case "Magnetic Shockwave Blast": // "Magnetic Shockwave3.1"
        props.enterSelectUnitMode(
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

      case "Mana Restructure":
        newGameState[self].skillRepertoire.push(props.details.skill);
        newGameState[self].skillFloat += 1;

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Enemy",
          player: enemy,
          title: "Mana Restructure",
          message: "Your opponent has floated 1 Mana skill from their hand.",
        });

        break;

      case "Avelhem Resonance Shuffle":
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

      case "Providence Recovery":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          restriction: ["SX-01"],
          message: "Recover 1 “Transcendence”",
          outcome: "Add",
        });

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
        newGameState = drawAvelhem(newGameState);
        break;

      case "Press the Attack Pawn":
        // props.enterDeployMode(getVacantFrontier());

        newGameState.currentResolution.push({
          resolution: "Deploying Pawn",
          zoneIds: getVacantFrontier(),
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

  return (
    <div className="modal-backdrop">
      <div className="modal modalNoYes">
        <div className="twoColumn">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3 className="noYesMessage">{props.details.message}</h3>

        <div className="twoColumn bottomAnchor">
          <button className="choiceButton noYes" onClick={() => handleNo()}>
            {props.details.no}
          </button>
          <button className="choiceButton noYes" onClick={() => handleYes()}>
            {props.details.yes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default YouMayNoYes;
