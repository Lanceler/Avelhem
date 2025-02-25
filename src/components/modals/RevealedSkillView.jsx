import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useCardDatabase } from "../../hooks/useCardDatabase";
import { useGetImages } from "../../hooks/useGetImages";

import Skill from "../hand/Skill";

const RevealedSkillView = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  // const { getSkillById } = useCardDatabase();
  const { getCardImage } = useGetImages();

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
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{props.title}</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText"> {props.message}</div>

          <div className="modalContent1Column">
            {props.skill && (
              <Skill
                usableSkill={{ id: props.skill }}
                canActivateSkill={true}
              />
            )}
          </div>

          {props.avelhems && (
            <div className="modalContent3Column" style={{ gap: 10 }}>
              {props.avelhems.map((avelhem, i) => (
                <Skill usableSkill={{ id: avelhem }} canActivateSkill={true} />
              ))}
            </div>
          )}
        </div>

        <div className="modalFooter">
          <button
            className={`redButton2 ${
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
    </div>
  );
};

export default RevealedSkillView;
