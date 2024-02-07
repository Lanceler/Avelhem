import React from "react";

import { useSelector, useDispatch } from "react-redux";
import gameState from "../redux/gameState";

export const useRecurringEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  //=========================================
  //Exported functions below

  const assignTactics = (gamestate, first, second) => {
    gamestate.tactics = [first, second];

    return gamestate;
  };

  const drawAvelhem = (gameState) => {
    console.log("drawAvelhem");

    gameState[self].avelhemHand.push(gameState[self].avelhemRepertoire.pop());

    //To do: If deck empties, shuffle discard pile into it.

    return gameState;
  };

  const drawSkill = (gameState) => {
    console.log("drawSkill");

    gameState[self].skillHand.push(gameState[self].skillRepertoire.pop());
    //To do: If deck empties, shuffle discard pile into it.

    return gameState;
  };

  const rollTactic = (extraMobilize) => {
    const mobilizeLimit = 3 + extraMobilize;

    const dieFaces = [
      { face: "advance", stock: 1 },
      { face: "advance", stock: 1 },
      { face: "mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "assault", stock: 1 },
      { face: "invoke", stock: 1 },
    ];

    return dieFaces[Math.floor(Math.random() * dieFaces.length)];
  };

  const strike = (gameState, selfIndex, enemyIndex, bypassTarget) => {
    const enemyUnit = gameState[enemy].units[enemyIndex];

    if (gameState[enemy].skillHand.length) {
      if (enemyUnit.stats.unitClass === "metalScion" && !isMuted(enemyUnit)) {
        //prompt metal scion passive
      } else if (
        !bypassTarget &&
        //Thunder Thaumaturge
        ((enemyUnit.stats.unitClass === "lightningScion" &&
          !isMuted(enemyUnit)) ||
          //Aegis
          canAegis(enemyUnit) ||
          //Blaze of Glory
          (enemyUnit.stats.fever &&
            !isMuted(enemyUnit) &&
            gameState[enemy].skillHand.length > 1))
      ) {
        //prompt target contingent skill
      }
    }
  };

  const isMuted = (unit) => {
    const afflictions = unit.stats.afflictions;

    if (
      afflictions.anathema ||
      afflictions.paralysis ||
      afflictions.frostbite ||
      afflictions.infection
    ) {
      return true;
    }

    return false;
  };

  const canAegis = (unit) => {
    const team = unit.stats.player;
    const zones = JSON.parse(localGameState.zones);

    //get Adjacent zones
    let adjacentZones = getZonesInRange(
      unit.stats.row,
      unit.stats.column,
      1,
      true
    );

    //return true if any zone contains an unmuted ally Mana Scion
    for (let i in adjacentZones) {
      let zone = zones[Math.floor(adjacentZones[i] / 5)][adjacentZones[i] % 5];
      if (zone.player === team) {
        if (
          localGameState[team].units[zone.unitIndex].stats.unitClass ===
            "manaScion" &&
          !isMuted(localGameState[team].units[zone.unitIndex])
        ) {
          console.log("Can Aegis");
          return true;
        }
      }
    }
    console.log("Cannot Aegis");
    return false;
  };

  const getZonesInRange = (cRow, cColumn, range, includeSelf) => {
    const zones = JSON.parse(localGameState.zones);
    let zonesInRange = [];

    for (let r = cRow - range; r <= cRow + range; r++) {
      if (r < 0) {
        r = 0;
      }

      if (r > 9) {
        break;
      } else {
        for (let c = cColumn - range; c <= cColumn + range; c++) {
          if (c < 0) {
            c = 0;
          }
          if (c > 4) {
            break;
          } else {
            zonesInRange.push(zones[r][c].id);
          }
        }
      }
    }

    if (!includeSelf) {
      zonesInRange = zonesInRange.filter((z) => z !== zones[cRow][cColumn].id);
    }

    return zonesInRange;
  };

  return {
    assignTactics,
    canAegis,
    drawAvelhem,
    drawSkill,
    getZonesInRange,
    rollTactic,
  };
};
