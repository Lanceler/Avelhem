import "./Board.scss";

import React from "react";

import Tile from "./Tile";

import SelectFirstPlayer from "./modals/SelectFirstPlayer";

import { useState, useEffect } from "react";

import { db } from "../config/firebaseConfig";

import { useCardDatabase } from "../hooks/useCardDatabase";

import { updateDoc, doc } from "firebase/firestore";

import AcquisitionPhaseSelection from "./modals/AcquisitionPhaseSelection";

const Board = (props) => {
  const gameDoc = doc(db, "gameInfo", props.gameId);

  const { avelhemCardList, skillCardList, getAvelhemById, getSkillById } =
    useCardDatabase();

  const [localGameState, setLocalGameState] = useState(null);

  const [zones, setZones] = useState([]);
  const [zonesClass, setZonesClass] = useState([]);

  const [hostUnits, setHostUnits] = useState([]);
  const [hostUnitsClass, setHostUnitsClass] = useState([]);
  const [guestUnits, setGuestUnits] = useState([]);
  const [guestUnitsClass, setGuestUnitsClass] = useState([]);

  const [updateFirebase, setUpdateFirebase] = useState(false);

  //====================================================================
  //====================================================================
  //UseEffects below

  useEffect(() => {
    console.log("local gamestate changed");
  }, [localGameState]);

  //Updates Firebase
  useEffect(() => {
    if (localGameState) {
      ("Uploading Local Changes");
      try {
        updateDoc(gameDoc, { gameState: localGameState });
      } catch (err) {
        console.log(err);
      }
    }
  }, [updateFirebase]);

  //Gets data regarding zones and units
  useEffect(() => {
    console.log("Updated local from database");
    setZones(JSON.parse(props.gameState.zones));
    setHostUnits(props.gameState.host.units);
    setGuestUnits(props.gameState.guest.units);
    setLocalGameState(props.gameState);
  }, [props.gameState]);

  //Converts zone data (Firebase) into classes
  useEffect(() => {
    if (zones.length) {
      console.log("Local update: zones");
      let z = [];
      for (let r = 0; r < 10; r++) {
        z.push([]);
        for (let c = 0; c < 5; c++) {
          let stats = zones[r][c];
          z[r][c] = new Zone(
            stats.row,
            stats.column,
            stats.player,
            stats.unitIndex
          );
        }
      }
      setZonesClass([...z]);
    }
  }, [zones]);

  //Converts hostUnit data (Firebase) into classes
  useEffect(() => {
    if (zonesClass.length) {
      console.log("Local update: host units");

      for (let i = 0; i < hostUnits.length; i++) {
        if (hostUnits[i].stats.unitClass === "Pawn") {
          console.log("NEW PAWN");
          setHostUnitsClass((prevHostUnits) => {
            const updatedHostUnits = [...prevHostUnits];
            updatedHostUnits[i] = new Pawn(hostUnits[i].stats);

            return updatedHostUnits;
          });
        }
      }
    }
  }, [hostUnits, zonesClass.length]);

  //Converts guestUnit data (Firebase) into classes
  useEffect(() => {
    if (zonesClass.length) {
      console.log("Local update: Guest units");

      for (let i = 0; i < guestUnits.length; i++) {
        if (guestUnits[i].stats.unitClass === "Pawn") {
          console.log("NEW PAWN");
          setGuestUnitsClass((prevGuestUnits) => {
            const updatedGuestUnits = [...prevGuestUnits];
            updatedGuestUnits[i] = new Pawn(guestUnits[i].stats);

            return updatedGuestUnits;
          });
        }
      }
    }
  }, [guestUnits, zonesClass.length]);

  //Gives prompts depending on current (latest) resolution

  useEffect(() => {
    console.log("current resolution changed");
  }, [props.gameState.currentResolution]);

  //====================================================================
  //====================================================================
  //Current Resolution Prompt below

  const currentResolutionPrompt = () => {
    let lastResolution = null;

    if (props.gameState.currentResolution.length > 0) {
      lastResolution =
        props.gameState.currentResolution[
          props.gameState.currentResolution.length - 1
        ].resolution;
    }

    switch (lastResolution) {
      case "Acquisition Phase Selection":
        return (
          <>
            {props.userRole === props.gameState.turnPlayer && (
              <AcquisitionPhaseSelection
                drawAvelhem={drawAvelhem}
                drawSkill={drawSkill}
                nextPhase={nextPhase}
              />
            )}
          </>
        );
    }
  };

  //====================================================================
  //====================================================================
  //Helper functions below

  const drawAvelhem = () => {
    console.log("drawAvelhem");

    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      if (props.userRole === "host") {
        newGameState.host.avelhemHand.push(
          newGameState.host.avelhemRepertoire.pop()
        );
      } else {
        newGameState.guest.avelhemHand.push(
          newGameState.guest.avelhemRepertoire.pop()
        );
      }
      return newGameState;
    });

    setUpdateFirebase(!updateFirebase);
  };

  const drawSkill = () => {
    console.log("drawSkill");

    setLocalGameState((prev) => {
      const newGameState = JSON.parse(JSON.stringify(prev));

      if (props.userRole === "host") {
        newGameState.host.skillHand.push(
          newGameState.host.skillRepertoire.pop()
        );
      } else {
        newGameState.guest.skillHand.push(
          newGameState.guest.skillRepertoire.pop()
        );
      }
      return newGameState;
    });

    setUpdateFirebase(!updateFirebase);
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
          resolution: "Bounty Phase Selection",
        });
      }

      return newGameState;
    });

    setUpdateFirebase(!updateFirebase);
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

      newGameState.host.units[0] = JSON.parse(
        JSON.stringify(
          new Pawn({ player: "host", unitIndex: 0, row: 6, column: 3 })
        )
      );

      newGameState.host.units[1] = JSON.parse(
        JSON.stringify(
          new Pawn({ player: "host", unitIndex: 1, row: 6, column: 2 })
        )
      );
      newGameState.host.units[2] = JSON.parse(
        JSON.stringify(
          new Pawn({ player: "host", unitIndex: 2, row: 6, column: 1 })
        )
      );

      newGameState.guest.units[0] = JSON.parse(
        JSON.stringify(
          new Pawn({ player: "guest", unitIndex: 0, row: 3, column: 3 })
        )
      );
      newGameState.guest.units[1] = JSON.parse(
        JSON.stringify(
          new Pawn({ player: "guest", unitIndex: 1, row: 3, column: 2 })
        )
      );
      newGameState.guest.units[2] = JSON.parse(
        JSON.stringify(
          new Pawn({ player: "guest", unitIndex: 2, row: 3, column: 1 })
        )
      );

      let newZoneInfo = [...zonesClass];
      newGameState.zones = JSON.stringify(newZoneInfo);

      newGameState.turnCount = 1;
      newGameState.turnPhase = "Acquisition";
      newGameState.currentResolution.push({
        resolution: "Acquisition Phase Selection",
      });

      return newGameState;
    });

    setUpdateFirebase(!updateFirebase);
  };

  //====================================================================
  //====================================================================
  //classes below

  class Zone {
    constructor(row, column, player, unitIndex) {
      this.row = row;
      this.column = column;
      this.player = player;
      this.unitIndex = unitIndex;
    }

    clearInfo() {
      this.player = null;
      this.unitIndex = null;
    }

    getZonesInRange(includeSelf, range) {
      let zonesInRange = [];

      for (let r = this.row - range; r <= this.row + range; r++) {
        if (r < 0) {
          r++;
        } else if (r > 9) {
          break;
        } else {
          for (let c = this.column - range; c <= this.column + range; c++) {
            if (c < 0) {
              c++;
            } else if (c > 4) {
              {
                break;
              }
            } else {
              zonesInRange.push([r, c]);
            }
          }
        }
      }

      if (!includeSelf) {
        zonesInRange = zonesInRange.filter(
          (zone) =>
            JSON.stringify(zone) !== JSON.stringify([this.row, this.column])
        );
      }

      return zonesInRange;
    }
  }

  class Unit {
    constructor(statInfo) {
      this.stats = statInfo;

      let tempZonesClass = [...zonesClass];

      tempZonesClass[statInfo.row][statInfo.column].player = statInfo.player;
      tempZonesClass[statInfo.row][statInfo.column].unitIndex =
        statInfo.unitIndex;

      setZonesClass(tempZonesClass);

      if (statInfo.player === "host") {
        setHostUnitsClass((prevHostUnits) => {
          const updatedHostUnits = [...prevHostUnits];
          updatedHostUnits[statInfo.unitIndex] = { stats: this.stats };

          return updatedHostUnits;
        });
      } else {
        setGuestUnitsClass((prevGuestUnits) => {
          const updatedGuestUnits = [...prevGuestUnits];
          updatedGuestUnits[statInfo.unitIndex] = { stats: this.stats };
          return updatedGuestUnits;
        });
      }
    }
  }

  class Pawn extends Unit {
    constructor(statInfo) {
      super(statInfo);
      this.stats.unitClass = "Pawn";
    }
  }

  //====================================================================
  //====================================================================

  return (
    <div>
      Turn Player: {props.gameState && props.gameState.turnPlayer}
      <br />
      Phase: {props.gameState && props.gameState.turnPhase}
      <br />
      Resolution:{" "}
      {props.gameState.currentResolution.length > 0 &&
        props.gameState.currentResolution[
          props.gameState.currentResolution.length - 1
        ].resolution}
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
                    {props.gameState[props.userRole].skillRepertoire.length && (
                      <>
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
                      </>
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
            {zonesClass &&
              zonesClass.map((row, rowIndex) =>
                row.map((zone, columnIndex) => (
                  <Tile
                    userRole={props.userRole}
                    key={[rowIndex, columnIndex]}
                    zone={zone}
                    hostUnits={hostUnitsClass}
                    guestUnits={guestUnitsClass}
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
      {props.gameState[props.userRole].skillRepertoire.length && (
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
      )}
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
  );
};

export default Board;
