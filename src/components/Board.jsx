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

const Board = (props) => {
  const gameDoc = doc(db, "gameInfo", props.gameId);

  const [localGameState, setLocalGameState] = useState(null);

  const [zones, setZones] = useState([]);

  const [gameStateReady, setGameStateReady] = useState(false);

  const [updateFirebase, setUpdateFirebase] = useState(false);

  const [deployPawnMode, setDeployPawnMode] = useState(false);
  const [validDeployZones, setValidDeployZones] = useState([]);

  //====================================================================
  //====================================================================
  //UseEffects below

  useEffect(() => {
    if (localGameState) {
      console.log("local gamestate changed");
      setGameStateReady(true);
    }
  }, [localGameState]);

  //Updates Firebase
  useEffect(() => {
    if (localGameState && updateFirebase) {
      ("Uploading Local Changes");
      try {
        updateDoc(gameDoc, { gameState: localGameState });
      } catch (err) {
        console.log(err);
      }
      setUpdateFirebase(false);
    }
  }, [updateFirebase]);

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
            {props.userRole === props.gameState.turnPlayer && (
              <AcquisitionPhaseSelection
                drawAvelhem={drawAvelhem}
                drawSkill={drawSkill}
                nextPhase={nextPhase}
                findNullUnitIndex={findNullUnitIndex}
                getVacantFrontier={getVacantFrontier}
                enterDeployMode={enterDeployMode}
                bountyUpgrades={localGameState[props.userRole].bountyUpgrades}
              />
            )}
          </>
        );
      case "Deploying Pawn":
        return (
          <>
            {props.userRole === localGameState.turnPlayer &&
              !deployPawnMode && (
                <>
                  {setDeployPawnMode(true)}
                  {setValidDeployZones(lastResolution.zoneIds)}
                </>
              )}
          </>
        );
      case "Deploying Pawn Ended":
        return (
          <>
            {props.userRole === localGameState.turnPlayer && (
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
            {props.userRole === props.gameState.turnPlayer && (
              <BountyStore
                nextPhase={nextPhase}
                bountyUpgrades={localGameState[props.userRole].bountyUpgrades}
                bountyPoints={localGameState[props.userRole].bountyPoints}
                fateDefiances={localGameState[props.userRole].fateDefiances}
                score={localGameState[props.userRole].score}
              />
            )}
          </>
        );

      case "Coordination Phase Selection":
        return (
          <>
            {props.userRole === props.gameState.turnPlayer && (
              <CoordinationPhaseSelection
                nextPhase={nextPhase}
                skillHandSize={localGameState[props.userRole].skillHand.length}
                bountyUpgradesC={
                  localGameState[props.userRole].bountyUpgrades.coordination
                }
                rollTactic={rollTactic}
                assignTactics={assignTactics}
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

  const drawAvelhem = () => {
    console.log("drawAvelhem");

    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      newGameState[props.userRole].avelhemHand.push(
        newGameState[props.userRole].avelhemRepertoire.pop()

        //To do: If deck empties, shuffle discard pile into it.
      );

      return newGameState;
    });

    // setUpdateFirebase(true);
  };

  const drawSkill = () => {
    console.log("drawSkill");

    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      newGameState[props.userRole].skillHand.push(
        newGameState[props.userRole].skillRepertoire.pop()

        //To do: If deck empties, shuffle discard pile into it.
      );
      // setUpdateFirebase(true);
      return newGameState;
    });
  };

  const moveUnitUp = (player, unitIndex) => {
    console.log("moveHostUnitUp");

    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      let newZoneInfo = [...zones];
      //vacate current zone
      newZoneInfo[newGameState[player].units[unitIndex].stats.row][
        newGameState[player].units[unitIndex].stats.column
      ].player = null;
      newZoneInfo[newGameState[player].units[unitIndex].stats.row][
        newGameState[player].units[unitIndex].stats.column
      ].unitIndex = null;

      //enter new zone
      newZoneInfo[newGameState[player].units[unitIndex].stats.row - 1][
        newGameState[player].units[unitIndex].stats.column
      ].player = newGameState[player].units[unitIndex].stats.player;
      newZoneInfo[newGameState[player].units[unitIndex].stats.row - 1][
        newGameState[player].units[unitIndex].stats.column
      ].unitIndex = newGameState[player].units[unitIndex].stats.unitIndex;

      //stringify for firebase
      newGameState.zones = JSON.stringify(newZoneInfo);

      //update unit itself
      newGameState[player].units[unitIndex].stats.row =
        newGameState[player].units[unitIndex].stats.row - 1;

      setUpdateFirebase(true);
      return newGameState;
    });
  };

  const deployPawn = (r, c) => {
    console.log("deploy pawn on row" + r + " column" + c);

    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      newGameState[props.userRole].units[findNullUnitIndex()] = {
        stats: {
          player: props.userRole,
          unitIndex: findNullUnitIndex(),
          row: r,
          column: c,
          unitClass: "pawn",
          hp: 1,
        },
      };

      let newZoneInfo = [...zones];
      newZoneInfo[r][c].player = props.userRole;
      newZoneInfo[r][c].unitIndex = findNullUnitIndex();

      newGameState.zones = JSON.stringify(newZoneInfo);

      newGameState.currentResolution.pop();

      newGameState.currentResolution.push({
        resolution: "Deploying Pawn Ended",
      });

      setUpdateFirebase((prev) => {
        setValidDeployZones([]);
        setDeployPawnMode(false);
        return true;
      });

      return newGameState;
    });
  };

  const enterDeployMode = (zoneIds) => {
    console.log("enterDeployMode");

    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      // newGameState.currentResolution.pop();

      newGameState.currentResolution.push({
        resolution: "Deploying Pawn",
        zoneIds: zoneIds,
      });
      // setUpdateFirebase(true);
      return newGameState;
    });
  };

  const rollTactic = () => {
    const mobilizeLimit =
      3 + Math.floor(localGameState[props.userRole].bountyUpgrades.tactics / 3);

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
    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      newGameState.tactics = [first, second];

      // setUpdateFirebase(true);
      return newGameState;
    });
  };

  const popResolution = () => {
    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      newGameState.currentResolution.pop();

      // setUpdateFirebase(true);
      return newGameState;
    });
  };

  const nextPhase = () => {
    console.log("Changing Phase");

    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

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
      } else if (newGameState.turnPhase === "Execution") {
        newGameState.turnPhase = "Final";
        newGameState.currentResolution.pop();
        newGameState.currentResolution.push({
          resolution: "Final Phase Selection",
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
      setUpdateFirebase(true);
      return newGameState;
    });
  };

  const findNullUnitIndex = () => {
    let nullIndex = -1;

    nullIndex = localGameState[props.userRole].units.indexOf(null);
    if (nullIndex === -1) {
      nullIndex = localGameState[props.userRole].units.length;
    }
    return nullIndex;
  };

  const getVacantFrontier = () => {
    let frontierLength =
      1 + localGameState[props.userRole].bountyUpgrades.frontier;

    let validZones = [];

    if (props.userRole === "host") {
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

    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      newGameState.turnPlayer = choice;

      let hostSkillRepertoire = [...prev.host.skillRepertoire];
      hostSkillRepertoire = shuffleRepertoire(hostSkillRepertoire);
      let hostStartingHand = hostSkillRepertoire.splice(
        hostSkillRepertoire.length - 4,
        4
      );

      newGameState.host.skillHand = hostStartingHand;
      newGameState.host.skillRepertoire = hostSkillRepertoire;

      let hostAvelhemRepertoire = [...prev.host.avelhemRepertoire];
      newGameState.host.avelhemRepertoire = shuffleRepertoire(
        hostAvelhemRepertoire
      );
      let guestSkillRepertoire = [...prev.guest.skillRepertoire];
      guestSkillRepertoire = shuffleRepertoire(guestSkillRepertoire);

      let guestStartingHand = guestSkillRepertoire.splice(
        guestSkillRepertoire.length - 4,
        4
      );

      newGameState.guest.skillHand = guestStartingHand;
      newGameState.guest.skillRepertoire = guestSkillRepertoire;

      let guestAvelhemRepertoire = [...prev.guest.avelhemRepertoire];
      newGameState.guest.avelhemRepertoire = shuffleRepertoire(
        guestAvelhemRepertoire
      );

      newGameState.host.units = [
        {
          stats: {
            player: "host",
            unitIndex: 0,
            row: 6,
            column: 0,
            unitClass: "pawn",
            hp: 1,
          },
        },
        {
          stats: {
            player: "host",
            unitIndex: 1,
            row: 6,
            column: 2,
            unitClass: "pawn",
            hp: 1,
          },
        },
        {
          stats: {
            player: "host",
            unitIndex: 2,
            row: 6,
            column: 4,
            unitClass: "pawn",
            hp: 1,
          },
        },
      ];

      newGameState.guest.units = [
        {
          stats: {
            player: "guest",
            unitIndex: 0,
            row: 3,
            column: 4,
            unitClass: "pawn",
            hp: 1,
          },
        },
        {
          stats: {
            player: "guest",
            unitIndex: 1,
            row: 3,
            column: 2,
            unitClass: "pawn",
            hp: 1,
          },
        },
        {
          stats: {
            player: "guest",
            unitIndex: 2,
            row: 3,
            column: 0,
            unitClass: "pawn",
            hp: 1,
          },
        },
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

      return newGameState;
    });

    setUpdateFirebase(true);
  };

  //====================================================================
  //====================================================================

  return (
    <>
      {gameStateReady && (
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
          {JSON.stringify(deployPawnMode)} {validDeployZones.length}
          {!props.gameState.turnPlayer && props.userRole === "host" && (
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
                  <div className="dice-results"></div>
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
                              (props.gameState[props.userRole].skillRepertoire
                                .length -
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
                    {props.gameState[props.userRole].skillHand.map(
                      (card, index) => (
                        <div key={index} className="handCard">
                          {card}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="middle-container">
              <div
                className={
                  props.userRole !== "guest"
                    ? "tile-grid"
                    : "tile-grid reversed-tile-grid"
                }
              >
                {zones.map((row, r) =>
                  row.map((zone, c) => (
                    <Tile
                      userRole={props.userRole}
                      key={zone.id}
                      zone={zone}
                      hostUnits={localGameState.host.units}
                      guestUnits={localGameState.guest.units}
                      deployPawnMode={deployPawnMode}
                      validDeployZones={validDeployZones}
                      deployPawn={deployPawn}
                      turnPlayer={localGameState.turnPlayer}
                      moveUnitUp={moveUnitUp}
                    />
                  ))
                )}
              </div>
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
                  (props.gameState[props.userRole].skillRepertoire.length - 1) *
                  0.2
                }px`,
              }}
            ></div>
          </>
          <br />
          Own Deck:
          <div style={{ position: "relative" }}>
            <div className="deck-container">
              {props.gameState[props.userRole].skillRepertoire
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
            {props.gameState[props.userRole].skillHand.map((card, index) => (
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
