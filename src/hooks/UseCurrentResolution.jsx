import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";

import { useRecurringEffects } from "./useRecurringEffects";
import { useSkillEffects } from "./useSkillEffects";
import { useSovereignSkillEffects } from "./useSovereignSkillEffects";
import { useUnitAbilityEffects } from "./useUnitAbilityEffects";

import AcquisitionPhase from "../components/modals/AcquisitionPhase";
import BountyPhase from "../components/modals/BountyPhase";
import CoordinationPhase from "../components/modals/CoordinationPhase";
import DefiancePhase from "../components/modals/DefiancePhase";
import SelectFirstPlayer from "../components/modals/SelectFirstPlayer";
import InspectSkill from "../components/modals/InspectSkill";
import MessageToPlayer from "../components/modals/MessageToPlayer";
import RecoverAvelhem from "../components/modals/RecoverAvelhem";
import RecoverSkill from "../components/modals/RecoverSkill";
import ScionSkillSelect from "../components/modals/ScionSkillSelect";
import SearchCard from "../components/modals/SearchCard";
import SelectElement from "../components/modals/SelectElement";
import SelectResonator from "../components/modals/SelectResonator";
import SelectHandMultiAvelhem from "../components/modals/SelectHandMultiAvelhem";
import SelectHandMultiSkill from "../components/modals/SelectHandMultiSkill";
import RevealSkill from "../components/modals/RevealSkill";
import SelectUnitAbility from "../components/modals/SelectUnitAbility";
import SelectTacticalAction from "../components/modals/SelectTacticalAction";
import SelectTacticalActionSovereign from "../components/modals/SelectTacticalActionSovereign";
import TacticResults from "../components/modals/TacticResults";
import TacticResults3 from "../components/modals/TacticResults3";
import RevealedSkillView from "../components/modals/RevealedSkillView";
import FloatSkill from "../components/modals/FloatSkill";
import YouMaySpend1Skill from "../components/modals/YouMaySpend1Skill";
import YouMayNoYes from "../components/modals/YouMayNoYes";
import VictoryScreen from "../components/modals/VictoryScreen";
import SelectTactic from "../components/modals/SelectTactic";
import SelectTacticViaEffect from "../components/modals/SelectTacticViaEffect";
import SelectCustomChoice from "../components/modals/SelectCustomChoice";
import ContingentTriggered from "../components/modals/ContingentTriggered";
import FloatResonator from "../components/modals/FloatResonator";

import FerventPrayerResonance from "../components/skillModals/FerventPrayerResonance";

const UseCurrentResolution = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { applySkill } = useSkillEffects();
  const {
    applyAnathema,
    applyBurn,
    applyDamage,
    applyFrostbite,
    applyParalysis,
    applyScore,
    appointShield,
    avelhemResonance,
    decrementBurn,
    decrementStatus,
    drawSkill,
    endDefiancePhase2,
    enterMoveMode,
    getVacant2SpaceZones,
    getVacantAdjacentZones,
    isMuted,
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
    selectGuardianWingsActivator,
    selectHealingRainActivator,
    selectMatchMadeInHeavenPawn,
    selectPitfallTrapActivator,
    selectSymphonicScreechActivator,
    selectVengefulLegacy,
    selectViridianGraveActivator,
    strikeMove,
    unitFloatSkill,
    unitRetainSkill,
    aetherBlastMitigate,
  } = useRecurringEffects();

  const {
    heirsEndeavor1,
    heirsEndeavorResonance,
    teaForTwo1,
    reminiscence1,
    foreshadow1,
    foreshadow2,
    foreshadow3,
    darkHalo1,
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
  } = useSovereignSkillEffects();

  const {
    afterburner1,
    afterburner2,
    fieryHeart1,
    fieryHeart2,
    hydrotherapy1,
    hydrotherapy2,
    coldEmbrace1,
    airDash1,
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
  } = useUnitAbilityEffects();

  const animationDelay = () => {
    setTimeout(() => {
      const newGameState = JSON.parse(JSON.stringify(localGameState));
      newGameState.currentResolution.pop();
      dispatch(updateState(newGameState));
    }, 250);
  };

  const avelhemConclusion = (
    avelhem,
    conclusion,
    resonator,
    resonatorConclusion
  ) => {
    setTimeout(() => {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end "Avelhem Conclusion"
      newGameState.currentResolution.pop();

      if (conclusion === "discard") {
        newGameState[self].avelhemVestige.push(avelhem);
      }

      if (resonator !== null && resonatorConclusion === "discard") {
        if (["SA-02"].includes(resonator)) {
          newGameState[self].skillVestige.push(resonator);
        } else {
          newGameState[self].avelhemVestige.push(resonator);
        }
      }

      newGameState.activatingSkill.pop();
      newGameState.activatingResonator.pop();

      dispatch(updateState(newGameState));

      props.updateFirebase(newGameState);
    }, 250);
  };

  const skillConclusion = (player, unitInfo, skill, conclusion) => {
    setTimeout(() => {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end "Skill Conclusion"
      newGameState.currentResolution.pop();

      if (conclusion === "discard") {
        newGameState[player].skillVestige.push(skill);
      } else if (conclusion === "float") {
        newGameState[player].skillRepertoire.push(skill);
        newGameState[player].skillFloat = newGameState[player].skillFloat + 1;
      } else if (conclusion === "shatter") {
        newGameState[player].skillShattered.push(skill);
      } else if (conclusion === "retain") {
        newGameState[player].skillHand.push(skill);
      }

      newGameState.activatingSkill.pop();
      newGameState.activatingUnit.pop();

      if (unitInfo) {
        let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

        if (unit) {
          unit = applyAnathema(unit);
        }

        if (unit.temporary.eternalEmberActivation) {
          delete unit.temporary.eternalEmberActivation;

          newGameState.activatingUnit.push(unit);
          newGameState.activatingSkill.push("EternalEmber");

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Talent Conclusion",
            unit: unit,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Activating Eternal Ember",
            unit: unit,
            details: {
              title: "Eternal Ember",
              message:
                "You may spend 1 skill to reduce the duration of Anathema to 1 turn.",
              restriction: null,
              reason: "Eternal Ember",
            },
          });
        }
      }

      dispatch(updateState(newGameState));

      props.updateFirebase(newGameState);
    }, 250);
  };

  const skillResonanceConclusion = (
    player,
    unitInfo,
    skill,
    skillConclusion,
    resonator,
    resonatorConclusion
  ) => {
    setTimeout(() => {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end "Resonance Conclusion"
      newGameState.currentResolution.pop();

      if (skillConclusion === "discard") {
        newGameState[player].skillVestige.push(skill);
      } else if (skillConclusion === "float") {
        newGameState[player].skillRepertoire.push(skill);
        newGameState[player].skillFloat = newGameState[player].skillFloat + 1;
      } else if (skillConclusion === "retain") {
        newGameState[player].skillHand.push(skill);
      }

      if (resonatorConclusion === "discard") {
        newGameState[player].skillVestige.push(resonator);
      } else if (resonatorConclusion === "float") {
        newGameState[player].skillRepertoire.push(resonator);
        newGameState[player].skillFloat = newGameState[player].skillFloat + 1;
      } else if (resonatorConclusion === "retain") {
        newGameState[player].skillHand.push(resonator);
      }

      newGameState.activatingSkill.pop();
      newGameState.activatingUnit.pop();
      newGameState.activatingResonator.pop();

      if (unitInfo) {
        let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

        if (unit) {
          unit = applyAnathema(unit);
        }

        if (unit.temporary.eternalEmberActivation) {
          delete unit.temporary.eternalEmberActivation;

          newGameState.activatingUnit.push(unit);
          newGameState.activatingSkill.push("EternalEmber");

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Talent Conclusion",
            unit: unit,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Talent",
            resolution2: "Activating Eternal Ember",
            unit: unit,
            details: {
              title: "Eternal Ember",
              message:
                "You may spend 1 skill to reduce the duration of Anathema to 1 turn.",
              restriction: null,
              reason: "Eternal Ember",
            },
          });
        }
      }

      //Tea for Two
      if (resonator === "SA-02") {
        newGameState = drawSkill(newGameState);
      }

      dispatch(updateState(newGameState));

      props.updateFirebase(newGameState);
    }, 250);
  };

  const skillResonanceRetain = (resonator) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Retain resonant skill"
    newGameState.currentResolution.pop();

    //Dark Halo Overides
    if (resonator !== "SA-03") {
      newGameState.currentResolution[
        newGameState.currentResolution.length - 1
      ].skillConclusion = "retain";
    } else {
      newGameState.currentResolution[
        newGameState.currentResolution.length - 1
      ].resonatorConclusion = "retain";
    }

    dispatch(updateState(newGameState));
  };

  const tacticEnd = (unitInfo, effect) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Tactic End"
    newGameState.currentResolution.pop();

    newGameState.activatingUnit.pop();
    if (effect) {
      newGameState.activatingSkill.pop();
    }

    unit = applyAnathema(unit);

    if (unit.temporary.eternalEmberActivation) {
      delete unit.temporary.eternalEmberActivation;

      newGameState.activatingUnit.push(unit);
      newGameState.activatingSkill.push("EternalEmber");

      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Talent Conclusion",
        unit: unit,
      });

      newGameState.currentResolution.push({
        resolution: "Unit Talent",
        resolution2: "Activating Eternal Ember",
        unit: unit,
        details: {
          title: "Eternal Ember",
          message:
            "You may spend 1 skill to reduce the duration of Anathema to 1 turn.",
          restriction: null,
          reason: "Eternal Ember",
        },
      });
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const talentConclusion = () => {
    setTimeout(() => {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end "Talent Conclusion"
      newGameState.currentResolution.pop();

      newGameState.activatingSkill.pop();
      newGameState.activatingUnit.pop();

      dispatch(updateState(newGameState));

      props.updateFirebase(newGameState);
    }, 250);
  };

  const resolveApplyBurn = (attackerInfo, victimInfo, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    const attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (attacker !== null && !isMuted(attacker)) {
      newGameState = applyBurn(newGameState, victimInfo, attackerInfo, special);
    }

    dispatch(updateState(newGameState));

    props.updateFirebase(newGameState);
  };

  const resolveApplyFrostbite = (attackerInfo, victimInfo, duration) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    const attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (attacker !== null && !isMuted(attacker)) {
      newGameState = applyFrostbite(newGameState, victimInfo, duration);
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const resolveApplyParalysis = (
    attackerInfo,
    victimInfo,
    duration,
    special
  ) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    const attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (attacker !== null && !isMuted(attacker)) {
      newGameState = applyParalysis(
        newGameState,
        attackerInfo,
        victimInfo,
        duration,
        special
      );
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const selectAerialImpetusMove = (unit, ally) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Aerial Impetus Prompt" or "Aerial Impetus Purge Move2"
    newGameState.currentResolution.pop();

    props.updateLocalState(
      enterMoveMode(getVacantAdjacentZones(unit), unit, newGameState, null)
    );

    if (ally === "Ally") {
      props.setMovingSpecial("AerialImpetusAlly");
    }
  };

  // ================================================
  // ================================================

  let lastRes = { resolution: "" };

  if (localGameState.currentResolution.length > 0) {
    lastRes =
      localGameState.currentResolution[
        localGameState.currentResolution.length - 1
      ];
  }

  if (props.userRole === "spectator") {
    switch (lastRes.resolution2) {
      case "Message To Player":
        return (
          <>
            {lastRes.specMessage && (
              <MessageToPlayer
                title={lastRes.title}
                message={lastRes.specMessage}
                updateFirebase={props.updateFirebase}
              />
            )}
          </>
        );

      case "Revealing Skill":
        return (
          <>
            {!props.hideModal && (
              <RevealedSkillView
                skill={lastRes.skill}
                title={lastRes.title}
                message={lastRes.specMessage}
                updateFirebase={props.updateFirebase}
                hideOrRevealModale={props.hideOrRevealModale}
              />
            )}
          </>
        );

      default:
        return;
    }
  }

  switch (lastRes.resolution) {
    case "Animation Delay":
      if (self === lastRes.priority) {
        animationDelay();
      }
      break;

    case "Acquisition Phase Selection":
      return (
        <>
          {self === localGameState.turnPlayer && !props.hideModal && (
            <AcquisitionPhase
              updateFirebase={props.updateFirebase}
              hideOrRevealModale={props.hideOrRevealModale}
            />
          )}
        </>
      );

    case "Bounty Phase Selection":
      return (
        <>
          {self === localGameState.turnPlayer && !props.hideModal && (
            <BountyPhase
              updateFirebase={props.updateFirebase}
              hideOrRevealModale={props.hideOrRevealModale}
            />
          )}
        </>
      );

    case "Coordination Phase Selection":
      return (
        <>
          {self === localGameState.turnPlayer && !props.hideModal && (
            <CoordinationPhase
              updateFirebase={props.updateFirebase}
              hideOrRevealModale={props.hideOrRevealModale}
            />
          )}
        </>
      );

    case "Defiance Phase Selection":
      return (
        <>
          {self === localGameState.turnPlayer && !props.hideModal && (
            <DefiancePhase
              updateFirebase={props.updateFirebase}
              hideOrRevealModale={props.hideOrRevealModale}
            />
          )}
        </>
      );

    case "Defiance Options":
      switch (lastRes.resolution2) {
        case "Artifice":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectHandMultiSkill
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Destine":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <YouMaySpend1Skill
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Select Destine Pawn":
          if (self === lastRes.player) {
            selectDestine(lastRes.scionClass);
          }
          break;

        case "Curate Results":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <TacticResults3
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                  reroll={lastRes.reroll}
                />
              )}
            </>
          );

        case "End Phase":
          if (self === lastRes.player) {
            props.updateLocalState(endDefiancePhase2());
          }
          break;
      }
      break;

    case "Final Phase":
      switch (lastRes.resolution2) {
        case "Avelhem Retention":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectHandMultiAvelhem
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Skill Hand Limit":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectHandMultiSkill
                  resonated={lastRes.resonated}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Burn Decrement":
          if (self === lastRes.player) {
            props.resolutionUpdate(decrementBurn());
          }
          break;

        case "Status Decrement":
          if (self === lastRes.player) {
            props.updateLocalState(decrementStatus());
          }
          break;

        case "Scoring":
          if (self === lastRes.player) {
            props.resolutionUpdate(applyScore());
          }
          break;
      }
      break;

    case "Deploying Pawn":
      if (self === localGameState.turnPlayer && props.tileMode !== "deploy") {
        props.setTileMode("deploy");
        props.setValidZones(lastRes.zoneIds);
        props.setDeployClass("Pawn");
      }
      break;

    case "Deploying Scion":
      if (self === localGameState.turnPlayer && props.tileMode !== "deploy") {
        props.setTileMode("deploy");
        props.setValidZones(lastRes.zoneIds);
        props.setDeployClass(lastRes.scionClass);
      }
      break;

    case "Mitigating Aether-Blast1":
      if (self === lastRes.unit.player) {
        props.resolutionUpdate(
          aetherBlastMitigate(lastRes.attacker, lastRes.unit)
        );
      }
      break;

    case "Mitigating Aether-Blast2":
      return (
        <>
          {self === lastRes.unit.player && !props.hideModal && (
            <YouMayNoYes
              unit={lastRes.unit}
              attacker={lastRes.attacker}
              details={lastRes.details}
              updateFirebase={props.updateFirebase}
              hideOrRevealModale={props.hideOrRevealModale}
            />
          )}
        </>
      );

    case "Tactic End":
      if (self === lastRes.unit.player) {
        tacticEnd(lastRes.unit, lastRes.effect);
      }
      break;

    case "Apply Burn":
      if (self === lastRes.attacker.player) {
        resolveApplyBurn(lastRes.attacker, lastRes.victim, lastRes.special);
      }
      break;

    case "Apply Damage":
      if (self === lastRes.attacker.player) {
        props.resolutionUpdate(
          applyDamage(
            lastRes.attacker,
            lastRes.victim,
            lastRes.type,
            lastRes.special
          )
        );
      } else if (self === lastRes.victim.player) {
        props.updateLocalState(
          applyDamage(
            lastRes.attacker,
            lastRes.victim,
            lastRes.type,
            lastRes.special
          )
        );
      }
      break;

    case "Apply Frostbite":
      if (self === lastRes.attacker.player) {
        resolveApplyFrostbite(
          lastRes.attacker,
          lastRes.victim,
          lastRes.duration
        );
      }
      break;

    case "Apply Paralysis":
      if (self === lastRes.attacker.player) {
        resolveApplyParalysis(
          lastRes.attacker,
          lastRes.victim,
          lastRes.duration,
          lastRes.special
        );
      }
      break;

    case "Choose Resonator":
      return (
        <>
          {self === lastRes.player && (
            <SelectResonator
              unit={lastRes.unit}
              skill={lastRes.skill}
              hideOrRevealModale={props.hideOrRevealModale}
              updateFirebase={props.updateFirebase}
            />
          )}
        </>
      );

    case "Choose Resonator Avelhem":
      return (
        <>
          {self === lastRes.player && (
            <SelectResonator
              avelhem={lastRes.avelhem}
              updateFirebase={props.updateFirebase}
            />
          )}
        </>
      );

    case "Avelhem Resonance":
      if (self === lastRes.unit.player) {
        props.updateLocalState(
          avelhemResonance(lastRes.unit, lastRes.resonator)
        );
      }
      break;

    case "Avelhem Select Pawn":
      if (self === lastRes.player) {
        selectAvelhemPawn(lastRes.avelhem, lastRes.resonator);
      }
      break;

    case "Search Card":
      return (
        <>
          {self === lastRes.player && !props.hideModal && (
            <SearchCard
              details={lastRes.details}
              hideOrRevealModale={props.hideOrRevealModale}
              updateFirebase={props.updateFirebase}
            />
          )}
        </>
      );

    case "Recover Avelhem":
      return (
        <>
          {self === lastRes.player && !props.hideModal && (
            <RecoverAvelhem
              details={lastRes.details}
              hideOrRevealModale={props.hideOrRevealModale}
              updateFirebase={props.updateFirebase}
            />
          )}
        </>
      );

    case "Recover Skill":
      return (
        <>
          {self === lastRes.player && !props.hideModal && (
            <RecoverSkill
              details={lastRes.details}
              canSkip={lastRes.canSkip}
              hideOrRevealModale={props.hideOrRevealModale}
              updateFirebase={props.updateFirebase}
            />
          )}
        </>
      );

    case "Discard Skill":
      return (
        <>
          {self === lastRes.player && !props.hideModal && (
            <YouMaySpend1Skill
              unit={lastRes.unit}
              player={lastRes.player}
              canSkip={lastRes.canSkip}
              details={lastRes.details}
              updateFirebase={props.updateFirebase}
              hideOrRevealModale={props.hideOrRevealModale}
            />
          )}
        </>
      );

    case "Avelhem Conclusion":
      if (self === lastRes.player) {
        avelhemConclusion(
          lastRes.avelhem,
          lastRes.skillConclusion,
          lastRes.resonator,
          lastRes.resonatorConclusion
        );
      }
      break;

    case "Skill Conclusion":
      if (self === lastRes.player) {
        skillConclusion(
          lastRes.player,
          lastRes.unit,
          lastRes.skill,
          lastRes.skillConclusion
        );
      }
      break;

    case "Resonance Conclusion":
      if (self === lastRes.player) {
        skillResonanceConclusion(
          lastRes.player,
          lastRes.unit,
          lastRes.skill,
          lastRes.skillConclusion,
          lastRes.resonator,
          lastRes.resonatorConclusion
        );
      }
      break;

    case "Selecting":
      switch (lastRes.resolution2) {
        case "Selecting Unit":
          if (self === lastRes.player && props.tileMode !== "selectUnit") {
            props.setTileMode("selectUnit");
            props.setValidZones(lastRes.zoneIds);
            props.setMovingUnit(lastRes.unit);
            props.setTacticUsed(lastRes.tactic);
            props.setSelectUnitReason(lastRes.reason);
            props.setSelectUnitSpecial(lastRes.special);
          }
          break;

        case "Selecting Scion Skill":
          return (
            <>
              {self === lastRes.unit.player && (
                <ScionSkillSelect
                  updateFirebase={props.updateFirebase}
                  unit={lastRes.unit}
                />
              )}
            </>
          );

        case "Selecting Unit Ability":
          return (
            <>
              {self === lastRes.unit.player && (
                <SelectUnitAbility
                  updateFirebase={props.updateFirebase}
                  unit={lastRes.unit}
                />
              )}
            </>
          );
      }
      break;

    case "Misc.":
      switch (lastRes.resolution2) {
        case "End Execution Phase Confirm":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <YouMayNoYes
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Moving Unit":
          if (self === localGameState.turnPlayer && props.tileMode !== "move") {
            props.setTileMode("move");
            props.setValidZones(lastRes.zoneIds);
            props.setMovingUnit(lastRes.unit);
            props.setTacticUsed(lastRes.tactic);
          }
          break;

        case "Activating Tactic":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTactic
                  updateFirebase={props.updateFirebase}
                  unit={lastRes.unit}
                />
              )}
            </>
          );

        case "Selecting Tactical Action":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTacticalAction
                  unit={lastRes.unit}
                  dice={lastRes.dice}
                  face={lastRes.face}
                  updateFirebase={props.updateFirebase}
                />
              )}
            </>
          );

        case "Selecting Tactical Action - Sovereign":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTacticalActionSovereign
                  dice={lastRes.dice}
                  face={lastRes.face}
                  updateFirebase={props.updateFirebase}
                />
              )}
            </>
          );

        case "Advance Deploy Scion: Choose Element":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectElement
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Advance Deploy Scion: Float Skill":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <FloatSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Appoint - Upgraded":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(appointShield(lastRes.unit));
          }
          break;

        case "Beseech - Upgraded":
        case "Cultivate - Upgraded":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <YouMayNoYes
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Tactic Results":
          return (
            <>
              {!props.hideModal && (
                <TacticResults
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                  reroll={lastRes.reroll}
                />
              )}
            </>
          );

        case "Strike Movement":
          if (self === lastRes.attacker.player) {
            props.resolutionUpdate(strikeMove(lastRes.attacker, lastRes.zone));
          }
          break;

        case "Rooted Traverse":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Rooted Aether-blast":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Rooted Traverse Movement":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              enterMoveMode(
                getVacantAdjacentZones(lastRes.unit),
                lastRes.unit,
                null,
                lastRes.tactic,
                false,
                true
              )
            );
          }
          break;

        case "May float resonant skill unit":
          if (self === lastRes.player) {
            props.updateLocalState(
              unitFloatSkill(lastRes.unit, lastRes.skill, lastRes.resonator)
            );
          }
          break;

        case "May float resonant skill":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <FloatResonator
                  player={lastRes.player}
                  skill={lastRes.skill}
                  resonator={lastRes.resonator}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Retain resonant skill unit":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <>
                  {props.updateLocalState(
                    unitRetainSkill(
                      lastRes.unit,
                      lastRes.skill,
                      lastRes.resonator
                    )
                  )}
                </>
              )}
            </>
          );

        case "Retain resonant skill":
          if (self === lastRes.player) {
            skillResonanceRetain(lastRes.resonator);
          }
          break;

        case "Inspect Skill":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <InspectSkill
                  details={lastRes.details}
                  hideOrRevealModale={props.hideOrRevealModale}
                  updateFirebase={props.updateFirebase}
                />
              )}
            </>
          );

        case "Revealing Skill":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <RevealedSkillView
                  skill={lastRes.skill}
                  title={lastRes.title}
                  message={lastRes.message}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Message To Player":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <MessageToPlayer
                  title={lastRes.title}
                  message={lastRes.message}
                  updateFirebase={props.updateFirebase}
                />
              )}
            </>
          );

        case "Battle Cry":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectHandMultiSkill
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );
      }
      break;

    case "Unit Ability":
      switch (lastRes.resolution2) {
        case "Ability - select tactic":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTacticViaEffect
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Afterburner":
          if (self === lastRes.unit.player) {
            props.updateLocalState(afterburner1(lastRes.unit));
          }
          break;

        case "Afterburner1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(afterburner2(lastRes.unit));
          }
          break;

        case "Activating Fiery Heart":
          if (self === lastRes.unit.player) {
            props.updateLocalState(fieryHeart1(lastRes.unit));
          }
          break;

        case "Fiery Heart1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(fieryHeart2(lastRes.unit));
          }
          break;

        case "Activating Hydrotherapy":
          if (self === lastRes.unit.player) {
            props.updateLocalState(hydrotherapy1(lastRes.unit));
          }
          break;

        case "Hydrotherapy1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(hydrotherapy2(lastRes.unit));
          }
          break;

        case "Hydrotherapy2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <FloatSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Cold Embrace":
          if (self === lastRes.unit.player) {
            props.updateLocalState(coldEmbrace1(lastRes.unit));
          }
          break;

        case "Cold Embrace1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Reap the Whirlwind":
          if (self === lastRes.unit.player) {
            props.updateLocalState(reapTheWhirlwind1(lastRes.unit));
          }
          break;

        case "Activating Air Dash":
          if (self === lastRes.unit.player) {
            props.updateLocalState(airDash1(lastRes.unit));
          }
          break;

        case "Air Dash1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              enterMoveMode(
                getVacant2SpaceZones(lastRes.unit),
                lastRes.unit,
                null,
                null,
                false,
                true
              )
            );
          }
          break;

        case "Reap the Whirlwind1":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "blast", null);
          }
          break;

        case "Activating Fortify":
          if (self === lastRes.unit.player) {
            props.updateLocalState(fortify1(lastRes.unit));
          }
          break;

        case "Fortify1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <FloatSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Fortify2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Leyline Convergence":
          if (self === lastRes.unit.player) {
            props.updateLocalState(leylineConvergence1(lastRes.unit));
          }
          break;

        case "Leyline Convergence1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Galvanize":
          if (self === lastRes.unit.player) {
            props.updateLocalState(galvanize1(lastRes.unit));
          }
          break;

        case "Galvanize1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Arc Flash":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(arcFlash1(lastRes.unit));
          }
          break;

        case "Arc Flash1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Arc Flash2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(arcFlash2(lastRes.unit));
          }
          break;

        case "Arc Flash3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Particle Beam":
          if (self === lastRes.unit.player) {
            props.updateLocalState(particleBeam1(lastRes.unit));
          }
          break;

        case "Particle Beam1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(particleBeam2(lastRes.unit));
          }
          break;

        case "Particle Beam2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(particleBeam3(lastRes.unit));
          }
          break;

        case "Activating Amplify Aura":
          if (self === lastRes.unit.player) {
            props.updateLocalState(auraAmplication1(lastRes.unit));
          }
          break;

        case "Activating Brandish":
          if (self === lastRes.unit.player) {
            props.updateLocalState(brandish1(lastRes.unit));
          }
          break;

        case "Brandish1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Ballistic Armor":
          if (self === lastRes.unit.player) {
            props.updateLocalState(ballisticArmor1(lastRes.unit));
          }
          break;

        case "Ballistic Armor1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Flourish":
          if (self === lastRes.unit.player) {
            props.updateLocalState(flourish1(lastRes.unit));
          }
          break;

        case "Flourish1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(flourish2(lastRes.unit));
          }
          break;

        case "Activating Ambrosia":
          if (self === lastRes.unit.player) {
            props.updateLocalState(ambrosia1(lastRes.unit));
          }
          break;

        //end of abilities
      }
      break;

    case "Unit Talent":
      switch (lastRes.resolution2) {
        case "Activating Kleptothermy":
        case "Activating Mountain Stance":
        case "Activating Everblooming":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Eternal Ember":
        case "Activating From the Ashes":
        case "Activating Lightning Rod":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Ambiance Assimilation":
        case "Activating Mana Feedback":
        case "Activating Conduction":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Second Wind":
          if (self === lastRes.unit.player) {
            props.updateLocalState(secondWind1());
          }
          break;

        case "Talent Conclusion":
          if (self === lastRes.unit.player) {
            talentConclusion();
          }
          break;
      }
      break;

    case "Fire Skill":
      switch (lastRes.resolution2) {
        case "Activating Ignition Propulsion":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("ignitionPropulsion1", lastRes.unit)
            );
          }
          break;

        case "Ignition Propulsion1":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "strike", null);
          }
          break;

        case "Ignition Propulsion2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("ignitionPropulsion2", lastRes.unit)
            );
          }
          break;

        case "Activating Conflagration":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("conflagration1", lastRes.unit, lastRes.resonator)
            );
          }
          break;

        case "Conflagration1":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "blast", null);
          }
          break;

        case "ConflagrationR1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("conflagrationR1", lastRes.unit));
          }
          break;

        case "ConflagrationR2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Blaze of Glory":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("blazeOfGlory1", lastRes.unit));
          }
          break;

        case "Blaze of Glory1":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "ignite", "Blaze of Glory");
          }
          break;

        case "Blaze of Glory2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("blazeOfGlory2", lastRes.unit));
          }
          break;

        case "Blaze of Glory2.5":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <RevealSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Blaze of Glory3":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(
              applySkill("blazeOfGlory3", lastRes.unit, lastRes.adjacentEnemies)
            );
          }
          break;

        case "Blaze of Glory4":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("blazeOfGlory4", lastRes.unit));
          }
          break;

        case "Blaze of Glory5":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Resplendence":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("resplendence1", lastRes.unit));
          }
          break;

        case "Resplendence1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Resplendence2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("resplendence2", lastRes.unit));
          }
          break;

        case "Resplendence3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Resplendence4":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "ignite", null);
          }
          break;
      }
      break;

    case "Water Skill":
      switch (lastRes.resolution2) {
        case "Activating Purification":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("purification1", lastRes.unit));
          }
          break;

        case "Purification1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Purification1.5":
          if (self === lastRes.unit.player) {
            selectAllies(lastRes.unit, 2, false, "purification", null);
          }
          break;

        case "Activating Frigid Breath":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("frigidBreath1", lastRes.unit, lastRes.resonator)
            );
          }
          break;

        case "Frigid Breath1":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 2, null, "freeze1", null);
          }
          break;

        case "Frigid Breath2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("frigidBreath2", lastRes.unit));
          }
          break;

        case "Frigid Breath3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <FloatSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Frigid Breath4":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "freeze1", null);
          }
          break;

        case "Frigid BreathR1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("frigidBreathR2", lastRes.unit));
          }
          break;

        case "Frigid BreathR2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Frigid BreathR3":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(applySkill("frigidBreathR3", lastRes.unit));
          }
          break;

        case "Select Healing Rain Activator":
          if (self === lastRes.player) {
            selectHealingRainActivator(lastRes.victim);
          }
          break;

        case "Activating Healing Rain":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("healingRain1", lastRes.unit, lastRes.victim)
            );
          }
          break;

        case "Healing Rain1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Healing Rain2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <RevealSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Glacial Torrent":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("glacialTorrent1", lastRes.unit));
          }
          break;

        case "Glacial Torrent1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <InspectSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  hideOrRevealModale={props.hideOrRevealModale}
                  updateFirebase={props.updateFirebase}
                />
              )}
            </>
          );
      }
      break;

    case "Wind Skill":
      switch (lastRes.resolution2) {
        case "Activating Aerial Impetus":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("aerialImpetus1", lastRes.unit));
          }
          break;

        case "Aerial Impetus1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Aerial Impetus Float":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <FloatSkill
                  unSkippable={true}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Aerial Impetus Select Ally":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("aerialImpetus2", lastRes.unit));
          }
          break;

        case "Aerial Impetus Prompt":
          if (self === lastRes.unit.player) {
            selectAerialImpetusMove(lastRes.unit, "Ally");
          }
          break;

        case "Aerial Impetus Purge":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("aerialImpetus2E", lastRes.victim)
            );
          }
          break;

        case "Aerial Impetus Purge Move":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  player={lastRes.player}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Aerial Impetus Purge Move2":
          if (self === lastRes.player) {
            selectAerialImpetusMove(lastRes.victim, "Enemy");
          }
          break;

        case "Aerial Impetus2":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTacticViaEffect
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Gale Conjuration":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("galeConjuration1", lastRes.unit, lastRes.resonator)
            );
          }
          break;

        case "Gale Conjuration1":
          if (self === lastRes.unit.player) {
            selectEnemies(
              lastRes.unit,
              2,
              null,
              "gale conjuration purge",
              null
            );
          }
          break;

        case "Gale ConjurationR1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("galeConjurationR2", lastRes.unit)
            );
          }
          break;

        case "Gale ConjurationR2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Select Symphonic Screech Activator":
          if (self === lastRes.player) {
            selectSymphonicScreechActivator(lastRes.activator);
          }
          break;

        case "Activating Symphonic Screech":
          if (self === lastRes.unit.player) {
            //Do not use UpdateGameStateOnly
            props.resolutionUpdate(
              applySkill("symphonicScreech1", lastRes.unit, lastRes.victim)
            );
          }
          break;

        case "Symphonic Screech Float":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Symphonic Screech2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <RevealSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Cataclysmic Tempest":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("cataclysmicTempest1", lastRes.unit)
            );
          }
          break;

        case "Cataclysmic Tempest1":
          if (self === lastRes.unit.player) {
            selectEnemies(
              lastRes.unit,
              1,
              null,
              "paralyze1",
              "Cataclysmic Tempest"
            );
          }
          break;

        case "Cataclysmic Tempest2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("cataclysmicTempest2", lastRes.unit)
            );
          }
          break;

        case "Cataclysmic Tempest3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Cataclysmic Tempest4":
          if (self === lastRes.unit.player) {
            //Do not use UpdateGameStateOnly
            props.resolutionUpdate(
              applySkill("cataclysmicTempest3", lastRes.unit)
            );
          }
          break;

        case "Cataclysmic Tempest Float":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectHandMultiSkill
                  resonated={lastRes.resonated}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Cataclysmic Tempest5":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(
              applySkill("cataclysmicTempest4", lastRes.unit)
            );
          }
          break;

        case "Cataclysmic Tempest6":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <RevealSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Cataclysmic Tempest7":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(
              applySkill("cataclysmicTempest5", lastRes.unit)
            );
          }
          break;
      }
      break;

    case "Land Skill":
      switch (lastRes.resolution2) {
        case "Activating Crystallization":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("crystallization1", lastRes.unit)
            );
          }
          break;

        case "Crystallization1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Crystallization2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("crystallization2", lastRes.unit)
            );
          }
          break;

        case "Activating Upheaval":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("upheaval1", lastRes.unit, lastRes.resonator)
            );
          }
          break;

        case "Upheaval1":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "paralyze1", "Upheaval");
          }
          break;

        case "Upheaval2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("upheaval2", lastRes.unit));
          }
          break;

        case "Upheaval3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "UpheavalR1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("upheavalR1", lastRes.unit));
          }
          break;

        case "UpheavalR2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  setMovingSpecial={props.setMovingSpecial}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Select Pitfall Trap Activator":
          if (self === lastRes.player) {
            selectPitfallTrapActivator(lastRes.mover);
          }
          break;

        case "Activating Pitfall Trap":
          if (self === lastRes.unit.player) {
            //Do not use UpdateGameStateOnly
            props.resolutionUpdate(
              applySkill("pitfallTrap1", lastRes.unit, lastRes.victim)
            );
          }
          break;

        case "Pitfall Trap1":
          if (self === lastRes.unit.player) {
            //Do not use UpdateGameStateOnly
            props.resolutionUpdate(
              applySkill("pitfallTrap2", lastRes.unit, lastRes.victim)
            );
          }
          break;

        case "Pitfall Trap2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  victim={lastRes.victim}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Pitfall Trap3":
          if (self === lastRes.unit.player) {
            //Do not use UpdateGameStateOnly
            props.resolutionUpdate(
              applySkill("pitfallTrap3", lastRes.unit, lastRes.victim)
            );
          }
          break;

        case "Activating Geomancy":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("geomancy1", lastRes.unit));
          }
          break;

        case "Geomancy1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Geomancy2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Geomancy3":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("geomancy2", lastRes.unit));
          }
          break;

        case "Geomancy4":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );
      }
      break;

    case "Lightning Skill":
      switch (lastRes.resolution2) {
        case "Activating Chain Lightning":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("chainLightning1", lastRes.unit));
          }
          break;

        case "Chain Lightning1":
          if (self === lastRes.unit.player) {
            selectEnemies(
              lastRes.unit,
              1,
              null,
              "paralyze1",
              "ChainLightningParalysis"
            );
          }
          break;

        case "Chain Lightning2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("chainLightning2", lastRes.unit));
          }
          break;

        case "Chain Lightning3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Chain Lightning4":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill(
                "chainLightning3",
                lastRes.unit,
                lastRes.adjacentEnemies
              )
            );
          }
          break;

        case "Chain Lightning5":
          if (self === lastRes.unit.player) {
            selectChainLightningBlast(lastRes.unit, lastRes.adjacentEnemies);
          }
          break;

        case "Activating Zip and Zap":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("zipAndZap1", lastRes.unit, lastRes.resonator)
            );
          }
          break;

        case "Zip And Zap1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              enterMoveMode(
                getVacantAdjacentZones(lastRes.unit),
                lastRes.unit,
                null,
                null,
                false,
                true
              )
            );
          }
          break;

        case "Zip And Zap2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("zipAndZap2", lastRes.unit));
          }
          break;

        case "Zip And Zap3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Zip And ZapR1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("zipAndZapR2", lastRes.unit));
          }
          break;

        case "Zip And ZapR2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Thunder Thaumaturge":
          if (self === lastRes.unit.player) {
            //Do not use UpdateGameStateOnly
            props.resolutionUpdate(
              applySkill("thunderThaumaturge1", lastRes.unit, lastRes.attacker)
            );
          }
          break;

        case "Thunder Thaumaturge1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("thunderThaumaturge2", lastRes.unit)
            );
          }
          break;

        case "Thunder Thaumaturge2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Valiant Spark":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("valiantSpark1", lastRes.unit));
          }
          break;

        case "Valiant Spark1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <RevealSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );
      }
      break;

    case "Mana Skill":
      switch (lastRes.resolution2) {
        case "Activating Surge":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("surge1", lastRes.unit));
          }
          break;

        case "Surge1":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTacticViaEffect
                  unit={lastRes.unit}
                  details={lastRes.details}
                  setMovingSpecial={props.setMovingSpecial}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Surge2":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  setMovingSpecial={props.setMovingSpecial}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Surge3":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("surge2", lastRes.unit));
          }
          break;

        case "Surge4":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  setMovingSpecial={props.setMovingSpecial}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Diffusion":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("diffusion1", lastRes.unit, lastRes.resonator)
            );
          }
          break;

        case "Diffusion1":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTacticViaEffect
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Diffusion2":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "blast", "Diffusion");
          }
          break;

        case "Diffusion3":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("diffusion2", lastRes.unit));
          }
          break;

        case "Diffusion4":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "DiffusionR1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("diffusionR2", lastRes.unit));
          }
          break;

        case "Select Aegis Activator":
          if (self === lastRes.player) {
            selectAegisActivator(lastRes.victim);
          }
          break;

        case "Activating Aegis":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("aegis1", lastRes.unit, lastRes.victim)
            );
          }
          break;

        case "Aegis1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  victim={lastRes.victim}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Disruption Field":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("disruptionField1", lastRes.unit)
            );
          }
          break;
      }
      break;

    case "Metal Skill":
      switch (lastRes.resolution2) {
        case "Activating Magnetic Shockwave":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("magneticShockwave1", lastRes.unit)
            );
          }
          break;

        case "Magnetic Shockwave1":
          if (self === lastRes.unit.player) {
            selectEnemies(
              lastRes.unit,
              1,
              null,
              "paralyze1",
              "MagneticShockwave1stParalysis"
            );
          }
          break;

        case "Magnetic Shockwave2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("magneticShockwave2", lastRes.unit)
            );
          }
          break;

        case "Magnetic Shockwave2.1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Magnetic Shockwave3":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("magneticShockwave3", lastRes.unit)
            );
          }
          break;

        case "Magnetic Shockwave3.1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMayNoYes
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Reinforce":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("reinforce1", lastRes.unit, lastRes.resonator)
            );
          }
          break;

        case "Reinforce1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "ReinforceR1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("reinforceR2", lastRes.unit));
          }
          break;

        case "Select Frenzy Blade Activator":
          if (self === lastRes.player) {
            selectFrenzyBladeActivator(lastRes.victim);
          }
          break;

        case "Activating Frenzy Blade":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("frenzyBlade1", lastRes.unit, lastRes.victim)
            );
          }
          break;

        case "Frenzy Blade1":
          if (self === lastRes.unit.player) {
            //Do not use UpdateGameStateOnly
            props.resolutionUpdate(
              applySkill("frenzyBlade2", lastRes.unit, lastRes.victim)
            );
          }
          break;

        case "Frenzy Blade2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("frenzyBlade3", lastRes.unit));
          }
          break;

        case "Frenzy Blade3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Frenzy Blade4":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("frenzyBlade4", lastRes.unit));
          }
          break;

        // case "Frenzy Blade2":
        //   return (
        //     <>
        //       {self === lastRes.unit.player && !props.hideModal && (
        //         <SelectCustomChoice
        //           unit={lastRes.unit}
        //           details={lastRes.details}
        //           updateFirebase={props.updateFirebase}
        //           hideOrRevealModale={props.hideOrRevealModale}
        //         />
        //       )}
        //     </>
        //   );

        case "Activating Arsenal Onslaught":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("arsenalOnslaught1", lastRes.unit)
            );
          }
          break;

        case "Arsenal Onslaught1":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "strike", null);
          }
          break;

        case "Arsenal Onslaught1.1":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "blast", null);
          }
          break;

        case "Arsenal Onslaught2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("arsenalOnslaught2", lastRes.unit)
            );
          }
          break;

        case "Arsenal Onslaught3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <RevealSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Arsenal Onslaught3.5":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 1, null, "paralyze1", null);
          }
          break;

        case "Arsenal Onslaught4":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("arsenalOnslaught3", lastRes.unit)
            );
          }
          break;

        case "Arsenal Onslaught5":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Arsenal Onslaught6":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );
      }
      break;

    case "Plant Skill":
      switch (lastRes.resolution2) {
        case "Activating Sow and Reap":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("sowAndReap1", lastRes.unit));
          }
          break;

        case "Sow and Reap1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Sow and Reap Blast":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(applySkill("sowAndReap3", lastRes.unit));
          }
          break;

        case "Select Sow and Reap Striker":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(applySkill("sowAndReap4", lastRes.unit));
          }
          break;

        case "Sow and Reap Strike":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(applySkill("sowAndReap5", lastRes.unit));
          }
          break;

        case "Sow and Reap2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("sowAndReap2", lastRes.unit));
          }
          break;

        case "Activating Efflorescence":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("efflorescence1", lastRes.unit, lastRes.resonator)
            );
          }
          break;

        case "Efflorescence1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "EfflorescenceR1":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("efflorescenceR2", lastRes.unit));
          }
          break;

        case "Select Viridian Grave Activator":
          if (self === lastRes.player) {
            selectViridianGraveActivator(lastRes.victim);
          }
          break;

        case "Activating Viridian Grave":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("viridianGrave1", lastRes.unit, lastRes.victim)
            );
          }
          break;

        case "Viridian Grave1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Castle of Thorns":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("castleOfThorns1", lastRes.unit));
          }
          break;

        case "Castle Of Thorns1":
        case "Castle Of Thorns3":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <YouMaySpend1Skill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Castle Of Thorns2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("castleOfThorns2", lastRes.unit));
          }
          break;
      }
      break;

    case "Avian Skill":
      switch (lastRes.resolution2) {
        case "Activating Raptor Blitz":
          if (self === lastRes.unit.player) {
            props.updateLocalState(applySkill("raptorBlitz1", lastRes.unit));
          }
          break;

        case "Raptor Blitz1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <SelectCustomChoice
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Raptor Blitz Blast":
          if (self === lastRes.unit.player) {
            props.resolutionUpdate(applySkill("raptorBlitz2", lastRes.unit));
          }
          break;

        case "Raptor Blitz Purge":
          if (self === lastRes.unit.player) {
            selectEnemies(lastRes.unit, 2, null, "raptor blitz purge", null);
          }
          break;

        case "Activating Reconnaissance":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("reconnaissance1", lastRes.unit, lastRes.resonator)
            );
          }
          break;

        case "Reconnaissance1":
          return (
            <>
              {self === lastRes.unit.player && !props.hideModal && (
                <InspectSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  hideOrRevealModale={props.hideOrRevealModale}
                  updateFirebase={props.updateFirebase}
                />
              )}
            </>
          );

        case "Select Guardian Wings Activator":
          if (self === lastRes.player) {
            selectGuardianWingsActivator(lastRes.victim);
          }
          break;

        case "Activating Guardian Wings":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              applySkill("guardianWings1", lastRes.unit, lastRes.victim)
            );
          }
          break;

        ///------------
      }
      break;

    case "Sovereign Standard Skill":
      switch (lastRes.resolution2) {
        case "Activating Heir’s Endeavor":
          if (self === lastRes.player) {
            props.updateLocalState(heirsEndeavor1());
          }
          break;

        case "Activating Tea for Two":
          if (self === lastRes.player) {
            props.updateLocalState(teaForTwo1());
          }
          break;

        case "Tea for Two1":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectCustomChoice
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Tea for Two2":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <>
                  {self === lastRes.player && !props.hideModal && (
                    <FloatSkill
                      unSkippable={true}
                      details={lastRes.details}
                      updateFirebase={props.updateFirebase}
                      hideOrRevealModale={props.hideOrRevealModale}
                    />
                  )}
                </>
              )}
            </>
          );

        case "Activating Dark Halo":
          if (self === lastRes.player) {
            props.updateLocalState(darkHalo1());
          }
          break;

        case "Select Dark Halo":
          if (self === lastRes.player) {
            selectDarkHalo();
          }
          break;

        case "Activating Reminiscence":
          if (self === lastRes.player) {
            props.updateLocalState(reminiscence1());
          }
          break;

        case "Reminiscence1":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectCustomChoice
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Reminiscence2":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTacticViaEffect
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Foreshadow":
          if (self === lastRes.player) {
            props.updateLocalState(foreshadow1());
          }
          break;

        case "Foreshadow1":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectCustomChoice
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Foreshadow2":
          if (self === lastRes.player) {
            props.updateLocalState(foreshadow2(lastRes.discardedBurst));
          }
          break;

        case "Foreshadow Draw":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <YouMayNoYes
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Foreshadow3":
          if (self === lastRes.player) {
            props.updateLocalState(foreshadow3());
          }
          break;
      }
      break;

    case "Sovereign Resonant Skill":
      switch (lastRes.resolution2) {
        case "Activating Transmute":
          if (self === lastRes.player) {
            props.updateLocalState(transmute1(lastRes.resonator));
          }
          break;

        case "Transmute1":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectHandMultiSkill
                  resonated={lastRes.resonated}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "TransmuteR1":
          if (self === lastRes.player) {
            props.updateLocalState(transmuteR1(lastRes.skillsToShuffle));
          }
          break;

        case "Activating Ambidexterity":
          if (self === lastRes.player) {
            props.updateLocalState(ambidexterity1(lastRes.resonator));
          }
          break;

        case "Select Ambidexterity":
          if (self === lastRes.player) {
            selectAmbidexterity(lastRes.resonated);
          }
          break;

        case "Ambidexterity Conversion":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTacticViaEffect
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "AmbidexterityR1":
          if (self === lastRes.player) {
            props.updateLocalState(ambidexterityR1(lastRes.unit));
          }
          break;

        case "Activating Providence":
          if (self === lastRes.player) {
            props.updateLocalState(providence1(lastRes.resonator));
          }
          break;

        case "Providence1":
          return (
            <>
              {self === localGameState.turnPlayer && !props.hideModal && (
                <SelectTacticViaEffect
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "ProvidenceR1":
          if (self === lastRes.player) {
            props.updateLocalState(providenceR1(lastRes.resonator));
          }
          break;

        case "Activating Fervent Prayer":
          if (self === lastRes.player) {
            props.updateLocalState(ferventPrayer1(lastRes.resonator));
          }
          break;

        case "Fervent Prayer1":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <YouMayNoYes
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Fervent Prayer2":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectHandMultiAvelhem
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Fervent PrayerR1":
          if (self === lastRes.player) {
            props.updateLocalState(ferventPrayerR1());
          }
          break;

        case "Fervent PrayerR2":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <FerventPrayerResonance
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Fervent Prayer Reveal":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <RevealedSkillView
                  avelhems={lastRes.avelhems}
                  multi={true}
                  title={lastRes.title}
                  message={lastRes.message}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Press the Attack":
          if (self === lastRes.player) {
            props.updateLocalState(pressTheAttack1(lastRes.resonator));
          }
          break;

        case "Press the Attack1":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <YouMayNoYes
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Press the Attack2":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <YouMayNoYes
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Heirs Endeavor Resonance":
          if (self === lastRes.player) {
            props.updateLocalState(heirsEndeavorResonance());
          }
          break;
      }
      break;

    case "Sovereign Contingent Skill":
      switch (lastRes.resolution2) {
        case "Activating Power at the Final Hour":
          if (self === lastRes.player) {
            props.updateLocalState(powerAtTheFinalHour1(lastRes.unit));
          }
          break;

        case "Power at the Final Hour":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectElement
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Power at the Final Hour2":
          if (self === lastRes.player) {
            props.updateLocalState(powerAtTheFinalHour2(lastRes.unit));
          }
          break;

        case "Power at the Final Hour3":
          if (self === lastRes.unit.player) {
            props.updateLocalState(powerAtTheFinalHour3(lastRes.unit));
          }
          break;

        case "Activating Fated Rivalry":
          if (self === lastRes.player) {
            props.updateLocalState(fatedRivalry1(lastRes.unit));
          }
          break;

        case "Select Fated Rivalry":
          if (self === lastRes.player) {
            selectFatedRivalry(lastRes.unit);
          }
          break;

        case "Fated Rivalry2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(fatedRivalry2(lastRes.unit, lastRes.enemy));
          }
          break;

        case "Fated Rivalry3":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <SelectCustomChoice
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Match Made in Heaven":
          if (self === lastRes.player) {
            props.updateLocalState(matchMadeInHeaven1(lastRes.unit));
          }
          break;

        case "Select Match Made in Heaven Pawn":
          if (self === lastRes.unit.player) {
            selectMatchMadeInHeavenPawn(lastRes.unit);
          }
          break;

        case "Match Made in Heaven2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(
              matchMadeInHeaven2(lastRes.unit, lastRes.unit2)
            );
          }
          break;

        case "Match Made in Heaven3":
          if (self === lastRes.player) {
            props.updateLocalState(matchMadeInHeaven3());
          }
          break;

        case "Match Made in Heaven4":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <FloatSkill
                  unit={lastRes.unit}
                  details={lastRes.details}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Activating Vengeful Legacy":
          if (self === lastRes.player) {
            props.updateLocalState(vengefulLegacy1(lastRes.victim));
          }
          break;

        case "Select Vengeful Legacy":
          if (self === lastRes.player) {
            selectVengefulLegacy(lastRes.victim);
          }
          break;

        case "Vengeful Legacy2":
          if (self === lastRes.unit.player) {
            props.updateLocalState(vengefulLegacy2(lastRes.unit));
          }
          break;

        case "Activating Black Business Card":
          if (self === lastRes.player) {
            props.updateLocalState(blackBusinessCard1());
          }
          break;
      }

      break;

    case "Triggering Contingent Skill":
      switch (lastRes.resolution2) {
        case "Triggering Elimination Ally":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <ContingentTriggered
                  contingencyType="Elimination"
                  player={lastRes.player}
                  unit={lastRes.unit}
                  team="ally"
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Triggering Ascension Ally":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <ContingentTriggered
                  contingencyType="Ascension"
                  player={lastRes.player}
                  unit={lastRes.unit}
                  team="ally"
                  scionClass={lastRes.scionClass}
                  method={lastRes.method}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Triggering Ascension Enemy":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <ContingentTriggered
                  contingencyType="Ascension"
                  player={lastRes.player}
                  unit={lastRes.unit}
                  team="enemy"
                  scionClass={lastRes.scionClass}
                  method={lastRes.method}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Triggering Elimination Enemy":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <ContingentTriggered
                  contingencyType="Elimination"
                  player={lastRes.player}
                  unit={lastRes.unit}
                  team="enemy"
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Triggering Motion":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <ContingentTriggered
                  contingencyType="Motion"
                  mover={lastRes.mover}
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Triggering Survival Ally":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <ContingentTriggered
                  contingencyType="Survival"
                  attacker={lastRes.attacker}
                  victim={lastRes.victim}
                  team="ally"
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Triggering Survival Enemy":
          return (
            <>
              {self === lastRes.player && !props.hideModal && (
                <ContingentTriggered
                  contingencyType="Survival"
                  attacker={lastRes.attacker}
                  victim={lastRes.victim}
                  team="enemy"
                  updateFirebase={props.updateFirebase}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );

        case "Triggering Target":
          return (
            <>
              {self === lastRes.victim.player && !props.hideModal && (
                <ContingentTriggered
                  contingencyType="Target"
                  updateFirebase={props.updateFirebase}
                  attacker={lastRes.attacker}
                  victim={lastRes.victim}
                  type={lastRes.type}
                  hideOrRevealModale={props.hideOrRevealModale}
                />
              )}
            </>
          );
      }
      break;

    case "Triggering Activation":
      return (
        <>
          {self === lastRes.player && !props.hideModal && (
            <ContingentTriggered
              contingencyType="Activation"
              updateFirebase={props.updateFirebase}
              activator={lastRes.activator}
              screech={lastRes.screech}
              hideOrRevealModale={props.hideOrRevealModale}
            />
          )}
        </>
      );

    case "":
      if (self === "host" && !lastRes.resolution2) {
        return (
          <>
            <SelectFirstPlayer updateFirebase={props.updateFirebase} />
          </>
        );
      }
      break;

    case "Game Over":
      return (
        <>
          {!props.hideModal && (
            <VictoryScreen
              player={lastRes.player}
              updateFirebase={props.updateFirebase}
              hideOrRevealModale={props.hideOrRevealModale}
            />
          )}
        </>
      );

    case "Continue Game":
      return (
        <>
          {self === lastRes.player && !props.hideModal && (
            <YouMayNoYes
              details={lastRes.details}
              updateFirebase={props.updateFirebase}
              hideOrRevealModale={props.hideOrRevealModale}
            />
          )}
        </>
      );

    default:
      return;
  }
};

export default UseCurrentResolution;
