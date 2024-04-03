import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import gameState from "../redux/gameState";

import { useRecurringEffects } from "./useRecurringEffects";

export const useSovereignSkillEffects = () => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { drawSkill, isAdjacent } = useRecurringEffects();

  const heirsEndeavor1 = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Activating Heir's Endeavor" resolution
    newGameState.currentResolution.pop();

    newGameState[self].fateDefiances -= 1;

    newGameState.currentResolution.push({
      resolution: "Recover Skill",
      player: self,
      restriction: [
        "SX-01", // SA-01 (Heir's Endeavor) is excluded
        "SA-02",
        "SA-03",
        "SA-04",
        "SA-05",
        "SB-01",
        "SB-02",
        "SB-03",
        "SB-04",
        "SB-05",
        "SC-01",
        "SC-02",
        "SC-03",
        "SC-04",
        "SC-05",
        "SD-01",
      ],
      message: "Recover 1 Sovereign skill other than “Heir's Endeavor”.",
      outcome: "Add",
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
        restriction: [
          "SA-01",
          "SA-02",
          "SA-03",
          "SA-04",
          "SA-05",
          "SB-01",
          "SB-02",
          "SB-03",
          "SB-04",
          "SB-05",
          "SC-01",
          "SC-02",
          "SC-03",
          "SC-04",
          "SC-05",
          "SD-01",
        ],
        outcome: "Float",
        title: "Heir's Endeavor",
        message:
          "Inspect 5 skills. You may float 1 Sovereign skill among them.",
        inspectionCount: 5,
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

      default:
        break;
    }

    newGameState.currentResolution.push({
      resolution: "Search Skill",
      player: self,
      restriction: [standardSkill],
      message: "Search for 1 standard skill of their class.",
      outcome: "Add",
    });

    return newGameState;
  };

  const fatedRivalry1 = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Activating Match Made in Heaven" resolution
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
      newGameState = drawSkill(newGameState);
      newGameState = drawSkill(newGameState);
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
            "You may spend 1 skill to grant both of them Ward for 2 turns.",
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

    return newGameState;
  };

  //end of list

  return {
    heirsEndeavor1,
    heirsEndeavorResonance,
    darkHalo1,
    ambidexterity1,
    ambidexterityR1,
    fatedRivalry1,
    fatedRivalry2,
    matchMadeInHeaven1,
    matchMadeInHeaven2,
    matchMadeInHeaven3,
  };
};
