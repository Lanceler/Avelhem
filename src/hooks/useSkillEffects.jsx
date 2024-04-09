import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import gameState from "../redux/gameState";

import { useRecurringEffects } from "./useRecurringEffects";

export const useSkillEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const {
    blast,
    canMove,
    canStrike,
    drawSkill,
    getZonesWithAllies,
    getZonesWithEnemies,
    getZonesWithEnemiesAfflicted,
    isAdjacent,
    isMuted,
    isRooted,
    paralyze1,
    paralyze2,
  } = useRecurringEffects();

  const ignitionPropulsion1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Ignition Propulsion" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //consume unit's fever
    unit.fever -= 1;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Ignition Propulsion1",
      // resolution: "Ignition Propulsion1",
      unit: unit,
      details: {
        title: "Ignition Propulsion",
        reason: "Ignition Propulsion",
      },
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

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Conflagration1",
      // resolution: "Conflagration1",
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

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "May float resonant skill unit",
        unit: unit,
        player: unit.player,
        skill: "01-02",
        resonator: resonator,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "ConflagrationR1",
      // resolution: "ConflagrationR1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Conflagration1",
      // resolution: "Conflagration1",
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
        resolution: "Fire Skill",
        resolution2: "ConflagrationR2",
        // resolution: "ConflagrationR2",
        unit: unit,
        details: {
          reason: "Conflagration Ignite",
          title: "Conflagration",
          message: "You may ignite an adjacent enemy.",
          no: "Skip",
          yes: "Ignite",
        },
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

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Blaze of Glory2",
      // resolution: "Blaze of Glory2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Blaze of Glory1",
      // resolution: "Blaze of Glory1",
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
        resolution: "Fire Skill",
        resolution2: "Blaze of Glory3",
        // resolution: "Blaze of Glory3",
        unit: unit,
        details: {
          reason: "Blaze of Glory Draw",
          title: "Blaze of Glory",
          message: "You may spend 1 fever to draw 1 skill.",
          no: "Skip",
          yes: "Draw",
        },
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
      ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
      : (unit.enhancements.shield = 2);

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (
      getZonesWithEnemies(unit, 1).length &&
      newGameState[unit.player].skillHand.length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Fire Skill",
        resolution2: "Resplendence1",
        // resolution: "Resplendence1",
        unit: unit,
        details: {
          title: "Resplendence",
          message:
            "You may spend 1 skill to ignite an adjacent enemy for 1 turn.",
          restriction: null,
          reason: "Resplendence1",
        },
      });
    }

    return newGameState;
  };

  const purification1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Purification" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
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
        resolution: "Water Skill",
        resolution2: "Purification2",
        unit: unit,
        details: {
          title: "Purification",
          reason: "Purification",
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Purification1",
      unit: unit,
    });

    return newGameState;
  };

  const frigidBreath1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Frigid Breath" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Frigid Breath2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Frigid Breath1",
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
      newGameState[unit.player].skillHand.length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Water Skill",
        resolution2: "Frigid Breath3",
        unit: unit,
        reason: "Frigid Breath3",
        restriction: null,
        title: "Frigid Breath",
        message:
          "You may float 1 skill to freeze an adjacent enemy for 2 turns.",
      });
    }

    return newGameState;
  };

  const frigidBreathR1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Frigid Breath" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Retain resonant skill unit",
        unit: unit,
        player: unit.player,
        skill: "02-02",
        resonator: resonator,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Frigid BreathR1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Frigid Breath2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Frigid Breath1",
      unit: unit,
    });

    return newGameState;
  };

  const frigidBreathR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Frigid BreathR1"
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      getZonesWithEnemiesAfflicted(unit, 1, "frostbite").length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Water Skill",
        resolution2: "Frigid BreathR2",
        unit: unit,
        details: {
          reason: "Frigid Breath Blast",
          title: "Frigid Breath",
          message: "You may blast an adjacent frostbitten enemy.",
          no: "Skip",
          yes: "Blast",
        },
      });
    }

    return newGameState;
  };

  const healingRain1 = (unitInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //end "Activating Healing Rain" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //heal victim
    victim.hp = Math.max(2, victim.hp);
    victim.virtue = 1;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;
    newGameState[victimInfo.player].units[victimInfo.unitIndex] = victim;

    return newGameState;
  };

  const glacialTorrent1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Glacial Torrent" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //give unit ward and boosts
    unit.boosts.glacialTorrent = 2;

    unit.enhancements.ward
      ? (unit.enhancements.ward = Math.max(3, unit.enhancements.ward))
      : (unit.enhancements.ward = 3);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Glacial Torrent 1",
      unit: unit,
    });

    return newGameState;
  };

  const aerialImpetus1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Aerial Impetus" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    // newGameState.currentResolution.push({
    //   resolution: "Aerial Impetus1",
    //   unit: unit,
    // });

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Aerial Impetus1",
      // resolution: "Aerial Impetus1",
      unit: unit,
      details: {
        title: "Aerial Impetus",
        reason: "Aerial Impetus",
      },
    });

    return newGameState;
  };

  const aerialImpetus2E = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Aerial Impetus Purge" resolution
    newGameState.currentResolution.pop();

    if (!(unit.unitClass === "Wind Scion" && !isMuted(unit))) {
      unit.virtue = 0;
      delete unit.enhancements.shield;
      newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

      if (canMove(unit)) {
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Aerial Impetus Purge Move",
          player: self,
          unit: unit,
          details: {
            reason: "Aerial Impetus Purge Move",
            title: "Aerial Impetus",
            message: "You may force them to move to an adjacent zone.",
            no: "Skip",
            yes: "Move",
          },
        });
      }
    }

    return newGameState;
  };

  const galeConjuration1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Gale Conjuration" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.boosts.galeConjuration = true;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (newGameState[unit.player].skillHand.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Gale Conjuration1",
        unit: unit,
        title: "Gale Conjuration",
        message: "You may float 1 skill to restore your Virtue.",
        restriction: null,
        reason: "Gale Conjuration1",
      });
    }

    return newGameState;
  };

  const galeConjurationR1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Resonating Gale Conjuration" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.boosts.galeConjuration = true;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "May float resonant skill unit",
        unit: unit,
        player: unit.player,
        skill: "03-02",
        resonator: resonator,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Gale ConjurationR1",
      unit: unit,
    });

    if (newGameState[unit.player].skillHand.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Gale Conjuration1",
        unit: unit,
        title: "Gale Conjuration",
        message: "You may float 1 skill to restore your Virtue.",
        restriction: null,
        reason: "Gale Conjuration1",
      });
    }

    return newGameState;
  };

  const galeConjurationR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    // end "Gale ConjurationR1"
    newGameState.currentResolution.pop();

    if (canStrike(unit)) {
      // newGameState.currentResolution.push({
      //   resolution: "Wind Skill",
      //   resolution2: "Gale ConjurationR3",
      //   unit: unit,
      // });

      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Gale ConjurationR2",
        unit: unit,
        details: {
          reason: "Gale Conjuration Strike",
          title: "Gale Conjuration",
          message: "You may strike.",
          no: "Skip",
          yes: "Strike",
        },
      });
    }

    return newGameState;
  };

  const galeConjurationR3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    // end "Gale ConjurationR3"
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      newGameState[enemy].skillHand.length > 0 &&
      unit.temporary.galeConjurationLethal
    ) {
      newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Gale ConjurationR4",
        player: enemy,
      });
    }

    delete unit.temporary.galeConjurationLethal;
    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    return newGameState;
  };

  const symphonicScreech1 = (unitInfo, victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Symphonic Screech" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

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
        resolution: "Wind Skill",
        resolution2: "Symphonic Screech2",
        unit: unit,
        details: {
          title: "Symphonic Screech",
          message: "You may reveal 1 Wind skill to draw a floating skill.",
          restriction: ["03-01", "03-02", "03-03", "03-04"],
          reason: "Symphonic Screech",
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Symphonic Screech Negate",
      player: victim.player,
      canFloat: !isAdjacent(unit, victim),
    });

    return newGameState;
  };

  const cataclysmicTempest1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Cataclysmic Tempest" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;
    unit.temporary.cataclysmicFloat = 0;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    //2. Continue
    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Cataclysmic Tempest2",
      unit: unit,
    });

    //1. Paralyze 1st enemy
    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Cataclysmic Tempest1",
      unit: unit,
    });

    return newGameState;
  };

  const cataclysmicTempest2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Cataclysmic Tempest2" resolution
    newGameState.currentResolution.pop();

    let adjacentEnemies = getZonesWithEnemies(unit, 1);
    adjacentEnemies = adjacentEnemies.filter(
      (z) =>
        zones[Math.floor(z / 5)][z % 5].unitIndex !==
        unit.temporary.previousTarget
    );

    if (unit !== null && !isMuted(unit)) {
      //4. Continue
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Cataclysmic Tempest4",
        unit: unit,
      });

      if (adjacentEnemies.length > 0) {
        //3. Paralyze 2nd enemy
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Cataclysmic Tempest3",
          unit: unit,
          details: {
            reason: "Cataclysmic Tempest 2nd Paralyze",
            title: "Cataclysmic Tempest",
            message: "You may paralyze another adjacent enemy for 2 turns.",
            no: "Skip",
            yes: "Paralyze",
            adjacentEnemies: adjacentEnemies,
          },
        });
      }
    }

    return newGameState;
  };

  const cataclysmicTempest3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Cataclysmic Tempest3" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
      //6. Continue
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Cataclysmic Tempest5",
        unit: unit,
      });

      if (
        unit.temporary.cataclysmicFloat > 0 &&
        newGameState[enemy].skillHand.length > 0
      ) {
        //5. Force enemy to float
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Cataclysmic Tempest Float",
          floatCount: unit.temporary.cataclysmicFloat,
          player: enemy,
        });
      }
    }

    return newGameState;
  };

  const cataclysmicTempest4 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Cataclysmic Tempest5"
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      getZonesWithEnemies(unit, 1).length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Cataclysmic Tempest7",

        unit: unit,
      });

      if (getZonesWithEnemiesAfflicted(unit, 1, "paralysis").length > 0) {
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Cataclysmic Tempest6",
          unit: unit,
          details: {
            reason: "Cataclysmic Tempest Blast",
            title: "Cataclysmic Tempest",
            message: "You may blast an adjacent paralyzed enemy.",
            no: "Skip",
            yes: "Blast",
            adjacentEnemies: getZonesWithEnemiesAfflicted(unit, 1, "paralysis"),
          },
        });
      }
    }

    return newGameState;
  };

  const cataclysmicTempest5 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Cataclysmic Tempest7" resolution
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      getZonesWithEnemies(unit, 1).length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Cataclysmic Tempest8",
        unit: unit,
        details: {
          title: "Cataclysmic Tempest",
          message: "You may spend 1 Wind skill to blast an adjacent enemy.",
          restriction: ["03-01", "03-02", "03-03"],
          reason: "Cataclysmic Tempest8",
        },
      });
    }

    return newGameState;
  };

  const crystallization1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Crystallization" resolution
    newGameState.currentResolution.pop();

    //raise hp to 2 (consider fact that Land Scion HP can reach 3)
    unit.hp = Math.max(2, unit.hp);

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (newGameState[unit.player].skillHand.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Land Skill",
        resolution2: "Crystallization1",
        unit: unit,
        details: {
          title: "Crystallization",
          message: "You may spend 1 skill to gain shield for 2 turns.",
          restriction: null,
          reason: "Crystallization1",
        },
      });
    }

    return newGameState;
  };

  const crystallization2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Crystallization2" resolution
    newGameState.currentResolution.pop();

    //grant shield

    unit.enhancements.shield
      ? (unit.enhancements.shield = Math.max(unit.enhancements.shield, 2))
      : (unit.enhancements.shield = 2);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    return newGameState;
  };

  const upheaval1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Upheaval" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    //2. Continue
    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Upheaval2",
      unit: unit,
    });

    //1. Paralyze 1st enemy
    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Upheaval1",
      unit: unit,
    });

    return newGameState;
  };

  const upheaval2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Upheaval2" resolution
    newGameState.currentResolution.pop();

    let adjacentEnemies = getZonesWithEnemies(unit, 1);
    adjacentEnemies = adjacentEnemies.filter(
      (z) =>
        zones[Math.floor(z / 5)][z % 5].unitIndex !==
        unit.temporary.previousTarget
    );

    if (unit !== null && !isMuted(unit)) {
      if (adjacentEnemies.length > 0) {
        //3. Paralyze 2nd enemy
        newGameState.currentResolution.push({
          resolution: "Land Skill",
          resolution2: "Upheaval3",
          unit: unit,
          details: {
            reason: "Upheaval 2nd Paralyze",
            title: "Upheaval",
            message: "You may paralyze another adjacent enemy for 1 turn.",
            no: "Skip",
            yes: "Paralyze",
            adjacentEnemies: adjacentEnemies,
          },
        });
      }
    }

    return newGameState;
  };

  const upheavalR1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Resonating Upheaval" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "May float resonant skill unit",
        unit: unit,
        player: unit.player,
        skill: "04-02",
        resonator: resonator,
      });
    }

    delete unit.temporary.previousTarget;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    //3. Resonance
    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "UpheavalR1",
      unit: unit,
    });

    //2. Continue
    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Upheaval2",
      unit: unit,
    });

    //1. Paralyze 1st enemy
    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Upheaval1",
      unit: unit,
    });

    return newGameState;
  };

  const upheavalR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "UpheavalR1" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
      //6. Continue
      newGameState.currentResolution.push({
        resolution: "Land Skill",
        resolution2: "UpheavalR2",
        unit: unit,
        details: {
          title: "Upheaval",
          reason: "Upheaval",
        },
      });
    }

    return newGameState;
  };

  const pitfallTrap1 = (unitInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //end "Activating Pitfall Trap" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Pitfall Trap1",
      unit: unit,
      victim: victim,
    });

    newGameState = paralyze1(newGameState, unit, victim, "Pitfall Trap");

    return newGameState;
  };

  const pitfallTrap2 = (attackerInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //end "Pitfall Trap1" resolution
    newGameState.currentResolution.pop();

    if (attacker.temporary.pitfallTrapBlast === true) {
      delete attacker.temporary.pitfallTrapBlast;
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex] =
        attacker;

      newGameState.currentResolution.push({
        resolution: "Land Skill",
        resolution2: "Pitfall Trap2",
        unit: attacker,
        victim: victim,
        details: {
          title: "Pitfall Trap",
          message:
            "The affliction succeeded. You may spend 1 skill to blast them.",
          restriction: null,
          reason: "Pitfall Trap",
        },
      });
    }

    return newGameState;
  };

  const pitfallTrap3 = (attackerInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //end "Pitfall Trap3" resolution
    newGameState.currentResolution.pop();

    newGameState = blast(newGameState, attacker, victim, null);

    return newGameState;
  };

  const geomancy1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Geomancy" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    //Strike
    if (canStrike(unit)) {
      //Continue -> Paralyze adjacent if lethal
      newGameState.currentResolution.push({
        resolution: "Land Skill",
        resolution2: "Geomancy3",
        unit: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Land Skill",
        resolution2: "Geomancy2",
        unit: unit,
        details: {
          reason: "Geomancy Strike",
          title: "Geomancy",
          message: "You may strike (2 AP).",
          no: "Skip",
          yes: "Strike",
        },
      });
    }

    //Choose: HP or recover
    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Geomancy1",
      unit: unit,
      details: {
        title: "Geomancy",
        reason: "Geomancy",
      },
    });

    return newGameState;
  };

  const geomancy2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    // end "Geomancy3"
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      getZonesWithEnemies(unit, 1).length > 0 &&
      unit.temporary.geomancyLethal
    ) {
      newGameState.currentResolution.push({
        resolution: "Land Skill",
        resolution2: "Geomancy4",
        unit: unit,
        details: {
          reason: "Geomancy Paralyze",
          title: "Geomancy",
          message: "You may paralyze an adjacent enemy for 2 turns.",
          no: "Skip",
          yes: "Paralyze",
        },
      });
    }

    delete unit.temporary.geomancyLethal;
    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    return newGameState;
  };

  const chainLightning1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Chain Lightning" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Chain Lightning2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Chain Lightning1",
      unit: unit,
    });

    return newGameState;
  };

  const chainLightning2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    let victim = newGameState[enemy].units[unit.temporary.previousTarget];

    //end "Chain Lightning2" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit) && unit.charge > 0) {
      //allies of victim
      let adjacentEnemies = getZonesWithAllies(victim, 1);

      if (adjacentEnemies.length > 0) {
        newGameState.currentResolution.push({
          resolution: "Lightning Skill",
          resolution2: "Chain Lightning3",
          unit: unit,
          details: {
            reason: "Chain Lightning Blast",
            title: "Chain Lightning",
            message:
              "You may spend 1 Charge to blast an enemy adjacent to the previous one.",
            no: "Skip",
            yes: "Blast",
            adjacentEnemies: adjacentEnemies,
          },
        });
      }
    }

    return newGameState;
  };

  const chainLightning3 = (unitInfo, adjacentEnemies) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Chain Lightning4" resolution
    newGameState.currentResolution.pop();

    //consume charge
    unit.charge -= 1;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Chain Lightning5",
      unit: unit,
      adjacentEnemies: adjacentEnemies,
    });

    return newGameState;
  };

  const zipAndZap1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Zip and Zap" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //use 2 charges if not resonating
    unit.charge -= 2;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Zip And Zap2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Zip And Zap1",
      unit: unit,
    });

    return newGameState;
  };

  const zipAndZap2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Zip And Zap2" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit) && unit.charge > 0) {
      newGameState.currentResolution.push({
        resolution: "Lightning Skill",
        resolution2: "Zip And Zap3",
        unit: unit,
        details: {
          reason: "Zip and Zap Shield",
          title: "Zip and Zap",
          message: "You may spend 1 Charge to gain Shield for 2 turns.",
          no: "Skip",
          yes: "Shield",
        },
      });
    }

    return newGameState;
  };

  const zipAndZapR1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Resonating Zip and Zap" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "May float resonant skill unit",
        unit: unit,
        player: unit.player,
        skill: "05-02",
        resonator: resonator,
      });
    }

    //use 1 charge if resonating
    unit.charge -= 1;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    //3. Resonance
    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Zip And ZapR1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Zip And Zap2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Zip And Zap1",
      unit: unit,
    });

    return newGameState;
  };

  const zipAndZapR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Zip And ZapR1" resolution
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      getZonesWithEnemies(unit, 1).length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Lightning Skill",
        resolution2: "Zip And ZapR2",
        unit: unit,
        details: {
          reason: "Zip and Zap Blast",
          title: "Zip and Zap",
          message: "You may blast an adjacent enemy.",
          no: "Skip",
          yes: "Blast",
        },
      });
    }

    return newGameState;
  };

  const thunderThaumaturge1 = (unitInfo, attackerInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    let attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];

    //end "Activating Thunder Thaumaturge" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //consume charge
    unit.charge -= 1;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Thunder Thaumaturge1",
      unit: unit,
    });

    newGameState = paralyze1(
      newGameState,
      unit,
      attacker,
      "Thunder Thaumaturge"
    );

    return newGameState;
  };

  const thunderThaumaturge2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Thunder Thaumaturge1" resolution
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      newGameState[unit.player].skillHand.length > 0 &&
      ["05-01", "05-02", "05-04"].some((s) =>
        localGameState[unit.player].skillVestige.includes(s)
      )
    ) {
      newGameState.currentResolution.push({
        resolution: "Lightning Skill",
        resolution2: "Thunder Thaumaturge2",
        unit: unit,
        details: {
          title: "Thunder Thaumaturge",
          message:
            "You may spend 1 skill to recover 1 Lightning skill other than “Thunder Thaumaturge”.",
          restriction: null,
          reason: "Thunder Thaumaturge",
        },
      });
    }

    return newGameState;
  };

  const valiantSpark1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Valiant Spark" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (unit.charge === 3) {
      newGameState = drawSkill(newGameState);
      newGameState = drawSkill(newGameState);
      newGameState = drawSkill(newGameState);
    } else {
      unit.charge = 3;
    }

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (newGameState[unit.player].skillHand.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Lightning Skill",
        resolution2: "Valiant Spark1",
        unit: unit,
        details: {
          title: "Valiant Spark",
          message:
            "You may reveal 1 Lightning skill to gain a boost: You can activate “Arc Flash” without using a tactic.",
          restriction: ["05-01", "05-02", "05-03"],
          reason: "Valiant Spark",
        },
      });
    }

    return newGameState;
  };

  const surge1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Surge" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Surge1",
      unit: unit,
      details: {
        title: "Surge",
        message: "Use an Assault tactic to restore your Virtue.",
        restriction: ["Assault"],
        stock: 1,
        reason: "Surge",
        canSkip: false,
      },
    });

    return newGameState;
  };

  const diffusion1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Diffusion" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Diffusion1",
      unit: unit,
      details: {
        title: "Diffusion",
        message:
          "Use an Assault or Invoke tactic to blast 1 or 2 adjacent enemies.",
        restriction: ["Assault", "Invoke"],
        stock: 1,
        reason: "Diffusion",
        canSkip: false,
      },
    });

    return newGameState;
  };

  const diffusion2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Diffusion3" resolution
    newGameState.currentResolution.pop();

    let adjacentEnemies = getZonesWithEnemies(unit, 1);
    adjacentEnemies = adjacentEnemies.filter(
      (z) =>
        zones[Math.floor(z / 5)][z % 5].unitIndex !==
        unit.temporary.previousTarget
    );

    if (unit !== null && !isMuted(unit)) {
      if (adjacentEnemies.length > 0) {
        //3. Blast 2nd enemy
        newGameState.currentResolution.push({
          resolution: "Mana Skill",
          resolution2: "Diffusion4",
          unit: unit,
          details: {
            reason: "Diffusion 2nd Blast",
            title: "Diffusion",
            message: "You may blast another adjacent enemy.",
            no: "Skip",
            yes: "Blast",
            adjacentEnemies: adjacentEnemies,
          },
        });
      }
    }

    return newGameState;
  };

  const diffusionR1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Resonating Diffusion" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "May float resonant skill unit",
        unit: unit,
        player: unit.player,
        skill: "06-02",
        resonator: resonator,
      });
    }

    delete unit.temporary.previousTarget;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    //2. Resonance
    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "DiffusionR1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Diffusion1",
      unit: unit,
      details: {
        title: "Diffusion",
        message:
          "Use an Assault, Invoke, or Advance tactic to blast 1 or 2 adjacent enemies.",
        restriction: ["Assault", "Invoke", "Advance"],
        stock: 1,
        reason: "Diffusion",
        canSkip: false,
      },
    });
    return newGameState;
  };

  const diffusionR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "DiffusionR1" resolution
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      newGameState[unit.player].skillHand.length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Mana Skill",
        resolution2: "DiffusionR2",
        unit: unit,
        details: {
          title: "Diffusion",
          message: "You may spend 1 skill to gain Shield for 3 turns.",
          restriction: null,
          reason: "Diffusion Shield",
        },
      });
    }

    return newGameState;
  };

  const diffusionR3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "DiffusionR3" resolution
    newGameState.currentResolution.pop();

    unit.enhancements.shield
      ? (unit.enhancements.shield = Math.max(3, unit.enhancements.shield))
      : (unit.enhancements.shield = 3);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    return newGameState;
  };

  const aegis1 = (unitInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //end "Activating Aegis" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;
    newGameState[victimInfo.player].units[victimInfo.unitIndex] = victim;

    if (unit.unitIndex === victim.unitIndex) {
      newGameState = drawSkill(newGameState);
    }

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Aegis1",
      unit: unit,
      victim: victim,
      details: {
        title: "Aegis",
        reason: "Aegis",
      },
    });

    return newGameState;
  };

  const disruptionField1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Disruption Field" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.enhancements.shield
      ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
      : (unit.enhancements.shield = 2);

    unit.enhancements.disruption = 2;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    let enemyZones = getZonesWithEnemies(unit, 1);

    for (let i of enemyZones) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const enemy = newGameState[zone.player].units[zone.unitIndex];

      delete enemy.enhancements.disruption;
      delete enemy.enhancements.shield;
      delete enemy.enhancements.ward;

      newGameState[zone.player].units[zone.unitIndex] = enemy;
    }

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 skill.",
      restriction: null,
    });

    return newGameState;
  };

  const magneticShockwave1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Magnetic Shockwave" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (unit.sharpness > 1) {
      newGameState.currentResolution.push({
        resolution: "Metal Skill",
        resolution2: "Magnetic Shockwave3",
        unit: unit,
      });
    }

    if (unit.sharpness > 0) {
      newGameState.currentResolution.push({
        resolution: "Metal Skill",
        resolution2: "Magnetic Shockwave2",
        unit: unit,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Magnetic Shockwave1",
      unit: unit,
    });

    return newGameState;
  };

  const magneticShockwave2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Magnetic Shockwave2" resolution
    newGameState.currentResolution.pop();

    let adjacentEnemies = getZonesWithEnemies(unit, 1);
    adjacentEnemies = adjacentEnemies.filter(
      (z) =>
        zones[Math.floor(z / 5)][z % 5].unitIndex !==
        unit.temporary.previousTarget
    );

    if (unit !== null && !isMuted(unit)) {
      if (adjacentEnemies.length > 0) {
        //Paralyze 2nd enemy
        newGameState.currentResolution.push({
          resolution: "Metal Skill",
          resolution2: "Magnetic Shockwave2.1",
          unit: unit,
          details: {
            reason: "Magnetic Shockwave 2nd Paralyze",
            title: "Magnetic Shockwave",
            message: "You may paralyze another adjacent enemy for 1 turn.",
            no: "Skip",
            yes: "Paralyze",
            adjacentEnemies: adjacentEnemies,
          },
        });
      }
    }

    return newGameState;
  };

  const magneticShockwave3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Magnetic Shockwave3" resolution
    newGameState.currentResolution.pop();

    let adjacentEnemies = getZonesWithEnemiesAfflicted(unit, 1, "paralysis");

    if (unit !== null && !isMuted(unit) && adjacentEnemies.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Metal Skill",
        resolution2: "Magnetic Shockwave3.1",
        unit: unit,
        details: {
          reason: "Magnetic Shockwave Blast",
          title: "Magnetic Shockwave",
          message: "You may blast an adjacent paralyzed enemy.",
          no: "Skip",
          yes: "Blast",
          adjacentEnemies: adjacentEnemies,
        },
      });
    }

    return newGameState;
  };

  const reinforce1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Reinforce" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Reinforce1",
      unit: unit,
      details: {
        title: "Reinforce",
        reason: "Reinforce",
      },
    });

    return newGameState;
  };

  const reinforceR1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Resonating Reinforce" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Retain resonant skill unit",
        unit: unit,
        player: unit.player,
        skill: "07-02",
        resonator: resonator,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Reinforce1",
      unit: unit,
      details: {
        title: "Reinforce",
        reason: "Reinforce",
      },
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Reinforce1",
      unit: unit,
      details: {
        title: "Reinforce",
        reason: "Reinforce",
      },
    });

    return newGameState;
  };

  const frenzyBlade1 = (unitInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Frenzy Blade" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.sharpness
      ? (unit.sharpness = Math.min(2, unit.sharpness + 1))
      : (unit.sharpness = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Frenzy Blade2",
      unit: unit,
      details: {
        title: "Frenzy Blade",
        reason: "Frenzy Blade2",
        victim: victimInfo,
      },
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Frenzy Blade1",
      unit: unit,
      details: {
        title: "Frenzy Blade",
        reason: "Frenzy Blade1",
      },
    });

    return newGameState;
  };

  const frenzyBlade2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Frenzy Blade1.5" resolution
    newGameState.currentResolution.pop();

    unit.enhancements.shield
      ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
      : (unit.enhancements.shield = 2);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    return newGameState;
  };

  const arsenalOnslaught1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Arsenal Onslaught" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Arsenal Onslaught2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Arsenal Onslaught1",
      unit: unit,
    });

    return newGameState;
  };

  const arsenalOnslaught2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Arsenal Onslaught2" resolution
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      getZonesWithEnemies(unit, 1).length > 0 &&
      newGameState[unit.player].skillHand.length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Metal Skill",
        resolution2: "Arsenal Onslaught4",
        unit: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Metal Skill",
        resolution2: "Arsenal Onslaught3",
        unit: unit,
        details: {
          title: "Arsenal Onslaught",
          message:
            "You may reveal 1 Metal skill to paralyze an adjacent enemy for 1 turn.",
          restriction: ["07-01", "07-02", "07-03"],
          reason: "Arsenal Onslaught Paralyze",
        },
      });
    }

    return newGameState;
  };

  const arsenalOnslaught3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Arsenal Onslaught4" resolution
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      getZonesWithEnemies(unit, 1).length > 0 &&
      newGameState[unit.player].skillHand.length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Metal Skill",
        resolution2: "Arsenal Onslaught5",
        unit: unit,
        details: {
          title: "Arsenal Onslaught",
          message:
            "You may spend 1 skill to strike or blast an adjacent enemy.",
          restriction: null,
          reason: "Arsenal Onslaught Attack",
        },
      });
    }

    return newGameState;
  };

  const sowAndReap1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Sow And Reap" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Sow and Reap2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Sow and Reap1",
      unit: unit,
      details: {
        title: "Sow and Reap",
        reason: "Sow and Reap",
      },
    });

    return newGameState;
  };

  const sowAndReap2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Sow and Reap2" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
      unit.blossom
        ? (unit.blossom = Math.min(3, unit.blossom + 1))
        : (unit.blossom = 1);
    }

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    return newGameState;
  };

  const efflorescence1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Efflorescence" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (!unit.afflictions.burn) {
      //burn would otherwise instantly purge overgrowth
      unit.enhancements.overgrowth = true;
    }

    unit.blossom
      ? (unit.blossom = Math.min(3, unit.blossom + 2))
      : (unit.blossom = 2);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (
      ["08-01", "08-03", "08-04"].some((s) =>
        newGameState[unit.player].skillVestige.includes(s)
      )
    ) {
      newGameState.currentResolution.push({
        resolution: "Plant Skill",
        resolution2: "Efflorescence1",
        unit: unit,
        details: {
          title: "Efflorescence",
          message:
            "You may spend 2 skills to recover then float 1 Plant skill other than “Efflorescence”. Select 1st skill.",
          restriction: null,
          reason: "Efflorescence1",
        },
      });
    }

    return newGameState;
  };

  const efflorescenceR1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Resonating Efflorescence" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Retain resonant skill unit",
        unit: unit,
        player: unit.player,
        skill: "08-02",
        resonator: resonator,
      });
    }

    if (!unit.afflictions.burn) {
      //burn would otherwise instantly purge overgrowth
      unit.enhancements.overgrowth = true;
    }

    unit.blossom
      ? (unit.blossom = Math.min(3, unit.blossom + 2))
      : (unit.blossom = 2);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "EfflorescenceR1",
      unit: unit,
    });

    if (
      ["08-01", "08-03", "08-04"].some((s) =>
        newGameState[unit.player].skillVestige.includes(s)
      )
    ) {
      newGameState.currentResolution.push({
        resolution: "Plant Skill",
        resolution2: "Efflorescence1",
        unit: unit,
        details: {
          title: "Efflorescence",
          message:
            "You may spend 2 skills to recover then float 1 Plant skill other than “Efflorescence”. Select 1st skill.",
          restriction: null,
          reason: "Efflorescence1",
        },
      });
    }

    return newGameState;
  };

  const efflorescenceR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "EfflorescenceR1" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
      unit.hp = 2;
    }

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    return newGameState;
  };

  const viridianGrave1 = (unitInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //DO NOT UPDATE victim (we are using their information right before they were eliminated
    //let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //end "Activating Viridian Grave" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.blossom = 3;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (isRooted(victimInfo)) {
      newGameState = drawSkill(newGameState);
      newGameState = drawSkill(newGameState);
    }

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Viridian Grave1",
      unit: unit,
      details: {
        title: "Viridian Grave",
        message: "You may spend 1 skill to gain Shield for 3 turns.",
        restriction: null,
        reason: "Viridian Grave",
      },
    });

    return newGameState;
  };

  const castleOfThorns1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Castle of Thorns" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (!unit.afflictions.burn) {
      //burn would otherwise instantly purge overgrowth
      unit.enhancements.overgrowth = true;
      unit.enhancements.proliferation = 3;
    }

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Castle Of Thorns1",
      unit: unit,
      details: {
        title: "Castle of Thorns",
        message: "You may spend 1 skill to draw 2 skills",
        restriction: null,
        reason: "Castle of Thorns",
      },
    });

    return newGameState;
  };

  //end of list

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
    frigidBreathR1,
    frigidBreathR2,
    healingRain1,
    glacialTorrent1,
    aerialImpetus1,
    aerialImpetus2E,
    galeConjuration1,
    galeConjurationR1,
    galeConjurationR2,
    galeConjurationR3,
    symphonicScreech1,
    cataclysmicTempest1,
    cataclysmicTempest2,
    cataclysmicTempest3,
    cataclysmicTempest4,
    cataclysmicTempest5,
    crystallization1,
    crystallization2,
    upheaval1,
    upheaval2,
    upheavalR1,
    upheavalR2,
    pitfallTrap1,
    pitfallTrap2,
    pitfallTrap3,
    geomancy1,
    geomancy2,
    chainLightning1,
    chainLightning2,
    chainLightning3,
    zipAndZap1,
    zipAndZap2,
    zipAndZapR1,
    zipAndZapR2,
    thunderThaumaturge1,
    thunderThaumaturge2,
    valiantSpark1,
    surge1,
    diffusion1,
    diffusion2,
    diffusionR1,
    diffusionR2,
    diffusionR3,
    aegis1,
    disruptionField1,
    magneticShockwave1,
    magneticShockwave2,
    magneticShockwave3,
    reinforce1,
    reinforceR1,
    frenzyBlade1,
    frenzyBlade2,
    arsenalOnslaught1,
    arsenalOnslaught2,
    arsenalOnslaught3,
    sowAndReap1,
    sowAndReap2,
    efflorescence1,
    efflorescenceR1,
    efflorescenceR2,
    viridianGrave1,
    castleOfThorns1,
  };
};
