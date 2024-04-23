import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const TacticSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getTacticImage } = useRecurringEffects();

  let canUseTactic = [false, false];

  let skipMessage = "Return";

  if (
    localGameState.tactics[0] !== null &&
    !props.unit.temporary.used0thTactic &&
    localGameState.tactics[0].stock > 0 &&
    ["Advance", "Assault", "Mobilize"].includes(localGameState.tactics[0].face)
  ) {
    canUseTactic[0] = true;
  }

  if (
    localGameState.tactics[1] !== null &&
    !props.unit.temporary.used1stTactic &&
    localGameState.tactics[1].stock > 0 &&
    ["Advance", "Assault", "Mobilize"].includes(localGameState.tactics[1].face)
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

      let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Selecting Tactical Action",
        unit: unit,
        dice: i,
        face: newGameState.tactics[i].face,
      });

      dispatch(updateState(newGameState));
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">Select Tactic</h2>
        </div>

        {/* <h3></h3> */}
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
                  // style={{
                  //   backgroundImage: `url(${getTacticImage(tactic.face)})`,
                  // }}
                >
                  <img
                    src={getTacticImage(tactic.face)}
                    className="tactic-icon"
                  ></img>
                </div>
              </div>
              <div className="tactic-label">{tactic.face}</div>
              <br />
              <div className="tactic-label">Instances: {tactic.stock}</div>
            </div>
          ))}
        </div>

        {
          <button
            button
            className="choiceButton noYes"
            onClick={() => handleSkip()}
          >
            {skipMessage}
          </button>
        }
      </div>
    </div>
  );
};

export default TacticSelection;
