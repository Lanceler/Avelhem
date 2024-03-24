import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const RecoverSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { shuffleCards } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let vestige = [...localGameState[self].skillVestige];

  //reverse display (for consistency with repertoire)
  let recoverVestige = [];
  for (let c in vestige) {
    recoverVestige.unshift({ id: vestige[c], vestigeIndex: c });
  }

  const canRecover = (skill) => {
    if (props.restriction === null) {
      return true;
    } else {
      return props.restriction.includes(skill);
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if (
      [
        "Recover then float 1 Plant skill other than “Efflorescence”.",
        "Recover 1 Lightning skill other than “Thunder Thaumaturge”.",
      ].includes(props.message)
    ) {
      newGameState.currentResolution.push({
        resolution: "Revealing Skill",
        player: enemy,
        skill:
          newGameState[self].skillVestige[
            newGameState[self].skillVestige.length - 1 - selectedSkill
          ],
      });
    }

    // if (
    //   props.message ===
    //   "Recover 1 Lightning skill other than “Thunder Thaumaturge”."
    // ) {
    //   newGameState.currentResolution.push({
    //     resolution: "Revealing Skill",
    //     player: enemy,
    //     skill:
    //       newGameState[self].skillVestige[
    //         newGameState[self].skillVestige.length - 1 - selectedSkill
    //       ],
    //   });
    // }

    // console.log(
    //   newGameState[self].skillVestige[
    //     newGameState[self].skillVestige.length - 1 - selectedSkill
    //   ]
    // );

    if (props.outcome === "Add") {
      //add selected skill from vestige to hand
      newGameState[self].skillHand.push(
        newGameState[self].skillVestige.splice(
          newGameState[self].skillVestige.length - 1 - selectedSkill,
          1
        )[0]
      );
    } else if (props.outcome === "Float") {
      //take selected card then put it at the top of deck (end of array)
      newGameState[self].skillRepertoire.push(
        newGameState[self].skillVestige.splice(
          newGameState[self].skillVestige.length - 1 - selectedSkill,
          1
        )[0]
      );

      // increase floating count
      newGameState[self].skillFloat = newGameState[self].skillFloat + 1;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
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
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.message}</h2> */}

        <div className="twoColumn3-1">
          <h2 className="choiceTitle">{props.message}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {recoverVestige.map((usableSkill, i) => (
              <div
                key={i}
                className={`scionSkills ${
                  selectedSkill === i ? "selectedSkill" : ""
                }`}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={canRecover(usableSkill.id)}
                  selectedSkill={selectedSkill}
                  setSelectedSkill={setSelectedSkill}
                />
              </div>
            ))}
          </div>
        </div>

        {/* {selectedSkill === null && (
          <button onClick={() => handleSkip()}>Skip</button>
        )} */}

        {selectedSkill !== null && (
          <button className="choiceButton" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default RecoverSkill;
