import "./Board.scss";

import React from "react";

import Tile from "./Tile";

import SelectFirstPlayer from "./modals/SelectFirstPlayer";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import { updateSelf, updateEnemy } from "../redux/teams";
import { db } from "../config/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

import { useRecurringEffects } from "../hooks/useRecurringEffects";

import AcquisitionPhaseSelection from "./modals/AcquisitionPhaseSelection";
import BountyStore from "./modals/BountyStore";
import CoordinationPhaseSelection from "./modals/CoordinationPhaseSelection";
import DefiancePhaseSelection from "./modals/DefiancePhaseSelection";
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
  const [movingUnitIndex, setMovingUnitIndex] = useState(null);
  const [movingPlayer, setMovingPlayer] = useState(null);
  const [expandedPiece, setExpandedPiece] = useState(null);

  const { getZonesInRange } = useRecurringEffects();

  const newPawnStats = (player, index, row, column) => {
    return {
      stats: {
        player: player,
        unitIndex: index,
        row: row,
        column: column,
        unitClass: "pawn",
        hp: 1,
        virtue: 1,
        afflictions: {},
        enhancements: {},
      },
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
            {self === localGameState.turnPlayer && (
              <AcquisitionPhaseSelection
                getVacantFrontier={getVacantFrontier}
                enterDeployMode={enterDeployMode}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );

      case "Bounty Phase Selection":
        return (
          <>
            {self === localGameState.turnPlayer && (
              <BountyStore
                // bountyUpgrades={localGameState[self].bountyUpgrades}
                // bountyPoints={localGameState[self].bountyPoints}
                // fateDefiances={localGameState[self].fateDefiances}
                // score={localGameState[self].score}
                updateFirebase={updateFirebase}
              />
            )}
          </>
        );
      case "Coordination Phase Selection":
        return (
          <>
            {self === localGameState.turnPlayer && (
              <CoordinationPhaseSelection updateFirebase={updateFirebase} />
            )}
          </>
        );
      case "Defiance Phase Selection":
        return (
          <>
            {self === localGameState.turnPlayer && (
              <DefiancePhaseSelection updateFirebase={updateFirebase} />
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
              </>
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

  const selectExpandPiece = (id) => {
    setExpandedPiece(id);
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

  const endExecutionPhase = () => {
    nextPhase();
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

  const enterMoveMode = (zoneIds, unitIndex, player) => {
    console.log("enterMoveMode");

    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.push({
      resolution: "Moving Unit",
      zoneIds: zoneIds,
      player: player,
      unitIndex: unitIndex,
    });

    // setLocalGameState(newGameState);
    dispatch(updateState(newGameState));

    // updateFirebase(newGameState);
  };

  const moveUnit = (player, unitIndex, zoneId) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    let moverStats = newGameState[player].units[unitIndex].stats;

    let newZoneInfo = [...zones];

    //vacate current zone
    newZoneInfo[moverStats.row][moverStats.column].player = null;
    newZoneInfo[moverStats.row][moverStats.column].unitIndex = null;

    //enter new zone
    newZoneInfo[Math.floor(zoneId / 5)][zoneId % 5].player = moverStats.player;
    newZoneInfo[Math.floor(zoneId / 5)][zoneId % 5].unitIndex =
      moverStats.unitIndex;

    //stringify for firebase
    newGameState.zones = JSON.stringify(newZoneInfo);

    //update unit itself
    newGameState[player].units[unitIndex].stats.row = Math.floor(zoneId / 5);
    newGameState[player].units[unitIndex].stats.column = zoneId % 5;

    newGameState.currentResolution.pop();

    setValidZones([]);
    setTileMode(null);
    setMovingUnitIndex(null);
    setMovingPlayer(null);

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

      newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Acquisition Phase Selection",
      });
    }

    dispatch(updateState(newGameState));

    updateFirebase(newGameState);
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

  const shuffleRepertoire = (repertoire) => {
    for (let i = repertoire.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [repertoire[i], repertoire[j]] = [repertoire[j], repertoire[i]];
    }
    return repertoire;
  };

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

    // setLocalGameState(newGameState);
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
          {!localGameState.turnPlayer && self === "host" && (
            <SelectFirstPlayer onSetFirstPlayer={onSetFirstPlayer} />
          )}
          <div className="section">
            <div className="left-container">
              <div className="lc-player">
                <div className="avel-hand"></div>
                <div className="skill-hand"></div>
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
                <div className="avel-hand"></div>
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
            <div className="middle-container">
              {localGameState.host.units.map((unit, i) => (
                <div key={i}>
                  {unit.stats && (
                    <div
                      style={
                        self === "host"
                          ? {
                              position: "absolute",
                              zIndex: 100,
                              top: 12 + 78 * unit.stats.row,
                              left: 12 + 78 * unit.stats.column,
                            }
                          : {
                              position: "absolute",
                              zIndex: 100,
                              top: 12 + 78 * (9 - unit.stats.row),
                              left: 12 + 78 * (4 - unit.stats.column),
                            }
                      }
                    >
                      <Piece
                        unit={unit}
                        enterMoveMode={enterMoveMode}
                        getZonesInRange={getZonesInRange}
                        tileMode={tileMode}
                        id={i}
                        expandedPiece={expandedPiece}
                        selectExpandPiece={selectExpandPiece}
                      />
                    </div>
                  )}
                </div>
              ))}

              {localGameState.guest.units.map((unit, i) => (
                <div key={-i - 1}>
                  {unit.stats && (
                    <div
                      style={
                        self === "host"
                          ? {
                              position: "absolute",
                              zIndex: 100,
                              top: 12 + 78 * unit.stats.row,
                              left: 12 + 78 * unit.stats.column,
                            }
                          : {
                              position: "absolute",
                              zIndex: 100,
                              top: 12 + 78 * (9 - unit.stats.row),
                              left: 12 + 78 * (4 - unit.stats.column),
                            }
                      }
                    >
                      <Piece
                        unit={unit}
                        enterMoveMode={enterMoveMode}
                        getZonesInRange={getZonesInRange}
                        tileMode={tileMode}
                        id={-i - 1}
                        expandedPiece={expandedPiece}
                        selectExpandPiece={selectExpandPiece}
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
            <div className="phase-indicator"></div>
            <div className="right-container"></div>
          </div>
          <br />
          <br />
          {localGameState[self] && (
            <div className="hand-container">
              {localGameState[self].skillHand.map((card, index) => (
                <div key={index} className="handCard">
                  {card}
                </div>
              ))}
            </div>
          )}
          {currentResolutionPrompt()}
        </div>
      )}
    </>
  );
};

export default Board;
