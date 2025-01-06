import "./Board.scss";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import { updateSelf, updateEnemy } from "../redux/teams";
import { updateDemoCount } from "../redux/demoCount";
import { updateMagnifiedSkill } from "../redux/magnifySkill";

import { db } from "../config/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

import { useRecurringEffects } from "../hooks/useRecurringEffects";
import { useSkillEffects } from "../hooks/useSkillEffects";
import { useSovereignSkillEffects } from "../hooks/useSovereignSkillEffects";
import { useUnitAbilityEffects } from "../hooks/useUnitAbilityEffects";
import { useGetImages } from "../hooks/useGetImages";

import AcquisitionPhase from "./modals/AcquisitionPhase";
import BountyPhase from "./modals/BountyPhase";
import CoordinationPhase from "./modals/CoordinationPhase";
import DefiancePhase from "./modals/DefiancePhase";

import SelectFirstPlayer from "./modals/SelectFirstPlayer";

import InspectSkill from "./modals/InspectSkill";
import MessageToPlayer from "./modals/MessageToPlayer";
import RecoverAvelhem from "./modals/RecoverAvelhem";
import RecoverSkill from "./modals/RecoverSkill";
import SelectScionSkill from "./modals/SelectScionSkill";
import SearchAvelhem from "./modals/SearchAvelhem";
import SearchSkill from "./modals/SearchSkill";
import SelectElement from "./modals/SelectElement";
import SelectResonatorSkill from "./modals/SelectResonatorSkill";
import SelectAvelhemHandMulti from "./modals/SelectAvelhemHandMulti";
import SelectAvelhemResonator from "./modals/SelectAvelhemResonator";
import SpendSkill from "./modals/SpendSkill";
import SelectSkillHandMulti from "./modals/SelectSkillHandMulti";
import SelectSkillReveal from "./modals/SelectSkillReveal";
import SelectUnitAbility from "./modals/SelectUnitAbility";
import SelectTacticalAction from "./modals/SelectTacticalAction";
import SelectSovereignTactic from "./modals/SelectSovereignTactic";
import TacticResults from "./modals/TacticResults";
import TacticResults3 from "./modals/TacticResults3";
import ViewRevealedSkill from "./modals/ViewRevealedSkill";
import FloatSkill from "./modals/FloatSkill";
import YouMaySpend1Skill from "./modals/YouMaySpend1Skill";
import YouMayNoYes from "./modals/YouMayNoYes";
import VictoryScreen from "./modals/VictoryScreen";
import ZoomCard from "./displays/ZoomCard";

import SelectTactic from "./modals/SelectTactic";
import SelectTacticViaEffect from "./modals/SelectTacticViaEffect";
import SelectCustomChoice from "./modals/SelectCustomChoice";

import GlacialTorrent from "./skillModals/GlacialTorrent";
import CataclysmicTempestFloat from "./skillModals/CataclysmicTempestFloat";
import FerventPrayerResonance from "./skillModals/FerventPrayerResonance";
import Destine from "./skillModals/Destine";

import ContingentTriggered from "./modals/ContingentTriggered";

import MayFloatResonantSkill from "./skillModals/MayFloatResonantSkill";

import ActivatedSkills from "./displays/ActivatedSkills";

import PlayerAvelhemHand from "./hand/PlayerAvelhemHand";
import PlayerSkillHand from "./hand/PlayerSkillHand";

import SkillHandBack from "./hand/SkillHandBack";
import AvelhemHandBack from "./hand/AvelhemHandBack";

import SovereignTactics from "./displays/SovereignTactics";

import UnitInfo from "./modals/UnitInfo";
import ViewBPUpgrades from "./modals/ViewBPUpgrades";
import InfoPopUp from "./modals/InfoPopUp";
import ContingencySettings from "./modals/ContingencySettings";

import Board from "./boardComponents/Board";
import PileOfCards from "./displays/PileOfCards";

import LoadingImage from "./displays/LoadingImage";
import { AnimatePresence, motion } from "framer-motion";

import DemoTextBox from "./boardComponents/DemoTextBox";
import DemoImage from "./displays/DemoImage";

const BoardArea = (props) => {
  let gameDoc = props.demo ? null : doc(db, "gameInfo", props.gameId);

  const dispatch = useDispatch();

  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);

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
  const [openContingencySettings, setOpenContingencySettings] = useState(false);

  const {
    activateAegis,
    activateFrenzyBlade,
    activateHealingRain,
    activatePitfallTrap,
    activateViridianGrave,
    activateSymphonicScreech,
    applyAnathema,
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
    endExecutionPhase,
    enterMoveMode,
    getVacant2SpaceZones,
    getVacantAdjacentZones,
    grantRavager,
    freeze1,
    freeze2,
    ignite,
    isAdjacent,
    isMuted,
    move,
    newUnitStats,
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
    selectFatedRivalry,
    selectFrenzyBladeActivator,
    selectHealingRainActivator,
    selectMatchMadeInHeavenPawn,
    selectPitfallTrapActivator,
    selectSymphonicScreechActivator,
    selectVengefulLegacy,
    selectViridianGraveActivator,
    shuffleCards,
    strike,
    strikeMove,
    triggerMotion,
    unitFloatSkill,
    unitRetainSkill,
    uponDebutTalents,
    aetherBlast,
    aetherBlastMitigate,
  } = useRecurringEffects();

  const { applySkill } = useSkillEffects();

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

  const updateFirebase = (newGameState) => {
    if (props.userRole === "spectator") {
      return;
    }

    if (props.demo) {
      props.setDemoGameState(newGameState);
    } else {
      try {
        updateDoc(gameDoc, { gameState: newGameState });
      } catch (err) {
        console.log(err);
      }
    }
  };

  //====================================================================
  //Imageloading below

  const [loadingImages, setLoadingImages] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const { imagesLoadingList } = useGetImages();
  const totalImages = imagesLoadingList.length;

  useEffect(() => {
    const imageElements = imagesLoadingList.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => handleImageLoad(src, true);
      img.onerror = () => handleImageLoad(src, false);
      return img;
    });

    const retryCounts = new Map();

    const handleImageLoad = (src, success) => {
      setImagesLoaded((prev) => {
        const loaded = prev + 1;

        if (loaded >= totalImages) {
          setImagesLoaded(totalImages);
          setTimeout(() => {
            setLoadingImages(false);
          }, 750);
          return loaded;
        }

        return loaded;
      });

      if (!success && (!retryCounts.has(src) || retryCounts.get(src) < 3)) {
        const retryCount = (retryCounts.get(src) || 0) + 1;
        retryCounts.set(src, retryCount);
        loadImage(src); // Retry loading the image
      }
    };

    const loadImage = (src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => handleImageLoad(src, true);
      img.onerror = () => handleImageLoad(src, false);
    };

    imagesLoadingList.forEach((src) => {
      retryCounts.set(src, 0); // Initialize retry count
      loadImage(src);
    });
  }, []);

  useEffect(() => {
    if (!loadingImages) {
      setShowContent(true);
    }
  }, [loadingImages]);

  //====================================================================
  //UseEffects below
  useEffect(() => {
    dispatch(updateMagnifiedSkill(null));

    if (props.userRole === "guest") {
      dispatch(updateSelf("guest"));
      dispatch(updateEnemy("host"));
    } else if (["host", "spectator"].includes(props.userRole)) {
      dispatch(updateSelf("host"));
      dispatch(updateEnemy("guest"));
    }

    // STRINGED GAMESTATE"
    // console.log(JSON.stringify(localGameState));
  }, [props.userRole]);

  useEffect(() => {
    setValidZones([]);
    setTileMode(null);
    setSelectUnitReason(null);
    setSelectUnitSpecial(null);
    setMovingUnit(null);
    // setMovingSpecial(null);
    setTacticUsed(null);

    setExpandedUnit(null);

    // if (localGameState) {
    //   console.log(JSON.stringify(localGameState.currentResolution));
    // }
  }, [localGameState, props.userRole]);

  useEffect(() => {
    if (demoGuide === "Learn-overview") {
      if ([8, 17, 76, 126, 130].includes(demoCount)) {
        setHideModal(true);
      } else if ([15, 19, 79, 127, 135].includes(demoCount)) {
        setHideModal(false);
      }
    }
  }, [demoCount]);

  //Gets data regarding zones and units
  useEffect(() => {
    setZones(JSON.parse(props.gameState.zones));
    dispatch(updateState(props.gameState));

    if (!props.demo) {
      setHideModal(false);
    }
  }, [props.gameState]);

  useEffect(() => {
    setHideModal(false);
  }, [props.userRole]);

  //====================================================================
  //Current Resolution Prompt below

  const currentResolutionPrompt = () => {
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
                  updateFirebase={updateFirebase}
                />
              )}
            </>
          );

        case "Revealing Skill":
          return (
            <>
              {!hideModal && (
                <ViewRevealedSkill
                  skill={lastRes.skill}
                  title={lastRes.title}
                  message={lastRes.specMessage}
                  updateFirebase={updateFirebase}
                  hideOrRevealModale={hideOrRevealModale}
                />
              )}
            </>
          );

        default:
          return;
      }
    }

    switch (lastRes.resolution) {
      // case "Animation Delay":
      //   animationDelay();
      //   break;

      case "Animation Delay":
        if (self === lastRes.priority) {
          animationDelay();
        }

        break;

      case "Acquisition Phase Selection":
        return (
          <>
            {self === localGameState.turnPlayer && !hideModal && (
              <AcquisitionPhase
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
              <BountyPhase
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
              <CoordinationPhase
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
              <DefiancePhase
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Defiance Options":
        switch (lastRes.resolution2) {
          case "Artifice":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectSkillHandMulti
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Destine":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <Destine
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    reason="Destine"
                    defianceCost={lastRes.defianceCost}
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
                {self === lastRes.player && !hideModal && (
                  <TacticResults3
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                    reroll={lastRes.reroll}
                  />
                )}
              </>
            );

          case "End Phase":
            if (self === lastRes.player) {
              updateLocalState(endDefiancePhase2());
            }
            break;
        }
        break;

      case "Final Phase":
        switch (lastRes.resolution2) {
          case "Avelhem Retention":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectAvelhemHandMulti
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Skill Hand Limit":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectSkillHandMulti
                    resonated={lastRes.resonated}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Burn Decrement":
            if (self === lastRes.player) {
              resolutionUpdate(decrementBurn());
            }
            break;

          case "Status Decrement":
            if (self === lastRes.player) {
              updateLocalState(decrementStatus());
            }
            break;

          case "Scoring":
            if (self === lastRes.player) {
              resolutionUpdate(applyScore());
            }
            break;
        }
        break;

      case "Deploying Pawn":
        if (self === localGameState.turnPlayer && tileMode !== "deploy") {
          setTileMode("deploy");
          setValidZones(lastRes.zoneIds);
          setDeployClass("Pawn");
        }
        break;

      case "Deploying Scion":
        if (self === localGameState.turnPlayer && tileMode !== "deploy") {
          setTileMode("deploy");
          setValidZones(lastRes.zoneIds);
          setDeployClass(lastRes.scionClass);
        }
        break;

      case "Mitigating Aether-Blast1":
        if (self === lastRes.unit.player) {
          resolutionUpdate(aetherBlastMitigate(lastRes.attacker, lastRes.unit));
        }
        break;

      case "Mitigating Aether-Blast2":
        return (
          <>
            {self === lastRes.unit.player && !hideModal && (
              <YouMayNoYes
                unit={lastRes.unit}
                attacker={lastRes.attacker}
                details={lastRes.details}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
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
          resolveApplyBurn(lastRes.attacker, lastRes.victim);
        }
        break;

      case "Apply Damage":
        if (self === lastRes.attacker.player) {
          resolutionUpdate(
            applyDamage(
              lastRes.attacker,
              lastRes.victim,
              lastRes.type,
              lastRes.special
            )
          );
        } else if (self === lastRes.victim.player) {
          updateLocalState(
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
              <SelectResonatorSkill
                unit={lastRes.unit}
                skill={lastRes.skill}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Choose Resonator Avelhem":
        return (
          <>
            {self === lastRes.player && (
              <SelectAvelhemResonator
                avelhem={lastRes.avelhem}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Avelhem Resonance":
        if (self === lastRes.unit.player) {
          updateLocalState(avelhemResonance(lastRes.unit, lastRes.resonator));
        }
        break;

      case "You May Shuffle Avelhem":
        return (
          <>
            {self === lastRes.player && !hideModal && (
              <YouMayNoYes
                details={lastRes.details}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Avelhem Select Pawn":
        if (self === lastRes.player) {
          selectAvelhemPawn(lastRes.avelhem, lastRes.resonator);
        }
        break;

      case "Search Avelhem":
        return (
          <>
            {self === lastRes.player && !hideModal && (
              <SearchAvelhem
                restriction={lastRes.restriction}
                outcome={lastRes.outcome}
                message={lastRes.message}
                reveal={lastRes.reveal}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Search Skill":
        return (
          <>
            {self === lastRes.player && !hideModal && (
              <SearchSkill
                details={lastRes.details}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Recover Avelhem":
        return (
          <>
            {self === lastRes.player && !hideModal && (
              <RecoverAvelhem
                restriction={lastRes.restriction}
                outcome={lastRes.outcome}
                message={lastRes.message}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Recover Skill":
        return (
          <>
            {self === lastRes.player && !hideModal && (
              <RecoverSkill
                restriction={lastRes.restriction}
                outcome={lastRes.outcome}
                message={lastRes.message}
                canSkip={lastRes.canSkip}
                hideOrRevealModale={hideOrRevealModale}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Discard Skill":
        return (
          <>
            {self === lastRes.player && !hideModal && (
              <SpendSkill
                updateFirebase={updateFirebase}
                unit={lastRes.unit}
                player={lastRes.player}
                message={lastRes.message}
                restriction={lastRes.restriction}
                hideOrRevealModale={hideOrRevealModale}
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
            if (self === lastRes.player && tileMode !== "selectUnit") {
              setTileMode("selectUnit");
              setValidZones(lastRes.zoneIds);
              setMovingUnit(lastRes.unit);
              setTacticUsed(lastRes.tactic);
              setSelectUnitReason(lastRes.reason);
              setSelectUnitSpecial(lastRes.special);
            }
            break;

          case "Selecting Scion Skill":
            return (
              <>
                {self === lastRes.unit.player && (
                  <SelectScionSkill
                    updateFirebase={updateFirebase}
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
                    updateFirebase={updateFirebase}
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
                {self === lastRes.player && !hideModal && (
                  <YouMayNoYes
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Moving Unit":
            if (self === localGameState.turnPlayer && tileMode !== "move") {
              setTileMode("move");
              setValidZones(lastRes.zoneIds);
              setMovingUnit(lastRes.unit);
              setTacticUsed(lastRes.tactic);
            }
            break;

          case "Activating Tactic":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectTactic
                    updateFirebase={updateFirebase}
                    unit={lastRes.unit}
                  />
                )}
              </>
            );

          case "Selecting Tactical Action":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectTacticalAction
                    unit={lastRes.unit}
                    dice={lastRes.dice}
                    face={lastRes.face}
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
                    dice={lastRes.dice}
                    face={lastRes.face}
                    updateFirebase={updateFirebase}
                  />
                )}
              </>
            );

          case "Advance Deploy Scion: Choose Element":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectElement
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Advance Deploy Scion: Float Skill":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <FloatSkill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Appoint - Upgraded":
            if (self === lastRes.unit.player) {
              resolutionUpdate(appointShield(lastRes.unit));
            }
            break;

          case "Beseech - Upgraded":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <YouMayNoYes
                    details={lastRes.details}
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
                    reroll={lastRes.reroll}
                  />
                )}
              </>
            );

          case "Strike Movement":
            if (self === lastRes.attacker.player) {
              resolutionUpdate(strikeMove(lastRes.attacker, lastRes.zone));
            }
            break;

          case "Rooted Traverse":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Rooted Aether-blast":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Rooted Traverse Movement":
            if (self === lastRes.unit.player) {
              updateLocalState(
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
              updateLocalState(
                unitFloatSkill(lastRes.unit, lastRes.skill, lastRes.resonator)
              );
            }
            break;

          case "May float resonant skill":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <MayFloatResonantSkill
                    player={lastRes.player}
                    skill={lastRes.skill}
                    resonator={lastRes.resonator}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Retain resonant skill unit":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <>
                    {updateLocalState(
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
                {self === lastRes.player && !hideModal && (
                  <InspectSkill
                    details={lastRes.details}
                    hideOrRevealModale={hideOrRevealModale}
                    updateFirebase={updateFirebase}
                  />
                )}
              </>
            );

          case "Revealing Skill":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <ViewRevealedSkill
                    skill={lastRes.skill}
                    title={lastRes.title}
                    message={lastRes.message}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Message To Player":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <MessageToPlayer
                    title={lastRes.title}
                    message={lastRes.message}
                    updateFirebase={updateFirebase}
                  />
                )}
              </>
            );

          case "Battle Cry":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectSkillHandMulti
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectTacticViaEffect
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Afterburner":
            if (self === lastRes.unit.player) {
              updateLocalState(afterburner1(lastRes.unit));
            }
            break;

          case "Afterburner1":
            if (self === lastRes.unit.player) {
              updateLocalState(afterburner2(lastRes.unit));
            }
            break;

          case "Activating Fiery Heart":
            if (self === lastRes.unit.player) {
              updateLocalState(fieryHeart1(lastRes.unit));
            }
            break;

          case "Fiery Heart1":
            if (self === lastRes.unit.player) {
              updateLocalState(fieryHeart2(lastRes.unit));
            }
            break;

          case "Activating Hydrotherapy":
            if (self === lastRes.unit.player) {
              updateLocalState(hydrotherapy1(lastRes.unit));
            }
            break;

          case "Hydrotherapy1":
            if (self === lastRes.unit.player) {
              updateLocalState(hydrotherapy2());
            }
            break;

          case "Activating Cold Embrace":
            if (self === lastRes.unit.player) {
              updateLocalState(coldEmbrace1(lastRes.unit));
            }
            break;

          case "Cold Embrace1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Reap the Whirlwind":
            if (self === lastRes.unit.player) {
              updateLocalState(reapTheWhirlwind1(lastRes.unit));
            }
            break;

          case "Activating Air Dash":
            if (self === lastRes.unit.player) {
              updateLocalState(airDash1(lastRes.unit));
            }
            break;

          case "Air Dash1":
            if (self === lastRes.unit.player) {
              updateLocalState(
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
              updateLocalState(fortify1(lastRes.unit));
            }
            break;

          case "Fortify1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <FloatSkill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Fortify2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Leyline Convergence":
            if (self === lastRes.unit.player) {
              updateLocalState(leylineConvergence1(lastRes.unit));
            }
            break;

          case "Leyline Convergence1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Galvanize":
            if (self === lastRes.unit.player) {
              updateLocalState(galvanize1(lastRes.unit));
            }
            break;

          case "Galvanize1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Arc Flash":
            if (self === lastRes.unit.player) {
              resolutionUpdate(arcFlash1(lastRes.unit));
            }
            break;

          case "Arc Flash1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Arc Flash2":
            if (self === lastRes.unit.player) {
              updateLocalState(arcFlash2(lastRes.unit));
            }
            break;

          case "Arc Flash3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Particle Beam":
            if (self === lastRes.unit.player) {
              updateLocalState(particleBeam1(lastRes.unit));
            }
            break;

          case "Particle Beam1":
            if (self === lastRes.unit.player) {
              updateLocalState(particleBeam2(lastRes.unit));
            }
            break;

          case "Particle Beam2":
            if (self === lastRes.unit.player) {
              updateLocalState(particleBeam3(lastRes.unit));
            }
            break;

          case "Activating Amplify Aura":
            if (self === lastRes.unit.player) {
              updateLocalState(auraAmplication1(lastRes.unit));
            }
            break;

          case "Activating Brandish":
            if (self === lastRes.unit.player) {
              updateLocalState(brandish1(lastRes.unit));
            }
            break;

          case "Brandish1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Ballistic Armor":
            if (self === lastRes.unit.player) {
              updateLocalState(ballisticArmor1(lastRes.unit));
            }
            break;

          case "Ballistic Armor1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Flourish":
            if (self === lastRes.unit.player) {
              updateLocalState(flourish1(lastRes.unit));
            }
            break;

          case "Flourish1":
            if (self === lastRes.unit.player) {
              updateLocalState(flourish2(lastRes.unit));
            }
            break;

          case "Activating Ambrosia":
            if (self === lastRes.unit.player) {
              updateLocalState(ambrosia1(lastRes.unit));
            }
            break;

          //end of abilities
        }
        break;

      case "Unit Talent":
        switch (lastRes.resolution2) {
          case "Activating Kleptothermy":
          case "Activating Mountain Stance":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Eternal Ember":
          case "Activating From the Ashes":
          case "Activating Lightning Rod":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Ambiance Assimilation":
          case "Activating Mana Feedback":
          case "Activating Conduction":
          case "Activating Everblooming":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Second Wind":
            if (self === lastRes.unit.player) {
              updateLocalState(secondWind1());
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
              updateLocalState(applySkill("ignitionPropulsion1", lastRes.unit));
            }
            break;

          case "Ignition Propulsion1":
            if (self === lastRes.unit.player) {
              selectEnemies(lastRes.unit, 1, null, "strike", null);
            }
            break;

          case "Ignition Propulsion2":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("ignitionPropulsion2", lastRes.unit));
            }
            break;

          case "Activating Conflagration":
            if (self === lastRes.unit.player) {
              updateLocalState(
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
              updateLocalState(applySkill("conflagrationR1", lastRes.unit));
            }
            break;

          case "ConflagrationR2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Blaze of Glory":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("blazeOfGlory1", lastRes.unit));
            }
            break;

          case "Blaze of Glory1":
            if (self === lastRes.unit.player) {
              selectEnemies(lastRes.unit, 1, null, "ignite", null);
            }
            break;

          case "Blaze of Glory2":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("blazeOfGlory2", lastRes.unit));
            }
            break;

          case "Blaze of Glory3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Resplendence":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("resplendence1", lastRes.unit));
            }
            break;

          case "Resplendence1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Resplendence2":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("resplendence2", lastRes.unit));
            }
            break;

          case "Resplendence3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
              updateLocalState(applySkill("purification1", lastRes.unit));
            }
            break;

          case "Purification1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
              updateLocalState(
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
              updateLocalState(applySkill("frigidBreath2", lastRes.unit));
            }
            break;

          case "Frigid Breath3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <FloatSkill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
              updateLocalState(applySkill("frigidBreathR2", lastRes.unit));
            }
            break;

          case "Frigid BreathR2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Frigid BreathR3":
            if (self === lastRes.unit.player) {
              resolutionUpdate(applySkill("frigidBreathR3", lastRes.unit));
            }
            break;

          case "Select Healing Rain Activator":
            if (self === lastRes.player) {
              selectHealingRainActivator(lastRes.victim);
            }
            break;

          case "Activating Healing Rain":
            if (self === lastRes.unit.player) {
              updateLocalState(
                applySkill("healingRain1", lastRes.unit, lastRes.victim)
              );
            }
            break;

          case "Healing Rain1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Healing Rain2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Glacial Torrent":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("glacialTorrent1", lastRes.unit));
            }
            break;

          case "Glacial Torrent 1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <GlacialTorrent
                    unit={lastRes.unit}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
              updateLocalState(applySkill("aerialImpetus1", lastRes.unit));
            }
            break;

          case "Aerial Impetus1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Aerial Impetus Float":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <FloatSkill
                    unSkippable={true}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Aerial Impetus Select Ally":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("aerialImpetus2", lastRes.unit));
            }
            break;

          case "Aerial Impetus Prompt":
            if (self === lastRes.unit.player) {
              selectAerialImpetusMove(lastRes.unit, "Ally");
            }
            break;

          case "Aerial Impetus Purge":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("aerialImpetus2E", lastRes.victim));
            }
            break;

          case "Aerial Impetus Purge Move":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    player={lastRes.player}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectTacticViaEffect
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Gale Conjuration":
            if (self === lastRes.unit.player) {
              updateLocalState(
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
              updateLocalState(applySkill("galeConjurationR2", lastRes.unit));
            }
            break;

          case "Gale ConjurationR2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
              resolutionUpdate(
                applySkill("symphonicScreech1", lastRes.unit, lastRes.victim)
              );
            }
            break;

          case "Symphonic Screech Float":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Symphonic Screech2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Cataclysmic Tempest":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("cataclysmicTempest1", lastRes.unit));
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
              updateLocalState(applySkill("cataclysmicTempest2", lastRes.unit));
            }
            break;

          case "Cataclysmic Tempest3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Cataclysmic Tempest4":
            if (self === lastRes.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(applySkill("cataclysmicTempest3", lastRes.unit));
            }
            break;

          case "Cataclysmic Tempest Float":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <CataclysmicTempestFloat
                    floatCount={lastRes.floatCount}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Cataclysmic Tempest5":
            if (self === lastRes.unit.player) {
              resolutionUpdate(applySkill("cataclysmicTempest4", lastRes.unit));
            }
            break;

          case "Cataclysmic Tempest6":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Cataclysmic Tempest7":
            if (self === lastRes.unit.player) {
              resolutionUpdate(applySkill("cataclysmicTempest5", lastRes.unit));
            }
            break;
        }
        break;

      case "Land Skill":
        switch (lastRes.resolution2) {
          case "Activating Crystallization":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("crystallization1", lastRes.unit));
            }
            break;

          case "Crystallization1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Crystallization2":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("crystallization2", lastRes.unit));
            }
            break;

          case "Activating Upheaval":
            if (self === lastRes.unit.player) {
              updateLocalState(
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
              updateLocalState(applySkill("upheaval2", lastRes.unit));
            }
            break;

          case "Upheaval3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "UpheavalR1":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("upheavalR2", lastRes.unit));
            }
            break;

          case "UpheavalR2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "UpheavalR2.5":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "UpheavalR3":
            if (self === lastRes.unit.player) {
              updateLocalState(
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

          case "Select Pitfall Trap Activator":
            if (self === lastRes.player) {
              selectPitfallTrapActivator(lastRes.mover);
            }
            break;

          case "Activating Pitfall Trap":
            if (self === lastRes.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(
                applySkill("pitfallTrap1", lastRes.unit, lastRes.victim)
              );
            }
            break;

          case "Pitfall Trap1":
            if (self === lastRes.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(
                applySkill("pitfallTrap2", lastRes.unit, lastRes.victim)
              );
            }
            break;

          case "Pitfall Trap2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    victim={lastRes.victim}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Pitfall Trap3":
            if (self === lastRes.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(
                applySkill("pitfallTrap3", lastRes.unit, lastRes.victim)
              );
            }
            break;

          case "Activating Geomancy":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("geomancy1", lastRes.unit));
            }
            break;

          case "Geomancy1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Geomancy2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Geomancy3":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("geomancy2", lastRes.unit));
            }
            break;

          case "Geomancy4":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
              updateLocalState(applySkill("chainLightning1", lastRes.unit));
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
              updateLocalState(applySkill("chainLightning2", lastRes.unit));
            }
            break;

          case "Chain Lightning3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Chain Lightning4":
            if (self === lastRes.unit.player) {
              updateLocalState(
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
              updateLocalState(
                applySkill("zipAndZap1", lastRes.unit, lastRes.resonator)
              );
            }
            break;

          case "Zip And Zap1":
            if (self === lastRes.unit.player) {
              updateLocalState(
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
              updateLocalState(applySkill("zipAndZap2", lastRes.unit));
            }
            break;

          case "Zip And Zap3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Zip And ZapR1":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("zipAndZapR2", lastRes.unit));
            }
            break;

          case "Zip And ZapR2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Thunder Thaumaturge":
            if (self === lastRes.unit.player) {
              //Do not use UpdateGameStateOnly
              resolutionUpdate(
                applySkill(
                  "thunderThaumaturge1",
                  lastRes.unit,
                  lastRes.attacker
                )
              );
            }
            break;

          case "Thunder Thaumaturge1":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("thunderThaumaturge2", lastRes.unit));
            }
            break;

          case "Thunder Thaumaturge2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Valiant Spark":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("valiantSpark1", lastRes.unit));
            }
            break;

          case "Valiant Spark1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
              updateLocalState(applySkill("surge1", lastRes.unit));
            }
            break;

          case "Surge1":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectTacticViaEffect
                    unit={lastRes.unit}
                    details={lastRes.details}
                    setMovingSpecial={setMovingSpecial}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Surge2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    setMovingSpecial={setMovingSpecial}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Surge3":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("surge2", lastRes.unit));
            }
            break;

          case "Surge4":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    setMovingSpecial={setMovingSpecial}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Diffusion":
            if (self === lastRes.unit.player) {
              updateLocalState(
                applySkill("diffusion1", lastRes.unit, lastRes.resonator)
              );
            }
            break;

          case "Diffusion1":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectTacticViaEffect
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
              updateLocalState(applySkill("diffusion2", lastRes.unit));
            }
            break;

          case "Diffusion4":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "DiffusionR1":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("diffusionR2", lastRes.unit));
            }
            break;

          case "Select Aegis Activator":
            if (self === lastRes.player) {
              selectAegisActivator(lastRes.victim);
            }
            break;

          case "Activating Aegis":
            if (self === lastRes.unit.player) {
              updateLocalState(
                applySkill("aegis1", lastRes.unit, lastRes.victim)
              );
            }
            break;

          case "Aegis1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    victim={lastRes.victim}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Disruption Field":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("disruptionField1", lastRes.unit));
            }
            break;
        }
        break;

      case "Metal Skill":
        switch (lastRes.resolution2) {
          case "Activating Magnetic Shockwave":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("magneticShockwave1", lastRes.unit));
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
              updateLocalState(applySkill("magneticShockwave2", lastRes.unit));
            }
            break;

          case "Magnetic Shockwave2.1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Magnetic Shockwave3":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("magneticShockwave3", lastRes.unit));
            }
            break;

          case "Magnetic Shockwave3.1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMayNoYes
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Reinforce":
            if (self === lastRes.unit.player) {
              updateLocalState(
                applySkill("reinforce1", lastRes.unit, lastRes.resonator)
              );
            }
            break;

          case "Reinforce1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "ReinforceR1":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("reinforceR2", lastRes.unit));
            }
            break;

          case "Select Frenzy Blade Activator":
            if (self === lastRes.player) {
              selectFrenzyBladeActivator(lastRes.victim);
            }
            break;

          case "Activating Frenzy Blade":
            if (self === lastRes.unit.player) {
              updateLocalState(
                applySkill("frenzyBlade1", lastRes.unit, lastRes.victim)
              );
            }
            break;

          case "Frenzy Blade1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Frenzy Blade1.5":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("frenzyBlade2", lastRes.unit));
            }
            break;

          case "Frenzy Blade2":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Arsenal Onslaught":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("arsenalOnslaught1", lastRes.unit));
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
              updateLocalState(applySkill("arsenalOnslaught2", lastRes.unit));
            }
            break;

          case "Arsenal Onslaught3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectSkillReveal
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
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
              updateLocalState(applySkill("arsenalOnslaught3", lastRes.unit));
            }
            break;

          case "Arsenal Onslaught5":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Arsenal Onslaught6":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );
        }
        break;

      case "Plant Skill":
        switch (lastRes.resolution2) {
          case "Activating Sow And Reap":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("sowAndReap1", lastRes.unit));
            }
            break;

          case "Sow and Reap1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <SelectCustomChoice
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Sow and Reap Blast":
            if (self === lastRes.unit.player) {
              resolutionUpdate(applySkill("sowAndReap3", lastRes.unit));
            }
            break;

          case "Select Sow and Reap Striker":
            if (self === lastRes.unit.player) {
              resolutionUpdate(applySkill("sowAndReap4", lastRes.unit));
            }
            break;

          case "Sow and Reap Strike":
            if (self === lastRes.unit.player) {
              resolutionUpdate(applySkill("sowAndReap5", lastRes.unit));
            }
            break;

          case "Sow and Reap2":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("sowAndReap2", lastRes.unit));
            }
            break;

          case "Activating Efflorescence":
            if (self === lastRes.unit.player) {
              updateLocalState(
                applySkill("efflorescence1", lastRes.unit, lastRes.resonator)
              );
            }
            break;

          case "Efflorescence1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "EfflorescenceR1":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("efflorescenceR2", lastRes.unit));
            }
            break;

          case "Select Viridian Grave Activator":
            if (self === lastRes.player) {
              selectViridianGraveActivator(lastRes.victim);
            }
            break;

          case "Activating Viridian Grave":
            if (self === lastRes.unit.player) {
              updateLocalState(
                applySkill("viridianGrave1", lastRes.unit, lastRes.victim)
              );
            }
            break;

          case "Viridian Grave1":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Castle of Thorns":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("castleOfThorns1", lastRes.unit));
            }
            break;

          case "Castle Of Thorns1":
          case "Castle Of Thorns3":
            return (
              <>
                {self === lastRes.unit.player && !hideModal && (
                  <YouMaySpend1Skill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Castle Of Thorns2":
            if (self === lastRes.unit.player) {
              updateLocalState(applySkill("castleOfThorns2", lastRes.unit));
            }
            break;
        }
        break;

      case "Sovereign Standard Skill":
        switch (lastRes.resolution2) {
          case "Activating Heir’s Endeavor":
            if (self === lastRes.player) {
              updateLocalState(heirsEndeavor1());
            }
            break;

          case "Activating Tea for Two":
            if (self === lastRes.player) {
              updateLocalState(teaForTwo1());
            }
            break;

          case "Tea for Two1":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectCustomChoice
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Tea for Two2":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <>
                    {self === lastRes.player && !hideModal && (
                      <FloatSkill
                        unSkippable={true}
                        details={lastRes.details}
                        updateFirebase={updateFirebase}
                        hideOrRevealModale={hideOrRevealModale}
                      />
                    )}
                  </>
                )}
              </>
            );

          case "Activating Dark Halo":
            if (self === lastRes.player) {
              updateLocalState(darkHalo1());
            }
            break;

          case "Select Dark Halo":
            if (self === lastRes.player) {
              selectDarkHalo();
            }
            break;

          case "Activating Reminiscence":
            if (self === lastRes.player) {
              updateLocalState(reminiscence1());
            }
            break;

          case "Reminiscence1":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectCustomChoice
                    details={lastRes.details}
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
                  <SelectTacticViaEffect
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Foreshadow":
            if (self === lastRes.player) {
              updateLocalState(foreshadow1());
            }
            break;

          case "Foreshadow1":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectCustomChoice
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Foreshadow2":
            if (self === lastRes.player) {
              updateLocalState(foreshadow2(lastRes.discardedBurst));
            }
            break;

          case "Foreshadow Draw":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <YouMayNoYes
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Foreshadow3":
            if (self === lastRes.player) {
              updateLocalState(foreshadow3());
            }
            break;
        }
        break;

      case "Sovereign Resonant Skill":
        switch (lastRes.resolution2) {
          case "Activating Transmute":
            if (self === lastRes.player) {
              updateLocalState(transmute1(lastRes.resonator));
            }
            break;

          case "Transmute1":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectSkillHandMulti
                    resonated={lastRes.resonated}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "TransmuteR1":
            if (self === lastRes.player) {
              updateLocalState(transmuteR1(lastRes.skillsToShuffle));
            }
            break;

          case "Activating Ambidexterity":
            if (self === lastRes.player) {
              updateLocalState(ambidexterity1(lastRes.resonator));
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
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectTacticViaEffect
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "AmbidexterityR1":
            if (self === lastRes.player) {
              updateLocalState(ambidexterityR1(lastRes.unit));
            }
            break;

          case "Activating Providence":
            if (self === lastRes.player) {
              updateLocalState(providence1(lastRes.resonator));
            }
            break;

          case "Providence1":
            return (
              <>
                {self === localGameState.turnPlayer && !hideModal && (
                  <SelectTacticViaEffect
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Providence2":
            if (self === lastRes.player) {
              updateLocalState(providence2(lastRes.resonator));
            }
            break;

          case "Providence Recovery":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <YouMayNoYes
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "ProvidenceR1":
            if (self === lastRes.player) {
              updateLocalState(providenceR1(lastRes.resonator));
            }
            break;

          case "Activating Fervent Prayer":
            if (self === lastRes.player) {
              updateLocalState(ferventPrayer1(lastRes.resonator));
            }
            break;

          case "Fervent Prayer1":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <YouMayNoYes
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Fervent Prayer2":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectAvelhemHandMulti
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Fervent PrayerR1":
            if (self === lastRes.player) {
              updateLocalState(ferventPrayerR1());
            }
            break;

          case "Fervent PrayerR2":
            return (
              <>
                {self === lastRes.player && !hideModal && (
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
                {self === lastRes.player && !hideModal && (
                  <ViewRevealedSkill
                    avelhems={lastRes.avelhems}
                    multi={true}
                    message={lastRes.message}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Press the Attack":
            if (self === lastRes.player) {
              updateLocalState(pressTheAttack1(lastRes.resonator));
            }
            break;

          case "Press the Attack1":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <YouMayNoYes
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Press the Attack2":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <YouMayNoYes
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Heirs Endeavor Resonance":
            if (self === lastRes.player) {
              updateLocalState(heirsEndeavorResonance());
            }
            break;
        }
        break;

      case "Sovereign Contingent Skill":
        switch (lastRes.resolution2) {
          case "Activating Power at the Final Hour":
            if (self === lastRes.player) {
              updateLocalState(powerAtTheFinalHour1(lastRes.unit));
            }
            break;

          case "Power at the Final Hour":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectElement
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Power at the Final Hour2":
            if (self === lastRes.player) {
              updateLocalState(powerAtTheFinalHour2(lastRes.unit));
            }
            break;

          case "Power at the Final Hour3":
            if (self === lastRes.unit.player) {
              updateLocalState(powerAtTheFinalHour3(lastRes.unit));
            }
            break;

          case "Activating Fated Rivalry":
            if (self === lastRes.player) {
              updateLocalState(fatedRivalry1(lastRes.unit));
            }
            break;

          case "Select Fated Rivalry":
            if (self === lastRes.player) {
              selectFatedRivalry(lastRes.unit);
            }
            break;

          case "Fated Rivalry2":
            if (self === lastRes.unit.player) {
              updateLocalState(fatedRivalry2(lastRes.unit, lastRes.enemy));
            }
            break;

          case "Fated Rivalry3":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <SelectCustomChoice
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Match Made In Heaven":
            if (self === lastRes.player) {
              updateLocalState(matchMadeInHeaven1(lastRes.unit));
            }
            break;

          case "Select Match Made in Heaven Pawn":
            if (self === lastRes.unit.player) {
              selectMatchMadeInHeavenPawn(lastRes.unit);
            }
            break;

          case "Match Made in Heaven2":
            if (self === lastRes.unit.player) {
              updateLocalState(matchMadeInHeaven2(lastRes.unit, lastRes.unit2));
            }
            break;

          case "Match Made in Heaven3":
            if (self === lastRes.player) {
              updateLocalState(matchMadeInHeaven3());
            }
            break;

          case "Match Made in Heaven4":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <FloatSkill
                    unit={lastRes.unit}
                    details={lastRes.details}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Activating Vengeful Legacy":
            if (self === lastRes.player) {
              updateLocalState(vengefulLegacy1(lastRes.victim));
            }
            break;

          case "Select Vengeful Legacy":
            if (self === lastRes.player) {
              selectVengefulLegacy(lastRes.victim);
            }
            break;

          case "Vengeful Legacy2":
            if (self === lastRes.unit.player) {
              updateLocalState(vengefulLegacy2(lastRes.unit));
            }
            break;

          case "Activating Black Business Card":
            if (self === lastRes.player) {
              updateLocalState(blackBusinessCard1());
            }
            break;
        }

        break;

      case "Triggering Contingent Skill":
        switch (lastRes.resolution2) {
          case "Triggering Elimination Ally":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <ContingentTriggered
                    contingencyType="Elimination"
                    player={lastRes.player}
                    unit={lastRes.unit}
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
                {self === lastRes.player && !hideModal && (
                  <ContingentTriggered
                    contingencyType="Ascension"
                    player={lastRes.player}
                    unit={lastRes.unit}
                    team="ally"
                    scionClass={lastRes.scionClass}
                    method={lastRes.method}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Ascension Enemy":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <ContingentTriggered
                    contingencyType="Ascension"
                    player={lastRes.player}
                    unit={lastRes.unit}
                    team="enemy"
                    scionClass={lastRes.scionClass}
                    method={lastRes.method}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Elimination Enemy":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <ContingentTriggered
                    contingencyType="Elimination"
                    player={lastRes.player}
                    unit={lastRes.unit}
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
                {self === lastRes.player && !hideModal && (
                  <ContingentTriggered
                    contingencyType="Motion"
                    mover={lastRes.mover}
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Survival Ally":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <ContingentTriggered
                    contingencyType="Survival"
                    attacker={lastRes.attacker}
                    victim={lastRes.victim}
                    team="ally"
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Survival Enemy":
            return (
              <>
                {self === lastRes.player && !hideModal && (
                  <ContingentTriggered
                    contingencyType="Survival"
                    attacker={lastRes.attacker}
                    victim={lastRes.victim}
                    team="enemy"
                    updateFirebase={updateFirebase}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );

          case "Triggering Target":
            return (
              <>
                {self === lastRes.victim.player && !hideModal && (
                  <ContingentTriggered
                    contingencyType="Target"
                    updateFirebase={updateFirebase}
                    attacker={lastRes.attacker}
                    victim={lastRes.victim}
                    type={lastRes.type}
                    hideOrRevealModale={hideOrRevealModale}
                  />
                )}
              </>
            );
        }
        break;

      case "Triggering Activation":
        return (
          <>
            {self === lastRes.player && !hideModal && (
              <ContingentTriggered
                contingencyType="Activation"
                updateFirebase={updateFirebase}
                activator={lastRes.activator}
                screech={lastRes.screech}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "":
        if (self === "host" && !lastRes.resolution2) {
          return (
            <>
              <SelectFirstPlayer updateFirebase={updateFirebase} />
            </>
          );
        }
        break;

      case "Game Over":
        return (
          <>
            {!hideModal && (
              <VictoryScreen
                player={lastRes.player}
                updateFirebase={updateFirebase}
                hideOrRevealModale={hideOrRevealModale}
              />
            )}
          </>
        );

      case "Continue Game":
        return (
          <>
            {self === lastRes.player && !hideModal && (
              <YouMayNoYes
                details={lastRes.details}
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
  //Helper functions below

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
    }, 250);
  };

  const canCancel = () => {
    const curRes = localGameState.currentResolution;

    if (
      self === localGameState.turnPlayer &&
      curRes.length > 0 &&
      curRes[curRes.length - 1].resolution === "Deploying Pawn"
    ) {
      return true;
    }

    if (
      curRes.length > 0 &&
      ["Moving Unit", "Selecting Unit"].includes(
        curRes[curRes.length - 1].resolution2
      ) &&
      curRes[curRes.length - 1].canCancel
    ) {
      return true;
    }
  };

  const cancelAction = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //Deploy uses dice; move uses tactic
    const dice =
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .dice;

    if ([0, 1].includes(dice)) {
      newGameState.tactics[dice].stock += 1;
    }

    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));

    setValidZones([]);
    setTileMode(null);
  };

  const deployUnit = (r, c, unitClass) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    const deployingPawn =
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution === "Deploying Pawn";

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

    if (localGameState.turnPhase === "Acquisition") {
      newGameState.turnPhase = "Bounty";
      // newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Bounty Phase Selection",
      });

      newGameState[self].bountyPoints = Math.min(
        10,
        newGameState[self].bountyPoints + 1
      );

      if (newGameState[self].bountyUpgrades.acquisition >= 2) {
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

  const hideOrRevealModale = () => {
    setHideModal(!hideModal);
    setExpandedUnit(null);
  };

  const isYourTurn = () => {
    if (localGameState.currentResolution.length > 0) {
      const lastRes =
        localGameState.currentResolution[
          localGameState.currentResolution.length - 1
        ];

      if (lastRes.resolution === "Animation Delay") {
        return lastRes.priority === self;
      }

      if (lastRes.resolution2 === "Triggering Target") {
        return lastRes.victim.player === self;
      }

      if (lastRes.player) {
        return lastRes.player === self;
      }

      if (lastRes.unit) {
        return lastRes.unit.player === self;
      }

      if (lastRes.attacker) {
        return lastRes.attacker.player === self;
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

  const updateLocalState = (gameState) => {
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

    updateLocalState(
      enterMoveMode(getVacantAdjacentZones(unit), unit, newGameState, null)
    );

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

      case "aether-blast":
        newGameState = aetherBlast(
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
        break;

      case "healing rain":
        newGameState = activateHealingRain(newGameState, selectedUnit, unit);
        break;

      case "kleptothermy ally":
        newGameState[selectedUnit.player].units[
          selectedUnit.unitIndex
        ].aether = 1;
        break;

      case "kleptothermy enemy":
        newGameState[selectedUnit.player].units[
          selectedUnit.unitIndex
        ].aether = 0;
        break;

      case "hydrotherapy":
        let hydrotherapyAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        delete hydrotherapyAlly.afflictions.burn;
        delete hydrotherapyAlly.afflictions.frostbite;
        delete hydrotherapyAlly.afflictions.paralysis;
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

        delete galeConjurationEnemy.enhancements.shield;
        delete galeConjurationEnemy.enhancements.ward;
        delete galeConjurationEnemy.enhancements.disruption;

        if (isAdjacent(unit, galeConjurationEnemy)) {
          galeConjurationEnemy.aether = 0;
        }

        break;

      case "gale conjuration restore":
        let galeConjurationAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        galeConjurationAlly.aether = 1;
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

      case "amplify aura":
        newGameState[selectedUnit.player].units[
          selectedUnit.unitIndex
        ].aether = 0;

        if (
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex]
            .enhancements.shield > 0
        ) {
          newGameState[selectedUnit.player].units[
            selectedUnit.unitIndex
          ].enhancements.shield = Math.max(
            newGameState[selectedUnit.player].units[selectedUnit.unitIndex]
              .enhancements.shield,
            2
          );
        } else {
          newGameState[selectedUnit.player].units[
            selectedUnit.unitIndex
          ].enhancements.shield = 2;
        }
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
            resolution2: "Ambidexterity Conversion",
            details: {
              title: "Ambidexterity",
              message: "You may convert an Advance tactic into Invoke.",
              restriction: ["Advance"],
              stock: 1,
              reason: "Ambidexterity",
              canSkip: true,
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

      updateFirebase(newGameState);
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

      updateFirebase(newGameState);
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
    }, 250);
  };

  //=========================

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 124:
            return element1 === "End Button";

          ////////////////////////////
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 124:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  //====================================================================

  return (
    <div className="board-body">
      {zones && localGameState && (
        <div className="board-contents">
          <div className="board-physical">
            <div
              className={`board-space ${
                isYourTurn() ? "board-space-turn" : ""
              }`}
            >
              <AnimatePresence>
                {!showContent && (
                  <motion.div
                    key="LoadingImage"
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.75 },
                    }}
                    className="loading-image"
                  >
                    <LoadingImage
                      setShowContent={setShowContent}
                      percentLoaded={Math.round(
                        (imagesLoaded / totalImages) * 100
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <>
                {props.demo && (
                  <button
                    className={`redButton demo-switch-button ${
                      canClick("Switch Player Button") ? "demoClick" : ""
                    }`}
                    onClick={() => {
                      props.changeCurrentPlayer();
                      handleUpdateDemoGuide();
                    }}
                    style={{
                      visibility: ["Learn-overview", "Classes"].includes(
                        demoGuide
                      )
                        ? "hidden"
                        : "",
                    }}
                  >
                    Switch Player
                  </button>
                )}

                {["Learn-overview"].includes(demoGuide) && <DemoTextBox />}

                <div className="board-left">
                  <div className="board-left-buttons">
                    {props.userRole !== "spectator" && (
                      <>
                        {self === localGameState.turnPlayer &&
                          localGameState.currentResolution.length > 0 &&
                          localGameState.currentResolution[
                            localGameState.currentResolution.length - 1
                          ].resolution === "Execution Phase" && (
                            <>
                              <button
                                className={`redButton ${
                                  canClick("End Button") ? "demoClick" : ""
                                }`}
                                onClick={() => {
                                  resolutionUpdate(endExecutionPhase());
                                  handleUpdateDemoGuide();
                                }}
                              >
                                End Turn
                              </button>{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="question-icon"
                                onClick={() => setInfoPopUp("Final Phase")}
                                style={{ marginLeft: 10 }}
                              >
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                              </svg>
                            </>
                          )}

                        {canCancel() && (
                          <button
                            className={`redButton ${
                              canClick("Cancel Button") ? "demoClick" : ""
                            }`}
                            onClick={() => {
                              cancelAction();
                              handleUpdateDemoGuide();
                            }}
                          >
                            Cancel
                          </button>
                        )}

                        {hideModal && (
                          <button
                            className="redButton"
                            onClick={() => hideOrRevealModale()}
                            style={{
                              visibility:
                                demoGuide === "Learn-overview" ? "hidden" : "",
                            }}
                          >
                            Return to Message
                          </button>
                        )}

                        {(!props.demo || props.demoGame) && (
                          <div className="contingency-settings">
                            <button
                              className="redButton"
                              onClick={() => {
                                setOpenContingencySettings(true);
                              }}
                            >
                              Contingency Settings
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="activated-card-display">
                    <ActivatedSkills />
                  </div>
                </div>

                <div
                  className="board-center"
                  style={{
                    visibility:
                      demoGuide === "Learn-overview" && demoCount < 3
                        ? "hidden"
                        : "",
                  }}
                >
                  <div
                    className={`board-frame ${
                      !isYourTurn() ? "board-frame-enemy" : ""
                    }`}
                  >
                    <Board
                      expandedUnit={expandedUnit}
                      setExpandedUnit={setExpandedUnit}
                      setUnitInfor={setUnitInfor}
                      handleUpdateDemoGuide={handleUpdateDemoGuide}
                      userRole={props.userRole}
                      movingUnit={movingUnit}
                      movingSpecial={movingSpecial}
                      setMovingSpecial={setMovingSpecial}
                      moveUnit={moveUnit}
                      deployUnit={deployUnit}
                      tileMode={tileMode}
                      selectUnitReason={selectUnitReason}
                      selectUnitSpecial={selectUnitSpecial}
                      zones={zones}
                      validZones={validZones}
                      selectUnit={selectUnit}
                      deployClass={deployClass}
                      updateLocalState={updateLocalState}
                    />
                  </div>
                </div>

                {!(demoGuide === "Learn-overview" && demoCount < 5) &&
                  demoGuide !== "Classes" && (
                    <>
                      <div className="board-right">
                        <div className="hands-player">
                          <div className="skill-hand">
                            <SkillHandBack team={enemy} />
                          </div>
                          <div className="avel-hand">
                            <AvelhemHandBack team={enemy} />
                          </div>
                        </div>

                        <div className="deck-and-dice-container">
                          <div className="deck-container">
                            <div className="skill-container">
                              <div className="skill-container-item">
                                <PileOfCards
                                  team={enemy}
                                  pile={"skillRepertoire"}
                                />
                              </div>
                              <div className=" skill-container-item">
                                <PileOfCards
                                  team={enemy}
                                  pile={"skillVestige"}
                                />
                              </div>
                            </div>
                            <div
                              className="resource-points"
                              style={{
                                visibility:
                                  demoGuide === "Learn-overview" &&
                                  demoCount < 13
                                    ? "hidden"
                                    : "",
                              }}
                            >
                              <div className="fd-counter">
                                {" "}
                                FD: {localGameState[enemy].fateDefiance} / 6{" "}
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
                                <PileOfCards
                                  team={enemy}
                                  pile={"avelhemRepertoire"}
                                />
                              </div>
                              <div className="avel-discard avel-container-item">
                                <PileOfCards
                                  team={enemy}
                                  pile={"avelhemVestige"}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="dice-container"
                            style={{
                              pointerEvents:
                                props.userRole === "spectator" ? "none" : "",
                            }}
                          >
                            <SovereignTactics userRole={props.userRole} />
                            {props.userRole === "spectator" && (
                              <>
                                <div className="board-spectating-label">
                                  Spectating <br />
                                  <span className="guestName">
                                    {localGameState.guest.displayName}{" "}
                                  </span>
                                  <br />
                                  vs.
                                  <br />
                                  <span className="hostName">
                                    {localGameState.host.displayName}{" "}
                                  </span>
                                  <br />
                                </div>
                              </>
                            )}
                          </div>
                          <div className="deck-container">
                            <div className="skill-container">
                              <div className="skill-container-item">
                                <PileOfCards
                                  team={self}
                                  pile={"skillRepertoire"}
                                />
                              </div>
                              <div className="skill-container-item">
                                <PileOfCards
                                  team={self}
                                  pile={"skillVestige"}
                                  spectator={props.userRole === "spectator"}
                                />
                              </div>
                            </div>
                            <div
                              className="resource-points"
                              style={{
                                visibility:
                                  demoGuide === "Learn-overview" &&
                                  demoCount < 13
                                    ? "hidden"
                                    : "",
                              }}
                            >
                              <div className="fd-counter">
                                FD: {localGameState[self].fateDefiance} / 6{" "}
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
                                <PileOfCards
                                  team={self}
                                  pile={"avelhemRepertoire"}
                                />
                              </div>
                              <div className="avel-discard avel-container-item">
                                <PileOfCards
                                  team={self}
                                  pile={"avelhemVestige"}
                                  spectator={props.userRole === "spectator"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="hands-player">
                          <div className="skill-hand">
                            {props.userRole !== "spectator" && (
                              <PlayerSkillHand
                                updateFirebase={updateFirebase}
                              />
                            )}
                            {props.userRole === "spectator" && (
                              <SkillHandBack team={self} />
                            )}
                          </div>
                          <div className="avel-hand">
                            {props.userRole !== "spectator" && (
                              <PlayerAvelhemHand
                                updateFirebase={updateFirebase}
                              />
                            )}
                            {props.userRole === "spectator" && (
                              <AvelhemHandBack team={self} />
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                {currentResolutionPrompt()}

                {[10, 17, 18, 71, 78, 100, 101, 114, 115, 116].includes(
                  demoCount
                ) &&
                  demoGuide === "Learn-overview" && <DemoImage />}

                {unitInfor !== null && (
                  <UnitInfo unit={unitInfor} setUnitInfor={setUnitInfor} />
                )}
                {viewBP !== null && (
                  <ViewBPUpgrades team={viewBP} setViewBP={setViewBP} />
                )}

                {infoPopUp && (
                  <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />
                )}

                {magnifiedSkill && <ZoomCard cardInfo={magnifiedSkill} />}
              </>
            </div>
          </div>

          <div className="board-data">
            Initiator:{" "}
            {localGameState.turnPlayer !== null &&
              localGameState[localGameState.turnPlayer].displayName}
            <br />
            Turn Count: {localGameState.turnCount}
            <br />
            Phase: {localGameState.turnPhase}
            <br />
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
          </div>
        </div>
      )}

      {/* {magnifiedSkill && <ZoomCard cardInfo={magnifiedSkill} />} */}

      {openContingencySettings && (
        <ContingencySettings
          setOpenContingencySettings={setOpenContingencySettings}
          mobile={true}
        />
      )}
    </div>
  );
};

export default BoardArea;
