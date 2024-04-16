import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const TacticResults = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
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
                    backgroundImage: `url(${getTacticImage(index)})`,
                  }}
                ></div>
              </div>
              <h2>{tactic.face}</h2>
            </div>
          ))}
        </div>

        {self === localGameState.turnPlayer && (
          <button className="choiceButton" onClick={() => handleProceed()}>
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default TacticResults;
