import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import InfoPopUp from "./InfoPopUp";

const SelectTacticalAction = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

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
    isMuted,
    isRooted,
  } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = newGameState[props.unit.player].units[props.unit.unitIndex];
  let face = props.face;

  let message = null;
  if (isRooted(unit)) {
    message =
      "You are rooted: You cannot strike, and you must spend 1 skill to traverse or Virtue-blast via tactical action.";
  }

  let abilityDetails = [];
  switch (face) {
    case "Advance":
      abilityDetails = [
        {
          abilityName: "Traverse",
          abilityQualifier: <div className=""></div>,
          abilityText: (
            <>
              <div className=" ">⬩Move to a vacant adjacent zone.</div>
            </>
          ),
        },
        {
          abilityName: "Virtue-blast",
          abilityQualifier: <div className=""></div>,
          abilityText: (
            <>
              <div className="">
                {/* ⬩Spend your Virtue to blast an adjacent enemy. <br /> <br /> */}
                {/* (The enemy may spend their Virtue and transfer it to the
                attacker to reduce the attack’s AP by 1.) */}
                ⬩Spend your Virtue to blast an adjacent enemy. The enemy may
                mitigate it.{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="question-icon"
                  onClick={() => setInfoPopUp("Virtue-Blast Mitigation")}
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
      abilityDetails = [
        {
          abilityName: "Traverse",
          abilityQualifier: <div className=""></div>,
          abilityText: (
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
      abilityDetails = [
        {
          abilityName: "Traverse",
          abilityQualifier: <div className=""></div>,
          abilityText: (
            <>
              <div className="">⬩Move to a vacant adjacent zone.</div>
            </>
          ),
        },
        {
          abilityName: "Strike",
          abilityQualifier: <div className=""></div>,
          abilityText: (
            <>
              <div className=" ">⬩Attack an adjacent enemy.</div>
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
              unit.virtue &&
              canBlast(unit) &&
              unit.unitClass !== "Pawn" &&
              !isDisrupted(unit, 2) &&
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
          }

          dispatch(updateState(newGameState));
        } else if (selectedChoice === 1) {
          if (!isRooted(unit)) {
            //give unit activationCounter
            unit.temporary.activation
              ? (unit.temporary.activation += 1)
              : (unit.temporary.activation = 1);

            newGameState[unit.player].units[unit.unitIndex] = unit;
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
          } else {
            newGameState.currentResolution.push({
              resolution: "Misc.",
              resolution2: "Rooted Virtue-blast",
              unit: unit,
              details: {
                title: "Tactical Action",
                message:
                  "You are rooted. You must spend 1 skill to Virtue-blast.",
                restriction: null,
                reason: "Rooted Virtue-blast",
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
          }
          dispatch(updateState(newGameState));
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
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Tactical Action: {face}</div>
        </div>

        {message && (
          <>
            <h3 style={{ maxWidth: 700 }}>{message}</h3>
          </>
        )}

        <br />

        <div className="modalContent">
          {abilityDetails.map((detail, i) => (
            <div
              key={i}
              className={`modal-option-outline ${
                selectedChoice === i ? "selected-modal-option" : ""
              } ${canClick("Action", i) ? "demoClick" : ""}    `}
              onClick={() => {
                handleChoice(i);
                handleUpdateDemoGuide();
              }}
            >
              <div
                className={`modal-option-content ${
                  canChoice(i) ? "" : "disabled-modal-option-content"
                } `}
              >
                <div className="modal-option-header modal-option-header-ability">
                  <div className="modal-option-title ">
                    {detail.abilityName}
                  </div>

                  <div>{detail.abilityQualifier}</div>
                </div>
                <div className="modalChoiceText">{detail.abilityText}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="modalBottomButton">
          {selectedChoice === null && (
            <button className="redButton" onClick={() => handleReturn()}>
              Return
            </button>
          )}

          {selectedChoice !== null && (
            <button
              className={`redButton ${
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
