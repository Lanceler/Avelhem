import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";

const MessageToEnemy = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const handleProceed = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal modalNoYes">
        <h2 className="choiceTitle">{props.title}</h2>
        <h3>{props.message}</h3>

        <button className="choiceButton noYes" onClick={() => handleProceed()}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default MessageToEnemy;
