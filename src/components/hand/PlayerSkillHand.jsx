import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useGetImages } from "../../hooks/useGetImages";

import SelectedSkill from "./SelectedSkill";

const PlayerSkillHand = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const dispatch = useDispatch();

  const { getCardImage } = useGetImages();

  const [raise, setRaise] = useState(false);
  const [raiseHeight, setRaiseHeight] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    setRaiseHeight(
      -45 + Math.ceil(localGameState[self].skillHand.length / 4) * 86
    );

    if (localGameState[self].skillHand.length === 0) {
      setRaise(false);
    }
  }, [localGameState[self].skillHand.length]);

  const handleCollapse = () => {
    setRaise(false);
  };

  const handleRaise = () => {
    if (!raise && localGameState[self].skillHand.length) {
      setRaise(true);
    }
  };

  const handleCard = (card, index) => {
    if (raise) {
      setSelectedSkill({ id: card, handIndex: index });
      //setRaise(false);
    }
  };

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn1.188":
        return true;

      case "Learn1.189":
        return element1 === "SB-05";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.188":
        dispatch(updateDemo("Learn1.189"));
        break;

      case "Learn1.189":
        dispatch(updateDemo("Learn1.190"));
        break;
    }
  };

  return (
    <>
      {raise === true && (
        <button
          className="collapse"
          onClick={() => handleCollapse()}
          style={{
            top: `${-raiseHeight + 15}px`,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="collapseIcon"
          >
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </button>
      )}

      <div className="mainSkillHand">
        {selectedSkill && (
          <SelectedSkill
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
            updateFirebase={props.updateFirebase}
            setRaise={setRaise}
          />
        )}

        {localGameState[self] && (
          <div
            className="player-skillhand-container"
            style={{
              transform: `translateY(${raise ? -raiseHeight : 55}px)`,
            }}
            onClick={() => handleRaise()}
          >
            {localGameState[self].skillHand.map((card, index) => {
              const skillRotate = `skill-rotate-${index % 4}`;

              return (
                <div
                  className={`hand-card-entrance ${
                    raise ? "enlargableIndex" : ""
                  }`}
                  key={index}
                >
                  <div
                    onClick={() => {
                      handleCard(card, index);
                      handleUpdateDemoGuide();
                    }}
                    className={`player-hand-card ${skillRotate} ${
                      raise ? "enlargable" : ""
                    } ${canClick(card) ? "demoClick" : ""}`}
                    style={{
                      backgroundImage: `url(${getCardImage(card)})`,
                      top:
                        Math.floor(index / 4) * -110 -
                        Math.floor(((index + 1) % 4) / 2) * 10,
                      left: (index % 4) * -60,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default PlayerSkillHand;
