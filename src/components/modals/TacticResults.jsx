import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useGetImages } from "../../hooks/useGetImages";

const TacticResults = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const dispatch = useDispatch();

  const { getTacticImage } = useGetImages();

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
      case "Learn-overview":
        switch (demoCount) {
          case 30:
            return true;
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 30:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Dice Results</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
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
              className={`redButton ${canClick() ? "demoClick" : ""}`}
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
