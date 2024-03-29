import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const TacticSelectionViaEffect = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const {
    canMove,
    canStrike,
    getTacticImage,
    getVacantAdjacentZones,
    getZonesInRange,
  } = useRecurringEffects();

  let canUseTactic = [false, false];

  if (
    localGameState.tactics[0] !== null &&
    !props.unit.temporary.used0thTactic &&
    props.details.restriction.includes(localGameState.tactics[0].face) &&
    localGameState.tactics[0].stock >= props.details.stock
  ) {
    canUseTactic[0] = true;
  }

  if (
    localGameState.tactics[1] !== null &&
    !props.unit.temporary.used1stTactic &&
    props.details.restriction.includes(localGameState.tactics[1].face) &&
    localGameState.tactics[1].stock >= props.details.stock
  ) {
    canUseTactic[1] = true;
  }

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Tactic Selection
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleClickTactic = (i) => {
    if (canUseTactic[i] && localGameState.tactics[i].stock > 0) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end Tactic Selection
      newGameState.currentResolution.pop();

      //deduct stock from tactic
      newGameState.tactics[i].stock -= props.details.stock;

      let unit = null;
      if (props.unit !== undefined) {
        unit = newGameState[props.unit.player].units[props.unit.unitIndex];

        //prevent unit from using tactic again
        if (newGameState.tactics[i].face === "Mobilize") {
          if (i === 0) {
            unit.temporary.used0thTactic = true;
          } else if (i === 1) {
            unit.temporary.used1stTactic = true;
          }
        }
      }

      switch (props.details.reason) {
        case "Surge":
          unit.virtue = 1;

          if (canMove(unit) || canStrike(unit)) {
            newGameState.currentResolution.push({
              resolution: "Mana Skill",
              resolution2: "Surge2",
              unit: unit,
              details: {
                title: "Surge",
                reason: "Surge2",
              },
            });
          }

          newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
          break;

        case "Diffusion":
          //2. Continue
          newGameState.currentResolution.push({
            resolution: "Mana Skill",
            resolution2: "Diffusion3",
            unit: unit,
          });

          //1. Blast 1st enemy
          newGameState.currentResolution.push({
            resolution: "Mana Skill",
            resolution2: "Diffusion2",
            unit: unit,
          });

          newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
          break;

        default:
          break;
      }

      dispatch(updateState(newGameState));
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.details.title}</h2> */}

        <div className="twoColumn">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{props.details.message}</h3>
        <br />

        <div className="twoColumn">
          {localGameState.tactics.map((tactic, index) => (
            <div className="center" key={index}>
              <div
                className={`tacticBG ${
                  !canUseTactic[index] ? "disabledTacticBG" : ""
                }`}
              >
                <div
                  key={index}
                  className={`tactic ${
                    !canUseTactic[index] ? "disabledTactic" : ""
                  }`}
                  onClick={() => handleClickTactic(index)}
                  style={{
                    backgroundImage: `url(${getTacticImage(index)})`,
                  }}
                ></div>
              </div>
              {tactic.face}
              <br />
              Instances: {tactic.stock}
            </div>
          ))}
        </div>

        {props.details.canSkip && (
          <button onClick={() => handleSkip()}>Skip</button>
        )}
      </div>
    </div>
  );
};

export default TacticSelectionViaEffect;
