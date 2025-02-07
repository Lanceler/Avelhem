import React from "react";
import { useState } from "react";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const InspectSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
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

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedSkill === i) {
        setSelectedSkill(null);
      } else {
        setSelectedSkill(i);
      }
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
          specMessage: `${
            self === "host" ? "Gold" : "Silver"
          } Sovereign has floated 1 Sovereign skill from their repertoire.`,
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
          specMessage: `${
            self === "host" ? "Gold" : "Silver"
          } Sovereign has floated 1 Lightning skill from their repertoire.`,
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

  const canClick = (element1, element2, element3) => {};

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

          <div className={`modalScrollableY ${demoGuide ? "demoBlocker" : ""}`}>
            {localGameState[self].skillFloat > 0 && (
              <>
                <div className="modalContentText">Floating cards</div>
                <div className="modalContent4Column">
                  {floatingRepertoire.map((usableSkill, i) => (
                    <div
                      key={i}
                      className={`modalOptionOutline modalCardOptionOutline ${
                        selectedSkill === i
                          ? "modalCardOptionOutlineSelected"
                          : ""
                      }`}
                      onClick={() => {
                        handleClick(canSelect(usableSkill.id), i);
                        // handleUpdateDemoGuide();
                      }}
                    >
                      <div
                        className={`modalCard 
                          ${
                            canClick("Skill Card", usableSkill, i)
                              ? "demoClick"
                              : ""
                          }
                          `}
                        style={{
                          boxShadow: selectedSkill === i ? "none" : "",
                        }}
                      >
                        <Skill
                          i={i}
                          usableSkill={usableSkill}
                          canActivateSkill={canSelect(usableSkill.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {localGameState[self].skillFloat > 0 &&
              inspectRerpertoire.length > 0 && (
                <div className="modalContentText">Non-floating cards</div>
              )}

            <div className="modalContent4Column">
              {inspectRerpertoire.map((usableSkill, i) => (
                <div
                  key={i + localGameState[self].skillFloat}
                  className={`modalOptionOutline modalCardOptionOutline ${
                    selectedSkill === i + localGameState[self].skillFloat
                      ? "modalCardOptionOutlineSelected"
                      : ""
                  }`}
                  onClick={() => {
                    handleClick(
                      canSelect(usableSkill.id),
                      i + localGameState[self].skillFloat
                    );
                    // handleUpdateDemoGuide();
                  }}
                >
                  <div
                    className={`modalCard ${
                      canClick(
                        "Skill Card",
                        usableSkill,
                        i + localGameState[self].skillFloat
                      )
                        ? "demoClick"
                        : ""
                    }
                          `}
                    style={{
                      boxShadow:
                        selectedSkill === i + localGameState[self].skillFloat
                          ? "none"
                          : "",
                    }}
                  >
                    <Skill
                      i={i + localGameState[self].skillFloat}
                      usableSkill={usableSkill}
                      canActivateSkill={canSelect(usableSkill.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modalFooter">
          {selectedSkill === null && (
            <button className="redButton2" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedSkill !== null && (
            <button className="redButton2" onClick={() => handleSelect()}>
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectSkill;
