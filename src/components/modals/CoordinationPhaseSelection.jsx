import React from "react";
import "./Modal.css";

const CoordinationPhaseSelection = (props) => {
  let canBattleCry = false;

  if (props.skillHandSize >= 3) {
    console.log("Can Battle Cry");
    canBattleCry = true;
  } else {
    console.log("Cannot Battle Cry");
  }

  const onAssent = () => {
    props.assignTactics(props.rollTactic(), props.rollTactic());
    props.nextPhase();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Coordination Phase</h2>

        <div className="phaseSelection">
          <div className="choiceWithDescription" onClick={() => onAssent()}>
            <h3>Assent</h3>
            <h4>Roll 2 tactical dice.</h4>
          </div>
          <div className="choiceWithDescription">
            <h3>Battle Cry</h3>
            <h4>Spend 3 skills to gain an assault tactic.</h4>
            <h5>
              Upgrade:
              <br />
              Roll 1 tactical die.
            </h5>
          </div>

          <div className="choiceWithDescription">
            <h3>Convene</h3>
            <h4>Must be unlocked.</h4>
            <h4>Gain a rally tactic.</h4>
            <h5>
              Upgrade:
              <br />
              Gain an advance tactic.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinationPhaseSelection;
