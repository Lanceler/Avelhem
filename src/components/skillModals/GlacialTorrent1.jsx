import React from "react";
import { useState, useEffect } from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import SkillMultiSelect from "../hand/SkillMultiSelect";

const GlacialTorrent1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const { refillRepertoireSkill } = useRecurringEffects();

  const [selectedSkills, setSelectedSkills] = useState([]);

  const addLimit = 3;
  const inspectCount = Math.min(5, localGameState[self].skillRepertoire.length);

  let inspection = [...localGameState[self].skillRepertoire].splice(
    localGameState[self].skillRepertoire.length - inspectCount,
    5
  );

  //reverse display, since last card is top of deck
  let inspectRerpertoire = [];
  for (let c in inspection) {
    inspectRerpertoire.unshift({
      id: inspection[c],
      repertoireIndex:
        localGameState[self].skillRepertoire.length + (c - inspectCount),
    });
  }

  const floatingRepertoire = inspectRerpertoire.splice(
    0,
    localGameState[self].skillFloat
  );

  const canAdd = (skill) => {
    return ["02-01", "02-02", "02-03"].includes(skill);
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    let selection = [...floatingRepertoire, ...inspectRerpertoire];

    // console.log("selection");
    // console.log(selection); // <-- an array of {id, reportoireIndex}
    // console.log(selectedSkills);

    let SelectedRepertoireIndexes = [];

    for (let i of selectedSkills) {
      SelectedRepertoireIndexes.push(selection[i].repertoireIndex);

      // add selected cards to hand in order they were selected
      newGameState[self].skillHand.push(selection[i].id);
    }

    SelectedRepertoireIndexes.sort((a, b) => b - a);

    for (let i of SelectedRepertoireIndexes) {
      // if the selected Skill was floating, decrease floating count
      if (
        i >=
        newGameState[self].skillRepertoire.length -
          newGameState[self].skillFloat
      ) {
        newGameState[self].skillFloat = newGameState[self].skillFloat - 1;
      }

      //remove card from repertoire
      newGameState[self].skillRepertoire.splice(i, 1);
    }

    //reset repertoire if empty
    if (newGameState[self].skillRepertoire.length === 0) {
      newGameState = refillRepertoireSkill(newGameState);
    }

    //INSPECTION DOES NOT SHUFFLE

    // console.log(newGameState[self].skillHand);
    // console.log(newGameState[self].skillFloat);
    // console.log(newGameState[self].skillRepertoire);

    dispatch(updateState(newGameState));
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
          <h2 className="choiceTitle">Glacial Torrent</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>You may add up to 3 Water skills to your hand.</h3>

        <div className="scrollable scrollable-y-only">
          {localGameState[self].skillFloat > 0 && (
            <>
              <h3>Floating skills</h3>
              <div className="fourColumn">
                {floatingRepertoire.map((usableSkill, i) => (
                  <div
                    key={i}
                    className={`scionSkills ${
                      selectedSkills.includes(i) ? "selectedSkill" : ""
                    }`}
                  >
                    <SkillMultiSelect
                      i={i}
                      usableSkill={usableSkill}
                      canAdd={canAdd(usableSkill.id)}
                      selectedSkills={selectedSkills}
                      setSelectedSkills={setSelectedSkills}
                      addLimit={addLimit}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          <h3>Non-floating skills</h3>
          <div className="fourColumn">
            {inspectRerpertoire.map((usableSkill, i) => (
              <div
                key={i + localGameState[self].skillFloat}
                className={`scionSkills ${
                  selectedSkills.includes(i + localGameState[self].skillFloat)
                    ? "selectedSkill"
                    : ""
                }`}
              >
                <SkillMultiSelect
                  i={i + localGameState[self].skillFloat}
                  usableSkill={usableSkill}
                  canAdd={canAdd(usableSkill.id)}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  addLimit={addLimit}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedSkills.length === 0 && (
          <button className="choiceButton noYes" onClick={() => handleSkip()}>
            Skip
          </button>
        )}

        {selectedSkills.length > 0 && (
          <button className="choiceButton noYes" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default GlacialTorrent1;
