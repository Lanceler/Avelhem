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
        newGameState[self].bountyUpgrades.phases = 1;
        newGameState[self].bountyPoints -= phasesCosts[0];
        setSelectedChoice(null);
        break;

      case 5:
        newGameState[self].bountyUpgrades.phases = 2;
        newGameState[self].bountyPoints -= phasesCosts[1];
        setSelectedChoice(null);
        break;

      case 6:
        newGameState[self].bountyUpgrades.phases = 3;
        newGameState[self].bountyPoints -= phasesCosts[2];
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
        newGameState[self].bountyUpgrades.skill = 1;
        newGameState[self].bountyPoints -= skillCosts[0];
        setSelectedChoice(null);
        break;

      case 17:
        newGameState[self].bountyUpgrades.skill = 2;
        newGameState[self].bountyPoints -= skillCosts[1];
        setSelectedChoice(null);
        break;

      case 18:
        newGameState[self].bountyUpgrades.skill = 3;
        newGameState[self].bountyPoints -= skillCosts[2];
        setSelectedChoice(null);

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
  const phasesCosts = [3, 3, 4];
  const tacticsCosts = [3, 3, 4];
  const avelhemCosts = [3, 3, 4];
  const skillCosts = [3, 3, 4];
  // const victoryCosts = [10, 5];

  const canFrontier = [
    localGameState[self].bountyPoints >= frontierCosts[0] &&
      localGameState[self].bountyUpgrades.frontier === 0,
    localGameState[self].bountyPoints >= frontierCosts[1] &&
      localGameState[self].bountyUpgrades.frontier === 1,
    localGameState[self].bountyPoints >= frontierCosts[2] &&
      localGameState[self].bountyUpgrades.frontier === 2,
  ];

  const canPhases = [
    localGameState[self].bountyPoints >= phasesCosts[0] &&
      localGameState[self].bountyUpgrades.phases === 0,
    localGameState[self].bountyPoints >= phasesCosts[1] &&
      localGameState[self].bountyUpgrades.phases === 1,
    localGameState[self].bountyPoints >= phasesCosts[2] &&
      localGameState[self].bountyUpgrades.phases === 2,
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

  const canSkill = [
    localGameState[self].bountyPoints >= skillCosts[0] &&
      localGameState[self].bountyUpgrades.skill === 0,
    localGameState[self].bountyPoints >= skillCosts[1] &&
      localGameState[self].bountyUpgrades.skill === 1,
    localGameState[self].bountyPoints >= skillCosts[2] &&
      localGameState[self].bountyUpgrades.skill === 2,
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
        return newGameState[self].bountyUpgrades.phases >= 1;

      case 5:
        return newGameState[self].bountyUpgrades.phases >= 2;

      case 6:
        return newGameState[self].bountyUpgrades.phases >= 3;

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
        return newGameState[self].bountyUpgrades.skill >= 1;

      case 17:
        return newGameState[self].bountyUpgrades.skill >= 2;

      case 18:
        return newGameState[self].bountyUpgrades.skill >= 3;

      default:
        return;
    }
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 20:
            return element1 === "Phases" && element2 === 0;

          case 21:
          case 23:
            return element1 === "purchase";

          case 22:
            return element1 === "Phases" && element2 === 1;

          case 24:
            return element1 === "proceed";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
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

  const phasesBounty = {
    category: "Phases",
    items: [
      {
        text: "You may draw 1 floating skill at the start of your Acquisition Phase",
        ind: 4,
      },
      {
        text: "Reduce Battle Cry cost to 2 skills; you may spend 1 skill to roll a tactical die",
        ind: 5,
      },
      {
        text: "Defiance Phase grants 2 DP",
        ind: 6,
      },
    ],
    cost: phasesCosts,
    can: canPhases,
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
        text: (
          <>
            Upgrade Mobilize:
            <br />
            Increase instances to 4
          </>
        ),
        ind: 10,
      },
      {
        text: (
          <>
            Upgrade Advance: Unlock the
            <br />
            “Convert Tactic” action
          </>
        ),
        ind: 11,
      },
      {
        text: (
          <>Once per turn, 1 unit may Aether-blast without using a tactic</>
        ),
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
        text: "Increase your Avelhem hand limit to 1",
        ind: 13,
      },
      {
        text: "Units gain Shield for 2 turns upon Ascension via Avelhem",
        ind: 14,
      },
      {
        text: (
          <>
            <p style={{ fontSize: 19.5 }}>
              Unlock Avelhem alternate effect: Spend 2 DP to recover 1 skill
              with the matching facet
            </p>
          </>
        ),
        ind: 15,
      },
    ],
    cost: avelhemCosts,
    can: canAvelhem,
  };

  const skillBounty = {
    category: "Skill",
    items: [
      {
        text: (
          <>
            <p style={{ fontSize: 19.5 }}>
              Your Scions can use any skill that belongs to their class as a
              resonator
            </p>
          </>
        ),
        ind: 16,
      },
      {
        text: "Increase your skill hand limit to 10",
        ind: 17,
      },
      {
        text: "You may draw 1 skill after you search or recover a skill",
        ind: 18,
      },
    ],
    cost: skillCosts,
    can: canSkill,
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
          <BountyRow info={phasesBounty} />
          <BountyRow info={tacticsBounty} />
          <BountyRow info={avelhemBounty} />
          <BountyRow info={skillBounty} />
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
