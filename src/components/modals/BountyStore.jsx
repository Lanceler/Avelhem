import React, { useState } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";

const BountyStore = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const nextPhase = (gameState) => {
    gameState.turnPhase = "Coordination";
    gameState.currentResolution.pop();
    gameState.currentResolution.push({
      resolution: "Coordination Phase Selection",
    });

    return gameState;
  };

  const onSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState = nextPhase(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  //bountyUpgrades.frontier
  //bountyUpgrades.acquisition
  //bountyUpgrades.coordination
  //bountyUpgrades.tactics
  //bountyUpgrades.avelhem
  //bountyUpgrades.victory

  const frontierCosts = [2, 3, 5];
  const acquisitionCosts = [2, 2, 4];
  const coordinationCosts = [2, 3, 3];
  const tacticsCosts = [2, 2, 2, 2];
  const avelhemCosts = [3, 1, 2, 2];
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

  const handleSelect = (i, condition) => {
    if (selectedChoice === i) {
      setSelectedChoice(null);
    } else if (condition) {
      setSelectedChoice(i);
    }
  };

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

        <div className="scrollable">
          <h3>Expand your frontier.</h3>

          <div className="threeColumn">
            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 1 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})` }}
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
              style={{ backgroundImage: `url(${GoldFrame})` }}
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
              style={{ backgroundImage: `url(${GoldFrame})` }}
              onClick={() => handleSelect(3, canFrontier[2])}
            >
              <div
                className={`customChoiceFrame ${
                  canFrontier[2] ? "" : "disabledChoice"
                } `}
              >
                <div className="bountyText">
                  <h4 className="bountyDescription">
                    Expand your frontier to 5 rows and draw 1 skill.
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

          {/* <h3>Upgrade Frontier</h3>
          <div className="threeColumn">
            <h4 className="choiceWithDescription">
              Upgrade your frontier to 3 rows.
            </h4>
            <h4 className="choiceWithDescription">
              Upgrade your frontier to 4 rows.
            </h4>
            <h4 className="choiceWithDescription">
              Upgrade your frontier to 5 rows.
            </h4>
          </div> */}
          {/* space */}
          <h3>Acquisition Phase</h3>
          <div className="threeColumn">
            <h4 className="choiceWithDescription">Unlock Divine.</h4>
            <h4 className="choiceWithDescription">Upgrade Cultivate.</h4>
            <h4 className="choiceWithDescription">Unlock Expedite.</h4>
          </div>
          {/* space */}
          <h3>Coordination Phase</h3>
          <div className="threeColumn">
            <h4 className="choiceWithDescription">Unlock Convene.</h4>
            <h4 className="choiceWithDescription">Upgrade Convene.</h4>
            <h4 className="choiceWithDescription">Upgrade Battle Cry.</h4>
          </div>
          {/* space */}
          <h3>Tactics</h3>
          <div className="fourColumn">
            <h4 className="choiceWithDescription">
              Upgrade your advance tactic.
            </h4>
            <h4 className="choiceWithDescription">
              Upgrade your invoke tactic.
            </h4>
            <h4 className="choiceWithDescription">
              Upgrade your mobilize tactic.
            </h4>
            <h4 className="choiceWithDescription">
              Upgrade your advance tactic again.
            </h4>
          </div>
          {/* space */}
          <h3>Avelhem</h3>
          <div className="fourColumn">
            <h4 className="choiceWithDescription">
              You may float 1 Avelhem at the start of the Final Phase.
            </h4>
            <h4 className="choiceWithDescription">
              Upgrade your Avelhems’ effect: Grant the unit Shield{" "}
              {String.fromCharCode(123)}2 turns{String.fromCharCode(125)}.
            </h4>
            <h4 className="choiceWithDescription">
              Once per Execution Phase, you can spend or float 1 Avelhem in lieu
              of 1 skill.
            </h4>
            <h4 className="choiceWithDescription">
              Twice per Execution Phase, you can spend 1 Avelhem to recover then
              float 1 skill with the corresponding aspect.
            </h4>
          </div>
          {/* space */}
          <h3>Victory March</h3>
          <div className="twoColumn">
            <h4 className="choiceWithDescription">
              Gain 4 FD, draw 4 Avelhems, draw 4 skills, and restore the Virtues
              of all ally units.
            </h4>
            <h4 className="choiceWithDescription">
              Spend 6 FD to win the game. You may purchase this only if 2 of
              your units have scored.
            </h4>
          </div>
          {/* space */}
        </div>
        <div>
          <button onClick={() => onSkip()}>Skip</button>
        </div>
      </div>
    </div>
  );
};
export default BountyStore;
