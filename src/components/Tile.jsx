import React from "react";
import "./Tile.css";

import Piece from "./Piece";

const Tile = (props) => {
  return (
    <div className="tile">
      <div>
        {!props.zone.occupied && `[${props.zone.row},${props.zone.column}]`}
      </div>
      <div>{props.zone.occupied && <Piece />}</div>
    </div>
  );
};

export default Tile;
