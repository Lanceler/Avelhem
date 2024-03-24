import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const ScionSkillSelect = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { activateSkill, canActivateResonance, canActivateSkill, getScionSet } =
    useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [canResonate, setCanResonate] = useState(null);

  useEffect(() => {
    if (usableSkills[selectedSkill]) {
      if (canActivateResonance(props.unit, usableSkills[selectedSkill].id)) {
        setCanResonate(true);
      } else {
        setCanResonate(false);
      }
    } else {
      setCanResonate(false);
    }
  }, [selectedSkill]);

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    if (
      getScionSet(props.unit.unitClass).includes(
        localGameState[self].skillHand[i]
      )
    ) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const handleResonate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.push({
      resolution: "Choose Resonator",
      skill: usableSkills[selectedSkill],
      unit: props.unit,
    });

    dispatch(updateState(newGameState));
  };

  const handleReturn = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //remove activated card from hand but do not send to vestige
    newGameState[self].skillHand.splice(
      usableSkills[selectedSkill].handIndex,
      1
    );

    newGameState = activateSkill(
      newGameState,
      props.unit,
      usableSkills[selectedSkill].id
    );

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  return (
    <div className="modal-backdrop">
      {/* <div className="modal modalNoYes"> */}
      <div className={`modal ${usableSkills.length === 0 ? "modalNoYes" : ""}`}>
        <h2 className="choiceTitle">Select Skill</h2>

        <div className="fourColumn scrollable scrollable-y-only">
          {usableSkills.map((usableSkill, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedSkill === i ? "selectedSkill" : ""
              }`}
            >
              <Skill
                i={i}
                usableSkill={usableSkill}
                canActivateSkill={
                  canActivateSkill(props.unit, usableSkill.id) ||
                  canActivateResonance(props.unit, usableSkill.id)
                }
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          ))}
        </div>

        {selectedSkill === null && (
          <button
            className="choiceButton noYes "
            onClick={() => handleReturn()}
          >
            Return
          </button>
        )}

        {/* {selectedSkill !== null && (
          <button onClick={() => handleSelect()}>Select</button>
        )} */}

        {selectedSkill !== null &&
          canActivateSkill(props.unit, usableSkills[selectedSkill].id) && (
            <button
              className="choiceButton noYes"
              onClick={() => handleSelect()}
            >
              Select
            </button>
          )}

        {canResonate && (
          <button
            className="choiceButton noYes"
            onClick={() => handleResonate()}
          >
            Resonate
          </button>
        )}
      </div>
    </div>
  );
};

export default ScionSkillSelect;
