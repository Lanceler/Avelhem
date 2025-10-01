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

  const { refillRepertoireSkill, refillRepertoireAvelhem } =
    useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  let inspectCount = Math.min(
    props.details.inspectionCount,
    localGameState[self].skillRepertoire.length
  );

  let repertoire = [...localGameState[self].skillRepertoire].splice(
    localGameState[self].skillRepertoire.length - inspectCount,
    inspectCount
  );

  if (props.details.avelhem) {
    inspectCount = Math.min(
      props.details.inspectionCount,
      localGameState[self].avelhemRepertoire.length
    );

    repertoire = [...localGameState[self].avelhemRepertoire].splice(
      localGameState[self].avelhemRepertoire.length - inspectCount,
      inspectCount
    );
  }

  //reverse display, since last card is top of deck
  let inspectRerpertoire = [];
  for (let c in repertoire) {
    inspectRerpertoire.unshift({
      id: repertoire[c],
      repertoireIndex: inspectCount - 1 - c,
    });
  }

  let floatingRepertoire = [];

  if (props.details.avelhem) {
    floatingRepertoire = inspectRerpertoire.splice(
      0,
      localGameState[self].avelhemFloat
    );
  } else {
    floatingRepertoire = inspectRerpertoire.splice(
      0,
      localGameState[self].skillFloat
    );
  }

  const canSelect = (card) => {
    if (props.details.restriction === null) {
      return true;
    } else {
      return props.details.restriction.includes(card);
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

    if (props.details.avelhem) {
      switch (props.details.select) {
        case "Single":
          if (props.details.outcome === "Add") {
            //add selected Avelhem from repertoire to hand
            newGameState[self].avelhemHand.unshift(
              newGameState[self].avelhemRepertoire.splice(
                newGameState[self].avelhemRepertoire.length - 1 - selectedSkill,
                1
              )[0]
            );

            // if the selected Avelhem was floating, decrease floating count
            if (selectedSkill <= newGameState[self].avelhemFloat - 1) {
              newGameState[self].avelhemFloat -= 1;
            }

            //reset repertoire if empty
            if (newGameState[self].avelhemRepertoire.length === 0) {
              newGameState = refillRepertoireAvelhem(newGameState);
            }
          } else if (props.details.outcome === "Float") {
            //take selected card then put it at the top of deck (end of array)
            newGameState[self].avelhemRepertoire.push(
              newGameState[self].avelhemRepertoire.splice(
                newGameState[self].avelhemRepertoire.length - 1 - selectedSkill,
                1
              )[0]
            );

            // if the selected Avelhem was NOT floating, increase floating count
            if (selectedSkill > newGameState[self].avelhemFloat - 1) {
              newGameState[self].avelhemFloat =
                newGameState[self].avelhemFloat + 1;
            }
          }
          break;

        case "Multi":
          if (props.details.outcome === "Add") {
            let selection = [...floatingRepertoire, ...inspectRerpertoire];
            let SelectedRepertoireIndexes = [];
            for (let i of selectedSkills) {
              SelectedRepertoireIndexes.push(selection[i].repertoireIndex);

              // add selected cards to hand in order they were selected
              newGameState[self].avelhemHand.unshift(selection[i].id);
            }

            SelectedRepertoireIndexes.sort((a, b) => b - a);

            for (let i of SelectedRepertoireIndexes) {
              // if the selected Avelhem was floating, decrease floating count
              if (i <= newGameState[self].avelhemFloat - 1) {
                newGameState[self].avelhemFloat -= 1;
              }

              //remove card from repertoire
              newGameState[self].avelhemRepertoire.splice(
                newGameState[self].avelhemRepertoire.length - 1 - i,
                1
              );
            }

            //reset repertoire if empty
            if (newGameState[self].avelhemRepertoire.length === 0) {
              newGameState = refillRepertoireAvelhem(newGameState);
            }
          }

          break;
      }
    } else {
      // Skills
      switch (props.details.select) {
        case "Single":
          if (props.details.outcome === "Add") {
            //add selected skill from repertoire to hand
            newGameState[self].skillHand.unshift(
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
            let selection = [...floatingRepertoire, ...inspectRerpertoire];
            let SelectedRepertoireIndexes = [];
            for (let i of selectedSkills) {
              SelectedRepertoireIndexes.push(selection[i].repertoireIndex);

              // add selected cards to hand in order they were selected
              newGameState[self].skillHand.unshift(selection[i].id);
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
          } else if (props.details.outcome === "Reconnaissance") {
            let selection = [...floatingRepertoire, ...inspectRerpertoire];
            let SelectedRepertoireIndexes = [];

            selectedSkills.reverse();
            for (let i of selectedSkills) {
              SelectedRepertoireIndexes.push(selection[i].repertoireIndex);

              // place selected skills at bottom of repertoire (start of array)
              newGameState[self].skillRepertoire.unshift(selection[i].id);
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
          }

          const { reason, title } = props.details;
          const skillCount = selectedSkills.length;
          const sovereign = self === "host" ? "Gold" : "Silver";

          let message = "";
          let specMessage = "";

          if (reason === "Glacial Torrent") {
            message = `Your opponent added ${skillCount} Water skill${
              skillCount > 1 ? "s" : ""
            } to their hand.`;
            specMessage = `${sovereign} Sovereign added ${skillCount} Water skill${
              skillCount > 1 ? "s" : ""
            } to their hand.`;
          } else if (reason === "Reconnaissance") {
            message = `Your opponent placed ${skillCount} skill${
              skillCount > 1 ? "s" : ""
            } at the bottom of their repertoire.`;
            specMessage = `${sovereign} Sovereign placed ${skillCount} skill${
              skillCount > 1 ? "s" : ""
            } at the bottom of their repertoire.`;
          }

          newGameState.currentResolution.push({
            resolution: "Misc.",
            resolution2: "Message To Player",
            player: enemy,
            title,
            message,
            specMessage,
          });

          break;
      }
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
              {floatingRepertoire.length > 0 && (
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

              {floatingRepertoire.length > 0 &&
                inspectRerpertoire.length > 0 && (
                  <div className="modalContentText">Non-floating cards</div>
                )}

              <div className="modalContent4Column">
                {inspectRerpertoire.map((usableSkill, i) => (
                  <div
                    key={i + floatingRepertoire.length}
                    className={`modalOptionOutline modalCardOptionOutline ${
                      selectedSkills.includes(i + floatingRepertoire.length)
                        ? "modalCardOptionOutlineSelected"
                        : ""
                    }`}
                    onClick={() => {
                      handleClick(
                        canSelect(usableSkill.id),
                        i + floatingRepertoire.length
                      );
                      // handleUpdateDemoGuide();
                    }}
                  >
                    <div
                      className={`modalCard ${
                        canClick(
                          "Skill Card",
                          usableSkill,
                          i + floatingRepertoire.length
                        )
                          ? "demoClick"
                          : ""
                      }
                          `}
                      style={{
                        boxShadow: selectedSkills.includes(
                          i + floatingRepertoire.length
                        )
                          ? "none"
                          : "",
                      }}
                    >
                      <SkillMultiSelect
                        i={i + floatingRepertoire.length}
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
              {floatingRepertoire.length > 0 && (
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

              {floatingRepertoire.length > 0 &&
                inspectRerpertoire.length > 0 && (
                  <div className="modalContentText">Non-floating cards</div>
                )}

              <div className="modalContent4Column">
                {inspectRerpertoire.map((usableSkill, i) => (
                  <div
                    key={i + floatingRepertoire.length}
                    className={`modalOptionOutline modalCardOptionOutline ${
                      selectedSkill === i + floatingRepertoire.length
                        ? "modalCardOptionOutlineSelected"
                        : ""
                    }`}
                    onClick={() => {
                      handleClick(
                        canSelect(usableSkill.id),
                        i + floatingRepertoire.length
                      );
                      // handleUpdateDemoGuide();
                    }}
                  >
                    <div
                      className={`modalCard ${
                        canClick(
                          "Skill Card",
                          usableSkill,
                          i + floatingRepertoire.length
                        )
                          ? "demoClick"
                          : ""
                      }
                          `}
                      style={{
                        boxShadow:
                          selectedSkill === i + floatingRepertoire.length
                            ? "none"
                            : "",
                      }}
                    >
                      <Skill
                        i={i + floatingRepertoire.length}
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
