import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import Skill from "../hand/Skill";

const SearchSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { avelhemToScion, refillRepertoireSkill, shuffleCards } =
    useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const { allBurstSkills } = useCardDatabase();

  let repertoire = [...localGameState[self].skillRepertoire];

  //reverse display, since last card is top of deck
  let searchRerpertoire = [];
  for (let c in repertoire) {
    searchRerpertoire.unshift({ id: repertoire[c], repertoireIndex: c });
  }

  const floatingRepertoire = searchRerpertoire.splice(
    0,
    localGameState[self].skillFloat
  );

  const canSearch = (skill) => {
    if (props.details.exclusion.includes(skill)) {
      return false;
    }

    if (props.details.restriction === null) {
      return true;
    }

    return props.details.restriction.includes(skill);
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

    if (props.details.messageTitle) {
      let message = props.details.message;
      let specMessage = props.details.specMessage;

      if (props.details.messageTitle === "Transmute") {
        let chosenSkill =
          newGameState[self].skillRepertoire[
            newGameState[self].skillRepertoire.length - 1 - selectedSkill
          ];
        const skillCode = chosenSkill.substring(0, 2);

        message = `Your opponent has searched for 1 ${avelhemToScion(
          parseInt(skillCode)
        ).replace("Scion", "Skill")} and added it to their hand.`;

        specMessage = `${
          self === "host" ? "Gold" : "Silver"
        } Sovereign has searched for 1 ${avelhemToScion(
          parseInt(skillCode)
        ).replace("Scion", "Skill")} and added it to their hand.`;
      }

      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Message To Player",
        player: enemy,
        title: props.details.messageTitle,
        message: message,
        specMessage: specMessage,
      });
    } else if (props.details.revealTitle) {
      const chosenSkill =
        newGameState[self].skillRepertoire[
          newGameState[self].skillRepertoire.length - 1 - selectedSkill
        ];

      newGameState.currentResolution.push({
        resolution: "Misc.",
        resolution2: "Revealing Skill",
        player: enemy,
        skill: chosenSkill,
        title: props.details.revealTitle,
        message: props.details.revealMessage,
        specMessage: props.details.specMessage,
      });
    }

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
    } else if (props.details.outcome === "Foreshadow") {
      let chosenSkill =
        newGameState[self].skillRepertoire[
          newGameState[self].skillRepertoire.length - 1 - selectedSkill
        ];

      if (allBurstSkills().includes(chosenSkill)) {
        newGameState.currentResolution[
          newGameState.currentResolution.length - 2
        ].discardedBurst = true;
      }

      //add selected skill from repertoire to vestige
      newGameState[self].skillVestige.push(
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
        newGameState = refillRepertoireSkill(newGameState);
      }
    }

    //shuffle repertoire, but retain floating order
    const floaters = newGameState[self].skillRepertoire.splice(
      newGameState[self].skillRepertoire.length - newGameState[self].skillFloat,
      newGameState[self].skillFloat
    );

    newGameState[self].skillRepertoire = shuffleCards(
      newGameState[self].skillRepertoire
    );

    newGameState[self].skillRepertoire = [
      ...newGameState[self].skillRepertoire,
      ...floaters,
    ];

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    //shuffle repertoire, but retain floating order
    const floaters = newGameState[self].skillRepertoire.splice(
      newGameState[self].skillRepertoire.length - newGameState[self].skillFloat,
      newGameState[self].skillFloat
    );

    newGameState[self].skillRepertoire = shuffleCards(
      newGameState[self].skillRepertoire
    );

    newGameState[self].skillRepertoire = [
      ...newGameState[self].skillRepertoire,
      ...floaters,
    ];

    newGameState.currentResolution.push({
      resolution: "Misc.",
      resolution2: "Message To Player",
      player: enemy,
      title: "Unsuccessful Search",
      message: `Your opponent has failed to search for a valid card.`,
      specMessage: `${
        self === "host" ? "Gold" : "Silver"
      } Sovereign has failed to search for a valid card.`,
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element1, element2, element3) => {
    switch (demoGuide) {
      case "Learn1.32":
      case "Learn1.124":
      case "Learn1.186":
        return element3 === 2;

      case "Learn1.102":
        return element3 === 7;

      case "Learn1.159":
        return element3 === 1;

      case "Learn1.198":
        return element3 === 5;

      case "Learn1.33":
      case "Learn1.103":
      case "Learn1.125":
      case "Learn1.160":
      case "Learn1.187":
      case "Learn1.199":
        return element1 === "Select Button";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.32":
        dispatch(updateDemo("Learn1.33"));
        break;

      case "Learn1.33":
        dispatch(updateDemo("Learn1.34"));
        break;

      case "Learn1.102":
        dispatch(updateDemo("Learn1.103"));
        break;

      case "Learn1.103":
        dispatch(updateDemo("Learn1.104"));
        break;

      case "Learn1.124":
        dispatch(updateDemo("Learn1.125"));
        break;

      case "Learn1.125":
        dispatch(updateDemo("Learn1.126"));
        break;

      case "Learn1.159":
        dispatch(updateDemo("Learn1.160"));
        break;

      case "Learn1.160":
        dispatch(updateDemo("Learn1.161"));
        break;

      case "Learn1.186":
        dispatch(updateDemo("Learn1.187"));
        break;

      case "Learn1.187":
        dispatch(updateDemo("Learn1.188"));
        break;
      case "Learn1.198":
        dispatch(updateDemo("Learn1.199"));
        break;

      case "Learn1.199":
        dispatch(updateDemo("Learn1.200"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">{props.details.searchTitle}</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <h3 style={{ maxWidth: 700 }}>{props.details.searchMessage}</h3>

        <br />

        <div className="modalContent">
          <div
            className="scrollable scrollable-y-only"
            style={{ pointerEvents: "all" }}
          >
            <div className={`${demoGuide ? "demoBlocker" : ""}`}>
              {localGameState[self].skillFloat > 0 && (
                <>
                  <h3>Floating skills</h3>
                  <div className="fourColumn">
                    {floatingRepertoire.map((usableSkill, i) => (
                      <div
                        key={i}
                        className={`scionSkills ${
                          selectedSkill === i ? "selectedSkill" : ""
                        } ${
                          canClick("Skill Card", usableSkill, i)
                            ? "demoClick"
                            : ""
                        }`}
                        onClick={() => {
                          handleClick(canSearch(usableSkill.id), i);
                          handleUpdateDemoGuide();
                        }}
                      >
                        <Skill
                          i={i}
                          usableSkill={usableSkill}
                          canActivateSkill={canSearch(usableSkill.id)}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {localGameState[self].skillFloat > 0 && (
                <h3>Non-floating skills</h3>
              )}
              <div
                className={`fourColumn  ${
                  localGameState[self].skillFloat > 0 ? "decreased-height" : ""
                } `}
              >
                {searchRerpertoire.map((usableSkill, i) => (
                  <div
                    key={i + localGameState[self].skillFloat}
                    className={`scionSkills ${
                      selectedSkill === i + localGameState[self].skillFloat
                        ? "selectedSkill"
                        : ""
                    } ${
                      canClick("Skill Card", usableSkill, i) ? "demoClick" : ""
                    }`}
                    onClick={() => {
                      handleClick(
                        canSearch(usableSkill.id),
                        i + localGameState[self].skillFloat
                      );
                      handleUpdateDemoGuide();
                    }}
                  >
                    <Skill
                      i={i + localGameState[self].skillFloat}
                      usableSkill={usableSkill}
                      canActivateSkill={canSearch(usableSkill.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="modalBottomButton">
          {selectedSkill === null && (
            <button className="redButton" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedSkill !== null && (
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

export default SearchSkill;
