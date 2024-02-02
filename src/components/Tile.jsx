import React from "react";
import "./Tile.css";

import Piece from "./Piece";

const Tile = (props) => {
  let deployable = false;

  if (
    props.userRole === props.turnPlayer &&
    props.validDeployZones.includes(props.zone.id)
  ) {
    deployable = true;
  }

  const onClickTile = () => {
    if (deployable) {
      props.deployPawn(props.zone.row, props.zone.column);
    } else {
      props.getZonesInRange(props.zone.row, props.zone.column, 1, false);
    }
  };

  return (
    <div
      className={deployable ? "selectable" : ""}
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
              hostUnits={props.hostUnits}
              guestUnits={props.guestUnits}
              moveUnitUp={props.moveUnitUp}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Tile;
