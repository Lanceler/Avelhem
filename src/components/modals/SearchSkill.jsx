import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SearchSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { shuffleCards } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

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
    const i = selectedSkill;
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if ((props.outcome = "Add")) {
      // the selected Skill was floating
      if (i <= newGameState[self].skillFloat - 1) {
        //add selected skill from repertoire to hand
        newGameState[self].skillHand.push(
          floatingRepertoire.splice(i, 1)[0].id
        );
        //decrease floating count
        newGameState[self].skillFloat = newGameState[self].skillFloat - 1;
      } else {
        //add selected skill from repertoire to hand
        newGameState[self].skillHand.push(
          searchRerpertoire.splice(i - newGameState[self].skillFloat, 1)[0].id
        );
      }

      //shuffle repertoire, but retain floating order (after un-reversing)
      newGameState[self].skillRepertoire = shuffleCards(searchRerpertoire);
      for (let c in floatingRepertoire) {
        newGameState[self].skillRepertoire.push(floatingRepertoire[c].id);
      }

      //reset repertoire if empty
      if (newGameState[self].skillRepertoire.length === 0) {
        newGameState[self].skillVestige = shuffleCards(
          gameStnewGameStateate[self].skillVestige
        );
        newGameState[self].skillRepertoire = [
          ...newGameState[self].skillVestige.splice(
            0,
            newGameState[self].skillVestige.length
          ),
        ];

        //to do: maybe alert both players?
      }
    }

    console.log(newGameState[self].skillHand);
    console.log(newGameState[self].skillFloat);
    console.log(newGameState[self].skillRepertoire);
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
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.message}</h2>

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
                    selectedSkill === i ? "selectedSkill" : ""
                  }`}
                >
                  <Skill
                    i={i}
                    usableSkill={usableSkill}
                    canActivateSkill={canSearch(usableSkill.id)}
                    setSelectedSkill={setSelectedSkill}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <h3>Other skills</h3>
        <div
          className={`fourColumn scrollable scrollable-y-only ${
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
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          ))}
        </div>

        <button onClick={() => handleSkip()}>Skip</button>
        {selectedSkill !== null && (
          <button onClick={() => handleSelect()}>Select</button>
        )}
      </div>
    </div>
  );
};

export default SearchSkill;
