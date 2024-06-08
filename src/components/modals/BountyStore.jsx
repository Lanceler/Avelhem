import React, { useState } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const BountyStore = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const { drawSkill } = useRecurringEffects();

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

  const frontierCosts = [2, 3, 5];
  const acquisitionCosts = [3, 3, 3];
  const coordinationCosts = [2, 2, 2];
  const tacticsCosts = [2, 2, 2, 2];
  const avelhemCosts = [3, 3, 3, 3];
  const victoryCosts = [10, 5];

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

  const canVictory = [
    localGameState[self].bountyPoints >= victoryCosts[0] &&
      localGameState[self].bountyUpgrades.victory === 0,
    localGameState[self].score === 2 &&
      localGameState[self].bountyPoints >= victoryCosts[1] &&
      localGameState[self].bountyUpgrades.victory === 1,
  ];

  // console.log(canFrontier);
  // console.log(canAcquisition);

  return (
    <div className="modal-backdrop">
      <div className="modal ">
        <div className="twoColumn">
          <h2 className="choiceTitle">
            Bounty Phase (BP: {localGameState[self].bountyPoints})
          </h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <div className="scrollable scrollable-y-only">
          <h3>Expand your frontier</h3>
          <div className="threeColumn">
            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 1 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(1, canFrontier[0])}
            >
              <div
                className={`customChoiceFrame ${
                  canFrontier[0] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    Expand your frontier to 3 rows.
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.frontier > 0
                      ? "Purchased"
                      : `Cost: ${frontierCosts[0]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 2 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(2, canFrontier[1])}
            >
              <div
                className={`customChoiceFrame ${
                  canFrontier[1] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    Expand your frontier to 4 rows.
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.frontier > 1
                      ? "Purchased"
                      : `Cost: ${frontierCosts[1]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 3 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(3, canFrontier[2])}
            >
              <div
                className={`customChoiceFrame ${
                  canFrontier[2] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    Expand your frontier to 5 rows.
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.frontier > 2
                      ? "Purchased"
                      : `Cost: ${frontierCosts[2]} BP`}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* space */}

          <h3>Improve your Acquisition Phase</h3>
          <div className="threeColumn">
            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 4 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(4, canAcquisition[0])}
            >
              <div
                className={`customChoiceFrame ${
                  canAcquisition[0] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">Upgrade Appoint.</h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.acquisition > 0
                      ? "Purchased"
                      : `Cost: ${acquisitionCosts[0]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 5 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(5, canAcquisition[1])}
            >
              <div
                className={`customChoiceFrame ${
                  canAcquisition[1] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">Upgrade Beseech.</h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.acquisition > 1
                      ? "Purchased"
                      : `Cost: ${acquisitionCosts[1]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 6 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(6, canAcquisition[2])}
            >
              <div
                className={`customChoiceFrame ${
                  canAcquisition[2] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">Upgrade Cultivate.</h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.acquisition > 2
                      ? "Purchased"
                      : `Cost: ${acquisitionCosts[2]} BP`}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* space */}

          <h3>Improve your Coordination Phase</h3>
          <div className="threeColumn">
            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 7 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(7, canCoordination[0])}
            >
              <div
                className={`customChoiceFrame ${
                  canCoordination[0] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">Unlock Convene.</h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.coordination > 0
                      ? "Purchased"
                      : `Cost: ${coordinationCosts[0]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 8 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(8, canCoordination[1])}
            >
              <div
                className={`customChoiceFrame ${
                  canCoordination[1] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">Upgrade Convene.</h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.coordination > 1
                      ? "Purchased"
                      : `Cost: ${coordinationCosts[1]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 9 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(9, canCoordination[2])}
            >
              <div
                className={`customChoiceFrame ${
                  canCoordination[2] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    Upgrade <br /> Battle Cry.
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.coordination > 2
                      ? "Purchased"
                      : `Cost: ${coordinationCosts[2]} BP`}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* space */}

          <h3>Upgrade your Tactics</h3>
          <div className="fourColumn">
            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 10 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 178 }}
              onClick={() => handleSelect(10, canTactics[0])}
            >
              <div
                className={`customChoiceFrame ${
                  canTactics[0] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">Upgrade Invoke.</h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.tactics > 0
                      ? "Purchased"
                      : `Cost: ${tacticsCosts[0]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 11 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 178 }}
              onClick={() => handleSelect(11, canTactics[1])}
            >
              <div
                className={`customChoiceFrame ${
                  canTactics[1] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">Upgrade Advance.</h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.tactics > 1
                      ? "Purchased"
                      : `Cost: ${tacticsCosts[1]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 12 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 178 }}
              onClick={() => handleSelect(12, canTactics[2])}
            >
              <div
                className={`customChoiceFrame ${
                  canTactics[2] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">Upgrade Mobilize.</h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.tactics > 2
                      ? "Purchased"
                      : `Cost: ${tacticsCosts[2]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 13 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 178 }}
              onClick={() => handleSelect(13, canTactics[3])}
            >
              <div
                className={`customChoiceFrame ${
                  canTactics[3] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    Upgrade Advance further.
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.tactics > 3
                      ? "Purchased"
                      : `Cost: ${tacticsCosts[3]} BP`}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* space */}

          <h3>Enhance your Avelhems</h3>
          <div className="fourColumn">
            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 14 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 178 }}
              onClick={() => handleSelect(14, canAvelhem[0])}
            >
              <div
                className={`customChoiceFrame ${
                  canAvelhem[0] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    Your hand can retain up to 1 Avelhem at the Final Phase.
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.avelhem > 0
                      ? "Purchased"
                      : `Cost: ${avelhemCosts[0]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 15 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 178 }}
              onClick={() => handleSelect(15, canAvelhem[1])}
            >
              <div
                className={`customChoiceFrame ${
                  canAvelhem[1] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    <p style={{ fontSize: 16 }}>
                      Your Avelhems have an alternate effect: Spend 3 FD to
                      search for 1 non-burst skill with the matching aspect.
                    </p>
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.avelhem > 1
                      ? "Purchased"
                      : `Cost: ${avelhemCosts[1]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 16 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 178 }}
              onClick={() => handleSelect(16, canAvelhem[2])}
            >
              <div
                className={`customChoiceFrame ${
                  canAvelhem[2] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    <p style={{ fontSize: 18.5 }}>
                      When your pawns ascend via an Avelhem, grant them Shield
                      for 2 turns.
                    </p>
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.avelhem > 2
                      ? "Purchased"
                      : `Cost: ${avelhemCosts[2]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 17 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 178 }}
              onClick={() => handleSelect(17, canAvelhem[3])}
            >
              <div
                className={`customChoiceFrame ${
                  canAvelhem[3] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    <p style={{ fontSize: 16.0 }}>
                      Your Avelhems have an alternate effect: Spend 3 FD to
                      recover 1 skill with the matching aspect.
                    </p>
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.avelhem > 3
                      ? "Purchased"
                      : `Cost: ${avelhemCosts[3]} BP`}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* space */}

          {/* <h3>March to victory</h3>
          <div className="twoColumn">
            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 18 ? "selectedChoice" : ""
              } `}
              style={{
                backgroundImage: `url(${GoldFrame})`,
                width: 384.65,
              }}
              onClick={() => handleSelect(18, canVictory[0])}
            >
              <div
                className={`customChoiceFrame ${
                  canVictory[0] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    Gain 6 FD, draw 4 Avelhems,
                    <br /> draw 4 skills, and restore the Virtues of all ally
                    units.
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.victory > 0
                      ? "Purchased"
                      : `Cost: ${victoryCosts[0]} BP`}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 19 ? "selectedChoice" : ""
              } `}
              style={{
                backgroundImage: `url(${GoldFrame})`,
                width: 384.65,
              }}
              onClick={() => handleSelect(19, canVictory[1])}
            >
              <div
                className={`customChoiceFrame ${
                  canVictory[1] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    Spend 6 FD to win the game. <br />
                    <br />
                    <i>
                      Requirement:
                      <br />
                      You have scored twice.
                    </i>
                  </h4>
                  <h4 className="bpCost">
                    {localGameState[self].bountyUpgrades.victory > 1
                      ? "Purchased"
                      : `Cost: ${victoryCosts[1]} BP`}
                  </h4>
                </div>
              </div>
            </div>
          </div> */}

          {/* space */}
        </div>
        <div>
          {selectedChoice === null && (
            <button className="choiceButton" onClick={() => handleSkip()}>
              Proceed
            </button>
          )}

          {selectedChoice !== null && (
            <button className="choiceButton" onClick={() => handlePurchase()}>
              Purchase
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default BountyStore;
