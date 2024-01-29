import React from "react";

import "./Piece.css";

export const Piece = (props) => {
  let owner = "";

  if (props.player === "host") {
    owner = "hostUnits";
  } else if (props.player === "guest") {
    owner = "guestUnits";
  }

  return (
    <>
      {props.player && props[owner][props.unitIndex] && (
        <div
          className="piece"
          onClick={() => props.moveHostUnitUp(props.unitIndex)}
        >
          <>
            {props[owner][props.unitIndex].stats.player}
            <br />
            {props[owner][props.unitIndex].stats.unitIndex}
          </>
        </div>
      )}
    </>
  );
};

export default Piece;
