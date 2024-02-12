import React from "react";
import "./Modal.css";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";

const DefiancePhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const nextPhase = (gameState) => {
    gameState.turnPhase = "Execution";
    gameState.currentResolution.pop();
    gameState.currentResolution.push({
      resolution: "Execution Phase",
    });

    return gameState;
  };

  const onSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState = nextPhase(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <div className="twoColumn bountyHeader">
          <h2>Defiance Phase </h2>
          <h2>FD: {localGameState[self].fateDefiances}</h2>
        </div>

        <div className="phaseSelection">
          <div className="choiceWithDescription">
            <h3>Adapt: 1 FD</h3>
            <h4>
              Place up to 4 skills from your hand at the bottom of your
              repertoire, then draw the same number.
            </h4>
          </div>
          {/* space */}
          <div className="choiceWithDescription">
            <h3>Backtrack: 1 FD</h3>
            <h4>Reroll your tactics.</h4>
          </div>
          {/* space */}
          <div className="choiceWithDescription">
            <h3>Contemplate: 2 FD</h3>
            <h4>Reroll your tactics with 3 dice but disregard 1 result.</h4>
          </div>
          {/* space */}
          <div className="choiceWithDescription">
            <h3>Discern: 2 FD</h3>
            <h4>
              Discard 1 Scion skill to ascend an ally pawn to the matching
              class.
            </h4>
          </div>
          {/* space */}
          <div className="choiceWithDescription">
            <h3>Empower: 4 FD</h3>
            <h4>Draw 1 skill.</h4>
            <h4>You may recover 1 “Transcendence”.</h4>
          </div>
          {/* space */}
          <div className="choiceWithDescription">
            <h3>Empower: 4 FD</h3>
            <h4>Search for 1 Sovereign skill.</h4>
          </div>
        </div>

        <div>
          <button onClick={() => onSkip()}>Skip</button>
        </div>
      </div>
    </div>
  );
};

export default DefiancePhaseSelection;
