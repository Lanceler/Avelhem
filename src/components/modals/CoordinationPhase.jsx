import React, { useState, useEffect } from "react";
import "./Modal.css";
import "./Modal2.scss";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const CoordinationPhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { assignTactics, rollTactic } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));

  let optionDetails = [
    {
      optionName: "Assent",
      optionText: (
        <>
          <div className="">⬩Roll 2 tactical dice.</div>
        </>
      ),
    },
    {
      optionName: "Battle Cry",
      optionText: (
        <>
          <div className=" ">
            ⬩Spend 3 skills to gain 1{" "}
            <img src={AssaultSmall} style={{ height: 21 }} />.
          </div>
        </>
      ),
    },
  ];

  const nextPhase = (newGameState) => {
    newGameState.turnPhase = "Defiance";
    newGameState.currentResolution.pop();
    newGameState.currentResolution.push({
      resolution: "Defiance Phase Selection",
    });

    return newGameState;
  };

  const canChoice = (i) => {
    switch (i) {
      case 0:
        return true;
      case 1:
        return newGameState[self].skillHand.length > 2;
    }
  };

  const handleChoice = (i) => {
    if (selectedChoice === i) {
      setSelectedChoice(null);
    } else if (canChoice(i)) {
      setSelectedChoice(i);
    }
  };

  const handleSelect = () => {
    // newGameState.currentResolution.pop();	Do NOT pop

    switch (selectedChoice) {
      case 0:
        newGameState = assignTactics(newGameState, rollTactic(), rollTactic());
        newGameState = nextPhase(newGameState);
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Tactic Results",
          player: self,
        });

        dispatch(updateState(newGameState));
        props.updateFirebase(newGameState);
        break;

      case 1:
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Battle Cry",
          player: self,
          details: {
            reason: "Battle Cry",
            title: "Battle Cry",
            message: "Spend 3 skills to gain 1 Assault tactic.",
            count: 3,
          },
        });
        dispatch(updateState(newGameState));
        // props.updateFirebase(newGameState);
        break;
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 27:
            return element1 === "choice" && element2 === 0;

          case 28:
            return element1 === "select";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 27:
          case 28:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Coordination Phase</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">Choose 1:</div>

          <div className="modalContent2Column">
            {optionDetails.map((detail, i) => (
              <div
                key={i}
                className={`modalOptionOutline 
                    modalMediumOptionOutline ${
                      selectedChoice === i
                        ? "modalMediumOptionOutlineSelected"
                        : ""
                    }`}
                onClick={() => {
                  handleChoice(i);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalMedium
                    ${canChoice(i) ? "" : "disabledModal"}
                    ${canClick("choice", i) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedChoice === i ? "none" : "",
                  }}
                >
                  <div className="modalOptionHeader">
                    <div className="modalOptionTitle">{detail.optionName}</div>
                  </div>
                  <div className="modalOptionText">{detail.optionText}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h3
          style={{
            marginTop: "5px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Tactical dice have the following faces:
          <br />
          <span className="unitInfo-tactic-group2">
            {" "}
            <img
              src={AdvanceSmall}
              style={{ height: 26, filter: "brightness(0%)" }}
            />{" "}
            <img
              src={AdvanceSmall}
              style={{ height: 26, filter: "brightness(0%)" }}
            />{" "}
            <img
              src={MobilizeSmall}
              style={{ height: 26, filter: "brightness(0%)" }}
            />{" "}
            <img
              src={MobilizeSmall}
              style={{ height: 26, filter: "brightness(0%)" }}
            />{" "}
            <img
              src={AssaultSmall}
              style={{ height: 26, filter: "brightness(0%)" }}
            />{" "}
            <img
              src={InvokeSmall}
              style={{ height: 26, filter: "brightness(0%)" }}
            />
          </span>
        </h3>

        <div className="modalFooter">
          {selectedChoice !== null && (
            <button
              className={`redButton2 ${canClick("select") ? "demoClick" : ""}`}
              onClick={() => {
                handleSelect();
                handleUpdateDemoGuide();
              }}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoordinationPhaseSelection;
