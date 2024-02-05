import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";

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
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);

  const handleClick = () => {
    if (!props.tileMode && self === localGameState.turnPlayer) {
      props.enterMoveMode(
        props.getZonesInRange(
          props.unit.stats.row,
          props.unit.stats.column,
          1,
          false
        ),
        props.unit.stats.unitIndex,
        props.unit.stats.player
      );
    }
  };

  return (
    <>
      {props.unit && (
        <div
          className={`piece ${props.unit.stats.player}`}
          onClick={() => handleClick()}
        >
          <>
            <img src={MetalScion} className="scionClass" />
          </>
        </div>
      )}
      {!props.unit && <div className="piece"></div>}
    </>
  );
};

export default Piece;
