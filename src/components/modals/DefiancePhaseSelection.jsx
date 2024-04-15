import React, { useState } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const DefiancePhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const { canActivateSovereignSkill } = useRecurringEffects();

  const nextPhase = (gameState) => {
    gameState.turnPhase = "Execution";
    gameState.currentResolution.pop();
    gameState.currentResolution.push({
      resolution: "Execution Phase",
    });

    return gameState;
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = nextPhase(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleProceed = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    switch (selectedChoice) {
      // case 1:
      //   newGameState[self].bountyUpgrades.frontier = 1;
      //   newGameState[self].bountyPoints -= frontierCosts[0];
      //   setSelectedChoice(null);
      //   break;

      default:
        break;
    }

    // dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
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

  const defianceCosts = [1, 1, 2, 3, 3, 4];

  const canSelect = [
    //Adapt
    localGameState[self].fateDefiances >= 1 &&
      localGameState[self].skillHand.length > 0,
    //Backtrack
    localGameState[self].fateDefiances >= 1 &&
      localGameState.tactics.length > 1,
    //Contemplate
    localGameState[self].fateDefiances >= 2 &&
      localGameState.tactics.length > 1,
    //Discern (Power at the Final Hour has the same activation requirement)
    localGameState[self].fateDefiances >= 3 &&
      canActivateSovereignSkill("SC-01"),
    //Empower
    localGameState[self].fateDefiances >= 3,
    //Finesse
    localGameState[self].fateDefiances >= 4,
  ];

  // console.log(canFrontier);
  // console.log(canAcquisition);

  return (
    <div className="modal-backdrop">
      <div className="modal ">
        <div className="twoColumn">
          <h2 className="choiceTitle">
            Defiance Phase (FD: {localGameState[self].fateDefiances})
          </h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <div className="scrollable scrollable-y-only">
          {/* <h3>Defy Fate</h3> */}
          <div className="threeColumn">
            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 1 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(1, canSelect[0])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[0] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Adapt</h4>
                  <h3 className="defianceDescription defianceDescriptionSmall">
                    Place up to 4 skills from your hand at the bottom of your
                    repertoire, then draw the same number.
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[0]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 2 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(2, canSelect[1])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[1] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Backtrack</h4>
                  <h3 className="defianceDescription">Reroll your tactics.</h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[1]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 3 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(3, canSelect[2])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[2] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Contemplate</h4>
                  <h3 className="defianceDescription">
                    Reroll your tactics with 3 dice; disregard 1.
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[1]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 4 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(4, canSelect[3])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[3] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Discern</h4>
                  <h3 className="defianceDescription ">
                    Spend 1 Scion skill to ascend an ally pawn to the matching
                    class.
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[3]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 5 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(5, canSelect[4])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[4] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Empower</h4>
                  <h3 className="defianceDescription ">
                    Draw 1 skill. You may recover 1 “Transcendence”.
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[4]} FD`}</h4>
                </div>
              </div>
            </div>

            <div
              className={`customChoice customChoiceSmaller ${
                selectedChoice === 6 ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})`, width: 245.5 }}
              onClick={() => handleSelect(6, canSelect[5])}
            >
              <div
                className={`customChoiceFrame ${
                  canSelect[5] ? "" : "disabledChoice"
                } `}
              >
                <div className="defianceText">
                  <h4 className="defianceTitle">Finesse</h4>
                  <h3 className="defianceDescription ">
                    Search for 1 Sovereign skill.
                  </h3>

                  <h4 className="fdCost">{`Cost: ${defianceCosts[5]} FD`}</h4>
                </div>
              </div>
            </div>

            {/* end */}
          </div>
        </div>

        <div>
          {selectedChoice === null && (
            <button className="choiceButton noYes" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedChoice !== null && (
            <button
              className="choiceButton noYes"
              onClick={() => handleProceed()}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default DefiancePhaseSelection;
