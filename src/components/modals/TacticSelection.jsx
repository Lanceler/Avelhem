import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Advance from "../../assets/diceIcons/Advance.png";
import Assault from "../../assets/diceIcons/Assault.png";
import Invoke from "../../assets/diceIcons/Invoke.png";
import Mobilize from "../../assets/diceIcons/Mobilize.png";

const TacticSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getVacantAdjacentZones, getZonesInRange } = useRecurringEffects();

  const getImage = (i) => {
    if (localGameState && localGameState.tactics[i]) {
      switch (localGameState.tactics[i].face) {
        case "Advance":
          return Advance;
        case "Mobilize":
          return Mobilize;
        case "Assault":
          return Assault;
        case "Invoke":
          return Invoke;
        default:
          return;
      }
    }
  };

  let canUseTactic = [true, true];

  if (props.unit.temporary.used0thTactic) {
    canUseTactic[0] = false;
  }
  if (props.unit.temporary.used1stTactic) {
    canUseTactic[1] = false;
  }

  const handleReturn = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleClickTactic = (i) => {
    if (canUseTactic[i] && localGameState.tactics[i].stock > 0) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //endTactic resolution
      newGameState.currentResolution.pop();

      if (newGameState.tactics[i].face === "Advance") {
        newGameState.currentResolution.push({
          resolution: "Using Advance Tactic",
          unit: props.unit,
          tactic: i,
        });
        dispatch(updateState(newGameState));
      } else if (newGameState.tactics[i].face === "Mobilize") {
        props.enterMoveMode(
          getVacantAdjacentZones(props.unit),
          props.unit,
          newGameState,
          i
        );
      } else if (newGameState.tactics[i].face === "Assault") {
        newGameState.currentResolution.push({
          resolution: "Using Assault Tactic",
          unit: props.unit,
          tactic: i,
        });
        dispatch(updateState(newGameState));
      }
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Select Tactic</h2>

        <div className="twoColumn">
          {localGameState.tactics.map((tactic, index) => (
            <div className="center" key={index}>
              <div
                className={`tacticBG ${
                  !tactic.stock ||
                  !canUseTactic[index] ||
                  tactic.face === "Invoke"
                    ? "disabledTacticBG"
                    : ""
                }`}
              >
                <div
                  key={index}
                  className={`tactic ${
                    !tactic.stock ||
                    !canUseTactic[index] ||
                    tactic.face === "Invoke"
                      ? "disabledTactic"
                      : ""
                  }`}
                  onClick={() => handleClickTactic(index)}
                  style={{
                    backgroundImage: `url(${getImage(index)})`,
                  }}
                >
                  {console.log(tactic)}
                </div>
              </div>
              {tactic.face}
              <br />
              Instances: {tactic.stock}
            </div>
          ))}
        </div>

        <button onClick={() => handleReturn()}>Return</button>
      </div>
    </div>
  );
};

export default TacticSelection;
