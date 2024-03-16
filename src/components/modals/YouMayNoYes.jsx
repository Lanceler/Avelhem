import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const YouMayNoYes = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  const dispatch = useDispatch();

  const { drawSkill, getZonesWithEnemies } = useRecurringEffects();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const handleNo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  const handleYes = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

    //end
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
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
        unit.fever = unit.fever - 1;
        newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        newGameState = drawSkill(newGameState);
        break;

      case "Aerial Impetus Purge Move": // Aerial Impetus Purge Move
        newGameState.currentResolution.push({
          resolution: "Aerial Impetus Purge Move2",
          player: props.player,
          victim: props.unit,
        });

        break;

      case "Gale Conjuration Strike": // "Gale ConjurationR2"
        newGameState.currentResolution.push({
          resolution: "Gale ConjurationR3",
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

      default:
        break;
    }

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.details.title}</h2>
        <h3>{props.details.message}</h3>

        <div className="twoColumn">
          <button onClick={() => handleNo()}>{props.details.no}</button>
          <button onClick={() => handleYes()}>{props.details.yes}</button>
        </div>
      </div>
    </div>
  );
};

export default YouMayNoYes;
