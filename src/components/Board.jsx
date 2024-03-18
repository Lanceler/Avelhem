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
import { useCardDatabase } from "../hooks/useCardDatabase";
import { useCardImageSwitch } from "../hooks/useCardImageSwitch";

import AcquisitionPhaseSelection from "./modals/AcquisitionPhaseSelection";
import BountyStore from "./modals/BountyStore";
import CoordinationPhaseSelection from "./modals/CoordinationPhaseSelection";
import DefiancePhaseSelection from "./modals/DefiancePhaseSelection";

import MessageToEnemy from "./modals/MessageToEnemy";
import RecoverSkill from "./modals/RecoverSkill";
import ScionSkillSelect from "./modals/ScionSkillSelect";
import SearchSkill from "./modals/SearchSkill";
import SelectSkillResonator from "./modals/SelectSkillResonator";
import SelectSkillDiscard from "./modals/SelectSkillDiscard";
import SelectSkillFloat from "./modals/SelectSkillFloat";
import SelectSkillReveal from "./modals/SelectSkillReveal";
import TacticResults from "./modals/TacticResults";
import ViewRevealedSkill from "./modals/ViewRevealedSkill";
import YouMayFloat1Skill from "./modals/YouMayFloat1Skill";
import YouMaySpend1Skill from "./modals/YouMaySpend1Skill";
import YouMayNoYes from "./modals/YouMayNoYes";

import ManaRestructure from "./TalentModals/ManaRestructure";

import TacticSelection from "./modals/TacticSelection";
import TacticSelectionViaEffect from "./modals/TacticSelectionViaEffect";
import TacticAdvance from "./modals/TacticAdvance";
import TacticAssault from "./modals/TacticAssault";
import VirtueBlastBlock from "./modals/VirtueBlastBlock";

import IgnitionPropulsion1 from "./skillModals/IgnitionPropulsion1";
import Purification2 from "./skillModals/Purification2";
import FrigidBreathResonance1 from "./skillModals/FrigidBreathResonance1";
import GlacialTorrent1 from "./skillModals/GlacialTorrent1";
import AerialImpetus1 from "./skillModals/AerialImpetus1";
import CataclysmicTempestFloat from "./skillModals/CataclysmicTempestFloat";
import Upheaval1 from "./skillModals/Upheaval1";
import Geomancy1 from "./skillModals/Geomancy1";
import Surge1 from "./skillModals/Surge1";

import ContingentElimination from "./skillModals/ContingentElimination";
import ContingentMotion from "./skillModals/ContingentMotion";
import ContingentSurvivalAlly from "./skillModals/ContingentSurvivalAlly";
import ContingentSymphonicScreech from "./skillModals/ContingentSymphonicScreech";
import ContingentTarget from "./skillModals/ContingentTarget";

import SymphonicScreechFloat from "./skillModals/SymphonicScreechFloat";

import MayFloatResonantSkill from "./skillModals/MayFloatResonantSkill";

import DisplayedCard from "./displays/DisplayedCard";

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
    activateHealingRain,
    activatePitfallTrap,
    activateSymphonicScreech,
    applyBurn,
    applyDamage,
    applyFrostbite,
    applyParalysis,
    blast,
    drawSkill,
    endFinalPhase,
    getVacantAdjacentZones,
    getZonesWithAllies,
    getZonesWithEnemies,
    getZonesWithEnemiesAfflicted,
    freeze1,
    freeze2,
    ignite,
    isMuted,
    move,
    paralyze1,
    paralyze2,
    purificationPurge,
    shuffleCards,
    strike,
    strikeMove,
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
  } = useSkillEffects();

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
      // console.log("newGameState");
      // console.log(newGameState);
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
                getVacantFrontier={getVacantFrontier}
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
            {(self === localGameState.turnPlayer || self === intrudingPlayer) &&
              tileMode !== "selectUnit" && (
                <>
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
                hideOrRevealModale={hideOrRevealModale}
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
            {self === lastResolution.victim.player && !hideModal && (
              <VirtueBlastBlock
                updateFirebase={updateFirebase}
                attacker={lastResolution.attacker}
                victim={lastResolution.victim}
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
            {self === lastResolution.unit.player && (
              <SelectSkillResonator
                unit={lastResolution.unit}
                skill={lastResolution.skill}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
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

      case "Search Skill":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <SearchSkill
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
            {self === lastResolution.unit.player && !hideModal && (
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
                updateFirebase={updateFirebase}
                skill={lastResolution.skill}
                hideOrRevealModale={hideOrRevealModale}
              />
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
                  unit={lastResolution.unit}
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

      case "Activating Ignition Propulsion":
        return (
          <>
            {self === lastResolution.unit.player && (
              <>{resolutionUpdate(ignitionPropulsion1(lastResolution.unit))}</>
            )}
          </>
        );

      case "Ignition Propulsion1":
        return (
          <>
            {self === lastResolution.unit.player && !hideModal && (
              <IgnitionPropulsion1
                updateFirebase={updateFirebase}
                unit={lastResolution.unit}
                enterMoveMode={enterMoveMode}
                enterSelectUnitMode={enterSelectUnitMode}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Activating Conflagration":
        return (
          <>
            {self === lastResolution.unit.player && (
              <>{resolutionUpdate(conflagration1(lastResolution.unit))}</>
            )}
          </>
        );

      case "Conflagration1":
        return (
          <>
            {self === lastResolution.unit.player && (
              <>
                {
                  selectEnemies(
                    lastResolution.unit,
                    1,
                    null,
                    "blast",
                    "Fire Scion"
                  )
                  // selectBlast(lastResolution.unit, null, "Fire Scion")
                }
              </>
            )}
          </>
        );

      case "Resonating Conflagration":
        return (
          <>
            {self === lastResolution.unit.player && (
              <>
                {resolutionUpdate(
                  conflagrationR1(lastResolution.unit, lastResolution.resonator)
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
                {selectEnemies(lastResolution.unit, 1, null, "ignite", null)}
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
              <>{selectEnemies(lastResolution.unit, 1, null, "ignite", null)}</>
            )}
          </>
        );

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
              <Purification2
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
                {selectEnemies(lastResolution.unit, 2, null, "freeze1", null)}
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
                {selectEnemies(lastResolution.unit, 1, null, "freeze2", null)}
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
                  frigidBreathR1(lastResolution.unit, lastResolution.resonator)
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
              <FrigidBreathResonance1
                updateFirebase={updateFirebase}
                unit={lastResolution.unit}
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
              <AerialImpetus1
                updateFirebase={updateFirebase}
                unit={lastResolution.unit}
                enterSelectUnitMode={enterSelectUnitMode}
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
              <>{resolutionUpdate(galeConjurationR3(lastResolution.unit))}</>
            )}
          </>
        );

      case "Gale ConjurationR4":
        return (
          <>
            {self === lastResolution.enemy && !hideModal && (
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
                  symphonicScreech1(lastResolution.unit, lastResolution.victim)
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
              <>{resolutionUpdate(cataclysmicTempest1(lastResolution.unit))}</>
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
              <>{resolutionUpdate(cataclysmicTempest3(lastResolution.unit))}</>
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
              <>{selectEnemies(lastResolution.unit, 1, null, "blast", null)}</>
            )}
          </>
        );

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
                {resolutionUpdateGameStateOnly(upheaval2(lastResolution.unit))}
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
                  upheavalR2(lastResolution.unit, lastResolution.resonator)
                )}
              </>
            )}
          </>
        );

      case "UpheavalR2":
        return (
          <>
            {self === lastResolution.unit.player && !hideModal && (
              <Upheaval1
                updateFirebase={updateFirebase}
                unit={lastResolution.unit}
                enterMoveMode={enterMoveMode}
                hideOrRevealModale={hideOrRevealModale}
              />
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
              <Geomancy1
                updateFirebase={updateFirebase}
                unit={lastResolution.unit}
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

      case "Activating Chain Lightning":
        return (
          <>
            {self === lastResolution.unit.player && (
              <>
                {resolutionUpdateGameStateOnly(
                  chainLightning1(lastResolution.unit, lastResolution.victim)
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
                {resolutionUpdateGameStateOnly(zipAndZap1(lastResolution.unit))}
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
                {resolutionUpdateGameStateOnly(zipAndZap2(lastResolution.unit))}
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
              <>{resolutionUpdate(valiantSpark1(lastResolution.unit))}</>
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

      case "Activating Surge":
        return (
          <>
            {self === lastResolution.unit.player && (
              <>
                {resolutionUpdateGameStateOnly(
                  surge1(lastResolution.unit, lastResolution.victim)
                )}
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
              <Surge1
                unit={lastResolution.unit}
                reason={lastResolution.reason}
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
              <Surge1
                unit={lastResolution.unit}
                reason={lastResolution.reason}
                enterMoveMode={enterMoveMode}
                enterSelectUnitMode={enterSelectUnitMode}
                setMovingSpecial={setMovingSpecial}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

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

      case "Mana Restructuring":
        return (
          <>
            {self === lastResolution.player && !hideModal && (
              <ManaRestructure
                player={lastResolution.player}
                skillInfo={lastResolution.skill}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Mana Restructuring Announcement":
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

  const deployPawn = (r, c) => {
    console.log("deploy pawn on row" + r + " column" + c);

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

  const enterSelectUnitMode = (
    zoneIds,
    unit,
    gameState,
    tactic,
    reason,
    special
  ) => {
    let newGameState = null;
    if (gameState) {
      newGameState = gameState;
    } else {
      newGameState = JSON.parse(JSON.stringify(localGameState));
    }

    newGameState.currentResolution.push({
      resolution: "Selecting Unit",
      zoneIds: zoneIds,
      unit: unit,
      tactic: tactic,
      reason: reason,
      special: special,
    });

    dispatch(updateState(newGameState));

    // updateFirebase(newGameState);
  };

  const getVacantFrontier = () => {
    let frontierLength = 1 + localGameState[self].bountyUpgrades.frontier;

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

  const selectAllies = (unitInfo, range, includeSelf, reason, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
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

  const selectChainLightningBlast = (unit, zones) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Chain Lightning5"
    newGameState.currentResolution.pop();

    enterSelectUnitMode(
      zones,
      unit,
      newGameState,
      null,
      "blast",
      "Lightning Scion"
    );
  };

  const selectEnemies = (unitInfo, range, tactic, reason, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
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

  const selectEnemiesAfflicted = (
    unitInfo,
    range,
    tactic,
    reason,
    special,
    affliction
  ) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];

    newGameState.currentResolution.pop();

    if (unit !== null && !isMuted(unit)) {
      enterSelectUnitMode(
        getZonesWithEnemiesAfflicted(unit, range, affliction),
        unit,
        newGameState,
        tactic,
        reason,
        special
      );
    }
  };

  const selectHealingRainActivator = (victim) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Select Healing Rain Activator"
    newGameState.currentResolution.pop();

    const zonesWithAllies = getZonesWithAllies(victim, 1, true);
    let zonesWithWaterScions = [];

    for (let z of zonesWithAllies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Water Scion" && !isMuted(unit)) {
        zonesWithWaterScions.push(z);
      }
    }

    setIntrudingPlayer(self);

    enterSelectUnitMode(
      zonesWithWaterScions,
      victim,
      newGameState,
      null,
      "healing rain",
      null
    );
  };

  const selectPitfallTrapActivator = (mover) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

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

    setIntrudingPlayer(self);

    enterSelectUnitMode(
      zonesWithLandScions,
      mover,
      newGameState,
      null,
      "pitfall trap",
      null
    );
  };

  const selectUnit = (unit, selectedUnit, reason, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (tacticUsed !== null) {
      newGameState.tactics[tacticUsed].stock--;
    }

    //end ""Selecting Unit"
    newGameState.currentResolution.pop();

    switch (reason) {
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
      case "aerial impetus prompt":
        newGameState.currentResolution.push({
          resolution: "Aerial Impetus Prompt",
          unit: selectedUnit,
        });
        break;
      case "aerial impetus purge":
        newGameState.currentResolution.push({
          resolution: "Aerial Impetus Purge",
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

  const skillConclusion = (player, unit, skill, conclusion) => {
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

    if (newGameState[unit.player].units[unit.unitIndex] !== null) {
      //decrease activation counter
      if (
        newGameState[unit.player].units[unit.unitIndex].temporary.activation
      ) {
        newGameState[unit.player].units[unit.unitIndex].temporary.activation =
          newGameState[unit.player].units[unit.unitIndex].temporary.activation -
          1;
      }

      //apply anathema
      if (
        !newGameState[unit.player].units[unit.unitIndex].temporary.activation &&
        newGameState[unit.player].units[unit.unitIndex].temporary.anathemaDelay
      ) {
        delete newGameState[unit.player].units[unit.unitIndex].temporary
          .anathemaDelay;

        newGameState[unit.player].units[
          unit.unitIndex
        ].afflictions.anathema = 2;

        //anathema purges boosts, disruption, overgrowth, & proliferation
        newGameState[unit.player].units[unit.unitIndex].boosts = {};
        delete newGameState[unit.player].units[unit.unitIndex].enhancements
          .disruption;
        delete newGameState[unit.player].units[unit.unitIndex].enhancements
          .overgrowth;
        delete newGameState[unit.player].units[unit.unitIndex].enhancements
          .proliferation;
      }
    }

    newGameState.activatingSkill.pop();
    newGameState.activatingUnit.pop();

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const skillResonanceConclusion = (
    player,
    unit,
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

    if (newGameState[unit.player].units[unit.unitIndex] !== null) {
      //decrease activation counter
      if (
        newGameState[unit.player].units[unit.unitIndex].temporary.activation
      ) {
        newGameState[unit.player].units[unit.unitIndex].temporary.activation =
          newGameState[unit.player].units[unit.unitIndex].temporary.activation -
          1;
      }

      //apply anathema
      if (
        !newGameState[unit.player].units[unit.unitIndex].temporary.activation &&
        newGameState[unit.player].units[unit.unitIndex].temporary.anathemaDelay
      ) {
        delete newGameState[unit.player].units[unit.unitIndex].temporary
          .anathemaDelay;

        newGameState[unit.player].units[
          unit.unitIndex
        ].afflictions.anathema = 2;

        //anathema purges boosts, disruption, overgrowth, & proliferation
        newGameState[unit.player].units[unit.unitIndex].boosts = {};
        delete newGameState[unit.player].units[unit.unitIndex].enhancements
          .disruption;
        delete newGameState[unit.player].units[unit.unitIndex].enhancements
          .overgrowth;
        delete newGameState[unit.player].units[unit.unitIndex].enhancements
          .proliferation;
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
    if (resonator !== "SA-04") {
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

  const tacticEnd = (unit) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Tactic End"
    newGameState.currentResolution.pop();

    if (newGameState[unit.player].units[unit.unitIndex] !== null) {
      //decrease activation counter
      if (
        newGameState[unit.player].units[unit.unitIndex].temporary.activation
      ) {
        newGameState[unit.player].units[unit.unitIndex].temporary.activation =
          newGameState[unit.player].units[unit.unitIndex].temporary.activation -
          1;
      }

      //apply anathema
      if (
        !newGameState[unit.player].units[unit.unitIndex].temporary.activation &&
        newGameState[unit.player].units[unit.unitIndex].temporary.anathemaDelay
      ) {
        delete newGameState[unit.player].units[unit.unitIndex].temporary
          .anathemaDelay;

        newGameState[unit.player].units[
          unit.unitIndex
        ].afflictions.anathema = 2;

        //anathema purges boosts, disruption, overgrowth, & proliferation
        newGameState[unit.player].units[unit.unitIndex].boosts = {};
        delete newGameState[unit.player].units[unit.unitIndex].enhancements
          .disruption;
        delete newGameState[unit.player].units[unit.unitIndex].enhancements
          .overgrowth;
        delete newGameState[unit.player].units[unit.unitIndex].enhancements
          .proliferation;
      }
    }

    newGameState.activatingUnit.pop();

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  //=========================
  //=========================
  const onSetFirstPlayer = async (choice) => {
    console.log("Set First Player");

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
          {localGameState.currentResolution.length > 0 &&
            localGameState.currentResolution[
              localGameState.currentResolution.length - 1
            ].resolution}
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
              {localGameState.activatingSkill.length > 0 && (
                <>
                  <div className="activated-card">
                    <DisplayedCard
                      cardInfo={getSkillById(
                        localGameState.activatingSkill[
                          localGameState.activatingSkill.length - 1
                        ]
                      )}
                      inGame={true}
                    />
                  </div>

                  {localGameState.activatingSkill.length === 1 &&
                    localGameState.activatingResonator.length === 1 && (
                      <DisplayedCard
                        cardInfo={getSkillById(
                          localGameState.activatingResonator[0]
                        )}
                        inGame={true}
                      />
                    )}
                </>
              )}
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

              <div className="lc-player">
                <div className="avel-hand">
                  {localGameState[self] && (
                    <div className="hand-container">
                      {localGameState[self].avelhemHand.map((card, index) => (
                        <div key={index} className="handCard">
                          {card}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="skill-hand">
                  <PlayerSkillHand />
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          {currentResolutionPrompt()}
        </div>
      )}
    </>
  );
};

export default Board;
