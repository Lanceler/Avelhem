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

  const canAegis = (unit) => {
    const team = unit.player;
    const zones = JSON.parse(localGameState.zones);

    //get Adjacent zones
    let adjacentZones = getZonesInRange(unit.row, unit.column, 1, true);

    //return true if any zone contains an unmuted ally Mana Scion
    for (let i in adjacentZones) {
      let zone = zones[Math.floor(adjacentZones[i] / 5)][adjacentZones[i] % 5];
      if (zone.player === team) {
        if (
          localGameState[team].units[zone.unitIndex].unitClass ===
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

  const canMove = (unit) => {
    if (getVacantAdjacentZones(unit).length > 0) {
      return true;
    }

    return false;
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

  const move = (gamestate, zones, player, unitIndex, zoneId) => {
    let mover = gamestate[player].units[unitIndex];

    let newZoneInfo = [...zones];

    console.log(newZoneInfo);

    //vacate current zone
    newZoneInfo[mover.row][mover.column].player = null;
    newZoneInfo[mover.row][mover.column].unitIndex = null;

    //enter new zone
    newZoneInfo[Math.floor(zoneId / 5)][zoneId % 5].player = mover.player;
    newZoneInfo[Math.floor(zoneId / 5)][zoneId % 5].unitIndex = mover.unitIndex;

    //stringify for firebase
    gamestate.zones = JSON.stringify(newZoneInfo);

    //update unit itself
    gamestate[player].units[unitIndex].row = Math.floor(zoneId / 5);
    gamestate[player].units[unitIndex].column = zoneId % 5;

    //pop "Moving Unit" resolution
    gamestate.currentResolution.pop();

    return gamestate;
  };

  const rollTactic = (extraMobilize) => {
    const mobilizeLimit = 3 + extraMobilize;

    const dieFaces = [
      { face: "Advance", stock: 1 },
      { face: "Advance", stock: 1 },
      { face: "Mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "Mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "Assault", stock: 1 },
      { face: "Invoke", stock: 1 },
    ];

    return dieFaces[Math.floor(Math.random() * dieFaces.length)];
  };

  const strike = (gameState, selfIndex, enemyIndex, bypassTarget) => {
    const enemyUnit = gameState[enemy].units[enemyIndex];

    if (gameState[enemy].skillHand.length) {
      if (enemyUnit.unitClass === "metalScion" && !isMuted(enemyUnit)) {
        //prompt metal scion passive
      } else if (
        !bypassTarget &&
        //Thunder Thaumaturge
        ((enemyUnit.unitClass === "lightningScion" && !isMuted(enemyUnit)) ||
          //Aegis
          canAegis(enemyUnit) ||
          //Blaze of Glory
          (enemyUnit.fever &&
            !isMuted(enemyUnit) &&
            gameState[enemy].skillHand.length > 1))
      ) {
        //prompt target contingent skill
      }
    }
  };

  const isMuted = (unit) => {
    const afflictions = unit.afflictions;

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

  const getVacantAdjacentZones = (unit) => {
    const zones = JSON.parse(localGameState.zones);

    let adjacentZones = getZonesInRange(unit.row, unit.column, 1, false);

    adjacentZones = adjacentZones.filter(
      (z) => !zones[Math.floor(z / 5)][z % 5].player
    );

    return adjacentZones;
  };

  return {
    assignTactics,
    canAegis,
    canMove,
    drawAvelhem,
    drawSkill,
    move,
    getVacantAdjacentZones,
    getZonesInRange,
    rollTactic,
  };
};
