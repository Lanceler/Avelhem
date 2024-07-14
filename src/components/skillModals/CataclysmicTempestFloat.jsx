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
      if (hand[i].id === "SX-01") {
        newGameState[self].skillVestige.push(hand[i].id);
      } else {
        newGameState[self].skillRepertoire.push(hand[i].id);
        newGameState[self].skillFloat += 1;
      }
    }

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

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedSkills.includes(i)) {
        selectedSkills.splice(selectedSkills.indexOf(i), 1);
        setSelectedSkills([...selectedSkills]);
      } else if (selectedSkills.length < selectAmount) {
        setSelectedSkills([...selectedSkills, i]);
      }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Cataclysmic Tempest</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        {message()}

        <div className="modalContent">
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
                onClick={() => {
                  handleClick(true, i);
                  // handleUpdateDemoGuide();
                }}
              >
                <SkillMultiSelect
                  i={i}
                  usableSkill={usableSkill.id}
                  canAdd={true}
                  selectedSkills={selectedSkills}
                  addLimit={selectAmount}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="modalBottomButton">
          {selectedSkills.length === selectAmount && (
            <button className="redButton" onClick={() => handleProceed()}>
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CataclysmicTempestFloat;
