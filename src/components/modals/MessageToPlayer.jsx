import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";

const MessageToPlayer = (props) => {
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
      <div className="modal">
        <h2 className="choiceTitle">{props.title}</h2>
        <h3>{props.message}</h3>

        <button className="choiceButton" onClick={() => handleProceed()}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default MessageToPlayer;
