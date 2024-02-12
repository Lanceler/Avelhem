import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";

export default function BountyStore(props) {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

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

  return (
    <div className="modal-backdrop">
      <div className="modal ">
        <div className="twoColumn bountyHeader">
          <button onClick={() => handleViewBoard()}>View Board</button>
          <h2>Bounty Phase </h2>
          <h2>BP: {props.bountyPoints}</h2>
        </div>
        {/* space */}

        <div className="scrollable">
          <h3>Upgrade Frontier</h3>
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
          </div>
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
}
