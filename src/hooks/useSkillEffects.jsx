import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import gameState from "../redux/gameState";

export const useSkillEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const ignitionPropulsionEffect1 = (unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Ignition Propulsion" resolution
    newGameState.currentResolution.pop();

    //consume unit's fever
    newGameState[unit.player].units[unit.unitIndex].fever--;

    //giveUnit activationCounter
    if (newGameState[unit.player].units[unit.unitIndex].temporary.activation) {
      newGameState[unit.player].units[unit.unitIndex].temporary.activation =
        newGameState[unit.player].units[unit.unitIndex].temporary.activation +
        1;
    } else {
      newGameState[unit.player].units[unit.unitIndex].temporary.activation = 1;
    }

    newGameState.currentResolution.push({
      resolution: "Ignition Propulsion1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Ignition Propulsion0",
      unit: unit,
    });

    return newGameState;
  };

  return { ignitionPropulsionEffect1 };
};
