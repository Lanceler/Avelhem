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
      title: "Fervent Prayer",
      message: "Your opponent has floated the following:",
    });

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

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Fervent Prayer</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <h3>
          Recover up to 3 different Avelhems, then reveal and float them. Cards
          selected earlier will float above subsequent ones.
        </h3>

        <br />

        <div className="modalContent">
          {" "}
          <div className="fourColumn scrollable scrollable-y-only">
            {avelhemVestige.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedAvelhems.includes(i) ? "selectedSkill" : ""
                }`}
                onClick={() => {
                  handleClick(
                    selectedAvelhems.includes(i) ||
                      !selectedAvelhemIds.includes(avelhemVestige[i]),
                    i
                  );
                  // handleUpdateDemoGuide();
                }}
              >
                <SkillMultiSelect
                  i={i}
                  usableSkill={usableSkill}
                  canAdd={
                    selectedAvelhems.includes(i) ||
                    !selectedAvelhemIds.includes(avelhemVestige[i])
                  }
                  selectedSkills={selectedAvelhems}
                  addLimit={selectLimit}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="modalBottomButton">
          {selectedAvelhems.length === 0 && (
            <button className="redButton" onClick={() => handleSkip()}>
              {skipMessage}
            </button>
          )}

          {selectedAvelhems.length > 0 && (
            <button className="redButton" onClick={() => handleSelect()}>
              {selectMessage}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FerventPrayerResonance;
