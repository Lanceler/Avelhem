import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

const MessageToPlayer = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const handleProceed = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const canClick = (element) => {
    switch (demoGuide) {
      case "Fire1.45.1":
        switch (element) {
          case "Proceed Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Fire1.45.1":
        dispatch(updateDemo("Fire1.46"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">{props.title}</div>
        </div>

        <br />

        <div className="modalContent">
          <h3 style={{ maxWidth: 700 }}>{props.message}</h3>
        </div>

        <div className="modalBottomButton">
          <button
            className={`redButton ${
              canClick("Proceed Button") ? "demoClick" : ""
            }`}
            onClick={() => {
              handleProceed();
              handleUpdateDemoGuide();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageToPlayer;
