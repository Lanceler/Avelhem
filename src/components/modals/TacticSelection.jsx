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

  const { getZonesInRange } = useRecurringEffects();

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

  const handleClickTactic = (i) => {
    if (localGameState.tactics[i].stock > 0) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //endTactic resolution
      newGameState.currentResolution.pop();

      if (newGameState.tactics[i].face === "Advance") {
        console.log("Advanced used by Unit " + props.unit.unitIndex);

        props.enterMoveMode(
          getZonesInRange(props.unit.row, props.unit.column, 1, false),
          props.unit.unitIndex,
          props.unit.player,
          newGameState,
          i
        );
      }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Select Tactic</h2>

        <div className="twoColumn">
          {localGameState.tactics.map((tactic, index) => (
            <div
              key={index}
              className="tactic"
              onClick={() => handleClickTactic(index)}
              style={{
                backgroundImage: `url(${getImage(index)})`,
              }}
            >
              {console.log(tactic)}
              {tactic.face}
              <br />
              Stock: {tactic.stock}
            </div>
          ))}
        </div>

        <button onClick={() => handleReturn()}>Return</button>
      </div>
    </div>
  );
};

export default TacticSelection;
