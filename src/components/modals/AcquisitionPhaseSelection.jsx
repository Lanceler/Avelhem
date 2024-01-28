import React from "react";
import "./Modal.css";

const AcquisitionPhaseSelection = (props) => {
  const onBequeth = () => {
    props.drawAvelhem();
    props.drawAvelhem();
    props.nextPhase();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Acquisition Phase</h2>

        <div className="acquisitionPhase">
          <div className="choiceWithDescription">
            <h3>Appoint</h3>
            <h4>Deploy a pawn in your frontier.</h4>
          </div>
          <div className="choiceWithDescription" onClick={() => onBequeth()}>
            <h3>Bequeath</h3>
            <h4>Draw 2 Avelhems.</h4>
          </div>
          <div className="choiceWithDescription">
            <h3>Cultivate</h3>
            <h4>Draw 1 skill.</h4>
            <h5>
              Upgrade:
              <br />
              If your hand has 4 or less skills, you may draw 1 skill again.
            </h5>
          </div>
          <div className="choiceWithDescription">
            <h3>Divine</h3>
            <h4>Must be unlocked.</h4>
            <h5>
              Gain 1 FD.
              <br />
              You may recover 1 “Transcendence” or draw 1 Avelhem.
            </h5>
          </div>
          <div className="choiceWithDescription">
            <h3>Expedite</h3>
            <h4>Must be unlocked.</h4>
            <h5>Draw 2 skills.</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcquisitionPhaseSelection;
