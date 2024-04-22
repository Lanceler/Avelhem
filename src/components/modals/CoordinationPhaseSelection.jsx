import React, { useState } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const CoordinationPhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { assignTactics, rollTactic } = useRecurringEffects();

  const canBattleCry = localGameState[self].skillHand.length > 2;

  const canConvene = localGameState[self].bountyUpgrades.coordination > 0;

  const handleAssent = () => {
    if (selectedChoice === 1) {
      setSelectedChoice(null);
    } else {
      setSelectedChoice(1);
    }
  };

  const handleBattleCry = () => {
    if (selectedChoice === 2) {
      setSelectedChoice(null);
    } else if (canBattleCry) {
      setSelectedChoice(2);
    }
  };

  const handleConvene = () => {
    if (selectedChoice === 3) {
      setSelectedChoice(null);
    } else if (canConvene) {
      setSelectedChoice(3);
    }
  };

  const handleSelect = () => {
    // newGameState.currentResolution.pop();
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    switch (selectedChoice) {
      case 1:
        newGameState = assignTactics(newGameState, rollTactic(), rollTactic());
        newGameState = nextPhase(newGameState);
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Tactic Results",
        });
        dispatch(updateState(newGameState));
        props.updateFirebase(newGameState);

        break;
      case 2:
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

      case 3:
        // to do

        break;
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const nextPhase = (newGameState) => {
    newGameState.turnPhase = "Defiance";
    newGameState.currentResolution.pop();
    newGameState.currentResolution.push({
      resolution: "Defiance Phase Selection",
    });

    return newGameState;
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
          <div
            className={`customChoice customChoiceSmall ${
              selectedChoice === 1 ? "selectedChoice" : ""
            } `}
            style={{ backgroundImage: `url(${GoldFrame})` }}
            onClick={() => handleAssent()}
          >
            <div className="customChoiceFrame">
              <h3 className="choiceText customChoiceFrameHeader">Assent</h3>
              <h4 className="customChoiceDescription">Roll 2 tactical dice.</h4>
            </div>
          </div>

          <div
            className={`customChoice customChoiceSmall ${
              selectedChoice === 2 ? "selectedChoice" : ""
            } `}
            style={{ backgroundImage: `url(${GoldFrame})` }}
            onClick={() => handleBattleCry()}
          >
            <div
              className={`customChoiceFrame ${
                canBattleCry ? "" : "disabledChoice"
              } `}
            >
              <h3 className="choiceText customChoiceFrameHeader">Battle Cry</h3>
              <h4 className="customChoiceDescription">
                Spend 3 skills to gain an Assault tactic.
              </h4>
            </div>
          </div>
          <div
            className={`customChoice customChoiceSmall ${
              selectedChoice === 3 ? "selectedChoice" : ""
            } `}
            style={{ backgroundImage: `url(${GoldFrame})` }}
            onClick={() => handleConvene()}
          >
            <div
              className={`customChoiceFrame ${
                canConvene ? "" : "disabledChoice"
              } `}
            >
              <h3 className="choiceText customChoiceFrameHeader">Convene</h3>
              <h4 className="customChoiceDescription">Gain a Rally Tactic.</h4>
            </div>
          </div>
        </div>

        {selectedChoice !== null && (
          <button className="choiceButton" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default CoordinationPhaseSelection;
