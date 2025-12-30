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

import SelectRepertoire from "./modals/SelectRepertoire";

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
  const { getTacticImage } = useGetImages();

  const [zones, setZones] = useState(null);
  const [validZones, setValidZones] = useState([]);
  const [tileMode, setTileMode] = useState(null);
  const [deployClass, setDeployClass] = useState(null);
  const [selectUnitReason, setSelectUnitReason] = useState(null);
  const [selectUnitSpecial, setSelectUnitSpecial] = useState(null);
  const [movingUnit, setMovingUnit] = useState(null);
  const [tacticUsed, setTacticUsed] = useState(null);
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [hideModal, setHideModal] = useState(false);

  const [unitInfor, setUnitInfor] = useState(null);
  const [viewBP, setViewBP] = useState(null);
  const [infoPopUp, setInfoPopUp] = useState(null);
  const [openContingencySettings, setOpenContingencySettings] = useState(false);

  const [userRole, setUserRole] = useState("specator");

  const {
    endExecutionPhase,
    move,
    newUnitStats,
    triggerMotion,
    uponDebutTalents,
  } = useRecurringEffects();

  const updateFirebase = (newGameState) => {
    if (userRole === "spectator") {
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

  const [enemyDP, setEnemyDP] = useState(0);
  const [enemyDPFlash, setEnemyDPFlash] = useState(false);
  const [selfDP, setSelfDP] = useState(0);
  const [selfDPFlash, setSelfDPFlash] = useState(false);

  const [enemyBP, setEnemyBP] = useState(0);
  const [enemyBPFlash, setEnemyBPFlash] = useState(false);
  const [selfBP, setSelfBP] = useState(0);
  const [selfBPFlash, setSelfBPFlash] = useState(false);

  const [die1, setDie1] = useState(null);
  const [die2, setDie2] = useState(null);
  const [die1Flash, setDie1Flash] = useState(false);
  const [die2Flash, setDie2Flash] = useState(false);

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
    let timer;
    if (!loadingImages) {
      timer = setTimeout(() => {
        setShowContent(true);
      }, 1750);
    }

    // Cleanup function
    return () => clearTimeout(timer);
  }, [loadingImages]);

  //====================================================================
  //UseEffects below
  useEffect(() => {
    dispatch(updateMagnifiedSkill(null));

    setUserRole(props.userRole);

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
    setTacticUsed(null);
    setExpandedUnit(null);

    if (localGameState) {
      setEnemyDP(localGameState[enemy].defiancePoints);
      setSelfDP(localGameState[self].defiancePoints);
      setEnemyBP(localGameState[enemy].bountyPoints);
      setSelfBP(localGameState[self].bountyPoints);
      setDie1(
        localGameState?.tactics[0]?.stock + localGameState?.tactics[0]?.face
      );
      setDie2(
        localGameState?.tactics[1]?.stock + localGameState?.tactics[1]?.face
      );
    }

    // if (localGameState) {
    //   console.log(JSON.stringify(localGameState.currentResolution));
    // }
  }, [localGameState, props.userRole]);

  useEffect(() => {
    setEnemyDPFlash(true);
    const timeout = setTimeout(() => setEnemyDPFlash(false), 1350);
    return () => clearTimeout(timeout);
  }, [enemyDP]);

  useEffect(() => {
    setSelfDPFlash(true);
    const timeout = setTimeout(() => setSelfDPFlash(false), 1350);
    return () => clearTimeout(timeout);
  }, [selfDP]);

  useEffect(() => {
    setEnemyBPFlash(true);
    const timeout = setTimeout(() => setEnemyBPFlash(false), 1350);
    return () => clearTimeout(timeout);
  }, [enemyBP]);

  useEffect(() => {
    setSelfBPFlash(true);
    const timeout = setTimeout(() => setSelfBPFlash(false), 1350);
    return () => clearTimeout(timeout);
  }, [selfBP]);

  useEffect(() => {
    setDie1Flash(true);
    const timeout = setTimeout(() => setDie1Flash(false), 1550);
    return () => clearTimeout(timeout);
  }, [die1]);

  useEffect(() => {
    setDie2Flash(true);
    const timeout = setTimeout(() => setDie2Flash(false), 1550);
    return () => clearTimeout(timeout);
  }, [die2]);

  useEffect(() => {
    if (demoGuide === "Learn-overview") {
      if ([8, 16, 88, 92, 122, 126].includes(demoCount)) {
        setHideModal(true);
      } else if ([14, 18, 89, 93, 123, 130].includes(demoCount)) {
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

    //Deployed via Assault
    const assaultUsed =
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .assault;

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
    }

    //Draw Avelhem via Assault
    if (assaultUsed) {
      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Assault - Avelhem Draw",
        player: self,
        details: {
          reason: "Assault - Avelhem Draw",
          title: "Assault",
          message: "You may draw 1 Avelhem.",
          no: "Skip",
          yes: "Draw",
        },
      });
    }

    if (newGameState[enemy].skillHand.length > 0 && triggerMotion(newUnit)) {
      //Trigger Motion Contingency
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
      // newGameState.tactics[tacticUsed].stock--;

      if (newGameState.tactics[tacticUsed].face === "Mobilize") {
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
    }

    setValidZones([]);
    setTileMode(null);
    setMovingUnit(null);
    setTacticUsed(null);
    dispatch(updateState(newGameState));
    updateFirebase(newGameState);
  };

  const updateLocalState = (gameState) => {
    dispatch(updateState(gameState));
  };

  const resolutionUpdate = (gameState) => {
    updateLocalState(gameState);
    updateFirebase(gameState);
  };

  const selectUnitEnd = (gameState) => {
    setValidZones([]);
    setTileMode(null);
    setSelectUnitReason(null);
    setSelectUnitSpecial(null);
    setMovingUnit(null);
    setTacticUsed(null);
    resolutionUpdate(gameState);
  };

  //=========================

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 38:
            return element2 === 0;
          case 44:
            return element2 === 1;
          case 63:
            return element1 === "?";
          case 120:
            return element1 === "End Button";
          //////////////////
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 38:
          case 44:
          case 63:
          case 120:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  //====================================================================

  const diceAndDeck = () => {
    return (
      <div className="deck-and-dice-container">
        <div className="deck-container">
          <div className="skill-container">
            <div className="skill-container-item">
              <PileOfCards team={enemy} pile={"skillRepertoire"} />
            </div>
            <div className=" skill-container-item">
              <PileOfCards team={enemy} pile={"skillVestige"} />
            </div>
          </div>
          <div
            className="resource-points"
            style={{
              visibility:
                demoGuide === "Learn-overview" && demoCount < 11
                  ? "hidden"
                  : "",
            }}
          >
            <div className={`fd-counter `}>
              <div
                className={`counter-flash ${enemyDPFlash ? "textFlash" : ""}`}
              >
                DP: {enemyDP} / 6{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="question-icon"
                  onClick={() => setInfoPopUp("DP")}
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                </svg>
              </div>
            </div>

            <div className={`bp-counter `} onClick={() => setViewBP("enemy")}>
              <div
                className={`counter-flash ${enemyBPFlash ? "textFlash" : ""}`}
              >
                BP: {enemyBP} / 10{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="eye-icon"
                >
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </div>
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
        <div
          className="dice-container"
          style={{
            pointerEvents: userRole === "spectator" ? "none" : "",
          }}
        >
          {sovereignTactics()}

          {userRole === "spectator" && (
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
              <PileOfCards team={self} pile={"skillRepertoire"} />
            </div>
            <div className="skill-container-item">
              <PileOfCards
                team={self}
                pile={"skillVestige"}
                spectator={userRole === "spectator"}
              />
            </div>
          </div>
          <div
            className="resource-points"
            style={{
              visibility:
                demoGuide === "Learn-overview" && demoCount < 11
                  ? "hidden"
                  : "",
            }}
          >
            <div className={`fd-counter `}>
              <div
                className={`counter-flash ${selfDPFlash ? "textFlash" : ""}`}
              >
                DP: {selfDP} / 6{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="question-icon"
                  onClick={() => setInfoPopUp("DP")}
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                </svg>
              </div>
            </div>

            <div className={`bp-counter `} onClick={() => setViewBP("self")}>
              <div
                className={`counter-flash ${selfBPFlash ? "textFlash" : ""}`}
              >
                BP: {selfBP} / 10{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="eye-icon"
                >
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="avel-container">
            <div className="avel-deck avel-container-item">
              <PileOfCards team={self} pile={"avelhemRepertoire"} />
            </div>
            <div className="avel-discard avel-container-item">
              <PileOfCards
                team={self}
                pile={"avelhemVestige"}
                spectator={userRole === "spectator"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const sovereignTactics = () => {
    const handleClick = (face, dice) => {
      if (
        localGameState.turnPlayer === self &&
        localGameState.currentResolution[
          localGameState.currentResolution.length - 1
        ].resolution === "Execution Phase"
      ) {
        let newGameState = JSON.parse(JSON.stringify(localGameState));

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Selecting Tactical Action - Sovereign",
          dice: dice,
          face: face,
        });

        dispatch(updateState(newGameState));
      }
    };

    const handleInfoClick = () => {
      setInfoPopUp("Tactics");
    };

    return (
      <div className="tacticSovereignContainer">
        {infoPopUp && (
          <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />
        )}
        <div className="tacticSovereignContainer-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`question-icon ${canClick("?") ? "demoClick" : ""}`}
            onClick={() => {
              handleInfoClick();
              handleUpdateDemoGuide();
            }}
            style={{
              pointerEvents: userRole === "spectator" ? "all" : "",
            }}
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
        </div>

        {localGameState.tactics.map((tactic, index) => (
          <div className={`tacticSovereignDice}`} key={index}>
            <div
              className={`tacticSovereignWrapper ${
                [die1Flash, die2Flash][index] ? "diceFlash" : ""
              }`}
            >
              <div
                className={` tacticSovereignBG ${
                  tactic.stock < 1 || localGameState.turnPlayer === enemy
                    ? "disabledtacticSovereignBG"
                    : ""
                } ${canClick("Tactic", index) ? "demoClick" : ""}
              
              `}
                onClick={() => {
                  handleClick(tactic.face, index);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  key={index}
                  className="tacticSovereign"
                  // style={{
                  //   backgroundImage: `url(${getTacticImage(tactic.face)})`,
                  // }}
                >
                  <div
                    className="tacticSovereignImage"
                    style={{
                      backgroundImage: `url(${getTacticImage("Invoke")})`,
                      opacity: `${tactic.face === "Invoke" ? 1 : 0}`,
                    }}
                  ></div>
                  <div
                    className="tacticSovereignImage"
                    style={{
                      backgroundImage: `url(${getTacticImage("Advance")})`,
                      opacity: `${tactic.face === "Advance" ? 1 : 0}`,
                    }}
                  ></div>
                  <div
                    className="tacticSovereignImage"
                    style={{
                      backgroundImage: `url(${getTacticImage("Assault")})`,
                      opacity: `${tactic.face === "Assault" ? 1 : 0}`,
                    }}
                  ></div>
                  <div
                    className="tacticSovereignImage"
                    style={{
                      backgroundImage: `url(${getTacticImage("Mobilize")})`,
                      opacity: `${tactic.face === "Mobilize" ? 1 : 0}`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <h2 className="tacticSovereignLabel">
              {tactic.face} ({tactic.stock})
            </h2>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="board-body">
      <div className="board-physical">
        <div className="board-space-wrapper">
          {zones && localGameState && (
            <div className="board-space">
              {props.playerStatus === "pick repertoire" && (
                <SelectRepertoire
                  onSelectRepertoire={props.onSelectRepertoire}
                  expansion={props.expansion}
                />
              )}

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
                          transition: { duration: 1.15 },
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
                    {props.demo && whoseTurnGlow() !== "self" && (
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
                        {userRole !== "spectator" && (
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
                        opacity:
                          demoGuide === "Learn-overview" && demoCount < 3
                            ? 0
                            : 1,
                        transition: "opacity 0.85s ease-in-out",
                      }}
                    >
                      <div
                        className={`board-frame ${
                          whoseTurnGlow() === "self" ? "board-frame-self" : ""
                        }`}
                      >
                        <Board
                          expandedUnit={expandedUnit}
                          setExpandedUnit={setExpandedUnit}
                          setUnitInfor={setUnitInfor}
                          handleUpdateDemoGuide={handleUpdateDemoGuide}
                          userRole={userRole}
                          movingUnit={movingUnit}
                          moveUnit={moveUnit}
                          deployUnit={deployUnit}
                          tileMode={tileMode}
                          selectUnitReason={selectUnitReason}
                          selectUnitSpecial={selectUnitSpecial}
                          selectUnitEnd={selectUnitEnd}
                          zones={zones}
                          validZones={validZones}
                          deployClass={deployClass}
                          tacticUsed={tacticUsed}
                          updateLocalState={updateLocalState}
                        />
                      </div>
                    </div>

                    <UseCurrentResolution
                      userRole={userRole}
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
                      setTacticUsed={setTacticUsed}
                    />

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

                            {diceAndDeck()}

                            <div className="hands-player">
                              <div className="skill-hand">
                                {userRole !== "spectator" && (
                                  <PlayerSkillHand
                                    updateFirebase={updateFirebase}
                                  />
                                )}
                                {userRole === "spectator" && (
                                  <SkillHandBack team={self} />
                                )}
                              </div>
                              <div className="avel-hand">
                                {userRole !== "spectator" && (
                                  <PlayerAvelhemHand
                                    updateFirebase={updateFirebase}
                                  />
                                )}
                                {userRole === "spectator" && (
                                  <AvelhemHandBack team={self} />
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                    {[16, 95, 96, 97, 98].includes(demoCount) &&
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

                  <>
                    {(() => {
                      const turn = whoseTurnGlow();
                      if (turn === "self")
                        return <div className="board-space-your-glow"></div>;
                      if (turn === "enemy")
                        return <div className="board-space-enemy-glow"></div>;
                      return null;
                    })()}
                  </>
                </>
              )}
            </div>
          )}
        </div>
      </div>

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
