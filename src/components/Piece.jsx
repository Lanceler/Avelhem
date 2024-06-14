import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../redux/gameState";
import { updateDemo } from "../redux/demoGuide";

import "./Piece.css";

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
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { getElementImage } = useCardImageSwitch();

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

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Fire1.2":
      case "Fire1.8":
      case "Fire1.9":
      case "Fire1.13":
      case "Fire1.16":
      case "Fire1.18":
      case "Fire1.23":
        switch (element) {
          case "Unit":
            return element2.unitIndex === 2 && element2.player === "host";
        }
        break;

      case "Fire1.12":
      case "Fire1.31":
      case "Fire1.35":
      case "Fire1.46":
        switch (element) {
          case "Unit":
            return element2.unitIndex === 3 && element2.player === "host";
        }
        break;

      case "Fire1.15":
        switch (element) {
          case "Unit":
            return element2.unitIndex === 4 && element2.player === "guest";
        }
        break;

      case "Fire1.22":
        switch (element) {
          case "Unit":
            return element2.unitIndex === 0 && element2.player === "guest";
        }
        break;

      case "Fire1.26":
        switch (element) {
          case "Unit":
            return element2.unitIndex === 0 && element2.player === "host";
        }
        break;

      case "Fire1.29":
      case "Fire1.30":
        switch (element) {
          case "Unit":
            return (
              [2, 3].includes(element2.unitIndex) && element2.player === "guest"
            );
        }
        break;

      case "Fire1.32":
        switch (element) {
          case "Unit":
            return element2.unitIndex === 1 && element2.player === "guest";
        }
        break;

      case "Fire1.37":
      case "Fire1.45":
        switch (element) {
          case "Unit":
            return element2.unitIndex === 5 && element2.player === "guest";
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Fire1.8":
        dispatch(updateDemo("Fire1.9"));
        break;

      case "Fire1.12":
        dispatch(updateDemo("Fire1.13"));
        break;

      case "Fire1.15":
        dispatch(updateDemo("Fire1.16"));
        break;

      case "Fire1.22":
        dispatch(updateDemo("Fire1.23"));
        break;

      case "Fire1.30":
        dispatch(updateDemo("Fire1.31"));
        break;

      case "Fire1.32":
        dispatch(updateDemo("Fire1.33"));
        break;

      case "Fire1.35":
        dispatch(updateDemo("Fire1.36"));
        break;
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

          {props.unit.unitClass === "Wind Scion" && (
            <>
              {props.unit.boosts.galeConjuration === true && (
                <div className="gale-conjuration" style={{ left: 29 }}></div>
              )}
            </>
          )}

          {props.unit.unitClass === "Land Scion" && (
            <>
              {props.unit.boosts.mountainStance === true && (
                <div className="mountain-stance" style={{ left: 29 }}></div>
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
