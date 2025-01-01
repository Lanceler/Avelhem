import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDemoCount } from "../../redux/demoCount";

import "./Piece.css";

import Shield from "../../assets/attributeIcons/Shield.png";
import Ward from "../../assets/attributeIcons/Ward.png";
import Aether from "../../assets/attributeIcons/Aether.png";
import HP from "../../assets/attributeIcons/HP.png";
import BurnGif from "../../assets/attributeIcons/BurnGif.gif";
import FrostbiteGif from "../../assets/attributeIcons/FrostbiteGif.gif";
import ParalysisGif from "../../assets/attributeIcons/ParalysisGif.gif";
import RootGif from "../../assets/attributeIcons/RootGif.gif";
import AmbidexterityIcon from "../../assets/others/AmbidexterityIcon.png";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useGetImages } from "../../hooks/useGetImages";

export const Piece = (props) => {
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const dispatch = useDispatch();

  const { getElementImage } = useGetImages();

  const { isRooted } = useRecurringEffects();

  let pieceSelectable = false;

  if (props.validZones.includes(props.unit.row * 5 + props.unit.column)) {
    pieceSelectable = true;
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
        const unitCopy = JSON.parse(JSON.stringify(props.unit));
        props.setExpandedUnit(unitCopy);
      }
    }
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 46:
          case 53:
          case 60:
            return (
              element1 === "Unit" &&
              element2.unitIndex === 1 &&
              element2.player === "host"
            );

          ///////
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 46:
          case 53:
          case 60:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="piece-body">
      {props.unit && (
        <>
          <div
            className={`piece ${props.unit.player}
            ${canClick("Unit", props.unit) ? "demoClick" : ""}
            
            
            `}
            onClick={() => {
              handleClick();
              handleUpdateDemoGuide();
            }}
          >
            <>
              {/* deploy impact */}
              <>
                <div className="deploy-impact"></div>
              </>

              {/* Mana Scion: Disruption */}
              {props.unit.enhancements.disruption > 0 && (
                <>
                  <div className="disruption2"></div>
                  <div className="disruption2 disruption2-animate"></div>
                </>
              )}

              {/* Plant Scion: Overgrowth */}
              {props.unit.enhancements.overgrowth === true && (
                <div className="overgrowth animating"></div>
              )}

              <img
                src={getElementImage(props.unit.unitClass)}
                className="piece-scionClass"
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

          {/* aether */}

          {props.unit.aether == true && <img src={Aether} className="aether" />}

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
                <div
                  className="blossom"
                  style={{
                    left: "33.33%",
                    transform: "translateX(-50%) rotate(45deg)",
                  }}
                ></div>
              )}

              {props.unit.blossom === 2 && (
                <>
                  <div
                    className="blossom"
                    style={{
                      left: "33.33%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="blossom"
                    style={{
                      left: "50%",
                      transform: "rotate(45deg)",
                    }}
                  ></div>
                </>
              )}

              {props.unit.blossom > 2 && (
                <>
                  <div
                    className="blossom"
                    style={{
                      left: "20%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="blossom"
                    style={{
                      left: "50%",
                      transform: " translateX(-50%)  rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="blossom"
                    style={{
                      left: "80%",
                      transform: " translateX(-50%)  rotate(45deg)",
                    }}
                  ></div>
                </>
              )}
            </>
          )}

          {props.unit.unitClass === "Lightning Scion" && (
            <>
              {props.unit.charge === 1 && (
                <div
                  className="charge"
                  style={{
                    left: "33.33%",
                    transform: "translateX(-50%) rotate(45deg)",
                  }}
                ></div>
              )}

              {props.unit.charge === 2 && (
                <>
                  <div
                    className="charge"
                    style={{
                      left: "33.33%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="charge"
                    style={{
                      left: "50%",
                      transform: "rotate(45deg)",
                    }}
                  ></div>
                </>
              )}

              {props.unit.charge > 2 && (
                <>
                  <div
                    className="charge"
                    style={{
                      left: "20%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="charge"
                    style={{
                      left: "50%",
                      transform: " translateX(-50%)  rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="charge"
                    style={{
                      left: "80%",
                      transform: " translateX(-50%)  rotate(45deg)",
                    }}
                  ></div>
                </>
              )}
            </>
          )}

          {props.unit.unitClass === "Fire Scion" && (
            <>
              {props.unit.boosts.fieryHeart === true && (
                <div
                  className="fiery-heart"
                  style={{
                    left: "50%",
                    transform: " translateX(-50%) rotate(45deg)",
                  }}
                ></div>
              )}
            </>
          )}

          {props.unit.unitClass === "Water Scion" && (
            <>
              {props.unit.boosts.glacialTorrent === 1 && (
                <div
                  className="glacial-torrent"
                  style={{
                    left: "30%",
                    transform: "translateX(-50%) rotate(45deg)",
                  }}
                ></div>
              )}
              {props.unit.boosts.glacialTorrent > 1 && (
                <>
                  <div
                    className="glacial-torrent"
                    style={{
                      left: "30%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="glacial-torrent"
                    style={{
                      left: "70%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
                </>
              )}
            </>
          )}

          {props.unit.unitClass === "Wind Scion" && (
            <>
              {props.unit.boosts.galeConjuration === true && (
                <div
                  className="gale-conjuration"
                  style={{
                    left: "50%",
                    transform: " translateX(-50%)  rotate(45deg)",
                  }}
                ></div>
              )}
            </>
          )}

          {props.unit.unitClass === "Land Scion" && (
            <>
              {props.unit.boosts.mountainStance === true && (
                <div
                  className="mountain-stance"
                  style={{
                    left: "50%",
                    transform: " translateX(-50%)  rotate(45deg)",
                  }}
                ></div>
              )}
            </>
          )}

          {props.unit.unitClass === "Mana Scion" && (
            <>
              {props.unit.enhancements.disruption === 1 && (
                <div
                  className="disruptionCounter"
                  style={{
                    left: "30%",
                    transform: "translateX(-50%) rotate(45deg)",
                  }}
                ></div>
              )}
              {props.unit.enhancements.disruption > 1 && (
                <>
                  <div
                    className="disruptionCounter"
                    style={{
                      left: "30%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="disruptionCounter"
                    style={{
                      left: "70%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
                </>
              )}
            </>
          )}

          {props.unit.unitClass === "Metal Scion" && (
            <>
              {props.unit.sharpness === 1 && (
                <div
                  className="sharpness"
                  style={{
                    left: "30%",
                    transform: "translateX(-50%) rotate(45deg)",
                  }}
                ></div>
              )}
              {props.unit.sharpness > 1 && (
                <>
                  <div
                    className="sharpness"
                    style={{
                      left: "30%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="sharpness"
                    style={{
                      left: "70%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  ></div>
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
              <img src={AmbidexterityIcon} className="ambidexterity" />
            </>
          )}

          {/* target */}

          {/* {isActivatingTarget && (
            <>
              <img src={Crosshair} className="crosshair" />
            </>
          )} */}
        </>
      )}
      {!props.unit && <div className="piece"></div>}
    </div>
  );
};

export default Piece;
