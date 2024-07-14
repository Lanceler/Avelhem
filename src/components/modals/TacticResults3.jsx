import React, { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useGetImages } from "../../hooks/useGetImages";

const TacticResults3 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { assignTactics, endDefiancePhase } = useRecurringEffects();

  const { getTacticImage } = useGetImages();

  const handleProceed = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    let newTactics = [...props.reroll];
    newTactics.splice(selectedChoice, 1);

    newGameState = assignTactics(newGameState, newTactics[0], newTactics[1]);

    //end defiance Phase
    newGameState = endDefiancePhase(newGameState);

    newGameState.currentResolution.push({
      resolution: "Misc.",
      resolution2: "Tactic Results",
      reroll: true,
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSelect = (i) => {
    if (selectedChoice === i) {
      setSelectedChoice(null);
    } else {
      setSelectedChoice(i);
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.91":
        return element === "tactic" && element2 === 2;

      case "Learn1.92":
        return element === "disregard";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.91":
        dispatch(updateDemo("Learn1.92"));
        break;

      case "Learn1.92":
        dispatch(updateDemo("Learn1.93"));
        break;
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

        <h3>Disregard 1 tactic.</h3>
        <br />
        <div className="modalContent">
          {props.reroll.map((tactic, index) => (
            <div
              className="center"
              key={index}
              onClick={() => {
                handleSelect(index);
                handleUpdateDemoGuide();
              }}
            >
              <div
                // className="tacticBG"
                className={`tacticBG ${
                  selectedChoice === index ? "selectedChoice" : ""
                } ${canClick("tactic", index) ? "demoClick" : ""} `}
              >
                <div
                  key={index}
                  className="tactic tacticSmall"
                  style={{
                    backgroundImage: `url(${getTacticImage(tactic.face)})`,
                  }}
                ></div>
              </div>
              <h2 style={{ marginTop: 10 }}>{tactic.face}</h2>
            </div>
          ))}
        </div>

        <br />

        <div className="modalBottomButton">
          {selectedChoice !== null && (
            <button
              className={`redButton ${
                canClick("disregard") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleProceed();
                handleUpdateDemoGuide();
              }}
            >
              {`Disregard ${props.reroll[selectedChoice].face}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TacticResults3;
