import React from "react";
import "./Tile.css";

import Piece from "./Piece";

const Tile = (props) => {
  return (
    <div className={props.userRole !== "guest" ? "tile" : "tile reversed-tile"}>
      {!props.zone.player && (
        <>
          [{props.zone.row},{props.zone.column}]
        </>
      )}
      {props.zone.player && (
        <>
          {console.log("From tile: " + props.hostUnits)}
          {console.log("From tile: " + props.guestUnits)}

          <Piece
            player={props.zone.player}
            unitIndex={props.zone.unitIndex}
            hostUnits={props.hostUnits}
            guestUnits={props.guestUnits}
          />
        </>
      )}
    </div>
  );
};

export default Tile;
