import React from "react";
import "./Modal.css";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const AcquisitionPhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { drawSkill, drawAvelhem, findNullUnitIndex } = useRecurringEffects();

  let canAppoint = true;

  let newIndex = localGameState[self].units.indexOf(null);
  if (newIndex === -1) {
    newIndex = localGameState[self].units.length;
  }

  if (newIndex >= 8 || props.getVacantFrontier().length === 0) {
    console.log("Cannot Appoint");
    canAppoint = false;
  } else {
    console.log("Can Appoint");
  }

  let canDivine = false;

  if (localGameState[self].bountyUpgrades.acquisition > 0) {
    console.log("Can Divine");
    canDivine = true;
  } else {
    console.log("Cannot Divine");
  }

  let canExpedite = false;

  if (localGameState[self].bountyUpgrades.acquisition > 2) {
    console.log("Can Expedite");
    canExpedite = true;
  } else {
    console.log("Cannot Expedite");
  }

  const nextPhase = (gameState) => {
    gameState.turnPhase = "Bounty";
    gameState.currentResolution.pop();
    gameState.currentResolution.push({
      resolution: "Bounty Phase Selection",
    });

    return gameState;
  };

  const onAppoint = () => {
    if (canAppoint) {
      props.enterDeployMode(props.getVacantFrontier());
    }
  };

  const onBequeth = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = drawAvelhem(newGameState);
    newGameState = drawAvelhem(newGameState);
    newGameState = nextPhase(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const onCultivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = drawSkill(newGameState);
    newGameState = nextPhase(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const onDivine = () => {
    //To-do
  };

  const onExpedite = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState = drawSkill(newGameState);
    newGameState = drawSkill(newGameState);
    newGameState = nextPhase(newGameState);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Acquisition Phase</h2>

        <div className="phaseSelection">
          <div
            className={`choiceWithDescription ${
              canAppoint ? "" : "disabledOption"
            }`}
            onClick={() => onAppoint()}
          >
            <h3>Appoint</h3>
            <h4>Deploy a pawn in your frontier.</h4>
          </div>
          <div className="choiceWithDescription" onClick={() => onBequeth()}>
            <h3>Bequeath</h3>
            <h4>Draw 2 Avelhems.</h4>
          </div>
          <div className="choiceWithDescription" onClick={() => onCultivate()}>
            <h3>Cultivate</h3>
            <h4>Draw 1 skill.</h4>
            <h5>
              Upgrade:
              <br />
              If your hand has 4 or less skills, you may draw 1 more.
            </h5>
          </div>
          <div
            className={`choiceWithDescription ${
              canDivine ? "" : "disabledOption"
            }`}
            onClick={() => onDivine()}
          >
            <h3>Divine</h3>
            <h4>Must be unlocked.</h4>
            <h5>
              Gain 1 FD.
              <br />
              You may recover 1 “Transcendence” or draw 1 Avelhem.
            </h5>
          </div>
          <div
            className={`choiceWithDescription ${
              canExpedite ? "" : "disabledOption"
            }`}
            onClick={() => onExpedite()}
          >
            <h3>Expedite</h3>
            <h4>Must be unlocked.</h4>
            <h5>Draw 2 skills.</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcquisitionPhaseSelection;
