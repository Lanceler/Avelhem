import React from "react";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import Skill from "../hand/Skill";

const FloatResonator = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

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
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Resonance</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>
        <div className="modalContent2">
          <div className="modalContentText">You may float this skill.</div>
          {props.resonator === "SA-03" && (
            <div className="modalContentText">
              <em>
                *When a skill resonates with Dark Halo, the sub-effect that
                would retain or float it applies to the latter instead.
              </em>
            </div>
          )}

          <div className="modalContent1Column">
            {props.skill && (
              <Skill
                usableSkill={{ id: revealedCard }}
                canActivateSkill={true}
              />
            )}
          </div>
        </div>

        <div className="modalFooter">
          <button className="redButton2" onClick={() => handleDiscard()}>
            Discard
          </button>

          <button className="redButton2" onClick={() => handleFloat()}>
            Float
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatResonator;
