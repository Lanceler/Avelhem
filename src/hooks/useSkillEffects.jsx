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

  const ignitionPropulsion1 = (unit) => {
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
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Discard 1 skill.",
    });

    return newGameState;
  };

  const conflagration1 = (unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Conflagration" resolution
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
      resolution: "ConflagrationBlast",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Discard 1 skill.",
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

    //return the skill conclusion of Screech
    newGameState.currentResolution.push(symphonicScreechConclusion);

    //activator can reveal 1 Wind skill to draw 1 floating skill
    if (
      newGameState[self].skillFloat > 0 &&
      newGameState[self].skillHand.length
    ) {
      newGameState.currentResolution.push({
        resolution: "Symphonic Screech2",
        unit: unit,
        player: self,
        restriction: ["03-01", "03-02", "03-03", "03-04"],
        message: "You may reveal 1 Wind skill to draw a floating skill.",
      });
    }

    newGameState.currentResolution.push({
      resolution: "Symphonic Screech Negate",
      player: victim.player,
      canFloat: !isAdjacent(unit, victim),
    });

    return newGameState;
  };

  return {
    conflagration1,
    ignitionPropulsion1,
    symphonicScreech1,
  };
};
