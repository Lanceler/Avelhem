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

  const activateAegis = (newGameState, unit) => {
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
      resolution: "Activating Aegis",
      unit: unit,
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
      resolution: "Activating Aerial Impetus",
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
      resolution: "Activating Arsenal Onslaught",
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
      resolution: "Activating Blaze of Glory",
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
      resolution: "Activating Castle of Thorns",
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
      resolution: "Activating Cataclysmic Tempest",
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
      resolution: "Activating Chain Lightning",
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
      resolution: "Activating Conflagration",
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
      resolution: "Resonating Conflagration",
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
      resolution: "Activating Crystallization",
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
      resolution: "Activating Diffusion",
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
      resolution: "Activating Disruption Field",
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
      resolution: "Activating Efflorescence",
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

  const activateFrenzyBlade = (newGameState, unit) => {
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
      resolution: "Activating Frenzy Blade",
      unit: unit,
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
      resolution: "Activating Frigid Breath",
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
      resolution: "Resonating Frigid Breath",
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
      resolution: "Activating Gale Conjuration",
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
      resolution: "Activating Geomancy",
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
      resolution: "Activating Glacial Torrent",
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
      resolution: "Activating Healing Rain",
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
      resolution: "Activating Ignition Propulsion",
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
      resolution: "Activating Magnetic Shockwave",
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

  const activatePitfallTrap = (newGameState, unit) => {
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
      resolution: "Activating PitfallTrap",
      unit: unit,
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
      resolution: "Activating Purification",
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
      resolution: "Activating Resplendence",
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
      resolution: "Activating Reinforce",
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
      resolution: "Activating Symphonic Screech",
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
      resolution: "Activating Sow And Reap",
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
      resolution: "Activating Surge",
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

  const activateThunderThaumaturge = (newGameState, unit) => {
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
      resolution: "Activating Thunder Thaumaturge",
      unit: unit,
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
      resolution: "Activating Upheaval",
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
      resolution: "Activating Valiant Spark",
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

  const activateViridianGrave = (newGameState, unit) => {
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
      resolution: "Activating Viridian Grave",
      unit: unit,
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
      resolution: "Activating Zip and Zap",
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

      //burn gives frostbite immunity
      if (
        newGameState[victim.player].units[victim.unitIndex].afflictions
          .frostbite > 0
      ) {
        delete newGameState[victim.player].units[victim.unitIndex].afflictions
          .frostbite;
      }

      //burn gives purges overgrowth & proliferation (proliferation would be overgrowth: 2)
      if (
        newGameState[victim.player].units[victim.unitIndex].enhancements
          .overgrowth > 0
      ) {
        delete newGameState[victim.player].units[victim.unitIndex].enhancements
          .overgrowth;
      }
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
    if (isMuted(attacker) || attacker === null) {
      return newGameState;
      // to do: Maybe push a resolution that displays a message
    }

    //checkBypassShield
    let bypassShield = false;
    if (
      victim.afflictions.frostbite > 0 &&
      attacker.unitClass === "Water Scion"
    ) {
      bypassShield = true;
    } else if (attacker.sharpness == 2) {
      bypassShield = true;
    } else if (special === "sowAndReapBlast") {
      bypassShield = true;
    }

    //calculate AP
    let aP = 1;
    if (victim.afflictions.anathema) {
      aP = 5;
    } else if (["geomancy", "surge"].includes(special)) {
      aP = 2;
    } else if (
      special === "Fire Scion" &&
      victim.unitClass === "Fire Scion" &&
      !isMuted(victim)
    ) {
      aP = 0;
    } else {
      //check for AP modifiers
      if (attacker.boosts.galeConjuration) {
        aP = 2;
        delete newGameState[attacker.player].units[attacker.unitIndex].boosts
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
      if (newGameState.turnPlayer === victim.player) {
        if (triggerSurvivalAlly(victim)) {
          newGameState.currentResolution.push({
            resolution: "Triggering SurvivalAlly ",
            player: victim.player,
            victim: victim,
            attacker: attacker,
          });
        }
        if (triggerSurvivalEnemy(victim)) {
          newGameState.currentResolution.push({
            resolution: "Triggering Survival Enemy ",
            player: victim.player === "host" ? "guest" : "host",
            victim: victim,
            attacker: attacker,
          });
        }
      } else {
        if (triggerSurvivalEnemy(victim)) {
          newGameState.currentResolution.push({
            resolution: "Triggering Survival Enemy",
            player: victim.player === "host" ? "guest" : "host",
            victim: victim,
            attacker: attacker,
          });
        }
        if (triggerSurvivalAlly(victim)) {
          newGameState.currentResolution.push({
            resolution: "Triggering Survival Ally",
            player: victim.player,
            victim: victim,
            attacker: attacker,
          });
        }
      }
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
        newGameState = move(
          newGameState,
          attacker,
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
          "Pawn" &&
        !newGameState[attacker.player].units[attacker.unitIndex].enhancements
          .ravager
      )
        newGameState[attacker.player].units[
          attacker.unitIndex
        ].temporary.anathemaDelay = true;
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
      newGameState[victim.player].units[victim.unitIndex].boosts = {};

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

      //frostbite purges overgrowth & proliferation (proliferation would be overgrowth: 2)

      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .overgrowth;
      delete newGameState[victim.player].units[victim.unitIndex].enhancements
        .disruption;
    }

    return newGameState;
  };

  const assignTactics = (newGameState, first, second) => {
    newGameState.tactics = [first, second];

    return newGameState;
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
        resolution: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "virtue-blast",
      });
    }

    return newGameState;
  };

  const canActivateResonance = (unit, skill) => {
    switch (skill) {
      case "01-02":
        return (
          canActivateSkill(unit, skill) &&
          localGameState[self].skillHand.length > 2
        );

      case "02-02":
        return canActivateSkill(unit, skill);

      default:
        return false;
    }
  };

  const canActivateSkill = (unit, skill) => {
    if (isMuted(unit)) {
      return false;
    }

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

      // case "03-01":
      //   return canAerialImpetus(unit);
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
      // case "05-02":
      //   return canZipAndZap(unit);
      case "05-03":
        return false;
      case "05-04":
        return true;

      // case "06-01":
      //   return canSurge(unit);
      // case "06-02":
      //   return canDiffusion(unit);
      case "06-03":
        return false;
      case "06-04":
        return true;

      case "07-01":
        return getZonesWithEnemies(unit, 1).length > 0 ? true : false;
      case "07-02":
        return true;
      case "07-03":
        return false;
      case "07-04":
        return canStrike(unit);

      // case "08-01":
      //   return canSowAndReap(unit);
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

  const canStrike = (unit) => {
    if (
      getZonesWithEnemies(unit, 1).length &&
      !isMuted(unit) &&
      !isRooted(unit)
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
    newGameState[self].skillFloat = Math.max(
      0,
      newGameState[self].skillFloat - 1
    );

    //If deck empties, shuffle discard pile into it.
    if (newGameState[self].skillRepertoire.length === 0) {
      newGameState[self].skillVestige = shuffleCards(
        newGameState[self].skillVestige
      );
      newGameState[self].skillRepertoire = [
        ...newGameState[self].skillVestige.splice(
          0,
          newGameState[self].skillVestige.length
        ),
      ];
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

    newGameState[self].skillFloat = newGameState[self].skillFloat + 1;

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

    //to do in the future: consider bypass Target and Adamant Armor
    if (triggerTarget(attacker, victim, "freeze1")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Target",
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
        resolution: "Triggering Target",
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
        resolution: "Triggering Target",
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
    let gameState = JSON.parse(JSON.stringify(localGameState));

    if (
      ["Wind Scion", "Land Scion", "Plant Scion"].includes(unit.unitClass) &&
      !isMuted(unit)
    ) {
      return false;
    }

    const zonesWithAdjacentEnemies = getZonesWithEnemies(unit, 1);

    for (let z of zonesWithAdjacentEnemies) {
      const zone = gameState.zones[Math.floor(z / 5)][z % 5];
      if (gameState[zone.player].units[zone.unitIndex].overgrowth === true) {
        return true;
      }
    }

    const zonesWithDistantEnemies = getZonesWithEnemies(unit, 2);

    for (let z of zonesWithDistantEnemies) {
      const zone = gameState.zones[Math.floor(z / 5)][z % 5];
      if (gameState[zone.player].units[zone.unitIndex].proliferation > 0) {
        return true;
      }
    }

    return false;
  };

  const move = (newGameState, unit, zoneId) => {
    console.log(unit);
    let mover = newGameState[unit.player].units[unit.unitIndex];

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
    newGameState[unit.player].units[unit.unitIndex].row = Math.floor(
      zoneId / 5
    );
    newGameState[unit.player].units[unit.unitIndex].column = zoneId % 5;

    //pop "Moving Unit" resolution
    if (
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution === "Moving Unit"
    ) {
      newGameState.currentResolution.pop();
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
        resolution: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "strike",
      });
    }

    return newGameState;
  };

  const triggerAegis = (victim) => {
    const zones = JSON.parse(localGameState.zones);
    const adjacentAllies = getZonesWithAllies(victim, 1, true); // includes self

    for (let i of adjacentAllies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Mana Scion" && !isMuted(unit)) {
        return true;
      }
    }

    return false;
  };

  const triggerBlazeOfGlory = (victim, method) => {
    if (
      victim.unitClass === "Fire Scion" && //must be Fire Scion
      ["strike", "virtue-blast", "blast"].includes(method) && //only attacks can trigger it
      localGameState[victim.player].skillHand.length > 1 && //needs at least 2 cards: Blaze of Glory itself + 1 card to discard
      victim.fever && //enemy needs fever
      getZonesWithEnemies(victim, 1).length //must be able to burn an adjacent enemy
    ) {
      return true;
    }
    return false;
  };

  const triggerFrenzyBlade = (victim) => {
    const zones = JSON.parse(localGameState.zones);
    const adjacentEnemies = getZonesWithEnemies(victim, 1);

    for (let i of adjacentEnemies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Metal Scion" && !isMuted(unit)) {
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

      if (unit.unitClass === "Water Scion" && !isMuted(unit)) {
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
          !isMuted(localGameState[enemy].units[unitIndex])
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const triggerSurvivalAlly = (victim) => {
    if (localGameState[victim.player].skillHand < 1) {
      return false;
    }
    return triggerPowerAtTheFinalHour(victim) || triggerHealingRain(victim);
  };

  const triggerSurvivalEnemy = (victim) => {
    if (localGameState[victim.player].skillHand < 1) {
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
      victim.charge && //enemy needs chrge
      isAdjacent(attacker, victim) //enemy must be adjacent
    ) {
      return true;
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

    if (victim.virtue && !isMuted(victim)) {
      newGameState.currentResolution.push({
        resolution: "Blocking Virtue-Blast",
        attacker: attacker,
        victim: victim,
      });
    }

    //to do in the future: consider bypass Target and Adamant Armor
    if (triggerTarget(attacker, victim, "virtue-blast")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "virtue-blast",
      });
    }

    newGameState[attacker.player].units[attacker.unitIndex].virtue = 0;

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

    newGameState[victim.player].units[victim.unitIndex].virtue = 0;

    newGameState[attacker.player].units[attacker.unitIndex].virtue = 1;

    return newGameState;
  };

  return {
    activateBlazeOfGlory,
    activateHealingRain,
    activateSkill,
    activateSkillAndResonate,
    activateSymphonicScreech,
    applyBurn,
    applyDamage,
    applyFrostbite,
    assignTactics,
    blast,
    canActivateResonance,
    canActivateSkill,
    canBlast,
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
    getZonesInRange,
    getZonesWithAllies,
    getZonesWithEnemies,
    getZonesWithEnemiesAfflicted,
    ignite,
    isAdjacent,
    isMuted,
    isRooted,
    move,
    purificationPurge,
    rollTactic,
    shuffleCards,
    strike,
    triggerAegis,
    triggerBlazeOfGlory,
    triggerHealingRain,
    triggerPowerAtTheFinalHour,
    triggerThunderThaumaturge,
    virtueBlast,
    virtueBlastNo,
    virtueBlastYes,
  };
};
