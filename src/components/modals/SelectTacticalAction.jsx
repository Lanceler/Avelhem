import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import InfoPopUp from "./InfoPopUp";

const SelectTacticalAction = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const [infoPopUp, setInfoPopUp] = useState(null);

  const {
    canBlast,
    canMove,
    canStrike,
    enterMoveMode,
    enterSelectUnitMode,
    getVacantAdjacentZones,
    getZonesWithEnemies,
    isDisrupted,
    isImmobilized,
    isRooted,
  } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = newGameState[props.unit.player].units[props.unit.unitIndex];
  let face = props.face;

  let message = null;
  if (isRooted(unit)) {
    message =
      "You are rooted: You cannot strike, and you must spend 1 skill to traverse or Aether-blast via tactical action.";
  }

  let optionDetails = [];
  switch (face) {
    case "Advance":
      optionDetails = [
        {
          optionName: "Traverse",
          optionText: (
            <>
              <div className=" ">⬩Move to a vacant adjacent zone.</div>
            </>
          ),
        },
        {
          optionName: "Aether-blast",

          optionText: (
            <>
              <div className="">
                ⬩Spend your Aether to blast an adjacent foe. The foe may
                mitigate it.{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="question-icon"
                  onClick={() => setInfoPopUp("Aether-Blast Mitigation")}
                  style={{ height: 17 }}
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                </svg>
              </div>
            </>
          ),
        },
      ];
      break;

    case "Mobilize":
      optionDetails = [
        {
          optionName: "Traverse",

          optionText: (
            <>
              <div className="">
                ⬩Use 1 instance to move to a vacant adjacent zone.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Assault":
      optionDetails = [
        {
          optionName: "Traverse",

          optionText: (
            <>
              <div className="">⬩Move to a vacant adjacent zone.</div>
            </>
          ),
        },
        {
          optionName: "Strike",

          optionText: (
            <>
              <div className=" ">⬩Attack an adjacent foe.</div>
              <div className=" ">
                ⬩If the attack was lethal, move to the zone they occupied.
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
              unit.aether &&
              canBlast(unit) &&
              unit.unitClass !== "Pawn" &&
              !isDisrupted(unit, 1) &&
              (isRooted(unit)
                ? localGameState[unit.player].skillHand.length > 0
                : true)
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
            newGameState = enterMoveMode(
              getVacantAdjacentZones(unit),
              unit,
              newGameState,
              props.dice,
              true
            );
          } else {
            newGameState.currentResolution.push({
              resolution: "Discard Skill",
              unit: unit,
              player: unit.player,
              details: {
                title: "Tactical Action",
                message:
                  "You are rooted. You must spend 1 skill to traverse via tactical action.",
                restriction: null,
                reason: "Rooted Traverse",
                tactic: props.dice,
              },
            });
          }

          dispatch(updateState(newGameState));
        } else if (selectedChoice === 1) {
          if (!isRooted(unit)) {
            //give unit activationCounter
            unit.temporary.activation
              ? (unit.temporary.activation += 1)
              : (unit.temporary.activation = 1);

            //newGameState[unit.player].units[unit.unitIndex] = unit;
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
              "aether-blast",
              null,
              true
            );
          } else {
            newGameState.currentResolution.push({
              resolution: "Discard Skill",
              unit: unit,
              player: unit.player,
              details: {
                title: "Tactical Action",
                message:
                  "You are rooted. You must spend 1 skill to Aether-blast via tactical action.",
                restriction: null,
                reason: "Rooted Aether-blast",
                tactic: props.dice,
              },
            });

            dispatch(updateState(newGameState));
          }
        }

        break;

      case "Mobilize":
        if (selectedChoice === 0) {
          if (!isRooted(unit)) {
            newGameState = enterMoveMode(
              getVacantAdjacentZones(unit),
              unit,
              newGameState,
              props.dice,
              true
            );
          } else {
            newGameState.currentResolution.push({
              resolution: "Discard Skill",
              unit: unit,
              player: unit.player,
              details: {
                title: "Tactical Action",
                message:
                  "You are rooted. You must spend 1 skill to traverse via tactical action.",
                restriction: null,
                reason: "Rooted Traverse",
                tactic: props.dice,
              },
            });
          }

          dispatch(updateState(newGameState));
        }
        break;

      case "Assault":
        if (selectedChoice === 0) {
          if (!isRooted(unit)) {
            newGameState = enterMoveMode(
              getVacantAdjacentZones(unit),
              unit,
              newGameState,
              props.dice,
              true
            );
          } else {
            newGameState.currentResolution.push({
              resolution: "Discard Skill",
              unit: unit,
              player: unit.player,
              details: {
                title: "Tactical Action",
                message:
                  "You are rooted. You must spend 1 skill to traverse via tactical action.",
                restriction: null,
                reason: "Rooted Traverse",
                tactic: props.dice,
              },
            });
          }
          dispatch(updateState(newGameState));
        } else if (selectedChoice === 1) {
          //give unit activationCounter
          unit.temporary.activation
            ? (unit.temporary.activation += 1)
            : (unit.temporary.activation = 1);

          //newGameState[unit.player].units[unit.unitIndex] = unit;

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
            null,
            true
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

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 51:
          case 57:
          case 117:
            return element1 === "Action" && element2 === 0;

          case 52:
          case 58:
          case 118:
            return element1 === "Select Button";

          /////////////////////
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 51:
          case 52:
          case 57:
          case 58:
          case 117:
          case 118:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Tactical Action: {face}</div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{message}</div>

          <div className={`modalContent${optionDetails.length}Column`}>
            {optionDetails.map((detail, i) => (
              <div
                key={i}
                // className={`modal-option-outline ${
                //   selectedChoice === i ? "selected-modal-option" : ""
                // } ${canClick("Action", i) ? "demoClick" : ""}    `}
                className={`modalOptionOutline
                  modalMediumOptionOutline
                   ${
                     selectedChoice === i
                       ? "modalMediumOptionOutlineSelected"
                       : ""
                   } `}
                onClick={() => {
                  handleChoice(i);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalMedium ${
                    canChoice(i) ? "" : "disabledModal"
                  } 
                  ${canClick("Action", i) ? "demoClick" : ""}`}
                  style={{
                    boxShadow: selectedChoice === i ? "none" : "",
                  }}
                >
                  <div className="modalOptionHeader">
                    <div className="modalOptionTitle">{detail.optionName}</div>
                  </div>
                  <div className="modalOptionText">{detail.optionText}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedChoice === null && (
            <button className="redButton2" onClick={() => handleReturn()}>
              Return
            </button>
          )}

          {selectedChoice !== null && (
            <button
              className={`redButton2 ${
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
      {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />}
    </div>
  );
};

export default SelectTacticalAction;
