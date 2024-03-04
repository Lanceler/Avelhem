import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const Purification2 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { drawSkill } = useRecurringEffects();

  const handleDraw = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    newGameState = drawSkill(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSearch = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Search Skill",
      player: self,
      restriction: ["02-01", "02-02", "02-03"],
      message: "Search for then float 1 non-burst Water skill.",
      outcome: "Float",
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Purification</h2>
        <h3>Choose 1:</h3>

        <div className="twoColumn">
          <div className="choiceWithDescription" onClick={() => handleDraw()}>
            <h2>Draw 1 skill.</h2>
          </div>

          <div className="choiceWithDescription" onClick={() => handleSearch()}>
            <h2>Search for then float 1 non-burst Water skill</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purification2;
