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
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //endTactic resolution

    console.log(
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution
    );
    if (
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution === "Activating Tactic"
    ) {
      newGameState.currentResolution.pop();
    }

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
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Select Tactic</h2>

        <div className="twoColumn">
          <div
            className="tactic"
            onClick={() => handleClickTactic(0)}
            style={{
              backgroundImage: `url(${getImage(0)})`,
            }}
          >
            {localGameState.tactics[0].face}
          </div>

          <div
            className="tactic"
            onClick={() => handleClickTactic(1)}
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
