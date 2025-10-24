import React from "react";
import { useState, useEffect } from "react";
import "../modals/Modal2.scss";

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

  // const [selectedAvelhemIds, setSelectedAvelhemIds] = useState([]);

  const avelhemVestige = localGameState[self].avelhemVestige;
  const selectLimit = 3;

  let skipMessage = "Skip";
  let selectMessage = "Recover";

  // useEffect(() => {
  //   const selectedIds = [];
  //   for (let i of selectedAvelhems) {
  //     selectedIds.push(avelhemVestige[i]);
  //   }

  //   setSelectedAvelhemIds(selectedIds);
  // }, [selectedAvelhems.length]);

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

    //Buff: Cards dont need to be unique, so no need to reveal
    // newGameState.currentResolution.push({
    //   resolution: "Sovereign Resonant Skill",
    //   resolution2: "Fervent Prayer Reveal",
    //   player: enemy,
    //   avelhems: [...avelhemsToFloat].reverse(),
    //   title: "Fervent Prayer",
    //   message: "Your opponent has recovered and floated the following:",
    // });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
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

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
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
          <div className="modalTitle2">Fervent Prayer</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>
        <div className="modalContent2">
          <div className="modalContentText" style={{ fontSize: 20 }}>
            Recover then float up to 3 Avelhems. Cards selected earlier will
            float above subsequent ones.
          </div>
          <div className="modalContent4Column modalScrollableY">
            {avelhemVestige.map((usableSkill, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedAvelhems.includes(i)
                    ? "modalCardOptionOutlineSelected"
                    : ""
                }`}
                onClick={() => {
                  handleClick(
                    // selectedAvelhems.includes(i) || !selectedAvelhemIds.includes(avelhemVestige[i])
                    true,
                    i
                  );
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
                    canAdd={
                      true
                      // selectedAvelhems.includes(i) ||
                      // !selectedAvelhemIds.includes(avelhemVestige[i])
                    }
                    selectedSkills={selectedAvelhems}
                    addLimit={selectLimit}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedAvelhems.length === 0 && (
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

export default FerventPrayerResonance;
