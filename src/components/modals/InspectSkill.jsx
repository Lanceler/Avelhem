import React from "react";
import { useState } from "react";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";
import SkillMultiSelect from "../hand/SkillMultiSelect";

const InspectSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const dispatch = useDispatch();

  const { refillRepertoireSkill } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const inspectCount = Math.min(
    props.details.inspectionCount,
    localGameState[self].skillRepertoire.length
  );

  let repertoire = [...localGameState[self].skillRepertoire].splice(
    localGameState[self].skillRepertoire.length - inspectCount,
    inspectCount
  );

  //reverse display, since last card is top of deck
  let inspectRerpertoire = [];
  for (let c in repertoire) {
    inspectRerpertoire.unshift({
      id: repertoire[c],
      repertoireIndex: inspectCount - 1 - c,
    });
  }

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
      switch (props.details.select) {
        case "Single":
          if (selectedSkill === i) {
            setSelectedSkill(null);
          } else {
            setSelectedSkill(i);
          }
          break;
        case "Multi":
          if (selectedSkills.includes(i)) {
            selectedSkills.splice(selectedSkills.indexOf(i), 1);
            setSelectedSkills([...selectedSkills]);
          } else if (selectedSkills.length < props.details.selectLimit) {
            setSelectedSkills([...selectedSkills, i]);
          }
          break;
      }
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    switch (props.details.select) {
      case "Single":
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
            newGameState[self].skillFloat -= 1;
          }

          //reset repertoire if empty
          if (newGameState[self].skillRepertoire.length === 0) {
            newGameState = refillRepertoireSkill(newGameState);
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
        break;

      case "Multi":
        if (props.details.outcome === "Add") {
          if (props.details.reason === "Glacial Torrent") {
            let unitInfo = props.unit;
            let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
            unit.boosts.glacialTorrent = selectedSkills.length >= 2 ? 2 : 1;
          }

          let selection = [...floatingRepertoire, ...inspectRerpertoire];
          let SelectedRepertoireIndexes = [];
          for (let i of selectedSkills) {
            SelectedRepertoireIndexes.push(selection[i].repertoireIndex);

            // add selected cards to hand in order they were selected
            newGameState[self].skillHand.push(selection[i].id);
          }

          SelectedRepertoireIndexes.sort((a, b) => b - a);

          for (let i of SelectedRepertoireIndexes) {
            // if the selected Skill was floating, decrease floating count
            if (i <= newGameState[self].skillFloat - 1) {
              newGameState[self].skillFloat -= 1;
            }

            //remove card from repertoire
            newGameState[self].skillRepertoire.splice(
              newGameState[self].skillRepertoire.length - 1 - i,
              1
            );
          }

          //reset repertoire if empty
          if (newGameState[self].skillRepertoire.length === 0) {
            newGameState = refillRepertoireSkill(newGameState);
          }
        }

        break;
    }

    //INSPECTION DOES NOT SHUFFLE

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    //INSPECTION DOES NOT SHUFFLE

    newGameState.currentResolution.push({
      resolution: "Misc.",
      resolution2: "Message To Player",
      player: enemy,
      title: props.details.title,
      message:
        "Your opponent inspected their repertoire without selecting a card.",
      specMessage: `${
        self === "host" ? "Gold" : "Silver"
      } Sovereign inspected their repertoire without selecting a card.`,
    });

    if (props.details.reason === "Glacial Torrent") {
      let unitInfo = props.unit;
      let unit = newGameState[unitInfo.player].units[unitInfo.unitIndex];
      unit.boosts.glacialTorrent = 1;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
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

          {props.details.select === "Multi" ? (
            <div
              className={`modalScrollableY ${demoGuide ? "demoBlocker" : ""}`}
            >
              {localGameState[self].skillFloat > 0 && (
                <>
                  <div className="modalContentText">Floating cards</div>
                  <div className="modalContent4Column">
                    {floatingRepertoire.map((usableSkill, i) => (
                      <div
                        key={i}
                        className={`modalOptionOutline modalCardOptionOutline ${
                          selectedSkills.includes(i)
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
                            boxShadow: selectedSkills.includes(i) ? "none" : "",
                          }}
                        >
                          <SkillMultiSelect
                            i={i}
                            usableSkill={usableSkill.id}
                            canAdd={canSelect(usableSkill.id)}
                            selectedSkills={selectedSkills}
                            addLimit={props.details.selectLimit}
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
                      selectedSkills.includes(
                        i + localGameState[self].skillFloat
                      )
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
                        boxShadow: selectedSkills.includes(
                          i + localGameState[self].skillFloat
                        )
                          ? "none"
                          : "",
                      }}
                    >
                      <SkillMultiSelect
                        i={i + localGameState[self].skillFloat}
                        usableSkill={usableSkill.id}
                        canAdd={canSelect(usableSkill.id)}
                        selectedSkills={selectedSkills}
                        addLimit={props.details.selectLimit}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // non-multi
            <div
              className={`modalScrollableY ${demoGuide ? "demoBlocker" : ""}`}
            >
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
          )}
        </div>

        <div className="modalFooter">
          {props.details.select === "Multi" ? (
            <>
              {selectedSkills.length === 0 && (
                <button className="redButton2" onClick={() => handleSkip()}>
                  Skip
                </button>
              )}

              {selectedSkills.length > 0 && (
                <button className="redButton2" onClick={() => handleSelect()}>
                  Select
                </button>
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectSkill;
