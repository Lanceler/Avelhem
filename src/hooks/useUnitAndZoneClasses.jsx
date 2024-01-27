import React from "react";

export const useUnitAndZoneClasses = () => {
  class Zone {
    constructor(row, column, player, unitIndex) {
      this.stats = {
        row: row,
        column: column,
        player: player,
        unitIndex: unitIndex,
      };
    }

    clearInfo() {
      this.stats[player] = null;
      this.stats[unitIndex] = null;
    }

    getZonesInRange(includeSelf, range) {
      let zonesInRange = [];

      for (let r = this.stats[row] - range; r <= this.stats[row] + range; r++) {
        if (r < 0) {
          r++;
        } else if (r > 9) {
          break;
        } else {
          for (
            let c = this.stats[column] - range;
            c <= this.stats[column] + range;
            c++
          ) {
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
            JSON.stringify(zone) !==
            JSON.stringify([this.stats[row], this.stats[column]])
        );
      }

      return zonesInRange;
    }
  }

  return { Zone };
};
