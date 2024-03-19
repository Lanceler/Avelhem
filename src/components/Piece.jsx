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

import Shield from "../assets/attributeIcons/Shield.png";
import Ward from "../assets/attributeIcons/Ward.png";
import Virtue from "../assets/attributeIcons/Virtue.png";
import HP from "../assets/attributeIcons/HP.png";
import BurnGif from "../assets/attributeIcons/BurnGif.gif";
import ParalysisGif from "../assets/attributeIcons/ParalysisGif.gif";

export const Piece = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getZonesInRange } = useRecurringEffects();

  let classIcon = null;

  switch (props.unit.unitClass) {
    case "Fire Scion":
      classIcon = FireScion;
      break;

    case "Water Scion":
      classIcon = WaterScion;
      break;

    case "Wind Scion":
      classIcon = WindScion;
      break;

    case "Land Scion":
      classIcon = LandScion;
      break;

    case "Metal Scion":
      classIcon = MetalScion;
      break;

    case "Lightning Scion":
      classIcon = LightningScion;
      break;

    case "Mana Scion":
      classIcon = ManaScion;
      break;

    case "Plant Scion":
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

  let activatingUnit = null;
  let isActivatingUnit = false;

  if (localGameState.activatingUnit.length) {
    activatingUnit =
      localGameState.activatingUnit[localGameState.activatingUnit.length - 1];

    if (
      props.unit.player === activatingUnit.player &&
      props.unit.unitIndex === activatingUnit.unitIndex
    ) {
      isActivatingUnit = true;
    }
  }

  const handleClick = () => {
    // canAegis(props.unit);

    if (props.tileMode === "selectUnit") {
      if (pieceSelectable) {
        props.selectUnit(
          props.movingUnit,
          props.unit,
          props.selectUnitReason,
          props.selectUnitSpecial
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

  const handleInfo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    props.selectExpandPiece(null);

    props.enterMoveMode(
      getZonesInRange(props.unit.row, props.unit.column, 1, false),
      props.unit,
      newGameState,
      null
    );
  };

  const handleSkill = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.push({
      resolution: "Selecting Scion Skill",
      unit: props.unit,
    });

    dispatch(updateState(newGameState));
  };

  const handleTactic = (unit) => {
    props.activateTactic(unit);
  };

  return (
    <>
      {props.unit && (
        <>
          <div
            className={`piece ${props.unit.player}`}
            onClick={() => handleClick()}
          >
            <>
              {isActivatingUnit && <div className="glow animating"></div>}

              {/* Mana Scion: Disruption */}
              {props.unit.enhancements.disruption > 0 && (
                <div className="disruption animating"></div>
              )}

              <div className="piece-icon-shadow"></div>

              <img src={classIcon} className="scionClass" />

              {/* anathema / ravager */}

              {props.unit.afflictions.anathema > 0 && (
                <>
                  <div className="anathema-aura">
                    <div className="cascade-line"></div>
                    <div className="cascade-line2"></div>
                    {props.unit.afflictions.anathema > 1 && (
                      <div className="cascade-line3"></div>
                    )}
                  </div>
                  <img src={classIcon} className="scionClass blink" />
                </>
              )}

              {props.unit.enhancements.ravager && (
                <>
                  <div className="anathema-aura">
                    <div className="ravager-line"></div>
                    <div className="ravager-line2"></div>
                    {/* <img src={classIcon} className="scionClass blink" /> */}
                  </div>
                  <img src={classIcon} className="scionClass blink" />
                </>
              )}
            </>
          </div>

          {/* HP */}

          {props.unit.hp > 0 && <img src={HP} className="hP" />}
          {props.unit.hp > 0 && (
            <div className="hP hP-amount">{props.unit.hp}</div>
          )}

          {/* virtue */}

          {props.unit.virtue == true && <img src={Virtue} className="virtue" />}

          {/* ward */}

          {props.unit.enhancements.ward > 0 && (
            <img
              src={Ward}
              className={`shieldAndWard ${
                props.unit.enhancements.ward === 1 ? "fade-in-out" : ""
              }`}
            />
          )}

          {/* shield */}

          {props.unit.enhancements.shield > 0 && (
            <img
              src={Shield}
              className={`shieldAndWard ${
                props.unit.enhancements.shield === 1 ? "fade-in-out" : ""
              }`}
            />
          )}

          {/* attributes */}

          {props.unit.unitClass === "Plant Scion" && (
            <>
              {props.unit.blossom === 1 && (
                <div className="blossom" style={{ left: 12 }}></div>
              )}

              {props.unit.blossom === 2 && (
                <>
                  <div className="blossom" style={{ left: 29 }}></div>
                  <div className="blossom" style={{ left: 12 }}></div>
                </>
              )}

              {props.unit.blossom > 2 && (
                <>
                  <div className="blossom" style={{ left: 29 }}></div>
                  <div className="blossom" style={{ left: 12 }}></div>
                  <div className="blossom" style={{ left: 46 }}></div>
                </>
              )}
            </>
          )}

          {props.unit.unitClass === "Lightning Scion" && (
            <>
              {props.unit.charge === 1 && (
                <div className="charge" style={{ left: 12 }}></div>
              )}

              {props.unit.charge === 2 && (
                <>
                  <div className="charge" style={{ left: 29 }}></div>
                  <div className="charge" style={{ left: 12 }}></div>
                </>
              )}

              {props.unit.charge > 2 && (
                <>
                  <div className="charge" style={{ left: 29 }}></div>
                  <div className="charge" style={{ left: 12 }}></div>
                  <div className="charge" style={{ left: 46 }}></div>
                </>
              )}
            </>
          )}

          {props.unit.unitClass === "Fire Scion" && (
            <>
              {props.unit.fever === 1 && (
                <div className="fever" style={{ left: 20 }}></div>
              )}
              {props.unit.fever > 1 && (
                <>
                  <div className="fever" style={{ left: 20 }}></div>
                  <div className="fever" style={{ left: 38 }}></div>
                </>
              )}
            </>
          )}

          {props.unit.unitClass === "Wind Scion" && (
            <>
              {props.unit.boosts.galeConjuration === true && (
                <div className="gale-conjuration" style={{ left: 29 }}></div>
              )}
            </>
          )}

          {props.unit.unitClass === "Water Scion" && (
            <>
              {props.unit.boosts.glacialTorrent === 1 && (
                <div className="glacial-torrent" style={{ left: 20 }}></div>
              )}
              {props.unit.boosts.glacialTorrent > 1 && (
                <>
                  <div className="glacial-torrent" style={{ left: 20 }}></div>
                  <div className="glacial-torrent" style={{ left: 38 }}></div>
                </>
              )}
            </>
          )}

          {props.unit.unitClass === "Metal Scion" && (
            <>
              {props.unit.sharpness === 1 && (
                <div className="sharpness" style={{ left: 20 }}></div>
              )}
              {props.unit.sharpness > 1 && (
                <>
                  <div className="sharpness" style={{ left: 20 }}></div>
                  <div className="sharpness" style={{ left: 38 }}></div>
                </>
              )}
            </>
          )}

          {/* burn */}

          {props.unit.afflictions.burn > 0 && (
            <>
              <img src={BurnGif} className="burn" />
            </>
          )}

          {/* frostbite */}

          {props.unit.afflictions.frostbite > 0 && (
            <>
              <img src={BurnGif} className="burn blue-tint" />
            </>
          )}

          {/* paralysis */}

          {props.unit.afflictions.paralysis > 0 && (
            <>
              <img
                src={ParalysisGif}
                className={`paralyzed ${
                  props.unit.afflictions.paralysis === 1
                    ? "fade-in-out-paralyze"
                    : ""
                }`}
              />
            </>
          )}

          {props.expandedPiece === props.id && (
            <>
              <div
                className="pieceOption"
                style={{ top: -17, left: -17 }}
                onClick={() => handleInfo()}
              >
                <div className="optionIcon">Info</div>
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
                      <div className="optionIcon">Dice</div>
                    </div>
                    {props.unit.unitClass !== "Pawn" && (
                      <>
                        <div
                          className="pieceOption"
                          style={{ top: 54, left: 54 }}
                        >
                          <div className="optionIcon">Abi</div>
                        </div>
                        <div
                          className="pieceOption"
                          style={{ top: 54, left: -17 }}
                          onClick={() => handleSkill()}
                        >
                          <div className="optionIcon">Ski</div>
                        </div>
                      </>
                    )}
                  </>
                )}
            </>
          )}
        </>
      )}
      {!props.unit && <div className="piece"></div>}
    </>
  );
};

export default Piece;
