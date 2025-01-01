import React, { useState } from "react";
import "./DisplayedCard.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useGetImages } from "../../hooks/useGetImages";

import InfoPopUp from "../modals/InfoPopUp";

const SovereignTactics = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const dispatch = useDispatch();

  const [infoPopUp, setInfoPopUp] = useState(null);

  const { getTacticImage } = useGetImages();

  const handleClick = (face, dice) => {
    if (
      localGameState.turnPlayer === self &&
      localGameState.currentResolution[
        localGameState.currentResolution.length - 1
      ].resolution === "Execution Phase"
    ) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Selecting Tactical Action - Sovereign",
        dice: dice,
        face: face,
      });

      dispatch(updateState(newGameState));
    }
  };

  const handleInfoClick = () => {
    setInfoPopUp("Tactics");
  };

  const canClick = (element1, element2) => {
    // switch (demoGuide) {
    //   case "Learn1.34":
    //   case "Learn1.35":
    //   case "Learn1.115":
    //     return element2 === 0;

    //   case "Learn1.46":
    //     return element2 === 1;

    //   case "Learn1.117":
    //     return element === "?";
    // }

    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 35:
            return element2 === 0;

          case 42:
            return element2 === 1;

          case 63:
            return element1 === "?";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 35:
          case 42:
          case 63:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="tacticSovereignContainer">
      {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />}
      <div className="tacticSovereignContainer-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={`question-icon ${canClick("?") ? "demoClick" : ""}`}
          onClick={() => {
            handleInfoClick();
            handleUpdateDemoGuide();
          }}
          style={{
            pointerEvents: props.userRole === "spectator" ? "all" : "",
          }}
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        </svg>
      </div>

      {localGameState.tactics.map((tactic, index) => (
        <div className="tacticSovereignDice" key={index}>
          <div
            className={` tacticSovereignBG ${
              tactic.stock < 1 || localGameState.turnPlayer === enemy
                ? "disabledtacticSovereignBG"
                : ""
            } ${canClick("Tactic", index) ? "demoClick" : ""}
            `}
            onClick={() => {
              handleClick(tactic.face, index);
              handleUpdateDemoGuide();
            }}
          >
            <div
              key={index}
              className="tacticSovereign"
              style={{
                backgroundImage: `url(${getTacticImage(tactic.face)})`,
              }}
            ></div>
          </div>
          <h2 className="tacticSovereignLabel">
            {tactic.face} ({tactic.stock})
          </h2>
        </div>
      ))}
    </div>
  );
};

export default SovereignTactics;
