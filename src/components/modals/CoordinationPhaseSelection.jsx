import React, { useState, useEffect } from "react";
import "./Modal.css";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";
import RallySmall from "../../assets/diceIcons/RallySmall.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const CoordinationPhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { assignTactics, drawAvelhem, rollTactic } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  const upgrade = newGameState[self].bountyUpgrades.coordination;

  let abilityDetails = [
    {
      abilityName: "Assent",
      abilityText: (
        <>
          <div className="">⬩Roll 2 tactical dice.</div>
          <div className=" ">
            ⬩{upgrade < 3 && <>If upgraded: </>}
            Gain 1 FD.
          </div>
        </>
      ),
    },
    {
      abilityName: "Battle Cry",
      abilityText: (
        <>
          <div className=" ">
            ⬩Spend 3 skills to gain 1{" "}
            <img src={AssaultSmall} style={{ height: 21 }} />.
          </div>
          <div className=" ">
            ⬩{upgrade < 1 && <>If upgraded: </>}
            Roll 1 tactical die.
          </div>
        </>
      ),
    },
    {
      abilityName: "Convene",
      abilityText: (
        <>
          <div className=" ">
            ⬩Gain 1 <img src={RallySmall} style={{ height: 21 }} />.
          </div>
          <div className=" ">
            ⬩{upgrade < 2 && <>If upgraded: </>}
            Gain 1 <img src={AdvanceSmall} style={{ height: 21 }} />.
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
        newGameState = assignTactics(newGameState, rollTactic(), rollTactic());
        newGameState = nextPhase(newGameState);
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Tactic Results",
        });

        if (upgrade >= 3) {
          newGameState[self].fateDefiance = Math.min(
            6,
            newGameState[self].fateDefiance + 1
          );
        }

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

      case 2:
        const rallyCount =
          newGameState[self].bountyUpgrades.tactics >= 1 ? 3 : 2;
        newGameState.tactics[0] = {
          face: "Rally",
          stock: rallyCount,
          limit: rallyCount,
        };
        if (upgrade >= 2) {
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
      case "Learn1.181":
        return element1 === "choice" && element2 === 0;

      case "Learn1.12":
      case "Learn1.87":
      case "Learn1.182":
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

      case "Learn1.181":
        dispatch(updateDemo("Learn1.182"));
        break;

      case "Learn1.182":
        dispatch(updateDemo("Learn1.183"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Coordination Phase</div>
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
                <div className="modal-option-header ">
                  <div className="modal-option-title ">
                    {detail.abilityName}
                  </div>
                </div>
                <div className="modal-option-text">{detail.abilityText}</div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <h3
          style={{
            marginTop: "5px",
            marginBottom: "10px",
            textAlign: "center",
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

        <div className="modalBottomButton">
          {selectedChoice !== null && (
            <button
              className={`redButton ${canClick("select") ? "demoClick" : ""}`}
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
