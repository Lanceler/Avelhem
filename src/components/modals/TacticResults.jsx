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
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Assent Results</h2>
        {message()}

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
              {tactic.face}
            </div>
          ))}
        </div>

        {self === localGameState.turnPlayer && (
          <button onClick={() => handleProceed()}>Proceed</button>
        )}
      </div>
    </div>
  );
};

export default TacticResults;
