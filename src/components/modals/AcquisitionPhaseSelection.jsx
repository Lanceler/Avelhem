import React, { useState, useEffect } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";
import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const AcquisitionPhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { canDeploy, drawAvelhem, drawSkill, getVacantFrontier } =
    useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  const upgrade = newGameState[self].bountyUpgrades.acquisition;

  let abilityDetails = [
    {
      abilityName: "Appoint",
      abilityQualifier: (
        <div className="abilityQualifier">
          {upgrade < 1 && (
            <div style={{ fontSize: 18 }}>
              Can be upgraded <br /> via Bounty Phase <br /> (1st Acquisition).
            </div>
          )}
        </div>
      ),
      abilityText: (
        <>
          <div className="choiceText ">⬩Deploy a pawn in your frontier.</div>
          <div className="choiceText ">
            ⬩{upgrade < 1 && <>If upgraded: </>}
            Grant them Shield for 2 turns.
          </div>
        </>
      ),
    },
    {
      abilityName: "Beseech",
      abilityQualifier: (
        <div className="abilityQualifier">
          {upgrade < 2 && (
            <div style={{ fontSize: 18 }}>
              Can be upgraded <br /> via Bounty Phase <br /> (2nd Acquisition).
            </div>
          )}
        </div>
      ),
      abilityText: (
        <>
          <div className="choiceText ">⬩Draw 2 Avelhems.</div>
          <div className="choiceText ">
            ⬩{upgrade < 2 && <>If upgraded: </>}
            Gain 1 FD.
          </div>
        </>
      ),
    },
    {
      abilityName: "Cultivate",
      abilityQualifier: (
        <div className="abilityQualifier">
          {upgrade < 3 && (
            <div style={{ fontSize: 18 }}>
              Can be upgraded <br /> via Bounty Phase <br /> (3rd Acquisition).
            </div>
          )}
        </div>
      ),
      abilityText: (
        <>
          <div className="choiceText ">⬩Draw 1 skill.</div>
          <div className="choiceText ">
            ⬩{upgrade < 3 && <>If upgraded: </>}
            You may spend 1 skill to draw again.
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

        if (upgrade >= 2) {
          newGameState[self].fateDefiances = Math.min(
            6,
            newGameState[self].fateDefiances + 1
          );
        }

        newGameState = nextPhase(newGameState);

        dispatch(updateState(newGameState));
        props.updateFirebase(newGameState);
        break;

      case 2:
        newGameState = drawSkill(newGameState);

        newGameState = nextPhase(newGameState);

        if (newGameState[self].bountyUpgrades.acquisition >= 3) {
          newGameState.currentResolution.push({
            resolution: "Misc.",
            resolution2: "Acquisition Phase: Cultivate",
            player: self,
            details: {
              title: "Cultivate",
              message: "You may spend 1 skill to draw again.",
              restriction: null,
              reason: "Cultivate",
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
      case "Learn1.7":
      case "Learn1.83":
        return element2 === 1;

      case "Learn1.174":
        return element2 === 2;

      case "Learn1.8":
      case "Learn1.84":
      case "Learn1.175":
        return element1 === "button";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.7":
        dispatch(updateDemo("Learn1.8"));
        break;

      case "Learn1.8":
        dispatch(updateDemo("Learn1.9"));
        break;

      case "Learn1.83":
        dispatch(updateDemo("Learn1.84"));
        break;

      case "Learn1.84":
        dispatch(updateDemo("Learn1.85"));
        break;

      case "Learn1.174":
        dispatch(updateDemo("Learn1.175"));
        break;

      case "Learn1.175":
        dispatch(updateDemo("Learn1.176"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">Acquisition Phase</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <div className="threeColumn">
          {abilityDetails.map((detail, i) => (
            <div
              key={i}
              className={`customChoice ${
                selectedChoice === i ? "selectedChoice" : ""
              } ${canClick("choice", i) ? "demoClick" : ""}`}
              style={{ backgroundImage: `url(${GoldFrame})` }}
              onClick={() => {
                handleChoice(i);
                handleUpdateDemoGuide();
              }}
            >
              <div
                className={`abilityFrame ${
                  canChoice(i) ? "" : "disabledAbility"
                } `}
              >
                <div className="abilityHeader">
                  <h3 className="abilityName ">{detail.abilityName}</h3>

                  <div>{detail.abilityQualifier}</div>
                </div>
                <div className="abilityContent scroll">
                  {detail.abilityText}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedChoice !== null && (
          <button
            className={`choiceButton ${canClick("button") ? "demoClick" : ""}`}
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
  );
};

export default AcquisitionPhaseSelection;
