import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";

const VictoryScreen = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const handleOffer = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.push({
      resolution: "Continue Game",
      player: enemy,
      details: {
        reason: "Continue Game",
        title: "Continue Game?",
        message: "Your opponent has offered to extend the game.",
        no: "Decline",
        yes: "Accept",
      },
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  let message1 = "";
  let message2 = "";
  let message3 = "";

  if (self === props.player) {
    message1 = "Victory is yours!";
    message2 = `You’ve scored with ${localGameState[self].score} unit${
      localGameState[self].score > 1 ? "s" : ""
    }.`;

    if (localGameState[self].score < 5) {
      message3 = `You may offer to continue the game and set the objective to ${
        localGameState[self].score + 1
      }.`;
    }
  } else if (enemy === props.player) {
    message1 = "Defeat...";
    message2 = `${localGameState[enemy].displayName} scored with ${
      localGameState[enemy].score
    } unit${localGameState[enemy].score > 1 ? "s" : ""}.`;
  }

  const demoOverride = () => {
    if (!demoGuide) {
      return false;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Game Over</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <h3>{message1}</h3>
        <h3>{message2}</h3>
        <br />
        {/* <h3>{message3}</h3> */}

        <div className="finalPhase-Button">
          {!demoOverride() &&
            self === props.player &&
            localGameState[self].score < 5 && (
              <button className="redButton" onClick={() => handleOffer()}>
                {/* Offer to continue */}
                {message3}
              </button>
            )}

          {demoOverride() && <div>{demoOverride()}</div>}
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;
