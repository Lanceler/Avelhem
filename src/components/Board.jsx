import "./Board.scss";

import React from "react";

import Tile from "./Tile";

import SelectFirstPlayer from "./modals/SelectFirstPlayer";

import { useState, useEffect } from "react";

import { db } from "../config/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

import AcquisitionPhaseSelection from "./modals/AcquisitionPhaseSelection";
import BountyStore from "./modals/BountyStore";
import CoordinationPhaseSelection from "./modals/CoordinationPhaseSelection";
import DefiancePhaseSelection from "./modals/DefiancePhaseSelection";

const Board = (props) => {
  const gameDoc = doc(db, "gameInfo", props.gameId);

  const [localGameState, setLocalGameState] = useState(null);

  const [zones, setZones] = useState([]);

  const [validZones, setValidZones] = useState([]);

  const [deployPawnMode, setDeployPawnMode] = useState(false);

  const [moveMode, setMoveMode] = useState(false);
  const [movingUnitIndex, setMovingUnitIndex] = useState(null);
  const [movingPlayer, setMovingPlayer] = useState(null);

  const [self, setSelf] = useState(null);
  const [enemy, setEnemy] = useState(null);

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
      setSelf("host");
      setEnemy("guest");
    } else if (props.userRole === "guest") {
      setSelf("guest");
      setEnemy("host");
    }
  }, []);

  useEffect(() => {
    console.log("local gamestate changed");
  }, [localGameState]);

  //Gets data regarding zones and units
  useEffect(() => {
    console.log("Updated local from database");
    setZones(JSON.parse(props.gameState.zones));
    setLocalGameState(props.gameState);
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
            {self === props.gameState.turnPlayer && (
              <AcquisitionPhaseSelection
                drawAvelhem={drawAvelhem}
                drawSkill={drawSkill}
                nextPhase={nextPhase}
                findNullUnitIndex={findNullUnitIndex}
                getVacantFrontier={getVacantFrontier}
                enterDeployMode={enterDeployMode}
                bountyUpgrades={localGameState[self].bountyUpgrades}
              />
            )}
          </>
        );
      case "Deploying Pawn":
        return (
          <>
            {self === localGameState.turnPlayer && !deployPawnMode && (
              <>
                {setDeployPawnMode(true)}
                {setValidZones(lastResolution.zoneIds)}
              </>
            )}
          </>
        );
      case "Deploying Pawn Ended":
        return (
          <>
            {self === localGameState.turnPlayer && (
              <>
                {popResolution()}
                {localGameState.turnPhase === "Acquisition" && nextPhase()}
              </>
            )}
          </>
        );

      case "Bounty Phase Selection":
        return (
          <>
            {self === props.gameState.turnPlayer && (
              <BountyStore
                nextPhase={nextPhase}
                bountyUpgrades={localGameState[self].bountyUpgrades}
                bountyPoints={localGameState[self].bountyPoints}
                fateDefiances={localGameState[self].fateDefiances}
                score={localGameState[self].score}
              />
            )}
          </>
        );
      case "Coordination Phase Selection":
        return (
          <>
            {self === props.gameState.turnPlayer && (
              <CoordinationPhaseSelection
                nextPhase={nextPhase}
                skillHandSize={localGameState[self].skillHand.length}
                bountyUpgradesC={
                  localGameState[self].bountyUpgrades.coordination
                }
                rollTactic={rollTactic}
                assignTactics={assignTactics}
              />
            )}
          </>
        );
      case "Defiance Phase Selection":
        return (
          <>
            {self === props.gameState.turnPlayer && (
              <DefiancePhaseSelection
                nextPhase={nextPhase}
                fateDefiances={localGameState[self].fateDefiances}
                rollTactic={rollTactic}
                assignTactics={assignTactics}
              />
            )}
          </>
        );

      case "Moving Unit":
        return (
          <>
            {self === localGameState.turnPlayer && !moveMode && (
              <>
                {setMoveMode(true)}
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

  const drawAvelhem = () => {
    console.log("drawAvelhem");

    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState[self].avelhemHand.push(
      newGameState[self].avelhemRepertoire.pop()
    );

    //To do: If deck empties, shuffle discard pile into it.

    setLocalGameState(newGameState);

    // updateFirebase(newGameState);
  };

  const drawSkill = () => {
    console.log("drawSkill");

    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState[self].skillHand.push(newGameState[self].skillRepertoire.pop());
    //To do: If deck empties, shuffle discard pile into it.

    setLocalGameState(newGameState);

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
    setMoveMode(false);
    setMovingUnitIndex(null);
    setMovingPlayer(null);

    setLocalGameState(newGameState);

    updateFirebase(newGameState);
  };

  const enterMoveMode = (zoneIds, unitIndex, player) => {
    console.log("enterMoveMode");
    console.log(zoneIds);

    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.push({
      resolution: "Moving Unit",
      zoneIds: zoneIds,
      player: player,
      unitIndex: unitIndex,
    });

    setLocalGameState(newGameState);

    // updateFirebase(newGameState);
  };

  const deployPawn = (r, c) => {
    console.log("deploy pawn on row" + r + " column" + c);

    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState[self].units[findNullUnitIndex()] = newPawnStats(
      self,
      findNullUnitIndex(),
      r,
      c
    );

    let newZoneInfo = [...zones];
    newZoneInfo[r][c].player = self;
    newZoneInfo[r][c].unitIndex = findNullUnitIndex();

    newGameState.zones = JSON.stringify(newZoneInfo);

    newGameState.currentResolution.pop();
    newGameState.currentResolution.push({
      resolution: "Deploying Pawn Ended",
    });

    setLocalGameState(newGameState);
    setValidZones([]);
    setDeployPawnMode(false);

    updateFirebase(newGameState);
  };

  const enterDeployMode = (zoneIds) => {
    console.log("enterDeployMode");

    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.push({
      resolution: "Deploying Pawn",
      zoneIds: zoneIds,
    });

    setLocalGameState(newGameState);

    // updateFirebase(newGameState);
  };

  const rollTactic = () => {
    const mobilizeLimit =
      3 + Math.floor(localGameState[self].bountyUpgrades.tactics / 3);

    const dieFaces = [
      { face: "advance", stock: 1 },
      { face: "advance", stock: 1 },
      { face: "mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "assault", stock: 1 },
      { face: "invoke", stock: 1 },
    ];

    return dieFaces[Math.floor(Math.random() * dieFaces.length)];
  };

  const assignTactics = (first, second) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.tactics = [first, second];

    setLocalGameState(newGameState);

    // updateFirebase(newGameState);
  };

  const endExecutionPhase = () => {
    nextPhase();
  };

  const popResolution = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    setLocalGameState(newGameState);

    // updateFirebase(newGameState);
  };

  const nextPhase = () => {
    console.log("Changing Phase");

    const newGameState = JSON.parse(JSON.stringify(localGameState));

    if (newGameState.turnPhase === "Acquisition") {
      newGameState.turnPhase = "Bounty";
      newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Bounty Phase Selection",
      });
    } else if (newGameState.turnPhase === "Bounty") {
      newGameState.turnPhase = "Coordination";
      newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Coordination Phase Selection",
      });
    } else if (newGameState.turnPhase === "Coordination") {
      newGameState.turnPhase = "Defiance";
      newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Defiance Phase Selection",
      });
    } else if (newGameState.turnPhase === "Defiance") {
      newGameState.turnPhase = "Execution";
      newGameState.currentResolution.pop();

      newGameState.currentResolution.push({
        resolution: "Execution Phase",
      });
    } else if (newGameState.turnPhase === "Execution") {
      newGameState.turnPhase = "Final";
      newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Final Phase Conclusion",
      });
    } else if (newGameState.turnPhase === "Final") {
      newGameState.turnPhase = "Acquisition";
      if (newGameState.turnPlayer === "host") {
        newGameState.turnPlayer = "guest";
      } else {
        newGameState.turnPlayer = "host";
      }
      newGameState.currentResolution.pop();
      newGameState.currentResolution.push({
        resolution: "Acquisition Phase Selection",
      });
    }

    setLocalGameState(newGameState);

    updateFirebase(newGameState);
  };

  const findNullUnitIndex = () => {
    let nullIndex = -1;

    nullIndex = localGameState[self].units.indexOf(null);
    if (nullIndex === -1) {
      nullIndex = localGameState[self].units.length;
    }
    return nullIndex;
  };

  const getZonesInRange = (cRow, cColumn, range, includeSelf) => {
    let zonesInRange = [];

    for (let r = cRow - range; r <= cRow + range; r++) {
      if (r < 0) {
        r = 0;
      }

      if (r > 9) {
        break;
      } else {
        for (let c = cColumn - range; c <= cColumn + range; c++) {
          if (c < 0) {
            c = 0;
          }
          if (c > 4) {
            break;
          } else {
            zonesInRange.push(zones[r][c].id);
          }
        }
      }
    }

    if (!includeSelf) {
      zonesInRange = zonesInRange.filter((z) => z !== zones[cRow][cColumn].id);
    }

    console.log("zonesInRange");
    console.log(zonesInRange);

    return [...zonesInRange];
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

    validZones = validZones.filter((zone) => !zone.player);

    console.log(validZones);

    let validZonesIds = [];

    for (let i = 0; i < validZones.length; i++) {
      validZonesIds.push(validZones[i].id);
    }

    console.log(validZonesIds);

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

    setLocalGameState(newGameState);

    console.log(newGameState);

    updateFirebase(newGameState);
  };

  //====================================================================
  //====================================================================

  return (
    <>
      {localGameState && (
        <div>
          Turn Player: {props.gameState.turnPlayer}
          <br />
          Phase: {props.gameState.turnPhase}
          <br />
          Resolution:{" "}
          {props.gameState.currentResolution.length > 0 &&
            props.gameState.currentResolution[
              props.gameState.currentResolution.length - 1
            ].resolution}
          <br />
          {JSON.stringify(deployPawnMode)} {validZones.length}
          <br />
          {JSON.stringify(moveMode)} {validZones.length}
          {!props.gameState.turnPlayer && self === "host" && (
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
                        <div
                          className="cardThickness"
                          style={{
                            height: `${
                              (props.gameState[self].skillRepertoire.length -
                                1) *
                              0.2
                            }px`,
                          }}
                        ></div>
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
                  <div className="hand-container">
                    {props.gameState[self].skillHand.map((card, index) => (
                      <div key={index} className="handCard">
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="middle-container">
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
                      userRole={self}
                      key={zone.id}
                      zone={zone}
                      hostUnits={localGameState.host.units}
                      guestUnits={localGameState.guest.units}
                      deployPawnMode={deployPawnMode}
                      validZones={validZones}
                      deployPawn={deployPawn}
                      turnPlayer={localGameState.turnPlayer}
                      getZonesInRange={getZonesInRange}
                      moveMode={moveMode}
                      enterMoveMode={enterMoveMode}
                      popResolution={popResolution}
                      movingUnitIndex={movingUnitIndex}
                      movingPlayer={movingPlayer}
                      moveUnit={moveUnit}
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
          Own Deck2:
          <>
            <div className="card"></div>
            <div
              className="cardThickness"
              style={{
                height: `${
                  (props.gameState[self].skillRepertoire.length - 1) * 0.2
                }px`,
              }}
            ></div>
          </>
          <br />
          Own Deck:
          <div style={{ position: "relative" }}>
            <div className="deck-container">
              {props.gameState[self].skillRepertoire
                .slice()
                .reverse()
                .map((card, index) => (
                  <div
                    key={index}
                    className="card-container"
                    // style={{ marginTop: `${index !== 0 ? 1 : 0}px` }}
                  >
                    <div className="card">
                      {/* {card} */}
                      {index === 0 ? card : null}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <br />
          <div className="hand-container">
            {props.gameState[self].skillHand.map((card, index) => (
              <div key={index} className="handCard">
                {card}
              </div>
            ))}
          </div>
          {currentResolutionPrompt()}
        </div>
      )}
    </>
  );
};

export default Board;
