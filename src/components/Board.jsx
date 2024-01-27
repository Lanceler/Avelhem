import "./Board.scss";

import React from "react";

import Tile from "./Tile";

import SelectFirstPlayer from "./modals/SelectFirstPlayer";

import { useState, useEffect } from "react";

import { db } from "../config/firebaseConfig";

import { useCardDatabase } from "../hooks/useCardDatabase";

import { useUnitAndZoneClasses } from "../hooks/useUnitAndZoneClasses";

import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Board = (props) => {
  const gameDoc = doc(db, "gameInfo", props.gameId);

  const { avelhemCardList, skillCardList, getAvelhemById, getSkillById } =
    useCardDatabase();
  const { Zone } = useUnitAndZoneClasses();

  const [zones, setZones] = useState([]);
  const [zonesClass, setZonesClass] = useState(null);

  const [hostUnits, setHostUnits] = useState([]);
  const [guestUnits, setGuestUnits] = useState([]);

  //Gets data regarding zones and units
  useEffect(() => {
    setZones(JSON.parse(props.gameState.zones));
    setHostUnits(props.gameState.host.units);
    setGuestUnits(props.gameState.guest.units);
  }, [props.gameState]);

  //Converts zone data (Firebase) into classes
  useEffect(() => {
    if (zones.length) {
      console.log(zones);
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
      console.log("z");
      console.log(z);

      setZonesClass([...z]);
      console.log("setZonesClass set");
    }
  }, [zones]);

  useEffect(() => {
    console.log("zonesClass");
    console.log(zonesClass);
  }, [zonesClass]);

  const shuffleRepertoire = (repertoire) => {
    for (let i = repertoire.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [repertoire[i], repertoire[j]] = [repertoire[j], repertoire[i]];
    }
    return repertoire;
  };

  const onSetFirstPlayer = async (choice) => {
    try {
      let newGameState = JSON.parse(JSON.stringify(props.gameState));

      newGameState.turnPlayer = choice;

      let hostSkillRepertoire = [...props.gameState.host.skillRepertoire];
      hostSkillRepertoire = shuffleRepertoire(hostSkillRepertoire);

      let hostStartingHand = hostSkillRepertoire.splice(
        hostSkillRepertoire.length - 4,
        4
      );

      newGameState.host.skillHand = hostStartingHand;
      newGameState.host.skillRepertoire = hostSkillRepertoire;

      let hostAvelhemRepertoire = [...props.gameState.host.avelhemRepertoire];
      newGameState.host.avelhemRepertoire = shuffleRepertoire(
        hostAvelhemRepertoire
      );

      let guestSkillRepertoire = [...props.gameState.guest.skillRepertoire];
      guestSkillRepertoire = shuffleRepertoire(guestSkillRepertoire);

      let guestStartingHand = guestSkillRepertoire.splice(
        guestSkillRepertoire.length - 4,
        4
      );

      newGameState.guest.skillHand = guestStartingHand;
      newGameState.guest.skillRepertoire = guestSkillRepertoire;

      let guestAvelhemRepertoire = [...props.gameState.guest.avelhemRepertoire];
      newGameState.guest.avelhemRepertoire = shuffleRepertoire(
        guestAvelhemRepertoire
      );

      newGameState.host.units = [
        { unitClass: "Pawn", row: 6, column: 3 },
        { unitClass: "Pawn", row: 6, column: 2 },
        { unitClass: "Pawn", row: 6, column: 1 },
      ];
      newGameState.guest.units = [
        { unitClass: "Pawn", row: 3, column: 3 },
        { unitClass: "Pawn", row: 3, column: 2 },
        { unitClass: "Pawn", row: 3, column: 1 },
      ];

      let newZoneInfo = JSON.parse(props.gameState.zones);
      newZoneInfo[6][3].player = "host";
      newZoneInfo[6][3].unitIndex = 0;
      newZoneInfo[6][2].player = "host";
      newZoneInfo[6][2].unitIndex = 1;
      newZoneInfo[6][1].player = "host";
      newZoneInfo[6][1].unitIndex = 2;

      newZoneInfo[3][3].player = "guest";
      newZoneInfo[3][3].unitIndex = 0;
      newZoneInfo[3][2].player = "guest";
      newZoneInfo[3][2].unitIndex = 1;
      newZoneInfo[3][1].player = "guest";
      newZoneInfo[3][1].unitIndex = 2;

      newGameState.zones = JSON.stringify(newZoneInfo);

      await updateDoc(gameDoc, { gameState: newGameState });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      Turn Player: {props.gameState && props.gameState.turnPlayer}
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
    </div>
  );
};

export default Board;
