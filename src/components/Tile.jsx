import React from "react";
import "./Tile.css";

import Piece from "./Piece";

const Tile = (props) => {
  return (
    <div className={props.userRole !== "guest" ? "tile" : "tile reversed-tile"}>
      {!props.zone.stats.player && (
        <>
          [{props.zone.stats.row},{props.zone.stats.column}]
        </>
      )}
      {props.zone.stats.player && (
        <>
          <Piece
            player={props.zone.stats.player}
            unitIndex={props.zone.stats.unitIndex}
          />
        </>
      )}
    </div>
  );
};

export default Tile;
