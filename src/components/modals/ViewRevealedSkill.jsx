import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useCardDatabase } from "../../hooks/useCardDatabase";
import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import Skill from "../hand/Skill";

const ViewRevealedSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  // const { getSkillById } = useCardDatabase();
  const { getCardImage } = useCardImageSwitch();

  const handleProceed = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  // const revealedCard = getSkillById(props.skill);

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn1.203":
        return element1 === "Proceed Button";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.203":
        dispatch(updateDemo("Learn1.204"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn3-1">
          <h2 className="choiceTitle">{props.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{props.message}</h3>

        <div className="view-revealed-skill">
          {props.skill && (
            <Skill usableSkill={{ id: props.skill }} canActivateSkill={true} />
          )}

          {props.avelhems && (
            <div className="fourColumn scrollable scrollable-y-only">
              {props.avelhems.map((avelhem, i) => (
                <div
                  key={i}
                  className="revealed-skill"
                  style={{
                    backgroundImage: `url(${getCardImage(avelhem)})`,
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        <button
          className={`choiceButton ${
            canClick("Proceed Button") ? "demoClick" : ""
          }`}
          onClick={() => {
            handleProceed();
            handleUpdateDemoGuide();
          }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ViewRevealedSkill;
