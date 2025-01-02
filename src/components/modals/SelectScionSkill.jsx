import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import Skill from "../hand/Skill";

const SelectScionSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const { activateSkill, canActivateResonance, canActivateSkill } =
    useRecurringEffects();

  const { getScionSet } = useCardDatabase();

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
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.push({
      resolution: "Choose Resonator",
      player: props.unit.player,
      unit: props.unit,
      skill: usableSkills[selectedSkill],
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

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedSkill === i) {
        setSelectedSkill(null);
      } else {
        setSelectedSkill(i);
      }
    }
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 105:
            return element2.id === "01-01";

          case 106:
            return element1 === "Select Button";
        }

      //   /////////////////////////////////////////
    }

    // return element1 === "Resonate Button";

    //////////////////////
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 105:
          case 106:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Activate Scion Skill</div>
          <div className="modalButton"></div>
        </div>

        {usableSkills.length === 0 && <h3>No valid skills in hand.</h3>}

        <br />

        <div className="fourColumn scrollable scrollable-y-only">
          {usableSkills.map((usableSkill, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedSkill === i ? "selectedSkill" : ""
              } ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}`}
              onClick={() => {
                handleClick(
                  canActivateSkill(props.unit, usableSkill.id) ||
                    canActivateResonance(props.unit, usableSkill.id),
                  i
                );
                handleUpdateDemoGuide();
              }}
            >
              <Skill
                i={i}
                usableSkill={usableSkill}
                canActivateSkill={
                  canActivateSkill(props.unit, usableSkill.id) ||
                  canActivateResonance(props.unit, usableSkill.id)
                }
              />
            </div>
          ))}
        </div>

        <div className="modalBottomButton">
          {selectedSkill === null && (
            <button className="redButton noYes " onClick={() => handleReturn()}>
              Return
            </button>
          )}

          <div className="multi-option-buttons">
            {selectedSkill !== null &&
              canActivateSkill(props.unit, usableSkills[selectedSkill].id) && (
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

            {canResonate && (
              <button
                className={`redButton ${
                  canClick("Resonate Button") ? "demoClick" : ""
                }`}
                onClick={() => handleResonate()}
              >
                Resonate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectScionSkill;
