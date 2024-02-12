import React from "react";
import "./Modal.css";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const CoordinationPhaseSelection = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { assignTactics, rollTactic } = useRecurringEffects();

  let canBattleCry = false;
  let skillHandSize = localGameState[self].skillHand.length;

  if (skillHandSize >= 3) {
    console.log("Can Battle Cry");
    canBattleCry = true;
  } else {
    console.log("Cannot Battle Cry");
  }

  const nextPhase = (gameState) => {
    gameState.turnPhase = "Defiance";
    gameState.currentResolution.pop();
    gameState.currentResolution.push({
      resolution: "Defiance Phase Selection",
    });

    return gameState;
  };

  const onAssent = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    let extraMobilize = 0;
    if (newGameState[self].bountyUpgrades.tactics >= 3) {
      extraMobilize = 1;
    }

    newGameState = assignTactics(
      newGameState,
      rollTactic(extraMobilize),
      rollTactic(extraMobilize)
    );
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
        <h2>Coordination Phase</h2>

        <div className="phaseSelection">
          <div className="choiceWithDescription" onClick={() => onAssent()}>
            <h3>Assent</h3>
            <h4>Roll 2 tactical dice.</h4>
          </div>
          <div className="choiceWithDescription">
            <h3>Battle Cry</h3>
            <h4>Spend 3 skills to gain an assault tactic.</h4>
            <h5>
              Upgrade:
              <br />
              Roll 1 tactical die.
            </h5>
          </div>

          <div className="choiceWithDescription">
            <h3>Convene</h3>
            <h4>Must be unlocked.</h4>
            <h4>Gain a rally tactic.</h4>
            <h5>
              Upgrade:
              <br />
              Gain an advance tactic.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinationPhaseSelection;
