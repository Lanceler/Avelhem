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

const CoordinationPhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { assignTactics, drawAvelhem, rollTactic } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  const upgrade = newGameState[self].bountyUpgrades.coordination;

  let conveneQualifier = "";
  switch (upgrade) {
    case 0:
      conveneQualifier = (
        <>
          Can be unlocked <br /> via Bounty Phase <br /> (1st Coordination).
        </>
      );
      break;
    case 1:
      conveneQualifier = (
        <>
          Can be upgraded <br /> via Bounty Phase <br /> (3rd Coordination).
        </>
      );
      break;
  }

  let abilityDetails = [
    {
      abilityName: "Assent",
      abilityQualifier: <div className="abilityQualifier"></div>,
      abilityText: (
        <>
          <div className="abilityText">⬩Roll 2 tactical dice.</div>
        </>
      ),
    },

    {
      abilityName: "Battle Cry",
      abilityQualifier: (
        <div className="abilityQualifier">
          {upgrade < 3 && (
            <>
              Can be upgraded <br /> via Bounty Phase <br /> (3rd Coordination).
            </>
          )}
        </div>
      ),
      abilityText: (
        <>
          <div className="abilityText ">
            ⬩Spend 3 skills to gain 1{" "}
            <img src={AssaultSmall} style={{ height: 21 }} />.
          </div>
          <div className="abilityText ">
            ⬩{upgrade < 3 && <>If upgraded: </>}
            Roll 1 tactical die.
          </div>
        </>
      ),
    },

    {
      abilityName: "Convene",
      abilityQualifier: (
        <div className="abilityQualifier">
          {upgrade < 2 && conveneQualifier}
        </div>
      ),
      abilityText: (
        <>
          <div className="abilityText ">
            ⬩Gain 1 Rally tactic with 2 instances; each instance can deploy a
            pawn in your frontier.
          </div>
          <div className="abilityText ">
            ⬩{upgrade < 3 && <>If upgraded: </>}
            Gain 1 <img src={AdvanceSmall} style={{ height: 21 }} /> and draw 1
            Avelhem.
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
      case 2:
        return upgrade > 0;
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
            title: "Coordination: Battle Cry",
            message: "Spend 3 skills to gain an Assault tactic.",
            count: 3,
          },
        });
        dispatch(updateState(newGameState));
        // props.updateFirebase(newGameState);
        break;

      case 2:
        newGameState.tactics[0] = { face: "Rally", stock: 2, limit: 2 };
        if (upgrade >= 2) {
          newGameState = drawAvelhem(newGameState);
          newGameState.tactics[1] = { face: "Advance", stock: 1, limit: 1 };
        } else {
          newGameState.tactics[1] = { face: "Null", stock: 0, limit: 1 };
        }

        newGameState = nextPhase(newGameState);
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Tactic Results",
        });
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
      case "Learn1.11":
      case "Learn1.86":
        return element1 === "choice" && element2 === 0;

      case "Learn1.12":
      case "Learn1.87":
        return element1 === "select";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.11":
        dispatch(updateDemo("Learn1.12"));
        break;

      case "Learn1.12":
        dispatch(updateDemo("Learn1.13"));
        break;

      case "Learn1.86":
        dispatch(updateDemo("Learn1.87"));
        break;

      case "Learn1.87":
        dispatch(updateDemo("Learn1.88"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">Coordination Phase</h2>
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
                // className="abilityFrame"
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

        <h3
          style={{
            marginTop: "5px",
            marginBottom: "10px",
          }}
        >
          Tactical dice have the following faces:{"  "}
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

        {selectedChoice !== null && (
          <button
            className={`choiceButton ${canClick("select") ? "demoClick" : ""}`}
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

export default CoordinationPhaseSelection;
