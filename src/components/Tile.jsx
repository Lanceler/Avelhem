import React from "react";
import "./Tile.css";

import Piece from "./Piece";

const Tile = (props) => {
  let deployable = false;
  let movable = false;

  if (
    props.validZones.includes(props.zone.id) &&
    props.userRole === props.turnPlayer
  ) {
    if (props.deployPawnMode) {
      deployable = true;
    } else if (props.moveMode && !props.zone.player) {
      movable = true;
    }
  }

  let unit = null;
  if (props.zone.player === "host") {
    unit = props.hostUnits[props.zone.unitIndex];
  } else if (props.zone.player === "guest") {
    unit = props.guestUnits[props.zone.unitIndex];
  }

  const onClickTile = () => {
    if (deployable) {
      props.deployPawn(props.zone.row, props.zone.column);
    } else if (movable) {
      props.moveUnit(props.movingPlayer, props.movingUnitIndex, props.zone.id);
    } else {
      // props.getZonesInRange(props.zone.row, props.zone.column, 1, false);
    }
  };

  return (
    <div
      className={deployable || movable ? "selectable" : ""}
      onClick={() => onClickTile()}
    >
      <div
        className={`tile ${props.userRole !== "guest" ? "" : "reversed-tile"}`}
      >
        {!props.zone.player && (
          <>
            [{props.zone.row},{props.zone.column}]
          </>
        )}
        {props.zone.player && (
          <>
            <Piece
              player={props.zone.player}
              unitIndex={props.zone.unitIndex}
              unit={unit}
              enterMoveMode={props.enterMoveMode}
              moveMode={props.moveMode}
              deployPawnMode={props.deployPawnMode}
              getZonesInRange={props.getZonesInRange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Tile;
