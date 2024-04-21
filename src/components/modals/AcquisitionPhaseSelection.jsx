import React, { useState } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const AcquisitionPhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { canDeploy, drawSkill, drawAvelhem, getVacantFrontier } =
    useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));

  let newIndex = newGameState[self].units.indexOf(null);
  if (newIndex === -1) {
    newIndex = newGameState[self].units.length;
  }
  const canAppoint = canDeploy();

  const canDivine = newGameState[self].bountyUpgrades.acquisition > 0;

  const canExpedite = newGameState[self].bountyUpgrades.acquisition > 2;

  const handleAppoint = () => {
    if (selectedChoice === 1) {
      setSelectedChoice(null);
    } else if (canAppoint) {
      setSelectedChoice(1);
    }
  };

  const handleBequeath = () => {
    if (selectedChoice === 2) {
      setSelectedChoice(null);
    } else {
      setSelectedChoice(2);
    }
  };

  const handleCultivate = () => {
    if (selectedChoice === 3) {
      setSelectedChoice(null);
    } else {
      setSelectedChoice(3);
    }
  };

  const handleDivine = () => {
    if (selectedChoice === 4) {
      setSelectedChoice(null);
    } else if (canDivine) {
      setSelectedChoice(4);
    }
  };

  const handleExpedite = () => {
    if (selectedChoice === 5) {
      setSelectedChoice(null);
    } else if (canExpedite) {
      setSelectedChoice(5);
    }
  };

  const handleSelect = () => {
    // newGameState.currentResolution.pop();

    switch (selectedChoice) {
      case 1:
        props.enterDeployMode(getVacantFrontier());
        break;
      case 2:
        newGameState = drawAvelhem(newGameState);
        newGameState = drawAvelhem(newGameState);
        newGameState = nextPhase(newGameState);
        dispatch(updateState(newGameState));
        props.updateFirebase(newGameState);
        break;
      case 3:
        newGameState = drawSkill(newGameState);
        newGameState = nextPhase(newGameState);
        dispatch(updateState(newGameState));
        props.updateFirebase(newGameState);
        break;
      case 4:
        break;
      case 5:
        newGameState = drawSkill(newGameState);
        newGameState = drawSkill(newGameState);
        newGameState = nextPhase(newGameState);
        dispatch(updateState(newGameState));
        props.updateFirebase(newGameState);
        break;
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const nextPhase = (newGameState) => {
    newGameState.turnPhase = "Bounty";
    newGameState.currentResolution.pop();
    newGameState.currentResolution.push({
      resolution: "Bounty Phase Selection",
    });

    return newGameState;
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">Aquisition Phase</h2>
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
            onClick={() => handleAppoint()}
          >
            <div
              className={`customChoiceFrame ${
                canAppoint ? "" : "disabledChoice"
              } `}
            >
              <h3 className="choiceText customChoiceFrameHeader">Appoint</h3>
              <h4 className="customChoiceDescription">
                Deploy a pawn in your frontier.
              </h4>
            </div>
          </div>

          <div
            className={`customChoice customChoiceSmall ${
              selectedChoice === 2 ? "selectedChoice" : ""
            } `}
            style={{ backgroundImage: `url(${GoldFrame})` }}
            onClick={() => handleBequeath()}
          >
            <div className="customChoiceFrame">
              <h3 className="choiceText customChoiceFrameHeader">Bequeath</h3>
              <h4 className="customChoiceDescription">Draw 2 Avelhems.</h4>
            </div>
          </div>
          <div
            className={`customChoice customChoiceSmall ${
              selectedChoice === 3 ? "selectedChoice" : ""
            } `}
            style={{ backgroundImage: `url(${GoldFrame})` }}
            onClick={() => handleCultivate()}
          >
            <div className="customChoiceFrame">
              <h3 className="choiceText customChoiceFrameHeader">Cultivate</h3>
              <h4 className="customChoiceDescription">Draw 1 skill.</h4>
            </div>
          </div>
        </div>

        <div
          className="twoColumn "
          style={{
            justifyContent: "center",
            placeItems: "center",
          }}
        >
          <div
            className={`customChoice customChoiceSmall  ${
              selectedChoice === 4 ? "selectedChoice" : ""
            } `}
            style={{ backgroundImage: `url(${GoldFrame})` }}
            onClick={() => handleDivine()}
          >
            <div
              className={`customChoiceFrame ${
                canDivine ? "" : "disabledChoice"
              } `}
            >
              <h3 className="choiceText customChoiceFrameHeader">Divine</h3>
              <div className="customChoiceDescription">
                <h4>Gain 1 FD.</h4>
                <h4>You may spend 1 “Transcendence” to draw 2 skills.</h4>
              </div>
            </div>
          </div>

          <div
            className={`customChoice customChoiceSmall ${
              selectedChoice === 5 ? "selectedChoice" : ""
            } `}
            style={{ backgroundImage: `url(${GoldFrame})` }}
            onClick={() => handleExpedite()}
          >
            <div
              className={`customChoiceFrame ${
                canExpedite ? "" : "disabledChoice"
              } `}
            >
              <h3 className="choiceText customChoiceFrameHeader">Expedite </h3>
              <h4 className="customChoiceDescription">Draw 2 skills.</h4>
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

export default AcquisitionPhaseSelection;
