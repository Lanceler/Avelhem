import React, { useState } from "react";
import "./Modal.css";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import InfoPopUp from "./InfoPopUp";

const BountyPhase = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

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
        newGameState[self].bountyUpgrades.avelhem = 1;
        newGameState[self].bountyPoints -= avelhemCosts[0];
        setSelectedChoice(null);
        break;

      case 14:
        newGameState[self].bountyUpgrades.avelhem = 2;
        newGameState[self].bountyPoints -= avelhemCosts[1];
        setSelectedChoice(null);
        break;

      case 15:
        newGameState[self].bountyUpgrades.avelhem = 3;
        newGameState[self].bountyPoints -= avelhemCosts[2];
        setSelectedChoice(null);
        break;

      case 16:
        newGameState[self].bountyUpgrades.burst = 1;
        newGameState[self].bountyPoints -= burstCosts[0];
        setSelectedChoice(null);
        break;

      case 17:
        newGameState[self].bountyUpgrades.burst = 2;
        newGameState[self].bountyPoints -= burstCosts[1];
        setSelectedChoice(null);
        break;

      case 18:
        newGameState[self].bountyUpgrades.burst = 3;
        newGameState[self].bountyPoints -= burstCosts[2];
        setSelectedChoice(null);

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Burst Upgrade",
          player: self,
          details: {
            reason: "Burst Upgrade",
            title: "Burst Upgrade",
            message: "You may discard your entire skill repertoire.",
            no: "Skip",
            yes: "Discard",
          },
        });

        break;

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

  const frontierCosts = [6, 8, 10];
  const acquisitionCosts = [3, 3, 4];
  const coordinationCosts = [3, 3, 4];
  const tacticsCosts = [3, 3, 4];
  const avelhemCosts = [3, 3, 4];
  const burstCosts = [3, 3, 4];
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
  ];

  const canAvelhem = [
    localGameState[self].bountyPoints >= avelhemCosts[0] &&
      localGameState[self].bountyUpgrades.avelhem === 0,
    localGameState[self].bountyPoints >= avelhemCosts[1] &&
      localGameState[self].bountyUpgrades.avelhem === 1,
    localGameState[self].bountyPoints >= avelhemCosts[2] &&
      localGameState[self].bountyUpgrades.avelhem === 2,
  ];

  const canBurst = [
    localGameState[self].bountyPoints >= burstCosts[0] &&
      localGameState[self].bountyUpgrades.burst === 0,
    localGameState[self].bountyPoints >= burstCosts[1] &&
      localGameState[self].bountyUpgrades.burst === 1,
    localGameState[self].bountyPoints >= burstCosts[2] &&
      localGameState[self].bountyUpgrades.burst === 2,
  ];

  // const canVictory = [
  //   localGameState[self].bountyPoints >= victoryCosts[0] &&
  //     localGameState[self].bountyUpgrades.victory === 0,
  //   localGameState[self].score === 2 &&
  //     localGameState[self].bountyPoints >= victoryCosts[1] &&
  //     localGameState[self].bountyUpgrades.victory === 1,
  // ];

  const isPurchased = (i) => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    switch (i) {
      case 1:
        return newGameState[self].bountyUpgrades.frontier >= 1;

      case 2:
        return newGameState[self].bountyUpgrades.frontier >= 2;

      case 3:
        return newGameState[self].bountyUpgrades.frontier >= 3;

      case 4:
        return newGameState[self].bountyUpgrades.acquisition >= 1;

      case 5:
        return newGameState[self].bountyUpgrades.acquisition >= 2;

      case 6:
        return newGameState[self].bountyUpgrades.acquisition >= 3;

      case 7:
        return newGameState[self].bountyUpgrades.coordination >= 1;

      case 8:
        return newGameState[self].bountyUpgrades.coordination >= 2;

      case 9:
        return newGameState[self].bountyUpgrades.coordination >= 3;

      case 10:
        return newGameState[self].bountyUpgrades.tactics >= 1;

      case 11:
        return newGameState[self].bountyUpgrades.tactics >= 2;

      case 12:
        return newGameState[self].bountyUpgrades.tactics >= 3;

      case 13:
        return newGameState[self].bountyUpgrades.avelhem >= 1;

      case 14:
        return newGameState[self].bountyUpgrades.avelhem >= 2;

      case 15:
        return newGameState[self].bountyUpgrades.avelhem >= 3;

      case 16:
        return newGameState[self].bountyUpgrades.burst >= 1;

      case 17:
        return newGameState[self].bountyUpgrades.burst >= 2;

      case 18:
        return newGameState[self].bountyUpgrades.burst >= 3;

      default:
        return;
    }
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 21:
            return element1 === "Acquisition Phase" && element2 === 0;

          case 22:
          case 24:
            return element1 === "purchase";

          case 23:
            return element1 === "Acquisition Phase" && element2 === 1;

          case 25:
            return element1 === "proceed";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  const frontierBounty = {
    category: "Frontier (Deployment Area)",
    items: [
      {
        text: "Expand your frontier to 4 rows.",
        ind: 1,
      },
      {
        text: "Expand your frontier to 5 rows.",
        ind: 2,
      },
      {
        text: "Expand your frontier to 6 rows.",
        ind: 3,
      },
    ],
    cost: frontierCosts,
    can: canFrontier,
  };

  const acquisitionBounty = {
    category: "Acquisition Phase",
    items: [
      {
        text: (
          <>
            Upgrade Beseech:
            <br />
            You may draw an additional Avelhem
          </>
        ),
        ind: 4,
      },
      {
        text: "Upgrade Appoint: Grant the pawn Shield for 2 turns",
        ind: 5,
      },
      {
        text: "Upgrade Cultivate: You may spend 1 FD to draw an additional skill",
        ind: 6,
      },
    ],
    cost: acquisitionCosts,
    can: canAcquisition,
  };

  const coordinationBounty = {
    category: "Coordination Phase",
    items: [
      {
        text: "Upgrade Battle Cry: Roll 1 tactical die",
        ind: 7,
      },
      {
        text: "Upgrade Convene: Gain 1 Advance tactic",
        ind: 8,
      },
      {
        text: (
          <>
            Upgrade Assent:
            <br />
            Gain 1 FD
          </>
        ),
        ind: 9,
      },
    ],
    cost: coordinationCosts,
    can: canCoordination,
  };

  const tacticsBounty = {
    category: (
      <>
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
      </>
    ),
    items: [
      {
        text: "Upgrade Rally: Increase instances to 3",
        ind: 10,
      },
      {
        text: "Upgrade Mobilize: Increase instances to 4",
        ind: 11,
      },
      {
        text: "Upgrade Advance: Unlock “Deploy Scion”",
        ind: 12,
      },
    ],
    cost: tacticsCosts,
    can: canTactics,
  };

  const avelhemBounty = {
    category: "Avelhem",
    items: [
      {
        text: "Avelhem resonance grants the unit Shield for 2 turns",
        ind: 13,
      },
      {
        text: "Your hand can hold up to 1 Avelhem at the Final Phase",
        ind: 14,
      },
      {
        text: (
          <>
            <p style={{ fontSize: 19.5 }}>
              Unlock Avelhem alternate effect: Spend 2 FD to recover 1 skill
              with the matching aspect
            </p>
          </>
        ),
        ind: 15,
      },
    ],
    cost: avelhemCosts,
    can: canAvelhem,
  };

  const burstBounty = {
    category: "Burst",
    items: [
      {
        text: (
          <>
            You can activate
            <br />
            burst skills
          </>
        ),
        ind: 16,
      },
      {
        text: "You can search for burst skills",
        ind: 17,
      },
      {
        text: (
          <>
            <p style={{ fontSize: 17.2 }}>
              When your skill repertoire is depleted, shattered skills are
              included in its replenishment (you may discard your entire skill
              repertoire)
            </p>
          </>
        ),

        ind: 18,
      },
    ],
    cost: burstCosts,
    can: canBurst,
  };

  const BountyRow = ({ info }) => {
    return (
      <div className={`modalContent2 ${demoGuide ? "demoBlocker" : ""}`}>
        <div className="modalContentText">{info.category}</div>
        <div className="modalContent3Column">
          {info.items.map((item, i) => (
            <div
              key={i}
              className={`modalOptionOutline
                          modalSmallOptionOutline ${
                            selectedChoice === item.ind
                              ? "modalSmallOptionOutlineSelected"
                              : ""
                          }`}
              onClick={() => {
                handleSelect(item.ind, info.can[i]);
                handleUpdateDemoGuide();
              }}
            >
              <div
                className={`modalSmall
                                ${info.can[i] ? "" : "disabledModal"}
                                ${isPurchased(item.ind) ? "purchased" : ""}
                                ${canClick(info.category, i) ? "demoClick" : ""}
                                `}
                style={{
                  boxShadow: selectedChoice === item.ind ? "none" : "",
                }}
              >
                <div className="modalBountyContents">
                  <h4 className="modalChoiceText modalBountyText">
                    {item.text}
                  </h4>
                  <h4 className="modalChoiceText modalBountyText modalCost">
                    {isPurchased(item.ind)
                      ? "PURCHASED"
                      : `Cost: ${info.cost[i]} BP`}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">
            Bounty Phase (BP: {localGameState[self].bountyPoints})
          </div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalScrollableY" style={{ pointerEvents: "all" }}>
          <BountyRow info={frontierBounty} />
          <BountyRow info={acquisitionBounty} />
          <BountyRow info={coordinationBounty} />
          <BountyRow info={tacticsBounty} />
          <BountyRow info={avelhemBounty} />
          <BountyRow info={burstBounty} />
        </div>

        <div className="modalFooter">
          {selectedChoice === null && (
            <button
              className={`redButton2 ${canClick("proceed") ? "demoClick" : ""}`}
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
              className={`redButton2 ${
                canClick("purchase") ? "demoClick" : ""
              }`}
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
