import React from "react";
import { useState } from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardDatabase } from "../../hooks/useCardDatabase";
import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import Skill from "../hand/Skill";

const MayFloatResonantSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getSkillById } = useCardDatabase();
  const { getImage } = useCardImageSwitch();

  const handleDiscard = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "May float resonant skill"
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
  };

  const handleFloat = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "May float resonant skill"
    newGameState.currentResolution.pop();

    newGameState.currentResolution[
      newGameState.currentResolution.length - 1
    ].skillConclusion = "float";

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const revealedCard = getSkillById(props.skill);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>You may float this skill.</h2>

        <div
          className="revealed-skill"
          style={{
            backgroundImage: `url(${getImage(revealedCard.Name)})`,
          }}
        ></div>

        <button onClick={() => handleDiscard()}>Discard</button>

        <button onClick={() => handleFloat()}>Float</button>
      </div>
    </div>
  );
};

export default MayFloatResonantSkill;
