import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import Skill from "../hand/Skill";

const ScionSkillSelect = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

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

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.68":
        return element2.id === "04-01";

      case "Learn1.69":
        return element === "Select Button";

      //////////////////////

      case "Fire1.16":
        switch (element) {
          case "Skill Card":
            return element2.id === "01-04";
        }
        break;

      case "Fire1.18":
        switch (element) {
          case "Skill Card":
            return element2.id === "01-01";
        }
        break;

      case "Fire1.17":
      case "Fire1.19":
      case "Fire1.32":
        switch (element) {
          case "Select Button":
            return true;
        }
        break;

      case "Fire1.26":
        switch (element) {
          case "Skill Card":
            return element2.id === "01-02";
        }
        break;

      case "Fire1.27":
        switch (element) {
          case "Resonate Button":
            return true;
        }
        break;

      case "Fire1.31":
        switch (element) {
          case "Skill Card":
            return element2.id === "07-04";
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.68":
        dispatch(updateDemo("Learn1.69"));
        break;

      case "Learn1.69":
        dispatch(updateDemo("Learn1.70"));
        break;

      ////////////////////

      case "Fire1.16":
        dispatch(updateDemo("Fire1.17"));
        break;

      case "Fire1.17":
        dispatch(updateDemo("Fire1.17.1"));
        break;

      case "Fire1.18":
        dispatch(updateDemo("Fire1.19"));
        break;

      case "Fire1.26":
        dispatch(updateDemo("Fire1.27"));
        break;

      case "Fire1.31":
        dispatch(updateDemo("Fire1.32"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className={`modal`}>
        <h2 className="choiceTitle">Activate Scion Skill</h2>

        {usableSkills.length === 0 && <h3>No valid skills in hand.</h3>}

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

        {selectedSkill === null && (
          <button
            className="choiceButton noYes "
            onClick={() => handleReturn()}
          >
            Return
          </button>
        )}

        {selectedSkill !== null &&
          canActivateSkill(props.unit, usableSkills[selectedSkill].id) && (
            <button
              className={`choiceButton ${
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
            className={`choiceButton ${
              canClick("Resonate Button") ? "demoClick" : ""
            }`}
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
