import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const InspectSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { shuffleCards } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let repertoire = [...localGameState[self].skillRepertoire];

  //reverse display, since last card is top of deck
  let inspectRerpertoire = [];
  for (let c in repertoire) {
    inspectRerpertoire.unshift({ id: repertoire[c], repertoireIndex: c });
  }

  inspectRerpertoire = inspectRerpertoire.splice(
    0,
    props.details.inspectionCount
  );

  const floatingRepertoire = inspectRerpertoire.splice(
    0,
    localGameState[self].skillFloat
  );

  const canSelect = (skill) => {
    if (props.details.restriction === null) {
      return true;
    } else {
      return props.details.restriction.includes(skill);
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if (props.details.outcome === "Add") {
      //add selected skill from repertoire to hand
      newGameState[self].skillHand.push(
        newGameState[self].skillRepertoire.splice(
          newGameState[self].skillRepertoire.length - 1 - selectedSkill,
          1
        )[0]
      );

      // if the selected Skill was floating, decrease floating count
      if (selectedSkill <= newGameState[self].skillFloat - 1) {
        newGameState[self].skillFloat = newGameState[self].skillFloat - 1;
      }

      //reset repertoire if empty
      if (newGameState[self].skillRepertoire.length === 0) {
        //1.Shuffle Vestige
        newGameState[self].skillVestige = shuffleCards(
          newGameState[self].skillVestige
        );

        //2. Copy vestige to repertoire
        newGameState[self].skillRepertoire = [
          ...newGameState[self].skillVestige.splice(
            0,
            newGameState[self].skillVestige.length
          ),
        ];

        //3. Empty vestige
        newGameState[self].skillVestige = [];
      }
    } else if (props.details.outcome === "Float") {
      //take selected card then put it at the top of deck (end of array)
      newGameState[self].skillRepertoire.push(
        newGameState[self].skillRepertoire.splice(
          newGameState[self].skillRepertoire.length - 1 - selectedSkill,
          1
        )[0]
      );

      // if the selected Skill was NOT floating, increase floating count
      if (selectedSkill > newGameState[self].skillFloat - 1) {
        newGameState[self].skillFloat = newGameState[self].skillFloat + 1;
      }
    }

    //INSPECTION DOES NOT SHUFFLE

    switch (props.details.title) {
      case "Heir’s Endeavor":
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Player",
          player: enemy,
          title: "Heir’s Endeavor",
          message:
            "Your opponent has floated 1 Sovereign skill from their repertoire.",
        });
        break;

      case "Arc Flash":
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Player",
          player: enemy,
          title: "Arc Flash",
          message:
            "Your opponent has floated 1 Lightning skill from their repertoire.",
        });
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

    //INSPECTION DOES NOT SHUFFLE

    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn3-1">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>
        <h3>{props.details.message}</h3>

        <div className="scrollable scrollable-y-only">
          {localGameState[self].skillFloat > 0 && (
            <>
              <h3>Floating skills</h3>
              <div className="fourColumn">
                {floatingRepertoire.map((usableSkill, i) => (
                  <div
                    key={i}
                    className={`scionSkills ${
                      selectedSkill === i ? "selectedSkill" : ""
                    }`}
                  >
                    <Skill
                      i={i}
                      usableSkill={usableSkill}
                      canActivateSkill={canSelect(usableSkill.id)}
                      selectedSkill={selectedSkill}
                      setSelectedSkill={setSelectedSkill}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {inspectRerpertoire.length > 0 && (
            <>
              <h3>Non-floating skills</h3>
              <div
                className={`fourColumn  ${
                  localGameState[self].skillFloat > 0 ? "decreased-height" : ""
                } `}
              >
                {inspectRerpertoire.map((usableSkill, i) => (
                  <div
                    key={i + localGameState[self].skillFloat}
                    className={`scionSkills ${
                      selectedSkill === i + localGameState[self].skillFloat
                        ? "selectedSkill"
                        : ""
                    }`}
                  >
                    <Skill
                      i={i + localGameState[self].skillFloat}
                      usableSkill={usableSkill}
                      canActivateSkill={canSelect(usableSkill.id)}
                      selectedSkill={selectedSkill}
                      setSelectedSkill={setSelectedSkill}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {selectedSkill === null && (
          <button className="choiceButton" onClick={() => handleSkip()}>
            Skip
          </button>
        )}

        {selectedSkill !== null && (
          <button className="choiceButton" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default InspectSkill;
