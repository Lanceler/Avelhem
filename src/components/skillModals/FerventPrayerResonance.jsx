import React from "react";
import { useState, useEffect } from "react";
import "../modals/Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import SkillMultiSelect from "../hand/SkillMultiSelect";

const FerventPrayerResonance = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
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

  //   const canAdd = (i) => {
  //     const selectedAvelhemIds = [];
  //     for (i of selectedAvelhems) {
  //       selectedAvelhemIds.push(avelhemVestige[i]);
  //     }

  //     return (
  //       selectedAvelhems.includes(i) ||
  //       !selectedAvelhemIds.includes(avelhemVestige[i])
  //     );
  //   };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    // newGameState.currentResolution.pop();

    // dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
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

        <h3>Recover up to 3 different Avelhems, then reveal and float them.</h3>

        <div className="fourColumn  scrollable scrollable-y-only">
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
