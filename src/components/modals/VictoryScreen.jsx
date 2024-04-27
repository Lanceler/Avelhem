import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
const VictoryScreen = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  let message = "";

  if (self === props.player) {
    message = "Victory is yours!";
  } else if (enemy === props.player) {
    message = "Defeat...";
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">Game Over</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{message}</h3>
      </div>
    </div>
  );
};

export default VictoryScreen;
