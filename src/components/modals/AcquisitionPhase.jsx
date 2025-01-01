import React, { useState } from "react";
import "./Modal.css";

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

  let abilityDetails = [
    {
      abilityName: "Appoint",

      abilityText: (
        <>
          <div className=" ">⬩Deploy a pawn in your frontier.</div>
          <div className=" ">
            ⬩{upgrade < 2 && <>If upgraded: </>}
            Grant them Shield for 2 turns.
          </div>
        </>
      ),
    },
    {
      abilityName: "Beseech",

      abilityText: (
        <>
          <div className=" ">⬩Draw 2 Avelhems.</div>
          <div className=" ">
            ⬩{upgrade < 1 && <>If upgraded: </>}
            You may draw 1 Avelhem.
          </div>
        </>
      ),
    },
    {
      abilityName: "Cultivate",

      abilityText: (
        <>
          <div className=" ">⬩Draw 1 skill.</div>
          <div className=" ">
            ⬩{upgrade < 3 && <>If upgraded: </>}
            You may recover 1 “Transcendence”.
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
          newGameState[self].skillVestige.includes("SX-01")
        ) {
          newGameState.currentResolution.push({
            resolution: "Recover Skill",
            player: self,
            restriction: ["SX-01"],
            message: "You may recover 1 “Transcendence”.",
            outcome: "Add",
            canSkip: true,
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
          case 15:
            return element2 === 1;

          case 16:
            return element1 === "button";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 15:
          case 16:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Acquisition Phase</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <br />

        <div className="modalContent">
          {abilityDetails.map((detail, i) => (
            <div
              key={i}
              className={`modal-option-outline ${
                selectedChoice === i ? "selected-modal-option" : ""
              } ${canClick("choice", i) ? "demoClick" : ""}`}
              onClick={() => {
                handleChoice(i);
                handleUpdateDemoGuide();
              }}
            >
              <div
                className={`modal-option-content ${
                  canChoice(i) ? "" : "disabled-modal-option-content"
                } `}
              >
                <div className="modal-option-header">
                  <div className="modal-option-title">{detail.abilityName}</div>
                </div>
                <div className="modal-option-text">{detail.abilityText}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="modalBottomButton">
          {selectedChoice !== null && (
            <button
              className={`redButton ${canClick("button") ? "demoClick" : ""}`}
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
