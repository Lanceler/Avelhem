import React from "react";
import "../skillModals/SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const ManaRestructure = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  const dispatch = useDispatch();

  const { floatSkill } = useRecurringEffects();

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const handleNo = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Mana Restructuring"
    newGameState.currentResolution.pop();

    newGameState[self].skillVestige.push(
      ...newGameState[self].skillHand.splice(props.skillInfo.handIndex, 1)
    );

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // <-- not needed
  };

  const handleYes = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "Mana Restructuring"
    newGameState.currentResolution.pop();

    newGameState = floatSkill(newGameState, props.skillInfo.handIndex);

    newGameState.currentResolution.push({
      resolution: "Mana Restructuring Announcement",
      player: enemy,
      title: "Mana Restructuring",
      message: "Your opponent has floated 1 Mana skill from their hand.",
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Mana Restructure</h2>
        <h3>
          When a Mana Scion or their adjacent ally spends a Mana skill, they may
          float it instead.
        </h3>
        <h3>Do you want to float the skill?</h3>

        <div className="twoColumn">
          <button onClick={() => handleNo()}>No</button>
          <button onClick={() => handleYes()}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ManaRestructure;
