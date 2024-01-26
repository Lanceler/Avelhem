import "./Board.scss";

import React from "react";

import Tile from "./Tile";

import SelectFirstPlayer from "./modals/SelectFirstPlayer";

import { useState, useEffect } from "react";

import { db } from "../config/firebaseConfig";

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

  class Zone {
    constructor(row, column) {
      this.row = row;
      this.column = column;
    }

    clearInfo() {
      this.player = null;
      this.index = null;
      this.occupied = false;
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
    constructor(player, index, row, column) {
      this.player = player;
      this.index = index;
      this.row = row;
      this.column = column;
      zones[row][column].player = player;
      zones[row][column].index = index;
      zones[row][column].occupied = true;

      this.hp = 1;
      this.virtue = true;
      this.enhancements = {};
      this.afflictions = {};
      this.boosts = {};
    }

    move(row, column) {
      if (zones[row][column].occupied) {
        console.log("Zone occupied. Unit did not move");
      } else {
        zones[this.row][this.column].clearInfo();
        this.row = row;
        this.column = column;
        zones[this.row][this.column].player = this.player;
        zones[this.row][this.column].index = this.index;
        zones[this.row][this.column].occupied = true;
      }
    }

    isMuted() {
      if (
        this.afflictions.anathema ||
        this.afflictions.paralysis ||
        this.afflictions.frostbite ||
        this.afflictions.infection
      ) {
        return true;
      } else {
        return false;
      }
    }

    isTargeted(method) {
      console.log(
        "Unit[" +
          this.player +
          "][" +
          this.index +
          "] was targeted via " +
          method +
          "."
      );
    }

    isDamaged(ap) {
      this.hp = this.hp - ap;

      if (this.hp <= 0) {
        this.isEliminated();
      } else {
        this.hasSurvived();
      }
    }

    isEliminated() {
      console.log(
        "Unit[" + this.player + "][" + this.index + "] was eliminated."
      );
    }

    hasSurvived() {
      console.log(
        "Unit[" + this.player + "][" + this.index + "] survived the attack."
      );
    }

    blast(target) {
      let ap = 1;

      target.isTargeted("blast");

      target.isDamaged(ap);
    }
  }

  class Pawn extends Unit {
    constructor(player, index, row, column) {
      super(player, index, row, column);
      this.unitClass = "Pawn";
    }

    ascend(scionClass) {
      unitList[this.player][this.index] = new scionClass(
        this.player,
        this.index,
        this.row,
        this.column
      );

      unitList[this.player][this.index].hp = this.hp;
      unitList[this.player][this.index].virtue = this.virtue;
      unitList[this.player][this.index].enhancements = JSON.parse(
        JSON.stringify(this.enhancements)
      );
      unitList[this.player][this.index].afflictions = JSON.parse(
        JSON.stringify(this.afflictions)
      );
      unitList[this.player][this.index].boosts = JSON.parse(
        JSON.stringify(this.boosts)
      );
    }
  }

  class FireScion extends Unit {
    constructor(player, index, row, column) {
      super(player, index, row, column);
      this.unitClass = "Fire Scion";
    }
  }

  var units = [[], []];

  // let zones = [];

  // for (let r = 0; r < 10; r++) {
  //   zones.push([]);
  //   for (let c = 0; c < 5; c++) {
  //     zones[r][c] = new Zone(r, c);
  //   }
  // }

  //------------------------------------------------------------------------------
  //   zones[0][0].occupied = true;

  // units[0][0] = new Unit(0, 0, 0, 0);

  // units[0][0].move(1, 1);

  // units[0][1] = new Unit(0, 1, 3, 2);

  const [zones, setZones] = useState([]);
  const [displayZones, setDisplayZones] = useState();
  const [ownRepertoire, setOwnRepertoire] = useState();

  useEffect(() => {
    setZones(JSON.parse(props.gameState.zones));
    setOwnRepertoire(props.gameState[props.userRole].skillRepertoire);
    console.log(props.gameState[props.userRole].skillRepertoire);
  }, [props.gameState]);

  useEffect(() => {
    if (props.userRole === "guest") {
      let zoneReversal = [...zones.reverse()];

      for (let row in zoneReversal) {
        zoneReversal[row].reverse();
      }

      setDisplayZones(zoneReversal);
    } else {
      setDisplayZones(zones);
    }
  }, [zones]);

  const onSetFirstPlayer = async (choice) => {
    try {
      let newGameState = JSON.parse(JSON.stringify(props.gameState));
      newGameState.turnPlayer = choice;
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
                  <div className="skill-used"></div>
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
            <div className="skill-hand"></div>
          </div>
        </div>
        <div className="middle-container"></div>
        <div className="phase-indicator"></div>
        <div className="right-container"></div>
      </div>
     
      <div className="tile-grid">
          {displayZones &&
            displayZones.map((row, rowIndex) =>
              row.map((zone, columnIndex) => (
                <div key={[rowIndex, columnIndex]}>
                  <Tile zone={zone} />
                </div>
              ))
            )}
        </div>
        <div className="deck-container">
        {ownRepertoire &&
          ownRepertoire.map((card, index) => (
            <div
              key={index}
              className="card"
              style={{
                zIndex: ownRepertoire.length - index,
                marginTop: `${index * 1}px`,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Board;
