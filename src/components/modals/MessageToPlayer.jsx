import React from "react";
import "./Modal2.scss";

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
        switch (
          demoCount
          // case 79:
          //   return true;
        ) {
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (
          demoCount
          // case 79:
          //   dispatch(updateDemoCount(demoCount + 1));
          //   break;
        ) {
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{props.title}</div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{props.message}</div>
        </div>

        <div className="modalFooter">
          <button
            className={`redButton2 ${canClick() ? "demoClick" : ""}`}
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
