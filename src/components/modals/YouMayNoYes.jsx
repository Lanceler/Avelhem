import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const YouMayNoYes = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  const dispatch = useDispatch();

  const { drawSkill, getZonesWithEnemies, virtueBlastYes } =
    useRecurringEffects();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  let updateData = false;
  if (["Block Virtue-Blast"].includes(props.details.reason)) {
    updateData = true;
  }

  const handleNo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));

    if (updateData) {
      props.updateFirebase(newGameState);
    }
  };

  const handleYes = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = null;
    if (props.unit !== undefined) {
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
          resolution: "Chain Lightning4",
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
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.details.title}</h2> */}

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
