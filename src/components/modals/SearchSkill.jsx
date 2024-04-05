import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import Skill from "../hand/Skill";

const SearchSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { refillRepertoireSkill, shuffleCards } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const { allBurstSkills } = useCardDatabase();

  let repertoire = [...localGameState[self].skillRepertoire];

  //reverse display, since last card is top of deck
  let searchRerpertoire = [];
  for (let c in repertoire) {
    console.log();
    searchRerpertoire.unshift({ id: repertoire[c], repertoireIndex: c });
  }

  const floatingRepertoire = searchRerpertoire.splice(
    0,
    localGameState[self].skillFloat
  );

  const canSearch = (skill) => {
    if (props.restriction === null) {
      return true;
    } else {
      return props.restriction.includes(skill);
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if (props.outcome === "Add") {
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
    } else if (props.outcome === "Float") {
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
    } else if (props.outcome === "Foreshadow") {
      let chosenSkill =
        newGameState[self].skillRepertoire[
          newGameState[self].skillRepertoire.length - 1 - selectedSkill
        ];

      if (allBurstSkills().includes(chosenSkill)) {
        newGameState.currentResolution[
          newGameState.currentResolution.length - 1
        ].discardedBurst = true;
      }

      newGameState.currentResolution.push({
        resolution: "Revealing Skill",
        player: enemy,
        skill: chosenSkill,
        message:
          "Your opponent has searched for, revealed, and discarded a skill.",
      });

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

    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn3-1">
          <h2 className="choiceTitle">{props.message}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <div className="scrollable scrollable-y-only">
          {localGameState[self].skillFloat > 0 && (
            <>
              <h3>Floating skills</h3>
              <div
                // className={`fourColumn ${
                //   localGameState[self].skillFloat > 0 ? "decreased-height" : ""
                // } `}
                className="fourColumn"
              >
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
                      canActivateSkill={canSearch(usableSkill.id)}
                      selectedSkill={selectedSkill}
                      setSelectedSkill={setSelectedSkill}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          <h3>Non-floating skills</h3>
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
                }`}
              >
                <Skill
                  i={i + localGameState[self].skillFloat}
                  usableSkill={usableSkill}
                  canActivateSkill={canSearch(usableSkill.id)}
                  selectedSkill={selectedSkill}
                  setSelectedSkill={setSelectedSkill}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedSkill === null && (
          <button className="choiceButton noYes" onClick={() => handleSkip()}>
            Skip
          </button>
        )}

        {selectedSkill !== null && (
          <button className="choiceButton noYes" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchSkill;
