import "./Board.scss";

import React from "react";

import Tile from "./Tile";

import SelectFirstPlayer from "./modals/SelectFirstPlayer";

import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import { updateSelf, updateEnemy } from "../redux/teams";
import { db } from "../config/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

import { useRecurringEffects } from "../hooks/useRecurringEffects";
import { useSkillEffects } from "../hooks/useSkillEffects";

import AcquisitionPhaseSelection from "./modals/AcquisitionPhaseSelection";
import BountyStore from "./modals/BountyStore";
import CoordinationPhaseSelection from "./modals/CoordinationPhaseSelection";
import DefiancePhaseSelection from "./modals/DefiancePhaseSelection";

import SelectSkillDiscard from "./modals/SelectSkillDiscard";
import TacticSelection from "./modals/TacticSelection";
import TacticAdvance from "./modals/TacticAdvance";
import TacticAssault from "./modals/TacticAssault";
import VirtueBlastBlock from "./modals/VirtueBlastBlock";

import ScionSkillSelect from "./modals/ScionSkillSelect";

import IgnitionPropulsion1 from "./skillModals/IgnitionPropulsion1";

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
  const [movingUnitIndex, setMovingUnitIndex] = useState(null);
  const [movingPlayer, setMovingPlayer] = useState(null);
  const [tacticUsed, setTacticUsed] = useState(null);
  const [expandedPiece, setExpandedPiece] = useState(null);

  const [hideModal, setHideModal] = useState(false);

  const {
    applyDamage,
    endFinalPhase,
    move,
    shuffleRepertoire,
    strike,
    virtueBlast,
  } = useRecurringEffects();

  const { ignitionPropulsionEffect1 } = useSkillEffects();

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
    console.log("local gamestate changed");
    setExpandedPiece(null);
  }, [localGameState]);

  //Gets data regarding zones and units
  useEffect(() => {
    console.log("Updated local from online");
    setZones(JSON.parse(props.gameState.zones));
    dispatch(updateState(props.gameState));
  }, [props.gameState]);

  //====================================================================
  //====================================================================
  //Current Resolution Prompt below

  const currentResolutionPrompt = () => {
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
                {setMovingUnitIndex(lastResolution.unitIndex)}
                {setMovingPlayer(lastResolution.player)}
                {setTacticUsed(lastResolution.tactic)}
              </>
            )}
          </>
        );

      case "Selecting Unit":
        return (
          <>
            {self === localGameState.turnPlayer &&
              tileMode !== "selectUnit" && (
                <>
                  {setTileMode("selectUnit")}
                  {setValidZones(lastResolution.zoneIds)}
                  {setMovingUnitIndex(lastResolution.unitIndex)}
                  {setMovingPlayer(lastResolution.player)}
                  {setTacticUsed(lastResolution.tactic)}
                  {setSelectUnitReason(lastResolution.reason)}
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

      case "Selecting Scion Skill":
        return (
          <>
            {self === lastResolution.unit.player} &&{" "}
            <ScionSkillSelect
              updateFirebase={updateFirebase}
              unit={lastResolution.unit}
            />
          </>
        );

      case "Skill Conclusion":
        return (
          <>
            {self === lastResolution.player && (
              <>
                {skillConclusion(
                  lastResolution.player,
                  lastResolution.skill,
                  lastResolution.conclusion
                )}
              </>
            )}
          </>
        );

      case "Activating Ignition Propulsion":
        return (
          <>
            {self === lastResolution.unit.player && (
              <>
                {dispatch(
                  updateState(ignitionPropulsionEffect1(lastResolution.unit))
                )}
                {updateFirebase(ignitionPropulsionEffect1(lastResolution.unit))}
              </>
            )}
          </>
        );

      case "Ignition Propulsion0":
        return (
          <>
            {self === lastResolution.unit.player && !hideModal && (
              <SelectSkillDiscard
                updateFirebase={updateFirebase}
                unit={lastResolution.unit}
                hideOrRevealModale={hideOrRevealModale}
              />
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

      case "Final Phase Conclusion":
        return (
          <>
            {self === localGameState.turnPlayer && (
              <>{resolveEndFinalPhase()}</>
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

  const activateTactic = (unit) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.push({
      resolution: "Activating Tactic",
      unit: unit,
    });

    dispatch(updateState(newGameState));

    // updateFirebase(newGameState);
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

  const enterMoveMode = (zoneIds, unitIndex, player, gameState, tactic) => {
    console.log("enterMoveMode");

    let newGameState = null;
    if (gameState) {
      newGameState = gameState;
    } else {
      newGameState = JSON.parse(JSON.stringify(localGameState));
    }

    newGameState.currentResolution.push({
      resolution: "Moving Unit",
      zoneIds: zoneIds,
      player: player,
      unitIndex: unitIndex,
      tactic: tactic,
    });

    dispatch(updateState(newGameState));

    // updateFirebase(newGameState);
  };

  const enterSelectUnitMode = (
    zoneIds,
    unitIndex,
    player,
    gameState,
    tactic,
    reason
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
      player: player,
      unitIndex: unitIndex,
      tactic: tactic,
      reason: reason,
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

  const moveUnit = (player, unitIndex, zoneId) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState = move(newGameState, player, unitIndex, zoneId);

    if (tacticUsed !== null) {
      newGameState.tactics[tacticUsed].stock--;

      if (tacticUsed === 0) {
        newGameState[player].units[unitIndex].temporary.used0thTactic = true;
      } else if (tacticUsed === 1) {
        newGameState[player].units[unitIndex].temporary.used1stTactic = true;
      }
    }

    setValidZones([]);
    setTileMode(null);
    setMovingUnitIndex(null);
    setMovingPlayer(null);
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

  const resolveApplyDamage = (attackerInfo, victimInfo, type, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    newGameState = applyDamage(
      newGameState,
      attackerInfo,
      victimInfo,
      type,
      special
    );

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const resolveEndFinalPhase = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = endFinalPhase(newGameState, self, enemy);
    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const selectUnit = (player, unitIndex, selectedUnit, reason) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (tacticUsed !== null) {
      newGameState.tactics[tacticUsed].stock--;
    }

    if (reason === "virtue-blast") {
      newGameState = virtueBlast(
        newGameState,
        newGameState[player].units[unitIndex],
        selectedUnit
      );
    } else if (reason === "strike") {
      newGameState = strike(
        newGameState,
        newGameState[player].units[unitIndex],
        selectedUnit
      );
    }

    setValidZones([]);
    setTileMode(null);
    setSelectUnitReason(null);
    setMovingUnitIndex(null);
    setMovingPlayer(null);
    setTacticUsed(null);

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  const selectExpandPiece = (id) => {
    setExpandedPiece(id);
  };

  const skillConclusion = (player, skill, conclusion) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    if (conclusion === "discard") {
      newGameState[player].skillVestige.push(skill);
    }

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
  };

  // const shuffleRepertoire = (repertoire) => {
  //   for (let i = repertoire.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [repertoire[i], repertoire[j]] = [repertoire[j], repertoire[i]];
  //   }
  //   return repertoire;
  // };

  //=========================
  //=========================
  const onSetFirstPlayer = async (choice) => {
    console.log("Set First Player");

    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.turnPlayer = choice;

    let hostSkillRepertoire = [...newGameState.host.skillRepertoire];
    hostSkillRepertoire = shuffleRepertoire(hostSkillRepertoire);
    let hostStartingHand = hostSkillRepertoire.splice(
      hostSkillRepertoire.length - 4,
      4
    );

    newGameState.host.skillHand = hostStartingHand;
    newGameState.host.skillRepertoire = hostSkillRepertoire;

    let hostAvelhemRepertoire = [...newGameState.host.avelhemRepertoire];
    newGameState.host.avelhemRepertoire = shuffleRepertoire(
      hostAvelhemRepertoire
    );
    let guestSkillRepertoire = [...newGameState.guest.skillRepertoire];
    guestSkillRepertoire = shuffleRepertoire(guestSkillRepertoire);

    let guestStartingHand = guestSkillRepertoire.splice(
      guestSkillRepertoire.length - 4,
      4
    );

    newGameState.guest.skillHand = guestStartingHand;
    newGameState.guest.skillRepertoire = guestSkillRepertoire;

    let guestAvelhemRepertoire = [...newGameState.guest.avelhemRepertoire];
    newGameState.guest.avelhemRepertoire = shuffleRepertoire(
      guestAvelhemRepertoire
    );

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
            <div className="right-container"></div>
            <div className="middle-container">
              {localGameState.host.units.map((unit, i) => (
                <div key={i}>
                  {unit && (
                    <div
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
                        movingUnitIndex={movingUnitIndex}
                        movingPlayer={movingPlayer}
                        tileMode={tileMode}
                        selectUnitReason={selectUnitReason}
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
                        movingUnitIndex={movingUnitIndex}
                        movingPlayer={movingPlayer}
                        tileMode={tileMode}
                        selectUnitReason={selectUnitReason}
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
                      movingUnitIndex={movingUnitIndex}
                      movingPlayer={movingPlayer}
                      moveUnit={moveUnit}
                      tileMode={tileMode}
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
                          {card}
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
                          {card}
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
                  {localGameState[self] && (
                    <div className="hand-container">
                      {localGameState[self].skillHand.map((card, index) => (
                        <div key={index} className="handCard">
                          {card}
                        </div>
                      ))}
                    </div>
                  )}
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
