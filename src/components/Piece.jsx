import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";

import "./Piece.css";

import Pawn from "../assets/scionIcons/Pawn.png";
import FireScion from "../assets/scionIcons/FireScion.png";
import WaterScion from "../assets/scionIcons/WaterScion.png";
import WindScion from "../assets/scionIcons/WindScion.png";
import LandScion from "../assets/scionIcons/LandScion.png";
import MetalScion from "../assets/scionIcons/MetalScion.png";
import LightningScion from "../assets/scionIcons/LightningScion.png";
import ManaScion from "../assets/scionIcons/ManaScion.png";
import PlantScion from "../assets/scionIcons/PlantScion.png";

import { useRecurringEffects } from "../hooks/useRecurringEffects";

export const Piece = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);

  const { canAegis } = useRecurringEffects();

  let classIcon = null;

  switch (props.unit.stats.unitClass) {
    case "fireScion":
      classIcon = FireScion;
      break;

    case "waterScion":
      classIcon = WaterScion;
      break;

    case "windScion":
      classIcon = WindScion;
      break;

    case "landScion":
      classIcon = LandScion;
      break;

    case "metalScion":
      classIcon = MetalScion;
      break;

    case "lightningScion":
      classIcon = LightningScion;
      break;

    case "manaScion":
      classIcon = ManaScion;
      break;

    case "plantScion":
      classIcon = PlantScion;
      break;

    default:
      classIcon = Pawn;
  }

  const handleClick = () => {
    canAegis(props.unit);

    // if (!props.tileMode && self === localGameState.turnPlayer) {
    //   props.enterMoveMode(
    //     props.getZonesInRange(
    //       props.unit.stats.row,
    //       props.unit.stats.column,
    //       1,
    //       false
    //     ),
    //     props.unit.stats.unitIndex,
    //     props.unit.stats.player
    //   );
    // }
  };

  return (
    <>
      {props.unit && (
        <div
          className={`piece ${props.unit.stats.player}`}
          onClick={() => handleClick()}
        >
          <>
            <img src={classIcon} className="scionClass" />
          </>
        </div>
      )}
      {!props.unit && <div className="piece"></div>}
    </>
  );
};

export default Piece;
