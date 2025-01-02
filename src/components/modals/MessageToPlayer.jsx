import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

const MessageToPlayer = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const dispatch = useDispatch();

  const handleProceed = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const canClick = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 79:
            return true;
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 79:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
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
            className={`redButton ${canClick() ? "demoClick" : ""}`}
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
