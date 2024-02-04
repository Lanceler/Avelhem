import React from "react";

import "./Piece.css";

import FireScion from "../assets/scionIcons/FireScion.png";
import WaterScion from "../assets/scionIcons/WaterScion.png";
import WindScion from "../assets/scionIcons/WindScion.png";
import LandScion from "../assets/scionIcons/LandScion.png";

import MetalScion from "../assets/scionIcons/MetalScion.png";
import LightningScion from "../assets/scionIcons/LightningScion.png";
import ManaScion from "../assets/scionIcons/ManaScion.png";
import PlantScion from "../assets/scionIcons/PlantScion.png";

export const Piece = (props) => {
  let owner = "";

  if (props.player === "host") {
    owner = "hostUnits";
  } else if (props.player === "guest") {
    owner = "guestUnits";
  }

  const handleClick = () => {
    if (!props.deployPawnMode) {
      if (!props.moveMode && props.userRole === props.turnPlayer) {
        props.enterMoveMode(
          props.getZonesInRange(
            props.unit.stats.row,
            props.unit.stats.column,
            1,
            false
          ),
          props.unit.stats.unitIndex,
          props.player
        );
      }
    }
  };

  return (
    <>
      {/* {props.player && props[owner][props.unitIndex] && ( */}
      {props.unit && (
        <div className={`piece ${props.player}`} onClick={() => handleClick()}>
          <>
            <img src={WaterScion} className="scionClass" />

            {/* {props[owner][props.unitIndex].stats.player}
            <br />
            {props[owner][props.unitIndex].stats.unitIndex} */}
          </>
        </div>
      )}
    </>
  );
};

export default Piece;
