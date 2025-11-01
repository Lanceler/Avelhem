import { useSelector } from "react-redux";
import { useRecurringEffects } from "./useRecurringEffects";

export const useSkillEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  const {
    aetherRestoreSpecial,
    blast,
    canMove,
    canStrike,
    drawSkill,
    enterSelectUnitMode,
    getZonesAerialImpetusAlly,
    getZonesWithAllies,
    getZonesWithEnemies,
    getZonesWithEnemiesAfflicted,
    getZonesWithEnemiesNoAether,
    getZonesWithEnemiesRooted,
    isAdjacent,
    isImmobilized,
    isMuted,
    isNearRootedFoe,
    isRooted,
    paralyze1,
    strike,
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

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Ignition Propulsion2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Ignition Propulsion1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: unit.player,
      canSkip: false,
      details: {
        title: "Ignition Propulsion",
        message: "Spend 1 skill to strike.",
        restriction: null,
        reason: "Ignition Propulsion",
      },
    });

    return newGameState;
  };

  const ignitionPropulsion2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Ignition Propulsion2"
    newGameState.currentResolution.pop();

    if (unit && !isMuted(unit)) {
      unit.aether = 1;
    }

    return newGameState;
  };

  const conflagration1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Conflagration" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Fire Skill",
        resolution2: "ConflagrationR1",
        unit: unit,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Conflagration1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: unit.player,
      canSkip: false,
      details: {
        title: "Conflagration",
        message: "Spend 1 skill to blast an adjacent foe.",
        restriction: null,
        reason: "Conflagration",
      },
    });

    return newGameState;
  };

  const conflagrationR1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "ConflagrationR1"
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
      newGameState = drawSkill(newGameState);

      if (getZonesWithEnemies(unit, 1).length > 0) {
        newGameState.currentResolution.push({
          resolution: "Fire Skill",
          resolution2: "ConflagrationR2",
          unit: unit,
          details: {
            reason: "Conflagration Ignite",
            title: "Conflagration",
            message: "You may ignite an adjacent foe.",
            no: "Skip",
            yes: "Ignite",
          },
        });
      }
    }

    return newGameState;
  };

  const blazeOfGlory1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Blaze of Glory" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Blaze of Glory2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Blaze of Glory1",
      unit: unit,
    });

    return newGameState;
  };

  const blazeOfGlory2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Blaze of Glory2" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
      newGameState.currentResolution.push({
        resolution: "Fire Skill",
        resolution2: "Blaze of Glory3",
        unit,
        details: {
          title: "Blaze of Glory",
          message: "You may reveal 1 “Blaze of Glory” to gain Shield.",
          restriction: ["01-03"],
          reason: "Blaze of Glory",
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
    unit.enhancements.shield
      ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
      : (unit.enhancements.shield = 2);

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Resplendence2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Resplendence1",
      unit: unit,
      details: {
        reason: "Resplendence",
        title: "Resplendence",
        message: "You may search for 1 Fire skill.",
        no: "Skip",
        yes: "Search",
      },
    });

    return newGameState;
  };

  const resplendence2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Resplendence2" resolution
    newGameState.currentResolution.pop();

    if (
      getZonesWithEnemies(unit, 1).length &&
      (newGameState[unit.player].skillHand.length > 0 || unit.ember >= 2)
    ) {
      newGameState.currentResolution.push({
        resolution: "Discard Skill",
        unit: unit,
        player: unit.player,
        details: {
          title: "Resplendence",
          message: "You may spend 1 skill to ignite an adjacent foe.",
          restriction: null,
          reason: "Resplendence",
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

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Purification1",
      unit: unit,
      details: {
        title: "Purification",
        reason: "Purification",
      },
    });

    return newGameState;
  };

  const frigidBreath1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Frigid Breath" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Water Skill",
        resolution2: "Frigid BreathR1",
        unit: unit,
      });
    }

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
        details: {
          reason: "Frigid Breath3",
          restriction: null,
          title: "Frigid Breath",
          message: "You may float 1 skill to freeze an adjacent foe.",
        },
      });
    }

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
      getZonesWithEnemiesAfflicted(unit, 1, "frost").length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Water Skill",
        resolution2: "Frigid BreathR2",
        unit: unit,
        details: {
          reason: "Frigid Breath Blast",
          title: "Frigid Breath",
          message: "You may blast an adjacent frozen foe.",
          no: "Skip",
          yes: "Blast",
        },
      });
    }

    return newGameState;
  };

  const frigidBreathR3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Frigid BreathR3" resolution
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      getZonesWithEnemiesAfflicted(unit, 1, "frost"),
      unit,
      newGameState,
      null,
      "blast",
      null
    );

    return newGameState;
  };

  const healingRain1 = (unitInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Healing Rain" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Healing Rain1",
      unit: unit,
      details: {
        title: "Healing Rain",
        reason: "Healing Rain",
        victim: newGameState[victimInfo.player].units[victimInfo.unitIndex],
      },
    });

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

    unit.torrent = 2;

    //inspect
    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Glacial Torrent1",
      unit: unit,
      details: {
        restriction: ["02-01", "02-02", "02-03"],
        title: "Glacial Torrent",
        reason: "Glacial Torrent",
        message:
          "Inspect 6 skills; you may add up to 3 Water skills among them to your hand.",
        inspectionCount: 6,
        select: "Multi",
        selectLimit: 3,
        outcome: "Add",
      },
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

    if (
      (["Advance", "Invoke"].includes(newGameState.tactics[0].face) &&
        newGameState.tactics[0].stock > 0) ||
      (["Advance", "Invoke"].includes(newGameState.tactics[1].face) &&
        newGameState.tactics[1].stock > 0)
    ) {
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Aerial Impetus2",
        details: {
          title: "Aerial Impetus",
          message:
            "You may reroll an Advance or Invoke tactic into a Mobilize tactic.",
          restriction: ["Advance", "Invoke"],
          stock: 1,
          reason: "Aerial Impetus",
          canSkip: true,
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Aerial Impetus1",
      unit: unit,
      details: {
        title: "Aerial Impetus",
        reason: "Aerial Impetus",
      },
    });

    return newGameState;
  };

  const aerialImpetus2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Aerial Impetus Select Ally" resolution
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      getZonesAerialImpetusAlly(unit),
      unit,
      newGameState,
      null,
      "aerial impetus prompt",
      null
    );

    return newGameState;
  };

  const aerialImpetus2E = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Aerial Impetus Purge" resolution
    newGameState.currentResolution.pop();

    unit.aether = 0;
    delete unit.enhancements.shield;

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

    return newGameState;
  };

  const galeConjuration1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Gale Conjuration" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Gale ConjurationR1",
        unit: unit,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Gale Conjuration1",
      unit: unit,
    });

    return newGameState;
  };

  const galeConjurationR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    // end "Gale ConjurationR1"
    newGameState.currentResolution.pop();

    unit.cyclone = Math.min(3, unit.cyclone + 1);
    unit.aether = 1;

    const zonesWithAllies = getZonesWithAllies(unit, 1, false);
    if (zonesWithAllies.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Gale ConjurationR2",
        unit: unit,
        details: {
          reason: "Gale Conjuration Restore",
          title: "Gale Conjuration",
          message: "You may restore an adjacent ally’s Aether.",
          no: "Skip",
          yes: "Restore",
          zones: zonesWithAllies,
        },
      });
    }

    return newGameState;
  };

  const symphonicScreech1 = (unitInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //end "Activating Symphonic Screech" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //give victim activationCounter
    victim.temporary.activation
      ? (victim.temporary.activation += 1)
      : (victim.temporary.activation = 1);

    //temporarily remove the skill conclusion of Screech
    const symphonicScreechConclusion = newGameState.currentResolution.pop();

    //end "Negate the effect of the victim's skill
    newGameState.currentResolution.pop();

    //return the skill conclusion of Screech
    newGameState.currentResolution.push(symphonicScreechConclusion);

    if (!isAdjacent(unit, victim)) {
      newGameState.currentResolution.push({
        resolution: "Wind Skill",
        resolution2: "Symphonic Screech Float",
        unit: victim,
        details: {
          reason: "Symphonic Screech Float",
          title: "Symphonic Screech",
          message:
            "Because your unit was not adjacent to the activator of Symphonic Screech, you may float the negated skill.",
          no: "Skip",
          yes: "Float",
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Misc.",
      resolution2: "Message To Player",
      player: enemy,
      title: "Symphonic Screech",
      message: "The effect of your unit’s skill has been negated!",
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

    if (unit && !isMuted(unit)) {
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
            message: "You may paralyze another adjacent foe.",
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

    if (unit && !isMuted(unit)) {
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

        const floatCount = Math.min(
          unit.temporary.cataclysmicFloat,
          newGameState[enemy].skillHand.length
        );

        const cataclysmicMessage =
          floatCount === 1
            ? "Float 1 skill."
            : "Float 2 skills. The second selected skill will floated on top of the first.";

        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Cataclysmic Tempest Float",
          player: enemy,
          details: {
            reason: "Cataclysmic Tempest",
            title: "Cataclysmic Tempest",
            message: cataclysmicMessage,
            count: floatCount,
          },
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

    if (unit && !isMuted(unit) && getZonesWithEnemies(unit, 1).length > 0) {
      let adjacentEnemies = getZonesWithEnemiesAfflicted(unit, 1, "paralysis");

      if (
        newGameState[self].skillHand.length > 0 &&
        adjacentEnemies.length > 0
      ) {
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Cataclysmic Tempest6",
          unit: unit,
          details: {
            title: "Cataclysmic Tempest",
            message:
              "You may reveal 1 Wind skill to blast an adjacent paralyzed foe.",
            restriction: ["03-01", "03-02", "03-03", "03-04"],
            reason: "Cataclysmic Tempest",
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

    enterSelectUnitMode(
      getZonesWithEnemiesAfflicted(unit, 1, "paralysis"),
      unit,
      newGameState,
      null,
      "blast",
      null
    );

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

    if (newGameState[unit.player].skillHand.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Discard Skill",
        unit: unit,
        player: unit.player,
        details: {
          title: "Crystallization",
          message: "You may spend 1 skill to gain Shield for 2 turns.",
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

    return newGameState;
  };

  const upheaval1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Upheaval" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Land Skill",
        resolution2: "UpheavalR1",
        unit: unit,
      });
    }

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
            title: "Upheaval",
            message:
              "You may reveal 1 Land skill to paralyze a different adjacent foe.",
            restriction: ["04-01", "04-02", "04-03", "04-04"],
            reason: "Upheaval",
            adjacentEnemies: adjacentEnemies,
          },
        });
      }
    }

    return newGameState;
  };

  const upheavalR1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "UpheavalR1" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit) && canMove(unit)) {
      newGameState.currentResolution.push({
        resolution: "Land Skill",
        resolution2: "UpheavalR2",
        unit: unit,
        details: {
          reason: "Upheaval Traverse",
          title: "Upheaval",
          message: "You may traverse.",
          no: "Skip",
          yes: "Traverse",
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

    delete unit.temporary.pitfallTrapBlast;

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
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex] =
        attacker;

      newGameState.currentResolution.push({
        resolution: "Discard Skill",
        unit: attacker,
        player: attacker.player,
        details: {
          victim: victim,
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
      getZonesWithEnemies(unit, 1).length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Land Skill",
        resolution2: "Geomancy4",
        unit: unit,
        details: {
          reason: "Geomancy Paralyze",
          title: "Geomancy",
          message: "You may paralyze an adjacent foe.",
          no: "Skip",
          yes: "Paralyze",
        },
      });
    }

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

    if (unit !== null && !isMuted(unit)) {
      //allies of victim
      let adjacentEnemies = getZonesWithAllies(victim, 1);

      if (adjacentEnemies.length > 0 && unit.charge > 0) {
        newGameState.currentResolution.push({
          resolution: "Lightning Skill",
          resolution2: "Chain Lightning3",
          unit: unit,
          details: {
            reason: "Chain Lightning Blast",
            title: "Chain Lightning",
            message:
              "You may spend 1 Charge to blast a foe adjacent to the initial one.",
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

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Chain Lightning5",
      unit: unit,
      adjacentEnemies: adjacentEnemies,
    });

    return newGameState;
  };

  const zipAndZap1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Zip and Zap" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //use 2 charges
    unit.charge -= 2;

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Lightning Skill",
        resolution2: "Zip And ZapR1",
        unit: unit,
      });
    }

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

    if (unit !== null && !isMuted(unit)) {
      unit.charge += 1;

      if (getZonesWithEnemies(unit, 1).length > 0) {
        newGameState.currentResolution.push({
          resolution: "Lightning Skill",
          resolution2: "Zip And ZapR2",
          unit: unit,
          details: {
            reason: "Zip and Zap Blast",
            title: "Zip and Zap",
            message: "You may blast an adjacent foe.",
            no: "Skip",
            yes: "Blast",
          },
        });
      }
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

    if (unit !== null && !isMuted(unit)) {
      newGameState.currentResolution.push({
        resolution: "Lightning Skill",
        resolution2: "Thunder Thaumaturge2",
        unit: unit,
        details: {
          restriction: ["05-01", "05-02", "05-03", "05-04"],
          title: "Thunder Thaumaturge",
          reason: "Thunder Thaumaturge",
          message:
            "Inspect 3 skills; you may add 1 Lightning skill among them to your hand.",
          inspectionCount: 3,
          select: "Single",
          outcome: "Add",
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

    unit.charge
      ? (unit.charge = Math.min(3, unit.charge + 1))
      : (unit.charge = 1);

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Valiant Spark2",
      unit: unit,
    });

    if (canMove(unit)) {
      newGameState.currentResolution.push({
        resolution: "Lightning Skill",
        resolution2: "Valiant Spark1",
        unit: unit,
        details: {
          reason: "Valiant Spark",
          title: "Valiant Spark",
          message: "You may spend 1 Charge to traverse.",
          no: "Skip",
          yes: "Traverse",
        },
      });
    }

    return newGameState;
  };

  const valiantSpark2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Valiant Spark2" resolution
    newGameState.currentResolution.pop();

    if (
      unit !== null &&
      !isMuted(unit) &&
      unit.charge >= 2 &&
      (canMove(unit) || canStrike(unit))
    ) {
      newGameState.currentResolution.push({
        resolution: "Lightning Skill",
        resolution2: "Valiant Spark3",
        unit: unit,
        details: {
          title: "Valiant Spark",
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

    //Spend Aether
    unit.aether = 0;

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Surge1",
      player: self,
      unit: unit,
      details: {
        title: "Surge",
        reason: "Surge",
      },
    });

    return newGameState;
  };

  const diffusion1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Diffusion" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    let d1Message = "Use an Assault tactic to blast a foe within 2 spaces.";
    let d1Restriction = ["Assault"];

    if (resonator) {
      d1Message =
        "Use an Assault or Invoke tactic to blast a foe within 2 spaces.";
      d1Restriction = ["Assault", "Invoke"];

      newGameState.currentResolution.push({
        resolution: "Mana Skill",
        resolution2: "DiffusionR1",
        unit: unit,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Diffusion1",
      unit: unit,
      details: {
        title: "Diffusion",
        message: d1Message,
        restriction: d1Restriction,
        stock: 1,
        reason: "Diffusion",
        canSkip: false,
      },
    });

    return newGameState;
  };

  const diffusion2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Diffusion3" resolution
    newGameState.currentResolution.pop();

    let adjacentEnemies = getZonesWithEnemies(unit, 1);

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
            message: "You may blast an adjacent foe.",
            no: "Skip",
            yes: "Blast",
            adjacentEnemies: adjacentEnemies,
          },
        });
      }
    }

    return newGameState;
  };

  const diffusionR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "DiffusionR1" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
      newGameState = aetherRestoreSpecial(newGameState, unit);
    }

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
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    const zones = JSON.parse(newGameState.zones);

    //end "Activating Disruption Field" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.ambiance
      ? (unit.ambiance = Math.min(3, unit.ambiance + 2))
      : (unit.ambiance = 2);

    const zonesWithAdjacentEnemies = getZonesWithEnemies(unit, 1);

    for (let z of zonesWithAdjacentEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      newGameState[zone.player].units[zone.unitIndex].aether = 0;
    }

    if (unit.aether) {
      newGameState.currentResolution.push({
        resolution: "Mana Skill",
        resolution2: "Disruption Field1",
        unit: unit,
        details: {
          reason: "Disruption Field",
          title: "Disruption Field",
          message:
            "You may spend your Aether to purge the Aether of all foes within 2 spaces.",
          no: "Skip",
          yes: "Purge",
          foes: getZonesWithEnemies(unit, 2),
          zones: zones,
        },
      });
    }

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
            message: "You may paralyze another adjacent foe.",
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
          message: "You may blast an adjacent paralyzed foe.",
          no: "Skip",
          yes: "Blast",
          adjacentEnemies: adjacentEnemies,
        },
      });
    }

    return newGameState;
  };

  const reinforce1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Reinforce" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Metal Skill",
        resolution2: "ReinforceR1",
        unit: unit,
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

    return newGameState;
  };

  const reinforceR2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "ReinforceR1" resolution
    newGameState.currentResolution.pop();

    newGameState = drawSkill(newGameState);

    unit.sharpness
      ? (unit.sharpness = Math.min(unit.sharpness + 1, 2))
      : (unit.sharpness = 1);

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

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Frenzy Blade2",
      unit: unit,
      details: {
        title: "Frenzy Blade",
        reason: "Frenzy Blade2",
      },
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Frenzy Blade1",
      unit: unit,
      victim: victimInfo,
    });

    return newGameState;
  };

  const frenzyBlade2 = (unitInfo, victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Frenzy Blade1" resolution
    newGameState.currentResolution.pop();

    newGameState = strike(newGameState, unit, victim, null);

    return newGameState;
  };

  const frenzyBlade3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Frenzy Blade2" resolution
    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit) && unit.sharpness > 1) {
      unit.enhancements.shield
        ? (unit.enhancements.shield = Math.max(unit.enhancements.shield, 2))
        : (unit.enhancements.shield = 2);
    }

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
          message: "You may reveal 1 Metal skill to paralyze an adjacent foe.",
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
      getZonesWithEnemies(unit, 2).length > 0 &&
      newGameState[unit.player].skillHand.length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Discard Skill",
        unit: unit,
        player: unit.player,
        details: {
          title: "Arsenal Onslaught",
          message:
            "You may spend 1 skill to either blast a foe within 2 spaces or strike.",
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

    //end "Activating Sow and Reap" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

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

    if (unit !== null && !isMuted(unit) && unit.blossom > 0) {
      newGameState.currentResolution.push({
        resolution: "Plant Skill",
        resolution2: "Sow and Reap3",
        unit: unit,
        details: {
          reason: "Sow and Reap",
          title: "Sow and Reap",
          message: "You may spend 1 Blossom to draw a skill.",
          no: "Skip",
          yes: "Draw",
        },
      });
    }

    return newGameState;
  };

  const sowAndReap3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Sow and Reap Blast" resolution
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      getZonesWithEnemiesRooted(unit, 2),
      unit,
      newGameState,
      null,
      "blast",
      "sowAndReapBlast"
    );

    return newGameState;
  };

  const sowAndReap4 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Select Sow and Reap Striker" resolution
    newGameState.currentResolution.pop();

    const zonesWithAllies = getZonesWithAllies(unit, 1, false);
    let adjacentStrikers = [];

    for (let z of zonesWithAllies) {
      const zones = JSON.parse(newGameState.zones);
      const zone = zones[Math.floor(z / 5)][z % 5];
      const ally = newGameState[zone.player].units[zone.unitIndex];

      if (isNearRootedFoe(ally, 1) && canStrike(ally)) {
        adjacentStrikers.push(z);
      }
    }

    enterSelectUnitMode(
      adjacentStrikers,
      unit,
      newGameState,
      null,
      "sow and reap striker",
      null
    );

    return newGameState;
  };

  const sowAndReap5 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Sow and Reap Strike" resolution
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      getZonesWithEnemiesRooted(unit, 1),
      unit,
      newGameState,
      null,
      "strike",
      "null"
    );

    return newGameState;
  };

  const efflorescence1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Efflorescence" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Plant Skill",
        resolution2: "EfflorescenceR1",
        unit: unit,
      });
    }

    unit.blossom = 3;

    const zonesWithAllies = getZonesWithAllies(unit, 2, false);
    const zonesWithPlantScions = [];

    for (let z of zonesWithAllies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Plant Scion") {
        zonesWithPlantScions.push(z);
      }
    }

    if (zonesWithPlantScions.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Plant Skill",
        resolution2: "Efflorescence1",
        unit: unit,
        details: {
          reason: "Efflorescence",
          title: "Efflorescence",
          message:
            "You may grant an ally Plant Scion within 2 spaces 3 Blossoms.",
          no: "Skip",
          yes: "Grant",
          zonesWithPlantScions: zonesWithPlantScions,
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
      unit.aether = 1;
    }

    return newGameState;
  };

  const viridianGrave1 = (unitInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    //DO NOT UPDATE victim (we are using their information right before they were eliminated

    //end "Activating Viridian Grave" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState = drawSkill(newGameState);
    if (isRooted(victimInfo) || victimInfo.unitClass === "Plant Scion") {
      newGameState = drawSkill(newGameState);
    }

    if (unit !== null && !isMuted(unit) && unit.blossom > 0) {
      newGameState.currentResolution.push({
        resolution: "Plant Skill",
        resolution2: "Viridian Grave1",
        unit: unit,
        details: {
          title: "Viridian Grave",
          reason: "Viridian Grave",
        },
      });
    }

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

    unit.blossom
      ? (unit.blossom = Math.min(3, unit.blossom + 1))
      : (unit.blossom = 1);

    unit.enhancements.ward = 2;

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Castle Of Thorns1",
      unit: unit,
      details: {
        title: "Castle Of Thorns",
        reason: "Castle Of Thorns",
      },
    });

    return newGameState;
  };

  const raptorBlitz1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Raptor Blitz" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    newGameState.currentResolution.push({
      resolution: "Avian Skill",
      resolution2: "Raptor Blitz1",
      unit: unit,
      details: {
        title: "Raptor Blitz",
        reason: "Raptor Blitz",
      },
    });

    return newGameState;
  };

  const raptorBlitz2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Raptor Blitz2" resolution
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      getZonesWithEnemiesNoAether(unit, 1),
      unit,
      newGameState,
      null,
      "blast",
      null
    );

    return newGameState;
  };

  const reconnaissance1 = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Reconnaissance" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Avian Skill",
        resolution2: "ReconnaissanceR1",
        unit: unit,
        details: {
          title: "Reconnaissance",
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Avian Skill",
      resolution2: "Reconnaissance1",
      unit: unit,
      details: {
        restriction: null,
        title: "Reconnaissance",
        reason: "Reconnaissance",
        message:
          "Inspect 5 skills; you may place any of them at the bottom of your repertoire. Skills selected earlier will be placed below subsequent ones.",
        inspectionCount: 5,
        select: "Multi",
        selectLimit: 5,
        outcome: "Reconnaissance",
      },
    });

    return newGameState;
  };

  const guardianWings1 = (unitInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //end "Activating Guardian Wings" resolution
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    // victim.enhancements.shield
    //   ? (victim.enhancements.shield = Math.max(1, victim.enhancements.shield))
    //   : (victim.enhancements.shield = 1);

    // if (victim.unitClass === "Avian Scion") {
    //   newGameState = aetherRestoreSpecial(newGameState, unit);
    // }

    newGameState.currentResolution.push({
      resolution: "Avian Skill",
      resolution2: "Guardian Wings Float",
      unit: unit,
      details: {
        title: "Guardian Wings",
        reason: "Guardian Wings",
        restriction: null,
        message: "Float 1 skill.",
        victim: victim,
      },
    });

    return newGameState;
  };

  const vanguardFleet1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Vanguard Fleet" resolution
    newGameState.currentResolution.pop();

    unit.enhancements.shield
      ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
      : (unit.enhancements.shield = 2);

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    delete unit.temporary.previousTarget;

    newGameState.currentResolution.push({
      resolution: "Avian Skill",
      resolution2: "Vanguard Fleet2", //Yes, this is duplicated
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Avian Skill",
      resolution2: "Vanguard Fleet2",
      unit: unit,
    });

    if (canMove(unit)) {
      newGameState.currentResolution.push({
        resolution: "Discard Skill",
        unit: unit,
        player: unit.player,
        details: {
          title: "Vanguard Fleet",
          message: "You may spend 1 Avian skill to traverse.",
          restriction: ["09-01", "09-02", "09-03", "09-04"],
          reason: "Vanguard Fleet1",
        },
      });
    }

    return newGameState;
  };

  const vanguardFleet2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(localGameState.zones);
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Vanguard Fleet2" resolution
    newGameState.currentResolution.pop();

    if (newGameState[unit.player].skillHand.length > 0) {
      const zonesWithAllies = getZonesWithAllies(unit, 9, false);
      let zonesWithMovableAllies = [];

      const isbehind = (ally) => {
        if (unit.player === "host") {
          return unit.row < ally.row;
        } else {
          return unit.row > ally.row;
        }
      };

      for (let z of zonesWithAllies) {
        const zone = zones[Math.floor(z / 5)][z % 5];
        const ally = newGameState[zone.player].units[zone.unitIndex];

        if (
          canMove(ally) &&
          !isImmobilized(ally) &&
          isbehind(ally) &&
          ally.unitIndex !== unit.temporary.previousTarget
        ) {
          zonesWithMovableAllies.push(z);
        }
      }

      if (zonesWithMovableAllies.length > 0) {
        newGameState.currentResolution.push({
          resolution: "Discard Skill",
          unit: unit,
          player: unit.player,
          details: {
            title: "Vanguard Fleet",
            message:
              "You may spend 1 skill to prompt an ally in any row behind you to traverse.",
            restriction: null,
            reason: "Vanguard Fleet2",
            zonesWithMovableAllies: zonesWithMovableAllies,
          },
        });
      }
    }

    return newGameState;
  };

  //end of list

  const applySkill = (effect, a, b) => {
    switch (effect) {
      //Fire
      case "ignitionPropulsion1":
        return ignitionPropulsion1(a);
      case "ignitionPropulsion2":
        return ignitionPropulsion2(a);
      case "conflagration1":
        return conflagration1(a, b);
      case "conflagrationR1":
        return conflagrationR1(a);
      case "blazeOfGlory1":
        return blazeOfGlory1(a);
      case "blazeOfGlory2":
        return blazeOfGlory2(a);
      case "resplendence1":
        return resplendence1(a);
      case "resplendence2":
        return resplendence2(a);

      //Water
      case "purification1":
        return purification1(a);
      case "frigidBreath1":
        return frigidBreath1(a, b);
      case "frigidBreath2":
        return frigidBreath2(a);
      case "frigidBreathR2":
        return frigidBreathR2(a);
      case "frigidBreathR3":
        return frigidBreathR3(a);
      case "healingRain1":
        return healingRain1(a, b);
      case "glacialTorrent1":
        return glacialTorrent1(a);

      //Wind
      case "aerialImpetus1":
        return aerialImpetus1(a);
      case "aerialImpetus2":
        return aerialImpetus2(a);
      case "aerialImpetus2E":
        return aerialImpetus2E(a);
      case "galeConjuration1":
        return galeConjuration1(a, b);
      case "galeConjurationR2":
        return galeConjurationR2(a);
      case "symphonicScreech1":
        return symphonicScreech1(a, b);
      case "cataclysmicTempest1":
        return cataclysmicTempest1(a);
      case "cataclysmicTempest2":
        return cataclysmicTempest2(a);
      case "cataclysmicTempest3":
        return cataclysmicTempest3(a);
      case "cataclysmicTempest4":
        return cataclysmicTempest4(a);
      case "cataclysmicTempest5":
        return cataclysmicTempest5(a);

      //Land
      case "crystallization1":
        return crystallization1(a);
      case "crystallization2":
        return crystallization2(a);
      case "upheaval1":
        return upheaval1(a, b);
      case "upheaval2":
        return upheaval2(a);
      case "upheavalR1":
        return upheavalR1(a);
      case "pitfallTrap1":
        return pitfallTrap1(a, b);
      case "pitfallTrap2":
        return pitfallTrap2(a, b);
      case "pitfallTrap3":
        return pitfallTrap3(a, b);
      case "geomancy1":
        return geomancy1(a);
      case "geomancy2":
        return geomancy2(a);

      //Lightning
      case "chainLightning1":
        return chainLightning1(a);
      case "chainLightning2":
        return chainLightning2(a);
      case "chainLightning3":
        return chainLightning3(a, b);
      case "zipAndZap1":
        return zipAndZap1(a, b);
      case "zipAndZapR2":
        return zipAndZapR2(a);
      case "thunderThaumaturge1":
        return thunderThaumaturge1(a, b);
      case "thunderThaumaturge2":
        return thunderThaumaturge2(a);
      case "valiantSpark1":
        return valiantSpark1(a);
      case "valiantSpark2":
        return valiantSpark2(a);

      //Mana
      case "surge1":
        return surge1(a);
      case "diffusion1":
        return diffusion1(a, b);
      case "diffusion2":
        return diffusion2(a);
      case "diffusionR2":
        return diffusionR2(a);
      case "aegis1":
        return aegis1(a, b);
      case "disruptionField1":
        return disruptionField1(a);

      //Metal
      case "magneticShockwave1":
        return magneticShockwave1(a);
      case "magneticShockwave2":
        return magneticShockwave2(a);
      case "magneticShockwave3":
        return magneticShockwave3(a);
      case "reinforce1":
        return reinforce1(a, b);
      case "reinforceR2":
        return reinforceR2(a);
      case "frenzyBlade1":
        return frenzyBlade1(a, b);
      case "frenzyBlade2":
        return frenzyBlade2(a, b);
      case "frenzyBlade3":
        return frenzyBlade3(a);
      case "arsenalOnslaught1":
        return arsenalOnslaught1(a);
      case "arsenalOnslaught2":
        return arsenalOnslaught2(a);
      case "arsenalOnslaught3":
        return arsenalOnslaught3(a);

      //Plant
      case "sowAndReap1":
        return sowAndReap1(a);
      case "sowAndReap2":
        return sowAndReap2(a);
      case "sowAndReap3":
        return sowAndReap3(a);
      case "sowAndReap4":
        return sowAndReap4(a);
      case "sowAndReap5":
        return sowAndReap5(a);
      case "efflorescence1":
        return efflorescence1(a, b);
      case "efflorescenceR2":
        return efflorescenceR2(a);
      case "viridianGrave1":
        return viridianGrave1(a, b);
      case "castleOfThorns1":
        return castleOfThorns1(a);

      //Avian
      case "raptorBlitz1":
        return raptorBlitz1(a);
      case "raptorBlitz2":
        return raptorBlitz2(a);
      case "reconnaissance1":
        return reconnaissance1(a, b);
      case "guardianWings1":
        return guardianWings1(a, b);
      case "vanguardFleet":
        return vanguardFleet1(a);
      case "vanguardFleet2":
        return vanguardFleet2(a);
    }
  };

  return { applySkill };
};
