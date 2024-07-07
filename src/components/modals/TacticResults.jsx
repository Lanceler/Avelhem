import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const TacticResults = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { getTacticImage } = useCardImageSwitch();

  const handleProceed = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
  };

  const message = () => {
    if (self === localGameState.turnPlayer) {
      return <h3>You rolled the following tactics:</h3>;
    } else if (props.reroll) {
      return <h3>Your opponent has rerolled their tactics:</h3>;
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = () => {
    switch (demoGuide) {
      case "Learn1.13":
      case "Learn1.88":
      case "Learn1.93":
      case "Learn1.183":
        return true;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.13":
        dispatch(updateDemo("Learn1.14"));
        break;

      case "Learn1.88":
        dispatch(updateDemo("Learn1.89"));
        break;

      case "Learn1.93":
        dispatch(updateDemo("Learn1.94"));
        break;

      case "Learn1.183":
        dispatch(updateDemo("Learn1.184"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Dice Results</div>
          <div className="modalButton">
            <button className="choiceButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        {message()}
        <br />
        <div className="twoColumn">
          {localGameState.tactics.map((tactic, index) => (
            <div className="center" key={index}>
              <div className="tacticBG">
                <div
                  key={index}
                  className="tactic"
                  style={{
                    backgroundImage: `url(${getTacticImage(tactic.face)})`,
                    cursor: "default",
                  }}
                ></div>
              </div>
              <h2 style={{ marginTop: 10 }}>{tactic.face}</h2>
            </div>
          ))}
        </div>

        <div className="modalBottomButton">
          {self === localGameState.turnPlayer && (
            <button
              className={`choiceButton ${canClick() ? "demoClick" : ""}`}
              onClick={() => {
                handleProceed();
                handleUpdateDemoGuide();
              }}
            >
              Proceed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TacticResults;
