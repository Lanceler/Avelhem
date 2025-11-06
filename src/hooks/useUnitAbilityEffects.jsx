import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useCardDatabase } from "./useCardDatabase";
import { useRecurringEffects } from "./useRecurringEffects";

export const useUnitAbilityEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);

  const {
    animationDelay,
    canMove,
    canStrike,
    drawSkill,
    enterSelectUnitMode,
    getZonesAerialImpetusAlly,
    getZonesWithAllies,
    getZonesWithEnemies,
    isMuted,
  } = useRecurringEffects();

  const {} = useCardDatabase();

  const eternalEmber1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Eternal Ember"
    newGameState.currentResolution.pop();

    unit.ember ? (unit.ember = Math.min(unit.ember + 1, 2)) : (unit.ember = 1);

    newGameState = animationDelay(newGameState, unit.player, 1750);

    return newGameState;
  };

  const afterburner1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Afterburner"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Afterburner1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: unit.player,
      canSkip: false,
      details: {
        title: "Afterburner",
        message: "Spend 1 skill to strike.",
        restriction: null,
        reason: "Afterburner",
      },
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

  const coldEmbrace1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Cold Embrace"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //WATER SCIONS CAN USE ABILITY MULTIPLE TIMES
    // unit.temporary.usedAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Cold Embrace1",
      unit: unit,
      details: {
        title: "Cold Embrace",
        reason: "Cold Embrace",
      },
    });

    return newGameState;
  };

  const sowTheWind1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Sow the Wind"
    newGameState.currentResolution.pop();

    //Wind Scions gain Cyclone when activating skill
    unit.cyclone
      ? (unit.cyclone = Math.min(3, unit.cyclone + 1))
      : (unit.cyclone = 1);

    newGameState = animationDelay(newGameState, unit.player, 1750);

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

    unit.temporary.usedAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Reap the Whirlwind2",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Reap the Whirlwind1",
      unit: unit,
    });

    return newGameState;
  };

  const reapTheWhirlwind2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Reap the Whirlwind2"
    newGameState.currentResolution.pop();

    if (unit.cyclone > 1) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Reap the Whirlwind3",
        unit: unit,
        details: {
          title: "Reap the Whirlwind",
          reason: "Reap the Whirlwind",
        },
      });
    }

    return newGameState;
  };

  const reapTheWhirlwind3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Reap the Whirlwind4"
    newGameState.currentResolution.pop();

    unit.aether = 0;

    enterSelectUnitMode(
      getZonesWithEnemies(unit, 1),
      unit,
      newGameState,
      null,
      "aether-blast",
      null
    );

    return newGameState;
  };

  const secondWind1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    // Unit is dead; do not update info
    // let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Second Wind" resolution
    newGameState.currentResolution.pop();

    const allies = getZonesAerialImpetusAlly(unitInfo);

    if (allies.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Second Wind1",
        player: self,
        unit: null,
        details: {
          title: "Second Wind",
          message:
            "You may float 1 Wind skill to prompt an adjacent ally to traverse.",
          restriction: ["03-01", "03-02", "03-03", "03-04"],
          reason: "Second Wind",
          allies: allies,
        },
      });
    }

    return newGameState;
  };

  const secondWind2 = (allies) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Second Wind Select Ally" resolution
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      allies,
      null,
      newGameState,
      null,
      "second wind prompt",
      null
    );

    return newGameState;
  };

  const saltTheEarth1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Salt the Earth"
    newGameState.currentResolution.pop();

    //Gain Leylines
    unit.leyline
      ? (unit.leyline = Math.min(unit.leyline + 1, 3))
      : (unit.leyline = 1);

    newGameState = animationDelay(newGameState, unit.player, 1750);

    return newGameState;
  };

  const mountainStance1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Mountain Stance"
    newGameState.currentResolution.pop();

    //Gain 2 Leylines
    unit.leyline
      ? (unit.leyline = Math.min(3, unit.leyline + 2))
      : (unit.leyline = 2);

    newGameState = animationDelay(newGameState, unit.player, 1750);

    return newGameState;
  };

  const convergence1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Convergence"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedAbility = true;

    //Spend Leylines
    delete unit.leyline;

    //Gain Shield
    unit.enhancements.shield = 2;

    newGameState = drawSkill(newGameState);

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

    unit.temporary.usedAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Galvanize1",
      unit: unit,
      details: {
        reason: "Galvanize",
        title: "Galvanize",
      },
    });

    return newGameState;
  };

  const amplifyAura1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Amplify Aura"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedAbility = true;

    if (unit.ambiance >= 2) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Amplify Aura1",
        unit: unit,
      });
    }

    const allies = getZonesWithAllies(unit, 1, true);
    const zones = JSON.parse(newGameState.zones);
    const alliesWithAura = [];

    for (let i of allies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const ally = localGameState[zone.player].units[zone.unitIndex];

      if (ally.aether) {
        alliesWithAura.push(i);
      }
    }

    enterSelectUnitMode(
      alliesWithAura,
      unit,
      newGameState,
      null,
      "amplify aura",
      null
    );

    return newGameState;
  };

  const amplifyAura2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Amplify Aura1"
    newGameState.currentResolution.pop();

    if (
      !["06-01", "06-02", "06-03", "06-04"].some((s) =>
        newGameState[unit.player].skillVestige.includes(s)
      )
    ) {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Message To Player",
        player: self,
        title: "Amplify Aura",
        message: "You do not have any Mana skills to recover.",
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Amplify Aura2",
        unit: unit,
        details: {
          reason: "Amplify Aura",
          title: "Amplify Aura",
          message: "You may spend 2 Ambiances to recover 1 Mana skill.",
          no: "Skip",
          yes: "Recover",
        },
      });
    }

    return newGameState;
  };

  const ambianceAssimilation1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);
    // Unit is dead; do not update info
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Ambiance Assimilation" resolution
    newGameState.currentResolution.pop();

    const zonesWithAllies = getZonesWithAllies(unit, 2, false);
    const zonesWithManaScions = [];

    for (let z of zonesWithAllies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Mana Scion") {
        zonesWithManaScions.push(z);
      }
    }
    if (zonesWithManaScions.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Ambiance Assimilation1",
        unit: unit,
        details: {
          reason: "Ambiance Assimilation",
          title: "Ambiance Assimilation",
          message:
            "You may grant an ally Mana Scion within 2 spaces all your Ambiances plus an additional 1.",
          no: "Skip",
          yes: "Grant",
          zonesWithManaScions: zonesWithManaScions,
        },
      });
    }

    return newGameState;
  };

  const ballisticArmor1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Ballistic Armor"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedAbility = true;

    if (
      getZonesWithEnemies(unit, 1).length > 0 &&
      newGameState[unit.player].skillHand.length > 0
    ) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Ballistic Armor2",
        unit: unit,
        details: {
          reason: "Ballistic Armor",
          restriction: null,
          title: "Ballistic Armor",
          message: "You may float 1 skill to Aether-blast an adjacent foe.",
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Ballistic Armor1",
      unit: unit,
      details: {
        title: "Ballistic Armor",
        reason: "Ballistic Armor",
      },
    });

    return newGameState;
  };

  const ballisticArmor2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Ballistic Armor3" resolution
    newGameState.currentResolution.pop();

    unit.aether = 0;

    enterSelectUnitMode(
      getZonesWithEnemies(unit, 1),
      unit,
      newGameState,
      null,
      "aether-blast",
      null
    );

    return newGameState;
  };

  const flourish1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Flourish"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Flourish1",
      unit: unit,
      details: {
        reason: "Flourish",
        title: "Flourish",
      },
    });

    return newGameState;
  };

  const hawkEye1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Hawk Eye"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Hawk Eye1",
      unit: unit,
      details: {
        title: "Hawk Eye",
        reason: "Hawk Eye",
      },
    });

    return newGameState;
  };

  const wingsOfDevotion1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Wings Of Devotion"
    newGameState.currentResolution.pop();

    //Gain Devotion
    unit.devotion
      ? (unit.devotion = Math.min(unit.devotion + 1, 3))
      : (unit.devotion = 1);

    newGameState = animationDelay(newGameState, unit.player, 1750);

    return newGameState;
  };

  const swanSong1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Swan Song" resolution
    newGameState.currentResolution.pop();

    const allies = getZonesWithAllies(unitInfo, 1, false);

    if (allies.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Discard Skill",
        unit: unit,
        player: unit.player,
        details: {
          title: "Swan Song",
          message:
            "You may spend 1 skill to grant an adjacent ally Shield for 2 turns.",
          restriction: null,
          reason: "Swan Song",
          allies: allies,
        },
      });
    }

    return newGameState;
  };

  //end of list

  const applyAbility = (effect, unit) => {
    switch (effect) {
      //Fire
      case "eternalEmber1":
        return eternalEmber1(unit);
      case "afterburner1":
        return afterburner1(unit);
      case "afterburner2":
        return afterburner2(unit);

      //Water
      case "coldEmbrace1":
        return coldEmbrace1(unit);

      //Wind
      case "sowTheWind1":
        return sowTheWind1(unit);
      case "reapTheWhirlwind1":
        return reapTheWhirlwind1(unit);
      case "reapTheWhirlwind2":
        return reapTheWhirlwind2(unit);
      case "reapTheWhirlwind3":
        return reapTheWhirlwind3(unit);
      case "secondWind1":
        return secondWind1(unit);
      case "secondWind2":
        return secondWind2(unit);

      //Land
      case "saltTheEarth1":
        return saltTheEarth1(unit);
      case "mountainStance1":
        return mountainStance1(unit);
      case "convergence1":
        return convergence1(unit);

      //Lightning
      case "galvanize1":
        return galvanize1(unit);

      //Mana
      case "amplifyAura1":
        return amplifyAura1(unit);
      case "amplifyAura2":
        return amplifyAura2(unit);
      case "ambianceAssimilation1":
        return ambianceAssimilation1(unit);

      //Metal
      case "ballisticArmor1":
        return ballisticArmor1(unit);
      case "ballisticArmor2":
        return ballisticArmor2(unit);

      //Plant
      case "flourish1":
        return flourish1(unit);

      //Avian
      case "hawkEye1":
        return hawkEye1(unit);
      case "wingsOfDevotion1":
        return wingsOfDevotion1(unit);
      case "swanSong1":
        return swanSong1(unit);
    }
  };

  return { applyAbility };
};
