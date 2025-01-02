import "./../Board.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useGetImages } from "../../hooks/useGetImages";

import Tile from "./Tile";
import Piece from "./Piece";

const Board = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const {
    getZonesInRange, // needed for quick movement testing
    enterMoveMode,
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

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 47:
          case 54:
          case 61:
          case 66:
          case 119:
            return element1 === "Tactic Button";

          case 87:
            return element1 === "Ability Button";

          case 95:
            return element1 === "Info Button";

          case 103:
            return element1 === "Skill Button";
        }

      //   /////////////////////////////////////////
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 47:
          case 54:
          case 61:
          case 66:
          case 87:
          case 95:
          case 103:
          case 119:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  const handleUnitOptions = (option) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    switch (option) {
      case "Info":
        props.setUnitInfor(expandedUnit);

        // //for testing: quick movement

        // props.updateLocalState(
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
              handleUpdateDemoGuide();
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
                    handleUpdateDemoGuide();
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
                        handleUpdateDemoGuide();
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
                        handleUpdateDemoGuide();
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
          <div className="crosshair-initial" style={activatingTarget()}>
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
