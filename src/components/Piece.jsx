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
      {console.log(props[owner][props.unitIndex])}
      {props.player && (
        <div className="piece">
          <>
            {props[owner][props.unitIndex].player}
            <br />
            {/* {props[owner][props.unitIndex].unitIndex} */}
          </>
        </div>
      )}
    </>
  );
};

export default Piece;
