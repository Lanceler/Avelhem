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

  const unit = props.unit;

  const pieceSelectable = props.validZones.includes(unit.row * 5 + unit.column);

  const handleClick = () => {
    if (props.tileMode === "selectUnit") {
      if (pieceSelectable) {
        props.selectUnit(
          props.movingUnit,
          unit,
          props.selectUnitReason,
          props.selectUnitSpecial
        );
      }
    } else {
      if (
        props.expandedUnit &&
        props.expandedUnit.unitIndex === unit.unitIndex &&
        props.expandedUnit.player === unit.player
      ) {
        props.setExpandedUnit(null);
      } else {
        props.setExpandedUnit(JSON.parse(JSON.stringify(unit)));
      }
    }
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 49:
          case 55:
          case 61:
          case 69:
          case 72:
          case 77:
          case 79:
          case 91:
          case 99:
          case 110:
            return (
              element1 === "Unit" &&
              element2.unitIndex === 1 &&
              element2.player === "host"
            );

          case 87:
            return (
              element1 === "Unit" &&
              element2.unitIndex === 2 &&
              element2.player === "host"
            );

          case 107:
            return (
              element1 === "Unit" &&
              element2.unitIndex === 1 &&
              element2.player === "guest"
            );

          case 115:
            return (
              element1 === "Unit" &&
              element2.unitIndex === 4 &&
              element2.player === "host"
            );
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 69:
          case 77:
          case 87:
          case 91:
          case 107:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  const pieceBase = () => {
    const ascensionColors = {
      "Fire Scion": "#ff8b1e",
      "Water Scion": "#03afff",
      "Wind Scion": "#8dfdb2",
      "Land Scion": "#838385ff",
      "Lightning Scion": "#2c00caff",
      "Mana Scion": "#fff894",
      "Metal Scion": "#d4d4dbff",
      "Plant Scion": "#fa69ff",
      "Avian Scion": "#000296ff",
      "Insect Scion": "#440e70ff",
    };

    const bgColor = ascensionColors[unit.unitClass] || "#e8e8e8";

    return (
      <div
        className={`piece ${unit.player}
                ${canClick("Unit", unit) ? "demoClick" : ""}`}
        onClick={() => {
          handleClick();
          handleUpdateDemoGuide();
        }}
      >
        <>
          <div className="deployImpact"></div>

          <img
            src={getElementImage(unit.unitClass)}
            className="pieceScionClass"
          />

          {unit.unitClass !== "Pawn" && (
            <div
              className="ascension"
              style={{
                "--ascension-color": bgColor,
              }}
            ></div>
          )}

          {isRooted(unit) && <img src={RootGif} className="rooted" />}

          {unit.afflictions.anathema > 0 && (
            <div className="anathema-aura">
              <div className="cascade-line"></div>
              <div className="cascade-line2"></div>
              {unit.afflictions.anathema > 1 && (
                <div className="cascade-line3"></div>
              )}
            </div>
          )}

          {unit.enhancements.ravager && (
            <div className="anathema-aura">
              <div className="ravager-line"></div>
              <div className="ravager-line2"></div>
            </div>
          )}
        </>
      </div>
    );
  };

  const attribute = () => {
    let attr = null;
    let limit = 0;

    switch (unit.unitClass) {
      case "Fire Scion":
        attr = "ember";
        limit = 2;
        break;
      case "Water Scion":
        attr = "torrent";
        limit = 2;
        break;
      case "Wind Scion":
        attr = "cyclone";
        limit = 3;
        break;
      case "Land Scion":
        attr = "leyline";
        limit = 3;
        break;
      case "Lightning Scion":
        attr = "charge";
        limit = 3;
        break;
      case "Mana Scion":
        attr = "ambiance";
        limit = 3;
        break;
      case "Metal Scion":
        attr = "sharpness";
        limit = 2;
        break;
      case "Plant Scion":
        attr = "blossom";
        limit = 3;
        break;
      case "Avian Scion":
        attr = "devotion";
        limit = 3;
        break;
      case "Insect Scion":
        attr = "pheromone";
        limit = 3;
        break;

      default:
        attr = null;
        limit = 0;
    }

    if (!attr || !unit[attr]) {
      return;
    }

    const getLeftPosition = (i) => {
      if (limit === 1) return "50%";
      if (limit === 2) return ["30%", "70%"][i];
      if (limit === 3) return ["20%", "50%", "80%"][i];
      return 0;
    };

    return (
      <div className="attributeContainer">
        {[...Array(unit[attr])].map((_, i) => (
          <div
            key={i}
            className={`attribute ${attr}`}
            style={{
              left: getLeftPosition(i),
              transform: "translateX(-50%) rotate(45deg)",
            }}
          ></div>
        ))}
      </div>
    );
  };

  const bottomAttributeContainer = () => {
    return (
      <div className="bottomAttributeContainer">
        <div className="hp">
          {unit.hp > 0 && <img src={HP} className="hPIcon" />}
          {unit.hp > 0 && <div className="hPIcon hP-amount">{unit.hp}</div>}
        </div>

        {unit.aether == true && (
          <div className="aether">
            <img src={Aether} className="aetherIcon" />
          </div>
        )}

        <div className="shieldAndWardContainer">
          {unit.enhancements.ward > 0 && (
            <div
              className={unit.enhancements.ward === 1 ? "fade-in-out" : ""}
              style={{ zIndex: 350 }}
            >
              <img src={Ward} className="shieldAndWard" />
            </div>
          )}

          {unit.enhancements.shield > 0 && (
            <div
              className={unit.enhancements.shield === 1 ? "fade-in-out" : ""}
              style={{ zIndex: 351 }}
            >
              <img src={Shield} className="shieldAndWard" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="piece-body">
      {unit && (
        <div
          className={`${
            unit.hp < 1 && !unit.enhancements.score
              ? "eliminated-piece"
              : "normal-piece"
          }`}
        >
          {pieceBase()}
          {attribute()}
          {bottomAttributeContainer()}

          <div className="afflictions-container">
            {unit.afflictions.paralysis > 0 && (
              <div
                className={`star-container ${
                  unit.afflictions.paralysis == 1 ? "star-container-2" : ""
                }`}
              >
                <div className="star star-1"></div>
                <div className="star star-2"></div>
                <div className="star star-3"></div>
              </div>
            )}

            {unit.afflictions.burn > 0 && (
              <>
                <img src={BurnGif} className="burn" />
              </>
            )}

            {unit.afflictions.frost > 0 && (
              <img src={FrostbiteGif} className="frost frost-1" />
            )}

            {unit.boosts.ambidexterity === true && (
              <>
                <img src={AmbidexterityIcon} className="ambidexterity" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Piece;
