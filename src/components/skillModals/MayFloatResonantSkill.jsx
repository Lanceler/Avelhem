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

    //Dark Halo Overides
    if (props.resonator !== "SA-03") {
      newGameState.currentResolution[
        newGameState.currentResolution.length - 1
      ].skillConclusion = "float";
    } else {
      newGameState.currentResolution[
        newGameState.currentResolution.length - 1
      ].resonatorConclusion = "float";
    }

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  let revealedCard = null;

  //Dark Halo Overides
  if (props.resonator === "SA-03") {
    // revealedCard = getSkillById(props.resonator);
    revealedCard = props.resonator;
  } else {
    // revealedCard = getSkillById(props.skill);
    revealedCard = props.skill;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Resonance sub-effect</h2> */}

        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Resonance sub-effect</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>You may float this skill.</h3>
        {props.resonator === "SA-03" && (
          <p style={{ maxWidth: "700px" }}>
            <em>
              When a skill resonates with Dark Halo, the sub-effect that would
              retain or float it applies to the latter instead.
            </em>
          </p>
        )}

        <br />

        {/* <div
          className="revealed-skill"
          style={{
            backgroundImage: `url(${getImage(revealedCard.Name)})`,
          }}
        ></div> */}

        <div className="view-revealed-skill">
          {props.skill && (
            <Skill usableSkill={{ id: revealedCard }} canActivateSkill={true} />
          )}
        </div>

        <div className="twoColumn bottomAnchor">
          <button className="choiceButton" onClick={() => handleDiscard()}>
            Discard
          </button>

          <button className="choiceButton" onClick={() => handleFloat()}>
            Float
          </button>
        </div>
      </div>
    </div>
  );
};

export default MayFloatResonantSkill;
