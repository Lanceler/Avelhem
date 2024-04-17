import React, { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const TacticResults3 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { assignTactics, endDefiancePhase, getTacticImage } =
    useRecurringEffects();

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

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">Dice Results</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>Disregard 1 tactic.</h3>
        <br />
        <div className="threeColumn">
          {props.reroll.map((tactic, index) => (
            <div
              className="center"
              key={index}
              onClick={() => handleSelect(index)}
            >
              <div
                // className="tacticBG"
                className={`tacticBG ${
                  selectedChoice === index ? "selectedChoice" : ""
                } `}
              >
                <div
                  key={index}
                  className="tactic tacticSmall"
                  style={{
                    backgroundImage: `url(${getTacticImage(tactic.face)})`,
                  }}
                ></div>
              </div>
              <h2>{tactic.face}</h2>
            </div>
          ))}
        </div>

        <br />

        {selectedChoice !== null && (
          <button
            className="choiceButton noYes"
            onClick={() => handleProceed()}
          >
            {`Disregard ${props.reroll[selectedChoice].face}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default TacticResults3;
