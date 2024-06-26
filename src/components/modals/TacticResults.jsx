import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const TacticResults = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { getTacticImage } = useRecurringEffects();

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
        <div className="twoColumn">
          <h2 className="choiceTitle">Dice Results</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
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
                  }}
                ></div>
              </div>
              <h2>{tactic.face}</h2>
            </div>
          ))}
        </div>

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
  );
};

export default TacticResults;
