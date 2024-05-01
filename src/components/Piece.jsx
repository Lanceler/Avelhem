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

import Shield from "../assets/attributeIcons/Shield.png";
import Ward from "../assets/attributeIcons/Ward.png";
import Virtue from "../assets/attributeIcons/Virtue.png";
import HP from "../assets/attributeIcons/HP.png";
import BurnGif from "../assets/attributeIcons/BurnGif.gif";
import FrostbiteGif from "../assets/attributeIcons/FrostbiteGif.gif";
import ParalysisGif from "../assets/attributeIcons/ParalysisGif.gif";
import RootGif from "../assets/attributeIcons/RootGif.gif";

import Ambidexterity from "../assets/others/Ambidexterity.png";

import { useRecurringEffects } from "../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../hooks/useCardImageSwitch";

export const Piece = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getElementImage } = useCardImageSwitch();

  const { isRooted } = useRecurringEffects();

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
      activatingUnit &&
      props.unit.player === activatingUnit.player &&
      props.unit.unitIndex === activatingUnit.unitIndex
    ) {
      isActivatingUnit = true;
    }
  }

  const handleClick = () => {
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
      if (
        props.expandedUnit &&
        props.expandedUnit.unitIndex === props.unit.unitIndex &&
        props.expandedUnit.player === props.unit.player
      ) {
        props.setExpandedUnit(null);
      } else {
        props.setExpandedUnit(props.unit);
      }
    }
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
              {/* Mana Scion: Disruption */}
              {props.unit.enhancements.disruption > 0 && (
                <div className="disruption animating"></div>
              )}

              {/* Plant Scion: Overgrowth */}
              {props.unit.enhancements.overgrowth === true && (
                <div className="overgrowth animating"></div>
              )}

              <div className="piece-icon-shadow"></div>

              <img
                src={getElementImage(props.unit.unitClass)}
                className="scionClass"
              />

              {props.unit.unitClass !== "Pawn" && (
                <div className="ascension"></div>
              )}

              {/* root */}

              {isRooted(props.unit) && <img src={RootGif} className="rooted" />}

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
                </>
              )}

              {props.unit.enhancements.ravager && (
                <>
                  <div className="anathema-aura">
                    <div className="ravager-line"></div>
                    <div className="ravager-line2"></div>
                  </div>
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
              <img
                src={FrostbiteGif}
                className={`frostbite ${
                  props.unit.afflictions.frostbite == 1
                    ? "frostbite-1"
                    : "frostbite-2"
                }`}
              />
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

          {props.unit.boosts.ambidexterity === true && (
            <>
              <img src={Ambidexterity} className="ambidexterity" />
            </>
          )}
        </>
      )}
      {!props.unit && <div className="piece"></div>}
    </>
  );
};

export default Piece;
