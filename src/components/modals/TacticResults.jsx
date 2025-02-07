import React from "react";
import "./Modal.css";
import "./Modal2.scss";

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
      return "You rolled the following tactics";
    } else if (props.reroll) {
      return "Your opponent has rerolled their tactics:";
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
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Dice Results</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{message()}</div>

          <div className="modalContent2Column">
            {localGameState.tactics.map((tactic, i) => (
              <div className="modalTactics" key={i}>
                <div
                  className="modalOptionOutline modalTacticOptionOutline"
                  style={{ cursor: "default" }}
                >
                  <div className="modalTactic">
                    <div
                      className="modalTacticImage"
                      style={{
                        backgroundImage: `url(${getTacticImage(tactic.face)})`,
                      }}
                    ></div>
                  </div>
                </div>
                <h2 style={{ marginTop: 10 }}>{tactic.face}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {self === localGameState.turnPlayer && (
            <button
              className={`redButton2 ${canClick() ? "demoClick" : ""}`}
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
