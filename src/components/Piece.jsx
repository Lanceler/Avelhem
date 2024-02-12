import React, { useState, useEffect } from "react";
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

  const { getZonesInRange } = useRecurringEffects();

  let classIcon = null;

  switch (props.unit.unitClass) {
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
      break;
  }

  let pieceSelectable = false;

  if (props.validZones.includes(props.unit.row * 5 + props.unit.column)) {
    pieceSelectable = true;
  }

  const handleClick = () => {
    // canAegis(props.unit);

    if (props.tileMode === "selectUnit") {
      if (pieceSelectable) {
        console.log("unit Selected");
        props.selectUnit(
          props.movingPlayer,
          props.movingUnitIndex,
          props.unit,
          "virtue-blast"
        );
      }
    } else {
      if (props.expandedPiece === props.id) {
        props.selectExpandPiece(null);
      } else {
        props.selectExpandPiece(props.id);
      }
    }
  };

  const handleTactic = (unit) => {
    props.activateTactic(unit);
  };

  const handleSkill = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    props.selectExpandPiece(null);

    props.enterMoveMode(
      getZonesInRange(props.unit.row, props.unit.column, 1, false),
      props.unit.unitIndex,
      props.unit.player,
      newGameState,
      null
    );
  };

  return (
    <>
      {props.unit && (
        <>
          {props.expandedPiece === props.id && (
            <>
              <div className="pieceOption" style={{ top: -17, left: -17 }}>
                Info
              </div>

              {localGameState.currentResolution.length &&
                localGameState.currentResolution[
                  localGameState.currentResolution.length - 1
                ].resolution === "Execution Phase" &&
                self === props.unit.player &&
                self === localGameState.turnPlayer && (
                  <>
                    <div
                      className="pieceOption"
                      style={{ top: -17, left: 54 }}
                      onClick={() => handleTactic(props.unit)}
                    >
                      Dice
                    </div>
                    {
                      // props.unit.unitClass !== "pawn" &&
                      <>
                        <div
                          className="pieceOption"
                          style={{ top: 54, left: 54 }}
                        >
                          Abi.
                        </div>
                        <div
                          className="pieceOption"
                          style={{ top: 54, left: -17 }}
                          onClick={() => handleSkill()}
                        >
                          Ski.
                        </div>
                      </>
                    }
                  </>
                )}
            </>
          )}

          <div
            className={`piece ${props.unit.player}`}
            onClick={() => handleClick()}
          >
            <>
              <img src={classIcon} className="scionClass" />
            </>
          </div>
        </>
      )}
      {!props.unit && <div className="piece"></div>}
    </>
  );
};

export default Piece;
