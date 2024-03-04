import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import gameState from "../redux/gameState";

import { useRecurringEffects } from "./useRecurringEffects";

export const useSkillEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getZonesWithEnemies, isAdjacent, isMuted } = useRecurringEffects();

  const ignitionPropulsion1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Ignition Propulsion" resolution
    newGameState.currentResolution.pop();

    //consume unit's fever
    unit.fever = unit.fever - 1;

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Ignition Propulsion1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 skill.",
      restriction: null,
    });

    return newGameState;
  };

  const conflagration1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Conflagration" resolution
    newGameState.currentResolution.pop();

    //consume unit's fever
    unit.fever = unit.fever - 1;

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Conflagration1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 skill.",
      restriction: null,
    });

    return newGameState;
  };

  const conflagrationR1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Resonating Conflagration" resolution
    newGameState.currentResolution.pop();

    //consume unit's fever
    unit.fever = unit.fever - 1;

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "May float resonant skill",
        unit: unit,
        player: unit.player,
        skill: "01-02",
        resonator: resonator,
      });
    }

    newGameState.currentResolution.push({
      resolution: "ConflagrationR1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Conflagration1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 skill.",
      restriction: null,
    });

    return newGameState;
  };

  const conflagrationR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "ConflagrationR1"
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      getZonesWithEnemies(unit, 1).length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "ConflagrationR2",
        unit: unit,
      });
    }

    return newGameState;
  };

  const blazeOfGlory1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Blaze of Glory" resolution
    newGameState.currentResolution.pop();

    //consume unit's fever
    unit.fever = unit.fever - 1;

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Blaze of Glory2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Blaze of Glory1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 skill.",
      restriction: null,
    });

    return newGameState;
  };

  const blazeOfGlory2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Blaze of Glory2"
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit) && unit.fever > 0) {
      newGameState.currentResolution.push({
        resolution: "Blaze of Glory Draw",
        unit: unitInfo,
      });
    }

    return newGameState;
  };

  const resplendence1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Resplendence" resolution
    newGameState.currentResolution.pop();

    unit.hp = 2;
    unit.fever = 2;
    unit.enhancements.shield
      ? Math.max(2, unit.enhancements.shield)
      : (unit.enhancements.shield = 2);

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (
      getZonesWithEnemies(unit, 1).length &&
      newGameState[self].skillHand.length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Resplendence2",
        unit: unit,
        message:
          "You may spend 1 skill to ignite an adjacent enemy for 1 turn.",
        restriction: null,
        reason: "Resplendence2",
      });
    }

    return newGameState;
  };

  const purification1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Purification" resolution
    newGameState.currentResolution.pop();

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    const isAdjacentToFrostbitten = () => {
      const zones = JSON.parse(localGameState.zones);
      const adjacentEnemies = getZonesWithEnemies(unit, 1);

      for (let i of adjacentEnemies) {
        const zone = zones[Math.floor(i / 5)][i % 5];
        const enemy = localGameState[zone.player].units[zone.unitIndex];

        if (enemy.afflictions.frostbite > 0) {
          return true;
        }
      }
      return false;
    };

    if (isAdjacentToFrostbitten()) {
      newGameState.currentResolution.push({
        resolution: "Purification2",
        unit: unit,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Purification1",
      unit: unit,
    });

    return newGameState;
  };

  const frigidBreath1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Frigid Breath" resolution
    newGameState.currentResolution.pop();

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Frigid Breath2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Frigid Breath1",
      unit: unit,
    });

    return newGameState;
  };

  const frigidBreath2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Frigid Breath2"
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      getZonesWithEnemies(unit, 1).length > 0 &&
      newGameState[self].skillHand.length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Frigid Breath3",
        unit: unit,
        reason: "Frigid Breath3",
        restriction: null,
        message:
          "You may float 1 skill to freeze an adjacent enemy for 2 turns.",
      });
    }

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
    ignitionPropulsion1,
    conflagration1,
    conflagrationR1,
    conflagrationR2,
    blazeOfGlory1,
    blazeOfGlory2,
    resplendence1,
    purification1,
    frigidBreath1,
    frigidBreath2,
    symphonicScreech1,
  };
};
