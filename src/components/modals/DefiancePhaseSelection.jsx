import React from "react";
import "./Modal.css";

const DefiancePhaseSelection = (props) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn bountyHeader">
          <h2>Defiance Phase </h2>
          <h2>FD: {props.fateDefiances}</h2>
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
          <button onClick={() => props.nextPhase()}>Skip</button>
        </div>
      </div>
    </div>
  );
};

export default DefiancePhaseSelection;
