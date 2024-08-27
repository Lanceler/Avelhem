import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SearchAvelhem = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { avelhemToScion, refillRepertoireAvelhem, shuffleCards } =
    useRecurringEffects();

  const [selectedAvelhem, setSelectedAvelhem] = useState(null);

  let repertoire = [...localGameState[self].avelhemRepertoire];

  useEffect(() => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (newGameState[self].avelhemRepertoire.length === 0) {
      newGameState = refillRepertoireAvelhem(newGameState);
      dispatch(updateState(newGameState));
      props.updateFirebase(newGameState);
    }
  }, []);

  //reverse display, since last card is top of deck
  let searchRerpertoire = [];
  for (let c in repertoire) {
    searchRerpertoire.unshift({ id: repertoire[c], repertoireIndex: c });
  }

  const floatingRepertoire = searchRerpertoire.splice(
    0,
    localGameState[self].avelhemFloat
  );

  const canSearch = (avelhem) => {
    if (!props.restriction) {
      return true;
    } else {
      return props.restriction.includes(avelhem);
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if (props.outcome === "Add") {
      //inform enemy if search done via transmute
      if (props.reveal === "Transmute") {
        let chosenAvelhem =
          newGameState[self].avelhemRepertoire[
            newGameState[self].avelhemRepertoire.length - 1 - selectedAvelhem
          ];

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Player",
          player: enemy,
          title: "Transmute",
          message: `Your opponent has searched for 1 ${avelhemToScion(
            parseInt(chosenAvelhem)
          ).replace("Scion", "Avelhem")} and added it to their hand.`,
          specMessage: `${
            self === "host" ? "Gold" : "Silver"
          } Sovereign has searched for 1 ${avelhemToScion(
            parseInt(chosenAvelhem)
          ).replace("Scion", "Avelhem")} and added it to their hand.`,
        });
      }

      //add selected avelhem from repertoire to hand
      newGameState[self].avelhemHand.push(
        newGameState[self].avelhemRepertoire.splice(
          newGameState[self].avelhemRepertoire.length - 1 - selectedAvelhem,
          1
        )[0]
      );

      // if the selected Avelhem was floating, decrease floating count
      if (selectedAvelhem <= newGameState[self].avelhemFloat - 1) {
        newGameState[self].avelhemFloat -= 1;
      }

      //reset repertoire if empty
      if (newGameState[self].avelhemRepertoire.length === 0) {
        newGameState = refillRepertoireAvelhem(newGameState);
      }
    } else if (props.outcome === "Float") {
      //take selected card then put it at the top of deck (end of array)
      newGameState[self].avelhemRepertoire.push(
        newGameState[self].avelhemRepertoire.splice(
          newGameState[self].avelhemRepertoire.length - 1 - selectedAvelhem,
          1
        )[0]
      );

      // if the selected Avelhem was NOT floating, increase floating count
      if (selectedAvelhem > newGameState[self].avelhemFloat - 1) {
        newGameState[self].avelhemFloat += 1;
      }
    }

    //shuffle repertoire, but retain floating order
    const floaters = newGameState[self].avelhemRepertoire.splice(
      newGameState[self].avelhemRepertoire.length -
        newGameState[self].avelhemFloat,
      newGameState[self].avelhemFloat
    );

    newGameState[self].avelhemRepertoire = shuffleCards(
      newGameState[self].avelhemRepertoire
    );

    newGameState[self].avelhemRepertoire = [
      ...newGameState[self].avelhemRepertoire,
      ...floaters,
    ];

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedAvelhem === i) {
        setSelectedAvelhem(null);
      } else {
        setSelectedAvelhem(i);
      }
    }
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    //shuffle repertoire, but retain floating order
    const floaters = newGameState[self].avelhemRepertoire.splice(
      newGameState[self].avelhemRepertoire.length -
        newGameState[self].avelhemFloat,
      newGameState[self].avelhemFloat
    );

    newGameState[self].avelhemRepertoire = shuffleCards(
      newGameState[self].avelhemRepertoire
    );

    newGameState[self].avelhemRepertoire = [
      ...newGameState[self].avelhemRepertoire,
      ...floaters,
    ];

    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">{props.message}</div>
          <div className="modalButton">
            <button className="redButton" onClick={() => handleViewBoard()}>
              View
            </button>
          </div>
        </div>

        <div className="modalContent">
          <div className="scrollable scrollable-y-only">
            {localGameState[self].avelhemFloat > 0 && (
              <>
                <h3>Floating Avelhems</h3>
                <div className="fourColumn">
                  {floatingRepertoire.map((usableAvelhem, i) => (
                    <div
                      key={i}
                      className={`scionSkills ${
                        selectedAvelhem === i ? "selectedSkill" : ""
                      }`}
                      onClick={() => {
                        handleClick(canSearch(usableAvelhem.id), i);
                        // handleUpdateDemoGuide();
                      }}
                    >
                      <Skill
                        i={i}
                        usableSkill={usableAvelhem}
                        canActivateSkill={canSearch(usableAvelhem.id)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            <h3>Non-floating Avelhems</h3>
            <div
              className={`fourColumn  ${
                localGameState[self].usableAvelhem > 0 ? "decreased-height" : ""
              } `}
            >
              {searchRerpertoire.map((usableAvelhem, i) => (
                <div
                  key={i + localGameState[self].avelhemFloat}
                  className={`scionSkills ${
                    selectedAvelhem === i + localGameState[self].avelhemFloat
                      ? "selectedSkill"
                      : ""
                  }`}
                  onClick={() => {
                    handleClick(
                      canSearch(usableAvelhem.id),
                      i + localGameState[self].avelhemFloat
                    );
                    // handleUpdateDemoGuide();
                  }}
                >
                  <Skill
                    i={i + localGameState[self].avelhemFloat}
                    usableSkill={usableAvelhem}
                    canActivateSkill={canSearch(usableAvelhem.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modalBottomButton">
          {selectedAvelhem === null && (
            <button className="redButton" onClick={() => handleSkip()}>
              Skip
            </button>
          )}

          {selectedAvelhem !== null && (
            <button className="redButton" onClick={() => handleSelect()}>
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAvelhem;
