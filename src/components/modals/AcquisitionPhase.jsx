import React, { useState } from "react";
import "./Modal.css";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const AcquisitionPhase = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { canDeploy, drawAvelhem, drawSkill, getVacantFrontier } =
    useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  const upgrade = newGameState[self].bountyUpgrades.acquisition;

  let optionDetails = [
    {
      optionName: "Appoint",
      optionQualifier: (
        <div>
          You can have up to <br /> 8 units in play.
        </div>
      ),
      optionText: (
        <>
          <div>⬩Deploy a pawn in your frontier.</div>
          <div>
            ⬩{upgrade < 2 && <>If upgraded: </>}
            Grant them Shield for 2 turns.
          </div>
        </>
      ),
    },
    {
      optionName: "Beseech",
      optionText: (
        <>
          <div>⬩Draw 2 Avelhems.</div>
          <div>
            ⬩{upgrade < 1 && <>If upgraded: </>}
            You may draw 1 Avelhem.
          </div>
        </>
      ),
    },
    {
      optionName: "Cultivate",
      optionText: (
        <>
          <div>⬩Draw 1 skill.</div>
          <div>
            ⬩{upgrade < 3 && <>If upgraded: </>}
            You may spend 1 DP to draw 1 skill.
          </div>
        </>
      ),
    },
  ];

  const nextPhase = (newGameState) => {
    newGameState.turnPhase = "Bounty";
    newGameState.currentResolution.pop();
    newGameState.currentResolution.push({
      resolution: "Bounty Phase Selection",
    });

    newGameState[self].bountyPoints = Math.min(
      10,
      newGameState[self].bountyPoints + 1
    );

    return newGameState;
  };

  const canChoice = (i) => {
    switch (i) {
      case 0:
        return canDeploy();
      case 1:
        return true;
      case 2:
        return true;
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
        newGameState.currentResolution.push({
          resolution: "Deploying Pawn",
          zoneIds: getVacantFrontier(),
        });

        dispatch(updateState(newGameState));
        break;

      case 1:
        newGameState = drawAvelhem(newGameState);
        newGameState = drawAvelhem(newGameState);

        newGameState = nextPhase(newGameState);

        if (upgrade >= 1) {
          newGameState.currentResolution.push({
            resolution: "Misc.",
            resolution2: "Beseech - Upgraded",
            player: self,
            details: {
              reason: "Beseech Draw",
              title: "Beseech",
              message: "You may draw 1 Avelhem.",
              no: "Skip",
              yes: "Draw",
            },
          });
        }

        dispatch(updateState(newGameState));
        props.updateFirebase(newGameState);
        break;

      case 2:
        newGameState = drawSkill(newGameState);
        newGameState = nextPhase(newGameState);

        if (
          newGameState[self].bountyUpgrades.acquisition >= 3 &&
          newGameState[self].defiancePoints > 0
        ) {
          newGameState.currentResolution.push({
            resolution: "Misc.",
            resolution2: "Cultivate - Upgraded",
            player: self,
            details: {
              reason: "Cultivate Draw",
              title: "Cultivate",
              message: "You may spend 1 DP to draw 1 Skill.",
              no: "Skip",
              yes: "Draw",
            },
          });
        }

        dispatch(updateState(newGameState));
        props.updateFirebase(newGameState);
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
          case 14:
            return element2 === 1;
          case 15:
            return element1 === "button";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 14:
          case 15:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Acquisition Phase</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">Choose 1:</div>

          <div className="modalContent3Column">
            {optionDetails.map((detail, i) => (
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
                    ${canClick("choice", i) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedChoice === i ? "none" : "",
                  }}
                >
                  <div className="modalOptionHeader">
                    <div className="modalOptionTitle">{detail.optionName}</div>
                    <div className="modalOptionQualifier">
                      {detail.optionQualifier}
                    </div>
                  </div>
                  <div className="modalOptionText">{detail.optionText}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedChoice !== null && (
            <button
              className={`redButton2 ${canClick("button") ? "demoClick" : ""}`}
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

export default AcquisitionPhase;
