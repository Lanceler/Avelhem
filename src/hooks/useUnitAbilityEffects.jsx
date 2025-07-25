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

    unit.temporary.usedFirstAbility = true;

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

  const fieryHeart1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Fiery Heart"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedSecondAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Fiery Heart1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: unit.player,
      canSkip: false,
      details: {
        title: "Fiery Heart",
        message: "Spend 1 skill to purge an adjacent ally’s Frost and Burn.",
        restriction: null,
        reason: "Fiery Heart",
      },
    });

    return newGameState;
  };

  const fieryHeart2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Fiery Heart1"
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

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Hydrotherapy1",
      unit: unit,
    });

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

  const hydrotherapy2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Hydrotherapy1"
    newGameState.currentResolution.pop();

    if (newGameState[unit.player].skillHand.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Hydrotherapy2",
        unit: unit,
        details: {
          reason: "Hydrotherapy2",
          restriction: null,
          title: "Hydrotherapy",
          message: "You may float 1 skill to search for 1 “Healing Rain”.",
        },
      });
    }

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

  const aeromancy1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Aeromancy"
    newGameState.currentResolution.pop();

    //Wind Scions gain Cyclone when activating skill
    unit.cyclone
      ? (unit.cyclone = Math.min(2, unit.cyclone + 1))
      : (unit.cyclone = 1);

    newGameState = animationDelay(newGameState, unit.player, 1750);

    return newGameState;
  };

  const airDash1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Air Dash"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedFirstAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Air Dash1",
      unit: unit,
    });

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

    unit.temporary.usedSecondAbility = true;

    //spend Cyclone
    unit.cyclone -= 2;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Reap the Whirlwind1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Reap the Whirlwind Float",
      unit: unit,
      details: {
        title: "Reap the Whirlwind",
        reason: "Reap the Whirlwind",
        restriction: ["03-01", "03-02", "03-03", "03-04"],
        message: "Float 1 Wind skill.",
      },
    });

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

    //Gain Aftershocks
    unit.aftershock
      ? (unit.aftershock = Math.min(unit.aftershock + 1, 2))
      : (unit.aftershock = 1);

    newGameState = animationDelay(newGameState, unit.player, 1750);

    return newGameState;
  };

  const mountainStance1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Mountain Stance"
    newGameState.currentResolution.pop();

    //Gain 2 Aftershocks
    unit.aftershock = 2;

    newGameState = animationDelay(newGameState, unit.player, 1750);

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

    unit.temporary.usedFirstAbility = true;

    //Gain Shield for 2 turns
    unit.enhancements.shield
      ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
      : (unit.enhancements.shield = 2);

    if (canMove(unit) || canStrike(unit)) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Fortify1",
        unit: unit,
        details: {
          reason: "Fortify",
          restriction: null,
          title: "Fortify",
          message: "You may float 1 skill to traverse or strike.",
        },
      });
    }

    return newGameState;
  };

  const leylineConvergence1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Leyline Convergence"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedSecondAbility = true;

    unit.aether = 1;

    if (canMove(unit)) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Leyline Convergence1",
        player: self,
        unit: unit,
        details: {
          reason: "Leyline Convergence",
          title: "Leyline Convergence",
          message: "You may traverse.",
          no: "Skip",
          yes: "Traverse",
        },
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

    unit.temporary.usedFirstAbility = true;

    //Gain 1 charge
    unit.charge
      ? (unit.charge = Math.min(3, unit.charge + 1))
      : (unit.charge = 1);

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

  const arcFlash1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Arc Flash"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedSecondAbility = true;

    //Spend 3 charges
    unit.charge -= 3;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Arc Flash2",
      unit: unit,
    });

    if (canMove(unit)) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Arc Flash1",
        unit: unit,
        details: {
          reason: "Arc Flash",
          title: "Arc Flash",
          message: "You may traverse.",
          no: "Skip",
          yes: "Traverse",
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Search Card",
      player: self,
      details: {
        restriction: ["05-01", "05-02", "05-03", "05-04"],
        exclusion: [],
        searchTitle: "Arc Flash",
        searchMessage: "Search for then float 1 Lightning skill",
        outcome: "Float",
        revealTitle: null,
        revealMessage: null,
        messageTitle: null,
        message: null,
        specMessage: null,
      },
    });

    return newGameState;
  };

  const arcFlash2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Arc Flash2"
    newGameState.currentResolution.pop();

    if (unit && !isMuted(unit) && (canMove(unit) || canStrike(unit))) {
      newGameState.currentResolution.push({
        resolution: "Unit Ability",
        resolution2: "Arc Flash3",
        player: self,
        unit: unit,
        details: {
          title: "Arc Flash",
          reason: "Arc Flash3",
        },
      });

      newGameState = animationDelay(newGameState, self);
    }

    return newGameState;
  };

  const particleBeam1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Particle Beam"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedFirstAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Particle Beam1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: unit.player,
      canSkip: false,
      details: {
        title: "Particle Beam",
        message: "Spend 1 skill to blast a foe 2 spaces away.",
        restriction: null,
        reason: "Particle Beam",
      },
    });

    return newGameState;
  };

  const particleBeam2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Particle Beam1"
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      getZonesWithEnemies(unit, 2),
      unit,
      newGameState,
      null,
      "blast",
      null
    );

    return newGameState;
  };

  const auraAmplication1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Amplify Aura"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedSecondAbility = true;

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

  const brandish1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Brandish"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    unit.temporary.usedFirstAbility = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Brandish1",
      unit: unit,
      details: {
        title: "Brandish",
        reason: "Brandish",
      },
    });

    newGameState.currentResolution.push({
      resolution: "Search Card",
      player: self,
      details: {
        restriction: ["07-03"],
        exclusion: [],
        searchTitle: "Brandish",
        searchMessage: "Search for 1 Frenzy Blade",
        outcome: "Add",
        revealTitle: null,
        revealMessage: null,
        messageTitle: null,
        message: null,
        specMessage: null,
      },
    });

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

    unit.temporary.usedSecondAbility = true;

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

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Flourish1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: unit.player,
      canSkip: false,
      details: {
        title: "Flourish",
        message: "Choose the second skill to spend.",
        restriction: null,
        reason: "Flourish",
      },
    });

    newGameState = animationDelay(newGameState, self);

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: unit.player,
      canSkip: false,
      details: {
        title: "Flourish",
        message: "Spend 2 skills to restore your Aether and gain Overgrowth.",
        restriction: null,
        reason: "Flourish",
      },
    });

    return newGameState;
  };

  const flourish2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Flourish1"
    newGameState.currentResolution.pop();

    unit.aether = 1;

    if (!unit.afflictions.burn) {
      //burn would otherwise instantly purge overgrowth
      unit.enhancements.overgrowth = true;
    }

    return newGameState;
  };

  const ambrosia1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Ambrosia"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

    //Spend 1 Blossom
    unit.blossom -= 1;

    enterSelectUnitMode(
      getZonesWithAllies(unit, 1, true),
      unit,
      newGameState,
      null,
      "ambrosia",
      null
    );

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
      case "fieryHeart1":
        return fieryHeart1(unit);
      case "fieryHeart2":
        return fieryHeart2(unit);

      //Water
      case "hydrotherapy1":
        return hydrotherapy1(unit);
      case "hydrotherapy2":
        return hydrotherapy2(unit);
      case "coldEmbrace1":
        return coldEmbrace1(unit);

      //Wind
      case "aeromancy1":
        return aeromancy1(unit);
      case "airDash1":
        return airDash1(unit);
      case "reapTheWhirlwind1":
        return reapTheWhirlwind1(unit);
      case "secondWind1":
        return secondWind1(unit);
      case "secondWind2":
        return secondWind2(unit);

      //Land
      case "saltTheEarth1":
        return saltTheEarth1(unit);
      case "mountainStance1":
        return mountainStance1(unit);
      case "fortify1":
        return fortify1(unit);
      case "leylineConvergence1":
        return leylineConvergence1(unit);

      //Lightning
      case "galvanize1":
        return galvanize1(unit);
      case "arcFlash1":
        return arcFlash1(unit);
      case "arcFlash2":
        return arcFlash2(unit);

      //Mana
      case "particleBeam1":
        return particleBeam1(unit);
      case "particleBeam2":
        return particleBeam2(unit);
      case "auraAmplication1":
        return auraAmplication1(unit);

      //Metal
      case "brandish1":
        return brandish1(unit);
      case "ballisticArmor1":
        return ballisticArmor1(unit);
      case "ballisticArmor2":
        return ballisticArmor2(unit);

      //Plant
      case "flourish1":
        return flourish1(unit);
      case "flourish2":
        return flourish2(unit);
      case "ambrosia1":
        return ambrosia1(unit);
    }
  };

  return { applyAbility };
};
