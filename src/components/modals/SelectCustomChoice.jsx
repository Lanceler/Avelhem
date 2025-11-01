import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SelectCustomChoice = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const { allBurstSkills } = useCardDatabase();

  useEffect(() => {
    setSelectedChoice(null);
  }, [props.details.reason]);

  const {
    aetherRestoreSpecial,
    canBlast,
    canDeploy,
    canMove,
    canRaptorBlitzBlast,
    canSowAndReapStrike,
    canStrike,
    drawSkill,
    enterMoveMode,
    enterSelectUnitMode,
    getVacantAdjacentZones,
    getVacantFrontier,
    getZonesAerialImpetusAlly,
    getZonesWithAllies,
    getZonesWithEnemies,
    getZonesWithEnemiesAfflicted,
    isNearRootedFoe,
    isRooted,
  } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));

  let unit = null;
  if (props.unit !== undefined && props.unit !== null) {
    unit = newGameState[props.unit.player].units[props.unit.unitIndex];
  }

  let canFirstChoice = false;
  let canSecondChoice = false;
  let canSkip = false;

  let ChoiceFirstMessage = "";
  let ChoiceSecondMessage = "";

  let updateLocal = true;
  let updateData = false;

  switch (props.details.reason) {
    case "Finesse":
      canFirstChoice = true;
      canSecondChoice = canDeploy();
      ChoiceFirstMessage = "Draw 1 skill.";
      ChoiceSecondMessage = "Deploy a pawn.";
      break;

    case "Purification":
      canFirstChoice = true;
      canSecondChoice = getZonesWithAllies(unit, 2, false).length > 0;
      ChoiceFirstMessage = "Gain Ward for 2 turns.";
      ChoiceSecondMessage =
        "Purge the afflicitions of an ally within 2 spaces; if they are adjacent, grant them Ward for 2 turns.";
      break;

    case "Healing Rain":
      canFirstChoice = true;
      canSecondChoice = ["02-01", "02-02", "02-03", "02-04"].some((s) =>
        localGameState[self].skillHand.includes(s)
      );
      ChoiceFirstMessage =
        "Restore their Aether and grant them Ward for 2 turns.";
      ChoiceSecondMessage = "Reveal 1 Water skill to raise their HP to 2.";

      break;

    case "Kleptothermy":
      canFirstChoice = true;
      canSecondChoice = getZonesWithEnemies(unit, 1).length > 0;
      ChoiceFirstMessage =
        "Restore your Aether or that of an ally within 2 spaces.";
      ChoiceSecondMessage = "Purge an adjacent foe’s Aether.";
      break;

    case "Cold Embrace":
      canFirstChoice =
        getZonesWithEnemiesAfflicted(unit, 1, "frost").length > 0 &&
        canStrike(unit);
      canSecondChoice = getZonesWithEnemies(unit, 1).length > 0;
      ChoiceFirstMessage = "Strike a frozen foe.";
      ChoiceSecondMessage = "Freeze an adjacent foe.";
      break;

    case "Aerial Impetus":
      canFirstChoice =
        getZonesAerialImpetusAlly(unit).length > 0 &&
        newGameState[unit.player].skillHand.length > 0;
      canSecondChoice = getZonesWithEnemies(unit, 1).length > 0;
      ChoiceFirstMessage =
        "Spend 1 skill to prompt an adjacent ally to traverse.";
      ChoiceSecondMessage = "Purge an adjacent foe’s Aether and Shield.";
      break;

    case "Reap the Whirlwind":
      canSkip = true;
      canFirstChoice = true;
      canSecondChoice = unit.aether && canBlast(unit);
      ChoiceFirstMessage = "Spend 2 Cyclones to restore your Aether.";
      ChoiceSecondMessage = "Spend 2 Cyclones to Aether-blast an adjacent foe.";
      break;

    case "Geomancy":
      canFirstChoice = true;
      canSecondChoice = ["04-01", "04-02", "04-03"].some((s) =>
        localGameState[self].skillVestige.includes(s)
      );
      ChoiceFirstMessage = "Raise your HP by 1 (Max 3).";
      ChoiceSecondMessage = "Recover 1 Land skill.";
      break;

    case "Galvanize":
      canFirstChoice = true;
      canSecondChoice = unit.charge >= 3 && canStrike(unit);
      ChoiceFirstMessage = "Gain 1 Charge.";
      ChoiceSecondMessage = "Spend 3 Charges to strike.";
      break;

    case "Valiant Spark":
      canFirstChoice = true;
      canFirstChoice = canMove(unit);
      canSecondChoice = canStrike(unit);
      ChoiceFirstMessage = "Spend 2 charges to traverse.";
      ChoiceSecondMessage = "Spend 2 charges to strike.";
      break;

    case "Surge":
      canFirstChoice = canMove(unit);
      canSecondChoice = canStrike(unit);
      ChoiceFirstMessage = "Traverse.";
      ChoiceSecondMessage = "Strike.";
      break;

    case "Aegis":
      canFirstChoice = true;
      canSecondChoice = newGameState[unit.player].skillHand.length > 0;
      ChoiceFirstMessage = "Grant them Shield.";
      ChoiceSecondMessage = "Spend 1 skill to grant them Ward.";
      break;

    case "Reinforce":
      canFirstChoice = true;
      canSecondChoice = newGameState[unit.player].skillHand.length > 0;
      ChoiceFirstMessage = "Draw 1 skill and gain 1 Sharpness.";
      ChoiceSecondMessage = "Spend 1 skill to gain raise your HP to 2.";
      break;

    case "Arsenal Onslaught":
      canSkip = true;
      canFirstChoice = true;
      canSecondChoice = canStrike(unit);
      ChoiceFirstMessage = "Blast a foe within 2 spaces.";
      ChoiceSecondMessage = "Strike.";
      break;

    case "Ballistic Armor":
      canFirstChoice = unit.enhancements.shield > 0;
      canSecondChoice = unit.enhancements.ward > 0;
      ChoiceFirstMessage = "Spend your Shield.";
      ChoiceSecondMessage = "Spend your Ward.";
      break;

    case "Sow and Reap":
      canFirstChoice = isNearRootedFoe(unit, 2);
      canSecondChoice = canSowAndReapStrike(unit);
      ChoiceFirstMessage =
        "Blast (pierce Shield) a rooted foe within 2 spaces.";
      ChoiceSecondMessage = "Prompt an adjacent ally to strike a rooted foe.";
      break;

    case "Viridian Grave":
      canSkip = true;
      canFirstChoice = true;
      canSecondChoice = ["08-01", "08-02", "08-03", "08-04"].some((s) =>
        newGameState[self].skillVestige.includes(s)
      );
      ChoiceFirstMessage = "Spend 1 Blossom to gain Shield for 2 turns.";
      ChoiceSecondMessage =
        "Spend 1 Blossom to recover then float 1 Plant skill.";
      break;

    case "Castle Of Thorns":
      canFirstChoice = isNearRootedFoe(unit, 1) && canStrike(unit);
      canSecondChoice = true;
      ChoiceFirstMessage = "Strike (pierce Shield) a rooted foe.";
      ChoiceSecondMessage =
        "Purge the Aether and Shield of all rooted foes within 2 spaces.";
      break;

    case "Flourish":
      canFirstChoice = newGameState[unit.player].skillHand.length > 1;
      canSecondChoice = unit.blossom > 0;
      ChoiceFirstMessage = "Spend 2 skills to gain 3 Blossoms.";
      ChoiceSecondMessage =
        "Spend 1 Blossom to purge your or an adjacent ally’s afflictions, except Anathema.";
      break;

    case "Raptor Blitz":
      canFirstChoice = true;
      canSecondChoice = canRaptorBlitzBlast(unit);
      ChoiceFirstMessage = "Purge the Aether of a foe within 2 spaces.";
      ChoiceSecondMessage = "Blast an adjacent foe that has no Aether.";

      break;

    case "Tea for Two":
      canFirstChoice = true;
      canSecondChoice = true;
      ChoiceFirstMessage = "Float 1 skill.";
      ChoiceSecondMessage = "Discard 1 skill.";
      break;

    case "Reminiscence":
      canFirstChoice =
        newGameState[self].avelhemVestige.length > 0 &&
        newGameState[self].defiancePoints > 0;
      canSecondChoice = newGameState[self].skillVestige.length > 0;
      ChoiceFirstMessage = "Spend 1 DP to recover 1 Avelhem.";
      ChoiceSecondMessage = "Recover then float 1 skill.";
      break;

    case "Foreshadow":
      canFirstChoice = allBurstSkills().some((s) =>
        newGameState[self].skillVestige.includes(s)
      );
      canSecondChoice = true;
      ChoiceFirstMessage = "Recover 1 burst skill.";
      ChoiceSecondMessage =
        "Search for 1 burst skill; if successful, discard it and draw 1 skill.";
      break;
  }

  const handleFirstChoice = () => {
    if (selectedChoice === 1) {
      setSelectedChoice(null);
    } else if (canFirstChoice) {
      setSelectedChoice(1);
    }
  };

  const handleSecondChoice = () => {
    if (selectedChoice === 2) {
      setSelectedChoice(null);
    } else if (canSecondChoice) {
      setSelectedChoice(2);
    }
  };

  const handleSelect = () => {
    if (!(props.details.reason === "Finesse" && selectedChoice === 2)) {
      newGameState.currentResolution.pop();
      // console.log("POP!");
    }

    switch (props.details.reason) {
      // case "TEMPLATE":
      //   if (selectedChoice === 1) {
      //     //1st choice
      //   } else {
      //     //2nd choice
      //   }
      //   break;

      case "Finesse":
        if (selectedChoice === 1) {
          newGameState = drawSkill(newGameState);
          updateData = true;
        } else {
          newGameState.currentResolution.push({
            resolution: "Deploying Pawn",
            zoneIds: getVacantFrontier(),
          });
        }
        break;

      case "Purification":
        if (selectedChoice === 1) {
          if (unit.enhancements.ward > 0) {
            unit.enhancements.ward = Math.max(unit.enhancements.ward, 2);
          } else {
            unit.enhancements.ward = 2;
          }
        } else {
          newGameState.currentResolution.push({
            resolution: "Water Skill",
            resolution2: "Purification1.5",
            unit: unit,
          });
        }
        break;

      case "Healing Rain":
        let healingRainUnit =
          newGameState[props.details.victim.player].units[
            props.details.victim.unitIndex
          ];

        if (selectedChoice === 1) {
          if (healingRainUnit.enhancements.ward > 0) {
            healingRainUnit.enhancements.ward = Math.max(
              healingRainUnit.enhancements.ward,
              2
            );
          } else {
            healingRainUnit.enhancements.ward = 2;
          }

          newGameState = aetherRestoreSpecial(newGameState, healingRainUnit);
          updateData = true;
        } else {
          newGameState.currentResolution.push({
            resolution: "Water Skill",
            resolution2: "Healing Rain2",
            unit: unit,
            details: {
              title: "Healing Rain",
              message: "Reveal 1 Water skill to raise their HP to 2.",
              restriction: ["02-01", "02-02", "02-03", "02-04"],
              reason: "Healing Rain",
              victim: healingRainUnit,
            },
          });
        }
        break;

      case "Kleptothermy":
        if (selectedChoice === 1) {
          enterSelectUnitMode(
            getZonesWithAllies(unit, 2, true),
            null,
            newGameState,
            null,
            "kleptothermy ally",
            null
          );
        } else {
          enterSelectUnitMode(
            getZonesWithEnemies(unit, 1),
            null,
            newGameState,
            null,
            "kleptothermy enemy",
            null
          );
        }
        break;

      case "Cold Embrace":
        if (selectedChoice === 1) {
          enterSelectUnitMode(
            getZonesWithEnemiesAfflicted(unit, 1, "frost"),
            unit,
            newGameState,
            null,
            "strike",
            null
          );
        } else {
          enterSelectUnitMode(
            getZonesWithEnemies(unit, 1),
            unit,
            newGameState,
            null,
            "freeze1",
            null
          );
        }
        break;

      case "Aerial Impetus":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Wind Skill",
            resolution2: "Aerial Impetus Select Ally",
            unit: unit,
          });

          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: unit.player,
            canSkip: false,
            details: {
              title: "Aerial Impetus",
              message: "Spend 1 skill to prompt an adjacent ally to traverse.",
              restriction: null,
              reason: "Aerial Impetus",
            },
          });
        } else {
          updateLocal = false;
          enterSelectUnitMode(
            getZonesWithEnemies(unit, 1),
            unit,
            newGameState,
            null,
            "aerial impetus purge",
            null
          );
        }
        break;

      case "Reap the Whirlwind":
        unit.cyclone -= 2;

        if (selectedChoice === 1) {
          unit.aether = 1;
        } else {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Reap the Whirlwind4",
            unit: unit,
          });
        }
        break;

      case "Geomancy":
        if (selectedChoice === 1) {
          unit.hp = Math.min(unit.hp + 1, 3);
        } else {
          newGameState.currentResolution.push({
            resolution: "Recover Skill",
            player: self,
            details: {
              title: "Geomancy",
              reason: "Geomancy",
              restriction: ["04-01", "04-02", "04-03"],
              message: "Recover 1 Land skill.",
              outcome: "Add",
            },
          });
        }
        break;

      case "Galvanize":
        if (selectedChoice === 1) {
          unit.charge
            ? (unit.charge = Math.min(3, unit.charge + 1))
            : (unit.charge = 1);

          if (canMove(unit)) {
            newGameState.currentResolution.push({
              resolution: "Unit Ability",
              resolution2: "Galvanize2",
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
        } else {
          unit.charge -= 3;

          enterSelectUnitMode(
            getZonesWithEnemies(unit, 1),
            unit,
            newGameState,
            null,
            "strike",
            null
          );
        }
        break;

      case "Valiant Spark":
        unit.charge -= 2;
        if (selectedChoice === 1) {
          newGameState = enterMoveMode(
            getVacantAdjacentZones(unit),
            unit,
            newGameState,
            null
          );
        } else {
          enterSelectUnitMode(
            getZonesWithEnemies(unit, 1),
            unit,
            newGameState,
            null,
            "strike",
            null
          );
        }
        break;

      case "Surge":
        if (selectedChoice === 1) {
          newGameState = enterMoveMode(
            getVacantAdjacentZones(unit),
            unit,
            newGameState,
            null
          );
        } else {
          enterSelectUnitMode(
            getZonesWithEnemies(unit, 1),
            unit,
            newGameState,
            null,
            "strike",
            "Surge"
          );
        }
        break;

      case "Aegis":
        let victim =
          newGameState[props.victim.player].units[props.victim.unitIndex];
        if (selectedChoice === 1) {
          victim.enhancements.shield
            ? Math.max(1, victim.enhancements.shield)
            : (victim.enhancements.shield = 1);
        } else {
          victim.enhancements.ward
            ? Math.max(1, victim.enhancements.ward)
            : (victim.enhancements.ward = 1);

          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: unit.player,
            canSkip: false,
            details: {
              title: "Aegis",
              message: "Spend 1 skill to grant Ward.",
              restriction: null,
              reason: "Aegis",
            },
          });
        }

        newGameState[props.victim.player].units[props.victim.unitIndex] =
          victim;

        break;

      case "Reinforce":
        if (selectedChoice === 1) {
          newGameState = drawSkill(newGameState);
          unit.sharpness
            ? (unit.sharpness = Math.min(2, unit.sharpness + 1))
            : (unit.sharpness = 1);
        } else {
          unit.hp = Math.max(2, unit.hp);

          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: unit.player,
            canSkip: false,
            details: {
              title: "Reinforce",
              message: "Spend 1 skill to raise your HP to 2.",
              restriction: null,
              reason: "Reinforce",
            },
          });
        }
        break;

      case "Arsenal Onslaught":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Metal Skill",
            resolution2: "Arsenal Onslaught1.1",
            unit: unit,
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Metal Skill",
            resolution2: "Arsenal Onslaught1",
            unit: unit,
          });
        }
        break;

      case "Ballistic Armor":
        if (selectedChoice === 1) {
          delete unit.enhancements.shield;
        } else {
          delete unit.enhancements.ward;
        }

        unit.aether = 1;
        break;

      case "Sow and Reap":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Plant Skill",
            resolution2: "Sow and Reap Blast",
            unit: unit,
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Plant Skill",
            resolution2: "Select Sow and Reap Striker",
            unit: unit,
            player: self,
          });
        }
        break;

      case "Viridian Grave":
        unit.blossom -= 1;

        if (selectedChoice === 1) {
          unit.enhancements.shield = 2;
        } else {
          newGameState.currentResolution.push({
            resolution: "Recover Skill",
            player: self,
            details: {
              title: "Viridian Grave",
              reason: "Viridian Grave",
              restriction: ["08-01", "08-02", "08-03", "08-04"],
              message: "Recover then float 1 Plant skill.",
              outcome: "Float",
            },
          });
        }
        break;

      case "Castle Of Thorns":
        if (selectedChoice === 1) {
          const zones = JSON.parse(newGameState.zones);
          const zonesWithEnemies = getZonesWithEnemies(unit, 1);
          let zonesWithRootedFoes = [];

          for (let z of zonesWithEnemies) {
            const zone = zones[Math.floor(z / 5)][z % 5];
            const foe = newGameState[zone.player].units[zone.unitIndex];

            if (isRooted(foe)) {
              zonesWithRootedFoes.push(z);
            }
          }

          enterSelectUnitMode(
            zonesWithRootedFoes,
            unit,
            newGameState,
            null,
            "strike",
            "castleOfThorns"
          );
        } else {
          const zones = JSON.parse(newGameState.zones);

          const zonesWithEnemies = getZonesWithEnemies(unit, 2);

          for (let z of zonesWithEnemies) {
            const zone = zones[Math.floor(z / 5)][z % 5];
            const foe = newGameState[zone.player].units[zone.unitIndex];

            if (isRooted(foe)) {
              foe.aether = 0;
              foe.enhancements.shield = 0;
            }
          }
        }
        break;

      case "Flourish":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Flourish2",
            player: self,
            unit: unit,
            details: {
              reason: "Flourish",
              title: "Flourish",
              message: "Spend 2 skills to gain 3 Blossoms.",
              count: 2,
            },
          });

          console.log(newGameState.currentResolution.at(-1).resolution2);
        } else {
          unit.blossom -= 1;

          enterSelectUnitMode(
            getZonesWithAllies(unit, 1, true),
            unit,
            newGameState,
            null,
            "flourish",
            null
          );
        }
        break;

      case "Raptor Blitz":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Avian Skill",
            resolution2: "Raptor Blitz Purge",
            unit: unit,
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Avian Skill",
            resolution2: "Raptor Blitz Blast",
            unit: unit,
          });
        }
        break;

      case "Tea for Two":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Sovereign Standard Skill",
            resolution2: "Tea for Two2",
            player: self,
            details: {
              title: "Tea for Two",
              reason: "Tea for Two",
              restriction: null,
              message: "Float 1 skill",
            },
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: null,
            player: self,
            canSkip: false,
            details: {
              title: "Tea for Two",
              message: "Discard 1 skill.",
              restriction: null,
              reason: "Tea for Two",
            },
          });
        }
        break;

      case "Reminiscence":
        if (selectedChoice === 1) {
          newGameState[self].defiancePoints -= 1;

          newGameState.currentResolution.push({
            resolution: "Recover Avelhem",
            player: self,
            details: {
              title: "Reminiscence",
              reason: "Reminiscence",
              restriction: null,
              message: "Recover 1 Avelhem.",
              outcome: "Add",
            },
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Recover Skill",
            player: self,
            details: {
              title: "Reminiscence",
              reason: "Reminiscence",
              restriction: null,
              message: "Recover then float 1 skill.",
              outcome: "Float",
            },
          });
        }
        break;

      case "Foreshadow":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Recover Skill",
            player: self,
            details: {
              title: "Foreshadow",
              reason: "Foreshadow",
              restriction: allBurstSkills(),
              message: "Recover 1 burst skill.",
              outcome: "Add",
              reveal: true,
            },
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Search Card",
            player: self,
            details: {
              restriction: allBurstSkills(),
              exclusion: [],
              searchTitle: "Foreshadow",
              searchMessage: "Search for 1 burst skill",
              outcome: "Foreshadow",
              revealTitle: "Foreshadow",
              revealMessage:
                "Your opponent has searched for, revealed, and discarded a skill",
              messageTitle: null,
              message: null,
              specMessage: `${
                self === "host" ? "Gold" : "Silver"
              } Sovereign has searched for, revealed, and discarded a skill.`,
            },
          });
        }
        break;

      //
    }

    if (updateLocal) {
      dispatch(updateState(newGameState));
    }

    if (updateData) {
      props.updateFirebase(newGameState);
    }
  };

  const handleSkip = () => {
    newGameState.currentResolution.pop();
    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 89:
            return element === "1st Choice";

          case 103:
            return element === "2nd Choice";

          case 90:
          case 104:
            return element === "Select Button";

          //////////////////////////
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 89:
          case 90:
          case 103:
          case 104:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{props.details.title}</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">Choose 1:</div>

          <div className="modalContent2Column">
            <div
              className={`
                  modalOptionOutline
                  modalMediumOptionOutline ${
                    selectedChoice === 1
                      ? "modalMediumOptionOutlineSelected"
                      : ""
                  }`}
              onClick={() => {
                handleFirstChoice();
                handleUpdateDemoGuide();
              }}
            >
              <div
                className={`modalMedium modalMediumCenter
                    ${canFirstChoice ? "" : "disabledModal"} 
                    ${canClick("1st Choice") ? "demoClick" : ""}
                    `}
                style={{
                  boxShadow: selectedChoice === 1 ? "none" : "",
                }}
              >
                <div
                  className="modalOptionText"
                  style={{ textAlign: "center" }}
                >
                  {ChoiceFirstMessage}
                </div>
              </div>
            </div>

            <div
              className={`
                  modalOptionOutline
                  modalMediumOptionOutline ${
                    selectedChoice === 2
                      ? "modalMediumOptionOutlineSelected"
                      : ""
                  }`}
              onClick={() => {
                handleSecondChoice();
                handleUpdateDemoGuide();
              }}
            >
              <div
                className={`modalMedium modalMediumCenter
                    ${canSecondChoice ? "" : "disabledModal"} 
                    ${canClick("2nd Choice") ? "demoClick" : ""}
                    `}
                style={{
                  boxShadow: selectedChoice === 2 ? "none" : "",
                }}
              >
                <div
                  className="modalOptionText"
                  style={{ textAlign: "center" }}
                >
                  {ChoiceSecondMessage}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modalFooter">
          {selectedChoice === null && canSkip && (
            <button className="redButton2" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedChoice !== null && (
            <button
              className={`redButton2 ${
                canClick("Select Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleSelect();
                handleUpdateDemoGuide();
              }}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCustomChoice;
