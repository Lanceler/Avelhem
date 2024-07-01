import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import SkillMultiSelect from "../hand/SkillMultiSelect";

const SelectAvelhemHandMulti = (props) => {
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
    case "Fervent Prayer":
      skipMessage = "Discard All";
      selectMessage = "Retain";
  }

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "Avelhem Hand Limit":
      case "Fervent Prayer":
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
          newAvelhemHand.push(avelhemHand[i]);
        }

        // console.log("newAvelhemHand");
        // console.log(newAvelhemHand);

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
      case "Fervent Prayer":
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

    // console.log("update");
    // console.log(newGameState[self].avelhemHand);
    // console.log(newGameState[self].avelhemVestige);

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

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{props.details.message}</h3>

        <div className="fourColumn  scrollable scrollable-y-only">
          {avelhemHand.map((usableSkill, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedAvelhems.includes(i) ? "selectedSkill" : ""
              }`}
              onClick={() => {
                handleClick(true, i);
                // handleUpdateDemoGuide();
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
          ))}
        </div>

        {canSkip && selectedAvelhems.length === 0 && (
          <button className="choiceButton" onClick={() => handleSkip()}>
            {skipMessage}
          </button>
        )}

        {selectedAvelhems.length > 0 && (
          <button className="choiceButton" onClick={() => handleSelect()}>
            {selectMessage}
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectAvelhemHandMulti;
