import React from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const Upheaval1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  let unit = localGameState[props.unit.player].units[props.unit.unitIndex];

  const { canMove, getVacantAdjacentZones } = useRecurringEffects();

  let canTraverse = false;
  if (canMove(unit) && localGameState[props.unit.player].skillHand.length > 0) {
    canTraverse = true;
  }

  const handleTraverse = () => {
    if (canTraverse) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end "UpheavalR2"
      newGameState.currentResolution.pop();

      props.enterMoveMode(
        getVacantAdjacentZones(props.unit),
        props.unit,
        newGameState,
        null
      );

      //   dispatch(updateState(newGameState));
      //   props.updateFirebase(newGameState);
    }
  };

  const handleSearch = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end "UpheavalR2"
    newGameState.currentResolution.pop();

    newGameState.currentResolution.push({
      resolution: "Search Skill",
      player: self,
      restriction: ["04-01", "04-02", "04-03"],
      message: "Search for then float 1 non-burst Land skill.",
      outcome: "Float",
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Upheaval</h2>

        <div className="twoColumn">
          <div
            className={`choiceWithDescription ${
              canTraverse ? "" : "disabledOption"
            }`}
            onClick={() => handleTraverse()}
          >
            <h2>Traverse</h2>
            <h4>Spend 1 skill to traverse.</h4>
          </div>

          <div className="choiceWithDescription" onClick={() => handleSearch()}>
            <h2>Search</h2>
            <h4>Search for then float 1 non-burst Land skill.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upheaval1;
