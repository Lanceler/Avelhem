import React, { useState, useEffect } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";
import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const SelectTacticalAction = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const {
    canBlast,
    canMove,
    canStrike,
    enterSelectUnitMode,
    getVacantAdjacentZones,
    getZonesWithEnemies,
    isImmobilized,
    isMuted,
    isRooted,
  } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = newGameState[props.unit.player].units[props.unit.unitIndex];
  let face = props.face;

  let message = null;
  if (isRooted(unit)) {
    message =
      "You are rooted: You cannot strike nor Virtue-blast, and you must spend 1 skill to traverse via tactical action.";
  }

  let abilityDetails = [];
  switch (face) {
    case "Advance":
      abilityDetails = [
        {
          abilityName: "Traverse",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Move to a vacant adjacent zone.
              </div>
            </>
          ),
        },
        {
          abilityName: "Virtue-blast",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend your Virtue to blast an adjacent enemy. <br /> <br />
                (The enemy may spend their Virtue and transfer it to the
                attacker to reduce the attack’s AP by 1.)
              </div>
            </>
          ),
        },
      ];
      break;

    case "Mobilize":
      abilityDetails = [
        {
          abilityName: "Traverse",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Use 1 instance to move to a vacant adjacent zone.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Assault":
      abilityDetails = [
        {
          abilityName: "Traverse",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Move to a vacant adjacent zone.
              </div>
            </>
          ),
        },
        {
          abilityName: "Strike",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">⬩Attack an adjacent enemy.</div>
              <div className="abilityText ">
                ⬩If the attack was lethal, move to the zone they occupied.
                (Bypass Motion contingent skills.)
              </div>
            </>
          ),
        },
      ];
      break;
  }

  const canChoice = (i) => {
    switch (face) {
      case "Advance":
        switch (i) {
          case 0:
            if (isImmobilized(unit) || !canMove(unit)) {
              return false;
            }

            if (
              isRooted(unit) &&
              localGameState[unit.player].skillHand.length < 1
            ) {
              return false;
            } else {
              return true;
            }

          case 1:
            return (
              unit.virtue &&
              canBlast(unit) &&
              !isRooted(unit) &&
              unit.unitClass !== "Pawn"
            );
        }
        break;

      case "Mobilize":
        switch (i) {
          case 0:
            if (isImmobilized(unit) || !canMove(unit)) {
              return false;
            }

            if (
              isRooted(unit) &&
              localGameState[unit.player].skillHand.length < 1
            ) {
              return false;
            } else {
              return true;
            }
        }
        break;

      case "Assault":
        switch (i) {
          case 0:
            if (isImmobilized(unit) || !canMove(unit)) {
              return false;
            }

            if (
              isRooted(unit) &&
              localGameState[unit.player].skillHand.length < 1
            ) {
              return false;
            } else {
              return true;
            }

          case 1:
            return canStrike(unit);
        }
        break;
    }
    return false;
  };

  const handleChoice = (i) => {
    if (selectedChoice === i) {
      setSelectedChoice(null);
    } else if (canChoice(i)) {
      setSelectedChoice(i);
    }
  };

  const handleSelect = () => {
    newGameState.currentResolution.pop();

    switch (face) {
      case "Advance":
        if (selectedChoice === 0) {
          if (!isRooted(unit)) {
            props.enterMoveMode(
              getVacantAdjacentZones(unit),
              unit,
              newGameState,
              props.dice
            );
          } else {
            newGameState.currentResolution.push({
              resolution: "Misc.",
              resolution2: "Rooted Traverse",
              unit: unit,
              details: {
                title: "Tactical Action",
                message: "You are rooted. You must spend 1 skill to traverse.",
                restriction: null,
                reason: "Rooted Traverse",
                tactic: props.dice,
              },
            });

            dispatch(updateState(newGameState));
          }
        } else if (selectedChoice === 1) {
          //give unit activationCounter
          unit.temporary.activation
            ? (unit.temporary.activation += 1)
            : (unit.temporary.activation = 1);

          newGameState[unit.player].units[unit.unitIndex] = unit;

          //newGameState.activatingSkill.push("Advance") <-- to do?
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
          });

          enterSelectUnitMode(
            getZonesWithEnemies(props.unit, 1),
            props.unit,
            newGameState,
            props.dice,
            "virtue-blast",
            null
          );
        }
        break;

      case "Mobilize":
        if (selectedChoice === 0) {
          if (!isRooted(unit)) {
            props.enterMoveMode(
              getVacantAdjacentZones(unit),
              unit,
              newGameState,
              props.dice
            );
          } else {
            newGameState.currentResolution.push({
              resolution: "Misc.",
              resolution2: "Rooted Traverse",
              unit: unit,
              details: {
                title: "Tactical Action",
                message: "You are rooted. You must spend 1 skill to traverse.",
                restriction: null,
                reason: "Rooted Traverse",
                tactic: props.dice,
              },
            });

            dispatch(updateState(newGameState));
          }
        }
        break;

      case "Assault":
        if (selectedChoice === 0) {
          if (!isRooted(unit)) {
            props.enterMoveMode(
              getVacantAdjacentZones(unit),
              unit,
              newGameState,
              props.dice
            );
          } else {
            newGameState.currentResolution.push({
              resolution: "Misc.",
              resolution2: "Rooted Traverse",
              unit: unit,
              details: {
                title: "Tactical Action",
                message: "You are rooted. You must spend 1 skill to traverse.",
                restriction: null,
                reason: "Rooted Traverse",
                tactic: props.dice,
              },
            });

            dispatch(updateState(newGameState));
          }
        } else if (selectedChoice === 1) {
          //give unit activationCounter
          unit.temporary.activation
            ? (unit.temporary.activation += 1)
            : (unit.temporary.activation = 1);

          newGameState[unit.player].units[unit.unitIndex] = unit;

          //newGameState.activatingSkill.push("Advance") <-- to do?
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
          });

          enterSelectUnitMode(
            getZonesWithEnemies(props.unit, 1),
            props.unit,
            newGameState,
            props.dice,
            "strike",
            null
          );
        }
        break;
    }

    // dispatch(updateState(newGameState));
  };

  const handleReturn = () => {
    newGameState.currentResolution.pop();
    dispatch(updateState(newGameState));
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.42":
      case "Learn1.50":
      case "Learn1.56":
      case "Learn1.61":
      case "Learn1.252":
      case "Learn1.271":
        return element === "Action" && element2 === 0;

      case "Learn1.132":
      case "Learn1.260":
        return element === "Action" && element2 === 1;

      case "Learn1.43":
      case "Learn1.51":
      case "Learn1.57":
      case "Learn1.62":
      case "Learn1.133":
      case "Learn1.253":
      case "Learn1.261":
      case "Learn1.272":
        return element === "Select Button";

      ///////////////////////

      case "Fire1.23":
        return element === "Action" && element2 === 0;

      case "Fire1.24":
        return element === "Select Button";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.42":
        dispatch(updateDemo("Learn1.43"));
        break;

      case "Learn1.43":
        dispatch(updateDemo("Learn1.44"));
        break;

      case "Learn1.50":
        dispatch(updateDemo("Learn1.51"));
        break;

      case "Learn1.51":
        dispatch(updateDemo("Learn1.52"));
        break;

      case "Learn1.56":
        dispatch(updateDemo("Learn1.57"));
        break;

      case "Learn1.57":
        dispatch(updateDemo("Learn1.58"));
        break;

      case "Learn1.61":
        dispatch(updateDemo("Learn1.62"));
        break;

      case "Learn1.62":
        dispatch(updateDemo("Learn1.63"));
        break;

      case "Learn1.132":
        dispatch(updateDemo("Learn1.133"));
        break;

      case "Learn1.133":
        dispatch(updateDemo("Learn1.134"));
        break;

      case "Learn1.252":
        dispatch(updateDemo("Learn1.253"));
        break;

      case "Learn1.253":
        dispatch(updateDemo("Learn1.254"));
        break;

      case "Learn1.260":
        dispatch(updateDemo("Learn1.261"));
        break;

      case "Learn1.261":
        dispatch(updateDemo("Learn1.262"));
        break;

      case "Learn1.271":
        dispatch(updateDemo("Learn1.272"));
        break;

      case "Learn1.272":
        dispatch(updateDemo("Learn1.273"));
        break;

      /////////////////////////

      case "Fire1.23":
        dispatch(updateDemo("Fire1.24"));
        break;

      case "Fire1.24":
        dispatch(updateDemo("Fire1.25"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div
        className={`modal ${
          abilityDetails.length === 1
            ? "singleAbilityModal"
            : "dualAbilityModal"
        }`}
      >
        <div className="">
          <h2 className="choiceTitle">Tactical Action: {face}</h2>
        </div>

        {message && <h4>{message}</h4>}

        <div
          className={`${
            abilityDetails.length === 2 ? "twoColumn" : "oneAbility"
          } column-centered`}
        >
          {abilityDetails.map((detail, i) => (
            <div
              key={i}
              className={`customChoice ${
                selectedChoice === i ? "selectedChoice" : ""
              } ${canClick("Action", i) ? "demoClick" : ""}    `}
              style={{ backgroundImage: `url(${GoldFrame})` }}
              onClick={() => {
                handleChoice(i);
                handleUpdateDemoGuide();
              }}
            >
              <div
                // className="abilityFrame"
                className={`abilityFrame ${
                  canChoice(i) ? "" : "disabledAbility"
                } `}
              >
                <div className="abilityHeader">
                  <h3 className="abilityName ">{detail.abilityName}</h3>

                  <div>{detail.abilityQualifier}</div>
                </div>
                <div className="abilityContent scrollable">
                  {detail.abilityText}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedChoice === null && (
          <button className="choiceButton" onClick={() => handleReturn()}>
            Return
          </button>
        )}

        {selectedChoice !== null && (
          <button
            className={`choiceButton ${
              canClick("Select Button") ? "demoClick" : ""
            }`}
            onClick={() => {
              handleSelect();
              handleUpdateDemoGuide();
            }}
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectTacticalAction;
