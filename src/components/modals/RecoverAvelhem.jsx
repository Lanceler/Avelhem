import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const RecoverAvelhem = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { shuffleCards } = useRecurringEffects();

  const [selectedAvelhem, setSelectedAvelhem] = useState(null);

  let vestige = [...localGameState[self].avelhemVestige];

  //reverse display (for consistency with repertoire)
  let recoverVestige = [];
  for (let c in vestige) {
    recoverVestige.unshift({ id: vestige[c], vestigeIndex: c });
  }

  const canRecover = (avelhem) => {
    if (props.restriction === null) {
      return true;
    } else {
      return props.restriction.includes(avelhem);
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if (props.outcome === "Add") {
      //add selected Avelhem from vestige to hand
      newGameState[self].avelhemHand.push(
        newGameState[self].avelhemVestige.splice(
          newGameState[self].avelhemVestige.length - 1 - selectedAvelhem,
          1
        )[0]
      );
    } else if (props.outcome === "Float") {
      //take selected card then put it at the top of deck (end of array)
      newGameState[self].avelhemRepertoire.push(
        newGameState[self].avelhemVestige.splice(
          newGameState[self].avelhemVestige.length - 1 - selectedAvelhem,
          1
        )[0]
      );

      // increase floating count
      newGameState[self].avelhemFloat = newGameState[self].avelhemFloat + 1;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn3-1">
          <h2 className="choiceTitle">{props.message}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {recoverVestige.map((usableAvelhem, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedAvelhem === i ? "selectedSkill" : ""
                }`}
              >
                <Skill
                  i={i}
                  usableSkill={usableAvelhem}
                  canActivateSkill={canRecover(usableAvelhem.id)}
                  selectedSkill={selectedAvelhem}
                  setSelectedSkill={setSelectedAvelhem}
                />
              </div>
            ))}
          </div>
        </div>

        {/* {selectedAvelhem === null && (
          <button onClick={() => handleSkip()}>Skip</button>
        )} */}

        {selectedAvelhem !== null && (
          <button className="choiceButton" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default RecoverAvelhem;
