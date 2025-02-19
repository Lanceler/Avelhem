import React from "react";
import { useState, useEffect } from "react";
import "../modals/Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import SkillMultiSelect from "../hand/SkillMultiSelect";

const GlacialTorrent1 = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();
  const { refillRepertoireSkill } = useRecurringEffects();

  const [selectedSkills, setSelectedSkills] = useState([]);

  const addLimit = 3;
  const inspectCount = Math.min(5, localGameState[self].skillRepertoire.length);

  let inspection = [...localGameState[self].skillRepertoire].splice(
    localGameState[self].skillRepertoire.length - inspectCount,
    5
  );

  // console.log("inspection");
  // console.log(inspection);

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

  // console.log("inspectRerpertoire");
  // console.log(inspectRerpertoire);

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

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedSkills.includes(i)) {
        selectedSkills.splice(selectedSkills.indexOf(i), 1);
        setSelectedSkills([...selectedSkills]);
      } else if (selectedSkills.length < addLimit) {
        setSelectedSkills([...selectedSkills, i]);
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

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.225":
        return element2 === 1;

      case "Learn1.226":
        return element2 === 2;

      case "Learn1.227":
        return element === "Select Button";

      //////////////////////
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.225":
        dispatch(updateDemo("Learn1.226"));
        break;

      case "Learn1.226":
        dispatch(updateDemo("Learn1.227"));
        break;

      case "Learn1.227":
        dispatch(updateDemo("Learn1.228"));
        break;

      ////////////////////
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Glacial Torrent</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <h3>You may add up to 3 Water skills to your hand.</h3>

        <br />

        <div className="modalContent">
          <div className="scrollable scrollable-y-only">
            {localGameState[self].skillFloat > 0 && (
              <>
                <h3>Floating cards</h3>
                <div className="fourColumn">
                  {floatingRepertoire.map((usableSkill, i) => (
                    <div
                      key={i}
                      className={`scionSkills ${
                        selectedSkills.includes(i) ? "selectedSkill" : ""
                      }`}
                      onClick={() => {
                        handleClick(canAdd(usableSkill.id), i);
                        handleUpdateDemoGuide();
                      }}
                    >
                      <SkillMultiSelect
                        i={i}
                        usableSkill={usableSkill.id}
                        canAdd={canAdd(usableSkill.id)}
                        selectedSkills={selectedSkills}
                        addLimit={addLimit}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {localGameState[self].skillFloat > 0 && <h3>Non-floating cards</h3>}
            <div className="fourColumn">
              {inspectRerpertoire.map((usableSkill, i) => (
                <div
                  key={i + localGameState[self].skillFloat}
                  className={`scionSkills ${
                    selectedSkills.includes(i + localGameState[self].skillFloat)
                      ? "selectedSkill"
                      : ""
                  }
                ${canClick("Skill Card", i) ? "demoClick" : ""}

                `}
                  onClick={() => {
                    handleClick(
                      canAdd(usableSkill.id),
                      i + localGameState[self].skillFloat
                    );
                    handleUpdateDemoGuide();
                  }}
                >
                  <SkillMultiSelect
                    i={i + localGameState[self].skillFloat}
                    usableSkill={usableSkill.id}
                    canAdd={canAdd(usableSkill.id)}
                    selectedSkills={selectedSkills}
                    addLimit={addLimit}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modalBottomButton">
          {selectedSkills.length === 0 && (
            <button className="redButton" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedSkills.length > 0 && (
            <button
              className={`redButton ${
                canClick("Select Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleSelect();
                handleUpdateDemoGuide();
              }}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlacialTorrent1;
