import React from "react";

import Tile from "./tile";

const Board = () => {
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

  let zones = [];

  for (let r = 0; r < 10; r++) {
    zones.push([]);
    for (let c = 0; c < 5; c++) {
      zones[r][c] = new Zone(r, c);
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

  //------------------------------------------------------------------------------

  //   zones[0][0].occupied = true;

  units[0][0] = new Unit(0, 0, 0, 0);

  units[0][0].move(1, 1);

  units[0][1] = new Unit(0, 1, 3, 2);

  return (
    <div className="tile-grid">
      {zones.map((row, rowIndex) =>
        row.map((zone, columnIndex) => (
          <div key={[rowIndex, columnIndex]}>
            <Tile zone={zone} />
          </div>
        ))
      )}
    </div>
  );
};

export default Board;
