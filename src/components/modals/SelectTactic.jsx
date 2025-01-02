import React, { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";
import { updateDemoCount } from "../../redux/demoCount";

import { useGetImages } from "../../hooks/useGetImages";

import InfoPopUp from "./InfoPopUp";

const SelectTactic = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const { getTacticImage } = useGetImages();

  let canUseTactic = [false, false];

  const [infoPopUp, setInfoPopUp] = useState(null);

  if (
    localGameState.tactics[0] !== null &&
    !props.unit.temporary.used0thTactic &&
    localGameState.tactics[0].stock > 0 &&
    ["Advance", "Assault", "Mobilize"].includes(localGameState.tactics[0].face)
  ) {
    canUseTactic[0] = true;
  }

  if (
    localGameState.tactics[1] !== null &&
    !props.unit.temporary.used1stTactic &&
    localGameState.tactics[1].stock > 0 &&
    ["Advance", "Assault", "Mobilize"].includes(localGameState.tactics[1].face)
  ) {
    canUseTactic[1] = true;
  }

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Tactic Selection
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleClickTactic = (i) => {
    if (canUseTactic[i] && localGameState.tactics[i].stock > 0) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end Tactic Selection
      newGameState.currentResolution.pop();

      let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Selecting Tactical Action",
        unit: unit,
        dice: i,
        face: newGameState.tactics[i].face,
      });

      dispatch(updateState(newGameState));
    }
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 48:
            return element2 === 0;

          case 55:
          case 67:
          case 120:
            return element2 === 1;

          case 62:
            return element1 === "Return";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 48:
          case 55:
          case 62:
          case 67:
          case 120:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">
            Select Tactic <span style={{ opacity: 0 }}>.</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="question-icon2"
              onClick={() => setInfoPopUp("Tactics")}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </div>
        </div>

        <br />

        <div className="twoColumn">
          {localGameState.tactics.map((tactic, index) => (
            <div className="center" key={index}>
              <div
                className={`tacticBG ${
                  !canUseTactic[index] ? "disabledTacticBG" : ""
                } ${canClick("Tactic", index) ? "demoClick" : ""} `}
              >
                <div
                  key={index}
                  className={`tactic ${
                    !canUseTactic[index] ? "disabledTactic" : ""
                  }`}
                  onClick={() => {
                    handleClickTactic(index);
                    handleUpdateDemoGuide();
                  }}
                >
                  <img
                    src={getTacticImage(tactic.face)}
                    className="tactic-icon"
                  ></img>
                </div>
              </div>
              <h2 style={{ marginTop: 10 }}>{tactic.face}</h2>
              <div className="tactic-label">Instances: {tactic.stock}</div>
            </div>
          ))}
        </div>

        <div className="modalBottomButton">
          {
            <button
              className={`redButton ${canClick("Return") ? "demoClick" : ""}`}
              onClick={() => {
                handleSkip();
                handleUpdateDemoGuide();
              }}
            >
              Return
            </button>
          }
        </div>
      </div>
      {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />}
    </div>
  );
};

export default SelectTactic;
