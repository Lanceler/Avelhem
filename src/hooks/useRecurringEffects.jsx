import React from "react";

import { useSelector, useDispatch } from "react-redux";
import gameState from "../redux/gameState";

export const useRecurringEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  //=========================================
  //Exported functions below

  const applyDamage = (
    newGameState,
    attackerInfo,
    victimInfo,
    type,
    special
  ) => {
    //Update arguments
    let attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    let newZoneInfo = JSON.parse(newGameState.zones);

    if (isMuted(attacker)) {
      return;
    }

    //checkBypassShield
    let bypassShield = false;
    if (victim.afflictions.frostbite && attacker.unitClass === "waterScion") {
      bypassShield = true;
    } else if (attacker.sharpness == 2) {
      bypassShield = true;
    } else if (special === "sowAndReapBlast") {
      bypassShield = true;
    }

    //calculate AP
    let aP = 1;
    if (["geomancy", "surge"].includes(special)) {
      aP = 2;
    } else {
      //check for AP modifiers
      if (attacker.temporary.galeConjuration) {
        aP = 2;
        delete newGameState[attacker.player].units[attacker.unitIndex].temporary
          .galeConjuration;
      }
      if (attacker.sharpness) {
        aP = aP + attacker.sharpness;
      }
      if (victim.temporary.adamantArmor) {
        aP = Math.max(0, aP - 1);
        delete newGameState[victim.player].units[victim.unitIndex].temporary
          .adamantArmor;
      }
      if (special === "Virtue-blast-blocked") {
        aP = Math.max(0, aP - 1);
      }
    }

    //reduce HP
    if (victim.enhancements.ward) {
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .ward;
    } else if (bypassShield && victim.enhancements.shield) {
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .shield;
      newGameState[victim.player].units[victim.unitIndex].hp = victim.hp - aP;
    } else if (victim.enhancements.shield) {
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .shield;
    } else {
      newGameState[victim.player].units[victim.unitIndex].hp = victim.hp - aP;
    }

    //survival or elimination
    if (newGameState[victim.player].units[victim.unitIndex].hp > 0) {
      console.log(`${victim.unitClass} - ${victim.unitIndex} survived.`);
      //to do: survival contingency
    } else {
      //grant BP
      if (victim.player === "guest") {
        newGameState.host.bountyPoints = Math.min(
          10,
          newGameState.host.bountyPoints + 1
        );
      } else {
        newGameState.guest.bountyPoints = Math.min(
          10,
          newGameState.guest.bountyPoints + 1
        );
      }

      //strike movement
      if (type === "strike") {
        //to do move
      }

      //elimination contingency
      //to do: trigger elimination contingency

      //elimination talents
      //to do: elimination talents

      //remove eliminated unit
      newGameState[victim.player].units[victim.unitIndex] = null;
      newZoneInfo[victim.row][victim.column].player = null;
      newZoneInfo[victim.row][victim.column].unitIndex = null;
      newGameState.zones = JSON.stringify(newZoneInfo);

      //Anathema-delay
      newGameState[attacker.player].units[
        attacker.unitIndex
      ].anathemaDelay = true;
    }
    return newGameState;
  };

  const assignTactics = (newGameState, first, second) => {
    newGameState.tactics = [first, second];

    return newGameState;
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

    //To do: Rooted and hand size?

    return false;
  };

  const decrementStatuses = (unit) => {
    unit.afflictions.anathema ? unit.afflictions.anathema-- : null;
    unit.afflictions.paralysis ? unit.afflictions.paralysis-- : null;
    unit.afflictions.frostbite ? unit.afflictions.frostbite-- : null;

    unit.enhancements.shield ? unit.enhancements.shield-- : null;
    unit.enhancements.ward ? unit.enhancements.ward-- : null;

    unit.enhancements.torrent ? unit.enhancements.torrent-- : null;
    unit.enhancements.disruption ? unit.enhancements.disruption-- : null;
    unit.enhancements.proliferation ? unit.enhancements.proliferation-- : null;

    unit.temporary = {};

    return unit;
  };

  const drawAvelhem = (newGameState) => {
    newGameState[self].avelhemHand.push(
      newGameState[self].avelhemRepertoire.pop()
    );

    //To do: If deck empties, shuffle discard pile into it.

    return newGameState;
  };

  const drawSkill = (newGameState) => {
    newGameState[self].skillHand.push(newGameState[self].skillRepertoire.pop());
    //To do: If deck empties, shuffle discard pile into it.

    return newGameState;
  };

  const endFinalPhase = (newGameState, player, enemy) => {
    //to do: discard Avelhems
    //to do: discard skills
    //to do: decrementBurn
    //to do: score

    newGameState.turnPhase = "Acquisition";
    newGameState.turnPlayer = enemy;
    newGameState.turnCount = newGameState.turnCount + 1;
    newGameState.tactics = [];

    newGameState.currentResolution.pop();
    newGameState.currentResolution.push({
      resolution: "Acquisition Phase Selection",
    });

    let playerUnits = newGameState[player].units;
    for (let i in playerUnits) {
      if (playerUnits[i] !== null) {
        playerUnits[i] = decrementStatuses(playerUnits[i]);
      }
    }
    newGameState[player].units = playerUnits;

    let enemyUnits = newGameState[enemy].units;
    for (let i in enemyUnits) {
      if (enemyUnits[i] !== null) {
        enemyUnits[i] = resetAdamantArmor(enemyUnits[i]);
      }
    }
    newGameState[enemy].units = enemyUnits;

    return newGameState;
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

  const getZonesWithEnemies = (unit, range) => {
    const zones = JSON.parse(localGameState.zones);

    let enemyPlayer = "";
    if (unit.player === "host") {
      enemyPlayer = "guest";
    } else if (unit.player === "guest") {
      enemyPlayer = "host";
    }

    let enemyZones = getZonesInRange(unit.row, unit.column, range, false);

    enemyZones = enemyZones.filter(
      (z) => zones[Math.floor(z / 5)][z % 5].player === enemyPlayer
    );

    return enemyZones;
  };

  const move = (newGameState, player, unitIndex, zoneId) => {
    let mover = newGameState[player].units[unitIndex];

    // let newZoneInfo = [...zones];
    let newZoneInfo = JSON.parse(newGameState.zones);

    //vacate current zone
    newZoneInfo[mover.row][mover.column].player = null;
    newZoneInfo[mover.row][mover.column].unitIndex = null;

    //enter new zone
    newZoneInfo[Math.floor(zoneId / 5)][zoneId % 5].player = mover.player;
    newZoneInfo[Math.floor(zoneId / 5)][zoneId % 5].unitIndex = mover.unitIndex;

    //stringify for firebase
    newGameState.zones = JSON.stringify(newZoneInfo);

    //update unit itself
    newGameState[player].units[unitIndex].row = Math.floor(zoneId / 5);
    newGameState[player].units[unitIndex].column = zoneId % 5;

    //pop "Moving Unit" resolution
    newGameState.currentResolution.pop();

    return newGameState;
  };

  const resetAdamantArmor = (unit) => {
    delete unit.temporary.usedAdamantArmor;

    return unit;
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

  const strike = (newGameState, selfIndex, enemyIndex, bypassTarget) => {
    const enemyUnit = newGameState[enemy].units[enemyIndex];

    if (newGameState[enemy].skillHand.length) {
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
            newGameState[enemy].skillHand.length > 1))
      ) {
        //prompt target contingent skill
      }
    }
  };

  const triggerTarget = (victim, type, bypassTarget) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (newGameState[victim.player.skillHand.length]) {
      if (
        ["strike", "virtue-blast", "paralyze"].includes(type) &&
        victim.unitClass === "metalScion" &&
        victim.virtue &&
        !victim.temporary.usedAdamantArmor
      ) {
        //prompt AdamantArmor
      } else {
        if (!bypassTarget) {
          if (
            (victim.unitClass === "lightningScion" && !isMuted(victim)) ||
            canAegis(victim) ||
            (victim.fever &&
              !isMuted(victim) &&
              newGameState[victim.player].skillHand >= 2)
          ) {
            //prompt contingentSkill
          }
        }
      }
    }
  };

  const virtueBlast = (newGameState, attacker, victim, bypassTarget) => {
    //pop "Selecting Unit" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Apply Damage",
      attacker: attacker,
      victim: victim,
      type: "blast",
    });

    if (victim.virtue && !isMuted(victim)) {
      newGameState.currentResolution.push({
        resolution: "Blocking Virtue-Blast",
        attacker: attacker,
        victim: victim,
      });
    }

    if (!bypassTarget) {
      //triggerTarget(attacker, victim, bypassTarget);
    }

    newGameState[attacker.player].units[attacker.unitIndex].virtue = false;

    return newGameState;
  };

  const virtueBlastNo = (newGameState) => {
    newGameState.currentResolution.pop();

    return newGameState;
  };

  const virtueBlastYes = (newGameState, attacker, victim) => {
    newGameState.currentResolution.pop();
    newGameState.currentResolution[
      newGameState.currentResolution.length - 1
    ].special = "Virtue-blast-blocked";

    newGameState[victim.player].units[victim.unitIndex].virtue = false;

    newGameState[attacker.player].units[attacker.unitIndex].virtue = true;

    return newGameState;
  };

  return {
    applyDamage,
    assignTactics,
    canAegis,
    canMove,
    drawAvelhem,
    drawSkill,
    endFinalPhase,
    getVacantAdjacentZones,
    getZonesInRange,
    getZonesWithEnemies,
    isMuted,
    move,
    rollTactic,
    virtueBlast,
    virtueBlastNo,
    virtueBlastYes,
  };
};
