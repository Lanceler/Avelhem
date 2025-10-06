import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";

import { useCardDatabase } from "./useCardDatabase";

export const useRecurringEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { allBurstSkills, getScionSet, getSkillById } = useCardDatabase();

  const [zones, setZones] = useState(null);

  useEffect(() => {
    if (localGameState && localGameState.zones) {
      setZones(JSON.parse(localGameState.zones));
    }
  }, [localGameState]);

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
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Mana Skill",
      resolution2: "Activating Aegis",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("06-03");
    newGameState.activatingUnit.push(unit);

    newGameState = applySymphonicScreech(unit, newGameState);

    return newGameState;
  };

  const activateAvelhem = (newGameState, avelhem, resonator = null) => {
    //newGameState.currentResolution.pop() <--not needed

    newGameState.currentResolution.push({
      resolution: "Avelhem Conclusion",
      player: self,
      avelhem: avelhem,
      skillConclusion: "discard",
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
    if (resonator) {
      newGameState.activatingResonator.push(resonator);
    }

    newGameState = animationDelay(newGameState, self);

    return newGameState;
  };

  const activateAvelhemRecover = (newGameState, avelhem) => {
    //newGameState.currentResolution.pop() <--not needed

    newGameState[self].defiancePoints -= 2;

    const scionClass = avelhemToScion(avelhem);

    newGameState.currentResolution.push({
      resolution: "Avelhem Conclusion",
      player: self,
      avelhem: avelhem,
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Recover Skill",
      player: self,
      details: {
        title: "Avelhem Alternate Effect",
        reason: "Avelhem Alternate Effect",
        restriction: getScionSet(scionClass),
        message: `Recover 1 ${scionClass.replace(" Scion", "")} skill`,
        outcome: "Add",
      },
    });

    newGameState.activatingSkill.push(avelhem + "Alt");

    newGameState = animationDelay(newGameState, self);

    return newGameState;
  };

  const activateBlackBusinessCard = (newGameState) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      skill: "SC-05",
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Activating Black Business Card",
      player: self,
    });

    newGameState.activatingSkill.push("SC-05");
    newGameState.activatingUnit.push(null);

    newGameState = animationDelay(newGameState, self);

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
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Fire Skill",
      resolution2: "Activating Blaze of Glory",
      unit: unit,
    });

    newGameState.activatingSkill.push("01-03");
    newGameState.activatingUnit.push(unit);

    newGameState = applySymphonicScreech(unit, newGameState);

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
      skillConclusion: "discard",
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
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Metal Skill",
      resolution2: "Activating Frenzy Blade",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("07-03");
    newGameState.activatingUnit.push(unit);

    newGameState = applySymphonicScreech(unit, newGameState);

    return newGameState;
  };

  const activateGuardianWings = (newGameState, unit, victim) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "09-03",
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Avian Skill",
      resolution2: "Activating Guardian Wings",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("09-03");
    newGameState.activatingUnit.push(unit);

    newGameState = applySymphonicScreech(unit, newGameState);

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
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Water Skill",
      resolution2: "Activating Healing Rain",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("02-03");
    newGameState.activatingUnit.push(unit);

    newGameState = applySymphonicScreech(unit, newGameState);

    return newGameState;
  };

  const activateMatchMadeInHeaven = (newGameState, unit) => {
    //end Triggering Ascension resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: null,
      skill: "SC-03",
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Activating Match Made in Heaven",
      player: self,
      unit: unit,
    });

    newGameState.activatingSkill.push("SC-03");
    newGameState.activatingUnit.push(null);

    return newGameState;
  };

  const activatePowerAtTheFinalHour = (newGameState, unit) => {
    //end Triggering Survival resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: null,
      skill: "SC-01",
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Activating Power at the Final Hour",
      player: self,
      unit: unit,
    });

    newGameState.activatingSkill.push("SC-01");
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
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Land Skill",
      resolution2: "Activating Pitfall Trap",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("04-03");
    newGameState.activatingUnit.push(unit);

    newGameState = applySymphonicScreech(unit, newGameState);

    return newGameState;
  };

  const activateSymphonicScreech = (newGameState, unit, victim) => {
    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "03-03",
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Wind Skill",
      resolution2: "Activating Symphonic Screech",
      unit: unit,
      victim: victim,
    });

    newGameState = animationDelay(newGameState, self);

    newGameState.activatingSkill.push("03-03");
    newGameState.activatingUnit.push(unit);

    if (unit.cyclone !== 2) {
      newGameState.activatingUnit.push(unit);
      newGameState.activatingSkill.push("Aeromancy");
      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Talent Conclusion",
        unit: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Activating Aeromancy",
        unit: unit,
      });
    }

    return newGameState;
  };

  const activateSkill = (newGameState, unit, skill, resonator = null) => {
    //end Select Skill resolution
    newGameState.currentResolution.pop();

    newGameState.activatingSkill.push(skill);
    newGameState.activatingUnit.push(unit);

    const skillData = getSkillById(skill);

    let conclusion = "discard";

    // Burst skills cost DP
    if (skillData.Method === "Burst") {
      newGameState[unit.player].defiancePoints -=
        newGameState[unit.player].bountyUpgrades.skill > 0 ? 4 : 6;
    }

    //ambidexterity retain effect
    if (unit.boosts.ambidexterity && skillData.Method === "Standard") {
      conclusion = "retain";
      delete newGameState[unit.player].units[unit.unitIndex].boosts
        .ambidexterity;
    }

    if (resonator) {
      //end Select Resonator resolution
      newGameState.currentResolution.pop();

      if (
        ![
          "SA-02",
          //  "SA-03"
        ].includes(resonator)
      ) {
        conclusion = "float";
      }

      newGameState.activatingResonator.push(resonator);

      newGameState.currentResolution.push({
        resolution: "Resonance Conclusion",
        player: self,
        unit,
        skill,
        skillConclusion: conclusion,
        resonator,
        resonatorConclusion: "discard",
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Skill Conclusion",
        player: self,
        unit: unit,
        skill,
        skillConclusion: conclusion,
      });
    }

    newGameState.currentResolution.push({
      resolution: skillData.Facet + " Skill",
      resolution2: "Activating " + skillData.Name,
      unit,
      resonator,
    });

    if (skillData.Facet !== "Wind" && skillData.Method !== "Burst") {
      newGameState = applySymphonicScreech(unit, newGameState);
    } else {
      newGameState = animationDelay(newGameState, self);
    }

    if (skillData.Facet === "Wind" && unit.cyclone !== 2) {
      newGameState.activatingUnit.push(unit);
      newGameState.activatingSkill.push("Aeromancy");
      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Talent Conclusion",
        unit: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Activating Aeromancy",
        unit: unit,
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
        skillConclusion: "discard",
      });

      newGameState.currentResolution.push({
        resolution: resolution,
        resolution2: resolution2,
        player: self,
      });

      newGameState.activatingSkill.push(skill);
      newGameState.activatingUnit.push(null);

      newGameState = animationDelay(newGameState, self);

      return newGameState;
    };

    switch (skill) {
      case "SA-01":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Standard Skill",
          "Activating Heir’s Endeavor"
        );

      case "SA-02":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Standard Skill",
          "Activating Tea for Two"
        );

      case "SA-03":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Standard Skill",
          "Activating Dark Halo"
        );

      case "SA-04":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Standard Skill",
          "Activating Reminiscence"
        );

      case "SA-05":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Standard Skill",
          "Activating Foreshadow"
        );

      case "SB-01":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Transmute"
        );

      case "SB-02":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Ambidexterity"
        );

      case "SB-03":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Providence"
        );

      case "SB-04":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Fervent Prayer"
        );

      case "SB-05":
        return activateTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Press the Attack"
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
          resolution: "Misc.",
          resolution2: "May float resonant skill",
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

      newGameState = animationDelay(newGameState, self);

      newGameState.activatingSkill.push(skill);
      newGameState.activatingResonator.push(resonator);
      newGameState.activatingUnit.push(null);

      return newGameState;
    };

    switch (skill) {
      case "SB-01":
        return activateResonanceTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Transmute",
          resonator,
          "retain"
        );

      case "SB-02":
        return activateResonanceTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Ambidexterity",
          resonator,
          "float"
        );

      case "SB-03":
        return activateResonanceTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Providence",
          resonator,
          "retain"
        );

      case "SB-04":
        return activateResonanceTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Fervent Prayer",
          resonator,
          "float"
        );

      case "SB-05":
        return activateResonanceTemplate(
          newGameState,
          skill,
          "Sovereign Resonant Skill",
          "Activating Press the Attack",
          resonator,
          "retain"
        );

      default:
        return newGameState;
    }
  };

  const activateThunderThaumaturge = (newGameState, unit, attacker) => {
    //end Triggering Target resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      unit: unit,
      skill: "05-03",
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Lightning Skill",
      resolution2: "Activating Thunder Thaumaturge",
      unit: unit,
      attacker: attacker,
    });

    newGameState.activatingSkill.push("05-03");
    newGameState.activatingUnit.push(unit);

    newGameState = applySymphonicScreech(unit, newGameState);

    return newGameState;
  };

  const activateVengefulLegacy = (newGameState, victim) => {
    //end Triggering Elimination resolution
    // newGameState.currentResolution.pop() <-- NOT needed

    newGameState.currentResolution.push({
      resolution: "Skill Conclusion",
      player: self,
      skill: "SC-04",
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Activating Vengeful Legacy",
      player: self,
      victim: victim,
    });

    newGameState.activatingSkill.push("SC-04");
    newGameState.activatingUnit.push(null);

    newGameState = animationDelay(newGameState, self);

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
      skillConclusion: "discard",
    });

    newGameState.currentResolution.push({
      resolution: "Plant Skill",
      resolution2: "Activating Viridian Grave",
      unit: unit,
      victim: victim,
    });

    newGameState.activatingSkill.push("08-03");
    newGameState.activatingUnit.push(unit);

    newGameState = applySymphonicScreech(unit, newGameState);

    return newGameState;
  };

  const aetherRestoreSpecial = (newGameState, unitInfo) => {
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    unit.aether = 1;

    if (!isMuted(unit)) {
      switch (unit.unitClass) {
        case "Land Scion":
          newGameState.activatingUnit.push(unit);
          newGameState.activatingSkill.push("SaltTheEarth");
          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Talent Conclusion",
            unit: unit,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Activating Salt the Earth",
            unit: unit,
          });
          break;

        case "Mana Scion":
          newGameState.activatingUnit.push(unit);
          newGameState.activatingSkill.push("Overload");
          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Talent Conclusion",
            unit: unit,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Activating Overload",
            unit: unit,
            details: {
              reason: "Overload",
              title: "Overload",
              message: "You may draw 1 skill.",
              no: "Skip",
              yes: "Draw",
            },
          });
          break;
      }
    }

    return newGameState;
  };

  const aetherBlastDraw = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (unit && !isMuted(unit)) {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Aether-blast - Upgraded2",
        unit: unit,
        details: {
          reason: "Aether-blast Invoke",
          title: "Aether-blast (Invoke - Upgraded)",
          message: "You may draw 1 skill.",
          no: "Skip",
          yes: "Draw",
        },
      });
    }

    return newGameState;
  };

  const animationDelay = (newGameState, priority, time) => {
    const t = time ? time : 275;

    newGameState.currentResolution.push({
      resolution: "Animation Delay",
      priority: priority,
      time: t,
    });

    return newGameState;
  };

  const applyAnathema = (unit) => {
    // if (unit.temporary.activation > 0) {
    //   //if statement necessary because of Symphonic Screech <--- reworked code so not needed
    //   unit.temporary.activation -= 1;
    // }

    unit.temporary.activation -= 1;

    if (
      unit.temporary.activation === 0 &&
      unit.temporary.anathemaDelay === true
    ) {
      delete unit.temporary.anathemaDelay;
      unit.afflictions.anathema = 2;
    }

    return unit;
  };

  const applyBurn = (newGameState, victimInfo) => {
    const victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];
    const attackerPlayer = victim.player === "host" ? "guest" : "host";

    const isImmuneToBurn = (unit) =>
      !isMuted(unit) && ["Fire Scion", "Water Scion"].includes(unit.unitClass);

    if (victim.enhancements.ward) {
      delete victim.enhancements.ward;
      return newGameState;
    }

    if (isImmuneToBurn(victim)) {
      newGameState.activatingUnit.push(victim);
      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Talent Conclusion",
        unit: victim,
      });

      switch (victim.unitClass) {
        case "Fire Scion":
          newGameState = applyTalentMessage(
            newGameState,
            "EternalEmber2",
            "Eternal Ember",
            "Eternal Ember grants Fire Scions immunity to Burn.",
            attackerPlayer
          );
          break;
        case "Water Scion":
          newGameState = applyTalentMessage(
            newGameState,
            "ClearAsCrystal2",
            "Clear as Crystal",
            "Clear as Crystal grants Water Scions immunity to Burn.",
            attackerPlayer
          );
          break;
      }
    } else {
      victim.afflictions.burn = 1;
      delete victim.afflictions.frost;
    }

    return newGameState;
  };

  const applyBurnDamage = (newGameState, unitInfo) => {
    // newGameState.currentResolution.pop();
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
    delete unit.afflictions.burn;
    unit.hp -= 1;

    if (unit.hp < 1) {
      newGameState = eliminateUnit(newGameState, null, unit, null, "burn");
    }

    return newGameState;
  };

  // const applyDamage = (attackerInfo, victimInfo, type, special) => {
  //   let newGameState = JSON.parse(JSON.stringify(localGameState));
  //   newGameState.currentResolution.pop();

  //   //Update info
  //   let attacker =
  //     newGameState[attackerInfo.player].units[attackerInfo.unitIndex];
  //   let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

  //   //this can happen with effects like thunder thaumaturge
  //   if (attacker === null || isMuted(attacker)) {
  //     return newGameState;
  //     // to do: Maybe push a resolution that displays a message
  //   }

  //   if (["Diffusion"].includes(special)) {
  //     attacker.temporary.previousTarget = victim.unitIndex;
  //   }

  //   //checkBypassShield
  //   let bypassShield = false;
  //   switch (true) {
  //     case victim.afflictions.frost > 0 && attacker.unitClass === "Water Scion":
  //       bypassShield = true;
  //       break;
  //     case attacker.sharpness === 2 && type === "strike":
  //       bypassShield = true;
  //       break;
  //     case special === "sowAndReapBlast":
  //       bypassShield = true;
  //       break;
  //     default:
  //       break;
  //   }

  //   //calculate AP
  //   let aP = 1;
  //   switch (true) {
  //     // case victim.afflictions.anathema > 0:
  //     //   aP = 5;
  //     //   break;
  //     case ["Geomancy", "Surge", "Diffusion"].includes(special):
  //       aP = 2;
  //       break;

  //     default: //apply AP modifiers
  //       if (attacker.sharpness > 0) {
  //         aP += attacker.sharpness;
  //       }

  //       if (special === "Aether-blast-blocked") {
  //         aP = Math.max(0, aP - 1);
  //       }
  //       break;
  //   }

  //   //reduce HP
  //   switch (true) {
  //     case victim.enhancements.ward > 0:
  //       delete newGameState[victim.player].units[victim.unitIndex].enhancements
  //         .ward;
  //       break;
  //     case bypassShield && victim.enhancements.shield > 0:
  //       delete newGameState[victim.player].units[victim.unitIndex].enhancements
  //         .shield;
  //       newGameState[victim.player].units[victim.unitIndex].hp = victim.hp - aP;
  //       break;
  //     case victim.enhancements.shield > 0:
  //       delete newGameState[victim.player].units[victim.unitIndex].enhancements
  //         .shield;
  //       break;
  //     default:
  //       newGameState[victim.player].units[victim.unitIndex].hp = victim.hp - aP;
  //       break;
  //   }

  //   //survival
  //   if (newGameState[victim.player].units[victim.unitIndex].hp > 0) {
  //     const pushSurvivalResolution = (
  //       resolution2,
  //       player,
  //       victim,
  //       attacker
  //     ) => {
  //       newGameState.currentResolution.push({
  //         resolution: "Triggering Contingent Skill",
  //         resolution2,
  //         player,
  //         victim,
  //         attacker,
  //       });
  //     };

  //     if (newGameState.turnPlayer === victim.player) {
  //       if (triggerSurvivalAlly(victim)) {
  //         pushSurvivalResolution(
  //           "Triggering Survival Ally",
  //           victim.player,
  //           victim,
  //           attacker
  //         );
  //       }

  //       if (triggerSurvivalEnemy(victim)) {
  //         pushSurvivalResolution(
  //           "Triggering Survival Enemy",
  //           victim.player === "host" ? "guest" : "host",
  //           victim,
  //           attacker
  //         );
  //       }
  //     } else {
  //       if (triggerSurvivalEnemy(victim)) {
  //         pushSurvivalResolution(
  //           "Triggering Survival Enemy",
  //           victim.player === "host" ? "guest" : "host",
  //           victim,
  //           attacker
  //         );
  //       }

  //       if (triggerSurvivalAlly(victim)) {
  //         pushSurvivalResolution(
  //           "Triggering Survival Ally",
  //           victim.player,
  //           victim,
  //           attacker
  //         );
  //       }
  //     }

  //     //Mana feedback
  //     if (attacker.unitClass === "Mana Scion" && !isMuted(attacker)) {
  //       newGameState.activatingUnit.push(attacker);
  //       newGameState.activatingSkill.push("ManaFeedback");
  //       newGameState.currentResolution.push({
  //         resolution: "Unit Talent",
  //         resolution2: "Talent Conclusion",
  //         unit: attacker,
  //       });

  //       newGameState.currentResolution.push({
  //         resolution: "Unit Talent",
  //         resolution2: "Activating Mana Feedback",
  //         unit: attacker,
  //         details: {
  //           reason: "Mana Feedback",
  //           title: "Mana Feedback",
  //           message: "You may draw 1 skill.",
  //           no: "Skip",
  //           yes: "Draw",
  //         },
  //       });
  //     }
  //   } else {
  //     //elimination
  //     newGameState = eliminateUnit(
  //       newGameState,
  //       attacker,
  //       victim,
  //       type,
  //       special
  //     );
  //   }

  //   return newGameState;
  // };

  const applyDamage = (attackerInfo, victimInfo, type, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    const attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];
    const victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    // Edge case: attacker cannot attack
    if (!attacker || isMuted(attacker)) return newGameState;

    // Store target for Diffusion
    if (special === "Diffusion") {
      attacker.temporary.previousTarget = victim.unitIndex;
    }

    // Determine if shield should be bypassed
    const bypassShield =
      (victim.afflictions.frost > 0 && attacker.unitClass === "Water Scion") ||
      (attacker.sharpness === 2 && type === "strike") ||
      special === "sowAndReapBlast";

    // Determine damage amount (AP)
    let aP = 1;
    if (["Geomancy", "Surge", "Diffusion"].includes(special)) {
      aP = 2;
    } else {
      if (attacker.sharpness > 0) aP += attacker.sharpness;
      if (special === "Aether-blast-blocked") aP = Math.max(0, aP - 1);
    }

    let triggerColdEmbrace = false;

    // Apply damage
    if (victim.enhancements.ward > 0) {
      delete victim.enhancements.ward;
    } else if (bypassShield && victim.enhancements.shield > 0) {
      delete victim.enhancements.shield;
      victim.hp -= aP;

      if (
        victim.afflictions.frost > 0 &&
        attacker.unitClass === "Water Scion"
      ) {
        triggerColdEmbrace = true;
      }
    } else if (victim.enhancements.shield > 0) {
      delete victim.enhancements.shield;
    } else {
      victim.hp -= aP;
    }

    // If victim survives, check for survival triggers and talents
    if (victim.hp > 0) {
      const pushSurvivalResolution = (resolution2, player) => {
        newGameState.currentResolution.push({
          resolution: "Triggering Contingent Skill",
          resolution2,
          player,
          victim,
          attacker,
        });
      };

      const turnPlayer = newGameState.turnPlayer;
      const opponent = victim.player === "host" ? "guest" : "host";

      if (turnPlayer === victim.player) {
        if (triggerSurvivalAlly(victim))
          pushSurvivalResolution("Triggering Survival Ally", victim.player);
        if (triggerSurvivalEnemy(victim))
          pushSurvivalResolution("Triggering Survival Enemy", opponent);
      } else {
        if (triggerSurvivalEnemy(victim))
          pushSurvivalResolution("Triggering Survival Enemy", opponent);
        if (triggerSurvivalAlly(victim))
          pushSurvivalResolution("Triggering Survival Ally", victim.player);
      }
    } else {
      // Eliminate the unit if defeated
      newGameState = eliminateUnit(
        newGameState,
        attacker,
        victim,
        type,
        special
      );
    }

    //Water Scion talent
    if (triggerColdEmbrace) {
      newGameState.activatingUnit.push(attacker);
      newGameState.activatingSkill.push("ClearAsCrystal");
      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Talent Conclusion",
        unit: attacker,
      });

      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Message To Player",
        player: victim.player,
        title: "Clear as Crystal",
        message: "Water Scions pierce Shield when attacking frozen foes.",
        specMessage: "Water Scions pierce Shield when attacking frozen foes.",
      });
    }

    return newGameState;
  };

  const applyFrost = (newGameState, victimInfo, duration) => {
    const victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];
    const attackerPlayer = victim.player === "host" ? "guest" : "host";

    const isImmuneToFrost = () =>
      victim.afflictions.burn > 0 ||
      (!isMuted(victim) &&
        ["Fire Scion", "Water Scion", "Lightning Scion"].includes(
          victim.unitClass
        ));

    //Victim enhanced with ward negates affliction
    if (victim.enhancements.ward) {
      delete victim.enhancements.ward;
      return newGameState;
    }

    if (isImmuneToFrost()) {
      if (victim.afflictions.burn > 0) {
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Player",
          player: attackerPlayer,
          title: "Frost Immunity",
          message: "Units afflicted with Burn are immune to Frost.",
          specMessage: "Units afflicted with Burn are immune to Frost.",
        });
      } else {
        newGameState.activatingUnit.push(victim);
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: victim,
        });

        switch (victim.unitClass) {
          case "Fire Scion":
            newGameState = applyTalentMessage(
              newGameState,
              "EternalEmber2",
              "Eternal Ember",
              "Eternal Ember grants Fire Scions immunity to Frost.",
              attackerPlayer
            );
            break;
          case "Water Scion":
            newGameState = applyTalentMessage(
              newGameState,
              "ClearAsCrystal2",
              "Clear as Crystal",
              "Clear as Crystal grants Water Scions immunity to Frost.",
              attackerPlayer
            );
            break;
          case "Lightning Scion":
            newGameState = applyTalentMessage(
              newGameState,
              "Defibrillation",
              "Defibrillation",
              "Defibrillation grants Lightning Scions immunity to Frost.",
              attackerPlayer
            );
            break;
        }
      }
    } else {
      victim.afflictions.frost
        ? (victim.afflictions.frost = Math.max(
            victim.afflictions.frost,
            duration
          ))
        : (victim.afflictions.frost = duration);
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
    const attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];
    const victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    //Land Scions are immune to paralysis from land skills
    //Lightning Scions are immune to paralysis if they have 3 charges
    const isImmuneToParalysis = () =>
      (["Upheaval", "Pitfall Trap", "Geomancy"].includes(special) &&
        victim.unitClass === "Land Scion" &&
        !isMuted(victim)) ||
      (victim.charge === 3 && !isMuted(victim));

    //record previous target
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

    //Victim enhanced with ward negates affliction
    if (victim.enhancements.ward) {
      delete victim.enhancements.ward;
      return newGameState;
    }

    if (isImmuneToParalysis()) {
      newGameState.activatingUnit.push(victim);
      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Talent Conclusion",
        unit: victim,
      });

      switch (victim.unitClass) {
        case "Land Scion":
          newGameState = applyTalentMessage(
            newGameState,
            "SaltTheEarth2",
            "Salt the Earth",
            "Salt the Earth grants Land Scions immunity to Paralysis due to Land skills.",
            attackerInfo.player
          );
          break;
        case "Lightning Scion":
          newGameState = applyTalentMessage(
            newGameState,
            "Defibrillation",
            "Defibrillation",
            "Defibrillation grants Lightning Scions immunity to Paralysis if they possess 3 Charges.",
            attackerInfo.player
          );
          break;
      }
    } else {
      victim.afflictions.paralysis
        ? (victim.afflictions.paralysis = Math.max(
            victim.afflictions.paralysis,
            duration
          ))
        : (victim.afflictions.paralysis = duration);

      //If Cataclysmic Tempest
      if (special === "Cataclysmic Tempest") {
        attacker.temporary.cataclysmicFloat += 1;
      }

      //If PitfallTrap Succeeded
      if (special === "Pitfall Trap") {
        attacker.temporary.pitfallTrapBlast = true;
      }

      if (attacker.unitClass === "Land Scion" && attacker.leyline !== 3) {
        newGameState.activatingUnit.push(attacker);
        newGameState.activatingSkill.push("SaltTheEarth");
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: attacker,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Activating Salt the Earth",
          unit: attacker,
        });
      }
    }

    return newGameState;
  };

  const applyScore = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Scoring"
    newGameState.currentResolution.pop();

    const applyScoreUnit = (unit) => {
      unit.enhancements = { score: true };
      unit.afflictions = {};
      unit.aether = 0;
      unit.hp = 0;
      delete unit.ember;
      delete unit.torrent;
      delete unit.cyclone;
      delete unit.leyline;
      delete unit.charge;
      delete unit.seal;
      delete unit.sharpness;
      delete unit.blossom;
    };

    let units = newGameState[self].units;

    for (let unit of units) {
      if (unit && !unit.enhancements.score) {
        if (unit.row === 9 && self === "guest") {
          //Guest scores
          //Grant score
          newGameState.guest.score += 1;
          applyScoreUnit(unit);

          //Gain 3 BP
          newGameState.guest.bountyPoints = Math.min(
            10,
            newGameState.guest.bountyPoints + 3
          );

          //Enemy gains 6 DP
          newGameState.host.defiancePoints = 6;
        } else if (unit.row === 0 && self === "host") {
          //Host scores
          //Grant score
          newGameState.host.score += 1;
          applyScoreUnit(unit);

          //Gain 3 BP
          newGameState.host.bountyPoints = Math.min(
            10,
            newGameState.host.bountyPoints + 3
          );

          //Enemy gains 6 DP
          newGameState.guest.defiancePoints = 6;
        }
      }
    }

    //Change turn or end game

    if (newGameState[self].score >= newGameState.winObjective) {
      newGameState.currentResolution.push({
        resolution: "Game Over",
        player: self,
      });
      newGameState.winner = self;
    } else {
      newGameState.turnPhase = "Acquisition";
      newGameState.turnPlayer = enemy;
      newGameState.turnCount = newGameState.turnCount + 1;
      newGameState.currentResolution.push({
        resolution: "Acquisition Phase Selection",
      });
    }

    return newGameState;
  };

  const applySymphonicScreech = (unit, newGameState) => {
    if (triggerSymphonicScreech(unit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Activation",
        player: enemy,
        activator: unit,
        screech: true,
      });

      newGameState = animationDelay(newGameState, enemy);
    } else {
      newGameState = animationDelay(newGameState, self);
    }

    return newGameState;
  };

  const applyTalentMessage = (
    newGameState,
    skill,
    title,
    message,
    attackerPlayer
  ) => {
    newGameState.activatingSkill.push(skill);
    newGameState.currentResolution.push({
      resolution: "Misc.",
      resolution2: "Message To Player",
      player: attackerPlayer,
      title,
      message,
      specMessage: message,
    });

    return newGameState;
  };

  const appointShield = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (unit) {
      unit.enhancements.shield
        ? (unit.enhancements.shield = Math.max(unit.enhancements.shield, 2))
        : (unit.enhancements.shield = 2);
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

      case "Destine":
        newGameState.currentResolution.push({
          resolution: "Defiance Options",
          resolution2: "End Phase",
          player: unit.player,
        });
        break;
    }

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

    //Upon your debut talents
    uponDebutTalents(newGameState, unit);

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

    if (newGameState[unit.player].bountyUpgrades.avelhem > 0)
      unit.enhancements.shield
        ? (unit.enhancements.shield = Math.max(2, unit.enhancements.shield))
        : (unit.enhancements.shield = 2);

    if (resonator === "SA-02") {
      newGameState = drawSkill(newGameState);
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

      case 9:
        return "Avian Scion";
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

    //to do in the future: consider bypass Target
    if (triggerTarget(attacker, victim, "blast")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "blast",
      });

      newGameState.activatingTarget.push(victim);
    }

    return newGameState;
  };

  const canActivateResonance = (unit, skill) => {
    if (isMuted(unit)) {
      return false;
    }

    const canDiffusionR = (unit) => {
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

    switch (skill) {
      case "01-02":
        return (
          canActivateSkill(unit, skill) &&
          localGameState[unit.player].skillHand.length > 2
        );

      case "06-02":
        return canDiffusionR(unit);

      case "02-02":
      case "03-02":
      case "04-02":
      case "05-02":
      case "07-02":
      case "08-02":
      case "09-02":
        return canActivateSkill(unit, skill);

      default:
        return false;
    }
  };

  const canActivateSkill = (unit, skill) => {
    if (isMuted(unit)) {
      return false;
    }

    //burst skills cost 6 DP (4 if upgraded)
    if (
      allBurstSkills().includes(skill) &&
      localGameState[self].defiancePoints <
        (localGameState[self].bountyUpgrades.skill > 0 ? 4 : 6)
    ) {
      return false;
    }

    const canAerialImpetus = (unit) => {
      if (getZonesWithEnemies(unit, 1).length > 0) {
        return true;
      }

      if (
        getZonesAerialImpetusAlly(unit).length > 0 &&
        localGameState[self].skillHand.length > 1
      ) {
        return true;
      }

      return false;
    };

    const canDiffusion = (unit) => {
      if (getZonesWithEnemies(unit, 1).length < 1) {
        return false;
      }

      if (
        ["Assault"].includes(localGameState.tactics[0].face) &
        (localGameState.tactics[0].stock > 0)
      ) {
        //to-do: maybe consider unit has used tactic? then again, it normally wont be an issue

        return true;
      }

      if (
        ["Assault"].includes(localGameState.tactics[1].face) &
        (localGameState.tactics[1].stock > 0)
      ) {
        return true;
      }

      return false;
    };

    switch (skill) {
      case "01-01":
        return (
          canStrike(unit) &&
          (localGameState[self].skillHand.length >= 2 || unit.ember >= 2)
        );
      case "01-02":
        return (
          canBlast(unit) &&
          (localGameState[self].skillHand.length >= 2 || unit.ember >= 2)
        );
      case "01-03":
        return false;
      case "01-04":
        return true;

      case "02-01":
        return true;
      case "02-02":
        return getZonesWithEnemies(unit, 2).length > 0;
      case "02-03":
        return false;
      case "02-04":
        return true;

      case "03-01":
        return canAerialImpetus(unit);
      case "03-02":
        return getZonesWithEnemies(unit, 2).length > 0;
      case "03-03":
        return false;
      case "03-04":
        return getZonesWithEnemies(unit, 1).length > 0;

      case "04-01":
        return true;
      case "04-02":
        return getZonesWithEnemies(unit, 1).length > 0;
      case "04-03":
        return false;
      case "04-04":
        return true;

      case "05-01":
        return getZonesWithEnemies(unit, 1).length > 0;
      case "05-02":
        return unit.charge > 1 && canMove(unit); // needs TWO charges
      case "05-03":
        return false;
      case "05-04":
        return true;

      case "06-01":
        //unit must spend Aether
        return unit.aether > 0 && (canStrike(unit) || canMove(unit));
      case "06-02":
        return canDiffusion(unit);
      case "06-03":
        return false;
      case "06-04":
        return true;
      // return ["06-01", "06-02", "06-03"].some((s) =>
      //   localGameState[self].skillHand.includes(s)
      // );

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

      case "09-01":
        return getZonesWithEnemies(unit, 2).length > 0;

      case "09-02":
        return true;

      case "09-03":
        return false;
      case "09-04":
        return true;

      default:
        return false;
    }
  };

  const canActivateSovereignSkill = (skill) => {
    const canHeirsEndeavor = () => {
      if (localGameState[self].defiancePoints < 3) {
        return false;
      }

      const vestige = localGameState[self].skillVestige;
      for (let skill of vestige) {
        if (skill[0] === "S") {
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

    switch (skill) {
      case "SA-01": //Heir’s Endeavor
        return canHeirsEndeavor();
      case "SA-02": // Tea for Two
        return true;
      case "SA-03": // Dark Halo
        return getZonesWithScions(self).length > 0;
      // return hasScion(self);

      case "SA-04": // Reminiscence
        return (
          localGameState[self].skillVestige.length > 0 ||
          (localGameState[self].avelhemVestige.length > 0 &&
            localGameState[self].defiancePoints > 0)
        );

      case "SA-05": // Foreshadow
        return true;

      case "SB-01": // Transmute
        return hasScionSkill() && localGameState[self].defiancePoints >= 2;

      case "SB-02": // Ambidexterity
        return getZonesWithScions(self).length > 0;

      case "SB-03": // Providence
        return hasTactic(["Invoke"]);

      case "SB-04": // Fervent Prayer
        return localGameState[self].defiancePoints >= 2;

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

  const canAmplifyAura = (unit) => {
    if (unit.aether) {
      return true;
    }

    const adjacentAllies = getZonesWithAllies(unit, 1, false);
    const zones = JSON.parse(localGameState.zones);

    for (let i of adjacentAllies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const ally = localGameState[zone.player].units[zone.unitIndex];

      if (ally.aether) {
        return true;
      }
    }

    return false;
  };

  const canAscend = (newGameState, team, scionClass) => {
    let scionCount = 0;
    let unmutedPawns = 0;
    for (let unit of newGameState[team].units) {
      if (unit) {
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

  const canDeploy = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let newIndex = newGameState[self].units.indexOf(null);
    if (newIndex === -1) {
      newIndex = newGameState[self].units.length;
    }

    return !(newIndex >= 8 || getVacantFrontier().length === 0);
  };

  const canDestine = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let pawn = null;
    const units = newGameState[self].units;

    //1. get any (the first) pawn that can promote
    for (let unit of units) {
      if (unit && unit.unitClass === "Pawn" && !isMuted(unit)) {
        pawn = unit;
        break;
      }
    }

    //2. if no pawns were found in step 1, return false
    if (pawn === null) {
      return false;
    }

    //3. try to see if pawn can promote to facet of any card in hand

    const skillHand = newGameState[self].skillHand;

    for (let skill of skillHand) {
      //3.1 get facet of skill
      const skillCode = skill.substring(0, 2);

      //3.2 if facet is non-sovereign, check if can ascend
      if (!isNaN(parseInt(skillCode))) {
        if (
          canAscend(newGameState, self, avelhemToScion(parseInt(skillCode)))
        ) {
          return true;
        }
      }
    }

    //4. return false if failed to return true
    return false;
  };

  const canMove = (unit) => {
    if (getVacantAdjacentZones(unit).length > 0) {
      return true;
    }

    return false;
  };

  const canSowAndReapBlast = (unitInfo) => {
    const enemies = getZonesWithEnemies(unitInfo, 2);
    const zones = JSON.parse(localGameState.zones);

    for (let i of enemies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const enemy = localGameState[zone.player].units[zone.unitIndex];

      if (isRooted(enemy)) {
        return true;
      }
    }

    return false;
  };

  const canRaptorBlitzBlast = (unitInfo) => {
    const adjacentEnemies = getZonesWithEnemies(unitInfo, 1);
    const zones = JSON.parse(localGameState.zones);

    for (let i of adjacentEnemies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const enemy = localGameState[zone.player].units[zone.unitIndex];

      if (!enemy.aether) {
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

  const decrementBurn = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let units = newGameState[self].units;

    let burningUnits = [];
    for (let i in units) {
      if (units[i] && units[i].afflictions.burn) {
        burningUnits.push(i);
      }
    }

    if (burningUnits.length === 0) {
      newGameState.currentResolution.pop();
    } else {
      let zonesWithBurningUnits = [];

      for (let i in burningUnits) {
        const unit = newGameState[self].units[burningUnits[i]];
        const zoneId = unit.row * 5 + unit.column;

        zonesWithBurningUnits.push(zoneId);
      }

      newGameState.currentResolution.push({
        resolution: "Selecting",
        resolution2: "Selecting Unit",
        player: self,
        zoneIds: zonesWithBurningUnits,
        unit: null,
        tactic: null,
        reason: "burn damage",
        special: null,
      });

      let burnMessage =
        "You have 1 unit afflicted with Burn. Click on it to apply damage.";

      if (burningUnits.length > 1) {
        burnMessage = `You have ${burningUnits.length} units afflicted with Burn. Select which unit to apply Burn damage to first.`;
      }

      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Message To Player",
        player: self,
        title: "Final Phase",
        message: burnMessage,
      });
    }

    return newGameState;
  };

  const decrementStatus = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Status Decrement"
    newGameState.currentResolution.pop();

    let units = newGameState[self].units;

    for (let u in units) {
      if (units[u]) {
        let unit = units[u];

        unit.afflictions.anathema ? unit.afflictions.anathema-- : null;
        unit.afflictions.paralysis ? unit.afflictions.paralysis-- : null;
        unit.afflictions.frost ? unit.afflictions.frost-- : null;

        unit.enhancements.shield ? unit.enhancements.shield-- : null;
        unit.enhancements.ward ? unit.enhancements.ward-- : null;

        unit.seal ? unit.seal-- : null;

        unit = units[u];
      }
    }

    // newGameState[self].units = units; <--- line not needed

    return newGameState;
  };

  const drawAvelhem = (newGameState) => {
    if (newGameState[self].avelhemRepertoire.length === 0) {
      newGameState = refillRepertoireAvelhem(newGameState);

      if (newGameState[self].avelhemRepertoire.length === 0) {
        return newGameState;
      }
    }

    //transfer card from deck to hand
    newGameState[self].avelhemHand.unshift(
      newGameState[self].avelhemRepertoire.pop()
    );

    //decrease floating count
    newGameState[self].avelhemFloat = Math.max(
      0,
      newGameState[self].avelhemFloat - 1
    );

    //If deck empties, shuffle discard pile into it.
    if (newGameState[self].avelhemRepertoire.length === 0) {
      newGameState = refillRepertoireAvelhem(newGameState);

      // newGameState[self].avelhemVestige = shuffleCards(
      //   newGameState[self].avelhemVestige
      // );
      // newGameState[self].avelhemRepertoire = [
      //   ...newGameState[self].avelhemVestige.splice(
      //     0,
      //     newGameState[self].avelhemVestige.length
      //   ),
      // ];
    }

    return newGameState;
  };

  const drawSkill = (newGameState) => {
    //transfer card from deck to hand
    newGameState[self].skillHand.unshift(
      newGameState[self].skillRepertoire.pop()
    );

    //decrease floating count

    if (newGameState[self].skillFloat > 0) {
      newGameState[self].skillFloat -= 1;
    }

    if (newGameState[self].skillRepertoire.length === 0) {
      newGameState = refillRepertoireSkill(newGameState);
    }

    return newGameState;
  };

  const eliminateUnit = (
    newGameState,
    attackerInfo,
    victimInfo,
    type,
    special
  ) => {
    let attacker = attackerInfo
      ? newGameState[attackerInfo.player].units[attackerInfo.unitIndex]
      : null;

    //Anathema-delay for non-pawns & non-ravagers
    if (
      attacker &&
      !(attacker.unitClass === "Pawn" || attacker.enhancements.ravager)
    ) {
      newGameState[attacker.player].units[
        attacker.unitIndex
      ].temporary.anathemaDelay = true;
    }

    let victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    // let newZoneInfo = JSON.parse(newGameState.zones);

    // Grant Defiance Points
    newGameState[victim.player].defiancePoints = Math.min(
      6,
      newGameState[victim.player].defiancePoints + 2
    );

    // Grant Bounty Points
    const playerBP = victim.player === "guest" ? "host" : "guest";
    newGameState[playerBP].bountyPoints = Math.min(
      10,
      newGameState[playerBP].bountyPoints + 1
    );

    //remove eliminated unit
    // newGameState[victim.player].units[victim.unitIndex] = null;
    // newZoneInfo[victim.row][victim.column].player = null;
    // newZoneInfo[victim.row][victim.column].unitIndex = null;
    // newGameState.zones = JSON.stringify(newZoneInfo);

    // "If the attack was lethal" subsequent effects
    // switch (special) {
    //   case "Parasite Bloom":
    //     // idk ;
    //     break;
    //   default:
    //     break;
    // }

    //strike movement
    if (type === "strike") {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Strike Movement",
        attacker: attacker,
        zone: victim.row * 5 + victim.column,
      });
    }

    //Remove from board
    newGameState.currentResolution.push({
      resolution: "Misc.",
      resolution2: "Unit Removal",
      unit: victim,
      player: newGameState.turnPlayer,
    });

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
    if (!isMuted(victim)) {
      switch (victim.unitClass) {
        case "Wind Scion":
          newGameState.activatingUnit.push(victim);
          newGameState.activatingSkill.push("SecondWind");

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Talent Conclusion",
            unit: victim,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Activating Second Wind",
            unit: victim,
            details: {
              title: "Second Wind",
              reason: "Second Wind",
            },
          });

          newGameState = animationDelay(newGameState, victim.player);
          break;

        case "Mana Scion":
          newGameState.activatingUnit.push(victim);
          newGameState.activatingSkill.push("AmbianceAssimilation");

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Talent Conclusion",
            unit: victim,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Activating Ambiance Assimilation",
            unit: victim,
            details: {
              reason: "Ambiance Assimilation",
              title: "Ambiance Assimilation",
              message: "You may search for 1 Mana skill.",
              no: "Skip",
              yes: "Search",
            },
          });

          newGameState = animationDelay(newGameState, victim.player);
          break;

        case "Plant Scion":
          newGameState.activatingUnit.push(victim);
          newGameState.activatingSkill.push("Everblooming");

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Talent Conclusion",
            unit: victim,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Activating Everblooming",
            unit: victim,
            details: {
              title: "Everblooming",
              reason: "Everblooming",
              // unitClone: victim, // Fungal Scion can trigger this talent, which will affect unit
            },
          });

          newGameState = animationDelay(newGameState, victim.player);
          break;

        default:
          break;
      }
    }

    return newGameState;
  };

  const eliminateUnit2 = (unit) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    let newZoneInfo = JSON.parse(newGameState.zones);

    //End "Unit Removal" resolution
    newGameState.currentResolution.pop();

    newGameState[unit.player].units[unit.unitIndex] = null;
    newZoneInfo[unit.row][unit.column].player = null;
    newZoneInfo[unit.row][unit.column].unitIndex = null;
    newGameState.zones = JSON.stringify(newZoneInfo);

    return newGameState;
  };

  const endDefiancePhase = (newGameState) => {
    newGameState.turnPhase = "Execution";
    newGameState.currentResolution.pop();
    newGameState.currentResolution.push({
      resolution: "Execution Phase",
    });

    return newGameState;
  };

  const endDefiancePhase2 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = endDefiancePhase(newGameState);
    return newGameState;
  };

  const endExecutionPhase = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    const hasUnusedAvelhems =
      (newGameState[self].bountyUpgrades.avelhem < 1 &&
        newGameState[self].avelhemHand.length > 0) ||
      (newGameState[self].bountyUpgrades.avelhem >= 1 &&
        newGameState[self].avelhemHand.length > 1);

    const message = hasUnusedAvelhems
      ? "Unused Avelhems are discarded at the Final Phase. Do you still wish to end the Execution Phase?"
      : "Are you sure you want to end the Execution Phase?";

    // if (newGameState[self].avelhemHand.length > 0) {
    newGameState.currentResolution.push({
      resolution: "Misc.",
      resolution2: "End Execution Phase Confirm",
      player: self,
      details: {
        reason: "End Execution Phase",
        title: "End Execution Phase",
        message,
        no: "Cancel",
        yes: "End Turn",
      },
    });
    // } else {
    //   return endExecutionPhase2(newGameState);
    // }

    return newGameState;
  };

  const endExecutionPhase2 = (newGameState) => {
    newGameState.turnPhase = "Final";
    newGameState.currentResolution.pop();
    newGameState.currentResolution.pop();

    //7. If at least 3 of your units have scored, you win. Otherwise, your opponent commences the next turn as the initiator.
    //6. If an ally is occupying a zone in the enemy base, grant them Score and purge all their other statuses.
    newGameState.currentResolution.push({
      resolution: "Final Phase",
      resolution2: "Scoring",
      player: self,
    });

    //5. Decrement the durations of your units’ other statuses simultaneously.
    newGameState.currentResolution.push({
      resolution: "Final Phase",
      resolution2: "Status Decrement",
      player: self,
    });

    //4. Decrement the duration of your units’ Burn affliction in your desired sequence sequence.
    newGameState.currentResolution.push({
      resolution: "Final Phase",
      resolution2: "Burn Decrement",
      player: self,
    });

    //3.5 reset Avelhem Search/Recover usage
    delete newGameState[self].hasAvelhemSearch;
    delete newGameState[self].hasAvelhemRecover;

    //3. Forfeit unused tactics and remove your units’ boosts.
    newGameState.tactics = [];

    let playerUnits = newGameState[self].units;
    for (let u in playerUnits) {
      let unit = playerUnits[u];
      if (unit) {
        unit.temporary = {};
        unit.boosts = {};
        playerUnits[u] = unit;
      }
    }
    newGameState[self].units = playerUnits;

    let enemyUnits = newGameState[enemy].units;
    for (let u in enemyUnits) {
      let unit = enemyUnits[u];
      if (unit) {
        unit.temporary = {};
        enemyUnits[u] = unit;
      }
    }
    newGameState[enemy].units = enemyUnits;

    //2. Selectively discard skills in excess of your hand limit.
    const skillHandlimit = newGameState[self].bountyUpgrades.skill > 2 ? 12 : 8;
    if (newGameState[self].skillHand.length > skillHandlimit) {
      const excessSkills = newGameState[self].skillHand.length - skillHandlimit;

      newGameState.currentResolution.push({
        resolution: "Final Phase",
        resolution2: "Skill Hand Limit",
        player: self,
        details: {
          reason: "Skill Hand Limit",
          title: "Final Phase",
          message: `The skill hand limit is ${skillHandlimit} cards. Discard ${excessSkills} excess skill${
            excessSkills === 1 ? "" : "s"
          }.`,
          count: newGameState[self].skillHand.length - skillHandlimit,
        },
      });
    }

    //1. Discard all Avelhems from your hand.
    //However, you can retain 1 if purchased the Avelhem upgrade.
    if (
      newGameState[self].avelhemHand.length > 0 &&
      newGameState[self].bountyUpgrades.avelhem > 1
    ) {
      newGameState.currentResolution.push({
        resolution: "Final Phase",
        resolution2: "Avelhem Retention",
        player: self,
        details: {
          reason: "Avelhem Hand Limit",
          title: "Final Phase",
          message: `You may retain up to 1 Avelhem; discard the rest.`,
          count: 1,
        },
      });
    } else {
      //discard all Avelhems
      newGameState[self].avelhemVestige.push(...newGameState[self].avelhemHand);
      newGameState[self].avelhemHand = [];
    }

    return newGameState;
  };

  const enterMoveMode = (zoneIds, unit, gameState, tactic, canCancel, pop) => {
    let newGameState = gameState
      ? gameState
      : JSON.parse(JSON.stringify(localGameState));

    if (pop) {
      newGameState.currentResolution.pop();
    }

    newGameState.currentResolution.push({
      resolution: "Misc.",
      resolution2: "Moving Unit",
      zoneIds: zoneIds,
      unit: unit,
      tactic: tactic,
      canCancel: canCancel,
      mover: self,
    });

    return newGameState;
  };

  const enterSelectUnitMode = (
    zoneIds,
    unit,
    gameState,
    tactic,
    reason,
    special,
    canCancel
  ) => {
    let newGameState = null;
    if (gameState) {
      newGameState = gameState;
    } else {
      newGameState = JSON.parse(JSON.stringify(localGameState));
    }

    newGameState.currentResolution.push({
      resolution: "Selecting",
      resolution2: "Selecting Unit",
      player: self,
      zoneIds,
      unit,
      tactic,
      reason,
      special,
      canCancel,
    });

    dispatch(updateState(newGameState));

    // updateFirebase(newGameState);
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
      resolution: "Apply Frost",
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

      newGameState.activatingTarget.push(victim);
    }

    return newGameState;
  };

  const getVacant2SpaceZones = (unit) => {
    const zones = JSON.parse(localGameState.zones);

    let twoSpaceZones = getZonesInRange(unit.row, unit.column, 2, false);

    twoSpaceZones = twoSpaceZones.filter(
      (z) => !zones[Math.floor(z / 5)][z % 5].player
    );

    return twoSpaceZones;
  };

  const getVacantAdjacentZones = (unit) => {
    const zones = JSON.parse(localGameState.zones);

    let adjacentZones = getZonesInRange(unit.row, unit.column, 1, false);

    adjacentZones = adjacentZones.filter(
      (z) => !zones[Math.floor(z / 5)][z % 5].player
    );

    return adjacentZones;
  };

  const getVacantFrontier = () => {
    //let frontierLength = 1 + localGameState[self].bountyUpgrades.frontier;
    //initial frontier expanded to 3 rows (0,1,2)

    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let frontierLength = 2 + newGameState[self].bountyUpgrades.frontier;

    let zones = JSON.parse(newGameState.zones);

    let validZones = [];

    if (self === "host") {
      for (let r = 9; r >= 9 - frontierLength; r--) {
        for (let c = 0; c <= 4; c++) {
          validZones.push(zones[r][c]);
        }
      }
    } else {
      for (let r = 0; r <= 0 + frontierLength; r++) {
        for (let c = 0; c <= 4; c++) {
          validZones.push(zones[r][c]);
        }
      }
    }

    //get zones that are empty
    validZones = validZones.filter((zone) => !zone.player);

    let validZonesIds = [];

    for (let i = 0; i < validZones.length; i++) {
      validZonesIds.push(validZones[i].id);
    }

    return validZonesIds;
  };

  const getZonesAerialImpetusAlly = (unit) => {
    const zones = JSON.parse(localGameState.zones);
    const adjacentAllies = getZonesWithAllies(unit, 1, false); // excludes self

    const AerialImpetusAllyZones = [];
    for (let i of adjacentAllies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const ally = localGameState[zone.player].units[zone.unitIndex];

      if (canMove(ally) && !isImmobilized(ally)) {
        AerialImpetusAllyZones.push(ally.row * 5 + ally.column);
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

    //remove scored units
    allyZones = allyZones.filter(
      (z) =>
        !localGameState[unit.player].units[
          zones[Math.floor(z / 5)][z % 5].unitIndex
        ].enhancements.score
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

    //remove scored units
    enemyZones = enemyZones.filter(
      (z) =>
        !localGameState[enemyPlayer].units[
          zones[Math.floor(z / 5)][z % 5].unitIndex
        ].enhancements.score
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

  const getZonesWithEnemiesNoAether = (unit, range) => {
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
        ].aether === 0
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
      //exclude pawns and Scions that have scored
      if (
        unit &&
        !["Pawn"].includes(unit.unitClass) &&
        !unit.enhancements.score
      ) {
        zonesWithScions.push(unit.row * 5 + unit.column);
      }
    }

    return zonesWithScions;
  };

  const grantRavager = (unitInfo) => {
    let unit = unitInfo;

    unit.enhancements.ravager = true;
    delete unit.afflictions.anathema;

    if (
      ["Fire Scion", "Water Scion"].includes(unit.unitClass) &&
      !isMuted(unit)
    ) {
      delete unit.afflictions.burn;
    }

    return unit;
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

  const ignite = (newGameState, attacker, victim) => {
    newGameState.currentResolution.push({
      resolution: "Apply Burn",
      attacker: attacker,
      victim: victim,
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

      newGameState.activatingTarget.push(victim);
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
    if (unit.enhancements.score) {
      return false;
    }

    //Note: range 1 prevents abilities & non-burst skill activation
    //Note: range 2 prevents aether-blasts and mitigation

    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(localGameState.zones);

    const zonesWithEnemies = getZonesWithEnemies(unit, range);

    for (let z of zonesWithEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const enemy = newGameState[zone.player].units[zone.unitIndex];
      if (enemy.seal > 0 && !isMuted(enemy)) {
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
      afflictions.frost ||
      afflictions.infection
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
      afflictions.frost ||
      afflictions.infection
    ) {
      return true;
    }

    return false;
  };

  const isRooted = (unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(localGameState.zones);

    if (unit.enhancements.score) {
      return false;
    }

    if (
      ["Land Scion", "Plant Scion"].includes(unit.unitClass) &&
      !isMuted(unit)
    ) {
      return false;
    }

    const zonesWithAdjacentEnemies = getZonesWithEnemies(unit, 1);

    for (let z of zonesWithAdjacentEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const rooter = newGameState[zone.player].units[zone.unitIndex];
      if (rooter.blossom >= 3 && !isMuted(rooter)) {
        return true;
      }
    }

    return false;
  };

  const move = (newGameState, unit, zoneId, special) => {
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
    mover.row = Math.floor(zoneId / 5);
    mover.column = zoneId % 5;

    if (mover.blossom > 0) {
      mover.blossom -= 1;
    }

    newGameState[mover.player].units[mover.unitIndex] = mover;

    //pop "Moving Unit" resolution <-- Manual movement
    if (
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution2 === "Moving Unit"
    ) {
      newGameState.currentResolution.pop();
    }

    //Trigger Motion Contingency
    const moverEnemy = mover.player === "host" ? "guest" : "host";
    if (
      newGameState[moverEnemy].skillHand.length > 0 &&
      triggerMotion(mover, special)
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

  const newUnitStats = (player, index, row, column, unitClass) => {
    return {
      player: player,
      unitIndex: index,
      row: row,
      column: column,
      unitClass: unitClass,
      hp: 1,
      aether: 1,
      afflictions: {},
      enhancements: {},
      boosts: {},
      temporary: {},
    };
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

    //to do in the future: consider bypass Target
    if (triggerTarget(attacker, victim, "paralyze1")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "paralyze1",
      });

      newGameState.activatingTarget.push(victim);
    }

    return newGameState;
  };

  const refillRepertoireAvelhem = (newGameState) => {
    //If deck empties, shuffle discard pile into it.

    //1.Shuffle Vestige
    newGameState[self].avelhemVestige = shuffleCards(
      newGameState[self].avelhemVestige
    );

    //2. Copy vestige to repertoire
    newGameState[self].avelhemRepertoire = [
      ...newGameState[self].avelhemVestige,
    ];

    //3. Empty vestige
    newGameState[self].avelhemVestige = [];

    return newGameState;
  };

  const refillRepertoireSkill = (newGameState) => {
    //If deck empties, shuffle discard pile into it.

    //1.Shuffle Vestige
    let newSkillDeck = shuffleCards(newGameState[self].skillVestige);

    //2. Copy vestige to repertoire
    newGameState[self].skillRepertoire = [...newSkillDeck];

    //3. Empty vestige
    newGameState[self].skillVestige = [];

    //4. Apply Penalty
    //If one’s skill repertoire is depleted, their opponent gains 6 DP and 10 BP.
    newGameState[enemy].bountyPoints = 10;
    newGameState[enemy].defiancePoints = 6;

    //5. Safety
    newGameState[self].skillFloat = 0;

    return newGameState;
  };

  const rollTactic = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    const mobilizeLimit =
      newGameState[self].bountyUpgrades.tactics >= 2 ? 4 : 3;

    const dieFaces = [
      { face: "Advance", stock: 1, limit: 1 },
      { face: "Advance", stock: 1, limit: 1 },
      { face: "Mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "Mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "Assault", stock: 1, limit: 1 },
      { face: "Invoke", stock: 1, limit: 1 },
    ];

    return dieFaces[Math.floor(Math.random() * dieFaces.length)];
  };

  const selectAegisActivator = (victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (!zones) {
      return;
    }

    //end "Select Aegis Activator"
    newGameState.currentResolution.pop();

    const zonesWithAllies = getZonesWithAllies(victim, 1, true);
    let zonesWithManaScions = [];

    for (let z of zonesWithAllies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Mana Scion" && !isMuted(unit)) {
        zonesWithManaScions.push(z);
      }
    }

    enterSelectUnitMode(
      zonesWithManaScions,
      victim,
      newGameState,
      null,
      "aegis",
      null
    );
  };

  const selectAllies = (unitInfo, range, includeSelf, reason, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (unit && !isMuted(unit)) {
      enterSelectUnitMode(
        getZonesWithAllies(unit, range, includeSelf),
        unit,
        newGameState,
        null,
        reason,
        special
      );
    }
  };

  const selectAmbidexterity = (resonated) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Select Ambidexterity"
    newGameState.currentResolution.pop();

    const zonesWithScions = getZonesWithScions(self);

    enterSelectUnitMode(
      zonesWithScions,
      null,
      newGameState,
      null,
      "ambidexterity",
      resonated
    );
  };

  const selectAvelhemPawn = (avelhem, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Avelhem Select Pawn"
    newGameState.currentResolution.pop();

    const zonesWithPawns = getZonesForPromotion();

    enterSelectUnitMode(
      zonesWithPawns,
      resonator,
      newGameState,
      null,
      "activate avelhem",
      avelhem
    );
  };

  const selectChainLightningBlast = (unit, zones) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Chain Lightning5"
    newGameState.currentResolution.pop();

    enterSelectUnitMode(zones, unit, newGameState, null, "blast", null);
  };

  const selectDarkHalo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Select Dark Halo"
    newGameState.currentResolution.pop();

    const zonesWithScions = getZonesWithScions(self);

    enterSelectUnitMode(
      zonesWithScions,
      null,
      newGameState,
      null,
      "dark halo",
      null
    );
  };

  const selectDestine = (scionClass) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Select Destine Pawn"
    newGameState.currentResolution.pop();

    const zonesWithPawns = getZonesForPromotion();

    enterSelectUnitMode(
      zonesWithPawns,
      null,
      newGameState,
      null,
      "destine",
      scionClass
    );
  };

  const selectEnemies = (unitInfo, range, tactic, reason, special) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
      enterSelectUnitMode(
        getZonesWithEnemies(unit, range),
        unit,
        newGameState,
        tactic,
        reason,
        special
      );
    }
  };

  const selectFatedRivalry = (enemyUnit) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Selected Fated Rivalry"
    newGameState.currentResolution.pop();

    const zonesWithPawns = getZonesForPromotion();

    enterSelectUnitMode(
      zonesWithPawns,
      enemyUnit,
      newGameState,
      null,
      "fated rivalry",
      null
    );
  };

  const selectFrenzyBladeActivator = (victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (!zones) {
      return;
    }

    //end "Select Frenzy Blade Activator"
    newGameState.currentResolution.pop();

    const zonesWithEnemies = getZonesWithEnemies(victim, 1);
    let zonesWithMetalScions = [];

    for (let z of zonesWithEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (
        unit.unitClass === "Metal Scion" &&
        !isMuted(unit) &&
        !isRooted(unit)
      ) {
        zonesWithMetalScions.push(z);
      }
    }

    enterSelectUnitMode(
      zonesWithMetalScions,
      victim,
      newGameState,
      null,
      "frenzy blade",
      null
    );
  };

  const selectGuardianWingsActivator = (victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (!zones) {
      return;
    }

    //end "Select Guardian Wings Activator"
    newGameState.currentResolution.pop();

    const zonesWithAllies = getZonesWithAllies(victim, 2, true);
    let zonesWithAvianScions = [];

    for (let z of zonesWithAllies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Avian Scion" && !isMuted(unit)) {
        zonesWithAvianScions.push(z);
      }
    }

    enterSelectUnitMode(
      zonesWithAvianScions,
      victim,
      newGameState,
      null,
      "guardian wings",
      null
    );
  };

  const selectHealingRainActivator = (victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (!zones) {
      return;
    }

    //end "Select Healing Rain Activator"
    newGameState.currentResolution.pop();

    const zonesWithAllies = getZonesWithAllies(victim, 2, true);
    let zonesWithWaterScions = [];

    for (let z of zonesWithAllies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Water Scion" && !isMuted(unit)) {
        zonesWithWaterScions.push(z);
      }
    }

    enterSelectUnitMode(
      zonesWithWaterScions,
      victim,
      newGameState,
      null,
      "healing rain",
      null
    );
  };

  const selectMatchMadeInHeavenPawn = (unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (!zones) {
      return;
    }

    //end "Select Match Made in Heaven Pawn"
    newGameState.currentResolution.pop();

    const zonesWithAllies = getZonesWithAllies(unit, 2, false);
    let zonesWithPawns = [];

    for (let z of zonesWithAllies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const ally = newGameState[zone.player].units[zone.unitIndex];

      if (ally.unitClass === "Pawn" && !isMuted(ally)) {
        zonesWithPawns.push(z);
      }
    }

    enterSelectUnitMode(
      zonesWithPawns,
      unit,
      newGameState,
      null,
      "match made in heaven",
      "Match Made in Heaven"
    );
  };

  const selectPitfallTrapActivator = (mover) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (!zones) {
      return;
    }

    //end "Select Pitfall Trap Activator"
    newGameState.currentResolution.pop();

    const zonesWithEnemies = getZonesWithEnemies(mover, 1);
    let zonesWithLandScions = [];

    for (let z of zonesWithEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Land Scion" && !isMuted(unit)) {
        zonesWithLandScions.push(z);
      }
    }

    enterSelectUnitMode(
      zonesWithLandScions,
      mover,
      newGameState,
      null,
      "pitfall trap",
      null
    );
  };

  const selectSymphonicScreechActivator = (activator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (!zones) {
      return;
    }

    //end "Select Symphonic Screech Activator"
    newGameState.currentResolution.pop();

    const zonesWithEnemies = getZonesWithEnemies(activator, 2);
    let zonesWithWindScions = [];

    for (let z of zonesWithEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Wind Scion" && !isMuted(unit) && unit.hp > 0) {
        zonesWithWindScions.push(z);
      }
    }

    enterSelectUnitMode(
      zonesWithWindScions,
      activator,
      newGameState,
      null,
      "symphonic screech",
      null
    );
  };

  const selectVengefulLegacy = (victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (!zones) {
      return;
    }

    //end "Select Vengeful Legacy"
    newGameState.currentResolution.pop();

    const allies = getZonesWithAllies(victim, 2, false);

    const zonesWithPawns = [];
    for (let i of allies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Pawn" && !isMuted(unit)) {
        zonesWithPawns.push(i);
      }
    }

    enterSelectUnitMode(
      zonesWithPawns,
      victim,
      newGameState,
      null,
      "vengeful legacy",
      null
    );
  };

  const selectViridianGraveActivator = (victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (!zones) {
      return;
    }

    //end "Select Viridian Grave Activator"
    newGameState.currentResolution.pop();

    let adjacentZones = [];

    if (victim.player === self) {
      adjacentZones = getZonesWithAllies(victim, 1, false);
    } else {
      adjacentZones = getZonesWithEnemies(victim, 1);
    }

    let zonesWithPlantScions = [];

    for (let z of adjacentZones) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Plant Scion" && !isMuted(unit)) {
        zonesWithPlantScions.push(z);
      }
    }

    enterSelectUnitMode(
      zonesWithPlantScions,
      victim,
      newGameState,
      null,
      "viridian grave",
      null
    );
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

    //to do in the future: consider bypass Target

    if (triggerTarget(attacker, victim, "strike")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "strike",
      });

      newGameState.activatingTarget.push(victim);
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

  const triggerAscensionAlly = (newGameState, unit, scionClass, method) => {
    if (newGameState.skipAscensionTrigger?.includes("SC-03")) {
      return false;
    }

    return triggerMatchMadeInHeaven(newGameState, unit, scionClass, method);
  };

  const triggerAscensionEnemy = (newGameState, unit, scionClass, method) => {
    if (newGameState.skipAscensionTrigger?.includes("SC-02")) {
      return false;
    }

    return triggerFatedRivalry(newGameState, unit, scionClass, method);
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
      ["strike", "aether-blast", "blast"].includes(method) && //only attacks can trigger it
      localGameState[victim.player].skillHand.length > 0 &&
      getZonesWithEnemies(victim, 1).length > 0 //must be able to burn an adjacent foe
    ) {
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
    if (["Fated Rivalry"].includes(method)) {
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
        !isRooted(unit)
      ) {
        return true;
      }
    }

    return false;
  };

  const triggerGuardianWings = (victim) => {
    if (localGameState[victim.player].skillHand.length < 2) {
      return false;
    }

    const zones = JSON.parse(localGameState.zones);
    const alliesInRange = getZonesWithAllies(victim, 2, true); // includes self

    for (let i of alliesInRange) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Avian Scion" && !isMuted(unit)) {
        return true;
      }
    }

    return false;
  };

  const triggerHealingRain = (victim) => {
    const zones = JSON.parse(localGameState.zones);
    const alliesInRange = getZonesWithAllies(victim, 2, true); // includes self

    for (let i of alliesInRange) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Water Scion" && !isMuted(unit)) {
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

  const triggerMotion = (mover, special) => {
    if (mover.unitClass === "Wind Scion" && !isMuted(mover)) {
      return false;
    }

    if (triggerPitfallTrap(mover, special)) {
      return true;
    }

    return false;
  };

  const triggerPitfallTrap = (mover, special) => {
    if (special === "strike") {
      return false;
    }

    const zones = JSON.parse(localGameState.zones);
    const adjacentEnemies = getZonesWithEnemies(mover, 1);

    for (let i of adjacentEnemies) {
      const zone = zones[Math.floor(i / 5)][i % 5];
      const unit = localGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Land Scion" && !isMuted(unit)) {
        return true;
      }
    }

    return false;
  };

  const triggerPowerAtTheFinalHour = (victim) => {
    return !isMuted(victim) && victim.unitClass === "Pawn" ? true : false;
  };

  const triggerSymphonicScreech = (unit) => {
    const zones = JSON.parse(localGameState.zones);

    //NERF: Wind Scions no longer block Screech
    // //if activator is Wind Scion or adjacent to an unmuted ally Wind Scion, Screech will not trigger
    // const allyZones = getZonesWithAllies(unit, 1, true);

    // for (let z of allyZones) {
    //   const unitIndex = zones[Math.floor(z / 5)][z % 5].unitIndex;

    //   if (
    //     localGameState[self].units[unitIndex].unitClass === "Wind Scion" &&
    //     !isMuted(localGameState[self].units[unitIndex])
    //   ) {
    //     return false;
    //   }
    // }

    if (localGameState[enemy].skillHand.length) {
      const enemyZones = getZonesWithEnemies(unit, 2);
      for (let z of enemyZones) {
        const unitIndex = zones[Math.floor(z / 5)][z % 5].unitIndex;
        const enemyUnit = localGameState[enemy].units[unitIndex];
        if (
          enemyUnit.unitClass === "Wind Scion" &&
          !isMuted(enemyUnit) &&
          enemyUnit.hp > 0
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const triggerSurvivalAlly = (victim) => {
    return triggerPowerAtTheFinalHour(victim) || triggerHealingRain(victim);
  };

  const triggerSurvivalEnemy = (victim) => {
    return triggerFrenzyBlade(victim);
  };

  const triggerTarget = (attacker, victim, type) => {
    if (
      triggerBlazeOfGlory(victim, type) ||
      triggerThunderThaumaturge(attacker, victim) ||
      triggerAegis(victim) ||
      triggerGuardianWings(victim)
    ) {
      return true;
    }

    return false;
  };

  const triggerThunderThaumaturge = (attacker, victim) => {
    if (
      victim.unitClass === "Lightning Scion" && //must be Lightning Scion
      !isMuted(victim) &&
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

      if (unit.unitClass === "Plant Scion" && !isMuted(unit)) {
        return true;
      }
    }

    return false;
  };

  const uponDebutTalents = (newGameState, unit) => {
    switch (unit.unitClass) {
      case "Fire Scion":
        delete unit.afflictions.burn;

        newGameState.activatingUnit.push(unit);
        newGameState.activatingSkill.push("FromTheAshes");
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: unit,
        });

        if (
          !["01-01", "01-02", "01-03", "01-04"].some((s) =>
            newGameState[unit.player].skillVestige.includes(s)
          )
        ) {
          newGameState.currentResolution.push({
            resolution: "Misc.",
            resolution2: "Message To Player",
            player: self,
            title: "From the Ashes",
            message: "You do not have any Fire skills to recover.",
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Activating From the Ashes",
            unit: unit,
            details: {
              title: "From the Ashes",
              message:
                "You may spend 1 skill to recover then float 1 Fire skill.",
              restriction: null,
              reason: "From the Ashes",
            },
          });
        }

        break;

      case "Water Scion":
        delete unit.afflictions.burn;

        newGameState.activatingUnit.push(unit);
        newGameState.activatingSkill.push("Kleptothermy");
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
        newGameState.activatingSkill.push("MountainStance");
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Talent Conclusion",
          unit: unit,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Activating Mountain Stance",
          unit: unit,
        });
        break;

      case "Lightning Scion":
        newGameState.activatingUnit.push(unit);
        newGameState.activatingSkill.push("LightningRod");
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
            message: "You may spend 1 skill to gain 1 Charge.",
            restriction: null,
            reason: "Lightning Rod",
          },
        });
        break;

      case "Metal Scion":
        newGameState.activatingUnit.push(unit);
        newGameState.activatingSkill.push("Conduction");
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
  };

  const unitRetainSkill = (unitInfo, skill, resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    if (unit && !isMuted(unit)) {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Retain resonant skill",
        unit: unit,
        player: unit.player,
        skill: skill,
        resonator: resonator,
      });
    }

    return newGameState;
  };

  const aetherBlast = (newGameState, attacker, victim) => {
    newGameState.currentResolution.push({
      resolution: "Apply Damage",
      attacker: attacker,
      victim: victim,
      type: "blast",
    });

    newGameState.currentResolution.push({
      resolution: "Mitigating Aether-Blast1",
      unit: victim,
      attacker: attacker,
    });

    //to do in the future: consider bypass Target
    if (triggerTarget(attacker, victim, "aether-blast")) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Target",
        attacker: attacker,
        victim: victim,
        type: "aether-blast",
      });

      newGameState.activatingTarget.push(victim);
    }

    newGameState[attacker.player].units[attacker.unitIndex].aether = 0;

    return newGameState;
  };

  const aetherBlastMitigate = (attackerInfo, victimInfo) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    const attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];
    const victim = newGameState[victimInfo.player].units[victimInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (
      !isMuted(attacker) &&
      victim.aether &&
      !isMuted(victim) &&
      !isDisrupted(victim, 1)
    ) {
      newGameState.currentResolution.push({
        resolution: "Mitigating Aether-Blast2",
        unit: victim,
        attacker: attacker,
        details: {
          reason: "Mitigate Aether-Blast",
          title: "Mitigate Aether-Blast",
          message: `The enemy ${attacker.unitClass} is about to Aether-blast your ${victim.unitClass}. Your unit may spend their Aether to reduce the attack’s AP by
          1.`,
          no: "Skip",
          yes: "Reduce AP",
        },
      });

      newGameState.activatingTarget.push(victim);
    }

    return newGameState;
  };

  return {
    activateAegis,
    activateAvelhem,
    activateAvelhemRecover,
    activateBlackBusinessCard,
    activateBlazeOfGlory,
    activateHealingRain,
    activateFatedRivalry,
    activateFrenzyBlade,
    activateGuardianWings,
    activateMatchMadeInHeaven,
    activatePowerAtTheFinalHour,
    activatePitfallTrap,
    activateSkill,
    activateSovereignSkill,
    activateSovereignSkillAndResonate,
    activateSymphonicScreech,
    activateThunderThaumaturge,
    activateVengefulLegacy,
    activateViridianGrave,
    aetherBlastDraw,
    aetherRestoreSpecial,
    animationDelay,
    applyAnathema,
    applyBurn,
    applyBurnDamage,
    applyDamage,
    applyFrost,
    applyParalysis,
    applyScore,
    appointShield,
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
    canAmplifyAura,
    canBlast,
    canDeploy,
    canDestine,
    canRaptorBlitzBlast,
    canSowAndReapBlast,
    canSowAndReapStrike,
    canMove,
    canStrike,
    decrementBurn,
    decrementStatus,
    drawAvelhem,
    drawSkill,
    eliminateUnit2,
    endDefiancePhase,
    endDefiancePhase2,
    endExecutionPhase,
    endExecutionPhase2,
    enterMoveMode,
    enterSelectUnitMode,
    floatAvelhem,
    floatSkill,
    freeze1,

    getVacant2SpaceZones,
    getVacantAdjacentZones,
    getVacantFrontier,
    getZonesAerialImpetusAlly,
    getZonesForPromotion,
    getZonesInRange,
    getZonesWithAllies,
    getZonesWithEnemies,
    getZonesWithEnemiesAfflicted,
    getZonesWithEnemiesNoAether,
    getZonesWithEnemiesRooted,
    getZonesWithScions,
    grantRavager,
    ignite,
    isAdjacent,
    isDisrupted,
    isImmobilized,
    isMuted,
    isRooted,
    move,
    newUnitStats,
    paralyze1,
    refillRepertoireAvelhem,
    refillRepertoireSkill,
    rollTactic,
    selectAegisActivator,
    selectAllies,
    selectAmbidexterity,
    selectAvelhemPawn,
    selectChainLightningBlast,
    selectDarkHalo,
    selectDestine,
    selectEnemies,
    selectFatedRivalry,
    selectFrenzyBladeActivator,
    selectHealingRainActivator,
    selectGuardianWingsActivator,
    selectMatchMadeInHeavenPawn,
    selectPitfallTrapActivator,
    selectSymphonicScreechActivator,
    selectVengefulLegacy,
    selectViridianGraveActivator,
    shuffleCards,
    strike,
    strikeMove,
    triggerAegis,
    triggerBlackBusinessCard,
    triggerBlazeOfGlory,
    triggerFatedRivalry,
    triggerFrenzyBlade,
    triggerGuardianWings,
    triggerHealingRain,
    triggerMatchMadeInHeaven,
    triggerMotion,
    triggerPitfallTrap,
    triggerPowerAtTheFinalHour,
    triggerThunderThaumaturge,
    triggerVengefulLegacy,
    triggerViridianGrave,
    unitRetainSkill,
    uponDebutTalents,
    aetherBlast,
    aetherBlastMitigate,
  };
};
