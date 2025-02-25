import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import gameState from "../redux/gameState";

import { useCardDatabase } from "./useCardDatabase";

import { useRecurringEffects } from "./useRecurringEffects";

export const useSovereignSkillEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const {
    avelhemToScion,
    canDeploy,
    drawAvelhem,
    drawSkill,
    grantRavager,
    isAdjacent,
  } = useRecurringEffects();

  const { getScionSet, pressTheAttackList, sovereignSkillList } =
    useCardDatabase();

  const heirsEndeavor1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Heir’s Endeavor" resolution
    newGameState.currentResolution.pop();

    newGameState[self].fateDefiance -= 3;

    newGameState.currentResolution.push({
      resolution: "Recover Skill",
      player: self,
      details: {
        title: "Heir’s Endeavor",
        reason: "Heir’s Endeavor",
        restriction: [...sovereignSkillList()],
        message: "Spend 3 FD to recover 1 Sovereign skill.",
        outcome: "Add",
      },
    });

    return newGameState;
  };

  const heirsEndeavorResonance = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    //end "Heirs Endeavor Resonance"
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Misc.",
      resolution2: "Inspect Skill",
      player: self,
      details: {
        restriction: sovereignSkillList(),
        title: "Heir’s Endeavor",
        reason: "Heir’s Endeavor",
        message:
          "Inspect 4 skills; you may add 1 Sovereign skill among them to your hand.",
        inspectionCount: 4,
        select: "Single",
        outcome: "Add",
      },
    });

    return newGameState;
  };

  const teaForTwo1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Tea for Two" resolution
    newGameState.currentResolution.pop();

    newGameState = drawSkill(newGameState);
    newGameState = drawSkill(newGameState);

    newGameState.currentResolution.push({
      resolution: "Sovereign Standard Skill",
      resolution2: "Tea for Two1",
      player: self,
      details: {
        title: "Tea for Two",
        reason: "Tea for Two",
      },
    });

    return newGameState;
  };

  const darkHalo1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Dark Halo" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Sovereign Standard Skill",
      resolution2: "Select Dark Halo",
      player: self,
    });

    return newGameState;
  };

  const reminiscence1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Reminiscence" resolution
    newGameState.currentResolution.pop();

    if (
      (localGameState.tactics[0].face === "Invoke" &&
        localGameState.tactics[0].stock > 0) ||
      (localGameState.tactics[1].face === "Invoke" &&
        localGameState.tactics[1].stock > 0)
    ) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Standard Skill",
        resolution2: "Reminiscence2",
        // unit: null,
        player: self,
        details: {
          title: "Reminiscence",
          message: "You may use an Invoke tactic to draw 3 skills.",
          restriction: ["Invoke"],
          stock: 1,
          reason: "Reminiscence",
          canSkip: true,
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Sovereign Standard Skill",
      resolution2: "Reminiscence1",
      player: self,
      unit: null,
      details: {
        title: "Reminiscence",
        reason: "Reminiscence",
      },
    });

    return newGameState;
  };

  const foreshadow1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Foreshadow" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Sovereign Standard Skill",
      resolution2: "Foreshadow2",
      player: self,
      discardedBurst: false,
    });

    newGameState.currentResolution.push({
      resolution: "Sovereign Standard Skill",
      resolution2: "Foreshadow1",
      player: self,
      unit: null,
      details: {
        title: "Foreshadow",
        reason: "Foreshadow",
      },
    });

    return newGameState;
  };

  const foreshadow2 = (discardedBurst) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Foreshadow2" resolution
    newGameState.currentResolution.pop();

    if (discardedBurst) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Standard Skill",
        resolution2: "Foreshadow3",
        player: self,
      });
    }

    if (newGameState[self].skillFloat > 0) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Standard Skill",
        resolution2: "Foreshadow Draw",
        player: self,
        details: {
          reason: "Foreshadow Draw",
          title: "Foreshadow",
          message: "You may draw 1 floating skill.",
          no: "Skip",
          yes: "Draw",
        },
      });
    }

    return newGameState;
  };

  const foreshadow3 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Foreshadow3" resolution
    newGameState.currentResolution.pop();

    if (newGameState[self].skillFloat > 0) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Standard Skill",
        resolution2: "Foreshadow Draw",
        player: self,
        details: {
          reason: "Foreshadow Draw",
          title: "Foreshadow",
          message: "You may draw another floating skill.",
          no: "Skip",
          yes: "Draw",
        },
      });
    }
    return newGameState;
  };

  const transmute1 = (resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Transmute" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Sovereign Resonant Skill",
      resolution2: "Transmute1",
      player: self,
      resonated: resonator ? "resonated" : null,
      details: {
        reason: "Transmute",
        title: "Transmute",
        message:
          "Reveal the aspects of 1 or 2 Scions skills and shuffle them into your repertoire. For each revealed aspect, search for 1 matching skill.",
        count: 2,
      },
    });

    return newGameState;
  };

  const transmuteR1 = (skills) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating TransmuteR1" resolution
    newGameState.currentResolution.pop();

    for (let skill of skills) {
      const skillCode = skill.substring(0, 2);

      newGameState.currentResolution.push({
        resolution: "Search Card",
        player: self,
        details: {
          avelhem: true,
          restriction: [parseInt(skillCode)],
          exclusion: [],
          searchTitle: "Transmute",
          searchMessage: `Search for 1 ${avelhemToScion(
            parseInt(skillCode)
          ).replace("Scion", "Avelhem")}.`,
          outcome: "Add",
          revealTitle: null,
          revealMessage: null,
          messageTitle: "Transmute",
          message: null,
          specMessage: null,
        },
      });
    }

    return newGameState;
  };

  const ambidexterity1 = (resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Ambidexterity" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Sovereign Resonant Skill",
      resolution2: "Select Ambidexterity",
      player: self,
      resonated: resonator ? "resonated" : null,
    });

    return newGameState;
  };

  const ambidexterityR1 = (unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "AmbidexterityR1" resolution
    newGameState.currentResolution.pop();

    let standardSkill = null;

    switch (unit.unitClass) {
      case "Fire Scion":
        standardSkill = "01-01";
        break;
      case "Water Scion":
        standardSkill = "02-01";
        break;
      case "Wind Scion":
        standardSkill = "03-01";
        break;
      case "Land Scion":
        standardSkill = "04-01";
        break;
      case "Lightning Scion":
        standardSkill = "05-01";
        break;
      case "Mana Scion":
        standardSkill = "06-01";
        break;
      case "Metal Scion":
        standardSkill = "07-01";
        break;
      case "Plant Scion":
        standardSkill = "08-01";
        break;
      case "Avian Scion":
        standardSkill = "09-01";
        break;

      default:
        break;
    }

    newGameState.currentResolution.push({
      resolution: "Search Card",
      player: self,
      details: {
        restriction: [standardSkill],
        exclusion: [],
        searchTitle: "Ambidexterity",
        searchMessage: "Search for 1 standard skill of their class",
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

  const ferventPrayer1 = (resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Fervent Prayer" resolution
    newGameState.currentResolution.pop();

    newGameState[self].fateDefiance -= 2;

    let count = 2;
    if (resonator) {
      count = 3;
      newGameState.currentResolution.push({
        resolution: "Sovereign Resonant Skill",
        resolution2: "Fervent PrayerR1",
        player: self,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Sovereign Resonant Skill",
      resolution2: "Fervent Prayer2",
      player: self,
      details: {
        reason: "Fervent Prayer",
        title: "Fervent Prayer",
        message: `Select up to ${count} Avelhems to retain; discard the rest.`,
        count: count,
      },
    });

    let limit = 4;
    newGameState.currentResolution.push({
      resolution: "Sovereign Resonant Skill",
      resolution2: "Fervent Prayer1",
      player: self,
      details: {
        reason: "Fervent Prayer",
        title: "Fervent Prayer",
        message: `You may draw 1 Avelhem up to ${limit} more times.`,
        no: "Stop",
        yes: "Draw",
        limit: limit,
      },
    });

    newGameState = drawAvelhem(newGameState);

    return newGameState;
  };

  const ferventPrayerR1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Fervent PrayerR1" resolution
    newGameState.currentResolution.pop();

    if (newGameState[self].avelhemVestige.length > 0) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Resonant Skill",
        resolution2: "Fervent PrayerR2",
        player: self,
      });
    }

    return newGameState;
  };

  const providence1 = (resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Providence" resolution
    newGameState.currentResolution.pop();

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Resonant Skill",
        resolution2: "ProvidenceR1",
        player: self,
      });
    }

    newGameState.currentResolution.push({
      resolution: "Sovereign Resonant Skill",
      resolution2: "Providence1",
      details: {
        title: "Providence",
        message: "Use an Invoke tactic to draw 3 Avelhems and 3 skills.",
        restriction: ["Invoke"],
        stock: 1,
        reason: "Providence",
        canSkip: false,
        resonated: resonator ? "resonated" : null,
      },
    });

    return newGameState;
  };

  const providenceR1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "ProvidenceR1" resolution
    newGameState.currentResolution.pop();

    newGameState[self].fateDefiance = Math.min(
      6,
      newGameState[self].fateDefiance + 3
    );

    //Resonance also grants an advance tactic, but that will be handled via spending the invoke

    return newGameState;
  };

  const pressTheAttack1 = (resonator) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Press the Attack" resolution
    newGameState.currentResolution.pop();

    if (resonator) {
      newGameState.currentResolution.push({
        resolution: "Search Card",
        player: self,
        details: {
          restriction: pressTheAttackList(),
          exclusion: [],
          searchTitle: "Press the Attack",
          searchMessage:
            "Search for 1 non-burst Scion skill that enables the activator to strike or blast",
          outcome: "Add",
          revealTitle: "Press the Attack",
          revealMessage: "Your opponent has searched for and revealed a skill.",
          messageTitle: null,
          message: null,
          specMessage: `${
            self === "host" ? "Gold" : "Silver"
          } Sovereign has searched for and revealed a skill.`,
        },
      });
    }

    if (canDeploy()) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Resonant Skill",
        resolution2: "Press the Attack2",
        player: self,
        details: {
          reason: "Press the Attack Pawn",
          title: "Press the Attack",
          message: "You may deploy a pawn in your frontier.",
          no: "Skip",
          yes: "Deploy",
        },
      });
    }

    newGameState.currentResolution.push({
      resolution: "Sovereign Resonant Skill",
      resolution2: "Press the Attack1",
      player: self,
      details: {
        reason: "Press the Attack Avelhem",
        title: "Press the Attack",
        message: "You may draw 1 Avelhem.",
        no: "Skip",
        yes: "Draw",
      },
    });

    newGameState.tactics[0].face = "Assault";
    newGameState.tactics[1].face = "Assault";

    return newGameState;
  };

  const powerAtTheFinalHour1 = (unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Power at the Final Hour" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Power at the Final Hour",
      player: self,
      unit: unit,
      details: {
        reason: "Power at the Final Hour",
        title: "Power at the Final Hour",
        message: "Ascend the pawn to any eligible class.",
      },
    });

    return newGameState;
  };

  const powerAtTheFinalHour2 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Power at the Final Hour2" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Power at the Final Hour3",
      unit: unit,
    });

    if (
      getScionSet(unit.unitClass).some((s) =>
        newGameState[unit.player].skillVestige.includes(s)
      )
    ) {
      newGameState.currentResolution.push({
        resolution: "Recover Skill",
        player: self,
        canSkip: true,
        details: {
          title: "Power at the Final Hour",
          reason: "Power at the Final Hour",
          restriction: getScionSet(unit.unitClass),
          message: `You may recover 1 ${unit.unitClass.replace(
            "Scion",
            "skill"
          )}.`,
          outcome: "Add",
        },
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Message To Player",
        player: self,
        title: "Power at the Final Hour",
        message: "There are no valid skills to recover.",
      });
    }

    return newGameState;
  };

  const powerAtTheFinalHour3 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Power at the Final Hour3" resolution
    newGameState.currentResolution.pop();

    unit.aether = 1;
    newGameState[unit.player].fateDefiance = Math.min(
      6,
      newGameState[unit.player].fateDefiance + 2
    );

    //

    return newGameState;
  };

  const fatedRivalry1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Fated Rivalry" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Select Fated Rivalry",
      player: self,
      unit: unit,
    });

    return newGameState;
  };

  const fatedRivalry2 = (unit1Info, unit2Info) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit1 = newGameState[unit1Info.player].units[unit1Info.unitIndex];
    let unit2 = newGameState[unit2Info.player].units[unit2Info.unitIndex];

    // end "Fated Rivalry2"
    newGameState.currentResolution.pop();

    if (
      Math.abs(unit1.row - unit2.row) <= 2 &&
      Math.abs(unit1.column - unit2.column) <= 2
    ) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Contingent Skill",
        resolution2: "Fated Rivalry3",
        player: self,
        details: {
          title: "Fated Rivalry",
          reason: "Fated Rivalry",
          unit: unit1,
        },
      });
    }
    return newGameState;
  };

  const matchMadeInHeaven1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Match Made in Heaven" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Select Match Made in Heaven Pawn",
      unit: unit,
    });

    return newGameState;
  };

  const matchMadeInHeaven2 = (unit1Info, unit2Info) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit1 = newGameState[unit1Info.player].units[unit1Info.unitIndex];
    let unit2 = newGameState[unit2Info.player].units[unit2Info.unitIndex];

    // end "Match Made in Heaven2"
    newGameState.currentResolution.pop();

    if (newGameState[self].skillHand.length > 0 || isAdjacent(unit1, unit2)) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Contingent Skill",
        resolution2: "Match Made in Heaven4",
        player: self,
        unit: null,
        details: {
          title: "Match Made in Heaven",
          message:
            "You may float 1 skill to grant both of them Ward for 2 turns.",
          restriction: null,
          reason: "Match Made in Heaven",
          unit1: unit1,
          unit2: unit2,
        },
      });
    }

    if (isAdjacent(unit1, unit2)) {
      newGameState.currentResolution.push({
        resolution: "Sovereign Contingent Skill",
        resolution2: "Match Made in Heaven3",
        player: self,
      });
    }

    return newGameState;
  };

  const matchMadeInHeaven3 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    // end "Match Made in Heaven3"
    newGameState.currentResolution.pop();

    newGameState = drawSkill(newGameState);
    newGameState = drawSkill(newGameState);

    return newGameState;
  };

  const vengefulLegacy1 = (victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Vengeful Legacy" resolution
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Sovereign Contingent Skill",
      resolution2: "Select Vengeful Legacy",
      player: self,
      victim: victim,
    });

    return newGameState;
  };

  const vengefulLegacy2 = (unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Vengeful Legacy2" resolution
    newGameState.currentResolution.pop();

    unit = grantRavager(unit);
    return newGameState;
  };

  const blackBusinessCard1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Black Business Card" resolution
    newGameState.currentResolution.pop();

    newGameState[self].bountyPoints = Math.min(
      10,
      newGameState[self].bountyPoints + 2
    );

    //recover Dark Halo or Vengeful Legacy
    const ravagerSkills = ["SA-03", "SC-04"];

    if (
      !ravagerSkills.some((s) => newGameState[self].skillVestige.includes(s))
    ) {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Message To Player",
        player: self,
        title: "Black Business Card",
        message: "You do not have any valid skills to recover.",
      });
    } else {
      newGameState.currentResolution.push({
        resolution: "Recover Skill",
        player: self,
        canSkip: true,
        details: {
          title: "Black Business Card",
          reason: "Black Business Card",
          restriction: ravagerSkills,
          message:
            "You may recover then float 1 skill that can grant a unit Ravager.",
          outcome: "Float",
        },
      });
    }

    return newGameState;
  };

  //end of list

  return {
    heirsEndeavor1,
    heirsEndeavorResonance,
    teaForTwo1,
    darkHalo1,
    reminiscence1,
    foreshadow1,
    foreshadow2,
    foreshadow3,
    transmute1,
    transmuteR1,
    ambidexterity1,
    ambidexterityR1,
    providence1,
    providenceR1,
    ferventPrayer1,
    ferventPrayerR1,
    pressTheAttack1,
    powerAtTheFinalHour1,
    powerAtTheFinalHour2,
    powerAtTheFinalHour3,
    fatedRivalry1,
    fatedRivalry2,
    matchMadeInHeaven1,
    matchMadeInHeaven2,
    matchMadeInHeaven3,
    vengefulLegacy1,
    vengefulLegacy2,
    blackBusinessCard1,
  };
};
