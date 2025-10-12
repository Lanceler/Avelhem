import React, { useState } from "react";
import "./Modal2.scss";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import InfoPopUp from "./InfoPopUp";

const SelectTacticalActionUnit = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [infoPopUp, setInfoPopUp] = useState(null);

  const { canBlast, canMove, canStrike, isDisrupted, isImmobilized } =
    useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

  let updateLocal = true;
  //   let updateData = false;

  //   let message = "Units can activate their ability up to once per turn.";

  let actionDetails = [];

  actionDetails = [
    {
      optionName: "Traverse",
      actionQualifier: (
        <div className="abilityQualifier">
          <img src={AdvanceSmall} style={{ height: 35 }} />
          {"\u00A0\u00A0or\u00A0\u00A0"}
          <img src={MobilizeSmall} style={{ height: 30 }} />
          {"\u00A0\u00A0or\u00A0\u00A0"}
          <img src={AssaultSmall} style={{ height: 35 }} />
        </div>
      ),
      optionText: (
        <>
          <div>⬩Move to a vacant adjacent zone.</div>
        </>
      ),
    },

    {
      optionName: "Aether-blast",
      actionQualifier: (
        <div className="abilityQualifier">
          <img src={AdvanceSmall} style={{ height: 35 }} />
          {"\u00A0\u00A0or\u00A0\u00A0"}
          <img src={InvokeSmall} style={{ height: 35 }} />
        </div>
      ),
      optionText: (
        <>
          <div className="">
            ⬩Spend your Aether to blast an adjacent foe. The foe may mitigate
            it.{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="question-icon"
              onClick={() => setInfoPopUp("Aether-Blast Mitigation")}
              style={{ height: 17 }}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </div>
        </>
      ),
    },

    {
      optionName: "Strike",
      actionQualifier: (
        <div className="abilityQualifier">
          <img src={AssaultSmall} style={{ height: 35 }} />
        </div>
      ),
      optionText: (
        <>
          <div className=" ">⬩Attack an adjacent foe.</div>
          <div className=" ">
            ⬩If the damage was lethal, move to the zone they occupied.
          </div>
        </>
      ),
    },
  ];

  const canChoice = (i) => {
    if (isImmobilized(unit)) {
      return false;
    }

    switch (i) {
      case 0:
        return canMove(unit);

      case 1:
        return (
          unit.aether &&
          canBlast(unit) &&
          unit.unitClass !== "Pawn" &&
          !isDisrupted(unit, 1)
        );

      case 2:
        return canStrike(unit);
    }

    return false;
  };

  const handleChoice = (i) => {
    if (selectedChoice === i) {
      setSelectedChoice(null);
    } else if (canChoice(i)) {
      setSelectedChoice(i);
    }
  };

  const handleSelect = () => {
    newGameState.currentResolution.pop();

    switch (selectedChoice) {
      case 0:
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Selecting Tactic",
          unit: unit,
          details: {
            title: "Traverse",
            message: "Use a tactic to traverse",
            restriction: ["Advance", "Mobilize", "Assault"],
            stock: 1,
            reason: "Traverse",
            canSkip: "Return",
          },
        });

        break;

      case 1:
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Selecting Tactic",
          unit: unit,
          details: {
            title: "Aether-blast",
            message: "Use a tactic to Aether-blast",
            restriction: ["Advance", "Invoke"],
            stock: 1,
            reason: "Aether-blast",
            canSkip: "Return",
          },
        });

        break;

      case 2:
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Selecting Tactic",
          unit: unit,
          details: {
            title: "Strike",
            message: "Use a tactic to strike",
            restriction: ["Assault"],
            stock: 1,
            reason: "Strike",
            canSkip: "Return",
          },
        });

        break;
    }

    if (updateLocal) {
      dispatch(updateState(newGameState));
    }
  };

  const handleReturn = () => {
    newGameState.currentResolution.pop();
    dispatch(updateState(newGameState));
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 50:
          case 56:
          case 62:
          case 116:
            return element2 === 0;

          case 50.1:
          case 56.1:
          case 62.1:
          case 116.1:
            return element1 === "Select Button";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 50:
            dispatch(updateDemoCount(50.1));
            break;

          case 50.1:
            dispatch(updateDemoCount(51));
            break;

          case 56:
            dispatch(updateDemoCount(56.1));
            break;

          case 56.1:
            dispatch(updateDemoCount(57));
            break;

          case 62:
            dispatch(updateDemoCount(62.1));
            break;

          case 62.1:
            dispatch(updateDemoCount(62.2));
            break;

          case 116:
            dispatch(updateDemoCount(116.1));
            break;

          case 116.1:
            dispatch(updateDemoCount(117));
            break;

          // case 116:
          // case 117:
          //   dispatch(updateDemoCount(demoCount + 1));
          //   break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Tactical Actions</div>
        </div>

        <div className="modalContent2">
          {/* <div className="modalContentText">{message}</div> */}

          <div className="modalContent3Column">
            {actionDetails.map((detail, i) => (
              <div
                key={i}
                className={`
                  modalOptionOutline
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
                    ${canClick("Ability", i) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedChoice === i ? "none" : "",
                  }}
                >
                  <div className="modal-option-header modal-option-header-ability">
                    <div className="modalOptionTitle">{detail.optionName}</div>

                    <div>{detail.actionQualifier}</div>
                  </div>
                  <div className="modalOptionText">
                    {detail.optionText}
                    <br />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalBottomButton">
          {selectedChoice === null && (
            <button className="redButton" onClick={() => handleReturn()}>
              Return
            </button>
          )}

          {selectedChoice !== null && (
            <button
              className={`redButton ${
                canClick("Select Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                {
                  handleSelect();
                  handleUpdateDemoGuide();
                }
              }}
            >
              Select
            </button>
          )}
        </div>
      </div>
      {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />}
    </div>
  );
};

export default SelectTacticalActionUnit;
