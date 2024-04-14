import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import gameState from "../redux/gameState";

import { useCardDatabase } from "./useCardDatabase";

import { useRecurringEffects } from "./useRecurringEffects";

export const useUnitAbilityEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const {
    canBlast,
    canMove,

    canStrike,
    enterSelectUnitMode,
    getZonesWithAllies,
    getZonesWithEnemies,
  } = useRecurringEffects();

  const {} = useCardDatabase();

  const afterburner1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Afterburner"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Afterburner1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 2 fevers or 1 skill.",
      restriction: null,
      fever: 2,
    });

    return newGameState;
  };

  const afterburner2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Afterburner1"
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      getZonesWithEnemies(unit, 1),
      unit,
      newGameState,
      null,
      "strike",
      null
    );

    return newGameState;
  };

  const fieryHeart1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Fiery Heart"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedFieryHeart = true;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Fiery Heart1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 fever or 1 skill.",
      restriction: null,
      fever: 1,
    });

    return newGameState;
  };

  const fieryHeart2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Fiery Heart "
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      getZonesWithAllies(unit, 1, false),
      unit,
      newGameState,
      null,
      "fiery heart",
      null
    );

    return newGameState;
  };

  const hydrotherapy1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Hydrotherapy"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    // newGameState.currentResolution.push({
    //   resolution: "Unit Ability",
    //   resolution2: "Hydrotherapy1",
    //   unit: unit,
    // });

    enterSelectUnitMode(
      getZonesWithAllies(unit, 1, false),
      unit,
      newGameState,
      null,
      "hydrotherapy",
      null
    );

    return newGameState;
  };

  const coldEmbrace1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Cold Embrace"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    enterSelectUnitMode(
      getZonesWithEnemies(unit, 1),
      unit,
      newGameState,
      null,
      "freeze2",
      null
    );

    return newGameState;
  };

  const reapTheWhirlwind1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Reap the Whirlwind"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (canMove(unit) || canBlast(unit)) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Reap the Whirlwind1",
        player: self,
        unit: unit,
        details: {
          reason: "Reap the Whirlwind",
          title: "Reap the Whirlwind",
          message: "You may traverse or blast an adjacent enemy.",
          no: "Skip",
          yes: "Proceed",
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Search Skill",
      player: self,
      restriction: ["03-02"],
      message: "Search for 1 “Gale Conjuration”.",
      outcome: "Add",
    });

    return newGameState;
  };

  const fortify1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Fortify"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //Gain Shield for 2 turns
    unit.enhancements.shield
      ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
      : (unit.enhancements.shield = 2);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (canMove(unit) || canStrike(unit)) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Fortify1",
        unit: unit,
        reason: "Fortify",
        restriction: null,
        title: "Fortify",
        message: "You may float 1 skill to traverse or strike.",
      });
    }

    return newGameState;
  };

  const galvanize1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Galvanize"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //Gain 1 charge
    unit.charge
      ? (unit.charge = Math.min(3, unit.charge + 1))
      : (unit.charge = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (canMove(unit)) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Galvanize1",
        player: self,
        unit: unit,
        details: {
          reason: "Galvanize",
          title: "Galvanize",
          message: "You may traverse.",
          no: "Skip",
          yes: "Traverse",
        },
      });
    }

    return newGameState;
  };

  //end of list

  return {
    afterburner1,
    afterburner2,
    fieryHeart1,
    fieryHeart2,
    hydrotherapy1,
    coldEmbrace1,
    reapTheWhirlwind1,
    fortify1,
    galvanize1,
  };
};
