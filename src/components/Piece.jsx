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
      {props.player && props.hostUnits && props.guestUnits && (
        <div className="piece">
          <>
            {props[owner][props.unitIndex].player}
            <br />
            {props[owner][props.unitIndex].unitIndex}
          </>
        </div>
      )}
    </>
  );
};

export default Piece;
