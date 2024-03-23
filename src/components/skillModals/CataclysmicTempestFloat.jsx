import React from "react";
import { useState, useEffect } from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import SkillMultiSelect from "../hand/SkillMultiSelect";

const CataclysmicTempestFloat = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedSkills, setSelectedSkills] = useState([]);

  const selectAmount = Math.min(
    props.floatCount,
    localGameState[self].skillHand.length
  );

  let hand = [];
  for (let c in localGameState[self].skillHand) {
    hand.push({
      id: localGameState[self].skillHand[c],
      //   handIndex: c,
    });
  }

  const handleProceed = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    for (let i of selectedSkills) {
      newGameState[self].skillRepertoire.push(hand[i].id);
      newGameState[self].skillFloat += 1;
    }

    //to do: discard Transcendence

    const sortHandIndexes = [...selectedSkills].sort((a, b) => b - a);

    for (let i of sortHandIndexes) {
      newGameState[self].skillHand.splice(i, 1);
    }

    // console.log(newGameState[self].skillFloat);
    // console.log(newGameState[self].skillRepertoire);
    // console.log(newGameState[self].skillHand);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const message = () => {
    if (selectAmount === 1) {
      return <h3>You are forced to float 1 skill.</h3>;
    } else {
      return (
        <>
          <h3>You are forced to float 2 skills.</h3>
          <h3>The 2nd selected skill will be floated above the first.</h3>
        </>
      );
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">Cataclysmic Tempest</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        {message()}

        <div
          className={`fourColumn scrollable scrollable-y-only ${
            localGameState[self].skillFloat > 0 ? "decreased-height" : ""
          } `}
        >
          {hand.map((usableSkill, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedSkills.includes(i) ? "selectedSkill" : ""
              }`}
            >
              <SkillMultiSelect
                i={i}
                usableSkill={usableSkill}
                canAdd={true}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                addLimit={selectAmount}
              />
            </div>
          ))}
        </div>

        {selectedSkills.length === selectAmount && (
          <button
            className="choiceButton noYes"
            onClick={() => handleProceed()}
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default CataclysmicTempestFloat;
