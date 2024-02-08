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

  const handleReturn = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Select Tactic</h2>

        <div className="twoColumn">
          <div
            className="tactic"
            style={{
              backgroundImage: `url(${getImage(0)})`,
            }}
          >
            {localGameState.tactics[0].face}
          </div>

          <div
            className="tactic"
            style={{
              backgroundImage: `url(${getImage(1)})`,
            }}
          >
            {localGameState.tactics[1].face}
          </div>
        </div>

        <button onClick={() => handleReturn()}>Return</button>
      </div>
    </div>
  );
};

export default TacticSelection;
