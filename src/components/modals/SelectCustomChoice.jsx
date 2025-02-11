import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SelectCustomChoice = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const { allBurstSkills, getScionSet } = useCardDatabase();

  useEffect(() => {
    setSelectedChoice(null);
  }, [props.details.reason]);

  const {
    blast,
    canBlast,
    canMove,
    canRaptorBlitzBlast,
    canSowAndReapBlast,
    canSowAndReapStrike,
    canStrike,
    drawSkill,
    enterMoveMode,
    enterSelectUnitMode,
    getVacantAdjacentZones,
    getZonesAerialImpetusAlly,
    getZonesWithAllies,
    getZonesWithEnemies,
    getZonesWithEnemiesAfflicted,
    strike,
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
    case "Purification":
      canFirstChoice = true;
      canSecondChoice = getZonesWithAllies(unit, 2, false).length > 0;
      ChoiceFirstMessage = "Gain Ward for 2 turns.";
      ChoiceSecondMessage =
        "Purge the turn-based afflictions (except Anathema) of an ally within 2 spaces; if they are adjacent, grant them Ward for 2 turns.";
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
      ChoiceSecondMessage = "Purge an adjacent enemy’s Aether.";
      break;

    case "Cold Embrace":
      canFirstChoice =
        getZonesWithEnemiesAfflicted(unit, 1, "frostbite").length > 0 &&
        canStrike(unit);
      canSecondChoice = getZonesWithEnemies(unit, 1).length > 0;
      ChoiceFirstMessage = "Strike a frostbitten enemy.";
      ChoiceSecondMessage = "Freeze an adjacent enemy for 2 turns.";
      break;

    case "Aerial Impetus":
      canFirstChoice =
        getZonesAerialImpetusAlly(unit).length > 0 &&
        newGameState[unit.player].skillHand.length > 0;
      canSecondChoice = getZonesWithEnemies(unit, 1).length > 0;
      ChoiceFirstMessage =
        "Float 1 skill to prompt an adjacent ally to traverse.";
      ChoiceSecondMessage = "Purge an adjacent enemy’s Aether and Shield.";
      break;

    case "Geomancy":
      canFirstChoice = true;
      canSecondChoice = ["04-01", "04-02", "04-03"].some((s) =>
        localGameState[self].skillVestige.includes(s)
      );
      ChoiceFirstMessage = "Raise your HP by 1 (Max 3).";
      ChoiceSecondMessage = "Recover 1 Land skill.";
      break;

    case "Mountain Stance":
      canFirstChoice = true;
      canSecondChoice = newGameState[unit.player].skillHand.length > 0;
      ChoiceFirstMessage =
        "Gain a boost: you can use an Advance tactic to activate “Fortify”.";
      ChoiceSecondMessage = "Spend 1 skill to search for 1 “Crystallization”.";
      break;

    case "Fortify":
      canFirstChoice = canMove(unit);
      canSecondChoice = canStrike(unit);
      ChoiceFirstMessage = "Traverse.";
      ChoiceSecondMessage = "Strike.";
      break;

    case "Arc Flash3":
      canSkip = true;
      canFirstChoice = canMove(unit);
      canSecondChoice = canStrike(unit);
      ChoiceFirstMessage = "Traverse.";
      ChoiceSecondMessage = "Strike.";
      break;

    case "Surge4":
      canSkip = true;
      canFirstChoice = canMove(unit);
      canSecondChoice = canStrike(unit);
      ChoiceFirstMessage = "Traverse (bypass motion contingent skills).";
      ChoiceSecondMessage = "Strike (2 AP).";
      break;

    case "Aegis":
      canFirstChoice = true;
      canSecondChoice = newGameState[unit.player].skillHand.length > 0;
      ChoiceFirstMessage = "Grant them Shield for 1 turn.";
      ChoiceSecondMessage = "Spend 1 skill to grant them Ward for 1 turn.";
      break;

    case "Reinforce":
      canFirstChoice = true;
      canSecondChoice = newGameState[unit.player].skillHand.length > 0;
      ChoiceFirstMessage = "Draw 1 skill and gain 1 Sharpness.";
      ChoiceSecondMessage = "Spend 1 skill to gain raise your HP to 2.";
      break;

    case "Frenzy Blade3":
      canFirstChoice = true;
      canSecondChoice = newGameState[self].skillHand.length > 0;
      ChoiceFirstMessage = "Draw 1 skill.";
      ChoiceSecondMessage = "Spend 1 skill to gain Shield for 2 turns.";
      break;

    case "Arsenal Onslaught":
      canSkip = true;
      canFirstChoice = canStrike(unit);
      canSecondChoice = true;
      ChoiceFirstMessage = "Strike.";
      ChoiceSecondMessage = "Blast.";
      break;

    case "Brandish":
      canFirstChoice = true;
      canSecondChoice = true;
      ChoiceFirstMessage = "Draw 1 skill.";
      ChoiceSecondMessage = "Restore your Aether.";
      break;

    case "Ballistic Armor":
      canFirstChoice = unit.enhancements.shield > 1;
      canSecondChoice = unit.enhancements.ward > 1;
      ChoiceFirstMessage = "Spend 2 turns of Shield.";
      ChoiceSecondMessage = "Spend 2 turns of Ward.";
      break;

    case "Sow and Reap":
      canFirstChoice = canSowAndReapBlast(unit);
      canSecondChoice = canSowAndReapStrike(unit);
      ChoiceFirstMessage = "Blast (bypass Shield) an adjacent rooted enemy.";
      ChoiceSecondMessage = "Prompt an adjacent ally to strike a rooted enemy.";
      break;

    case "Everblooming":
      canSkip = true;
      canFirstChoice = true;
      canSecondChoice =
        props.details.unitClone.blossom >= 2 &&
        newGameState[self].skillVestige.includes("08-02");

      ChoiceFirstMessage = "Draw 1 skill";
      ChoiceSecondMessage =
        "Spend 2 Blossoms to recover then float 1 “Efflorescence”.";
      break;

    case "Raptor Blitz":
      canFirstChoice = canRaptorBlitzBlast(unit);
      canSecondChoice = true;
      ChoiceFirstMessage = "Blast an adjacent enemy that lacks Aether.";
      ChoiceSecondMessage = "Purge the Aether of an enemy within 2 spaces.";
      break;

    case "Tea for Two":
      canFirstChoice = true;
      canSecondChoice = true;
      ChoiceFirstMessage = "Float 1 skill.";
      ChoiceSecondMessage = "Discard 1 skill.";
      break;

    case "Reminiscence":
      canFirstChoice = newGameState[self].avelhemVestige.length > 0;
      canSecondChoice = newGameState[self].skillVestige.length > 0;
      ChoiceFirstMessage = "Recover 1 Avelhem.";
      ChoiceSecondMessage = "Recover then float 1 skill.";
      break;

    case "Foreshadow":
      canFirstChoice = allBurstSkills().some((s) =>
        newGameState[self].skillVestige.includes(s)
      );

      canSecondChoice = true;
      ChoiceFirstMessage = "Recover then reveal 1 burst skill.";
      ChoiceSecondMessage =
        "Search for any skill; if successful, reveal and discard it.";
      break;

    case "Fated Rivalry":
      canFirstChoice = true;
      canSecondChoice = true;
      ChoiceFirstMessage = "Draw 2 skills.";
      ChoiceSecondMessage = "Search for 1 non-burst skill of their class.";
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
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      // case "TEMPLATE":
      //   if (selectedChoice === 1) {
      //     //1st choice
      //   } else {
      //     //2nd choice
      //   }
      //   break;

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
          healingRainUnit.aether = 1;

          if (healingRainUnit.enhancements.ward > 0) {
            healingRainUnit.enhancements.ward = Math.max(
              healingRainUnit.enhancements.ward,
              2
            );
          } else {
            healingRainUnit.enhancements.ward = 2;
          }
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
            getZonesWithEnemiesAfflicted(unit, 1, "frostbite"),
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
            "freeze2",
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
            resolution: "Wind Skill",
            resolution2: "Aerial Impetus Float",
            unit: unit,
            details: {
              title: "Aerial Impetus",
              reason: "Aerial Impetus",
              restriction: null,
              message: "Float 1 skill",
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

      case "Mountain Stance":
        if (selectedChoice === 1) {
          unit.boosts.mountainStance = true;
        } else {
          newGameState.currentResolution.push({
            resolution: "Search Card",
            player: self,
            details: {
              restriction: ["04-01"],
              exclusion: [],
              searchTitle: "Mountain Stance",
              searchMessage: "Search for 1 “Crystallization”",
              outcome: "Add",
              revealTitle: null,
              revealMessage: null,
              messageTitle: null,
              message: null,
              specMessage: null,
            },
          });

          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: unit.player,
            canSkip: false,
            details: {
              title: "Mountain Stance",
              message: "Spend 1 skill to search for 1 “Crystallization”.",
              restriction: null,
              reason: "Mountain Stance",
            },
          });
        }
        break;

      case "Fortify":
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

      case "Arc Flash3":
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

      case "Surge4":
        if (selectedChoice === 1) {
          props.setMovingSpecial("Surge");

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
              message: "Spend 1 skill to grant Ward for 1 turn.",
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

      case "Frenzy Blade2":
        if (selectedChoice === 1) {
          newGameState = drawSkill(newGameState);
        } else {
          newGameState.currentResolution.push({
            resolution: "Metal Skill",
            resolution2: "Frenzy Blade4",
            unit: unit,
          });
          newGameState.currentResolution.push({
            resolution: "Discard Skill",
            unit: unit,
            player: unit.player,
            canSkip: false,
            details: {
              title: "Frenzy Blade",
              message: "Spend 1 skill to gain Shield for 2 turns.",
              restriction: null,
              reason: "Frenzy Blade",
            },
          });
        }
        break;

      case "Arsenal Onslaught":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Metal Skill",
            resolution2: "Arsenal Onslaught1",
            unit: unit,
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Metal Skill",
            resolution2: "Arsenal Onslaught1.1",
            unit: unit,
          });
        }
        break;

      case "Brandish":
        if (selectedChoice === 1) {
          newGameState = drawSkill(newGameState);
        } else {
          unit.aether = 1;
        }
        break;

      case "Ballistic Armor":
        if (selectedChoice === 1) {
          unit.enhancements.shield -= 2;
        } else {
          unit.enhancements.ward -= 2;
        }

        enterSelectUnitMode(
          getZonesWithEnemies(unit, 1),
          unit,
          newGameState,
          null,
          "blast",
          null
        );
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

      case "Everblooming":
        if (selectedChoice === 1) {
          newGameState = drawSkill(newGameState);
        } else {
          if (unit) {
            unit.blossom -= 2;
          }

          newGameState.currentResolution.push({
            resolution: "Recover Skill",
            player: self,
            details: {
              title: "Everblooming",
              reason: "Everblooming",
              restriction: ["08-02"],
              message: "Recover then float 1 “Efflorescence”.",
              outcome: "Float",
            },
          });
        }
        break;

      case "Raptor Blitz":
        if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Avian Skill",
            resolution2: "Raptor Blitz Blast",
            unit: unit,
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Avian Skill",
            resolution2: "Raptor Blitz Purge",
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
            unit: unit,
            player: unit.player,
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
              message: "Recover then reveal 1 burst skill.",
              outcome: "Add",
            },
          });
        } else {
          newGameState.currentResolution.push({
            resolution: "Search Card",
            player: self,
            details: {
              restriction: null,
              exclusion: [],
              searchTitle: "Foreshadow",
              searchMessage:
                "Search for any skill; if successful, reveal and discard it",
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

      case "Fated Rivalry":
        if (selectedChoice === 1) {
          newGameState = drawSkill(newGameState);
          newGameState = drawSkill(newGameState);
        } else {
          newGameState.currentResolution.push({
            resolution: "Search Card",
            player: self,
            details: {
              restriction: getScionSet(props.details.unit.unitClass),
              exclusion: allBurstSkills(),
              searchTitle: "Fated Rivalry",
              searchMessage: "Search for 1 non-burst skill of their class",
              outcome: "Add",
              revealTitle: null,
              revealMessage: null,
              messageTitle: "Fated Rivalry",
              message: "Your opponent has searched for a skill.",
              specMessage: `${
                self === "host" ? "Gold" : "Silver"
              } Sovereign has searched for a skill.`,
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
    switch (
      demoGuide

      // case "Learn1.246":
      //   return element === "Select Button";

      ///////////////////////
    ) {
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (
      demoGuide

      // case "Learn1.246":
      //   dispatch(updateDemo("Learn1.247"));
      //   break;

      ///////////////////////
    ) {
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
