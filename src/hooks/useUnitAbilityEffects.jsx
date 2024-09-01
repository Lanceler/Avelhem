import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useCardDatabase } from "./useCardDatabase";
import { useRecurringEffects } from "./useRecurringEffects";

export const useUnitAbilityEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  const {
    canBlast,
    canMove,
    canStrike,
    drawSkill,
    enterSelectUnitMode,
    getVacant2SpaceZones,
    getZonesWithAllies,
    getZonesWithEnemies,
    isMuted,
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

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Afterburner1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 skill",
      restriction: null,
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

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Fiery Heart1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 skill",
      restriction: null,
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

  const hydrotherapy2 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Hydrotherapy1"
    newGameState.currentResolution.pop();

    newGameState = drawSkill(newGameState);

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

  const airDash1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Air Dash"
    newGameState.currentResolution.pop();

    //give unit activationCounter
    unit.temporary.activation
      ? (unit.temporary.activation += 1)
      : (unit.temporary.activation = 1);

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
      details: {
        restriction: ["03-02"],
        exclusion: [],
        searchTitle: "Reap the Whirlwind",
        searchMessage: "Search for 1 “Gale Conjuration”",
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

  const secondWind1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Second Wind" resolution
    newGameState.currentResolution.pop();

    if (
      !["03-01", "03-02", "03-03"].some((s) =>
        newGameState[self].skillVestige.includes(s)
      )
    ) {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Message To Player",
        player: self,
        title: "Second Wind",
        message: "You do not have any Wind skills to recover.",
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Recover Skill",
        player: self,
        restriction: ["03-01", "03-02", "03-03"],
        message: "You may recover then float 1 non-burst Wind skill.",
        outcome: "Float",
        canSkip: true,
      });
    }

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
      resolution: "Search Skill",
      player: self,
      details: {
        restriction: ["05-01", "05-02", "05-03"],
        exclusion: [],
        searchTitle: "Arc Flash",
        searchMessage: "Search for then float 1 non-burst Lightning skill",
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

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
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

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Particle Beam1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 skill",
      restriction: null,
    });

    return newGameState;
  };

  const particleBeam2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Particle Beam1"
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Particle Beam2",
      unit: unit,
    });

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

  const particleBeam3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Particle Beam2"
    newGameState.currentResolution.pop();

    if (unit && !isMuted(unit)) {
      unit.aether = 1;
    }

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

    unit.temporary.usedAmplifyAura = true;

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

    console.log(alliesWithAura);

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
      resolution: "Search Skill",
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

    unit.temporary.usedBallisticArmor = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Ballistic Armor1",
      unit: unit,
      details: {
        title: "Ballistic Armor",
        reason: "Ballistic Armor",
      },
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message:
        "Spend 1 skill and either 2 turns Shield or 2 turns of Ward to blast an adjacent enemy",
      restriction: null,
    });

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

    unit.temporary.usedFlourish = true;

    newGameState.currentResolution.push({
      resolution: "Unit Ability",
      resolution2: "Flourish1",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 2nd skill",
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.currentResolution.push({
      resolution: "Discard Skill",
      unit: unit,
      player: self,
      message: "Spend 1 skill",
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

  return {
    afterburner1,
    afterburner2,
    fieryHeart1,
    fieryHeart2,
    hydrotherapy1,
    hydrotherapy2,
    airDash1,
    coldEmbrace1,
    reapTheWhirlwind1,
    secondWind1,
    fortify1,
    leylineConvergence1,
    galvanize1,
    arcFlash1,
    arcFlash2,
    particleBeam1,
    particleBeam2,
    particleBeam3,
    auraAmplication1,
    brandish1,
    ballisticArmor1,
    flourish1,
    flourish2,
    ambrosia1,
  };
};
