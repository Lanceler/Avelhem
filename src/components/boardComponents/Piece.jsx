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
  const { isMuted, isRooted } = useRecurringEffects();

  const pieceSelectable = props.validZones.includes(
    props.unit.row * 5 + props.unit.column
  );

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
        props.setExpandedUnit(JSON.parse(JSON.stringify(props.unit)));
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
          case 75:
          case 92:
          case 94:
          case 102:
            return (
              element1 === "Unit" &&
              element2.unitIndex === 1 &&
              element2.player === "host"
            );

          case 65:
          case 83:
          case 86:
            return (
              element1 === "Unit" &&
              element2.unitIndex === 2 &&
              element2.player === "host"
            );

          case 109:
            return (
              element1 === "Unit" &&
              element2.unitIndex === 1 &&
              element2.player === "guest"
            );

          case 118:
            return (
              element1 === "Unit" &&
              element2.unitIndex === 4 &&
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
          case 65:
          case 75:
          case 83:
          case 86:
          case 92:
          case 94:
          case 102:
          case 109:
          case 118:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  const pieceBase = () => {
    const showDisruption =
      props.unit.seal > 0 &&
      (props.unit.enhancements.shield > 0 ||
        props.unit.enhancements.ward > 0) &&
      !isMuted(props.unit);

    const ascensionColors = {
      "Fire Scion": "#ff8b1e",
      "Water Scion": "#03afff",
      "Wind Scion": "#8dfdb2",
      "Land Scion": "#e97b31",
      "Lightning Scion": "#03e2ff",
      "Mana Scion": "#fff894",
      "Metal Scion": "#5e0066",
      "Plant Scion": "#fa69ff",
    };

    const bgColor = ascensionColors[props.unit.unitClass] || "#e8e8e8"; // fallback

    return (
      <div
        className={`piece ${props.unit.player}
                ${canClick("Unit", props.unit) ? "demoClick" : ""}`}
        onClick={() => {
          handleClick();
          handleUpdateDemoGuide();
        }}
      >
        <>
          <div className="deployImpact"></div>

          {showDisruption && <div className="seal2"></div>}

          {props.unit.enhancements.overgrowth === true && (
            <div className="overgrowth animating"></div>
          )}

          <img
            src={getElementImage(props.unit.unitClass)}
            className="pieceScionClass"
          />

          {props.unit.unitClass !== "Pawn" && (
            <div
              className="ascension"
              style={{
                backgroundColor: bgColor,
              }}
            ></div>
          )}

          {isRooted(props.unit) && <img src={RootGif} className="rooted" />}

          {props.unit.afflictions.anathema > 0 && (
            <div className="anathema-aura">
              <div className="cascade-line"></div>
              <div className="cascade-line2"></div>
              {props.unit.afflictions.anathema > 1 && (
                <div className="cascade-line3"></div>
              )}
            </div>
          )}

          {props.unit.enhancements.ravager && (
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

    switch (props.unit.unitClass) {
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
        limit = 2;
        break;
      case "Land Scion":
        attr = "aftershock";
        limit = 2;
        break;
      case "Lightning Scion":
        attr = "charge";
        limit = 3;
        break;
      case "Mana Scion":
        attr = "seal";
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
      default:
        attr = null;
        limit = 0;
    }

    if (!attr || !props.unit[attr]) {
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
        {[...Array(props.unit[attr])].map((_, i) => (
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

  return (
    <div className="piece-body">
      {props.unit && (
        <>
          {pieceBase()}
          {attribute()}

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

          {/* burn */}

          {props.unit.afflictions.burn > 0 && (
            <>
              <img src={BurnGif} className="burn" />
            </>
          )}

          {/* frost */}

          {props.unit.afflictions.frost > 0 && (
            <>
              <img
                src={FrostbiteGif}
                className={`frost ${
                  props.unit.afflictions.frost == 1 ? "frost-1" : "frost-2"
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
        </>
      )}
      {/* {!props.unit && <div className="piece"></div>} */}
    </div>
  );
};

export default Piece;
