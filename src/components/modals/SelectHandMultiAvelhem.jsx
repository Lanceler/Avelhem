import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import SkillMultiSelect from "../hand/SkillMultiSelect";

const SelectHandMultiAvelhem = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const {} = useRecurringEffects();

  //selectedAvelhems refers to their index in the hand
  const [selectedAvelhems, setSelectedAvelhems] = useState([]);

  const avelhemHand = [...localGameState[self].avelhemHand];
  const selectLimit = props.details.count;

  let canSkip = true;
  let skipMessage = "Skip";
  let selectMessage = "Select";

  switch (props.details.reason) {
    case "Avelhem Hand Limit":
      skipMessage = "Discard All";
      selectMessage = "Retain";
  }

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "Avelhem Hand Limit":
        // console.log(selectedAvelhems);
        //1. sort selected avelhems in descending order so they can be spliced smoothly
        let sortedSelectedAvelhems = [...selectedAvelhems].sort(
          (a, b) => b - a
        );

        // console.log("sortedSelectedAvelhems");
        // console.log(sortedSelectedAvelhems);

        //2. get list of cards to be discarded (entire hand except selected skills)

        let avelhemsToDiscard = [...avelhemHand];

        // console.log(avelhemsToDiscard);

        for (let i of sortedSelectedAvelhems) {
          avelhemsToDiscard.splice(i, 1);
        }

        // console.log("avelhemsToDiscard");
        // console.log(avelhemsToDiscard);

        //3. place selected avelhems in new hand
        const newAvelhemHand = [];

        for (let i of selectedAvelhems) {
          newAvelhemHand.unshift(avelhemHand[i]);
        }

        //4. update vestige and hand
        newGameState[self].avelhemHand = [...newAvelhemHand];
        newGameState[self].avelhemVestige = [
          ...newGameState[self].avelhemVestige,
          ...avelhemsToDiscard,
        ];

        // console.log("update");
        // console.log(newGameState[self].avelhemHand);
        // console.log(newGameState[self].avelhemVestige);

        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "Avelhem Hand Limit":
        //1. add entire hand to vestige

        newGameState[self].avelhemVestige = [
          ...newGameState[self].avelhemVestige,
          ...newGameState[self].avelhemHand,
        ];

        //2. empty hand
        newGameState[self].avelhemHand = [];

        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
  };

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedAvelhems.includes(i)) {
        selectedAvelhems.splice(selectedAvelhems.indexOf(i), 1);
        setSelectedAvelhems([...selectedAvelhems]);
      } else if (selectedAvelhems.length < selectLimit) {
        setSelectedAvelhems([...selectedAvelhems, i]);
      }
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {};

  const handleUpdateDemoGuide = () => {};

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{props.details.title}</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{props.details.message}</div>

          <div className="modalContent4Column modalScrollableY">
            {avelhemHand.map((usableSkill, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedAvelhems.includes(i)
                    ? "modalCardOptionOutlineSelected"
                    : ""
                }`}
                onClick={() => {
                  handleClick(true, i);
                  // handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalCard 
                   ${canClick("Avelhem Card", i) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedAvelhems.includes(i) ? "none" : "",
                  }}
                >
                  <SkillMultiSelect
                    i={i}
                    usableSkill={usableSkill}
                    canAdd={true}
                    selectedSkills={selectedAvelhems}
                    addLimit={selectLimit}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {canSkip && selectedAvelhems.length === 0 && (
            <button className="redButton2" onClick={() => handleSkip()}>
              {skipMessage}
            </button>
          )}

          {selectedAvelhems.length > 0 && (
            <button className="redButton2" onClick={() => handleSelect()}>
              {selectMessage}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectHandMultiAvelhem;
