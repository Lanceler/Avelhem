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

  const [selectedSkills, setSelectedSkills] = useState([]);

  const addLimit = 3;

  let inspection = [...localGameState[self].skillRepertoire].splice(
    Math.max(0, localGameState[self].skillRepertoire.length - 5),
    5
  );

  //reverse display, since last card is top of deck
  let inspectRerpertoire = [];
  for (let c in inspection) {
    inspectRerpertoire.unshift({
      id: inspection[c],
      repertoireIndex: localGameState[self].skillRepertoire.length - 1 - c,
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
    let selection = [...floatingRepertoire, ...inspectRerpertoire];

    console.log(selection);

    for (let i in selectedSkills) {
      //
    }

    // dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
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
        <div className="twoColumn">
          <h2>Glacial Torrent</h2>
          <button onClick={() => handleViewBoard()}>View Board</button>
        </div>

        <h3>You may add up to 3 Water skills to your hand.</h3>

        {localGameState[self].skillFloat > 0 && (
          <>
            <h3>Floating skills</h3>
            <div
              className={`fourColumn scrollable scrollable-y-only ${
                localGameState[self].skillFloat > 0 ? "decreased-height" : ""
              } `}
            >
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
        <div
          className={`fourColumn scrollable scrollable-y-only ${
            localGameState[self].skillFloat > 0 ? "decreased-height" : ""
          } `}
        >
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

        <button onClick={() => handleSkip()}>Skip</button>
        {selectedSkills.length > 0 && (
          <button onClick={() => handleSelect()}>Select</button>
        )}
      </div>
    </div>
  );
};

export default GlacialTorrent1;
