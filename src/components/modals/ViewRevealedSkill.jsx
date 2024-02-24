import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";

import { useCardDatabase } from "../../hooks/useCardDatabase";
import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const ViewRevealedSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const { getSkillById } = useCardDatabase();
  const { getImage } = useCardImageSwitch();

  const handleProceed = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const revealedCard = getSkillById(props.skill);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Your opponent has revealed a skill.</h2>

        <div
          className="revealed-skill"
          style={{
            backgroundImage: `url(${getImage(revealedCard.Name)})`,
          }}
        ></div>

        <button onClick={() => handleProceed()}>Proceed</button>
      </div>
    </div>
  );
};

export default ViewRevealedSkill;
