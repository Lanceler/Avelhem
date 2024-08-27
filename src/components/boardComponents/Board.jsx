import "./../Board.scss";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateSelf, updateEnemy } from "../../redux/teams";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useGetImages } from "../../hooks/useGetImages";

import Tile from "./Tile";
import Piece from "./Piece";

const Board = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const dispatch = useDispatch();

  const {
    getZonesInRange, // needed for quick movement testing
  } = useRecurringEffects();
  const { getMiscImage } = useGetImages();

  const expandedUnit = props.expandedUnit;

  const activatingTarget = () => {
    if (
      localGameState.activatingTarget.length > 0 &&
      localGameState.activatingTarget[
        localGameState.activatingTarget.length - 1
      ]
    ) {
      let unitInfo =
        localGameState.activatingTarget[
          localGameState.activatingTarget.length - 1
        ];

      let unit = localGameState[unitInfo.player].units[unitInfo.unitIndex];

      if (!unit) {
        return;
      }

      //host or spectator
      if (self !== "guest") {
        return {
          position: "absolute",
          zIndex: 101,
          top: 13 + 78 * unit.row,
          left: 13 + 78 * unit.column,
        };
      } else {
        //guest
        return {
          position: "absolute",
          zIndex: 101,
          top: 13 + 78 * (9 - unit.row),
          left: 13 + 78 * (4 - unit.column),
        };
      }
    }
  };

  const activatingUnit = () => {
    if (
      localGameState.activatingUnit.length > 0 &&
      localGameState.activatingUnit[localGameState.activatingUnit.length - 1]
    ) {
      let unitInfo =
        localGameState.activatingUnit[localGameState.activatingUnit.length - 1];

      let unit = localGameState[unitInfo.player].units[unitInfo.unitIndex];

      if (!unit) {
        return;
      }

      //host or spectator
      if (self !== "guest") {
        return {
          position: "absolute",
          zIndex: 101,
          top: 21 + 78 * unit.row,
          left: 21 + 78 * unit.column,
        };
      } else {
        //guest
        return {
          position: "absolute",
          zIndex: 101,
          top: 21 + 78 * (9 - unit.row),
          left: 21 + 78 * (4 - unit.column),
        };
      }
    }
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.39":
      case "Learn1.49":
      case "Learn1.54":
      case "Learn1.59":
      case "Learn1.128":
      case "Learn1.250":
      case "Learn1.258":
      case "Learn1.269":
        return element === "Tactic Button";

      case "Learn1.67":
      case "Learn1.106":
      case "Learn1.217":
      case "Learn1.230":
        return element === "Skill Button";

      case "Learn1.74":
        return element === "Info Button";

      case "Learn1.120":
      case "Learn1.235":
      case "Learn1.242":
        return element === "Ability Button";

      /////////////////////////////////////////
    }
  };

  const handleUnitOptions = (option) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    switch (option) {
      case "Info":
        props.setUnitInfor(expandedUnit);

        // //for testing: quick movement

        // updateLocalState(
        //   enterMoveMode(
        //     getZonesInRange(expandedUnit.row, expandedUnit.column, 1, false),
        //     expandedUnit,
        //     newGameState,
        //     null
        //   )
        // );

        break;

      case "Tactic":
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Activating Tactic",
          unit: expandedUnit,
        });
        break;

      case "Ability":
        newGameState.currentResolution.push({
          resolution: "Selecting",
          resolution2: "Selecting Unit Ability",
          unit: expandedUnit,
        });
        break;

      case "Skill":
        newGameState.currentResolution.push({
          resolution: "Selecting",
          resolution2: "Selecting Scion Skill",
          unit: expandedUnit,
        });
        break;
    }

    dispatch(updateState(newGameState));
  };

  const unitButtonPosition = (unit) => {
    //host or spectator
    if (self !== "guest") {
      return [
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * unit.row - 17,
          left: 12 + 78 * unit.column - 17,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * unit.row - 17,
          left: 12 + 78 * unit.column + 54,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * unit.row + 54,
          left: 12 + 78 * unit.column + 54,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * unit.row + 54,
          left: 12 + 78 * unit.column - 17,
        },
      ];
    } else {
      //guest
      return [
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * (9 - unit.row) - 17,
          left: 12 + 78 * (4 - unit.column) - 17,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * (9 - unit.row) - 17,
          left: 12 + 78 * (4 - unit.column) + 54,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * (9 - unit.row) + 54,
          left: 12 + 78 * (4 - unit.column) + 54,
        },
        {
          position: "absolute",
          zIndex: 102,
          top: 12 + 78 * (9 - unit.row) + 54,
          left: 12 + 78 * (4 - unit.column) - 17,
        },
      ];
    }
  };

  const unitPosition = (unit) => {
    //host or spectator
    if (self !== "guest") {
      return {
        position: "absolute",
        zIndex: 100,
        top: 12 + 78 * unit.row,
        left: 12 + 78 * unit.column,
      };
    } else {
      //guest
      return {
        position: "absolute",
        zIndex: 100,
        top: 12 + 78 * (9 - unit.row),
        left: 12 + 78 * (4 - unit.column),
      };
    }
  };

  return (
    <>
      {expandedUnit !== null && (
        <>
          <div
            className={`pieceOption ${
              canClick("Info Button") ? "demoClick" : ""
            }`}
            style={unitButtonPosition(expandedUnit)[0]}
            onClick={() => {
              handleUnitOptions("Info");
              props.handleUpdateDemoGuide();
            }}
          >
            <div className="optionIcon">
              <img src={getMiscImage("UnitProfile")} className="unitOptions" />
            </div>
          </div>

          {localGameState.currentResolution.length > 0 &&
            localGameState.currentResolution[
              localGameState.currentResolution.length - 1
            ].resolution === "Execution Phase" &&
            self === expandedUnit.player &&
            self === localGameState.turnPlayer &&
            props.userRole !== "spectator" && (
              <>
                <div
                  className={`pieceOption ${
                    canClick("Tactic Button") ? "demoClick" : ""
                  }`}
                  style={unitButtonPosition(expandedUnit)[1]}
                  onClick={() => {
                    handleUnitOptions("Tactic");
                    props.handleUpdateDemoGuide();
                  }}
                >
                  <div className="optionIcon">
                    <img
                      src={getMiscImage("UnitTactic")}
                      className="unitOptions"
                    />
                  </div>
                </div>
                {expandedUnit.unitClass !== "Pawn" && (
                  <>
                    <div
                      className={`pieceOption ${
                        canClick("Ability Button") ? "demoClick" : ""
                      }`}
                      style={unitButtonPosition(expandedUnit)[2]}
                      onClick={() => {
                        handleUnitOptions("Ability");
                        props.handleUpdateDemoGuide();
                      }}
                    >
                      <div className="optionIcon">
                        {" "}
                        <img
                          src={getMiscImage("UnitAbility")}
                          className="unitOptions"
                        />
                      </div>
                    </div>
                    <div
                      className={`pieceOption ${
                        canClick("Skill Button") ? "demoClick" : ""
                      }`}
                      style={unitButtonPosition(expandedUnit)[3]}
                      onClick={() => {
                        handleUnitOptions("Skill");
                        props.handleUpdateDemoGuide();
                      }}
                    >
                      <div className="optionIcon">
                        <img
                          src={getMiscImage("UnitSkill")}
                          className="unitOptions"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
        </>
      )}

      {localGameState.activatingUnit.length > 0 &&
        localGameState.activatingUnit[
          localGameState.activatingUnit.length - 1
        ] !== null && (
          <div
            className="glow animating board-piece"
            style={activatingUnit()}
          ></div>
        )}

      {localGameState.activatingTarget.length > 0 &&
        localGameState.activatingTarget[
          localGameState.activatingTarget.length - 1
        ] !== null && (
          <div className="board-piece" style={activatingTarget()}>
            <img src={getMiscImage("Crosshair")} className="crosshair" />
          </div>
        )}

      {localGameState.host.units.map((unit, i) => (
        <div key={i}>
          {unit && (
            <div className="board-piece" style={unitPosition(unit)}>
              <Piece
                unit={unit}
                movingUnit={props.movingUnit}
                tileMode={props.tileMode}
                selectUnitReason={props.selectUnitReason}
                selectUnitSpecial={props.selectUnitSpecial}
                expandedUnit={expandedUnit}
                setExpandedUnit={props.setExpandedUnit}
                validZones={props.validZones}
                selectUnit={props.selectUnit}
              />
            </div>
          )}
        </div>
      ))}

      {localGameState.guest.units.map((unit, i) => (
        <div key={-i - 1}>
          {unit && (
            <div className="board-piece" style={unitPosition(unit)}>
              <Piece
                unit={unit}
                movingUnit={props.movingUnit}
                tileMode={props.tileMode}
                selectUnitReason={props.selectUnitReason}
                selectUnitSpecial={props.selectUnitSpecial}
                expandedUnit={expandedUnit}
                setExpandedUnit={props.setExpandedUnit}
                validZones={props.validZones}
                selectUnit={props.selectUnit}
              />
            </div>
          )}
        </div>
      ))}

      <div
        className={
          self !== "guest" ? "tile-grid" : "tile-grid reversed-tile-grid"
        }
      >
        {props.zones.map((row, r) =>
          row.map((zone, c) => (
            <Tile
              key={zone.id}
              zone={zone}
              validZones={props.validZones}
              deployUnit={props.deployUnit}
              movingUnit={props.movingUnit}
              movingSpecial={props.movingSpecial}
              setMovingSpecial={props.setMovingSpecial}
              moveUnit={props.moveUnit}
              tileMode={props.tileMode}
              deployClass={props.deployClass}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Board;
