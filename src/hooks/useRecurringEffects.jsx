import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import gameState from "../redux/gameState";

export const useRecurringEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  //=========================================
  //Exported functions below

  const activateIgnitionPropulsion = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    let conclusion = "discard";
    if (unit.temporary.ambidexterity) {
      conclusion = "float";
      delete newGameState[unit.player].units[unit.unitIndex].temporary
        .ambidexterity;
    }

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "01-01",
      conclusion: conclusion,
    });

    newGameState.currentResolution.push({
      resolution: "Activating Ignition Propulsion",
      unit: unit,
    });

    newGameState.activatingSkill.push("01-01");
    newGameState.activatingUnit.push(unit);

    //animation delay
    newGameState.currentResolution.push({
      resolution: "Animation Delay",
    });

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
      });
    }

    return newGameState;
  };

  const activateSkill = (newGameState, unit, skill) => {
    switch (skill) {
      case "01-01":
        return activateIgnitionPropulsion(newGameState, unit);

      default:
        return false;
    }
  };

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

    //this can happen with effects like thunder thaumaturge
    if (isMuted(attacker)) {
      return;
      // to do: Maybe push a resolution that displays a message
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
    } else if (
      special === "Ignition Propulsion" &&
      victim.unitClass === "Fire Scion" &&
      !isMuted(victim)
    ) {
      aP = 0;
    } else {
      //check for AP modifiers
      if (attacker.temporary.galeConjuration) {
        aP = 2;
        delete newGameState[attacker.player].units[attacker.unitIndex].temporary
          .galeConjuration;
      }
      if (attacker.sharpness && type === "strike") {
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

      //remove eliminated unit
      newGameState[victim.player].units[victim.unitIndex] = null;
      newZoneInfo[victim.row][victim.column].player = null;
      newZoneInfo[victim.row][victim.column].unitIndex = null;
      newGameState.zones = JSON.stringify(newZoneInfo);

      //strike movement
      if (type === "strike") {
        //to do move

        // //vacate current zone
        // newZoneInfo[attacker.row][attacker.column].player = null;
        // newZoneInfo[attacker.row][attacker.column].unitIndex = null;

        // //enter new zone
        // newGameState[attacker.player].units[attacker.unitIndex].row =
        //   victim.row;
        // newGameState[attacker.player].units[attacker.unitIndex].column =
        //   victim.column;
        // newZoneInfo[victim.row][victim.column].player = attacker.player;
        // newZoneInfo[victim.row][victim.column].unitIndex = attacker.unitIndex;

        newGameState = move(
          newGameState,
          attacker.player,
          attacker.unitIndex,
          victim.row * 5 + victim.column
        );
      }

      //elimination contingency
      //to do: trigger elimination contingency

      //elimination talents
      //to do: elimination talents

      //Anathema-delay for non-pawns & non-ravagers
      if (
        newGameState[attacker.player].units[attacker.unitIndex].class !==
          "Pawn" ||
        !newGameState[attacker.player].units[attacker.unitIndex].enhancements
          .ravager
      )
        newGameState[attacker.player].units[
          attacker.unitIndex
        ].temporary.anathemaDelay = true;
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

  const canActivateSkill = (unit, skill) => {
    if (isMuted(unit)) {
      return false;
    }

    switch (skill) {
      case "01-01":
        return canIgnitionPropulsion(unit);

      case "01-02":
        return canConflagration(unit);

      case "01-03":
        return false;

      case "01-04":
        return true;

      default:
        return false;
    }
  };

  const canBlast = (unit) => {
    if (getZonesWithEnemies(unit, 1).length && !isMuted(unit)) {
      return true;
    }

    return false;
  };

  const canConflagration = (unit) => {
    if (!unit.fever) {
      return false;
    }

    if (!canBlast(unit)) {
      return false;
    }

    if (localGameState[self].skillHand.length < 2) {
      return false;
    }

    return true;
  };

  const canIgnitionPropulsion = (unit) => {
    if (!unit.fever) {
      return false;
    }

    if (!canMove(unit) && !canStrike(unit)) {
      return false;
    }

    if (localGameState[self].skillHand.length < 2) {
      return false;
    }

    return true;
  };

  const canMove = (unit) => {
    if (getVacantAdjacentZones(unit).length > 0) {
      return true;
    }

    return false;
  };

  const canStrike = (unit) => {
    if (
      getZonesWithEnemies(unit, 1).length &&
      !isMuted(unit) &&
      !unit.afflictions.root
    ) {
      return true;
    }

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
    //transfer card from deck to hand
    newGameState[self].avelhemHand.push(
      newGameState[self].avelhemRepertoire.pop()
    );

    //decrease floating count
    newGameState[self].avelhemFloat = Math.max(
      0,
      newGameState[self].avelhemFloat - 1
    );

    //To do: If deck empties, shuffle discard pile into it.

    return newGameState;
  };

  const drawSkill = (newGameState) => {
    //transfer card from deck to hand
    newGameState[self].skillHand.push(newGameState[self].skillRepertoire.pop());

    //decrease floating count
    newGameState[self].skillFloat = Math.max(
      0,
      newGameState[self].skillFloat - 1
    );

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

  const getScionSet = (unitClass) => {
    switch (unitClass) {
      case "Fire Scion":
        return ["01-01", "01-02", "01-03", "01-04"];
      case "Water Scion":
        return ["02-01", "02-02", "02-03", "02-04"];
      case "Wind Scion":
        return ["03-01", "03-02", "03-03", "03-04"];
      case "Land Scion":
        return ["04-01", "04-02", "04-03", "04-04"];
      case "Lightning Scion":
        return ["05-01", "05-02", "05-03", "05-04"];
      case "Mana Scion":
        return ["06-01", "06-02", "06-03", "06-04"];
      case "Metal Scion":
        return ["07-01", "07-02", "07-03", "07-04"];
      case "Plant Scion":
        return ["08-01", "08-02", "08-03", "08-04"];

      default:
        return;
    }
  };

  const getVacantAdjacentZones = (unit) => {
    const zones = JSON.parse(localGameState.zones);

    let adjacentZones = getZonesInRange(unit.row, unit.column, 1, false);

    adjacentZones = adjacentZones.filter(
      (z) => !zones[Math.floor(z / 5)][z % 5].player
    );

    return adjacentZones;
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

  const getZonesWithAllies = (unit, range, includeSelf) => {
    const zones = JSON.parse(localGameState.zones);

    const ally = unit.player;

    let allyZones = getZonesInRange(unit.row, unit.column, range, includeSelf);

    allyZones = allyZones.filter(
      (z) => zones[Math.floor(z / 5)][z % 5].player === ally
    );

    return allyZones;
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

  const isAdjacent = (unit1, unit2) => {
    if (unit1 == unit2) {
      return false;
    }

    if (
      Math.abs(unit1.row - unit2.row) <= 1 &&
      Math.abs(unit1.column - unit2.column) <= 1
    ) {
      return true;
    }

    return false;
  };

  const isMuted = (unit) => {
    const afflictions = unit.afflictions;

    if (
      unit.enhancements.score ||
      afflictions.anathema ||
      afflictions.paralysis ||
      afflictions.frostbite ||
      afflictions.infection
    ) {
      return true;
    }

    return false;
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
    if (
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution === "Moving Unit"
    ) {
      newGameState.currentResolution.pop();
    }

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

  const shuffleRepertoire = (repertoire) => {
    for (let i = repertoire.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [repertoire[i], repertoire[j]] = [repertoire[j], repertoire[i]];
    }
    return repertoire;
  };

  const strike = (newGameState, attacker, victim, special) => {
    //pop "Selecting Unit" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Apply Damage",
      attacker: attacker,
      victim: victim,
      special: special,
      type: "strike",
    });

    // if (!bypassTarget) {
    //   // to do: triggerTarget(attacker, victim, bypassTarget);
    // }

    newGameState[attacker.player].units[attacker.unitIndex].virtue = false;

    return newGameState;
  };

  const triggerScreech = (unit) => {
    const zones = JSON.parse(localGameState.zones);

    //if activator is Wind Scion or adjacent to an unmuted ally Wind Scion, Screech will not trigger
    const allyZones = getZonesWithAllies(unit, 1, true);

    console.log("allyZones");
    console.log(allyZones);

    for (let z of allyZones) {
      const unitIndex = zones[Math.floor(z / 5)][z % 5].unitIndex;

      if (
        localGameState[self].units[unitIndex].unitClass === "Wind Scion" &&
        !isMuted(localGameState[self].units[unitIndex])
      ) {
        return false;
      }
    }

    if (localGameState[enemy].skillHand.length) {
      const enemyZones = getZonesWithEnemies(unit, 2);
      for (let z of enemyZones) {
        const unitIndex = zones[Math.floor(z / 5)][z % 5].unitIndex;

        if (
          localGameState[enemy].units[unitIndex].unitClass === "Wind Scion" &&
          !isMuted(localGameState[enemy].units[unitIndex])
        ) {
          return true;
        }
      }
    }

    return false;
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
      //to do: triggerTarget(attacker, victim, bypassTarget);
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
    activateSkill,
    applyDamage,
    assignTactics,
    canActivateSkill,
    canAegis,
    canBlast,
    canMove,
    canStrike,
    drawAvelhem,
    drawSkill,
    endFinalPhase,
    getScionSet,
    getVacantAdjacentZones,
    getZonesInRange,
    getZonesWithEnemies,
    isMuted,
    move,
    rollTactic,
    shuffleRepertoire,
    strike,
    virtueBlast,
    virtueBlastNo,
    virtueBlastYes,
  };
};
