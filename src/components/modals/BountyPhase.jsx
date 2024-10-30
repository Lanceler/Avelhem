import React, { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import InfoPopUp from "./InfoPopUp";

const BountyPhase = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const [infoPopUp, setInfoPopUp] = useState(null);

  const nextPhase = (gameState) => {
    gameState.turnPhase = "Coordination";
    gameState.currentResolution.pop();
    gameState.currentResolution.push({
      resolution: "Coordination Phase Selection",
    });

    return gameState;
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = nextPhase(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handlePurchase = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    switch (selectedChoice) {
      case 1:
        newGameState[self].bountyUpgrades.frontier = 1;
        newGameState[self].bountyPoints -= frontierCosts[0];
        setSelectedChoice(null);
        break;

      case 2:
        newGameState[self].bountyUpgrades.frontier = 2;
        newGameState[self].bountyPoints -= frontierCosts[1];
        setSelectedChoice(null);
        break;

      case 3:
        newGameState[self].bountyUpgrades.frontier = 3;
        newGameState[self].bountyPoints -= frontierCosts[2];
        setSelectedChoice(null);
        break;

      case 4:
        newGameState[self].bountyUpgrades.acquisition = 1;
        newGameState[self].bountyPoints -= acquisitionCosts[0];
        setSelectedChoice(null);
        break;

      case 5:
        newGameState[self].bountyUpgrades.acquisition = 2;
        newGameState[self].bountyPoints -= acquisitionCosts[1];
        setSelectedChoice(null);
        break;

      case 6:
        newGameState[self].bountyUpgrades.acquisition = 3;
        newGameState[self].bountyPoints -= acquisitionCosts[2];
        setSelectedChoice(null);
        break;

      case 7:
        newGameState[self].bountyUpgrades.coordination = 1;
        newGameState[self].bountyPoints -= coordinationCosts[0];
        setSelectedChoice(null);
        break;

      case 8:
        newGameState[self].bountyUpgrades.coordination = 2;
        newGameState[self].bountyPoints -= coordinationCosts[1];
        setSelectedChoice(null);
        break;

      case 9:
        newGameState[self].bountyUpgrades.coordination = 3;
        newGameState[self].bountyPoints -= coordinationCosts[2];
        setSelectedChoice(null);
        break;

      case 10:
        newGameState[self].bountyUpgrades.tactics = 1;
        newGameState[self].bountyPoints -= tacticsCosts[0];
        setSelectedChoice(null);
        break;

      case 11:
        newGameState[self].bountyUpgrades.tactics = 2;
        newGameState[self].bountyPoints -= tacticsCosts[1];
        setSelectedChoice(null);
        break;

      case 12:
        newGameState[self].bountyUpgrades.tactics = 3;
        newGameState[self].bountyPoints -= tacticsCosts[2];
        setSelectedChoice(null);
        break;

      case 13:
        newGameState[self].bountyUpgrades.tactics = 4;
        newGameState[self].bountyPoints -= tacticsCosts[3];
        setSelectedChoice(null);
        break;

      case 14:
        newGameState[self].bountyUpgrades.avelhem = 1;
        newGameState[self].bountyPoints -= avelhemCosts[0];
        setSelectedChoice(null);
        break;

      case 15:
        newGameState[self].bountyUpgrades.avelhem = 2;
        newGameState[self].bountyPoints -= avelhemCosts[1];
        setSelectedChoice(null);
        break;

      case 16:
        newGameState[self].bountyUpgrades.avelhem = 3;
        newGameState[self].bountyPoints -= avelhemCosts[2];
        setSelectedChoice(null);
        break;

      case 17:
        newGameState[self].bountyUpgrades.avelhem = 4;
        newGameState[self].bountyPoints -= avelhemCosts[3];
        setSelectedChoice(null);
        break;

      //to-do Victory March

      default:
        break;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSelect = (i, condition) => {
    if (selectedChoice === i) {
      setSelectedChoice(null);
    } else if (condition) {
      setSelectedChoice(i);
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const frontierCosts = [4, 6, 10];
  const acquisitionCosts = [3, 3, 4];
  const coordinationCosts = [3, 3, 4];
  const tacticsCosts = [3, 3, 4];
  const avelhemCosts = [3, 3, 4];
  // const victoryCosts = [10, 5];

  const canFrontier = [
    localGameState[self].bountyPoints >= frontierCosts[0] &&
      localGameState[self].bountyUpgrades.frontier === 0,
    localGameState[self].bountyPoints >= frontierCosts[1] &&
      localGameState[self].bountyUpgrades.frontier === 1,
    localGameState[self].bountyPoints >= frontierCosts[2] &&
      localGameState[self].bountyUpgrades.frontier === 2,
  ];

  const canAcquisition = [
    localGameState[self].bountyPoints >= acquisitionCosts[0] &&
      localGameState[self].bountyUpgrades.acquisition === 0,
    localGameState[self].bountyPoints >= acquisitionCosts[1] &&
      localGameState[self].bountyUpgrades.acquisition === 1,
    localGameState[self].bountyPoints >= acquisitionCosts[2] &&
      localGameState[self].bountyUpgrades.acquisition === 2,
  ];

  const canCoordination = [
    localGameState[self].bountyPoints >= coordinationCosts[0] &&
      localGameState[self].bountyUpgrades.coordination === 0,
    localGameState[self].bountyPoints >= coordinationCosts[1] &&
      localGameState[self].bountyUpgrades.coordination === 1,
    localGameState[self].bountyPoints >= coordinationCosts[2] &&
      localGameState[self].bountyUpgrades.coordination === 2,
  ];

  const canTactics = [
    localGameState[self].bountyPoints >= tacticsCosts[0] &&
      localGameState[self].bountyUpgrades.tactics === 0,
    localGameState[self].bountyPoints >= tacticsCosts[1] &&
      localGameState[self].bountyUpgrades.tactics === 1,
    localGameState[self].bountyPoints >= tacticsCosts[2] &&
      localGameState[self].bountyUpgrades.tactics === 2,
    localGameState[self].bountyPoints >= tacticsCosts[2] &&
      localGameState[self].bountyUpgrades.tactics === 3,
  ];

  const canAvelhem = [
    localGameState[self].bountyPoints >= avelhemCosts[0] &&
      localGameState[self].bountyUpgrades.avelhem === 0,
    localGameState[self].bountyPoints >= avelhemCosts[1] &&
      localGameState[self].bountyUpgrades.avelhem === 1,
    localGameState[self].bountyPoints >= avelhemCosts[2] &&
      localGameState[self].bountyUpgrades.avelhem === 2,
    localGameState[self].bountyPoints >= avelhemCosts[2] &&
      localGameState[self].bountyUpgrades.avelhem === 3,
  ];

  // const canVictory = [
  //   localGameState[self].bountyPoints >= victoryCosts[0] &&
  //     localGameState[self].bountyUpgrades.victory === 0,
  //   localGameState[self].score === 2 &&
  //     localGameState[self].bountyPoints >= victoryCosts[1] &&
  //     localGameState[self].bountyUpgrades.victory === 1,
  // ];

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn1.10":
      case "Learn1.85":
      case "Learn1.180":
        return element1 === "proceed";

      case "Learn1.177":
      case "Learn1.179":
        return element1 === "purchase";

      case "Learn1.176":
        return element1 === "Frontier" && element2 === 0;

      case "Learn1.178":
        return element1 === "Frontier" && element2 === 1;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.10":
        dispatch(updateDemo("Learn1.11"));
        break;

      case "Learn1.85":
        dispatch(updateDemo("Learn1.86"));
        break;

      case "Learn1.176":
        dispatch(updateDemo("Learn1.177"));
        break;

      case "Learn1.177":
        dispatch(updateDemo("Learn1.178"));
        break;

      case "Learn1.178":
        dispatch(updateDemo("Learn1.179"));
        break;

      case "Learn1.179":
        dispatch(updateDemo("Learn1.180"));
        break;

      case "Learn1.180":
        dispatch(updateDemo("Learn1.181"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal ">
        <div className="modalHeader">
          <div className="modalTitle">
            Bounty Phase (BP: {localGameState[self].bountyPoints})
          </div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <br />

        <div
          className="scrollable scrollable-y-only"
          style={{ pointerEvents: "all" }}
        >
          <div className={`bountySection ${demoGuide ? "demoBlocker" : ""}`}>
            <h3 className="modalChoiceName2">Frontier</h3>
            <div className="modalContent">
              <div
                className={`modal-option-outline   ${
                  selectedChoice === 1 ? "selected-modal-option" : ""
                } ${canClick("Frontier", 0) ? "demoClick" : ""}`}
                onClick={() => {
                  handleSelect(1, canFrontier[0]);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canFrontier[0] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Expand your frontier to 4 rows.
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.frontier > 0
                        ? "Purchased"
                        : `Cost: ${frontierCosts[0]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline  ${
                  selectedChoice === 2 ? "selected-modal-option" : ""
                } ${canClick("Frontier", 1) ? "demoClick" : ""}`}
                onClick={() => {
                  handleSelect(2, canFrontier[1]);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canFrontier[1] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Expand your frontier to 5 rows.
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.frontier > 1
                        ? "Purchased"
                        : `Cost: ${frontierCosts[1]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline ${
                  selectedChoice === 3 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(3, canFrontier[2])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canFrontier[2] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Expand your frontier to 6 rows.
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.frontier > 2
                        ? "Purchased"
                        : `Cost: ${frontierCosts[2]} BP`}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* space */}

          <div className={`bountySection ${demoGuide ? "demoBlocker" : ""}`}>
            <h3 className="modalChoiceName2">Acquisition Phase</h3>
            <div className="modalContent">
              <div
                className={`modal-option-outline  ${
                  selectedChoice === 4 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(4, canAcquisition[0])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canAcquisition[0] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Upgrade Beseech:
                      <br />
                      You may draw an additional Avelhem
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.acquisition > 0
                        ? "Purchased"
                        : `Cost: ${acquisitionCosts[0]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline ${
                  selectedChoice === 5 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(5, canAcquisition[1])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canAcquisition[1] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Upgrade Appoint: Grant the pawn Shield for 2 turns
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.acquisition > 1
                        ? "Purchased"
                        : `Cost: ${acquisitionCosts[1]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline ${
                  selectedChoice === 6 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(6, canAcquisition[2])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canAcquisition[2] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Upgrade Cultivate:
                      <br />
                      You may spend 1 FD to recover 1 “Transcendence”
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.acquisition > 2
                        ? "Purchased"
                        : `Cost: ${acquisitionCosts[2]} BP`}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* space */}

          <div className={`bountySection ${demoGuide ? "demoBlocker" : ""}`}>
            <h3 className="modalChoiceName2">Coordination Phase</h3>
            <div className="modalContent">
              <div
                className={`modal-option-outline ${
                  selectedChoice === 7 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(7, canCoordination[0])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canCoordination[0] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Upgrade Battle Cry: Roll 1 tactical die
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.coordination > 0
                        ? "Purchased"
                        : `Cost: ${coordinationCosts[0]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline ${
                  selectedChoice === 8 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(8, canCoordination[1])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canCoordination[1] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Upgrade Convene: Gain 1 Advance tactic
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.coordination > 1
                        ? "Purchased"
                        : `Cost: ${coordinationCosts[1]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline ${
                  selectedChoice === 9 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(9, canCoordination[2])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canCoordination[2] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Upgrade Assent:
                      <br />
                      Gain 1 FD
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.coordination > 2
                        ? "Purchased"
                        : `Cost: ${coordinationCosts[2]} BP`}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* space */}

          <div className={`bountySection ${demoGuide ? "demoBlocker" : ""}`}>
            <h3 className="modalChoiceName2">
              Tactics{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="question-icon2"
                style={{ height: 18 }}
                onClick={() => setInfoPopUp("Tactics")}
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>
            </h3>
            <div className="modalContent">
              <div
                className={`modal-option-outline ${
                  selectedChoice === 10 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(10, canTactics[0])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canTactics[0] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Upgrade Rally:
                      <br />
                      Increase instances to 3
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.tactics > 0
                        ? "Purchased"
                        : `Cost: ${tacticsCosts[0]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline ${
                  selectedChoice === 11 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(11, canTactics[1])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canTactics[1] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Upgrade Mobilize:
                      <br />
                      Increase instances to 4
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.tactics > 1
                        ? "Purchased"
                        : `Cost: ${tacticsCosts[1]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline ${
                  selectedChoice === 12 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(12, canTactics[2])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canTactics[2] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Upgrade Advance:
                      <br />
                      Unlock “Deploy Scion”
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.tactics > 2
                        ? "Purchased"
                        : `Cost: ${tacticsCosts[2]} BP`}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* space */}

          <div className={`bountySection ${demoGuide ? "demoBlocker" : ""}`}>
            <h3 className="modalChoiceName2">Avelhem</h3>
            <div className="modalContent">
              <div
                className={`modal-option-outline ${
                  selectedChoice === 14 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(14, canAvelhem[0])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canAvelhem[0] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      Avelhem resonance grants the unit Shield for 2 turns
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.avelhem > 0
                        ? "Purchased"
                        : `Cost: ${avelhemCosts[0]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline ${
                  selectedChoice === 15 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(15, canAvelhem[1])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canAvelhem[1] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      <p>
                        Your hand can retain up to 1 Avelhem at the Final Phase
                      </p>
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.avelhem > 1
                        ? "Purchased"
                        : `Cost: ${avelhemCosts[1]} BP`}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                className={`modal-option-outline ${
                  selectedChoice === 16 ? "selected-modal-option" : ""
                } `}
                onClick={() => handleSelect(16, canAvelhem[2])}
              >
                <div
                  className={`modal-option-content modal-option-content-2 ${
                    canAvelhem[2] ? "" : "disabled-modal-option-content"
                  } `}
                >
                  <div className="modalBountyContents">
                    <h4 className="modalChoiceText modalBountyText">
                      <p style={{ fontSize: 20 }}>
                        Unlock Avelhem alternate effect: Spend 3 FD to recover 1
                        skill with the matching aspect
                      </p>
                    </h4>
                    <h4 className="modalChoiceText modalBountyText modalCost">
                      {localGameState[self].bountyUpgrades.avelhem > 2
                        ? "Purchased"
                        : `Cost: ${avelhemCosts[2]} BP`}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* space */}
        </div>

        <div className="modalBottomButton">
          {selectedChoice === null && (
            <button
              className={`redButton ${canClick("proceed") ? "demoClick" : ""}`}
              onClick={() => {
                handleSkip();
                handleUpdateDemoGuide();
              }}
            >
              Proceed
            </button>
          )}

          {selectedChoice !== null && (
            <button
              className={`redButton ${canClick("purchase") ? "demoClick" : ""}`}
              onClick={() => {
                handlePurchase();
                handleUpdateDemoGuide();
              }}
            >
              Purchase
            </button>
          )}
        </div>
      </div>
      {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />}
    </div>
  );
};
export default BountyPhase;
