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

        //to do: alert both players (and give opponent BP)
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
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          ))}
        </div>

        {selectedSkill === null && (
          <button onClick={() => handleSkip()}>Skip</button>
        )}

        {selectedSkill !== null && (
          <button onClick={() => handleSelect()}>Select</button>
        )}
      </div>
    </div>
  );
};

export default SearchSkill;
