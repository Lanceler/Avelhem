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
import { useGetImages } from "../hooks/useGetImages";

import ZoomCard from "./displays/ZoomCard";
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

import UseCurrentResolution from "../hooks/UseCurrentResolution";

const BoardArea = (props) => {
  const dispatch = useDispatch();

  const [gameDoc, setGameDoc] = useState(null);
  useEffect(() => {
    if (props.gameId) {
      setGameDoc(props.demo ? null : doc(db, "gameInfo", props.gameId));
    }
  }, [props.gameId]);

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
    applyBurnDamage,
    ascendPawn,
    avelhemToScion,
    blast,
    endExecutionPhase,
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
    strike,
    triggerMotion,
    uponDebutTalents,
    aetherBlast,
  } = useRecurringEffects();

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
    if (props.gameState) {
      setZones(JSON.parse(props.gameState.zones));
      dispatch(updateState(props.gameState));

      if (!props.demo) {
        setHideModal(false);
      }
    }
  }, [props.gameState]);

  useEffect(() => {
    setHideModal(false);
  }, [props.userRole]);

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

    if (deployingPawn) {
      newGameState.currentResolution.pop();
    }

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

  const whoseTurnGlow = () => {
    let x = "";

    if (localGameState.currentResolution.length > 0) {
      const lastRes =
        localGameState.currentResolution[
          localGameState.currentResolution.length - 1
        ];

      if (lastRes.resolution === "Animation Delay") {
        x = lastRes.priority;
      } else if (lastRes.resolution2 === "Triggering Target") {
        x = lastRes.victim.player;
      } else if (lastRes.player) {
        x = lastRes.player;
      } else if (lastRes.unit) {
        x = lastRes.unit.player;
      } else if (lastRes.attacker) {
        x = lastRes.attacker.player;
      } else {
        x = localGameState.turnPlayer;
      }

      if (x === self) {
        return "self";
      }

      if (x === enemy) {
        return "enemy";
      }
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

      case "raptor blitz purge":
        newGameState[selectedUnit.player].units[
          selectedUnit.unitIndex
        ].aether = 0;
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
            <div className={`board-space`}>
              {!["ready", "spectate"].includes(props.playerStatus) && (
                <>{props.gameInvite()}</>
              )}
              {["ready", "spectate"].includes(props.playerStatus) && (
                <>
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
                                className={`yellowButton ${
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
                                className="yellowButton"
                                onClick={() => hideOrRevealModale()}
                                style={{
                                  visibility:
                                    demoGuide === "Learn-overview"
                                      ? "hidden"
                                      : "",
                                }}
                              >
                                Return To Message
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
                      <div className={`board-frame `}>
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
                                    BP: {localGameState[enemy].bountyPoints} /
                                    10{" "}
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
                                    props.userRole === "spectator"
                                      ? "none"
                                      : "",
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

                    <UseCurrentResolution
                      userRole={props.userRole}
                      updateFirebase={updateFirebase}
                      hideModal={hideModal}
                      hideOrRevealModale={hideOrRevealModale}
                      updateLocalState={updateLocalState}
                      resolutionUpdate={resolutionUpdate}
                      setValidZones={setValidZones}
                      tileMode={tileMode}
                      setTileMode={setTileMode}
                      setDeployClass={setDeployClass}
                      setSelectUnitReason={setSelectUnitReason}
                      setSelectUnitSpecial={setSelectUnitSpecial}
                      setMovingUnit={setMovingUnit}
                      setMovingSpecial={setMovingSpecial}
                      setTacticUsed={setTacticUsed}
                    />

                    {[17, 71, 78, 100, 101].includes(demoCount) &&
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

                  {whoseTurnGlow() === "self" && (
                    <div className={`board-space-your-glow`}></div>
                  )}

                  {whoseTurnGlow() === "enemy" && (
                    <div className={`board-space-enemy-glow`}></div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

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
