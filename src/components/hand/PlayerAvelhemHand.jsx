import React, { useState, useEffect } from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../../redux/demoGuide";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import Collapse from "../../assets/others/Collapse.png";

import SelectedAvelhem from "./SelectedAvelhem";

const PlayerAvelhemHand = (props) => {
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const dispatch = useDispatch();

  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { getImage } = useCardImageSwitch();
  const { getAvelhemById } = useCardDatabase();

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
      case "Fire1.1":
        return true;

      case "Learn1.19":
        return element1 === 6;

      case "Learn1.22":
        return element1 === 4;
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
            top: `${-raiseHeight + 45}px`,
          }}
        >
          <img src={Collapse} className="collapseIcon" />
        </button>
      )}
      {localGameState[self] && (
        <div
          className="player-avelhemhand-container"
          style={{
            // top: `${raise ? -raiseHeight : 55}px`,
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
              // className={`player-hand-card indivAvelhem ${
              //   raise ? "enlargable" : ""
              // }`}
              className={`player-hand-card indivAvelhem ${
                raise ? "enlargable" : ""
              } ${canClick(card) ? "demoClick" : ""}`}
              style={{
                backgroundImage: `url(${getImage(getAvelhemById(card).Name)})`,
                top: Math.floor(index / 2) * -110,
                left: 5 + (index % 2) * -60,
                // left: (index % 5) * -30,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerAvelhemHand;
