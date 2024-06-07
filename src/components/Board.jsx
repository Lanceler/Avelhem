import "./Board.scss";

import React, { useState, useEffect } from "react";

import SelectFirstPlayer from "./modals/SelectFirstPlayer";

import { useSelector, useDispatch } from "react-redux";
import gameState, { updateState } from "../redux/gameState";
import { updateSelf, updateEnemy } from "../redux/teams";
import { db } from "../config/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

import { useRecurringEffects } from "../hooks/useRecurringEffects";
import { useSkillEffects } from "../hooks/useSkillEffects";
import { useSovereignSkillEffects } from "../hooks/useSovereignSkillEffects";
import { useUnitAbilityEffects } from "../hooks/useUnitAbilityEffects";

import AcquisitionPhaseSelection from "./modals/AcquisitionPhaseSelection";
import BountyStore from "./modals/BountyStore";
import CoordinationPhaseSelection from "./modals/CoordinationPhaseSelection";
import DefiancePhaseSelection from "./modals/DefiancePhaseSelection";

import InspectSkill from "./modals/InspectSkill";
import MessageToPlayer from "./modals/MessageToPlayer";
import RecoverAvelhem from "./modals/RecoverAvelhem";
import RecoverSkill from "./modals/RecoverSkill";
import ScionSkillSelect from "./modals/ScionSkillSelect";
import SearchAvelhem from "./modals/SearchAvelhem";
import SearchSkill from "./modals/SearchSkill";
import SelectElement from "./modals/SelectElement";
import SelectSkillResonator from "./modals/SelectSkillResonator";
import SelectAvelhemHandMulti from "./modals/SelectAvelhemHandMulti";
import SelectAvelhemResonator from "./modals/SelectAvelhemResonator";
import SelectSkillDiscard from "./modals/SelectSkillDiscard";
import SelectSkillHandMulti from "./modals/SelectSkillHandMulti";
import SelectSkillFloat from "./modals/SelectSkillFloat";
import SelectSkillReveal from "./modals/SelectSkillReveal";
import SelectUnitAbility from "./modals/SelectUnitAbility";
import SelectTacticalAction from "./modals/SelectTacticalAction";
import SelectSovereignTactic from "./modals/SelectSovereignTactic";
import TacticResults from "./modals/TacticResults";
import TacticResults3 from "./modals/TacticResults3";
import ViewRevealedSkill from "./modals/ViewRevealedSkill";
import YouMayFloat1Skill from "./modals/YouMayFloat1Skill";
import YouMaySpend1Skill from "./modals/YouMaySpend1Skill";
import YouMayNoYes from "./modals/YouMayNoYes";
import VictoryScreen from "./modals/VictoryScreen";

import TacticSelection from "./modals/TacticSelection";
import TacticSelectionViaEffect from "./modals/TacticSelectionViaEffect";

import SelectCustomChoice from "./modals/SelectCustomChoice";

import GlacialTorrent1 from "./skillModals/GlacialTorrent1";
import CataclysmicTempestFloat from "./skillModals/CataclysmicTempestFloat";
import FerventPrayerResonance from "./skillModals/FerventPrayerResonance";
import PowerAtTheFinalHourProaction from "./skillModals/PowerAtTheFinalHourProaction";

import ContingentAscension from "./skillModals/ContingentAscension";
import ContingentElimination from "./skillModals/ContingentElimination";
import ContingentMotion from "./skillModals/ContingentMotion";
import ContingentSurvivalAlly from "./skillModals/ContingentSurvivalAlly";
import ContingentSurvivalEnemy from "./skillModals/ContingentSurvivalEnemy";
import ContingentSymphonicScreech from "./skillModals/ContingentSymphonicScreech";
import ContingentTarget from "./skillModals/ContingentTarget";

import MayFloatResonantSkill from "./skillModals/MayFloatResonantSkill";

import ActivatedSkills from "./displays/ActivatedSkills";

import PlayerAvelhemHand from "./hand/PlayerAvelhemHand";
import PlayerSkillHand from "./hand/PlayerSkillHand";
import EnemySkillHand from "./hand/EnemySkillHand";
import EnemyAvelhemHand from "./hand/EnemyAvelhemHand";

import SovereignTactics from "./displays/SovereignTactics";

import UnitInfo from "./modals/UnitInfo";
import ViewBPUpgrades from "./modals/ViewBPUpgrades";
import InfoPopUp from "./modals/InfoPopUp";

import Tile from "./Tile";
import Piece from "./Piece";

import PileOfCards from "./displays/PileOfCards";

import Crosshair from "../assets/others/Crosshair.png";

const Board = (props) => {
  const gameDoc = doc(db, "gameInfo", props.gameId);
  const dispatch = useDispatch();

  const { localGameState } = useSelector((state) => state.gameState);

  const { self } = useSelector((state) => state.teams);
  const { enemy } = useSelector((state) => state.teams);

  const [zones, setZones] = useState(null);

  const [validZones, setValidZones] = useState([]);

  const [tileMode, setTileMode] = useState(false);
  const [deployClass, setDeployClass] = useState(null);
  const [selectUnitReason, setSelectUnitReason] = useState(null);
  const [selectUnitSpecial, setSelectUnitSpecial] = useState(null);
  const [movingUnit, setMovingUnit] = useState(null);
  const [movingSpecial, setMovingSpecial] = useState(null);
  const [tacticUsed, setTacticUsed] = useState(null);

  const [expandedUnit, setExpandedUnit] = useState(null);

  const [hideModal, setHideModal] = useState(false);

  const [unitInfor, setUnitInfor] = useState(null);
  const [viewBP, setViewBP] = useState(null);
  const [infoPopUp, setInfoPopUp] = useState(null);

  const {
    activateAegis,
    activateFrenzyBlade,
    activateHealingRain,
    activatePitfallTrap,
    activateViridianGrave,
    activateSymphonicScreech,
    applyBurn,
    applyBurnDamage,
    applyDamage,
    applyFrostbite,
    applyParalysis,
    applyScore,
    appointShield,
    ascendPawn,
    avelhemResonance,
    avelhemToScion,
    blast,
    decrementBurn,
    decrementStatus,
    drawSkill,
    endDefiancePhase2,
    getVacant2SpaceZones,
    getVacantAdjacentZones,
    getZonesInRange,
    grantRavager,
    freeze1,
    freeze2,
    ignite,
    isAdjacent,
    isMuted,
    move,
    paralyze1,
    paralyze2,
    selectAegisActivator,
    selectAllies,
    selectAmbidexterity,
    selectAvelhemPawn,
    selectChainLightningBlast,
    selectDarkHalo,
    selectDestine,
    selectEnemies,
    selectEnemiesAfflicted,
    selectEnemiesRooted,
    selectFatedRivalry,
    selectFatedRivalryProaction,
    selectFrenzyBladeActivator,
    selectHealingRainActivator,
    selectMatchMadeInHeavenPawn,
    selectPowerAtTheFinalHour,
    selectPitfallTrapActivator,
    selectSowAndReapStriker,
    selectVengefulLegacy,
    selectViridianGraveActivator,
    shuffleCards,
    strike,
    strikeMove,
    triggerMotion,
    unitFloatSkill,
    unitRetainSkill,
    uponDebutTalents,
    virtueBlast,
  } = useRecurringEffects();

  const {
    ignitionPropulsion1,
    conflagration1,
    conflagrationR1,
    conflagrationR2,
    blazeOfGlory1,
    blazeOfGlory2,
    resplendence1,
    purification1,
    frigidBreath1,
    frigidBreath2,
    frigidBreathR1,
    frigidBreathR2,
    healingRain1,
    glacialTorrent1,
    aerialImpetus1,
    aerialImpetus2E,
    galeConjuration1,
    galeConjurationR1,
    galeConjurationR2,
    symphonicScreech1,
    cataclysmicTempest1,
    cataclysmicTempest2,
    cataclysmicTempest3,
    cataclysmicTempest4,
    crystallization1,
    crystallization2,
    upheaval1,
    upheaval2,
    upheavalR1,
    upheavalR2,
    pitfallTrap1,
    pitfallTrap2,
    pitfallTrap3,
    geomancy1,
    geomancy2,
    chainLightning1,
    chainLightning2,
    chainLightning3,
    zipAndZap1,
    zipAndZap2,
    zipAndZapR1,
    zipAndZapR2,
    thunderThaumaturge1,
    thunderThaumaturge2,
    valiantSpark1,
    surge1,
    diffusion1,
    diffusion2,
    diffusionR1,
    diffusionR2,
    diffusionR3,
    aegis1,
    disruptionField1,
    magneticShockwave1,
    magneticShockwave2,
    magneticShockwave3,
    reinforce1,
    reinforceR1,
    reinforceR2,
    frenzyBlade1,
    frenzyBlade2,
    arsenalOnslaught1,
    arsenalOnslaught2,
    arsenalOnslaught3,
    sowAndReap1,
    sowAndReap2,
    efflorescence1,
    efflorescenceR1,
    efflorescenceR2,
    viridianGrave1,
    castleOfThorns1,
  } = useSkillEffects();

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
    providence2,
    providenceR1,
    ferventPrayer1,
    ferventPrayerR1,
    pressTheAttack1,
    powerAtTheFinalHour1,
    powerAtTheFinalHour2,
    powerAtTheFinalHourProaction,
    fatedRivalry1,
    fatedRivalry2,
    fatedRivalryProaction,
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
    coldEmbrace1,
    airDash1,
    reapTheWhirlwind1,
    secondWind1,
    fortify1,
    galvanize1,
    arcFlash1,
    arcFlash2,
    particleBeam1,
    particleBeam2,
    brandish1,
    flourish1,
    flourish2,
    ambrosia1,
  } = useUnitAbilityEffects();

  const newUnitStats = (player, index, row, column, unitClass) => {
    return {
      player: player,
      unitIndex: index,
      row: row,
      column: column,
      unitClass: unitClass,
      hp: 1,
      virtue: 1,
      afflictions: {},
      enhancements: {},
      boosts: {},
      temporary: {},
    };
  };

  const activatingTarget = () => {
    if (
      localGameState.activatingTarget.length > 0 &&
      localGameState.activatingTarget[
        localGameState.activatingTarget.length - 1
      ]
    ) {
      let unitInfo =
        localGameState.activatingTarget[
          localGameState.activatingTarget.length - 1
        ];

      let unit = localGameState[unitInfo.player].units[unitInfo.unitIndex];

      if (!unit) {
        return;
      }

      //host or spectator
      if (self !== "guest") {
        return {
          position: "absolute",
          zIndex: 101,
          top: 13 + 78 * unit.row,
          left: 13 + 78 * unit.column,
        };
      } else {
        //guest
        return {
          position: "absolute",
          zIndex: 101,
          top: 13 + 78 * (9 - unit.row),
          left: 13 + 78 * (4 - unit.column),
        };
      }
    }
  };

  const activatingUnit = () => {
    if (
      localGameState.activatingUnit.length > 0 &&
      localGameState.activatingUnit[localGameState.activatingUnit.length - 1]
    ) {
      let unitInfo =
        localGameState.activatingUnit[localGameState.activatingUnit.length - 1];

      let unit = localGameState[unitInfo.player].units[unitInfo.unitIndex];

      if (!unit) {
        return;
      }

      //host or spectator
      if (self !== "guest") {
        return {
          position: "absolute",
          zIndex: 101,
          top: 21 + 78 * unit.row,
          left: 21 + 78 * unit.column,
        };
      } else {
        //guest
        return {
          position: "absolute",
          zIndex: 101,
          top: 21 + 78 * (9 - unit.row),
          left: 21 + 78 * (4 - unit.column),
        };
      }
    }
  };

  const unitPosition = (unit) => {
    //host or spectator
    if (self !== "guest") {
      return {
        position: "absolute",
        zIndex: 100,
        top: 12 + 78 * unit.row,
        left: 12 + 78 * unit.column,
      };
    } else {
      //guest
      return {
        position: "absolute",
        zIndex: 100,
        top: 12 + 78 * (9 - unit.row),
        left: 12 + 78 * (4 - unit.column),
      };
    }
  };

  const unitButtonPosition = (unit) => {
    //host or spectator
    if (self !== "guest") {
      return [
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * unit.row - 17,
          left: 12 + 78 * unit.column - 17,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * unit.row - 17,
          left: 12 + 78 * unit.column + 54,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * unit.row + 54,
          left: 12 + 78 * unit.column + 54,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * unit.row + 54,
          left: 12 + 78 * unit.column - 17,
        },
      ];
    } else {
      //guest
      return [
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * (9 - unit.row) - 17,
          left: 12 + 78 * (4 - unit.column) - 17,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * (9 - unit.row) - 17,
          left: 12 + 78 * (4 - unit.column) + 54,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * (9 - unit.row) + 54,
          left: 12 + 78 * (4 - unit.column) + 54,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * (9 - unit.row) + 54,
          left: 12 + 78 * (4 - unit.column) - 17,
        },
      ];
    }
  };

  const handleUnitOptions = (option) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    switch (option) {
      case "Info":
        setUnitInfor(expandedUnit);

        // //for testing: quick movement
        // enterMoveMode(
        //   getZonesInRange(expandedUnit.row, expandedUnit.column, 1, false),
        //   expandedUnit,
        //   newGameState,
        //   null
        // );
        // //for testing: quick movement
        break;

      case "Tactic":
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Activating Tactic",
          unit: expandedUnit,
        });
        break;

      case "Ability":
        newGameState.currentResolution.push({
          resolution: "Selecting",
          resolution2: "Selecting Unit Ability",
          unit: expandedUnit,
        });
        break;

      case "Skill":
        newGameState.currentResolution.push({
          resolution: "Selecting",
          resolution2: "Selecting Scion Skill",
          unit: expandedUnit,
        });
        break;
    }

    dispatch(updateState(newGameState));
  };

  const updateFirebase = (newGameState) => {
    try {
      updateDoc(gameDoc, { gameState: newGameState });
    } catch (err) {
      console.log(err);
      console.log(newGameState);
    }
  };

  //====================================================================
  //====================================================================
  //UseEffects below
  useEffect(() => {
    if (props.userRole === "host") {
      dispatch(updateSelf("host"));
      dispatch(updateEnemy("guest"));
    } else if (props.userRole === "guest") {
      dispatch(updateSelf("guest"));
      dispatch(updateEnemy("host"));
    }
  }, []);

  useEffect(() => {
    // console.log("local gamestate changed");

    setValidZones([]);
    setTileMode(null);
    setSelectUnitReason(null);
    setSelectUnitSpecial(null);
    setMovingUnit(null);
    // setMovingSpecial(null);
    setTacticUsed(null);

    setExpandedUnit(null);
  }, [localGameState]);

  //Gets data regarding zones and units
  useEffect(() => {
    // console.log("Updated local from online");
    setZones(JSON.parse(props.gameState.zones));
    dispatch(updateState(props.gameState));
    setHideModal(false);
  }, [props.gameState]);

  //====================================================================
  //====================================================================
  //Current Resolution Prompt below

  //Current Resolution Prompt below

  const currentResolutionPrompt = () => {
    let lastResolution = { resolution: "" };

    if (localGameState.currentResolution.length > 0) {
      lastResolution =
        localGameState.currentResolution[
          localGameState.currentResolution.length - 1
        ];
    }

    switch (lastResolution.resolution) {
      case "Animation Delay":
        if (self === lastResolution.priority) {
          animationDelay();
        }
        break;

      case "Acquisition Phase Selection":
        return (
          <>
            {self === localGameState.turnPlayer && !hideModal && (
              <AcquisitionPhaseSelection
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Bounty Phase Selection":
        return (
          <>
            {self === localGameState.turnPlayer && !hideModal && (
              <BountyStore
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Coordination Phase Selection":
        return (
          <>
            {self === localGameState.turnPlayer && !hideModal && (
              <CoordinationPhaseSelection
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Defiance Phase Selection":
        return (
          <>
            {self === localGameState.turnPlayer && !hideModal && (
              <DefiancePhaseSelection
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Defiance Options":
        switch (lastResolution.resolution2) {
          case "Arcana":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectSkillHandMulti
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Destine":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <PowerAtTheFinalHourProaction
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    reason="Destine"
                    defianceCost={lastResolution.defianceCost}
                  />
                )}
              </>
            );

          case "Select Destine Pawn":
            if (self === lastResolution.player) {
              selectDestine(lastResolution.scionClass);
            }
            break;

          case "Curate Results":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <TacticResults3
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    reroll={lastResolution.reroll}
                  />
                )}
              </>
            );

          case "End Phase":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(endDefiancePhase2());
            }
            break;
        }
        break;

      case "Final Phase":
        switch (lastResolution.resolution2) {
          case "Avelhem Retention":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectAvelhemHandMulti
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Skill Hand Limit":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectSkillHandMulti
                    resonated={lastResolution.resonated}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Burn Decrement":
            if (self === lastResolution.player) {
              resolutionUpdate(decrementBurn());
            }
            break;

          case "Status Decrement":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(decrementStatus());
            }
            break;

          case "Scoring":
            if (self === lastResolution.player) {
              resolutionUpdate(applyScore());
            }
            break;
        }
        break;

      case "Deploying Pawn":
        if (self === localGameState.turnPlayer && tileMode !== "deploy") {
          setTileMode("deploy");
          setValidZones(lastResolution.zoneIds);
          setDeployClass("Pawn");
        }
        break;

      case "Deploying Scion":
        if (self === localGameState.turnPlayer && tileMode !== "deploy") {
          setTileMode("deploy");
          setValidZones(lastResolution.zoneIds);
          setDeployClass(lastResolution.scionClass);
        }
        break;

      case "Blocking Virtue-Blast":
        return (
          <>
            {self === lastResolution.unit.player && !hideModal && (
              <YouMayNoYes
                unit={lastResolution.unit}
                attacker={lastResolution.attacker}
                details={lastResolution.details}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Tactic End":
        if (self === lastResolution.unit.player) {
          tacticEnd(lastResolution.unit, lastResolution.effect);
        }
        break;

      case "Apply Burn":
        if (self === lastResolution.attacker.player) {
          resolveApplyBurn(lastResolution.attacker, lastResolution.victim);
        }
        break;

      case "Apply Damage":
        if (self === lastResolution.attacker.player) {
          resolveApplyDamage(
            lastResolution.attacker,
            lastResolution.victim,
            lastResolution.type,
            lastResolution.special
          );
        }
        break;

      case "Apply Frostbite":
        if (self === lastResolution.attacker.player) {
          resolveApplyFrostbite(
            lastResolution.attacker,
            lastResolution.victim,
            lastResolution.duration
          );
        }
        break;

      case "Apply Paralysis":
        if (self === lastResolution.attacker.player) {
          resolveApplyParalysis(
            lastResolution.attacker,
            lastResolution.victim,
            lastResolution.duration,
            lastResolution.special
          );
        }
        break;

      case "Choose Resonator":
        return (
          <>
            {self === lastResolution.player && (
              <SelectSkillResonator
                unit={lastResolution.unit}
                skill={lastResolution.skill}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Choose Resonator Avelhem":
        return (
          <>
            {self === lastResolution.player && (
              <SelectAvelhemResonator
                avelhem={lastResolution.avelhem}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Avelhem Resonance":
        if (self === lastResolution.unit.player) {
          resolutionUpdateGameStateOnly(
            avelhemResonance(lastResolution.unit, lastResolution.resonator)
          );
        }
        break;

      case "You May Shuffle Avelhem":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <YouMayNoYes
                details={lastResolution.details}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Avelhem Select Pawn":
        if (self === lastResolution.player) {
          selectAvelhemPawn(lastResolution.avelhem, lastResolution.resonator);
        }
        break;

      case "Search Avelhem":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <SearchAvelhem
                restriction={lastResolution.restriction}
                outcome={lastResolution.outcome}
                message={lastResolution.message}
                reveal={lastResolution.reveal}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Search Skill":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <SearchSkill
                restriction={lastResolution.restriction}
                outcome={lastResolution.outcome}
                message={lastResolution.message}
                reveal={lastResolution.reveal}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Recover Avelhem":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <RecoverAvelhem
                restriction={lastResolution.restriction}
                outcome={lastResolution.outcome}
                message={lastResolution.message}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Recover Skill":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <RecoverSkill
                restriction={lastResolution.restriction}
                outcome={lastResolution.outcome}
                message={lastResolution.message}
                canSkip={lastResolution.canSkip}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Discard Skill":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <SelectSkillDiscard
                updateFirebase={updateFirebase}
                unit={lastResolution.unit}
                player={lastResolution.player}
                message={lastResolution.message}
                fever={lastResolution.fever}
                restriction={lastResolution.restriction}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Revealing Skill":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <ViewRevealedSkill
                skill={lastResolution.skill}
                title={lastResolution.title}
                message={lastResolution.message}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Avelhem Conclusion":
        if (self === lastResolution.player) {
          avelhemConclusion(
            lastResolution.avelhem,
            lastResolution.conclusion,
            lastResolution.resonator,
            lastResolution.resonatorConclusion
          );
        }
        break;

      case "Skill Conclusion":
        if (self === lastResolution.player) {
          skillConclusion(
            lastResolution.player,
            lastResolution.unit,
            lastResolution.skill,
            lastResolution.conclusion
          );
        }
        break;

      case "Resonance Conclusion":
        if (self === lastResolution.player) {
          skillResonanceConclusion(
            lastResolution.player,
            lastResolution.unit,
            lastResolution.skill,
            lastResolution.skillConclusion,
            lastResolution.resonator,
            lastResolution.resonatorConclusion
          );
        }
        break;

      case "Selecting":
        switch (lastResolution.resolution2) {
          case "Selecting Unit":
            if (self === lastResolution.player && tileMode !== "selectUnit") {
              setTileMode("selectUnit");
              setValidZones(lastResolution.zoneIds);
              setMovingUnit(lastResolution.unit);
              setTacticUsed(lastResolution.tactic);
              setSelectUnitReason(lastResolution.reason);
              setSelectUnitSpecial(lastResolution.special);
            }
            break;

          case "Selecting Scion Skill":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <ScionSkillSelect
                    updateFirebase={updateFirebase}
                    unit={lastResolution.unit}
                  />
                )}
              </>
            );

          case "Selecting Unit Ability":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <SelectUnitAbility
                    updateFirebase={updateFirebase}
                    unit={lastResolution.unit}
                  />
                )}
              </>
            );
        }
        break;

      case "Misc.":
        switch (lastResolution.resolution2) {
          case "Moving Unit":
            if (self === localGameState.turnPlayer && tileMode !== "move") {
              setTileMode("move");
              setValidZones(lastResolution.zoneIds);
              setMovingUnit(lastResolution.unit);
              setTacticUsed(lastResolution.tactic);
            }
            break;

          case "Activating Tactic":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <TacticSelection
                    updateFirebase={updateFirebase}
                    unit={lastResolution.unit}
                    enterMoveMode={enterMoveMode}
                  />
                )}
              </>
            );

          case "Selecting Tactical Action":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectTacticalAction
                    unit={lastResolution.unit}
                    dice={lastResolution.dice}
                    face={lastResolution.face}
                    enterMoveMode={enterMoveMode}
                    updateFirebase={updateFirebase}
                  />
                )}
              </>
            );

          case "Selecting Tactical Action - Sovereign":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectSovereignTactic
                    dice={lastResolution.dice}
                    face={lastResolution.face}
                    updateFirebase={updateFirebase}
                  />
                )}
              </>
            );

          case "Advance Avelhem Draw":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayNoYes
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Advance Deploy Scion: Choose Element":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectElement
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Advance Deploy Scion: Float Skill":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayFloat1Skill
                    restriction={lastResolution.restriction}
                    title={lastResolution.title}
                    message={lastResolution.message}
                    reason={lastResolution.reason}
                    tactic={lastResolution.tactic}
                    scionClass={lastResolution.scionClass}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Appoint - Upgraded":
            if (self === lastResolution.unit.player) {
              resolutionUpdate(appointShield(lastResolution.unit));
            }
            break;

          case "Tactic Results":
            return (
              <>
                {!hideModal && (
                  <TacticResults
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    reroll={lastResolution.reroll}
                  />
                )}
              </>
            );

          case "Strike Movement":
            if (self === lastResolution.attacker.player) {
              resolutionUpdate(
                strikeMove(lastResolution.attacker, lastResolution.zone)
              );
            }
            break;

          case "Rooted Traverse":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    enterMoveMode={enterMoveMode}
                  />
                )}
              </>
            );

          case "Rooted Traverse Movement":
            if (self === lastResolution.unit.player) {
              enterMoveMode(
                getVacantAdjacentZones(lastResolution.unit),
                lastResolution.unit,
                null,
                lastResolution.tactic,
                true
              );
            }
            break;

          case "May float resonant skill unit":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                unitFloatSkill(
                  lastResolution.unit,
                  lastResolution.skill,
                  lastResolution.resonator
                )
              );
            }
            break;

          case "May float resonant skill":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <MayFloatResonantSkill
                    player={lastResolution.player}
                    skill={lastResolution.skill}
                    resonator={lastResolution.resonator}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Retain resonant skill unit":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      unitRetainSkill(
                        lastResolution.unit,
                        lastResolution.skill,
                        lastResolution.resonator
                      )
                    )}
                  </>
                )}
              </>
            );

          case "Retain resonant skill":
            if (self === lastResolution.player) {
              skillResonanceRetain(lastResolution.resonator);
            }
            break;

          case "Inspect Skill":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <InspectSkill
                    details={lastResolution.details}
                    hideOrRevealModale={hideOrRevealModale}
                    updateFirebase={updateFirebase}
                  />
                )}
              </>
            );

          case "Message To Player":
            return (
              <>
                {self === lastResolution.player && (
                  <MessageToPlayer
                    title={lastResolution.title}
                    message={lastResolution.message}
                    updateFirebase={updateFirebase}
                  />
                )}
              </>
            );

          case "Acquisition Phase: Cultivate":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMaySpend1Skill
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Battle Cry":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectSkillHandMulti
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );
        }
        break;

      case "Unit Ability":
        switch (lastResolution.resolution2) {
          case "Ability - select tactic":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <TacticSelectionViaEffect
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Afterburner":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(afterburner1(lastResolution.unit));
            }
            break;

          case "Afterburner1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(afterburner2(lastResolution.unit));
            }
            break;

          case "Activating Fiery Heart":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(fieryHeart1(lastResolution.unit));
            }
            break;

          case "Fiery Heart1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(fieryHeart2(lastResolution.unit));
            }
            break;

          case "Activating Hydrotherapy":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(hydrotherapy1(lastResolution.unit));
            }
            break;

          case "Activating Cold Embrace":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(coldEmbrace1(lastResolution.unit));
            }
            break;

          case "Cold Embrace1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Reap the Whirlwind":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                reapTheWhirlwind1(lastResolution.unit)
              );
            }
            break;

          case "Activating Air Dash":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(airDash1(lastResolution.unit));
            }
            break;

          case "Air Dash1":
            if (self === lastResolution.unit.player) {
              enterMoveModeViaSkill(
                getVacant2SpaceZones(lastResolution.unit),
                lastResolution.unit
              );
              setMovingSpecial("AirDash");
            }
            break;

          case "Reap the Whirlwind1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Reap the Whirlwind2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterMoveMode={enterMoveMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Fortify":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(fortify1(lastResolution.unit));
            }
            break;

          case "Fortify1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayFloat1Skill
                    unit={lastResolution.unit}
                    restriction={lastResolution.restriction}
                    title={lastResolution.title}
                    message={lastResolution.message}
                    reason={lastResolution.reason}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Fortify2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterMoveMode={enterMoveMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Galvanize":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(galvanize1(lastResolution.unit));
            }
            break;

          case "Galvanize1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    enterMoveMode={enterMoveMode}
                  />
                )}
              </>
            );

          case "Activating Arc Flash":
            if (self === lastResolution.unit.player) {
              resolutionUpdate(arcFlash1(lastResolution.unit));
            }
            break;

          case "Arc Flash1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    enterMoveMode={enterMoveMode}
                  />
                )}
              </>
            );

          case "Arc Flash2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(arcFlash2(lastResolution.unit));
            }
            break;

          case "Arc Flash3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterMoveMode={enterMoveMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Particle Beam":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(particleBeam1(lastResolution.unit));
            }
            break;

          case "Particle Beam1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(particleBeam2(lastResolution.unit));
            }
            break;

          case "Activating Brandish":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(brandish1(lastResolution.unit));
            }
            break;

          case "Brandish1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Flourish":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(flourish1(lastResolution.unit));
            }
            break;

          case "Flourish1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(flourish2(lastResolution.unit));
            }
            break;

          case "Activating Ambrosia":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(ambrosia1(lastResolution.unit));
            }
            break;

          //end of abilities
        }
        break;

      case "Unit Talent":
        switch (lastResolution.resolution2) {
          case "Activating Flash Fire":
          case "Activating Kleptothermy":
          case "Activating Mountain Stance":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterMoveMode={enterMoveMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Lightning Rod":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Ambiance Assimilation":
          case "Activating Conduction":
          case "Activating Everblooming":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Second Wind":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(secondWind1());
            }
            break;

          case "Triggering Adamant Armor":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Talent Conclusion":
            if (self === lastResolution.unit.player) {
              talentConclusion();
            }
            break;
        }
        break;

      case "Fire Skill":
        switch (lastResolution.resolution2) {
          case "Activating Ignition Propulsion":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                ignitionPropulsion1(lastResolution.unit)
              );
            }
            break;

          case "Ignition Propulsion1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterMoveMode={enterMoveMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Conflagration":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                conflagration1(lastResolution.unit)
              );
            }
            break;

          case "Conflagration1":
            if (self === lastResolution.unit.player) {
              selectEnemies(
                lastResolution.unit,
                1,
                null,
                "blast",
                "Fire Scion"
              );
            }
            break;

          case "Resonating Conflagration":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                conflagrationR1(lastResolution.unit, lastResolution.resonator)
              );
            }
            break;

          case "ConflagrationR1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                conflagrationR2(lastResolution.unit)
              );
            }
            break;

          case "ConflagrationR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Blaze of Glory":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(blazeOfGlory1(lastResolution.unit));
            }
            break;

          case "Blaze of Glory1":
            if (self === lastResolution.unit.player) {
              selectEnemies(lastResolution.unit, 1, null, "ignite", null);
            }
            break;

          case "Blaze of Glory2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(blazeOfGlory2(lastResolution.unit));
            }
            break;

          case "Blaze of Glory3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Resplendence":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(resplendence1(lastResolution.unit));
            }
            break;

          case "Resplendence1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resplendence2":
            if (self === lastResolution.unit.player) {
              selectEnemies(lastResolution.unit, 1, null, "ignite", null);
            }
            break;
        }
        break;

      case "Water Skill":
        switch (lastResolution.resolution2) {
          case "Activating Purification":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(purification1(lastResolution.unit));
            }
            break;

          case "Purification1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Purification1.5":
            if (self === lastResolution.unit.player) {
              selectAllies(lastResolution.unit, 2, false, "purification", null);
            }
            break;

          case "Purification2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          // case "Purification2":
          //   return (
          //     <>
          //       {self === lastResolution.unit.player && !hideModal && (
          //         <SelectCustomChoice
          //           unit={lastResolution.unit}
          //           details={lastResolution.details}
          //           updateFirebase={updateFirebase}
          //           hideOrRevealModale={hideOrRevealModale}
          //         />
          //       )}
          //     </>
          //   );

          case "Activating Frigid Breath":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(frigidBreath1(lastResolution.unit));
            }
            break;

          case "Frigid Breath1":
            if (self === lastResolution.unit.player) {
              selectEnemies(lastResolution.unit, 2, null, "freeze1", null);
            }
            break;

          case "Frigid Breath2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(frigidBreath2(lastResolution.unit));
            }
            break;

          case "Frigid Breath3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayFloat1Skill
                    unit={lastResolution.unit}
                    restriction={lastResolution.restriction}
                    title={lastResolution.title}
                    message={lastResolution.message}
                    reason={lastResolution.reason}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Frigid Breath4":
            if (self === lastResolution.unit.player) {
              selectEnemies(lastResolution.unit, 1, null, "freeze2", null);
            }
            break;

          case "Resonating Frigid Breath":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                frigidBreathR1(lastResolution.unit, lastResolution.resonator)
              );
            }
            break;

          case "Frigid BreathR1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                frigidBreathR2(lastResolution.unit)
              );
            }
            break;

          case "Frigid BreathR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Frigid BreathR3":
            if (self === lastResolution.unit.player) {
              selectEnemiesAfflicted(
                lastResolution.unit,
                1,
                null,
                "blast",
                null,
                "frostbite"
              );
            }
            break;

          case "Select Healing Rain Activator":
            if (self === lastResolution.player) {
              selectHealingRainActivator(lastResolution.victim);
            }
            break;

          case "Activating Healing Rain":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                healingRain1(lastResolution.unit, lastResolution.victim)
              );
            }
            break;

          case "Activating Glacial Torrent":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                glacialTorrent1(lastResolution.unit)
              );
            }
            break;

          case "Glacial Torrent 1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <GlacialTorrent1
                    unit={lastResolution.unit}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );
        }
        break;

      case "Wind Skill":
        switch (lastResolution.resolution2) {
          case "Activating Aerial Impetus":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                aerialImpetus1(lastResolution.unit)
              );
            }
            break;

          case "Aerial Impetus1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Aerial Impetus Prompt":
            if (self === lastResolution.unit.player) {
              selectAerialImpetusMove(lastResolution.unit, "Ally");
            }
            break;

          case "Aerial Impetus Purge":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                aerialImpetus2E(lastResolution.victim)
              );
            }
            break;

          case "Aerial Impetus Purge Move":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    player={lastResolution.player}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Aerial Impetus Purge Move2":
            if (self === lastResolution.player) {
              selectAerialImpetusMove(lastResolution.victim, "Enemy");
            }
            break;

          case "Activating Gale Conjuration":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                galeConjuration1(lastResolution.unit)
              );
            }
            break;

          case "Gale Conjuration1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayFloat1Skill
                    unit={lastResolution.unit}
                    restriction={lastResolution.restriction}
                    title={lastResolution.title}
                    message={lastResolution.message}
                    reason={lastResolution.reason}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resonating Gale Conjuration":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                galeConjurationR1(lastResolution.unit, lastResolution.resonator)
              );
            }
            break;

          case "Gale ConjurationR1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                galeConjurationR2(lastResolution.unit)
              );
            }
            break;

          case "Gale ConjurationR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Gale ConjurationR3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    attacker={lastResolution.attacker}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Symphonic Screech":
            if (self === lastResolution.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(
                symphonicScreech1(lastResolution.unit, lastResolution.victim)
              );
            }
            break;

          case "Symphonic Screech Float":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Symphonic Screech2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Cataclysmic Tempest":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                cataclysmicTempest1(lastResolution.unit)
              );
            }
            break;

          case "Cataclysmic Tempest1":
            if (self === lastResolution.unit.player) {
              selectEnemies(
                lastResolution.unit,
                1,
                null,
                "paralyze1",
                "Cataclysmic Tempest"
              );
            }
            break;

          case "Cataclysmic Tempest2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                cataclysmicTempest2(lastResolution.unit)
              );
            }
            break;

          case "Cataclysmic Tempest3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Cataclysmic Tempest4":
            if (self === lastResolution.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(cataclysmicTempest3(lastResolution.unit));
            }
            break;

          case "Cataclysmic Tempest Float":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <CataclysmicTempestFloat
                    floatCount={lastResolution.floatCount}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Cataclysmic Tempest5":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                cataclysmicTempest4(lastResolution.unit)
              );
            }
            break;

          case "Cataclysmic Tempest6":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Cataclysmic Tempest6.5":
            if (self === lastResolution.unit.player) {
              // selectEnemiesAfflicted(lastResolution.unit, 1, null, "paralyze1", null);

              selectEnemiesAfflicted(
                lastResolution.unit,
                1,
                null,
                "blast",
                null,
                "paralysis"
              );
            }
            break;

          // case "Cataclysmic Tempest6":
          //   return (
          //     <>
          //       {self === lastResolution.unit.player && !hideModal && (
          //         <YouMayNoYes
          //           unit={lastResolution.unit}
          //           details={lastResolution.details}
          //           updateFirebase={updateFirebase}
          //           hideOrRevealModale={hideOrRevealModale}
          //         />
          //       )}
          //     </>
          //   );
        }
        break;

      case "Land Skill":
        switch (lastResolution.resolution2) {
          case "Activating Crystallization":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                crystallization1(lastResolution.unit)
              );
            }
            break;

          case "Crystallization1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Crystallization2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                crystallization2(lastResolution.unit)
              );
            }
            break;

          case "Activating Upheaval":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                upheaval1(lastResolution.unit, lastResolution.victim)
              );
            }
            break;

          case "Upheaval1":
            if (self === lastResolution.unit.player) {
              selectEnemies(
                lastResolution.unit,
                1,
                null,
                "paralyze1",
                "Upheaval"
              );
            }
            break;

          case "Upheaval2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(upheaval2(lastResolution.unit));
            }
            break;

          case "Upheaval3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resonating Upheaval":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                upheavalR1(lastResolution.unit, lastResolution.resonator)
              );
            }
            break;

          case "UpheavalR1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(upheavalR2(lastResolution.unit));
            }
            break;

          case "UpheavalR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "UpheavalR3":
            if (self === lastResolution.unit.player) {
              enterMoveModeViaSkill(
                getVacantAdjacentZones(lastResolution.unit),
                lastResolution.unit
              );
            }
            break;

          case "Select Pitfall Trap Activator":
            if (self === lastResolution.player) {
              selectPitfallTrapActivator(lastResolution.mover);
            }
            break;

          case "Activating Pitfall Trap":
            if (self === lastResolution.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(
                pitfallTrap1(lastResolution.unit, lastResolution.victim)
              );
            }
            break;

          case "Pitfall Trap1":
            if (self === lastResolution.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(
                pitfallTrap2(lastResolution.unit, lastResolution.victim)
              );
            }
            break;

          case "Pitfall Trap2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    victim={lastResolution.victim}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Pitfall Trap3":
            if (self === lastResolution.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(
                pitfallTrap3(lastResolution.unit, lastResolution.victim)
              );
            }
            break;

          case "Activating Geomancy":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(geomancy1(lastResolution.unit));
            }
            break;

          case "Geomancy1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Geomancy2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Geomancy3":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(geomancy2(lastResolution.unit));
            }
            break;

          case "Geomancy4":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );
        }
        break;

      case "Lightning Skill":
        switch (lastResolution.resolution2) {
          case "Activating Chain Lightning":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                chainLightning1(lastResolution.unit)
              );
            }
            break;

          case "Chain Lightning1":
            if (self === lastResolution.unit.player) {
              selectEnemies(
                lastResolution.unit,
                1,
                null,
                "paralyze1",
                "ChainLightningParalysis"
              );
            }
            break;

          case "Chain Lightning2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                chainLightning2(lastResolution.unit)
              );
            }
            break;

          case "Chain Lightning3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Chain Lightning4":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                chainLightning3(
                  lastResolution.unit,
                  lastResolution.adjacentEnemies
                )
              );
            }
            break;

          case "Chain Lightning5":
            if (self === lastResolution.unit.player) {
              selectChainLightningBlast(
                lastResolution.unit,
                lastResolution.adjacentEnemies
              );
            }
            break;

          case "Activating Zip and Zap":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(zipAndZap1(lastResolution.unit));
            }
            break;

          case "Zip And Zap1":
            if (self === lastResolution.unit.player) {
              enterMoveModeViaSkill(
                getVacantAdjacentZones(lastResolution.unit),
                lastResolution.unit
              );
            }
            break;

          case "Zip And Zap2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(zipAndZap2(lastResolution.unit));
            }
            break;

          case "Zip And Zap3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resonating Zip And Zap":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                zipAndZapR1(lastResolution.unit, lastResolution.resonator)
              );
            }
            break;

          case "Zip And ZapR1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(zipAndZapR2(lastResolution.unit));
            }
            break;

          case "Zip And ZapR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Thunder Thaumaturge":
            if (self === lastResolution.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(
                thunderThaumaturge1(
                  lastResolution.unit,
                  lastResolution.attacker
                )
              );
            }
            break;

          case "Thunder Thaumaturge1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                thunderThaumaturge2(lastResolution.unit)
              );
            }
            break;

          case "Thunder Thaumaturge2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Valiant Spark":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(valiantSpark1(lastResolution.unit));
            }
            break;

          case "Valiant Spark1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );
        }
        break;

      case "Mana Skill":
        switch (lastResolution.resolution2) {
          case "Activating Surge":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(surge1(lastResolution.unit));
            }
            break;

          case "Surge1":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <TacticSelectionViaEffect
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Surge2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterMoveMode={enterMoveMode}
                    setMovingSpecial={setMovingSpecial}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Surge3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterMoveMode={enterMoveMode}
                    setMovingSpecial={setMovingSpecial}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Diffusion":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(diffusion1(lastResolution.unit));
            }
            break;

          case "Diffusion1":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <TacticSelectionViaEffect
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Diffusion2":
            if (self === lastResolution.unit.player) {
              selectEnemies(lastResolution.unit, 1, null, "blast", "Diffusion");
            }
            break;

          case "Diffusion3":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(diffusion2(lastResolution.unit));
            }
            break;

          case "Diffusion4":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resonating Diffusion":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                diffusionR1(lastResolution.unit, lastResolution.resonator)
              );
            }
            break;

          case "DiffusionR1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(diffusionR2(lastResolution.unit));
            }
            break;

          case "DiffusionR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "DiffusionR3":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(diffusionR3(lastResolution.unit));
            }
            break;

          case "Select Aegis Activator":
            if (self === lastResolution.player) {
              selectAegisActivator(lastResolution.victim);
            }
            break;

          case "Activating Aegis":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                aegis1(lastResolution.unit, lastResolution.victim)
              );
            }
            break;

          case "Aegis1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    victim={lastResolution.victim}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Disruption Field":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                disruptionField1(lastResolution.unit)
              );
            }
            break;
        }
        break;

      case "Metal Skill":
        switch (lastResolution.resolution2) {
          case "Activating Magnetic Shockwave":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                magneticShockwave1(lastResolution.unit)
              );
            }
            break;

          case "Magnetic Shockwave1":
            if (self === lastResolution.unit.player) {
              selectEnemies(
                lastResolution.unit,
                1,
                null,
                "paralyze1",
                "MagneticShockwave1stParalysis"
              );
            }
            break;

          case "Magnetic Shockwave2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                magneticShockwave2(lastResolution.unit)
              );
            }
            break;

          case "Magnetic Shockwave2.1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Magnetic Shockwave3":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                magneticShockwave3(lastResolution.unit)
              );
            }
            break;

          case "Magnetic Shockwave3.1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Reinforce":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(reinforce1(lastResolution.unit));
            }
            break;

          case "Reinforce1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resonating Reinforce":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                reinforceR1(lastResolution.unit, lastResolution.resonator)
              );
            }
            break;

          case "ReinforceR1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(reinforceR2(lastResolution.unit));
            }
            break;

          case "Select Frenzy Blade Activator":
            if (self === lastResolution.player) {
              selectFrenzyBladeActivator(lastResolution.victim);
            }
            break;

          case "Activating Frenzy Blade":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                frenzyBlade1(lastResolution.unit, lastResolution.victim)
              );
            }
            break;

          case "Frenzy Blade1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Frenzy Blade1.5":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(frenzyBlade2(lastResolution.unit));
            }
            break;

          case "Frenzy Blade2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Arsenal Onslaught":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                arsenalOnslaught1(lastResolution.unit)
              );
            }
            break;

          case "Arsenal Onslaught1":
            if (self === lastResolution.unit.player) {
              selectEnemies(lastResolution.unit, 1, null, "strike", null);
            }
            break;

          case "Arsenal Onslaught1.1":
            if (self === lastResolution.unit.player) {
              selectEnemies(lastResolution.unit, 1, null, "blast", null);
            }
            break;

          case "Arsenal Onslaught2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                arsenalOnslaught2(lastResolution.unit)
              );
            }
            break;

          case "Arsenal Onslaught3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Arsenal Onslaught3.5":
            if (self === lastResolution.unit.player) {
              selectEnemies(lastResolution.unit, 1, null, "paralyze1", null);
            }
            break;

          case "Arsenal Onslaught4":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                arsenalOnslaught3(lastResolution.unit)
              );
            }
            break;

          case "Arsenal Onslaught5":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Arsenal Onslaught6":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );
        }
        break;

      case "Plant Skill":
        switch (lastResolution.resolution2) {
          case "Activating Sow And Reap":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(sowAndReap1(lastResolution.unit));
            }
            break;

          case "Sow and Reap1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Sow and Reap Blast":
            if (self === lastResolution.unit.player) {
              selectEnemiesRooted(
                lastResolution.unit,
                1,
                null,
                "blast",
                "sowAndReapBlast"
              );
            }
            break;

          case "Select Sow and Reap Striker":
            if (self === lastResolution.unit.player) {
              selectSowAndReapStriker(lastResolution.unit);
            }
            break;

          case "Sow and Reap Strike":
            if (self === lastResolution.unit.player) {
              selectEnemiesRooted(lastResolution.unit, 1, null, "strike", null);
            }
            break;

          case "Sow and Reap2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(sowAndReap2(lastResolution.unit));
            }
            break;

          case "Activating Efflorescence":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                efflorescence1(lastResolution.unit)
              );
            }
            break;

          case "Efflorescence1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resonating Efflorescence":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                efflorescenceR1(lastResolution.unit, lastResolution.resonator)
              );
            }
            break;

          case "EfflorescenceR1":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                efflorescenceR2(lastResolution.unit)
              );
            }
            break;

          case "Select Viridian Grave Activator":
            if (self === lastResolution.player) {
              selectViridianGraveActivator(lastResolution.victim);
            }
            break;

          case "Activating Viridian Grave":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                viridianGrave1(lastResolution.unit, lastResolution.victim)
              );
            }
            break;

          case "Viridian Grave1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Castle of Thorns":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                castleOfThorns1(lastResolution.unit)
              );
            }
            break;

          case "Castle Of Thorns1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );
        }
        break;

      case "Sovereign Standard Skill":
        switch (lastResolution.resolution2) {
          case "Activating Heir’s Endeavor":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(heirsEndeavor1());
            }
            break;

          case "Activating Tea for Two":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(teaForTwo1());
            }
            break;

          case "Tea for Two1":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectCustomChoice
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Tea for Two2":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectSkillFloat
                    title="Tea for Two"
                    message={lastResolution.message}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Dark Halo":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(darkHalo1());
            }
            break;

          case "Select Dark Halo":
            if (self === lastResolution.player) {
              selectDarkHalo();
            }
            break;

          case "Activating Reminiscence":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(reminiscence1());
            }
            break;

          case "Reminiscence1":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectCustomChoice
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Reminiscence2":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <TacticSelectionViaEffect
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Foreshadow":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(foreshadow1());
            }
            break;

          case "Foreshadow1":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectCustomChoice
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Foreshadow2":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                foreshadow2(lastResolution.discardedBurst)
              );
            }
            break;

          case "Foreshadow Draw":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayNoYes
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Foreshadow3":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(foreshadow3());
            }
            break;
        }
        break;

      case "Sovereign Resonant Skill":
        switch (lastResolution.resolution2) {
          case "Activating Transmute":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                transmute1(lastResolution.resonator)
              );
            }
            break;

          case "Transmute1":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectSkillHandMulti
                    resonated={lastResolution.resonated}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "TransmuteR1":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                transmuteR1(lastResolution.skillsToShuffle)
              );
            }
            break;

          case "Activating Ambidexterity":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                ambidexterity1(lastResolution.resonator)
              );
            }
            break;

          case "Select Ambidexterity":
            if (self === lastResolution.player) {
              selectAmbidexterity(lastResolution.resonated);
            }
            break;

          case "Ambidexterity2":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayNoYes
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Ambidexterity Conversion":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <TacticSelectionViaEffect
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "AmbidexterityR1":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                ambidexterityR1(lastResolution.unit)
              );
            }
            break;

          case "Activating Providence":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                providence1(lastResolution.resonator)
              );
            }
            break;

          case "Providence1":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <TacticSelectionViaEffect
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Providence2":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                providence2(lastResolution.resonator)
              );
            }
            break;

          case "Providence Recovery":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayNoYes
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "ProvidenceR1":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                providenceR1(lastResolution.resonator)
              );
            }
            break;

          case "Activating Fervent Prayer":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                ferventPrayer1(lastResolution.resonator)
              );
            }
            break;

          case "Fervent Prayer1":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayNoYes
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Fervent Prayer2":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectAvelhemHandMulti
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Fervent PrayerR1":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(ferventPrayerR1());
            }
            break;

          case "Fervent PrayerR2":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <FerventPrayerResonance
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Fervent Prayer Reveal":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <ViewRevealedSkill
                    avelhems={lastResolution.avelhems}
                    multi={true}
                    message={lastResolution.message}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Press the Attack":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                pressTheAttack1(lastResolution.resonator)
              );
            }
            break;

          case "Press the Attack1":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayNoYes
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Press the Attack2":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayNoYes
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Heirs Endeavor Resonance":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(heirsEndeavorResonance());
            }
            break;
        }
        break;

      case "Sovereign Contingent Skill":
        switch (lastResolution.resolution2) {
          case "Activating Power at the Final Hour":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                powerAtTheFinalHour1(lastResolution.unit)
              );
            }
            break;

          case "Power at the Final Hour":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectElement
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Power at the Final Hour2":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                powerAtTheFinalHour2(lastResolution.unit)
              );
            }
            break;

          case "Activating Power at the Final Hour: Proaction":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(powerAtTheFinalHourProaction());
            }
            break;

          case "Power at the Final Hour: Proaction":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <PowerAtTheFinalHourProaction
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    reason={"Power at the Final Hour"}
                  />
                )}
              </>
            );

          case "Select Power at the Final Hour Pawn":
            if (self === lastResolution.player) {
              selectPowerAtTheFinalHour(lastResolution.scionClass);
            }
            break;

          case "Activating Fated Rivalry":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(fatedRivalry1(lastResolution.unit));
            }
            break;

          case "Select Fated Rivalry":
            if (self === lastResolution.player) {
              selectFatedRivalry(lastResolution.unit);
            }
            break;

          case "Fated Rivalry2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                fatedRivalry2(lastResolution.unit, lastResolution.enemy)
              );
            }
            break;

          case "Activating Fated Rivalry: Proaction":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(fatedRivalryProaction());
            }
            break;

          case "Select Fated Rivalry Proaction":
            if (self === lastResolution.player) {
              selectFatedRivalryProaction();
            }
            break;

          case "Fated Rivalry Proaction2":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectElement
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Match Made In Heaven":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                matchMadeInHeaven1(lastResolution.unit)
              );
            }
            break;

          case "Select Match Made in Heaven Pawn":
            if (self === lastResolution.unit.player) {
              selectMatchMadeInHeavenPawn(lastResolution.unit);
            }
            break;

          case "Match Made in Heaven2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                matchMadeInHeaven2(lastResolution.unit, lastResolution.unit2)
              );
            }
            break;

          case "Match Made in Heaven3":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(matchMadeInHeaven3());
            }
            break;

          case "Match Made in Heaven4":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Vengeful Legacy":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(
                vengefulLegacy1(lastResolution.victim)
              );
            }
            break;

          case "Select Vengeful Legacy":
            if (self === lastResolution.player) {
              selectVengefulLegacy(lastResolution.victim);
            }
            break;

          case "Vengeful Legacy2":
            if (self === lastResolution.unit.player) {
              resolutionUpdateGameStateOnly(
                vengefulLegacy2(lastResolution.unit)
              );
            }
            break;

          case "Vengeful Legacy Ravager":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayFloat1Skill
                    unit={lastResolution.unit}
                    restriction={lastResolution.restriction}
                    title={lastResolution.title}
                    message={lastResolution.message}
                    reason={lastResolution.reason}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Black Business Card":
            if (self === lastResolution.player) {
              resolutionUpdateGameStateOnly(blackBusinessCard1());
            }
            break;
        }

        break;

      case "Triggering Contingent Skill":
        switch (lastResolution.resolution2) {
          case "Triggering Elimination Ally":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <ContingentElimination
                    player={lastResolution.player}
                    unit={lastResolution.unit}
                    team="ally"
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Ascension Ally":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <ContingentAscension
                    player={lastResolution.player}
                    unit={lastResolution.unit}
                    team="ally"
                    scionClass={lastResolution.scionClass}
                    method={lastResolution.method}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Ascension Enemy":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <ContingentAscension
                    player={lastResolution.player}
                    unit={lastResolution.unit}
                    team="enemy"
                    scionClass={lastResolution.scionClass}
                    method={lastResolution.method}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Elimination Enemy":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <ContingentElimination
                    player={lastResolution.player}
                    unit={lastResolution.unit}
                    team="enemy"
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Motion":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <ContingentMotion
                    mover={lastResolution.mover}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Survival Ally":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <ContingentSurvivalAlly
                    attacker={lastResolution.attacker}
                    victim={lastResolution.victim}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Survival Enemy":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <ContingentSurvivalEnemy
                    attacker={lastResolution.attacker}
                    victim={lastResolution.victim}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Target":
            return (
              <>
                {self === lastResolution.victim.player && !hideModal && (
                  <ContingentTarget
                    updateFirebase={updateFirebase}
                    attacker={lastResolution.attacker}
                    victim={lastResolution.victim}
                    type={lastResolution.type}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );
        }
        break;

      case "Triggering Screech":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <ContingentSymphonicScreech
                updateFirebase={updateFirebase}
                activator={lastResolution.activator}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Mana Restructure":
        return (
          <>
            {self === lastResolution.unit.player && !hideModal && (
              <YouMayNoYes
                unit={lastResolution.unit}
                details={lastResolution.details}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Game Over":
        return (
          <>
            {!hideModal && (
              <VictoryScreen
                player={lastResolution.player}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Continue Game":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <YouMayNoYes
                details={lastResolution.details}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      default:
        return;
    }
  };

  //====================================================================
  //====================================================================
  //Helper functions below

  const animationDelay = () => {
    setTimeout(() => {
      const newGameState = JSON.parse(JSON.stringify(localGameState));

      newGameState.currentResolution.pop();

      dispatch(updateState(newGameState));

      // updateFirebase(newGameState);
    }, 1750);
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
      } else if (conclusion === "shuffle") {
        //insert avelhem into repertoire
        newGameState[self].avelhemRepertoire.unshift(avelhem);

        //shuffle repertoire, but retain floating order
        const floaters = newGameState[self].avelhemRepertoire.splice(
          newGameState[self].avelhemRepertoire.length -
            newGameState[self].avelhemFloat,
          newGameState[self].avelhemFloat
        );

        newGameState[self].avelhemRepertoire = shuffleCards(
          newGameState[self].avelhemRepertoire
        );

        newGameState[self].avelhemRepertoire = [
          ...newGameState[self].avelhemRepertoire,
          ...floaters,
        ];
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

      updateFirebase(newGameState);
    }, 1000);
  };

  const cancelDeploy = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    const dice =
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .dice;

    if ([0, 1].includes(dice)) {
      newGameState.tactics[dice].stock += 1;
    }

    newGameState.currentResolution.pop();

    if (
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution2 === "Advance Avelhem Draw"
    ) {
      newGameState.currentResolution.pop();
    }

    dispatch(updateState(newGameState));

    setValidZones([]);
    setTileMode(null);

    console.log("newGameState.currentResolution");
    console.log(newGameState.currentResolution);
  };

  const deployUnit = (r, c, unitClass) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    const deployingPawn =
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution === "Deploying Pawn";

    console.log("deployingPawn");
    console.log(deployingPawn);

    //end "Deploying Pawn / Scion"
    newGameState.currentResolution.pop();

    let newIndex = newGameState[self].units.indexOf(null);
    if (newIndex === -1) {
      newIndex = newGameState[self].units.length;
    }

    //creating unit
    newGameState[self].units[newIndex] = newUnitStats(
      self,
      newIndex,
      r,
      c,
      unitClass
    );

    let newUnit = newGameState[self].units[newIndex];

    //updating zones info
    let newZoneInfo = [...zones];
    newZoneInfo[r][c].player = self;
    newZoneInfo[r][c].unitIndex = newIndex;
    newGameState.zones = JSON.stringify(newZoneInfo);

    console.log("deployingPawn");
    console.log(deployingPawn);

    if (deployingPawn) {
      newGameState.currentResolution.pop();
    }

    if (localGameState.turnPhase === "Acquisition") {
      newGameState.turnPhase = "Bounty";
      // newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Bounty Phase Selection",
      });

      if (newGameState[self].bountyUpgrades.acquisition >= 1) {
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Appoint - Upgraded",
          unit: newUnit,
        });
      }
    }

    //Trigger Motion Contingency
    if (newGameState[enemy].skillHand.length > 0 && triggerMotion(newUnit)) {
      newGameState.currentResolution.push({
        resolution: "Triggering Contingent Skill",
        resolution2: "Triggering Motion",
        mover: newUnit,
        player: enemy,
      });
    }

    uponDebutTalents(newGameState, newUnit);

    dispatch(updateState(newGameState));
    setValidZones([]);
    setTileMode(null);

    updateFirebase(newGameState);
  };

  const endExecutionPhase = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.turnPhase = "Final";
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
        //unit.boosts = {}; only clear temporary
        enemyUnits[u] = unit;
      }
    }
    newGameState[enemy].units = enemyUnits;

    //2. Selectively discard skills in excess of your hand limit (8 + ???).
    if (newGameState[self].skillHand.length > 8) {
      newGameState.currentResolution.push({
        resolution: "Final Phase",
        resolution2: "Skill Hand Limit",
        player: self,
        details: {
          reason: "Skill Hand Limit",
          title: "Final Phase",
          message: `Discard ${newGameState[self].skillHand.length - 8} skills.`,
          count: newGameState[self].skillHand.length - 8,
        },
      });
    }

    //1. Discard all Avelhems from your hand.
    //However, you can retain 1 if purchased the Avelhem upgrade.
    if (
      newGameState[self].avelhemHand.length > 0 &&
      newGameState[self].bountyUpgrades.avelhem > 0
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

    dispatch(updateState(newGameState));
    updateFirebase(newGameState);
  };

  const enterMoveMode = (zoneIds, unit, gameState, tactic, pop) => {
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
    });

    dispatch(updateState(newGameState));

    // updateFirebase(newGameState);
  };

  const enterMoveModeViaSkill = (zoneIds, unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    enterMoveMode(zoneIds, unit, newGameState, null);

    dispatch(updateState(newGameState));

    // updateFirebase(newGameState);
  };

  const hideOrRevealModale = () => {
    setHideModal(!hideModal);
    setExpandedUnit(null);
  };

  const isYourTurn = () => {
    if (localGameState.currentResolution.length > 0) {
      const lastResolution =
        localGameState.currentResolution[
          localGameState.currentResolution.length - 1
        ];

      if (lastResolution.resolution2 === "Triggering Target") {
        return lastResolution.victim.player === self;
      }

      if (lastResolution.player) {
        return lastResolution.player === self;
      }

      if (lastResolution.unit) {
        return lastResolution.unit.player === self;
      }

      if (lastResolution.attacker) {
        return lastResolution.attacker.player === self;
      }

      return localGameState.turnPlayer === self;
    }
  };

  const moveUnit = (unit, zoneId, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState = move(newGameState, unit, zoneId, special);

    if (tacticUsed !== null) {
      newGameState.tactics[tacticUsed].stock--;

      if (tacticUsed === 0) {
        newGameState[unit.player].units[
          unit.unitIndex
        ].temporary.used0thTactic = true;
      } else if (tacticUsed === 1) {
        newGameState[unit.player].units[
          unit.unitIndex
        ].temporary.used1stTactic = true;
      }
    }

    setValidZones([]);
    setTileMode(null);
    setMovingUnit(null);
    setTacticUsed(null);

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const resolutionUpdate = (gameState) => {
    dispatch(updateState(gameState));
    updateFirebase(gameState);
  };

  const resolutionUpdateGameStateOnly = (gameState) => {
    dispatch(updateState(gameState));
  };

  const resolveApplyBurn = (attackerInfo, victimInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    const attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (attacker !== null && !isMuted(attacker)) {
      newGameState = applyBurn(newGameState, victimInfo, attackerInfo);
    }

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const resolveApplyDamage = (attackerInfo, victimInfo, type, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    const attacker =
      newGameState[attackerInfo.player].units[attackerInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (attacker !== null && !isMuted(attacker)) {
      newGameState = applyDamage(
        newGameState,
        attackerInfo,
        victimInfo,
        type,
        special
      );
    }

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
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
    updateFirebase(newGameState);
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
    updateFirebase(newGameState);
  };

  const selectAerialImpetusMove = (unit, ally) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Aerial Impetus Prompt" or "Aerial Impetus Purge Move2"
    newGameState.currentResolution.pop();

    enterMoveMode(getVacantAdjacentZones(unit), unit, newGameState, null);

    if (ally === "Ally") {
      setMovingSpecial("AerialImpetusAlly");
    }
  };

  const selectUnit = (unit, selectedUnit, reason, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (tacticUsed !== null) {
      newGameState.tactics[tacticUsed].stock--;
    }

    //end ""Selecting Unit"
    newGameState.currentResolution.pop();

    switch (reason) {
      case "activate avelhem":
        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          avelhemToScion(special),
          "Avelhem",
          unit // repurposed to use as parameter for resonator
        );
        break;

      case "virtue-blast":
        newGameState = virtueBlast(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit
        );
        break;

      case "blast":
        newGameState = blast(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "strike":
        newGameState = strike(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "ignite":
        newGameState = ignite(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "burn damage":
        newGameState = applyBurnDamage(newGameState, selectedUnit);

        break;

      case "paralyze1":
        newGameState = paralyze1(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "paralyze2":
        newGameState = paralyze2(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "freeze1":
        newGameState = freeze1(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "freeze2":
        newGameState = freeze2(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "fiery heart":
        let fieryHeartAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        delete fieryHeartAlly.afflictions.burn;
        delete fieryHeartAlly.afflictions.frostbite;

        newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
          fieryHeartAlly;

        break;

      case "purification":
        let purificationAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        delete purificationAlly.afflictions.paralysis;
        delete purificationAlly.afflictions.frostbite;
        delete purificationAlly.afflictions.burn;
        delete purificationAlly.afflictions.infection;

        if (isAdjacent(unit, purificationAlly)) {
          if (purificationAlly.enhancements.ward > 0) {
            purificationAlly.enhancements.ward = Math.max(
              purificationAlly.enhancements.ward,
              2
            );
          } else {
            purificationAlly.enhancements.ward = 2;
          }
        }

        newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
          purificationAlly;

        break;

      case "healing rain":
        newGameState = activateHealingRain(newGameState, selectedUnit, unit);
        break;

      case "kleptothermy ally":
        newGameState[selectedUnit.player].units[
          selectedUnit.unitIndex
        ].virtue = 1;
        break;

      case "kleptothermy enemy":
        let kleptoVictim =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        if (kleptoVictim.unitClass !== "Water Scion" || isMuted(kleptoVictim)) {
          newGameState[selectedUnit.player].units[
            selectedUnit.unitIndex
          ].virtue = 0;
        }
        break;

      case "hydrotherapy":
        let hydrotherapyAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        delete hydrotherapyAlly.afflictions.burn;
        delete hydrotherapyAlly.afflictions.frostbite;
        delete hydrotherapyAlly.afflictions.paralysis;

        newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
          hydrotherapyAlly;

        break;

      case "aerial impetus prompt":
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Aerial Impetus Prompt",
          unit: selectedUnit,
        });
        break;

      case "aerial impetus purge":
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Aerial Impetus Purge",
          unit: unit,
          victim: selectedUnit,
        });
        break;

      case "gale conjuration purge":
        let galeConjurationEnemy =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        if (
          galeConjurationEnemy.unitClass !== "Wind Scion" ||
          isMuted(galeConjurationEnemy)
        ) {
          delete galeConjurationEnemy.enhancements.ward;
          delete galeConjurationEnemy.enhancements.shield;

          newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
            galeConjurationEnemy;
        }
        break;

      case "symphonic screech":
        newGameState = activateSymphonicScreech(
          newGameState,
          selectedUnit,
          unit
        );
        break;

      case "pitfall trap":
        newGameState = activatePitfallTrap(newGameState, selectedUnit, unit);
        break;

      case "aegis":
        newGameState = activateAegis(newGameState, selectedUnit, unit);
        break;

      case "frenzy blade":
        newGameState = activateFrenzyBlade(newGameState, selectedUnit, unit);
        break;

      case "sow and reap striker":
        //give SelectedUnit activationCounter
        let striker =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];
        striker.temporary.activation
          ? (striker.temporary.activation += 1)
          : (striker.temporary.activation = 1);

        newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
          striker;

        newGameState.activatingUnit.push(striker);

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: selectedUnit,
        });

        newGameState.currentResolution.push({
          resolution: "Plant Skill",
          resolution2: "Sow and Reap Strike",
          unit: selectedUnit,
        });

        break;

      case "viridian grave":
        newGameState = activateViridianGrave(newGameState, selectedUnit, unit);
        break;

      case "ambrosia":
        let ambrosiaAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        delete ambrosiaAlly.afflictions.burn;
        delete ambrosiaAlly.afflictions.frostbite;
        delete ambrosiaAlly.afflictions.paralysis;

        newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
          ambrosiaAlly;

        break;

      case "ambidexterity":
        if (!isMuted(selectedUnit)) {
          newGameState[selectedUnit.player].units[
            selectedUnit.unitIndex
          ].boosts.ambidexterity = true;
        }

        if (special === "resonated") {
          newGameState.currentResolution.push({
            resolution: "Sovereign Resonant Skill",
            resolution2: "AmbidexterityR1",
            player: self,
            unit: selectedUnit,
          });
        }

        if (
          (localGameState.tactics[0].face === "Advance" &&
            localGameState.tactics[0].stock > 0) ||
          (localGameState.tactics[1].face === "Advance" &&
            localGameState.tactics[1].stock > 0)
        ) {
          newGameState.currentResolution.push({
            resolution: "Sovereign Resonant Skill",
            resolution2: "Ambidexterity2",
            player: self,
            details: {
              reason: "Ambidexterity Conversion",
              title: "Ambidexterity",
              message: "You may convert 1 Advance tactic into Invoke.",
              no: "Skip",
              yes: "Convert",
            },
          });
        }
        break;

      case "dark halo":
        newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
          grantRavager(
            newGameState[selectedUnit.player].units[selectedUnit.unitIndex]
          );
        break;

      case "power at the final hour":
        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          special,
          "Power at the Final Hour",
          null
        );
        break;

      case "fated rivalry":
        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          unit.unitClass,
          "Fated Rivalry",
          null,
          unit
        );
        break;

      case "fated rivalry proaction":
        newGameState.currentResolution.push({
          resolution: "Sovereign Contingent Skill",
          resolution2: "Fated Rivalry Proaction2",
          player: self,
          unit: selectedUnit,
          details: {
            reason: "Fated Rivalry",
            title: "Fated Rivalry",
            message:
              "Ascend the pawn to the class of an enemy Scion within 2 spaces.",
          },
        });

        break;

      case "match made in heaven":
        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          unit.unitClass,
          "Match Made in Heaven",
          null,
          unit
        );
        break;

      case "vengeful legacy":
        newGameState.currentResolution.push({
          resolution: "Sovereign Contingent Skill",
          resolution2: "Vengeful Legacy2",
          player: self,
          unit: selectedUnit,
        });

        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          unit.unitClass,
          "Vengeful Legacy",
          null,
          unit
        );
        break;

      case "destine":
        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          special,
          "Destine",
          null
        );
        break;

      default:
        break;
    }

    setValidZones([]);
    setTileMode(null);
    setSelectUnitReason(null);
    setSelectUnitSpecial(null);
    setMovingUnit(null);
    setMovingSpecial(null);
    setTacticUsed(null);

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
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
      }

      if (unitInfo) {
        let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

        if (unit) {
          //decrease activation counter
          unit.temporary.activation -= 1;

          //apply anathema
          if (
            unit.temporary.activation === 0 &&
            unit.temporary.anathemaDelay === true
          ) {
            delete unit.temporary.anathemaDelay;
            unit.afflictions.anathema = 2;

            //anathema purges boosts, disruption, overgrowth, & proliferation
            unit.boosts = {};
            delete unit.enhancements.disruption;
            delete unit.enhancements.overgrowth;
            delete unit.enhancements.proliferation;
          }

          newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;
        }
      }

      newGameState.activatingSkill.pop();
      newGameState.activatingUnit.pop();

      dispatch(updateState(newGameState));

      updateFirebase(newGameState);
    }, 1000);
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

      if (unitInfo !== null) {
        let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

        if (unit) {
          //decrease activation counter
          unit.temporary.activation -= 1;

          //apply anathema
          if (
            unit.temporary.activation === 0 &&
            unit.temporary.anathemaDelay === true
          ) {
            delete unit.temporary.anathemaDelay;
            unit.afflictions.anathema = 2;

            //anathema purges boosts, disruption, overgrowth, & proliferation
            unit.boosts = {};
            delete unit.enhancements.disruption;
            delete unit.enhancements.overgrowth;
            delete unit.enhancements.proliferation;
          }

          newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;
        }
      }

      //Tea for Two
      if (resonator === "SA-02") {
        newGameState = drawSkill(newGameState);
      }

      newGameState.activatingSkill.pop();
      newGameState.activatingUnit.pop();
      newGameState.activatingResonator.pop();

      dispatch(updateState(newGameState));

      updateFirebase(newGameState);
    }, 1000);
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
    // props.updateFirebase(newGameState);
  };

  const tacticEnd = (unitInfo, effect) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    //end "Tactic End"
    newGameState.currentResolution.pop();

    if (unit) {
      //decrease activation counter
      unit.temporary.activation -= 1;

      //apply anathema
      if (
        unit.temporary.activation === 0 &&
        unit.temporary.anathemaDelay === true
      ) {
        delete unit.temporary.anathemaDelay;
        unit.afflictions.anathema = 2;

        //anathema purges boosts, disruption, overgrowth, & proliferation
        unit.boosts = {};
        delete unit.enhancements.disruption;
        delete unit.enhancements.overgrowth;
        delete unit.enhancements.proliferation;
      }

      newGameState[unitInfo.player].units[unitInfo.unitIndex] = unit;
    }

    newGameState.activatingUnit.pop();

    if (effect) {
      newGameState.activatingSkill.pop();
    }

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const talentConclusion = () => {
    setTimeout(() => {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end "Talent Conclusion"
      newGameState.currentResolution.pop();

      newGameState.activatingSkill.pop();
      newGameState.activatingUnit.pop();

      dispatch(updateState(newGameState));

      updateFirebase(newGameState);
    }, 1000);
  };

  //=========================
  //=========================
  const onSetFirstPlayer = async (choice) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.turnPlayer = choice;

    let hostSkillRepertoire = [...newGameState.host.skillRepertoire];
    hostSkillRepertoire = shuffleCards(hostSkillRepertoire);
    let hostStartingHand = hostSkillRepertoire.splice(
      hostSkillRepertoire.length - 4,
      4
    );

    newGameState.host.skillHand = hostStartingHand;
    newGameState.host.skillRepertoire = hostSkillRepertoire;

    let hostAvelhemRepertoire = [...newGameState.host.avelhemRepertoire];
    newGameState.host.avelhemRepertoire = shuffleCards(hostAvelhemRepertoire);
    let guestSkillRepertoire = [...newGameState.guest.skillRepertoire];
    guestSkillRepertoire = shuffleCards(guestSkillRepertoire);

    let guestStartingHand = guestSkillRepertoire.splice(
      guestSkillRepertoire.length - 4,
      4
    );

    newGameState.guest.skillHand = guestStartingHand;
    newGameState.guest.skillRepertoire = guestSkillRepertoire;

    let guestAvelhemRepertoire = [...newGameState.guest.avelhemRepertoire];
    newGameState.guest.avelhemRepertoire = shuffleCards(guestAvelhemRepertoire);

    newGameState.guest.skillHand.push("SX-01");
    newGameState.host.skillHand.push("SX-01");

    if (choice === "host") {
      newGameState.guest.skillHand.push("SX-01");
      newGameState.host.skillVestige.push("SX-01");
    } else {
      newGameState.host.skillHand.push("SX-01");
      newGameState.guest.skillVestige.push("SX-01");
    }

    newGameState.host.units = [
      newUnitStats("host", 0, 6, 0, "Pawn"),
      newUnitStats("host", 1, 6, 2, "Pawn"),
      newUnitStats("host", 2, 6, 4, "Pawn"),
    ];

    newGameState.guest.units = [
      newUnitStats("guest", 0, 3, 4, "Pawn"),
      newUnitStats("guest", 1, 3, 2, "Pawn"),
      newUnitStats("guest", 2, 3, 0, "Pawn"),
    ];

    let newZoneInfo = [...zones];

    newZoneInfo[6][0].player = "host";
    newZoneInfo[6][0].unitIndex = 0;
    newZoneInfo[6][2].player = "host";
    newZoneInfo[6][2].unitIndex = 1;
    newZoneInfo[6][4].player = "host";
    newZoneInfo[6][4].unitIndex = 2;
    newZoneInfo[3][0].player = "guest";
    newZoneInfo[3][0].unitIndex = 2;
    newZoneInfo[3][2].player = "guest";
    newZoneInfo[3][2].unitIndex = 1;
    newZoneInfo[3][4].player = "guest";
    newZoneInfo[3][4].unitIndex = 0;

    newGameState.zones = JSON.stringify(newZoneInfo);

    newGameState.turnCount = 1;
    newGameState.turnPhase = "Acquisition";
    newGameState.currentResolution.push({
      resolution: "Acquisition Phase Selection",
    });

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  //====================================================================
  //====================================================================

  return (
    <div className="board-body">
      {zones && localGameState && (
        <div>
          <div className="abilityText">
            Turn Player: {localGameState.turnPlayer}
            <br />
            Turn Count: {localGameState.turnCount}
            <br />
            Phase: {localGameState.turnPhase}
            <br />
            Resolution:{" "}
            {localGameState.currentResolution.length > 0 && (
              <>
                {
                  localGameState.currentResolution[
                    localGameState.currentResolution.length - 1
                  ].resolution
                }
              </>
            )}
            <br />
            Resolution2:{" "}
            {localGameState.currentResolution.length > 0 && (
              <>
                {
                  localGameState.currentResolution[
                    localGameState.currentResolution.length - 1
                  ].resolution2
                }
              </>
            )}
            <br />
            {/* {JSON.stringify(tileMode)} {validZones.length} */}
          </div>
          {!localGameState.turnPlayer && self === "host" && (
            <SelectFirstPlayer onSetFirstPlayer={onSetFirstPlayer} />
          )}

          <div className="board-physical">
            <div className="section">
              <div className="bigger-right-container">
                <div className="right-container-button-location">
                  {self === localGameState.turnPlayer &&
                    localGameState.currentResolution.length > 0 &&
                    localGameState.currentResolution[
                      localGameState.currentResolution.length - 1
                    ].resolution === "Execution Phase" && (
                      <button
                        className="choiceButton noYes"
                        onClick={() => endExecutionPhase()}
                      >
                        End Turn
                      </button>
                    )}

                  {self === localGameState.turnPlayer &&
                    localGameState.currentResolution.length > 0 &&
                    localGameState.currentResolution[
                      localGameState.currentResolution.length - 1
                    ].resolution === "Deploying Pawn" && (
                      <button
                        className="choiceButton noYes"
                        onClick={() => cancelDeploy()}
                      >
                        Cancel
                      </button>
                    )}

                  {hideModal && (
                    <button
                      className="choiceButton noYes"
                      onClick={() => hideOrRevealModale()}
                    >
                      Return to Modal
                    </button>
                  )}
                </div>
                <div className="right-container">
                  <ActivatedSkills />
                </div>
              </div>

              <div
                // className="middle-container"
                className={`middle-container ${
                  !isYourTurn() ? "middle-container-enemy" : ""
                }`}
              >
                {expandedUnit !== null && (
                  <>
                    <div
                      className="pieceOption"
                      style={unitButtonPosition(expandedUnit)[0]}
                      onClick={() => handleUnitOptions("Info")}
                    >
                      <div className="optionIcon">Info</div>
                    </div>

                    {localGameState.currentResolution.length > 0 &&
                      localGameState.currentResolution[
                        localGameState.currentResolution.length - 1
                      ].resolution === "Execution Phase" &&
                      self === expandedUnit.player &&
                      self === localGameState.turnPlayer && (
                        <>
                          <div
                            className="pieceOption"
                            style={unitButtonPosition(expandedUnit)[1]}
                            onClick={() => handleUnitOptions("Tactic")}
                          >
                            <div className="optionIcon">Dice</div>
                          </div>
                          {expandedUnit.unitClass !== "Pawn" && (
                            <>
                              <div
                                className="pieceOption"
                                style={unitButtonPosition(expandedUnit)[2]}
                                onClick={() => handleUnitOptions("Ability")}
                              >
                                <div className="optionIcon">Abi</div>
                              </div>
                              <div
                                className="pieceOption"
                                style={unitButtonPosition(expandedUnit)[3]}
                                onClick={() => handleUnitOptions("Skill")}
                              >
                                <div className="optionIcon">Ski</div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                  </>
                )}

                {localGameState.activatingUnit.length > 0 &&
                  localGameState.activatingUnit[
                    localGameState.activatingUnit.length - 1
                  ] !== null && (
                    <div
                      className="glow animating board-piece"
                      style={activatingUnit()}
                    ></div>
                  )}

                {localGameState.activatingTarget.length > 0 &&
                  localGameState.activatingTarget[
                    localGameState.activatingTarget.length - 1
                  ] !== null && (
                    <div className="board-piece" style={activatingTarget()}>
                      <img src={Crosshair} className="crosshair" />
                    </div>
                  )}

                {localGameState.host.units.map((unit, i) => (
                  <div key={i}>
                    {unit && (
                      <div className="board-piece" style={unitPosition(unit)}>
                        <Piece
                          unit={unit}
                          movingUnit={movingUnit}
                          tileMode={tileMode}
                          selectUnitReason={selectUnitReason}
                          selectUnitSpecial={selectUnitSpecial}
                          expandedUnit={expandedUnit}
                          setExpandedUnit={setExpandedUnit}
                          validZones={validZones}
                          selectUnit={selectUnit}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {localGameState.guest.units.map((unit, i) => (
                  <div key={-i - 1}>
                    {unit && (
                      <div className="board-piece" style={unitPosition(unit)}>
                        <Piece
                          unit={unit}
                          movingUnit={movingUnit}
                          tileMode={tileMode}
                          selectUnitReason={selectUnitReason}
                          selectUnitSpecial={selectUnitSpecial}
                          expandedUnit={expandedUnit}
                          setExpandedUnit={setExpandedUnit}
                          validZones={validZones}
                          selectUnit={selectUnit}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div
                  className={
                    self !== "guest"
                      ? "tile-grid"
                      : "tile-grid reversed-tile-grid"
                  }
                >
                  {zones.map((row, r) =>
                    row.map((zone, c) => (
                      <Tile
                        key={zone.id}
                        zone={zone}
                        validZones={validZones}
                        deployUnit={deployUnit}
                        movingUnit={movingUnit}
                        movingSpecial={movingSpecial}
                        setMovingSpecial={setMovingSpecial}
                        moveUnit={moveUnit}
                        tileMode={tileMode}
                        deployClass={deployClass}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="left-container">
                <div className="hands-player">
                  <div className="skill-hand">
                    <EnemySkillHand />
                  </div>
                  <div className="avel-hand">
                    <EnemyAvelhemHand />
                  </div>
                </div>

                <div className="lcMiddleContainer">
                  <div className="rcm-top-bot">
                    <div className="skill-container">
                      <div className="skill-deck skill-container-item">
                        <PileOfCards team={enemy} pile={"skillRepertoire"} />
                      </div>
                      <div className="skill-discard skill-container-item">
                        <PileOfCards team={enemy} pile={"skillVestige"} />
                      </div>
                    </div>
                    <div className="rcmtb-mid">
                      <div className="fd-counter">
                        {" "}
                        FD: {localGameState[enemy].fateDefiances} / 6{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="question-icon"
                          onClick={() => setInfoPopUp("FD")}
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                        </svg>
                      </div>
                      <div
                        className="bp-counter"
                        onClick={() => setViewBP("enemy")}
                      >
                        {" "}
                        BP: {localGameState[enemy].bountyPoints} / 10{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          className="eye-icon"
                        >
                          <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                        </svg>
                      </div>
                    </div>
                    <div className="avel-container">
                      <div className="avel-deck avel-container-item">
                        <PileOfCards team={enemy} pile={"avelhemRepertoire"} />
                      </div>
                      <div className="avel-discard avel-container-item">
                        <PileOfCards team={enemy} pile={"avelhemVestige"} />
                      </div>
                    </div>
                  </div>
                  <div className="rcm-middle">
                    <SovereignTactics />
                  </div>
                  <div className="rcm-top-bot">
                    <div className="skill-container">
                      <div className="skill-deck skill-container-item">
                        <PileOfCards team={self} pile={"skillRepertoire"} />
                      </div>
                      <div className="skill-discard skill-container-item">
                        <PileOfCards team={self} pile={"skillVestige"} />
                      </div>
                    </div>
                    <div className="rcmtb-mid">
                      <div className="fd-counter">
                        FD: {localGameState[self].fateDefiances} / 6{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="question-icon"
                          onClick={() => setInfoPopUp("FD")}
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                        </svg>
                      </div>
                      <div
                        className="bp-counter"
                        onClick={() => setViewBP("self")}
                      >
                        BP: {localGameState[self].bountyPoints} / 10{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          className="eye-icon"
                        >
                          <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                        </svg>
                      </div>
                    </div>
                    <div className="avel-container">
                      <div className="avel-deck avel-container-item">
                        <PileOfCards team={self} pile={"avelhemRepertoire"} />
                      </div>
                      <div className="avel-discard avel-container-item">
                        <PileOfCards team={self} pile={"avelhemVestige"} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hands-player">
                  <div className="skill-hand">
                    <PlayerSkillHand updateFirebase={updateFirebase} />
                  </div>
                  <div className="avel-hand">
                    <PlayerAvelhemHand updateFirebase={updateFirebase} />
                  </div>
                </div>
              </div>

              {currentResolutionPrompt()}
              {unitInfor !== null && (
                <UnitInfo unit={unitInfor} setUnitInfor={setUnitInfor} />
              )}
              {viewBP !== null && (
                <ViewBPUpgrades team={viewBP} setViewBP={setViewBP} />
              )}

              {infoPopUp && (
                <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
