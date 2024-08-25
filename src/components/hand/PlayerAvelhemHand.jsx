import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../../redux/demoGuide";

import { useGetImages } from "../../hooks/useGetImages";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import SelectedAvelhem from "./SelectedAvelhem";

const PlayerAvelhemHand = (props) => {
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const dispatch = useDispatch();

  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getCardImage } = useGetImages();

  const [raise, setRaise] = useState(false);
  const [raiseHeight, setRaiseHeight] = useState(0);
  const [selectedAvelhem, setSelectedAvelhem] = useState(null);

  useEffect(() => {
    setRaiseHeight(
      -45 + Math.ceil(localGameState[self].avelhemHand.length / 2) * 86
    );

    if (localGameState[self].avelhemHand.length === 0) {
      setRaise(false);
    }
  }, [localGameState[self].avelhemHand.length]);

  const handleCollapse = () => {
    setRaise(false);
  };

  const handleRaise = () => {
    if (!raise && localGameState[self].avelhemHand.length) {
      setRaise(true);
    }
  };

  const handleCard = (card, index) => {
    if (raise) {
      setSelectedAvelhem({ avelhem: card, handIndex: index });
    }
  };

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn1.18":
      case "Learn1.21":
      case "Learn1.94":
      case "Learn1.206":
        return true;

      case "Learn1.19":
        return element1 === 6;

      case "Learn1.22":
        return element1 === 4;

      case "Learn1.95":
        return element1 === 7;

      case "Learn1.207":
        return element1 === 2;

      ////////////////

      case "Fire1.1.1":
      case "Fire1.1.2":
        return true;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.18":
        dispatch(updateDemo("Learn1.19"));
        break;

      case "Learn1.19":
        dispatch(updateDemo("Learn1.20"));
        break;

      case "Learn1.21":
        dispatch(updateDemo("Learn1.22"));
        break;

      case "Learn1.22":
        dispatch(updateDemo("Learn1.23"));
        break;

      case "Learn1.94":
        dispatch(updateDemo("Learn1.95"));
        break;

      case "Learn1.95":
        dispatch(updateDemo("Learn1.96"));
        break;

      case "Learn1.206":
        dispatch(updateDemo("Learn1.207"));
        break;

      case "Learn1.207":
        dispatch(updateDemo("Learn1.208"));
        break;

      /////////

      case "Fire1.1.1":
        dispatch(updateDemo("Fire1.1.2"));
        break;

      case "Fire1.1.2":
        dispatch(updateDemo("Fire1.1.3"));
        break;
    }
  };

  return (
    <div className="mainSkillHand">
      {selectedAvelhem && (
        <SelectedAvelhem
          selectedAvelhem={selectedAvelhem}
          setSelectedAvelhem={setSelectedAvelhem}
          updateFirebase={props.updateFirebase}
          setRaise={setRaise}
        />
      )}
      {raise === true && (
        <button
          className="collapse"
          onClick={() => handleCollapse()}
          style={{
            // top: `${-raiseHeight + 45}px`,
            top: `${Math.max(-raiseHeight + 45, -729)}px`,
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
      {localGameState[self] && (
        <div
          className="player-avelhemhand-container"
          style={{
            transform: `translateY(${raise ? -raiseHeight : 55}px)`,
          }}
          onClick={(e) => handleRaise(e)}
        >
          {localGameState[self].avelhemHand.map((card, index) => (
            <div
              onClick={() => {
                handleCard(card, index);
                handleUpdateDemoGuide();
              }}
              key={index}
              className={`player-hand-card indivAvelhem ${
                raise ? "enlargable" : ""
              } ${canClick(card) ? "demoClick" : ""}`}
              style={{
                backgroundImage: `url(${getCardImage(card)})`,
                top: Math.floor(index / 2) * -110,
                left: 5 + (index % 2) * -60,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerAvelhemHand;
