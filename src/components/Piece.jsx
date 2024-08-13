import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../redux/demoGuide";

import "./Piece.css";

import Shield from "../assets/attributeIcons/Shield.png";
import Ward from "../assets/attributeIcons/Ward.png";
import Aether from "../assets/attributeIcons/Aether.png";
import HP from "../assets/attributeIcons/HP.png";
import BurnGif from "../assets/attributeIcons/BurnGif.gif";
import FrostbiteGif from "../assets/attributeIcons/FrostbiteGif.gif";
import ParalysisGif from "../assets/attributeIcons/ParalysisGif.gif";
import RootGif from "../assets/attributeIcons/RootGif.gif";
import AmbidexterityIcon from "../assets/others/AmbidexterityIcon.png";

import { useRecurringEffects } from "../hooks/useRecurringEffects";

import { useGetImages } from "../hooks/useGetImages";

export const Piece = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

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

  const canClick = (element, element2) => {
    if (demoGuide) {
      switch (true) {
        case demoGuide.slice(0, 5) === "Learn":
          switch (demoGuide) {
            case "Learn1.20.01":
            case "Learn1.39":
            case "Learn1.49":
            case "Learn1.134":
            case "Learn1.141":
            case "Learn1.211":
            case "Learn1.217":
            case "Learn1.230":
            case "Learn1.235":
            case "Learn1.242":
            case "Learn1.250":
            case "Learn1.258":
              return (
                element === "Unit" &&
                element2.unitIndex === 1 &&
                element2.player === "host"
              );

            case "Learn1.23.01":
            case "Learn1.59":
            case "Learn1.67":
            case "Learn1.74":
              return (
                element === "Unit" &&
                element2.unitIndex === 2 &&
                element2.player === "host"
              );

            case "Learn1.54":
              return (
                element === "Unit" &&
                element2.unitIndex === 0 &&
                element2.player === "host"
              );

            case "Learn1.97":
            case "Learn1.106":
            case "Learn1.120":
            case "Learn1.128":
            case "Learn1.148":
            case "Learn1.215":
            case "Learn1.233":
            case "Learn1.240":
            case "Learn1.247":
              return (
                element === "Unit" &&
                element2.unitIndex === 1 &&
                element2.player === "guest"
              );

            case "Learn1.164.1":
              return (
                element === "Unit" &&
                element2.unitIndex === 0 &&
                element2.player === "host"
              );

            case "Learn1.262":
              return (
                element === "Unit" &&
                element2.unitIndex === 0 &&
                element2.player === "guest"
              );

            case "Learn1.269":
              return (
                element === "Unit" &&
                element2.unitIndex === 3 &&
                element2.player === "host"
              );
          }

          break;

        //////////////////////////////////////////////////

        case demoGuide.slice(0, 4) === "Fire":
          switch (demoGuide) {
            case "Fire1.2.01":
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
                  return (
                    element2.unitIndex === 4 && element2.player === "guest"
                  );
              }
              break;

            case "Fire1.22":
              switch (element) {
                case "Unit":
                  return (
                    element2.unitIndex === 0 && element2.player === "guest"
                  );
              }
              break;

            case "Fire1.26":
              switch (element) {
                case "Unit":
                  return element2.unitIndex === 0 && element2.player === "host";
              }
              break;

            case "Fire1.29.1":
            case "Fire1.30":
              switch (element) {
                case "Unit":
                  return (
                    [2, 3].includes(element2.unitIndex) &&
                    element2.player === "guest"
                  );
              }
              break;

            case "Fire1.32":
              switch (element) {
                case "Unit":
                  return (
                    element2.unitIndex === 1 && element2.player === "guest"
                  );
              }
              break;

            case "Fire1.37":
            case "Fire1.45":
              switch (element) {
                case "Unit":
                  return (
                    element2.unitIndex === 5 && element2.player === "guest"
                  );
              }
              break;
          }
          break;
      }
    }
  };

  const handleUpdateDemoGuide = () => {
    if (demoGuide) {
      switch (true) {
        case demoGuide.slice(0, 5) === "Learn":
          switch (demoGuide) {
            case "Learn1.20.01":
              dispatch(updateDemo("Learn1.20.1"));
              break;

            case "Learn1.23.01":
              dispatch(updateDemo("Learn1.24"));
              break;

            case "Learn1.97":
              dispatch(updateDemo("Learn1.98"));
              break;

            case "Learn1.134":
              dispatch(updateDemo("Learn1.135"));
              break;

            case "Learn1.141":
              dispatch(updateDemo("Learn1.142"));
              break;

            case "Learn1.148":
              dispatch(updateDemo("Learn1.149"));
              break;

            case "Learn1.164.1":
              dispatch(updateDemo("Learn1.165"));
              break;

            case "Learn1.211":
              dispatch(updateDemo("Learn1.212"));
              break;

            case "Learn1.215":
              dispatch(updateDemo("Learn1.216"));
              break;

            case "Learn1.233":
              dispatch(updateDemo("Learn1.234"));
              break;

            case "Learn1.240":
              dispatch(updateDemo("Learn1.241"));
              break;

            case "Learn1.247":
              dispatch(updateDemo("Learn1.248"));
              break;

            case "Learn1.262":
              dispatch(updateDemo("Learn1.263"));
              break;
          }
          break;

        case demoGuide.slice(0, 4) === "Fire":
          switch (demoGuide) {
            case "Fire1.2.01":
              dispatch(updateDemo("Fire1.2.1"));
              break;

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

            case "Fire1.45":
              dispatch(updateDemo("Fire1.45.1"));
              break;
          }
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
              {/* Mana Scion: Disruption */}
              {props.unit.enhancements.disruption > 0 && (
                <>
                  <div className="disruption2"></div>
                  <div className="disruption2 disruption2-animate"></div>
                </>
              )}

              {props.unit.unitClass === "Mana Scion" && (
                <>
                  {props.unit.enhancements.disruption === 1 && (
                    <div
                      className="disruptionCounter"
                      style={{ left: 20 }}
                    ></div>
                  )}
                  {props.unit.enhancements.disruption > 1 && (
                    <>
                      <div
                        className="disruptionCounter"
                        style={{ left: 20 }}
                      ></div>
                      <div
                        className="disruptionCounter"
                        style={{ left: 38 }}
                      ></div>
                    </>
                  )}
                </>
              )}

              {/* Mana Scion: Disruption */}
              {/* {props.unit.enhancements.disruption > 0 && (
                <div className="disruption animating"></div>
              )} */}

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
