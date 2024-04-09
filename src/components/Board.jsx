import "./Board.scss";

import React from "react";

import Tile from "./Tile";

import SelectFirstPlayer from "./modals/SelectFirstPlayer";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import gameState, { updateState } from "../redux/gameState";
import { updateSelf, updateEnemy } from "../redux/teams";
import { db } from "../config/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

import { useRecurringEffects } from "../hooks/useRecurringEffects";
import { useSkillEffects } from "../hooks/useSkillEffects";
import { useSovereignSkillEffects } from "../hooks/useSovereignSkillEffects";
import { useCardDatabase } from "../hooks/useCardDatabase";
import { useCardImageSwitch } from "../hooks/useCardImageSwitch";

import AcquisitionPhaseSelection from "./modals/AcquisitionPhaseSelection";
import BountyStore from "./modals/BountyStore";
import CoordinationPhaseSelection from "./modals/CoordinationPhaseSelection";
import DefiancePhaseSelection from "./modals/DefiancePhaseSelection";

import InspectSkill from "./modals/InspectSkill";
import MessageToEnemy from "./modals/MessageToEnemy";
import RecoverAvelhem from "./modals/RecoverAvelhem";
import RecoverSkill from "./modals/RecoverSkill";
import ScionSkillSelect from "./modals/ScionSkillSelect";
import SearchAvelhem from "./modals/SearchAvelhem";
import SearchSkill from "./modals/SearchSkill";
import SelectSkillResonator from "./modals/SelectSkillResonator";
import SelectAvelhemHandMulti from "./modals/SelectAvelhemHandMulti";
import SelectAvelhemResonator from "./modals/SelectAvelhemResonator";
import SelectSkillDiscard from "./modals/SelectSkillDiscard";
import SelectSkillHandMulti from "./modals/SelectSkillHandMulti";
import SelectSkillFloat from "./modals/SelectSkillFloat";
import SelectSkillReveal from "./modals/SelectSkillReveal";
import TacticResults from "./modals/TacticResults";
import ViewRevealedSkill from "./modals/ViewRevealedSkill";
import YouMayFloat1Skill from "./modals/YouMayFloat1Skill";
import YouMaySpend1Skill from "./modals/YouMaySpend1Skill";
import YouMayNoYes from "./modals/YouMayNoYes";

import TacticSelection from "./modals/TacticSelection";
import TacticSelectionViaEffect from "./modals/TacticSelectionViaEffect";
import TacticAdvance from "./modals/TacticAdvance";
import TacticAssault from "./modals/TacticAssault";

import SelectCustomChoice from "./modals/SelectCustomChoice";

import GlacialTorrent1 from "./skillModals/GlacialTorrent1";
import SymphonicScreechFloat from "./skillModals/SymphonicScreechFloat";
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

import Piece from "./Piece";

const Board = (props) => {
  const gameDoc = doc(db, "gameInfo", props.gameId);
  const dispatch = useDispatch();

  const { localGameState } = useSelector((state) => state.gameState);

  const { self } = useSelector((state) => state.teams);
  const { enemy } = useSelector((state) => state.teams);

  const [zones, setZones] = useState(null);

  const [validZones, setValidZones] = useState([]);

  const [tileMode, setTileMode] = useState(false);
  const [selectUnitReason, setSelectUnitReason] = useState(null);
  const [selectUnitSpecial, setSelectUnitSpecial] = useState(null);
  const [movingUnit, setMovingUnit] = useState(null);
  const [movingSpecial, setMovingSpecial] = useState(null);
  const [tacticUsed, setTacticUsed] = useState(null);
  const [expandedPiece, setExpandedPiece] = useState(null);

  const [hideModal, setHideModal] = useState(false);

  const [intrudingPlayer, setIntrudingPlayer] = useState(false);

  const {
    activateAegis,
    activateFrenzyBlade,
    activateHealingRain,
    activatePitfallTrap,
    activateViridianGrave,
    activateSymphonicScreech,
    applyBurn,
    applyDamage,
    applyFrostbite,
    applyParalysis,
    ascendPawn,
    avelhemResonance,
    avelhemToScion,
    blast,

    drawSkill,
    enterSelectUnitMode,
    endFinalPhase,
    getVacantAdjacentZones,

    grantRavager,
    freeze1,
    freeze2,
    ignite,

    isMuted,
    move,
    paralyze1,
    paralyze2,
    purificationPurge,
    selectAegisActivator,
    selectAllies,
    selectAmbidexterity,
    selectAvelhemPawn,
    selectChainLightningBlast,
    selectDarkHalo,
    selectEnemies,
    selectEnemiesAfflicted,
    selectEnemiesRooted,
    selectFatedRivalry,
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
    unitFloatSkill,
    unitRetainSkill,
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
    galeConjurationR3,
    symphonicScreech1,
    cataclysmicTempest1,
    cataclysmicTempest2,
    cataclysmicTempest3,
    cataclysmicTempest4,
    cataclysmicTempest5,
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
    powerAtTheFinalHourProaction,
    fatedRivalry1,
    fatedRivalry2,
    matchMadeInHeaven1,
    matchMadeInHeaven2,
    matchMadeInHeaven3,
    vengefulLegacy1,
    vengefulLegacy2,
    blackBusinessCard1,
  } = useSovereignSkillEffects();

  const { getSkillById } = useCardDatabase();
  const { getImage } = useCardImageSwitch();

  const newPawnStats = (player, index, row, column) => {
    return {
      player: player,
      unitIndex: index,
      row: row,
      column: column,
      unitClass: "Pawn",
      hp: 1,
      virtue: 1,
      afflictions: {},
      enhancements: {},
      boosts: {},
      temporary: {},
    };
  };

  const updateFirebase = (newGameState) => {
    try {
      updateDoc(gameDoc, { gameState: newGameState });
    } catch (err) {
      console.log(err);
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
    setExpandedPiece(null);
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

  const currentResolutionPrompt = () => {
    // setTimeout(() => {}, 1000)

    let lastResolution = null;

    if (localGameState.currentResolution.length > 0) {
      lastResolution =
        localGameState.currentResolution[
          localGameState.currentResolution.length - 1
        ];
    } else {
      lastResolution = { resolution: "" };
    }

    switch (lastResolution.resolution) {
      case "Acquisition Phase Selection":
        return (
          <>
            {self === localGameState.turnPlayer && !hideModal && (
              <AcquisitionPhaseSelection
                enterDeployMode={enterDeployMode}
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

      case "Tactic Results":
        return (
          <>
            {!hideModal && (
              <TacticResults
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
      case "Deploying Pawn":
        return (
          <>
            {self === localGameState.turnPlayer && tileMode !== "deploy" && (
              <>
                {setTileMode("deploy")}
                {setValidZones(lastResolution.zoneIds)}
              </>
            )}
          </>
        );
      case "Moving Unit":
        return (
          <>
            {self === localGameState.turnPlayer && tileMode !== "move" && (
              <>
                {setTileMode("move")}
                {setValidZones(lastResolution.zoneIds)}
                {setMovingUnit(lastResolution.unit)}
                {setTacticUsed(lastResolution.tactic)}
              </>
            )}
          </>
        );

      case "Selecting Unit":
        return (
          <>
            {self === lastResolution.player && tileMode !== "selectUnit" && (
              <>
                {setIntrudingPlayer(self)}
                {setTileMode("selectUnit")}
                {setValidZones(lastResolution.zoneIds)}
                {setMovingUnit(lastResolution.unit)}
                {setTacticUsed(lastResolution.tactic)}
                {setSelectUnitReason(lastResolution.reason)}
                {setSelectUnitSpecial(lastResolution.special)}
              </>
            )}
          </>
        );

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

      case "Using Advance Tactic":
        return (
          <>
            {self === localGameState.turnPlayer && !hideModal && (
              <TacticAdvance
                updateFirebase={updateFirebase}
                unit={lastResolution.unit}
                tactic={lastResolution.tactic}
                enterMoveMode={enterMoveMode}
                enterSelectUnitMode={enterSelectUnitMode}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Using Assault Tactic":
        return (
          <>
            {self === localGameState.turnPlayer && !hideModal && (
              <TacticAssault
                updateFirebase={updateFirebase}
                unit={lastResolution.unit}
                tactic={lastResolution.tactic}
                enterMoveMode={enterMoveMode}
                enterSelectUnitMode={enterSelectUnitMode}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

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
        return (
          <>
            {self === lastResolution.unit.player && (
              <>{tacticEnd(lastResolution.unit)}</>
            )}
          </>
        );

      case "Apply Burn":
        return (
          <>
            {self === lastResolution.attacker.player && (
              <>
                {resolveApplyBurn(
                  lastResolution.attacker,
                  lastResolution.victim
                )}
              </>
            )}
          </>
        );

      case "Apply Damage":
        return (
          <>
            {self === lastResolution.attacker.player && (
              <>
                {resolveApplyDamage(
                  lastResolution.attacker,
                  lastResolution.victim,
                  lastResolution.type,
                  lastResolution.special
                )}
              </>
            )}
          </>
        );

      case "Apply Frostbite":
        return (
          <>
            {self === lastResolution.attacker.player && (
              <>
                {resolveApplyFrostbite(
                  lastResolution.attacker,
                  lastResolution.victim,
                  lastResolution.duration
                )}
              </>
            )}
          </>
        );

      case "Apply Paralysis":
        return (
          <>
            {self === lastResolution.attacker.player && (
              <>
                {resolveApplyParalysis(
                  lastResolution.attacker,
                  lastResolution.victim,
                  lastResolution.duration,
                  lastResolution.special
                )}
              </>
            )}
          </>
        );

      case "Strike Movement":
        return (
          <>
            {self === lastResolution.attacker.player && (
              <>
                {resolutionUpdate(
                  strikeMove(lastResolution.attacker, lastResolution.zone)
                )}
              </>
            )}
          </>
        );

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
        return (
          <>
            {self === lastResolution.unit.player && (
              <>
                {resolutionUpdateGameStateOnly(
                  avelhemResonance(
                    lastResolution.unit,
                    lastResolution.resonator
                  )
                )}
              </>
            )}
          </>
        );

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
        return (
          <>
            {self === lastResolution.player && (
              <>
                {selectAvelhemPawn(
                  lastResolution.avelhem,
                  lastResolution.resonator
                )}
              </>
            )}
          </>
        );

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
                message={lastResolution.message}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Avelhem Conclusion":
        return (
          <>
            {self === lastResolution.player && (
              <>
                {avelhemConclusion(
                  lastResolution.avelhem,
                  lastResolution.conclusion,
                  lastResolution.resonator,
                  lastResolution.resonatorConclusion
                )}
              </>
            )}
          </>
        );

      case "Skill Conclusion":
        return (
          <>
            {self === lastResolution.player && (
              <>
                {skillConclusion(
                  lastResolution.player,
                  lastResolution.unit,
                  lastResolution.skill,
                  lastResolution.conclusion
                )}
              </>
            )}
          </>
        );

      case "Resonance Conclusion":
        return (
          <>
            {self === lastResolution.player && (
              <>
                {skillResonanceConclusion(
                  lastResolution.player,
                  lastResolution.unit,
                  lastResolution.skill,
                  lastResolution.skillConclusion,
                  lastResolution.resonator,
                  lastResolution.resonatorConclusion
                )}
              </>
            )}
          </>
        );

      case "Retain resonant skill":
        return (
          <>
            {self === lastResolution.player && (
              <>{skillResonanceRetain(lastResolution.resonator)}</>
            )}
          </>
        );

      case "May float resonant skill":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <>
                <MayFloatResonantSkill
                  // unit={lastResolution.unit}
                  player={lastResolution.player}
                  skill={lastResolution.skill}
                  resonator={lastResolution.resonator}
                  updateFirebase={updateFirebase}
                  hideOrRevealModale={hideOrRevealModale}
                />
              </>
            )}
          </>
        );

      case "Misc.":
        switch (lastResolution.resolution2) {
          case "May float resonant skill unit":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <>
                    <>
                      {resolutionUpdateGameStateOnly(
                        unitFloatSkill(
                          lastResolution.unit,
                          lastResolution.skill,
                          lastResolution.resonator
                        )
                      )}
                    </>
                  </>
                )}
              </>
            );

          case "Retain resonant skill unit":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <>
                    <>
                      {resolutionUpdateGameStateOnly(
                        unitRetainSkill(
                          lastResolution.unit,
                          lastResolution.skill,
                          lastResolution.resonator
                        )
                      )}
                    </>
                  </>
                )}
              </>
            );

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

          case "Message To Enemy":
            return (
              <>
                {self === lastResolution.player && (
                  <MessageToEnemy
                    title={lastResolution.title}
                    message={lastResolution.message}
                    updateFirebase={updateFirebase}
                  />
                )}
              </>
            );
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
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    setIntrudingPlayer={setIntrudingPlayer}
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

          case "Activating Conduction":
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

          case "Talent Conclusion":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>{talentConclusion()}</>
                )}
              </>
            );
        }
        break;

      case "Fire Skill":
        switch (lastResolution.resolution2) {
          case "Activating Ignition Propulsion":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      ignitionPropulsion1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Ignition Propulsion1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterMoveMode={enterMoveMode}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Conflagration":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      conflagration1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Conflagration1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "blast",
                      "Fire Scion"
                    )}
                  </>
                )}
              </>
            );

          case "Resonating Conflagration":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      conflagrationR1(
                        lastResolution.unit,
                        lastResolution.resonator
                      )
                    )}
                  </>
                )}
              </>
            );

          case "ConflagrationR1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      conflagrationR2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "ConflagrationR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Blaze of Glory":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>{resolutionUpdate(blazeOfGlory1(lastResolution.unit))}</>
                )}
              </>
            );

          case "Blaze of Glory1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {setIntrudingPlayer(self)}
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "ignite",
                      null
                    )}
                  </>
                )}
              </>
            );

          case "Blaze of Glory2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      blazeOfGlory2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Blaze of Glory3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Resplendence":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      resplendence1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "ignite",
                      null
                    )}
                  </>
                )}
              </>
            );
        }
        break;

      case "Water Skill":
        switch (lastResolution.resolution2) {
          case "Activating Purification":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>{resolutionUpdate(purification1(lastResolution.unit))}</>
                )}
              </>
            );

          case "Purification1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectAllies(
                      lastResolution.unit,
                      2,
                      true,
                      "purification",
                      null
                    )}
                  </>
                )}
              </>
            );

          case "Purification2":
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

          case "Activating Frigid Breath":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>{resolutionUpdate(frigidBreath1(lastResolution.unit))}</>
                )}
              </>
            );

          case "Frigid Breath1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      2,
                      null,
                      "freeze1",
                      null
                    )}
                  </>
                )}
              </>
            );

          case "Frigid Breath2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      frigidBreath2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "freeze2",
                      null
                    )}
                  </>
                )}
              </>
            );

          case "Resonating Frigid Breath":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      frigidBreathR1(
                        lastResolution.unit,
                        lastResolution.resonator
                      )
                    )}
                  </>
                )}
              </>
            );

          case "Frigid BreathR1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      frigidBreathR2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Frigid BreathR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Frigid BreathR3":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemiesAfflicted(
                      lastResolution.unit,
                      1,
                      null,
                      "blast",
                      null,
                      "frostbite"
                    )}
                  </>
                )}
              </>
            );

          case "Select Healing Rain Activator":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectHealingRainActivator(lastResolution.victim)}</>
                )}
              </>
            );

          case "Activating Healing Rain":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      healingRain1(lastResolution.unit, lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

          case "Activating Glacial Torrent":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>{resolutionUpdate(glacialTorrent1(lastResolution.unit))}</>
                )}
              </>
            );

          case "Glacial Torrent 1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <GlacialTorrent1
                    unit={lastResolution.unit}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    setIntrudingPlayer={setIntrudingPlayer}
                  />
                )}
              </>
            );
        }
        break;

      case "Wind Skill":
        switch (lastResolution.resolution2) {
          case "Activating Aerial Impetus":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>{resolutionUpdate(aerialImpetus1(lastResolution.unit))}</>
                )}
              </>
            );

          case "Aerial Impetus1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Aerial Impetus Prompt":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>{selectAerialImpetusMove(lastResolution.unit, "Ally")}</>
                )}
              </>
            );

          case "Aerial Impetus Purge":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      aerialImpetus2E(lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

          case "Aerial Impetus Purge Move":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    player={lastResolution.player}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Aerial Impetus Purge Move2":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectAerialImpetusMove(lastResolution.victim, "Enemy")}</>
                )}
              </>
            );

          case "Activating Gale Conjuration":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      galeConjuration1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      galeConjurationR1(
                        lastResolution.unit,
                        lastResolution.resonator
                      )
                    )}
                  </>
                )}
              </>
            );

          case "Gale ConjurationR1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      galeConjurationR2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Gale ConjurationR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Gale ConjurationR3":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(galeConjurationR3(lastResolution.unit))}
                  </>
                )}
              </>
            );

          case "Gale ConjurationR4":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectSkillFloat
                    unit={null}
                    reason="Gale Conjuration Lethal"
                    title="Gale Conjuration"
                    message="You are forced to float 1 skill."
                    restriction={null}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Symphonic Screech":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      symphonicScreech1(
                        lastResolution.unit,
                        lastResolution.victim
                      )
                    )}
                  </>
                )}
              </>
            );

          case "Symphonic Screech Negate":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SymphonicScreechFloat
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    canFloat={lastResolution.canFloat}
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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(cataclysmicTempest1(lastResolution.unit))}
                  </>
                )}
              </>
            );

          case "Cataclysmic Tempest1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "paralyze2",
                      "Cataclysmic Tempest"
                    )}
                  </>
                )}
              </>
            );

          case "Cataclysmic Tempest2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      cataclysmicTempest2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Cataclysmic Tempest3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Cataclysmic Tempest4":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(cataclysmicTempest3(lastResolution.unit))}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      cataclysmicTempest4(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Cataclysmic Tempest6":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Cataclysmic Tempest7":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      cataclysmicTempest5(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Cataclysmic Tempest8":
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

          case "Cataclysmic Tempest9":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(lastResolution.unit, 1, null, "blast", null)}
                  </>
                )}
              </>
            );
        }
        break;

      case "Land Skill":
        switch (lastResolution.resolution2) {
          case "Activating Crystallization":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      crystallization1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      crystallization2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Activating Upheaval":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      upheaval1(lastResolution.unit, lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

          case "Upheaval1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "paralyze1",
                      "Upheaval"
                    )}
                  </>
                )}
              </>
            );

          case "Upheaval2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      upheaval2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Upheaval3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resonating Upheaval":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      upheavalR1(lastResolution.unit, lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

          case "UpheavalR1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      upheavalR2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {enterMoveModeViaSkill(
                      getVacantAdjacentZones(lastResolution.unit),
                      lastResolution.unit
                    )}
                  </>
                )}
              </>
            );

          case "Select Pitfall Trap Activator":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectPitfallTrapActivator(lastResolution.mover)}</>
                )}
              </>
            );

          case "Activating Pitfall Trap":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      pitfallTrap1(lastResolution.unit, lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

          case "Pitfall Trap1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      pitfallTrap2(lastResolution.unit, lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      pitfallTrap3(lastResolution.unit, lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

          case "Activating Geomancy":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      geomancy1(lastResolution.unit, lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

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
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Geomancy3":
            return (
              <>
                {self ===
                  lastResolution.unit.player(
                    <>
                      {resolutionUpdate(
                        geomancy2(lastResolution.unit, lastResolution.victim)
                      )}
                    </>
                  )}
              </>
            );

          case "Geomancy4":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      chainLightning1(
                        lastResolution.unit,
                        lastResolution.victim
                      )
                    )}
                  </>
                )}
              </>
            );

          case "Chain Lightning1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "paralyze1",
                      "ChainLightningParalysis"
                    )}
                  </>
                )}
              </>
            );

          case "Chain Lightning2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      chainLightning2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Chain Lightning3":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Chain Lightning4":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      chainLightning3(
                        lastResolution.unit,
                        lastResolution.adjacentEnemies
                      )
                    )}
                  </>
                )}
              </>
            );

          case "Chain Lightning5":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectChainLightningBlast(
                      lastResolution.unit,
                      lastResolution.adjacentEnemies
                    )}
                  </>
                )}
              </>
            );

          case "Activating Zip and Zap":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      zipAndZap1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Zip And Zap1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {enterMoveModeViaSkill(
                      getVacantAdjacentZones(lastResolution.unit),
                      lastResolution.unit
                    )}
                  </>
                )}
              </>
            );

          case "Zip And Zap2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      zipAndZap2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      zipAndZapR1(lastResolution.unit, lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

          case "Zip And ZapR1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      zipAndZapR2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Zip And ZapR2":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Thunder Thaumaturge":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      thunderThaumaturge1(
                        lastResolution.unit,
                        lastResolution.attacker
                      )
                    )}
                  </>
                )}
              </>
            );

          case "Thunder Thaumaturge1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      thunderThaumaturge2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      valiantSpark1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(surge1(lastResolution.unit))}
                  </>
                )}
              </>
            );

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
                    enterSelectUnitMode={enterSelectUnitMode}
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
                    enterSelectUnitMode={enterSelectUnitMode}
                    setMovingSpecial={setMovingSpecial}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Diffusion":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      diffusion1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "blast",
                      "Diffusion"
                    )}
                  </>
                )}
              </>
            );

          case "Diffusion3":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      diffusion2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Diffusion4":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resonating Diffusion":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdate(
                      diffusionR1(lastResolution.unit, lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

          case "DiffusionR1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      diffusionR2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      diffusionR3(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Select Aegis Activator":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectAegisActivator(lastResolution.victim)}</>
                )}
              </>
            );

          case "Activating Aegis":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      aegis1(lastResolution.unit, lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      disruptionField1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );
        }
        break;

      case "Metal Skill":
        switch (lastResolution.resolution2) {
          case "Activating Magnetic Shockwave":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      magneticShockwave1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Magnetic Shockwave1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "paralyze1",
                      "MagneticShockwave1stParalysis"
                    )}
                  </>
                )}
              </>
            );

          case "Magnetic Shockwave2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      magneticShockwave2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Magnetic Shockwave2.1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Magnetic Shockwave3":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      magneticShockwave3(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Magnetic Shockwave3.1":
            return (
              <>
                {self === lastResolution.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastResolution.unit}
                    details={lastResolution.details}
                    enterSelectUnitMode={enterSelectUnitMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Reinforce":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      reinforce1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      reinforceR1(lastResolution.unit, lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

          case "Select Frenzy Blade Activator":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectFrenzyBladeActivator(lastResolution.victim)}</>
                )}
              </>
            );

          case "Activating Frenzy Blade":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      frenzyBlade1(lastResolution.unit, lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      frenzyBlade2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      arsenalOnslaught1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Arsenal Onslaught1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "strike",
                      null
                    )}
                  </>
                )}
              </>
            );

          case "Arsenal Onslaught1.1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(lastResolution.unit, 1, null, "blast", null)}
                  </>
                )}
              </>
            );

          case "Arsenal Onslaught2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      arsenalOnslaught2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemies(
                      lastResolution.unit,
                      1,
                      null,
                      "paralyze1",
                      null
                    )}
                  </>
                )}
              </>
            );

          case "Arsenal Onslaught4":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      arsenalOnslaught3(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      sowAndReap1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemiesRooted(
                      lastResolution.unit,
                      1,
                      null,
                      "blast",
                      "sowAndReapBlast"
                    )}
                  </>
                )}
              </>
            );

          case "Select Sow and Reap Striker":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectSowAndReapStriker(lastResolution.unit)}</>
                )}
              </>
            );

          case "Sow and Reap Strike":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {selectEnemiesRooted(
                      lastResolution.unit,
                      1,
                      null,
                      "strike",
                      null
                    )}
                  </>
                )}
              </>
            );

          case "Sow and Reap2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      sowAndReap2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Activating Efflorescence":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      efflorescence1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      efflorescenceR1(
                        lastResolution.unit,
                        lastResolution.resonator
                      )
                    )}
                  </>
                )}
              </>
            );

          case "EfflorescenceR1":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      efflorescenceR2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Select Viridian Grave Activator":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectViridianGraveActivator(lastResolution.victim)}</>
                )}
              </>
            );

          case "Activating Viridian Grave":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      viridianGrave1(lastResolution.unit, lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      castleOfThorns1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
          case "Activating Heir's Endeavor":
            return (
              <>
                {self === lastResolution.player && (
                  <>{resolutionUpdateGameStateOnly(heirsEndeavor1())}</>
                )}
              </>
            );

          case "Activating Tea for Two":
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      teaForTwo1(lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>{resolutionUpdateGameStateOnly(darkHalo1())}</>
                )}
              </>
            );

          case "Select Dark Halo":
            return (
              <>{self === lastResolution.player && <>{selectDarkHalo()}</>}</>
            );

          case "Activating Reminiscence":
            return (
              <>
                {self === lastResolution.player && (
                  <>{resolutionUpdateGameStateOnly(reminiscence1())}</>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>{resolutionUpdateGameStateOnly(foreshadow1())}</>
                )}
              </>
            );

          case "Foreshadow1":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <SelectCustomChoice
                    // unit={null}
                    details={lastResolution.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Foreshadow2":
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      foreshadow2(lastResolution.discardedBurst)
                    )}
                  </>
                )}
              </>
            );

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
        }
        break;

      case "Sovereign Resonant Skill":
        switch (lastResolution.resolution2) {
          case "Activating Transmute":
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      transmute1(lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      transmuteR1(lastResolution.skillsToShuffle)
                    )}
                  </>
                )}
              </>
            );

          case "Activating Ambidexterity":
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      ambidexterity1(lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

          case "Select Ambidexterity":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectAmbidexterity(lastResolution.resonated)}</>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      ambidexterityR1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Activating Providence":
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      providence1(lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      providence2(lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      providenceR1(lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

          case "Activating Fervent Prayer":
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      ferventPrayer1(lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>{resolutionUpdateGameStateOnly(ferventPrayerR1())}</>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      pressTheAttack1(lastResolution.resonator)
                    )}
                  </>
                )}
              </>
            );

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
                    enterDeployMode={enterDeployMode}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Heirs Endeavor Resonance":
            return (
              <>
                {self === lastResolution.player && (
                  <>{resolutionUpdateGameStateOnly(heirsEndeavorResonance())}</>
                )}
              </>
            );
        }
        break;

      case "Sovereign Contingent Skill":
        switch (lastResolution.resolution2) {
          case "Activating Power at the Final Hour: Proaction":
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      powerAtTheFinalHourProaction()
                    )}
                  </>
                )}
              </>
            );

          case "Power at the Final Hour: Proaction":
            return (
              <>
                {self === lastResolution.player && !hideModal && (
                  <PowerAtTheFinalHourProaction
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Select Power at the Final Hour Pawn":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectPowerAtTheFinalHour(lastResolution.scionClass)}</>
                )}
              </>
            );

          case "Activating Fated Rivalry":
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      fatedRivalry1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Select Fated Rivalry":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectFatedRivalry(lastResolution.unit)}</>
                )}
              </>
            );

          case "Fated Rivalry2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      fatedRivalry2(lastResolution.unit, lastResolution.enemy)
                    )}
                  </>
                )}
              </>
            );

          case "Activating Match Made In Heaven":
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      matchMadeInHeaven1(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

          case "Select Match Made in Heaven Pawn":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>{selectMatchMadeInHeavenPawn(lastResolution.unit)}</>
                )}
              </>
            );

          case "Match Made in Heaven2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      matchMadeInHeaven2(
                        lastResolution.unit,
                        lastResolution.unit2
                      )
                    )}
                  </>
                )}
              </>
            );

          case "Match Made in Heaven3":
            return (
              <>
                {self === lastResolution.player && (
                  <>{resolutionUpdateGameStateOnly(matchMadeInHeaven3())}</>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      vengefulLegacy1(lastResolution.victim)
                    )}
                  </>
                )}
              </>
            );

          case "Select Vengeful Legacy":
            return (
              <>
                {self === lastResolution.player && (
                  <>{selectVengefulLegacy(lastResolution.victim)}</>
                )}
              </>
            );

          case "Vengeful Legacy2":
            return (
              <>
                {self === lastResolution.unit.player && (
                  <>
                    {resolutionUpdateGameStateOnly(
                      vengefulLegacy2(lastResolution.unit)
                    )}
                  </>
                )}
              </>
            );

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
            return (
              <>
                {self === lastResolution.player && (
                  <>{resolutionUpdateGameStateOnly(blackBusinessCard1())}</>
                )}
              </>
            );
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
                    enterSelectUnitMode={enterSelectUnitMode}
                    hideOrRevealModale={hideOrRevealModale}
                    setIntrudingPlayer={setIntrudingPlayer}
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
                    // enterSelectUnitMode={enterSelectUnitMode}
                    // setIntrudingPlayer={setIntrudingPlayer}
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
                    enterSelectUnitMode={enterSelectUnitMode}
                    hideOrRevealModale={hideOrRevealModale}
                    setIntrudingPlayer={setIntrudingPlayer}
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
                    enterSelectUnitMode={enterSelectUnitMode}
                    hideOrRevealModale={hideOrRevealModale}
                    setIntrudingPlayer={setIntrudingPlayer}
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
                    enterSelectUnitMode={enterSelectUnitMode}
                    hideOrRevealModale={hideOrRevealModale}
                    setIntrudingPlayer={setIntrudingPlayer}
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
                    enterSelectUnitMode={enterSelectUnitMode}
                    hideOrRevealModale={hideOrRevealModale}
                    setIntrudingPlayer={setIntrudingPlayer}
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
                    enterSelectUnitMode={enterSelectUnitMode}
                    hideOrRevealModale={hideOrRevealModale}
                    setIntrudingPlayer={setIntrudingPlayer}
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
                enterSelectUnitMode={enterSelectUnitMode}
                hideOrRevealModale={hideOrRevealModale}
                setIntrudingPlayer={setIntrudingPlayer}
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

      case "Final Phase Conclusion":
        return (
          <>
            {self === localGameState.turnPlayer && (
              <>{resolveEndFinalPhase()}</>
            )}
          </>
        );

      case "Animation Delay":
        return (
          <>{self === lastResolution.priority && <>{animationDelay()}</>}</>
        );

      default:
        return;
    }
  };

  //====================================================================
  //====================================================================
  //Helper functions below

  const activateTactic = (unit) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.push({
      resolution: "Activating Tactic",
      unit: unit,
    });

    dispatch(updateState(newGameState));

    //
  };

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
  };

  const deployPawn = (r, c) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    let newIndex = newGameState[self].units.indexOf(null);
    if (newIndex === -1) {
      newIndex = newGameState[self].units.length;
    }

    //creating pawn
    newGameState[self].units[newIndex] = newPawnStats(self, newIndex, r, c);

    //updating zones info
    let newZoneInfo = [...zones];
    newZoneInfo[r][c].player = self;
    newZoneInfo[r][c].unitIndex = newIndex;
    newGameState.zones = JSON.stringify(newZoneInfo);

    //end "Deploying Pawn"
    newGameState.currentResolution.pop();

    if (localGameState.turnPhase === "Acquisition") {
      newGameState.turnPhase = "Bounty";
      newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Bounty Phase Selection",
      });
    }

    dispatch(updateState(newGameState));
    setValidZones([]);
    setTileMode(null);

    updateFirebase(newGameState);
  };

  const endExecutionPhase = () => {
    nextPhase();
  };

  const enterDeployMode = (zoneIds) => {
    console.log("enterDeployMode");

    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.push({
      resolution: "Deploying Pawn",
      zoneIds: zoneIds,
    });

    dispatch(updateState(newGameState));

    // updateFirebase(newGameState);
  };

  const enterMoveMode = (zoneIds, unit, gameState, tactic) => {
    let newGameState = null;
    if (gameState) {
      newGameState = gameState;
    } else {
      newGameState = JSON.parse(JSON.stringify(localGameState));
    }

    newGameState.currentResolution.push({
      resolution: "Moving Unit",
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

  // const enterSelectUnitMode = (
  //   zoneIds,
  //   unit,
  //   gameState,
  //   tactic,
  //   reason,
  //   special
  // ) => {
  //   let newGameState = null;
  //   if (gameState) {
  //     newGameState = gameState;
  //   } else {
  //     newGameState = JSON.parse(JSON.stringify(localGameState));
  //   }

  //   newGameState.currentResolution.push({
  //     resolution: "Selecting Unit",
  //     zoneIds: zoneIds,
  //     unit: unit,
  //     tactic: tactic,
  //     reason: reason,
  //     special: special,
  //   });

  //   dispatch(updateState(newGameState));

  //   // updateFirebase(newGameState);
  // };

  const hideOrRevealModale = () => {
    setHideModal(!hideModal);
    setExpandedPiece(null);
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

  const nextPhase = () => {
    console.log("Changing Phase");
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    if (newGameState.turnPhase === "Execution") {
      newGameState.turnPhase = "Final";
      newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Final Phase Conclusion",
      });
    } else if (newGameState.turnPhase === "Final") {
      newGameState.turnPhase = "Acquisition";
      newGameState.turnPlayer = enemy;
      newGameState.turnCount = newGameState.turnCount + 1;
      newGameState.tactics = [];

      newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Acquisition Phase Selection",
      });
    }

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

  const resolveEndFinalPhase = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = endFinalPhase(newGameState, self, enemy);

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

      case "purification":
        newGameState = purificationPurge(newGameState, selectedUnit);
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
          "Power at the Final hour",
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
    setIntrudingPlayer(null);

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const selectExpandPiece = (id) => {
    setExpandedPiece(id);
  };

  const skillConclusion = (player, unitInfo, skill, conclusion) => {
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

    newGameState.activatingSkill.pop();
    newGameState.activatingUnit.pop();

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const skillResonanceConclusion = (
    player,
    unitInfo,
    skill,
    skillConclusion,
    resonator,
    resonatorConclusion
  ) => {
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

  const tacticEnd = (unitInfo) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Tactic End"
    newGameState.currentResolution.pop();

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

    newGameState.activatingUnit.pop();

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const talentConclusion = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Talent Conclusion"
    newGameState.currentResolution.pop();

    // newGameState.activatingSkill.pop();
    newGameState.activatingUnit.pop();

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
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
      newPawnStats("host", 0, 6, 0),
      newPawnStats("host", 1, 6, 2),
      newPawnStats("host", 2, 6, 4),
    ];

    newGameState.guest.units = [
      newPawnStats("guest", 0, 3, 4),
      newPawnStats("guest", 1, 3, 2),
      newPawnStats("guest", 2, 3, 0),
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
    <>
      {zones && localGameState && (
        <div>
          Turn Player: {localGameState.turnPlayer}
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
          Resolution:{" "}
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
          {JSON.stringify(tileMode)} {validZones.length}
          <br />
          {hideModal && (
            <button onClick={() => hideOrRevealModale()}>
              Return to options
            </button>
          )}
          <br />
          {!localGameState.turnPlayer && self === "host" && (
            <SelectFirstPlayer onSetFirstPlayer={onSetFirstPlayer} />
          )}
          <div className="section">
            <div className="right-container">
              <ActivatedSkills />
            </div>
            <div className="middle-container">
              {localGameState.host.units.map((unit, i) => (
                <div key={i}>
                  {unit && (
                    <div
                      className="board-piece"
                      style={
                        self === "host"
                          ? {
                              position: "absolute",
                              zIndex: 100,
                              top: 12 + 78 * unit.row,
                              left: 12 + 78 * unit.column,
                            }
                          : {
                              position: "absolute",
                              zIndex: 100,
                              top: 12 + 78 * (9 - unit.row),
                              left: 12 + 78 * (4 - unit.column),
                            }
                      }
                    >
                      <Piece
                        unit={unit}
                        enterMoveMode={enterMoveMode}
                        movingUnit={movingUnit}
                        tileMode={tileMode}
                        selectUnitReason={selectUnitReason}
                        selectUnitSpecial={selectUnitSpecial}
                        id={i} // hostUnitIds
                        expandedPiece={expandedPiece}
                        selectExpandPiece={selectExpandPiece}
                        activateTactic={activateTactic}
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
                    <div
                      className="board-piece"
                      style={
                        self === "host"
                          ? {
                              position: "absolute",
                              zIndex: 100,
                              top: 12 + 78 * unit.row,
                              left: 12 + 78 * unit.column,
                            }
                          : {
                              position: "absolute",
                              zIndex: 100,
                              top: 12 + 78 * (9 - unit.row),
                              left: 12 + 78 * (4 - unit.column),
                            }
                      }
                    >
                      <Piece
                        unit={unit}
                        enterMoveMode={enterMoveMode}
                        movingUnit={movingUnit}
                        tileMode={tileMode}
                        selectUnitReason={selectUnitReason}
                        selectUnitSpecial={selectUnitSpecial}
                        id={-i - 1} // guestUnitIds
                        expandedPiece={expandedPiece}
                        selectExpandPiece={selectExpandPiece}
                        activateTactic={activateTactic}
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
                      deployPawn={deployPawn}
                      movingUnit={movingUnit}
                      movingSpecial={movingSpecial}
                      setMovingSpecial={setMovingSpecial}
                      moveUnit={moveUnit}
                      tileMode={tileMode}
                      intrudingPlayer={intrudingPlayer}
                    />
                  ))
                )}
              </div>
              {self === localGameState.turnPlayer &&
                localGameState.currentResolution.length > 0 &&
                localGameState.currentResolution[
                  localGameState.currentResolution.length - 1
                ].resolution === "Execution Phase" && (
                  <button onClick={() => endExecutionPhase()}>End</button>
                )}
            </div>
            {/* <div className="phase-indicator"></div> */}
            <div className="left-container">
              <div className="lc-player">
                <div className="avel-hand">
                  {localGameState[enemy] && (
                    <div className="hand-container">
                      {localGameState[enemy].avelhemHand.map((card, index) => (
                        <div key={index} className="handCard">
                          {/* {card} */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="skill-hand">
                  {localGameState[enemy] && (
                    <div className="hand-container">
                      {localGameState[enemy].skillHand.map((card, index) => (
                        <div key={index} className="handCard">
                          {/* {card} */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lc-middle">
                <div className="lcm-left">
                  <div className="lcml-player">
                    <div className="lcml-player-left">
                      <div className="cp"></div>
                      <div className="fd"></div>
                    </div>
                    <div className="lcml-player-right">
                      <div className="skill-used"></div>
                      <div className="avel-used"></div>
                    </div>
                  </div>
                  <div className="dice-results">
                    <p>
                      1st tactic:{" "}
                      {localGameState.tactics[0] &&
                        localGameState.tactics[0].face}
                    </p>
                    <p>
                      2nd tactic:{" "}
                      {localGameState.tactics[1] &&
                        localGameState.tactics[1].face}
                    </p>
                  </div>
                  <div className="lcml-player">
                    <div className="lcml-player-left">
                      <div className="fd"></div>
                      <div className="cp"></div>
                    </div>
                    <div className="lcml-player-right">
                      <div className="avel-used"></div>
                      <div className="skill-used">
                        <div className="card"></div>
                        {localGameState[self] && (
                          <div
                            className="cardThickness"
                            style={{
                              height: `${
                                (localGameState[self].skillRepertoire.length -
                                  1) *
                                0.2
                              }px`,
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lcm-right">
                  <div className="lcmr-enemy"></div>
                  <div className="lcmr-user"></div>
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
          </div>
          {currentResolutionPrompt()}
        </div>
      )}
    </>
  );
};

export default Board;
