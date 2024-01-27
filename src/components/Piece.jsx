import React from "react";

import "./Piece.css";

export const Piece = (props) => {
  return <div className="piece">{props.player}</div>;
};

export default Piece;
