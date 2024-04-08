import React from "react";
import { useState, useEffect } from "react";
import "../modals/Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import SkillMultiSelect from "../hand/SkillMultiSelect";

const FerventPrayerResonance = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const {} = useRecurringEffects();

  //selectedAvelhems refers to their index in the hand
  const [selectedAvelhems, setSelectedAvelhems] = useState([]);

  const [selectedAvelhemIds, setSelectedAvelhemIds] = useState([]);

  const avelhemVestige = localGameState[self].avelhemVestige;
  const selectLimit = 3;

  let skipMessage = "Skip";
  let selectMessage = "Recover";

  useEffect(() => {
    const selectedIds = [];
    for (let i of selectedAvelhems) {
      selectedIds.push(avelhemVestige[i]);
    }

    setSelectedAvelhemIds(selectedIds);
  }, [selectedAvelhems.length]);

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    //1. get avelhem IDs in selected order, then reverse
    let avelhemsToFloat = [];
    for (let i of selectedAvelhems) {
      avelhemsToFloat.push(avelhemVestige[i]);
    }

    avelhemsToFloat.reverse();

    // console.log("avelhemsToFloat");
    // console.log(avelhemsToFloat);

    //2. sort selected avelhems in descending order so they can be spliced smoothly
    let sortedSelectedAvelhems = [...selectedAvelhems].sort((a, b) => b - a);

    //3. remove selected avelhems from vestige
    for (let i of sortedSelectedAvelhems) {
      newGameState[self].avelhemVestige.splice(i, 1);
    }

    //4. float selected avelhems and increase floating count
    newGameState[self].avelhemRepertoire = [
      ...newGameState[self].avelhemRepertoire,
      ...avelhemsToFloat,
    ];

    newGameState[self].avelhemFloat += avelhemsToFloat.length;

    // console.log("newGameState[self].avelhemRepertoire");
    // console.log(newGameState[self].avelhemRepertoire);
    // console.log("newGameState[self].avelhemVestige");
    // console.log(newGameState[self].avelhemVestige);
    // console.log("newGameState[self].avelhemFloat");
    // console.log(newGameState[self].avelhemFloat);

    newGameState.currentResolution.push({
      resolution: "Sovereign Resonant Skill",
      resolution2: "Fervent Prayer Reveal",
      player: enemy,
      avelhems: [...avelhemsToFloat].reverse(),
      message: "Your opponent has floated the following:",
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">Fervent Prayer</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>
          Recover up to 3 different Avelhems, then reveal and float them. Cards
          selected earlier will float above subsequent ones.
        </h3>

        <div className="fourColumn scrollable scrollable-y-only">
          {avelhemVestige.map((usableSkill, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedAvelhems.includes(i) ? "selectedSkill" : ""
              }`}
            >
              <SkillMultiSelect
                i={i}
                usableSkill={usableSkill}
                canAdd={
                  selectedAvelhems.includes(i) ||
                  !selectedAvelhemIds.includes(avelhemVestige[i])
                }
                selectedSkills={selectedAvelhems}
                setSelectedSkills={setSelectedAvelhems}
                addLimit={selectLimit}
              />
            </div>
          ))}
        </div>

        {selectedAvelhems.length === 0 && (
          <button className="choiceButton noYes" onClick={() => handleSkip()}>
            {skipMessage}
          </button>
        )}

        {selectedAvelhems.length > 0 && (
          <button className="choiceButton noYes" onClick={() => handleSelect()}>
            {selectMessage}
          </button>
        )}
      </div>
    </div>
  );
};

export default FerventPrayerResonance;
