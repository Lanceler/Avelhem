import React, { useState } from "react";
import "./Modal2.scss";

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
      player: self,
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

  const canClick = (element, element2) => {};

  const handleUpdateDemoGuide = () => {};

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
          <div className="modalContentText">Disregard 1 tactic.</div>

          <div className="modalContent3Column">
            {props.reroll.map((tactic, i) => (
              <div className="modalTactics" key={i}>
                <div
                  className={`modalOptionOutline modalTacticOptionSmallOutline 
                ${
                  selectedChoice === i
                    ? "modalTacticOptionSmallOutlineSelected"
                    : ""
                }`}
                  onClick={() => {
                    handleSelect(i);
                    handleUpdateDemoGuide();
                  }}
                >
                  <div
                    className={`modalTacticSmall ${
                      canClick("tactic", i) ? "demoClick" : ""
                    }`}
                    style={{
                      boxShadow: selectedChoice === i ? "none" : "",
                    }}
                  >
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
          {selectedChoice !== null && (
            <button
              className={`redButton2 ${
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
