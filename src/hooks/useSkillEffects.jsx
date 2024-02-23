import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import gameState from "../redux/gameState";

import { useRecurringEffects } from "./useRecurringEffects";

export const useSkillEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { isAdjacent } = useRecurringEffects();

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

  const symphonicScreech1 = (unit, victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Symphonic Screech" resolution
    newGameState.currentResolution.pop();

    //temporarily remove the skill conclusion of Screech
    const symphonicScreechConclusion = newGameState.currentResolution.pop();

    //end "Negate the effect of the victim's skill
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Symphonic Screech Negate",
      player: enemy,
      canFloat: !isAdjacent(unit, victim),
    });

    //return the skill conclusion of Screech
    newGameState.currentResolution.push(symphonicScreechConclusion);

    //activator can reveal 1 Wind skill to draw 1 floating skill
    if (
      newGameState[self].skillFloat > 0 &&
      newGameState[self].skillHand.length
    ) {
      newGameState.currentResolution.push({
        resolution: "Symphonic Screech2",
        player: self,
      });
    }

    return newGameState;
  };

  return { ignitionPropulsionEffect1, symphonicScreech1 };
};
