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
    activateAegis,
    activateFrenzyBlade,
    activateHealingRain,
    activateGuardianWings,
    activatePitfallTrap,
    activateViridianGrave,
    activateSymphonicScreech,
    aetherRestoreSpecial,
    applyBurnDamage,
    ascendPawn,
    avelhemToScion,
    blast,
    grantRavager,
    freeze1,
    freeze2,
    ignite,
    isAdjacent,
    paralyze1,
    strike,
    aetherBlast,
  } = useRecurringEffects();
  const { getMiscImage } = useGetImages();

  const expandedUnit = props.expandedUnit;

  const selectUnit = (unit, selectedUnit, reason, special) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (props.tacticUsed !== null) {
      newGameState.tactics[props.tacticUsed].stock--;
    }

    //end ""Selecting Unit"
    newGameState.currentResolution.pop();

    switch (reason) {
      case "activate avelhem":
        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          avelhemToScion(special),
          "Avelhem",
          unit // repurposed to use as parameter for resonator
        );
        break;

      case "aether-blast":
        newGameState = aetherBlast(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit
        );
        break;

      case "blast":
        newGameState = blast(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "strike":
        newGameState = strike(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "ignite":
        newGameState = ignite(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit
        );
        break;

      case "burn damage":
        newGameState = applyBurnDamage(newGameState, selectedUnit);

        break;

      case "paralyze1":
        newGameState = paralyze1(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "freeze1":
        newGameState = freeze1(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "freeze2":
        newGameState = freeze2(
          newGameState,
          newGameState[unit.player].units[unit.unitIndex],
          selectedUnit,
          special
        );
        break;

      case "fiery heart":
        let fieryHeartAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        delete fieryHeartAlly.afflictions.burn;
        delete fieryHeartAlly.afflictions.frost;
        break;

      case "purification":
        let purificationAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        delete purificationAlly.afflictions.paralysis;
        delete purificationAlly.afflictions.frost;
        delete purificationAlly.afflictions.burn;
        delete purificationAlly.afflictions.infection;

        if (isAdjacent(unit, purificationAlly)) {
          if (purificationAlly.enhancements.ward > 0) {
            purificationAlly.enhancements.ward = Math.max(
              purificationAlly.enhancements.ward,
              2
            );
          } else {
            purificationAlly.enhancements.ward = 2;
          }
        }
        break;

      case "healing rain":
        newGameState = activateHealingRain(newGameState, selectedUnit, unit);
        break;

      case "kleptothermy ally":
        newGameState = aetherRestoreSpecial(newGameState, selectedUnit);
        break;

      case "kleptothermy enemy":
        newGameState[selectedUnit.player].units[
          selectedUnit.unitIndex
        ].aether = 0;
        break;

      case "hydrotherapy":
        let hydrotherapyAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        delete hydrotherapyAlly.afflictions.burn;
        delete hydrotherapyAlly.afflictions.frost;
        delete hydrotherapyAlly.afflictions.paralysis;
        break;

      case "aerial impetus prompt":
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Aerial Impetus Prompt",
          unit: selectedUnit,
        });
        break;

      case "aerial impetus purge":
        newGameState.currentResolution.push({
          resolution: "Wind Skill",
          resolution2: "Aerial Impetus Purge",
          unit: unit,
          victim: selectedUnit,
        });
        break;

      case "gale conjuration purge":
        let galeConjurationEnemy =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];
        delete galeConjurationEnemy.enhancements.shield;
        delete galeConjurationEnemy.enhancements.ward;

        if (isAdjacent(unit, galeConjurationEnemy)) {
          galeConjurationEnemy.aether = 0;
        }
        break;

      case "gale conjuration restore":
        newGameState = aetherRestoreSpecial(newGameState, selectedUnit);
        break;

      case "second wind prompt":
        newGameState.currentResolution.push({
          resolution: "Unit Talent",
          resolution2: "Second Wind Prompt",
          unit: selectedUnit,
        });
        break;

      case "symphonic screech":
        newGameState = activateSymphonicScreech(
          newGameState,
          selectedUnit,
          unit
        );
        break;

      case "pitfall trap":
        newGameState = activatePitfallTrap(newGameState, selectedUnit, unit);
        break;

      case "aegis":
        newGameState = activateAegis(newGameState, selectedUnit, unit);
        break;

      case "amplify aura":
        newGameState[selectedUnit.player].units[
          selectedUnit.unitIndex
        ].aether = 0;

        if (
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex]
            .enhancements.shield > 0
        ) {
          newGameState[selectedUnit.player].units[
            selectedUnit.unitIndex
          ].enhancements.shield = Math.max(
            newGameState[selectedUnit.player].units[selectedUnit.unitIndex]
              .enhancements.shield,
            2
          );
        } else {
          newGameState[selectedUnit.player].units[
            selectedUnit.unitIndex
          ].enhancements.shield = 2;
        }
        break;

      case "frenzy blade":
        newGameState = activateFrenzyBlade(newGameState, selectedUnit, unit);
        break;

      case "sow and reap striker":
        //give SelectedUnit activationCounter
        let striker =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];
        striker.temporary.activation
          ? (striker.temporary.activation += 1)
          : (striker.temporary.activation = 1);

        newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
          striker;

        newGameState.activatingUnit.push(striker);

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: selectedUnit,
        });

        newGameState.currentResolution.push({
          resolution: "Plant Skill",
          resolution2: "Sow and Reap Strike",
          unit: selectedUnit,
        });

        break;

      case "viridian grave":
        newGameState = activateViridianGrave(newGameState, selectedUnit, unit);
        break;

      case "ambrosia":
        let ambrosiaAlly =
          newGameState[selectedUnit.player].units[selectedUnit.unitIndex];

        delete ambrosiaAlly.afflictions.burn;
        delete ambrosiaAlly.afflictions.frost;
        delete ambrosiaAlly.afflictions.paralysis;

        // newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
        //   ambrosiaAlly;
        break;

      case "raptor blitz purge":
        newGameState[selectedUnit.player].units[
          selectedUnit.unitIndex
        ].aether = 0;
        break;

      case "guardian wings":
        newGameState = activateGuardianWings(newGameState, selectedUnit, unit);
        break;

      case "vanguard fleet":
        let vanguardFleetUser = newGameState[unit.player].units[unit.unitIndex];

        vanguardFleetUser.temporary.previousTarget = selectedUnit.unitIndex;

        newGameState.currentResolution.push({
          resolution: "Avian Skill",
          resolution2: "Vanguard Fleet Prompt",
          unit: selectedUnit,
        });
        break;

      case "ambidexterity":
        newGameState[selectedUnit.player].units[
          selectedUnit.unitIndex
        ].boosts.ambidexterity = true;

        if (special === "resonated") {
          newGameState.currentResolution.push({
            resolution: "Sovereign Resonant Skill",
            resolution2: "AmbidexterityR1",
            player: self,
            unit: selectedUnit,
          });
        }

        if (
          (localGameState.tactics[0].face === "Advance" &&
            localGameState.tactics[0].stock > 0) ||
          (localGameState.tactics[1].face === "Advance" &&
            localGameState.tactics[1].stock > 0)
        ) {
          newGameState.currentResolution.push({
            resolution: "Sovereign Resonant Skill",
            resolution2: "Ambidexterity Conversion",
            details: {
              title: "Ambidexterity",
              message: "You may convert an Advance tactic into Invoke.",
              restriction: ["Advance"],
              stock: 1,
              reason: "Ambidexterity",
              canSkip: true,
            },
          });
        }
        break;

      case "dark halo":
        newGameState[selectedUnit.player].units[selectedUnit.unitIndex] =
          grantRavager(
            newGameState[selectedUnit.player].units[selectedUnit.unitIndex]
          );
        break;

      case "fated rivalry":
        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          unit.unitClass,
          "Fated Rivalry",
          null,
          unit
        );
        break;

      case "match made in heaven":
        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          unit.unitClass,
          "Match Made in Heaven",
          null,
          unit
        );
        break;

      case "vengeful legacy":
        newGameState.currentResolution.push({
          resolution: "Sovereign Contingent Skill",
          resolution2: "Vengeful Legacy2",
          player: self,
          unit: selectedUnit,
        });

        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          unit.unitClass,
          "Vengeful Legacy",
          null,
          unit
        );
        break;

      case "destine":
        newGameState = ascendPawn(
          newGameState,
          selectedUnit,
          special,
          "Destine",
          null
        );
        break;

      default:
        break;
    }

    props.selectUnitEnd(newGameState);
  };

  const activatingTarget = () => {
    const lastUnit = localGameState.activatingTarget.at(-1);
    if (!lastUnit) return;

    const unit = localGameState[lastUnit.player].units[lastUnit.unitIndex];
    if (!unit) return;

    const row = self === "guest" ? 9 - unit.row : unit.row;
    const col = self === "guest" ? 4 - unit.column : unit.column;

    return {
      position: "absolute",
      zIndex: 101,
      top: 13 + 78 * row,
      left: 13 + 78 * col,
    };
  };

  const activatingUnit = () => {
    const lastUnit = localGameState.activatingUnit.at(-1);
    if (!lastUnit) return;

    const unit = localGameState[lastUnit.player].units[lastUnit.unitIndex];
    if (!unit) return;

    const row = self === "guest" ? 9 - unit.row : unit.row;
    const col = self === "guest" ? 4 - unit.column : unit.column;

    return {
      position: "absolute",
      zIndex: 101,
      top: 21 + 78 * row,
      left: 21 + 78 * col,
    };
  };

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 49:
          case 55:
          case 61:
          case 115:
            return element1 === "Tactic Button";

          case 72:
            return element1 === "Ability Button";

          case 79:
          case 110:
            return element1 === "Info Button";

          case 99:
            return element1 === "Skill Button";
        }

      //   /////////////////////////////////////////
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 49:
          case 55:
          case 61:
          case 72:
          case 79:
          case 99:
          case 110:
          case 115:
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

  const unitOptions = () => {
    const isExecutionPhase =
      localGameState.currentResolution.at(-1)?.resolution === "Execution Phase";

    const showOtherButtons =
      isExecutionPhase &&
      expandedUnit &&
      self === expandedUnit.player &&
      self === localGameState.turnPlayer &&
      props.userRole !== "spectator";

    return (
      <>
        <div
          className={`pieceOption ${
            canClick("Info Button") ? "demoClick" : ""
          }`}
          style={
            unitButtonPosition(
              expandedUnit ? expandedUnit : { row: 100, column: 100 }
            )[0]
          }
          onClick={() => {
            handleUnitOptions("Info");
            handleUpdateDemoGuide();
          }}
        >
          <div className="optionIcon">
            <img src={getMiscImage("UnitProfile")} className="unitOptions" />
          </div>
        </div>

        <div
          style={
            showOtherButtons
              ? {}
              : { opacity: 0, pointerEvents: "none", userSelect: "none" }
          }
        >
          <div
            className={`pieceOption ${
              canClick("Tactic Button") ? "demoClick" : ""
            }`}
            style={
              unitButtonPosition(
                expandedUnit ? expandedUnit : { row: 100, column: 100 }
              )[1]
            }
            onClick={() => {
              handleUnitOptions("Tactic");
              handleUpdateDemoGuide();
            }}
          >
            <div className="optionIcon">
              <img src={getMiscImage("UnitTactic")} className="unitOptions" />
            </div>
          </div>
          <div
            style={
              expandedUnit?.unitClass !== "Pawn"
                ? {}
                : { opacity: 0, pointerEvents: "none", userSelect: "none" }
            }
          >
            <div
              className={`pieceOption ${
                canClick("Ability Button") ? "demoClick" : ""
              }`}
              style={
                unitButtonPosition(
                  expandedUnit ? expandedUnit : { row: 100, column: 100 }
                )[2]
              }
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
              style={
                unitButtonPosition(
                  expandedUnit ? expandedUnit : { row: 100, column: 100 }
                )[3]
              }
              onClick={() => {
                handleUnitOptions("Skill");
                handleUpdateDemoGuide();
              }}
            >
              <div className="optionIcon">
                <img src={getMiscImage("UnitSkill")} className="unitOptions" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {unitOptions()}

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

      {[...localGameState.host.units, ...localGameState.guest.units].map(
        (unit, i) => (
          <div key={unit ? unit.player + unit.unitIndex : i}>
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
                  selectUnit={selectUnit}
                />
              </div>
            )}
          </div>
        )
      )}

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
