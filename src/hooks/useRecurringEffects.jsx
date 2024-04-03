import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import gameState from "../redux/gameState";

import Advance from "../assets/diceIcons/Advance.png";
import Assault from "../assets/diceIcons/Assault.png";
import Invoke from "../assets/diceIcons/Invoke.png";
import Mobilize from "../assets/diceIcons/Mobilize.png";

export const useRecurringEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  //=========================================
  //Exported functions below

  const activateAegis = (newGameState, unit, victim) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "06-03",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Activating Aegis",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("06-03");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    //to do: alert opponent that contingent skill was used

    return newGameState;
  };

  const activateAvelhem = (newGameState, avelhem, resonator) => {
    //newGameState.currentResolution.pop() <--not needed

    newGameState.currentResolution.push({
      resolution: "Avelhem Conclusion",
      player: self,
      avelhem: avelhem,
      conclusion: "discard",
      resonator: resonator,
      resonatorConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Avelhem Select Pawn",
      player: self,
      avelhem: avelhem,
      resonator: resonator,
    });

    newGameState.activatingSkill.push(avelhem);

    if (resonator !== null) {
      newGameState.activatingResonator.push(resonator);
    }

    //newGameState.activatingUnit.push(null);

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    return newGameState;
  };

  const activateAerialImpetus = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    let conclusion = "discard";
    if (unit.boosts.ambidexterity) {
      conclusion = "float";
      delete newGameState[unit.player].units[unit.unitIndex].boosts
        .ambidexterity;
    }

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "03-01",
      conclusion: conclusion,
    });

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Activating Aerial Impetus",
      unit: unit,
    });

    newGameState.activatingSkill.push("03-01");
    newGameState.activatingUnit.push(unit);

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    return newGameState;
  };

  const activateArsenalOnslaught = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "07-04",
      conclusion: "shatter",
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Activating Arsenal Onslaught",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("07-04");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateBlazeOfGlory = (newGameState, unit) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "01-03",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Activating Blaze of Glory",
      // resolution: "Activating Blaze of Glory",
      unit: unit,
    });

    newGameState.activatingSkill.push("01-03");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    //to do: alert opponent that contingent skill was used

    return newGameState;
  };

  const activateCastleOfThorns = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "08-04",
      conclusion: "shatter",
    });

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Activating Castle of Thorns",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("08-04");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateCataclysmicTempest = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "03-04",
      conclusion: "shatter",
    });

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Activating Cataclysmic Tempest",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("03-04");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateChainLightning = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    let conclusion = "discard";
    if (unit.boosts.ambidexterity) {
      conclusion = "float";
      delete newGameState[unit.player].units[unit.unitIndex].boosts
        .ambidexterity;
    }

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "05-01",
      conclusion: conclusion,
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Activating Chain Lightning",
      unit: unit,
    });

    newGameState.activatingSkill.push("05-01");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    return newGameState;
  };

  const activateConflagration = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "01-02",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Activating Conflagration",
      // resolution: "Activating Conflagration",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("01-02");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateConflagrationAndResonate = (newGameState, unit, resonator) => {
    //end Select Resonator resolution
    newGameState.currentResolution.pop();

    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Resonance Conclusion",
      player: self,
      unit: unit,
      skill: "01-02",
      skillConclusion: "discard",
      resonator: resonator,
      resonatorConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Resonating Conflagration",
      // resolution: "Resonating Conflagration",
      unit: unit,
      resonator: resonator,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("01-02");
    newGameState.activatingResonator.push(resonator);
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateCrystallization = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    let conclusion = "discard";
    if (unit.boosts.ambidexterity) {
      conclusion = "float";
      delete newGameState[unit.player].units[unit.unitIndex].boosts
        .ambidexterity;
    }

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "04-01",
      conclusion: conclusion,
    });

    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Activating Crystallization",
      unit: unit,
    });

    newGameState.activatingSkill.push("04-01");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    return newGameState;
  };

  const activateDiffusion = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "06-02",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Activating Diffusion",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("06-02");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateDiffusionAndResonate = (newGameState, unit, resonator) => {
    //end Select Resonator resolution
    newGameState.currentResolution.pop();

    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Resonance Conclusion",
      player: self,
      unit: unit,
      skill: "06-02",
      skillConclusion: "discard",
      resonator: resonator,
      resonatorConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Resonating Diffusion",
      unit: unit,
      resonator: resonator,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("06-02");
    newGameState.activatingResonator.push(resonator);
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateDisruptionField = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "06-04",
      conclusion: "shatter",
    });

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Activating Disruption Field",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("06-04");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateEfflorescence = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "08-02",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Activating Efflorescence",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("08-02");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateEfflorescenceAndResonate = (newGameState, unit, resonator) => {
    //end Select Resonator resolution
    newGameState.currentResolution.pop();

    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Resonance Conclusion",
      player: self,
      unit: unit,
      skill: "08-02",
      skillConclusion: "discard",
      resonator: resonator,
      resonatorConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Resonating Efflorescence",
      unit: unit,
      resonator: resonator,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("08-02");
    newGameState.activatingResonator.push(resonator);
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateFatedRivalry = (newGameState, unit) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: null,
      skill: "SC-02",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Activating Fated Rivalry",
      player: self,
      unit: unit,
    });

    newGameState.activatingSkill.push("SC-02");
    newGameState.activatingUnit.push(null);

    return newGameState;
  };

  const activateFrenzyBlade = (newGameState, unit, victim) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "07-03",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Activating Frenzy Blade",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("07-03");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    //to do: alert opponent that contingent skill was used

    return newGameState;
  };

  const activateFrigidBreath = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "02-02",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Activating Frigid Breath",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("02-02");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateFrigidBreathAndResonate = (newGameState, unit, resonator) => {
    //end Select Resonator resolution
    newGameState.currentResolution.pop();

    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Resonance Conclusion",
      player: self,
      unit: unit,
      skill: "02-02",
      skillConclusion: "discard",
      resonator: resonator,
      resonatorConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Resonating Frigid Breath",
      unit: unit,
      resonator: resonator,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("02-02");
    newGameState.activatingResonator.push(resonator);
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateGaleConjuration = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "03-02",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Activating Gale Conjuration",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("03-02");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateGaleConjurationAndResonate = (
    newGameState,
    unit,
    resonator
  ) => {
    //end Select Resonator resolution
    newGameState.currentResolution.pop();

    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Resonance Conclusion",
      player: self,
      unit: unit,
      skill: "03-02",
      skillConclusion: "discard",
      resonator: resonator,
      resonatorConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Resonating Gale Conjuration",
      unit: unit,
      resonator: resonator,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("03-02");
    newGameState.activatingResonator.push(resonator);
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateGeomancy = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "04-04",
      conclusion: "shatter",
    });

    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Activating Geomancy",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("04-04");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateGlacialTorrent = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "02-04",
      conclusion: "shatter",
    });

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Activating Glacial Torrent",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("02-04");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateHealingRain = (newGameState, unit, victim) => {
    //end Triggering Survival Ally resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "02-03",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Activating Healing Rain",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("02-03");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    //to do: alert opponent that contingent skill was used

    return newGameState;
  };

  const activateIgnitionPropulsion = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    let conclusion = "discard";
    if (unit.boosts.ambidexterity) {
      conclusion = "float";
      delete newGameState[unit.player].units[unit.unitIndex].boosts
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
      resolution: "Fire Skill",
      resolution2: "Activating Ignition Propulsion",
      // resolution: "Activating Ignition Propulsion",
      unit: unit,
    });

    newGameState.activatingSkill.push("01-01");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    return newGameState;
  };

  const activateMagneticShockwave = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    let conclusion = "discard";
    if (unit.boosts.ambidexterity) {
      conclusion = "float";
      delete newGameState[unit.player].units[unit.unitIndex].boosts
        .ambidexterity;
    }

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "07-01",
      conclusion: conclusion,
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Activating Magnetic Shockwave",
      unit: unit,
    });

    newGameState.activatingSkill.push("07-01");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    return newGameState;
  };

  const activateMatchMadeInHeaven = (newGameState, unit) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: null,
      skill: "SC-03",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Activating Match Made In Heaven",
      player: self,
      unit: unit,
    });

    newGameState.activatingSkill.push("SC-03");
    newGameState.activatingUnit.push(null);

    return newGameState;
  };

  const activatePitfallTrap = (newGameState, unit, victim) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "04-03",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Activating Pitfall Trap",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("04-03");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    //to do: alert opponent that contingent skill was used

    return newGameState;
  };

  const activatePurification = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    let conclusion = "discard";
    if (unit.boosts.ambidexterity) {
      conclusion = "float";
      delete newGameState[unit.player].units[unit.unitIndex].boosts
        .ambidexterity;
    }

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "02-01",
      conclusion: conclusion,
    });

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Activating Purification",
      unit: unit,
    });

    newGameState.activatingSkill.push("02-01");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    return newGameState;
  };

  const activateResplendence = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "01-04",
      conclusion: "shatter",
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Activating Resplendence",
      // resolution: "Activating Resplendence",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("01-04");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateReinforce = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "07-02",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Activating Reinforce",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("07-02");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateReinforceAndResonate = (newGameState, unit, resonator) => {
    //end Select Resonator resolution
    newGameState.currentResolution.pop();

    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Resonance Conclusion",
      player: self,
      unit: unit,
      skill: "07-02",
      skillConclusion: "discard",
      resonator: resonator,
      resonatorConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Resonating Reinforce",
      unit: unit,
      resonator: resonator,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("07-02");
    newGameState.activatingResonator.push(resonator);
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateSymphonicScreech = (newGameState, unit, victim) => {
    //remove symphonic screech from hand but do not discard
    newGameState[self].skillHand.splice(
      newGameState[self].skillHand.indexOf("03-03"),
      1
    );

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "03-03",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Activating Symphonic Screech",
      unit: unit,
      victim: victim,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("03-03");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateSkill = (newGameState, unit, skill) => {
    switch (skill) {
      case "01-01":
        return activateIgnitionPropulsion(newGameState, unit);
      case "01-02":
        return activateConflagration(newGameState, unit);
      case "01-04":
        return activateResplendence(newGameState, unit);

      case "02-01":
        return activatePurification(newGameState, unit);
      case "02-02":
        return activateFrigidBreath(newGameState, unit);
      case "02-04":
        return activateGlacialTorrent(newGameState, unit);

      case "03-01":
        return activateAerialImpetus(newGameState, unit);
      case "03-02":
        return activateGaleConjuration(newGameState, unit);
      case "03-04":
        return activateCataclysmicTempest(newGameState, unit);

      case "04-01":
        return activateCrystallization(newGameState, unit);
      case "04-02":
        return activateUpheaval(newGameState, unit);
      case "04-04":
        return activateGeomancy(newGameState, unit);

      case "05-01":
        return activateChainLightning(newGameState, unit);
      case "05-02":
        return activateZipAndZap(newGameState, unit);
      case "05-04":
        return activateValiantSpark(newGameState, unit);

      case "06-01":
        return activateSurge(newGameState, unit);
      case "06-02":
        return activateDiffusion(newGameState, unit);
      case "06-04":
        return activateDisruptionField(newGameState, unit);

      case "07-01":
        return activateMagneticShockwave(newGameState, unit);
      case "07-02":
        return activateReinforce(newGameState, unit);
      case "07-04":
        return activateArsenalOnslaught(newGameState, unit);

      case "08-01":
        return activateSowAndReap(newGameState, unit);
      case "08-02":
        return activateEfflorescence(newGameState, unit);
      case "08-04":
        return activateCastleOfThorns(newGameState, unit);

      default:
        return newGameState;
    }
  };

  const activateSkillAndResonate = (newGameState, unit, skill, resonator) => {
    switch (skill) {
      case "01-02":
        return activateConflagrationAndResonate(newGameState, unit, resonator);
      case "02-02":
        return activateFrigidBreathAndResonate(newGameState, unit, resonator);
      case "03-02":
        return activateGaleConjurationAndResonate(
          newGameState,
          unit,
          resonator
        );
      case "04-02":
        return activateUpheavalAndResonate(newGameState, unit, resonator);
      case "05-02":
        return activateZipAndZapAndResonate(newGameState, unit, resonator);
      case "06-02":
        return activateDiffusionAndResonate(newGameState, unit, resonator);
      case "07-02":
        return activateReinforceAndResonate(newGameState, unit, resonator);
      case "08-02":
        return activateEfflorescenceAndResonate(newGameState, unit, resonator);

      default:
        return newGameState;
    }
  };

  const activateSowAndReap = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    let conclusion = "discard";
    if (unit.boosts.ambidexterity) {
      conclusion = "float";
      delete newGameState[unit.player].units[unit.unitIndex].boosts
        .ambidexterity;
    }

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "08-01",
      conclusion: conclusion,
    });

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Activating Sow And Reap",
      unit: unit,
    });

    newGameState.activatingSkill.push("08-01");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    return newGameState;
  };

  const activateSovereignSkill = (newGameState, skill) => {
    const activateTemplate = (newGameState, skill, resolution, resolution2) => {
      newGameState.currentResolution.push({
        resolution: "Skill Conclusion",
        player: self,
        unit: null,
        skill: skill,
        conclusion: "discard",
      });

      newGameState.currentResolution.push({
        resolution: resolution,
        resolution2: resolution2,
        player: self,
      });

      newGameState.activatingSkill.push(skill);
      newGameState.activatingUnit.push(null);

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });

      return newGameState;
    };

    switch (skill) {
      case "SA-03":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Standard Skill",
          "Activating Dark Halo"
        );

      case "SB-02":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Ambidexterity"
        );

      default:
        return newGameState;
    }
  };

  const activateSovereignSkillAndResonate = (
    newGameState,
    skill,
    resonator
  ) => {
    //end Select Resonator resolution
    newGameState.currentResolution.pop();

    const activateResonanceTemplate = (
      newGameState,
      skill,
      resolution,
      resolution2,
      resonator,
      defaultConclusion
    ) => {
      if (resonator === "SA-01") {
        newGameState.currentResolution.push({
          resolution: "Sovereign Resonant Skill",
          resolution2: "Heirs Endeavor Resonance",
          player: self,
        });
      }

      let skillConclusion = "discard";

      if (defaultConclusion === "retain" && resonator !== "SA-02") {
        skillConclusion = defaultConclusion;
      }

      newGameState.currentResolution.push({
        resolution: "Resonance Conclusion",
        player: self,
        unit: null,
        skill: skill,
        skillConclusion: skillConclusion, // either retain or discard
        resonator: resonator,
        resonatorConclusion: "discard",
      });

      if (defaultConclusion === "float" && resonator !== "SA-02") {
        newGameState.currentResolution.push({
          resolution: "May float resonant skill",
          player: self,
          skill: skill,
          resonator: resonator,
        });
      }

      newGameState.currentResolution.push({
        resolution: resolution,
        resolution2: resolution2,
        player: self,
        resonator: resonator,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });

      newGameState.activatingSkill.push(skill);
      newGameState.activatingResonator.push(resonator);
      newGameState.activatingUnit.push(null);

      return newGameState;
    };

    switch (skill) {
      case "SB-02":
        return activateResonanceTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Ambidexterity",
          resonator,
          "float"
        );

      default:
        return newGameState;
    }
  };

  const activateSurge = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    let conclusion = "discard";
    if (unit.boosts.ambidexterity) {
      conclusion = "float";
      delete newGameState[unit.player].units[unit.unitIndex].boosts
        .ambidexterity;
    }

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "06-01",
      conclusion: conclusion,
    });

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Activating Surge",
      unit: unit,
    });

    newGameState.activatingSkill.push("06-01");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    return newGameState;
  };

  const activateThunderThaumaturge = (newGameState, unit, attacker) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "05-03",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Activating Thunder Thaumaturge",
      unit: unit,
      attacker: attacker,
    });

    newGameState.activatingSkill.push("05-03");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    //to do: alert opponent that contingent skill was used

    return newGameState;
  };

  const activateUpheaval = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "04-02",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Activating Upheaval",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("04-02");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateUpheavalAndResonate = (newGameState, unit, resonator) => {
    //end Select Resonator resolution
    newGameState.currentResolution.pop();

    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Resonance Conclusion",
      player: self,
      unit: unit,
      skill: "04-02",
      skillConclusion: "discard",
      resonator: resonator,
      resonatorConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Resonating Upheaval",
      unit: unit,
      resonator: resonator,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("04-02");
    newGameState.activatingResonator.push(resonator);
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateValiantSpark = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "05-04",
      conclusion: "shatter",
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Activating Valiant Spark",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("05-04");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateViridianGrave = (newGameState, unit, victim) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "08-03",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Activating Viridian Grave",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("08-03");
    newGameState.activatingUnit.push(unit);

    if (triggerScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Screech",
        player: enemy,
        activator: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: enemy,
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Animation Delay",
        priority: self,
      });
    }

    //to do: alert opponent that contingent skill was used

    return newGameState;
  };

  const activateZipAndZap = (newGameState, unit) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "05-02",
      conclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Activating Zip and Zap",
      unit: unit,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("05-02");
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const activateZipAndZapAndResonate = (newGameState, unit, resonator) => {
    //end Select Resonator resolution
    newGameState.currentResolution.pop();

    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Resonance Conclusion",
      player: self,
      unit: unit,
      skill: "05-02",
      skillConclusion: "discard",
      resonator: resonator,
      resonatorConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Resonating Zip And Zap",
      unit: unit,
      resonator: resonator,
    });

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: self,
    });

    newGameState.activatingSkill.push("05-02");
    newGameState.activatingResonator.push(resonator);
    newGameState.activatingUnit.push(unit);

    return newGameState;
  };

  const applyBurn = (newGameState, victimInfo) => {
    //Update info
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    if (victim.enhancements.ward) {
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .ward;
    } else if (
      !(
        !isMuted(victim) &&
        ["Fire Scion", "Water Scion"].includes(victim.unitClass)
      )
    ) {
      newGameState[victim.player].units[victim.unitIndex].afflictions.burn = 1;

      //burn gives frostbite immunity and purges overgrowth

      delete newGameState[victim.player].units[victim.unitIndex].afflictions
        .frostbite;
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .overgrowth;
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .proliferation;
    }

    return newGameState;
  };

  const applyDamage = (
    newGameState,
    attackerInfo,
    victimInfo,
    type,
    special
  ) => {
    //Update info
    let attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    let newZoneInfo = JSON.parse(newGameState.zones);

    //this can happen with effects like thunder thaumaturge
    if (attacker === null || isMuted(attacker)) {
      return newGameState;
      // to do: Maybe push a resolution that displays a message
    }

    if (["Diffusion"].includes(special)) {
      attacker.temporary.previousTarget = victim.unitIndex;
    }

    //checkBypassShield
    let bypassShield = false;
    switch (true) {
      case victim.afflictions.frostbite > 0 &&
        attacker.unitClass === "Water Scion":
        bypassShield = true;
        break;
      case attacker.sharpness === 2 && type === "strike":
        bypassShield = true;
        break;
      case special === "sowAndReapBlast":
        bypassShield = true;
        break;
      default:
        break;
    }

    //calculate AP
    let aP = 1;
    switch (true) {
      case victim.afflictions.anathema > 0:
        aP = 5;
        break;
      case ["Geomancy", "Surge"].includes(special):
        aP = 2;
        break;
      case special === "Fire Scion" &&
        victim.unitClass === "Fire Scion" &&
        !isMuted(victim):
        aP = 0;
        break;

      case special === "Lightning Scion" &&
        victim.unitClass === "Lightning Scion" &&
        !isMuted(victim):
        aP = 0;
        break;

      default: //apply AP modifiers
        if (attacker.boosts.galeConjuration === true) {
          aP = 2;
        }
        if (attacker.sharpness > 0) {
          aP += attacker.sharpness;
        }
        if (victim.temporary.adamantArmor === true) {
          aP = Math.max(0, aP - 1);
          delete newGameState[victim.player].units[victim.unitIndex].temporary
            .adamantArmor;
        }
        if (special === "Virtue-blast-blocked") {
          aP = Math.max(0, aP - 1);
        }
        break;
    }

    //remove attacker's boosts
    if (attacker.boosts.galeConjuration) {
      delete newGameState[attacker.player].units[attacker.unitIndex].boosts
        .galeConjuration;
    }

    //reduce HP
    switch (true) {
      case victim.enhancements.ward > 0:
        delete newGameState[victim.player].units[victim.unitIndex].enhancements
          .ward;
        break;
      case bypassShield && victim.enhancements.shield > 0:
        delete newGameState[victim.player].units[victim.unitIndex].enhancements
          .shield;
        delete newGameState[victim.player].units[victim.unitIndex].enhancements
          .disruption;
        newGameState[victim.player].units[victim.unitIndex].hp = victim.hp - aP;
        break;
      case victim.enhancements.shield > 0:
        delete newGameState[victim.player].units[victim.unitIndex].enhancements
          .shield;
        delete newGameState[victim.player].units[victim.unitIndex].enhancements
          .disruption;
        break;
      default:
        newGameState[victim.player].units[victim.unitIndex].hp = victim.hp - aP;
        break;
    }

    //survival or elimination
    if (newGameState[victim.player].units[victim.unitIndex].hp > 0) {
      const pushSurvivalResolution = (
        resolution2,
        player,
        victim,
        attacker
      ) => {
        newGameState.currentResolution.push({
          resolution: "Triggering Contingent Skill",
          resolution2,
          player,
          victim,
          attacker,
        });
      };

      if (newGameState.turnPlayer === victim.player) {
        if (triggerSurvivalAlly(victim)) {
          pushSurvivalResolution(
            "Triggering Survival Ally",
            victim.player,
            victim,
            attacker
          );
        }

        if (triggerSurvivalEnemy(victim)) {
          pushSurvivalResolution(
            "Triggering Survival Enemy",
            victim.player === "host" ? "guest" : "host",
            victim,
            attacker
          );
        }
      } else {
        if (triggerSurvivalEnemy(victim)) {
          pushSurvivalResolution(
            "Triggering Survival Enemy",
            victim.player === "host" ? "guest" : "host",
            victim,
            attacker
          );
        }

        if (triggerSurvivalAlly(victim)) {
          pushSurvivalResolution(
            "Triggering Survival Ally",
            victim.player,
            victim,
            attacker
          );
        }
      }
    } else {
      // Grant Bounty Points
      const playerBP = victim.player === "guest" ? "host" : "guest";
      newGameState[playerBP].bountyPoints = Math.min(
        10,
        newGameState[playerBP].bountyPoints + 1
      );

      //remove eliminated unit
      newGameState[victim.player].units[victim.unitIndex] = null;
      newZoneInfo[victim.row][victim.column].player = null;
      newZoneInfo[victim.row][victim.column].unitIndex = null;
      newGameState.zones = JSON.stringify(newZoneInfo);

      //"If the attack was lethal" effects

      if (special === "Gale Conjuration Strike") {
        newGameState[attacker.player].units[
          attacker.unitIndex
        ].temporary.galeConjurationLethal = true;
      }

      if (special === "Geomancy") {
        newGameState[attacker.player].units[
          attacker.unitIndex
        ].temporary.geomancyLethal = true;
      }

      //strike movement
      if (type === "strike") {
        newGameState.currentResolution.push({
          resolution: "Strike Movement",
          attacker: attacker,
          zone: victim.row * 5 + victim.column,
        });
      }

      //elimination contingency
      const pushEliminationResolution = (resolution2, player, unit) => {
        newGameState.currentResolution.push({
          resolution: "Triggering Contingent Skill",
          resolution2,
          player,
          unit,
        });
      };

      if (newGameState.turnPlayer === victim.player) {
        if (triggerEliminationAlly(victim)) {
          pushEliminationResolution(
            "Triggering Elimination Ally",
            victim.player,
            victim
          );
        }
        if (triggerEliminationEnemy(victim)) {
          pushEliminationResolution(
            "Triggering Elimination Enemy",
            victim.player === "host" ? "guest" : "host",
            victim
          );
        }
      } else {
        if (triggerEliminationEnemy(victim)) {
          pushEliminationResolution(
            "Triggering Elimination Enemy",
            victim.player === "host" ? "guest" : "host",
            victim
          );
        }
        if (triggerEliminationAlly(victim)) {
          pushEliminationResolution(
            "Triggering Elimination Ally",
            victim.player,
            victim
          );
        }
      }

      //elimination talents
      //to do: elimination talents

      //Anathema-delay for non-pawns & non-ravagers
      if (
        !(
          newGameState[attacker.player].units[attacker.unitIndex].unitClass ===
            "Pawn" ||
          newGameState[attacker.player].units[attacker.unitIndex].enhancements
            .ravager
        )
      ) {
        newGameState[attacker.player].units[
          attacker.unitIndex
        ].temporary.anathemaDelay = true;
      }
    }

    return newGameState;
  };

  const applyFrostbite = (newGameState, victimInfo, duration) => {
    //Update info
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    if (victim.enhancements.ward) {
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .ward;
    } else if (
      //burning units are immune
      !victim.afflictions.burn > 0 &&
      //Fire, Water, and Lightning Scions are immune
      !(
        !isMuted(victim) &&
        ["Fire Scion", "Water Scion", "Lightning Scion"].includes(
          victim.unitClass
        )
      )
    ) {
      if (
        newGameState[victim.player].units[victim.unitIndex].afflictions
          .frostbite > 0
      ) {
        newGameState[victim.player].units[
          victim.unitIndex
        ].afflictions.frostbite = Math.max(
          newGameState[victim.player].units[victim.unitIndex].afflictions
            .frostbite,
          duration
        );
      } else {
        newGameState[victim.player].units[
          victim.unitIndex
        ].afflictions.frostbite = duration;
      }

      //frostbite purges boosts, disruption, overgrowth, & proliferation
      newGameState[victim.player].units[victim.unitIndex].boosts = {};
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .disruption;
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .overgrowth;
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .proliferation;
    }

    return newGameState;
  };

  const applyParalysis = (
    newGameState,
    attackerInfo,
    victimInfo,
    duration,
    special
  ) => {
    //Update info
    let attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];
    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //this can happen with effects like thunder thaumaturge
    if (attacker === null || isMuted(attacker)) {
      return newGameState;
      // to do: Maybe push a resolution that displays a message
    }

    if (
      [
        "Cataclysmic Tempest",
        "Upheaval",
        "ChainLightningParalysis",
        "MagneticShockwave1stParalysis",
      ].includes(special)
    ) {
      attacker.temporary.previousTarget = victim.unitIndex;
    }

    switch (true) {
      case victim.enhancements.ward > 0:
        delete victim.enhancements.ward;
        break;
      case victim.unitClass === "Land Scion" &&
        victim.hp > 1 &&
        !isMuted(victim):
        break;
      case victim.unitClass === "Lightning Scion" &&
        victim.charges > 2 &&
        !isMuted(victim):
        break;
      case ["Upheaval", "Pitfall Trap"].includes(special) &&
        ["Wind Scion", "Land Scion"].includes(victim.unitClass) &&
        !isMuted(victim):
        break;
      case special === "Cataclysmic Tempest" &&
        victim.unitClass === "Wind Scion" &&
        !isMuted(victim):
        break;
      case special === "Geomancy" &&
        victim.unitClass === "Land Scion" &&
        !isMuted(victim):
        break;
      case ["ChainLightningParalysis", "Thunder Thaumaturge"].includes(
        special
      ) &&
        victim.unitClass === "Lightning Scion" &&
        !isMuted(victim):
        break;

      default:
        victim.boosts = {};

        victim.afflictions.paralysis
          ? (victim.afflictions.paralysis = Math.max(
              victim.afflictions.paralysis,
              duration
            ))
          : (victim.afflictions.paralysis = duration);

        //paralysis purges boosts, disruption, overgrowth, & proliferation
        victim.boosts = {};
        delete victim.enhancements.disruption;
        delete victim.enhancements.overgrowth;
        delete victim.enhancements.proliferation;

        //If Cataclysmic Tempest
        if (special === "Cataclysmic Tempest") {
          attacker.temporary.cataclysmicFloat += 1;
        }

        //If PitfallTrap Succeeded
        if (special === "Pitfall Trap") {
          attacker.temporary.pitfallTrapBlast = true;
        }

        newGameState[attackerInfo.player].units[attackerInfo.unitIndex] =
          attacker;

        newGameState[victimInfo.player].units[victimInfo.unitIndex] = victim;

        break;
    }

    return newGameState;
  };

  const ascendPawn = (
    newGameState,
    pawn,
    scionClass,
    method,
    resonator,
    unit2
  ) => {
    // let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[pawn.player].units[pawn.unitIndex];

    unit.unitClass = scionClass;

    newGameState[pawn.player].units[pawn.unitIndex] = unit; // will do this twice

    if (resonator !== null) {
      newGameState.currentResolution.push({
        resolution: "Avelhem Resonance",
        unit: unit,
        resonator: resonator,
      });
    }

    switch (method) {
      case "Fated Rivalry":
        newGameState.currentResolution.push({
          resolution: "Sovereign Contingent Skill",
          resolution2: "Fated Rivalry2",
          unit: unit,
          enemy: unit2,
        });

        break;

      case "Match Made in Heaven":
        newGameState.currentResolution.push({
          resolution: "Sovereign Contingent Skill",
          resolution2: "Match Made in Heaven2",
          unit: unit,
          unit2: unit2,
        });

        break;
    }

    // if (method === "Match Made in Heaven") {
    //   newGameState.currentResolution.push({
    //     resolution: "Sovereign Contingent Skill",
    //     resolution2: "Match Made in Heaven2",
    //     unit: unit,
    //     unit2: unit2,
    //   });
    // }

    //ascension contingency trigger
    const pushAscensionResolution = (
      resolution2,
      player,
      unit,
      scionClass,
      method
    ) => {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2,
        player,
        unit,
        scionClass,
        method,
      });
    };
    if (newGameState.turnPlayer === unit.player) {
      if (triggerAscensionAlly(newGameState, unit, scionClass, method)) {
        pushAscensionResolution(
          "Triggering Ascension Ally",
          unit.player,
          unit,
          scionClass,
          method
        );
      }

      if (
        newGameState[enemy].skillHand.length > 0 &&
        triggerAscensionEnemy(newGameState, unit, scionClass, method)
      ) {
        pushAscensionResolution(
          "Triggering Ascension Enemy",
          unit.player === "host" ? "guest" : "host",
          unit,
          scionClass,
          method
        );
      }
    } else {
      if (
        newGameState[enemy].skillHand.length > 0 &&
        triggerAscensionEnemy(newGameState, unit, scionClass, method)
      ) {
        pushAscensionResolution(
          "Triggering Ascension Enemy",
          unit.player === "host" ? "guest" : "host",
          unit,
          scionClass,
          method
        );
      }

      if (triggerAscensionAlly(newGameState, unit, scionClass, method)) {
        pushAscensionResolution(
          "Triggering Ascension Ally",
          unit.player,
          unit,
          scionClass,
          method
        );
      }
    }

    switch (scionClass) {
      case "Fire Scion":
        delete unit.afflictions.burn;

        newGameState.activatingUnit.push(unit);
        // newGameState.activatingSkill.push(???)
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: unit,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Activating Flash Fire",
          unit: unit,
          details: {
            title: "Flash Fire",
            reason: "Flash Fire",
          },
        });
        break;
      case "Water Scion":
        delete unit.afflictions.burn;

        newGameState.activatingUnit.push(unit);
        // newGameState.activatingSkill.push(???)
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: unit,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Activating Kleptothermy",
          unit: unit,
          details: {
            title: "Kleptothermy",
            reason: "Kleptothermy",
          },
        });
        break;
      case "Land Scion":
        newGameState.activatingUnit.push(unit);
        // newGameState.activatingSkill.push(???)
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: unit,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Activating Mountain Stance",
          unit: unit,
          details: {
            title: "Mountain Stance",
            reason: "Mountain Stance",
          },
        });
        break;
      case "Lightning Scion":
        newGameState.activatingUnit.push(unit);
        // newGameState.activatingSkill.push(???)
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: unit,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Activating Lightning Rod",
          unit: unit,
          details: {
            title: "Lightning Rod",
            message: "You may spend 1 skill to gain 1 Charge (Max.3).",
            restriction: null,
            reason: "Lightning Rod",
          },
        });
        break;
      case "Metal Scion":
        newGameState.activatingUnit.push(unit);
        // newGameState.activatingSkill.push(???)
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: unit,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Activating Conduction",
          player: self,
          unit: unit,
          details: {
            reason: "Conduction",
            title: "Conduction",
            message: "You may search for then float 1 “Magnetic Shockwave”.",
            no: "Skip",
            yes: "Search",
          },
        });
        break;
    }

    newGameState[pawn.player].units[pawn.unitIndex] = unit; // doing this a second time

    return newGameState;
  };

  const assignTactics = (newGameState, first, second) => {
    newGameState.tactics = [first, second];

    return newGameState;
  };

  const avelhemResonance = (unitInfo, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    newGameState.currentResolution.pop();

    unit.enhancements.ravager = true;
    newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;

    if (resonator === "SA-02") {
      newGameState = drawSkill(newGameState);
    } else {
      newGameState.currentResolution.push({
        resolution: "You May Shuffle Avelhem",
        player: self,
        details: {
          reason: "Avelhem Resonance Shuffle",
          title: "Avelhem Resonance",
          message: "You may shuffle this Avelhem into your repertoire.",
          no: "Discard",
          yes: "Shuffle",
        },
      });
    }

    return newGameState;
  };

  const avelhemToScion = (avelhem) => {
    switch (avelhem) {
      case 1:
        return "Fire Scion";
      case 2:
        return "Water Scion";
      case 3:
        return "Wind Scion";
      case 4:
        return "Land Scion";
      case 5:
        return "Lightning Scion";
      case 6:
        return "Mana Scion";
      case 7:
        return "Metal Scion";
      case 8:
        return "Plant Scion";
      default:
        return null;
    }
  };

  const blast = (newGameState, attacker, victim, special) => {
    newGameState.currentResolution.push({
      resolution: "Apply Damage",
      attacker: attacker,
      victim: victim,
      special: special,
      type: "blast",
    });

    //to do in the future: consider bypass Target and Adamant Armor
    if (triggerTarget(attacker, victim, "blast")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "virtue-blast",
      });
    }

    return newGameState;
  };

  const canActivateResonance = (unit, skill) => {
    //only non-burst skills can be activated if disrupted
    if (isMuted(unit) || isDisrupted(unit, 1)) {
      return false;
    }

    const canDiffusionR = (unit) => {
      if (getZonesWithEnemies(unit, 1).length < 1) {
        return false;
      }

      if (
        ["Assault", "Invoke", "Advance"].includes(
          localGameState.tactics[0].face
        ) &
        (localGameState.tactics[0].stock > 0)
      ) {
        //to-do: maybe consider unit has used tactic? then again, it normally wont be an issue

        return true;
      }

      if (
        ["Assault", "Invoke", "Advance"].includes(
          localGameState.tactics[1].face
        ) &
        (localGameState.tactics[1].stock > 0)
      ) {
        return true;
      }

      return false;
    };

    switch (skill) {
      case "01-02":
        return (
          canActivateSkill(unit, skill) &&
          localGameState[unit.player].skillHand.length > 2
        );

      case "02-02":
        return canActivateSkill(unit, skill);

      case "03-02":
        return canActivateSkill(unit, skill);

      case "04-02":
        return canActivateSkill(unit, skill);

      case "05-02":
        return unit.charge > 0 && canMove(unit); // needs ONE charge

      case "06-02":
        return canDiffusionR(unit);

      case "07-02":
        return canActivateSkill(unit, skill);

      case "08-02":
        return canActivateSkill(unit, skill);

      default:
        return false;
    }
  };

  const canActivateSkill = (unit, skill) => {
    if (isMuted(unit)) {
      return false;
    }

    //only non-burst skills can be activated if disrupted
    if (
      isDisrupted(unit, 1) &&
      ![
        "01-04",
        "02-04",
        "03-04",
        "04-04",
        "05-04",
        "06-04",
        "07-04",
        "08-04",
      ].includes(skill)
    ) {
      return false;
    }

    const canAerialImpetus = (unit) => {
      if (getZonesWithEnemies(unit, 1).length > 0) {
        return true;
      }

      if (getZonesAerialImpetusAlly(unit).length > 0) {
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

    const canDiffusion = (unit) => {
      if (getZonesWithEnemies(unit, 1).length < 1) {
        return false;
      }

      if (
        ["Assault", "Invoke"].includes(localGameState.tactics[0].face) &
        (localGameState.tactics[0].stock > 0)
      ) {
        //to-do: maybe consider unit has used tactic? then again, it normally wont be an issue

        return true;
      }

      if (
        ["Assault", "Invoke"].includes(localGameState.tactics[1].face) &
        (localGameState.tactics[1].stock > 0)
      ) {
        return true;
      }

      return false;
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

    const canSurge = () => {
      //to-do: maybe consider unit has used tactic? then again, it normally wont be an issue

      if (
        localGameState.tactics[0].face === "Assault" &&
        localGameState.tactics[0].stock > 0
      ) {
        return true;
      }

      if (
        localGameState.tactics[1].face === "Assault" &&
        localGameState.tactics[1].stock > 0
      ) {
        return true;
      }

      return false;
    };

    switch (skill) {
      case "01-01":
        return canIgnitionPropulsion(unit);
      case "01-02":
        return canConflagration(unit);
      case "01-03":
        return false;
      case "01-04":
        return true;

      case "02-01":
        return true;
      case "02-02":
        return getZonesWithEnemies(unit, 2).length > 0 ? true : false;
      case "02-03":
        return false;
      case "02-04":
        return true;

      case "03-01":
        return canAerialImpetus(unit);
      case "03-02":
        return true;
      case "03-03":
        return false;
      case "03-04":
        return getZonesWithEnemies(unit, 1).length > 0 ? true : false;

      case "04-01":
        return true;
      case "04-02":
        return getZonesWithEnemies(unit, 1).length > 0 ? true : false;
      case "04-03":
        return false;
      case "04-04":
        return true;

      case "05-01":
        return getZonesWithEnemies(unit, 1).length > 0 ? true : false;
      case "05-02":
        return unit.charge > 1 && canMove(unit); // needs TWO charges
      case "05-03":
        return false;
      case "05-04":
        return true;

      case "06-01":
        return canSurge();
      case "06-02":
        return canDiffusion(unit);
      case "06-03":
        return false;
      case "06-04":
        return localGameState[self].skillHand.length >= 2; // need 2 cards: skill itself + 1 discard

      case "07-01":
        return getZonesWithEnemies(unit, 1).length > 0 ? true : false;
      case "07-02":
        return true;
      case "07-03":
        return false;
      case "07-04":
        return canStrike(unit);

      case "08-01":
        return canSowAndReapBlast(unit) || canSowAndReapStrike(unit);
      case "08-02":
        return true;
      case "08-03":
        return false;
      case "08-04":
        return true;

      default:
        return false;
    }
  };

  const canActivateSovereignSkill = (skill) => {
    const canHeirsEndeavor = () => {
      if (localGameState[self].fateDefiances < 1) {
        return false;
      }

      const vestige = localGameState[self].skillVestige;

      for (let skill of vestige) {
        if (skill[0] === "S" && skill !== "SA-01") {
          return true;
        }
      }
      return false;
    };

    const canPressTheAttack = () => {
      if (
        localGameState.tactics[0].face !== "Advance" ||
        localGameState.tactics[0].stock < 1
      ) {
        return false;
      }

      if (
        localGameState.tactics[1].face !== "Advance" ||
        localGameState.tactics[1].stock < 1
      ) {
        return false;
      }

      return true;
    };

    const canPowerAtTheFinalHourProaction = () => {
      const skillHand = localGameState[self].skillHand;

      for (let skill of skillHand) {
        const skillCode = skill.substring(0, 2);

        if (isNaN(parseInt(skillCode))) {
          break;
        } else {
          if ((localGameState, self, avelhemToScion(parseInt(skillCode)))) {
            return true;
          }
        }
      }
      return false;
    };

    switch (skill) {
      case "SA-01": //Heir's Endeavor
        return canHeirsEndeavor();
      case "SA-02": // Tea for Two
        return true;
      case "SA-03": // Dark Halo
        return hasScion(self);

      case "SA-04": // Reminiscence
        return (
          localGameState[self].skillVestige.length > 0 ||
          localGameState[self].avelhemVestige.length
        );

      case "SA-05": // Foreshadow
        return true;

      case "SB-01": // Transmute
        return hasScionSkill();

      case "SB-02": // Ambidexterity
        return hasScion(self);

      case "SB-03": // Providence
        return hasTactic(["Invoke"]);

      case "SB-04": // Fervent Prayer
        return true;

      case "SB-05": // Press the Attack
        return canPressTheAttack();

      default:
        return false;
    }
  };

  const canActivateSovereignResonance = (skill) => {
    switch (skill) {
      case "SB-01": // Transmute
        return canActivateSovereignSkill("SB-01");

      case "SB-02": // Ambidexterity
        return canActivateSovereignSkill("SB-02");

      case "SB-03": // Providence
        return canActivateSovereignSkill("SB-03");

      case "SB-04": // Fervent Prayer
        return canActivateSovereignSkill("SB-04");

      case "SB-05": // Press the Attack
        return canActivateSovereignSkill("SB-05");

      default:
        return false;
    }
  };

  const canAscend = (newGameState, team, scionClass) => {
    let scionCount = 0;
    let unmutedPawns = 0;
    for (let unit of newGameState[team].units) {
      if (unit !== null) {
        if (unit.unitClass === scionClass) {
          scionCount += 1;
          if (scionCount > 1) {
            break;
          }
        } else if (!isMuted(unit) && unit.unitClass === "Pawn") {
          unmutedPawns += 1;
        }
      }
    }

    return unmutedPawns > 0 && scionCount < 2;
  };

  const canBlast = (unit) => {
    if (getZonesWithEnemies(unit, 1).length && !isMuted(unit)) {
      return true;
    }
    return false;
  };

  const canMove = (unit) => {
    if (getVacantAdjacentZones(unit).length > 0) {
      return true;
    }

    return false;
  };

  const canSowAndReapBlast = (unitInfo) => {
    const adjacentEnemies = getZonesWithEnemies(unitInfo, 1);
    const zones = JSON.parse(localGameState.zones);

    for (let i of adjacentEnemies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const enemy = localGameState[zone.player].units[zone.unitIndex];

      if (isRooted(enemy)) {
        return true;
      }
    }

    return false;
  };

  const canSowAndReapStrike = (unitInfo) => {
    const adjacentAllies = getZonesWithAllies(unitInfo, 1, false); // excludes self
    const zones = JSON.parse(localGameState.zones);

    for (let i of adjacentAllies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const ally = localGameState[zone.player].units[zone.unitIndex];

      if (canStrike(ally) && canSowAndReapBlast(ally)) {
        return true;
      }
    }

    return false;
  };

  const canStrike = (unit) => {
    return (
      getZonesWithEnemies(unit, 1).length && !isMuted(unit) && !isRooted(unit)
    );
  };

  const decrementStatuses = (unit) => {
    unit.afflictions.anathema ? unit.afflictions.anathema-- : null;
    unit.afflictions.paralysis ? unit.afflictions.paralysis-- : null;
    unit.afflictions.frostbite ? unit.afflictions.frostbite-- : null;

    unit.enhancements.shield ? unit.enhancements.shield-- : null;
    unit.enhancements.ward ? unit.enhancements.ward-- : null;

    unit.enhancements.disruption ? unit.enhancements.disruption-- : null;
    unit.enhancements.proliferation ? unit.enhancements.proliferation-- : null;

    unit.temporary = {};
    unit.boosts = {};

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

    //If deck empties, shuffle discard pile into it.
    if (newGameState[self].avelhemRepertoire.length === 0) {
      newGameState[self].avelhemVestige = shuffleCards(
        newGameState[self].avelhemVestige
      );
      newGameState[self].avelhemRepertoire = [
        ...newGameState[self].avelhemVestige.splice(
          0,
          newGameState[self].avelhemVestige.length
        ),
      ];
    }

    return newGameState;
  };

  const drawSkill = (newGameState) => {
    //transfer card from deck to hand
    newGameState[self].skillHand.push(newGameState[self].skillRepertoire.pop());

    //decrease floating count

    if (newGameState[self].skillFloat > 0) {
      newGameState[self].skillFloat -= 1;
    }

    if (newGameState[self].skillRepertoire.length === 0) {
      //If deck empties, shuffle discard pile into it.

      //1.Shuffle Vestige
      newGameState[self].skillVestige = shuffleCards(
        newGameState[self].skillVestige
      );

      //2. Copy vestige to repertoire
      newGameState[self].skillRepertoire = [
        ...newGameState[self].skillVestige.splice(
          0,
          newGameState[self].skillVestige.length
        ),
      ];

      //3. Empty vestige
      newGameState[self].skillVestige = [];
    }

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

  const floatAvelhem = (newGameState, avelhemHandIndex) => {
    newGameState[self].avelhemRepertoire.push(
      newGameState[self].avelhemHand.splice(avelhemHandIndex, 1)[0]
    );

    newGameState[self].avelhemFloat = newGameState[self].avelhemFloat + 1;

    return newGameState;
  };

  const floatSkill = (newGameState, skillHandIndex) => {
    newGameState[self].skillRepertoire.push(
      newGameState[self].skillHand.splice(skillHandIndex, 1)[0]
    );

    newGameState[self].skillFloat += 1;

    return newGameState;
  };

  const freeze1 = (newGameState, attacker, victim, special) => {
    newGameState.currentResolution.push({
      resolution: "Apply Frostbite",
      attacker: attacker,
      victim: victim,
      special: special,
      type: "freeze1",
      duration: 1,
    });

    //to do in the future: consider bypass Target
    if (triggerTarget(attacker, victim, "freeze1")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "freeze1",
      });
    }

    return newGameState;
  };

  const freeze2 = (newGameState, attacker, victim, special) => {
    newGameState.currentResolution.push({
      resolution: "Apply Frostbite",
      attacker: attacker,
      victim: victim,
      special: special,
      type: "freeze1",
      duration: 2,
    });

    //to do in the future: consider bypass Target and Adamant Armor
    if (triggerTarget(attacker, victim, "freeze2")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "freeze2",
      });
    }

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

  const getTacticImage = (i) => {
    if (localGameState && localGameState.tactics[i]) {
      switch (localGameState.tactics[i].face) {
        case "Advance":
          return Advance;
        case "Mobilize":
          return Mobilize;
        case "Assault":
          return Assault;
        case "Invoke":
          return Invoke;
        default:
          return;
      }
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

  const getZonesAerialImpetusAlly = (unit) => {
    const zones = JSON.parse(localGameState.zones);
    const adjacentAllies = getZonesWithAllies(unit, 1, false); // excludes self

    const AerialImpetusAllyZones = [];
    for (let i of adjacentAllies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const ally = localGameState[zone.player].units[zone.unitIndex];

      if (canMove(ally) && !isImmobilized(ally)) {
        if (ally.player === "host" && unit.row < ally.row) {
          AerialImpetusAllyZones.push(ally.row * 5 + ally.column);
        }
        if (ally.player === "guest" && unit.row > ally.row) {
          AerialImpetusAllyZones.push(ally.row * 5 + ally.column);
        }
      }
    }

    return AerialImpetusAllyZones;
  };

  const getZonesForPromotion = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let zones = [];
    for (let u of newGameState[self].units) {
      if (u !== null && u.unitClass === "Pawn" && !isMuted(u)) {
        zones.push(u.row * 5 + u.column);
      }
    }
    return zones;
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

    let allyZones = getZonesInRange(unit.row, unit.column, range, includeSelf);

    allyZones = allyZones.filter(
      (z) => zones[Math.floor(z / 5)][z % 5].player === unit.player
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

  const getZonesWithEnemiesAfflicted = (unit, range, affliction) => {
    const zones = JSON.parse(localGameState.zones);

    let enemyPlayer = "";
    if (unit.player === "host") {
      enemyPlayer = "guest";
    } else if (unit.player === "guest") {
      enemyPlayer = "host";
    }

    let enemyZones = getZonesWithEnemies(unit, range);

    enemyZones = enemyZones.filter(
      (z) =>
        localGameState[enemyPlayer].units[
          zones[Math.floor(z / 5)][z % 5].unitIndex
        ].afflictions[affliction] > 0
    );

    return enemyZones;
  };

  const getZonesWithEnemiesRooted = (unit, range) => {
    const zones = JSON.parse(localGameState.zones);

    let enemyPlayer = "";
    if (unit.player === "host") {
      enemyPlayer = "guest";
    } else if (unit.player === "guest") {
      enemyPlayer = "host";
    }

    let enemyZones = getZonesWithEnemies(unit, range);

    enemyZones = enemyZones.filter((z) =>
      isRooted(
        localGameState[enemyPlayer].units[
          zones[Math.floor(z / 5)][z % 5].unitIndex
        ]
      )
    );

    return enemyZones;
  };

  const getZonesWithScions = (team) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    const units = newGameState[team].units;

    let zonesWithScions = [];

    for (let unit of units) {
      if (unit && unit.unitClass !== "Pawn") {
        zonesWithScions.push(unit.row * 5 + unit.column);
      }
    }

    return zonesWithScions;
  };

  const hasScion = (player) => {
    const units = localGameState[player].units;

    for (let unit of units) {
      if (unit && unit.unitClass !== "Pawn") {
        return true;
      }
    }
    return false;
  };

  const hasScionSkill = () => {
    const skillHand = localGameState[self].skillHand;

    for (let skill of skillHand) {
      if (skill[0] !== "S") {
        return true;
      }
    }
    return false;
  };

  const hasTactic = (tactics) => {
    if (
      tactics.includes(localGameState.tactics[0].face) &&
      localGameState.tactics[0].stock > 0
    ) {
      return true;
    }

    if (
      tactics.includes(localGameState.tactics[1].face) &&
      localGameState.tactics[1].stock > 0
    ) {
      return true;
    }

    return false;
  };

  const ignite = (newGameState, attacker, victim, special) => {
    newGameState.currentResolution.push({
      resolution: "Apply Burn",
      attacker: attacker,
      victim: victim,
      special: special,
      type: "ignite",
    });

    //to do in the future: consider bypass Target
    if (triggerTarget(attacker, victim, "ignite")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "ignite",
      });
    }

    return newGameState;
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

  const isDisrupted = (unit, range) => {
    //Note: range 1 prevents non-burst skill activation
    //Note: range 2 prevents virtue-spending and abilities

    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(localGameState.zones);

    const zonesWithAdjacentEnemies = getZonesWithEnemies(unit, range);

    for (let z of zonesWithAdjacentEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      if (
        newGameState[zone.player].units[zone.unitIndex].enhancements
          .disruption > 0
      ) {
        return true;
      }
    }

    return false;
  };

  const isImmobilized = (unit) => {
    const afflictions = unit.afflictions;

    if (
      unit.enhancements.score ||
      afflictions.paralysis ||
      afflictions.frostbite
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

  const isRooted = (unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(localGameState.zones);

    if (
      ["Wind Scion", "Land Scion", "Plant Scion"].includes(unit.unitClass) &&
      !isMuted(unit)
    ) {
      return false;
    }

    const zonesWithAdjacentEnemies = getZonesWithEnemies(unit, 1);

    for (let z of zonesWithAdjacentEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      if (
        newGameState[zone.player].units[zone.unitIndex].enhancements
          .overgrowth === true
      ) {
        return true;
      }
    }

    const zonesWithDistantEnemies = getZonesWithEnemies(unit, 2);

    for (let z of zonesWithDistantEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      if (
        newGameState[zone.player].units[zone.unitIndex].enhancements
          .proliferation > 0
      ) {
        return true;
      }
    }

    return false;
  };

  const move = (newGameState, unit, zoneId, special) => {
    let mover = newGameState[unit.player].units[unit.unitIndex];
    const moverEnemy = mover.player === "host" ? "guest" : "host";

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
    // newGameState[mover.player].units[mover.unitIndex].row = Math.floor(
    //   zoneId / 5
    // );
    // newGameState[mover.player].units[mover.unitIndex].column = zoneId % 5;
    mover.row = Math.floor(zoneId / 5);
    mover.column = zoneId % 5;
    delete mover.enhancements.overgrowth;
    delete mover.enhancements.proliferation;
    newGameState[mover.player].units[mover.unitIndex] = mover;

    //pop "Moving Unit" resolution
    if (
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution === "Moving Unit"
    ) {
      newGameState.currentResolution.pop();
    }

    //Trigger Motion Contingency

    if (
      newGameState[moverEnemy].skillHand.length > 0 &&
      !["strike", "AerialImpetusAlly", "Surge"].includes(special) &&
      triggerMotion(mover)
    ) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Motion",
        mover: mover,
        player: moverEnemy,
      });
    }
    return newGameState;
  };

  const paralyze1 = (newGameState, attacker, victim, special) => {
    if (newGameState === null) {
      newGameState = JSON.parse(JSON.stringify(localGameState));
    }

    newGameState.currentResolution.push({
      resolution: "Apply Paralysis",
      attacker: attacker,
      victim: victim,
      special: special,
      type: "paralyze1",
      duration: 1,
    });

    //to do in the future: consider bypass Target and Adamant Armor
    if (triggerTarget(attacker, victim, "paralyze1")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "paralyze1",
      });
    }

    return newGameState;
  };

  const paralyze2 = (newGameState, attacker, victim, special) => {
    newGameState.currentResolution.push({
      resolution: "Apply Paralysis",
      attacker: attacker,
      victim: victim,
      special: special,
      type: "paralyze1",
      duration: 2,
    });

    //to do in the future: consider bypass Target and Adamant Armor
    if (triggerTarget(attacker, victim, "paralyze1")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "paralyze1",
      });
    }

    return newGameState;
  };

  const purificationPurge = (newGameState, selectedUnit) => {
    let unit = newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

    if (unit.enhancements.ward > 0) {
      unit.enhancements.ward = Math.max(unit.enhancements.ward, 2);
    } else {
      unit.enhancements.ward = 2;
    }

    delete unit.afflictions.paralysis;
    delete unit.afflictions.frostbite;
    delete unit.afflictions.burn;
    delete unit.afflictions.infection;

    newGameState[selectedUnit.player].units[selectedUnit.unitIndex] = unit;

    return newGameState;
  };

  const resetAdamantArmor = (unit) => {
    delete unit.temporary.usedAdamantArmor;

    return unit;
  };

  const rollTactic = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const mobilizeLimit =
      3 + newGameState[self].bountyUpgrades.tactics > 2 ? 1 : 0;

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

  const shuffleCards = (repertoire) => {
    for (let i = repertoire.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [repertoire[i], repertoire[j]] = [repertoire[j], repertoire[i]];
    }
    return repertoire;
  };

  const strike = (newGameState, attacker, victim, special) => {
    newGameState.currentResolution.push({
      resolution: "Apply Damage",
      attacker: attacker,
      victim: victim,
      special: special,
      type: "strike",
    });

    //to do in the future: consider bypass Target and Adamant Armor

    if (triggerTarget(attacker, victim, "strike")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "strike",
      });
    }

    return newGameState;
  };

  const strikeMove = (mover, zone) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Strike Movement"
    newGameState.currentResolution.pop();

    newGameState = move(newGameState, mover, zone, "strike");

    return newGameState;
  };

  const triggerAscensionAlly = (newGameState, unit, scionClass, method) => {
    return triggerMatchMadeInHeaven(newGameState, unit, scionClass, method);
  };

  const triggerAscensionEnemy = (newGameState, unit, scionClass, method) => {
    return triggerFatedRivalry(newGameState, unit, scionClass, method);
  };

  const triggerAegis = (victim) => {
    const zones = JSON.parse(localGameState.zones);
    const adjacentAllies = getZonesWithAllies(victim, 1, true); // includes self

    for (let i of adjacentAllies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (
        unit.unitClass === "Mana Scion" &&
        !isMuted(unit) &&
        !isDisrupted(unit, 1)
      ) {
        return true;
      }
    }

    return false;
  };

  const triggerBlackBusinessCard = (victim) => {
    if (victim.enhancements.ravager) {
      return true;
    }
    return false;
  };

  const triggerBlazeOfGlory = (victim, method) => {
    if (
      victim.unitClass === "Fire Scion" && //must be Fire Scion
      !isMuted(victim) &&
      !isDisrupted(victim, 1) &&
      ["strike", "virtue-blast", "blast"].includes(method) && //only attacks can trigger it
      localGameState[victim.player].skillHand.length > 1 && //needs at least 2 cards: Blaze of Glory itself + 1 card to discard
      victim.fever > 0 && //enemy needs fever
      getZonesWithEnemies(victim, 1).length //must be able to burn an adjacent enemy
    ) {
      console.log("canBlazeOfGlory");
      return true;
    }
    return false;
  };

  const triggerEliminationAlly = (victim) => {
    return (
      triggerViridianGrave(victim, "ally") || triggerVengefulLegacy(victim)
    );
  };

  const triggerEliminationEnemy = (victim) => {
    return (
      triggerViridianGrave(victim, "enemy") || triggerBlackBusinessCard(victim)
    );
  };

  const triggerFatedRivalry = (newGameState, unit, scionClass, method) => {
    if (method === "Fated Rilvary") {
      return false;
    }

    const enemyTeam = unit.player === "host" ? "guest" : "host";

    return canAscend(newGameState, enemyTeam, scionClass);
  };

  const triggerFrenzyBlade = (victim) => {
    const zones = JSON.parse(localGameState.zones);
    const adjacentEnemies = getZonesWithEnemies(victim, 1);

    for (let i of adjacentEnemies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (
        unit.unitClass === "Metal Scion" &&
        !isMuted(unit) &&
        !isDisrupted(unit, 1)
      ) {
        return true;
      }
    }

    return false;
  };

  const triggerHealingRain = (victim) => {
    const zones = JSON.parse(localGameState.zones);
    const adjacentAllies = getZonesWithAllies(victim, 1, true); // includes self

    for (let i of adjacentAllies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (
        unit.unitClass === "Water Scion" &&
        !isMuted(unit) &&
        !isDisrupted(unit, 1)
      ) {
        return true;
      }
    }

    return false;
  };

  const triggerMatchMadeInHeaven = (newGameState, unit, scionClass, method) => {
    if (method !== "Avelhem") {
      return false;
    }

    const zones = JSON.parse(localGameState.zones);
    const adjacentAllies = getZonesWithAllies(unit, 2, false); // exclude self

    let allyPawnsInRange = 0;

    for (let i of adjacentAllies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const ally = localGameState[zone.player].units[zone.unitIndex];

      if (ally.unitClass === "Pawn" && !isMuted(ally)) {
        allyPawnsInRange += 1;
        break;
      }
    }

    return (
      allyPawnsInRange > 0 && canAscend(newGameState, unit.player, scionClass)
    );
  };

  const triggerMotion = (mover) => {
    if (triggerPitfallTrap(mover)) {
      return true;
    }

    return false;
  };

  const triggerPitfallTrap = (mover) => {
    const zones = JSON.parse(localGameState.zones);
    const adjacentEnemies = getZonesWithEnemies(mover, 1);

    for (let i of adjacentEnemies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (
        unit.unitClass === "Land Scion" &&
        !isMuted(unit) &&
        !isDisrupted(unit, 1)
      ) {
        return true;
      }
    }

    return false;
  };

  const triggerPowerAtTheFinalHour = (victim) => {
    return !isMuted(victim) && victim.unitClass === "Pawn" ? true : false;
  };

  const triggerScreech = (unit) => {
    const zones = JSON.parse(localGameState.zones);

    //if activator is Wind Scion or adjacent to an unmuted ally Wind Scion, Screech will not trigger
    const allyZones = getZonesWithAllies(unit, 1, true);

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
          !isMuted(localGameState[enemy].units[unitIndex]) &&
          !isDisrupted(localGameState[enemy].units[unitIndex], 1)
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const triggerSurvivalAlly = (victim) => {
    if (localGameState[victim.player].skillHand.length < 1) {
      return false;
    }
    return triggerPowerAtTheFinalHour(victim) || triggerHealingRain(victim);
  };

  const triggerSurvivalEnemy = (victim) => {
    if (localGameState[victim.player].skillHand.length < 1) {
      return false;
    }
    return triggerFrenzyBlade(victim);
  };

  const triggerTarget = (attacker, victim, type) => {
    if (
      triggerBlazeOfGlory(victim, type) ||
      triggerThunderThaumaturge(attacker, victim) ||
      triggerAegis(victim)
    ) {
      return true;
    }

    return false;
  };

  const triggerThunderThaumaturge = (attacker, victim) => {
    if (
      victim.unitClass === "Lightning Scion" && //must be Lightning Scion
      !isMuted(victim) &&
      !isDisrupted(victim, 1) &&
      victim.charge && //enemy needs chrge
      isAdjacent(attacker, victim) //enemy must be adjacent
    ) {
      return true;
    }
    return false;
  };

  const triggerVengefulLegacy = (victim) => {
    //return true if there is an unmuted ally pawn within 2 spaces
    const zones = JSON.parse(localGameState.zones);
    const allies = getZonesWithAllies(victim, 2, false); // excludes self

    if (victim.unitClass === "Pawn") {
      return false;
    }

    for (let i of allies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Pawn" && !isMuted(unit)) {
        return true;
      }
    }

    return false;
  };

  const triggerViridianGrave = (victim, team) => {
    const zones = JSON.parse(localGameState.zones);

    let adjacentUnits = [];

    if (team === "ally") {
      adjacentUnits = getZonesWithAllies(victim, 1, false);
    } else {
      adjacentUnits = getZonesWithEnemies(victim, 1);
    }

    for (let i of adjacentUnits) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (
        unit.unitClass === "Plant Scion" &&
        !isMuted(unit) &&
        !isDisrupted(unit, 1)
      ) {
        return true;
      }
    }

    return false;
  };

  const virtueBlast = (newGameState, attacker, victim) => {
    newGameState.currentResolution.push({
      resolution: "Apply Damage",
      attacker: attacker,
      victim: victim,
      type: "blast",
    });

    if (victim.virtue && !isMuted(victim) && !isDisrupted(victim, 2)) {
      newGameState.currentResolution.push({
        resolution: "Blocking Virtue-Blast",

        unit: victim,
        attacker: attacker,
        details: {
          reason: "Block Virtue-Blast",
          title: "Block Virtue-Blast",
          message: `Enemy ${attacker.unitClass} is about to Virtue-blast your ${victim.unitClass}. Do you want to spend your unit’s Virtue to reduce the attack’s AP by
          1? This will restore the attaking unit’s Virtue.`,
          no: "No",
          yes: "Yes",
        },
      });
    }

    //to do in the future: consider bypass Target and Adamant Armor
    if (triggerTarget(attacker, victim, "virtue-blast")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "virtue-blast",
      });
    }

    newGameState[attacker.player].units[attacker.unitIndex].virtue = 0;

    return newGameState;
  };

  const virtueBlastYes = (newGameState, attacker, victim) => {
    // newGameState.currentResolution.pop();
    newGameState.currentResolution[
      newGameState.currentResolution.length - 1
    ].special = "Virtue-blast-blocked";

    newGameState[victim.player].units[victim.unitIndex].virtue = 0;

    newGameState[attacker.player].units[attacker.unitIndex].virtue = 1;

    return newGameState;
  };

  return {
    activateAegis,
    activateAvelhem,
    activateBlazeOfGlory,
    activateHealingRain,
    activateFatedRivalry,
    activateFrenzyBlade,
    activateMatchMadeInHeaven,
    activatePitfallTrap,
    activateSkill,
    activateSkillAndResonate,
    activateSovereignSkill,
    activateSovereignSkillAndResonate,
    activateSymphonicScreech,
    activateThunderThaumaturge,
    activateViridianGrave,
    applyBurn,
    applyDamage,
    applyFrostbite,
    applyParalysis,
    ascendPawn,
    assignTactics,
    avelhemResonance,
    avelhemToScion,
    blast,
    canActivateResonance,
    canActivateSkill,
    canActivateSovereignSkill,
    canActivateSovereignResonance,
    canAscend,
    canBlast,
    canSowAndReapBlast,
    canSowAndReapStrike,
    canMove,
    canStrike,
    drawAvelhem,
    drawSkill,
    endFinalPhase,
    floatAvelhem,
    floatSkill,
    freeze1,
    freeze2,
    getScionSet,
    getTacticImage,
    getVacantAdjacentZones,
    getZonesAerialImpetusAlly,
    getZonesForPromotion,
    getZonesInRange,
    getZonesWithAllies,
    getZonesWithEnemies,
    getZonesWithEnemiesAfflicted,
    getZonesWithEnemiesRooted,
    getZonesWithScions,
    ignite,
    isAdjacent,
    isDisrupted,
    isMuted,
    isRooted,
    move,
    paralyze1,
    paralyze2,
    purificationPurge,
    rollTactic,
    shuffleCards,
    strike,
    strikeMove,
    triggerAegis,
    triggerBlackBusinessCard,
    triggerBlazeOfGlory,
    triggerFatedRivalry,
    triggerFrenzyBlade,
    triggerHealingRain,
    triggerMatchMadeInHeaven,
    triggerPitfallTrap,
    triggerPowerAtTheFinalHour,
    triggerThunderThaumaturge,
    triggerVengefulLegacy,
    triggerViridianGrave,
    virtueBlast,
    virtueBlastYes,
  };
};
