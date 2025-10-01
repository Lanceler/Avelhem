import React from "react";
import { useState } from "react";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import Skill from "../hand/Skill";

const SearchCard = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { avelhemToScion, refillRepertoireSkill, shuffleCards } =
    useRecurringEffects();

  const [selectedCard, setSelectedCard] = useState(null);

  const { allBurstSkills } = useCardDatabase();

  let newGameState = JSON.parse(JSON.stringify(localGameState));

  let repertoire = [];
  let cardFloat = 0;

  if (props.details.avelhem) {
    repertoire = [...newGameState[self].avelhemRepertoire];
    cardFloat = newGameState[self].avelhemFloat;
  } else {
    repertoire = [...newGameState[self].skillRepertoire];
    cardFloat = newGameState[self].skillFloat;
  }

  //reverse display, since last card is top of deck
  let searchRerpertoire = [];
  for (let c in repertoire) {
    searchRerpertoire.unshift({ id: repertoire[c], repertoireIndex: c });
  }

  const floatingRepertoire = searchRerpertoire.splice(0, cardFloat);

  const canSearch = (card) => {
    if (props.details.exclusion.includes(card)) {
      return false;
    }

    if (props.details.restriction === null) {
      return true;
    }

    return props.details.restriction.includes(card);
  };

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedCard === i) {
        setSelectedCard(null);
      } else {
        setSelectedCard(i);
      }
    }
  };

  const handleSelect = () => {
    newGameState.currentResolution.pop();

    if (props.details.avelhem) {
      if (props.details.outcome === "Add") {
        if (props.details.messageTitle === "Transmute") {
          let message = props.details.message;
          let specMessage = props.details.specMessage;

          let chosenSkill =
            newGameState[self].avelhemRepertoire[
              newGameState[self].avelhemRepertoire.length - 1 - selectedCard
            ];

          message = `Your opponent has searched for 1 ${avelhemToScion(
            parseInt(chosenSkill)
          ).replace("Scion", "Avelhem")} and added it to their hand.`;

          specMessage = `${
            self === "host" ? "Gold" : "Silver"
          } Sovereign has searched for 1 ${avelhemToScion(
            parseInt(chosenSkill)
          ).replace("Scion", "Avelhem")} and added it to their hand.`;

          newGameState.currentResolution.push({
            resolution: "Misc.",
            resolution2: "Message To Player",
            player: enemy,
            title: props.details.messageTitle,
            message: message,
            specMessage: specMessage,
          });
        }

        //add selected avelhem from repertoire to hand
        newGameState[self].avelhemHand.unshift(
          newGameState[self].avelhemRepertoire.splice(
            newGameState[self].avelhemRepertoire.length - 1 - selectedCard,
            1
          )[0]
        );

        // if the selected Avelhem was floating, decrease floating count
        if (selectedCard <= cardFloat) {
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
            newGameState[self].avelhemRepertoire.length - 1 - selectedCard,
            1
          )[0]
        );

        // if the selected Avelhem was NOT floating, increase floating count
        if (selectedCard > cardFloat) {
          newGameState[self].avelhemFloat += 1;
        }
      }

      //shuffle repertoire, but retain floating order
      cardFloat = newGameState[self].avelhemFloat;
      const floaters = newGameState[self].avelhemRepertoire.splice(
        newGameState[self].avelhemRepertoire.length - cardFloat,
        cardFloat
      );

      newGameState[self].avelhemRepertoire = shuffleCards(
        newGameState[self].avelhemRepertoire
      );

      newGameState[self].avelhemRepertoire = [
        ...newGameState[self].avelhemRepertoire,
        ...floaters,
      ];
    } else {
      if (props.details.messageTitle) {
        let message = props.details.message;
        let specMessage = props.details.specMessage;

        if (props.details.messageTitle === "Transmute") {
          let chosenSkill =
            newGameState[self].skillRepertoire[
              newGameState[self].skillRepertoire.length - 1 - selectedCard
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
            newGameState[self].skillRepertoire.length - 1 - selectedCard
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
        newGameState[self].skillHand.unshift(
          newGameState[self].skillRepertoire.splice(
            newGameState[self].skillRepertoire.length - 1 - selectedCard,
            1
          )[0]
        );

        // if the selected Skill was floating, decrease floating count
        if (selectedCard <= cardFloat - 1) {
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
            newGameState[self].skillRepertoire.length - 1 - selectedCard,
            1
          )[0]
        );

        // if the selected Skill was NOT floating, increase floating count
        if (selectedCard > cardFloat - 1) {
          newGameState[self].skillFloat += 1;
        }
      } else if (props.details.outcome === "Foreshadow") {
        let chosenSkill =
          newGameState[self].skillRepertoire[
            newGameState[self].skillRepertoire.length - 1 - selectedCard
          ];

        if (allBurstSkills().includes(chosenSkill)) {
          newGameState.currentResolution[
            newGameState.currentResolution.length - 2
          ].discardedBurst = true;
        }

        //add selected skill from repertoire to vestige
        newGameState[self].skillVestige.push(
          newGameState[self].skillRepertoire.splice(
            newGameState[self].skillRepertoire.length - 1 - selectedCard,
            1
          )[0]
        );

        // if the selected Skill was floating, decrease floating count
        if (selectedCard <= cardFloat - 1) {
          newGameState[self].skillFloat -= 1;
        }

        //reset repertoire if empty
        if (newGameState[self].skillRepertoire.length === 0) {
          newGameState = refillRepertoireSkill(newGameState);
        }
      }

      //shuffle repertoire, but retain floating order
      cardFloat = newGameState[self].skillFloat;
      const floaters = newGameState[self].skillRepertoire.splice(
        newGameState[self].skillRepertoire.length - cardFloat,
        cardFloat
      );

      newGameState[self].skillRepertoire = shuffleCards(
        newGameState[self].skillRepertoire
      );

      newGameState[self].skillRepertoire = [
        ...newGameState[self].skillRepertoire,
        ...floaters,
      ];
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    newGameState.currentResolution.pop();

    //shuffle repertoire, but retain floating order
    if (props.details.avelhem) {
      cardFloat = newGameState[self].avelhemFloat;
      const floaters = newGameState[self].avelhemRepertoire.splice(
        newGameState[self].avelhemRepertoire.length - cardFloat,
        cardFloat
      );

      newGameState[self].avelhemRepertoire = shuffleCards(
        newGameState[self].avelhemRepertoire
      );

      newGameState[self].avelhemRepertoire = [
        ...newGameState[self].avelhemRepertoire,
        ...floaters,
      ];
    } else {
      cardFloat = newGameState[self].skillFloat;
      const floaters = newGameState[self].skillRepertoire.splice(
        newGameState[self].skillRepertoire.length - cardFloat,
        cardFloat
      );

      newGameState[self].skillRepertoire = shuffleCards(
        newGameState[self].skillRepertoire
      );

      newGameState[self].skillRepertoire = [
        ...newGameState[self].skillRepertoire,
        ...floaters,
      ];
    }

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
        dispatch(updateDemo("Learn1.103.1"));
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
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{props.details.searchTitle}</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2" style={{ pointerEvents: "all" }}>
          <div className="modalContentText">{props.details.searchMessage}</div>

          <div className={`modalScrollableY ${demoGuide ? "demoBlocker" : ""}`}>
            {cardFloat > 0 && (
              <>
                <div className="modalContentText">Floating cards</div>
                <div className="modalContent4Column">
                  {floatingRepertoire.map((usableSkill, i) => (
                    <div
                      key={i}
                      className={`modalOptionOutline modalCardOptionOutline ${
                        selectedCard === i
                          ? "modalCardOptionOutlineSelected"
                          : ""
                      }`}
                      onClick={() => {
                        handleClick(canSearch(usableSkill.id), i);
                        handleUpdateDemoGuide();
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
                          boxShadow: selectedCard === i ? "none" : "",
                        }}
                      >
                        <Skill
                          i={i}
                          usableSkill={usableSkill}
                          canActivateSkill={canSearch(usableSkill.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {cardFloat > 0 && (
              <div className="modalContentText">Non-floating cards</div>
            )}

            <div className="modalContent4Column">
              {searchRerpertoire.map((usableSkill, i) => (
                <div
                  key={i + cardFloat}
                  className={`modalOptionOutline modalCardOptionOutline ${
                    selectedCard === i + cardFloat
                      ? "modalCardOptionOutlineSelected"
                      : ""
                  }`}
                  onClick={() => {
                    handleClick(canSearch(usableSkill.id), i + cardFloat);
                    handleUpdateDemoGuide();
                  }}
                >
                  <div
                    className={`modalCard ${
                      canClick("Skill Card", usableSkill, i + cardFloat)
                        ? "demoClick"
                        : ""
                    }
                          `}
                    style={{
                      boxShadow: selectedCard === i + cardFloat ? "none" : "",
                    }}
                  >
                    <Skill
                      i={i + cardFloat}
                      usableSkill={usableSkill}
                      canActivateSkill={canSearch(usableSkill.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modalFooter">
          {selectedCard === null && (
            <button className="redButton2" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedCard !== null && (
            <button
              className={`redButton2 ${
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

export default SearchCard;
