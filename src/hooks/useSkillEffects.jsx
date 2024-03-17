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
    getZonesWithAllies,
    getZonesWithEnemies,
    getZonesWithEnemiesAfflicted,
    isAdjacent,
    isMuted,
    paralyze1,
    paralyze2,
  } = useRecurringEffects();

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
        resolution: "Blaze of Glory3",
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
        resolution: "Resplendence1",
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

  const frigidBreathR1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Frigid Breath" resolution
    newGameState.currentResolution.pop();

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "Retain resonant skill",
        unit: unit,
        player: unit.player,
        skill: "02-02",
        resonator: resonator,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Frigid BreathR1",
      unit: unit,
    });

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
        resolution: "Frigid BreathR2",
        unit: unit,
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
      ? (unit.temporary.activation = unit.activation + 1)
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

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    //give unit ward and boosts
    unit.boosts.glacialTorrent = 2;

    if (unit.enhancements.ward > 0) {
      unit.enhancements.ward = Math.max(unit.enhancements.ward, 3);
    } else {
      unit.enhancements.ward = 3;
    }

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Glacial Torrent 1",
      unit: unit,
    });

    return newGameState;
  };

  const aerialImpetus1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Aerial Impetus" resolution
    newGameState.currentResolution.pop();

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Aerial Impetus1",
      unit: unit,
    });

    return newGameState;
  };

  const aerialImpetus2E = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Aerial Impetus Purge" resolution
    newGameState.currentResolution.pop();

    if (!(unit.unitClass === "Wind Scion" && !isMuted(unit))) {
      unit.virtue = false;
      delete unit.enhancements.shield;
      newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

      if (canMove(unit)) {
        // newGameState.currentResolution.push({
        //   resolution: "Aerial Impetus Purge Move",
        //   player: self,
        //   victim: unit,
        // });

        newGameState.currentResolution.push({
          resolution: "Aerial Impetus Purge Move",
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

    unit.boosts.galeConjuration = true;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (newGameState[self].skillHand.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Gale Conjuration1",
        unit: unit,
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
        skill: "03-02",
        resonator: resonator,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Gale ConjurationR1",
      unit: unit,
    });

    unit.boosts.galeConjuration = true;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (newGameState[self].skillHand.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Gale Conjuration1",
        unit: unit,
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
      newGameState.currentResolution.push({
        resolution: "Gale ConjurationR3",
        unit: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Gale ConjurationR2",
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
        resolution: "Gale ConjurationR4",
        enemy: enemy,
      });
    }

    delete unit.temporary.galeConjurationLethal;
    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

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

  const cataclysmicTempest1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Cataclysmic Tempest" resolution
    newGameState.currentResolution.pop();

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;
    unit.temporary.cataclysmicFloat = 0;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    //2. Continue
    newGameState.currentResolution.push({
      resolution: "Cataclysmic Tempest2",
      unit: unit,
    });

    //1. Paralyze 1st enemy
    newGameState.currentResolution.push({
      resolution: "Cataclysmic Tempest1",
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
        resolution: "Cataclysmic Tempest4",
        unit: unit,
      });

      if (adjacentEnemies.length > 0) {
        //3. Paralyze 2nd enemy
        newGameState.currentResolution.push({
          resolution: "Cataclysmic Tempest3",
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
        resolution: "Cataclysmic Tempest5",
        unit: unit,
      });

      if (
        unit.temporary.cataclysmicFloat > 0 &&
        newGameState[enemy].skillHand.length > 0
      ) {
        //5. Force enemy to float
        newGameState.currentResolution.push({
          resolution: "Cataclysmic Tempest Float",
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
        resolution: "Cataclysmic Tempest7",
        unit: unit,
      });

      if (getZonesWithEnemiesAfflicted(unit, 1, "paralysis").length > 0) {
        newGameState.currentResolution.push({
          resolution: "Cataclysmic Tempest6",
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
        resolution: "Cataclysmic Tempest8",
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
    unit.hp = Math.max(2, victim.hp);

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (newGameState[self].skillHand.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Crystallization1",
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

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    //2. Continue
    newGameState.currentResolution.push({
      resolution: "Upheaval2",
      unit: unit,
    });

    //1. Paralyze 1st enemy
    newGameState.currentResolution.push({
      resolution: "Upheaval1",
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
          resolution: "Upheaval3",
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

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    if (resonator !== "SA-02") {
      newGameState.currentResolution.push({
        resolution: "May float resonant skill",
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
      resolution: "UpheavalR1",
      unit: unit,
    });

    //2. Continue
    newGameState.currentResolution.push({
      resolution: "Upheaval2",
      unit: unit,
    });

    //1. Paralyze 1st enemy
    newGameState.currentResolution.push({
      resolution: "Upheaval1",
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
        resolution: "UpheavalR2",
        unit: unit,
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

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Pitfall Trap1",
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
        resolution: "Pitfall Trap2",
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

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    //Strike
    if (canStrike(unit)) {
      //Continue -> Paralyze adjacent if lethal
      newGameState.currentResolution.push({
        resolution: "Geomancy3",
        unit: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Geomancy2",
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
      resolution: "Geomancy1",
      unit: unit,
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
        resolution: "Geomancy4",
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

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Chain Lightning2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Chain Lightning1",
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
          resolution: "Chain Lightning3",
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
      resolution: "Chain Lightning5",
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

    //giveUnit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation = unit.activation + 1)
      : (unit.temporary.activation = 1);

    //use 2 charges if not resonating
    unit.charge -= 2;

    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    newGameState.currentResolution.push({
      resolution: "Zip And Zap2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Zip And Zap1",
      unit: unit,
    });

    return newGameState;
  };

  const zipAndZap2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Zip and Zap" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit) && unit.charge > 0) {
      newGameState.currentResolution.push({
        resolution: "Zip And Zap3",
        unit: unit,
        details: {
          reason: "Zip and Zap Shield",
          title: "Geomancy",
          message: "You may spend 1 Charge to gain Shield for 2 turns.",
          no: "Skip",
          yes: "Shield",
        },
      });
    }

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
  };
};
