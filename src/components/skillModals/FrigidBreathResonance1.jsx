import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const FrigidBreathResonance1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  const dispatch = useDispatch();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const handleIgnite = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Frigid BreathR2"
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Frigid BreathR3",
      unit: props.unit,
    });

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Frigid BreathR2"
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // not needed as next resolution would update
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Frigid Breath</h2>
        <h3>You may blast an adjacent frostbitten enemy.</h3>

        <div className="twoColumn">
          <button onClick={() => handleSkip()}>Skip</button>
          <button onClick={() => handleIgnite()}>Blast</button>
        </div>
      </div>
    </div>
  );
};

export default FrigidBreathResonance1;
