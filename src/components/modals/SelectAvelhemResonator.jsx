import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SelectAvelhemResonator = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const { activateAvelhem } = useRecurringEffects();

  let usableAvelhems = [];
  for (let i in localGameState[self].avelhemHand) {
    usableAvelhems.push({
      id: localGameState[self].avelhemHand[i],
      handIndex: i,
    });
  }

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const validResonators = ["SA-02"];

  usableSkills = usableSkills.filter((skill) =>
    validResonators.includes(skill.id)
  );

  //   console.log(props.avelhem.handIndex);
  //   console.log(usableAvelhems);

  usableAvelhems = usableAvelhems.filter(
    (a) =>
      a.handIndex * 1 !== props.avelhem.handIndex && // *1 is to convert it to int
      a.id === props.avelhem.avelhem
  );

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.pop();

    if (selectedSkill < usableAvelhems.length) {
      // console.log("It's an Avelhem");

      newGameState = activateAvelhem(
        newGameState,
        props.avelhem.avelhem,
        usableAvelhems[selectedSkill].id
      );

      const avelhemHandIndexes = [
        props.avelhem.handIndex,
        usableAvelhems[selectedSkill].handIndex,
      ];
      //get index in descending order
      avelhemHandIndexes.sort((a, b) => b - a);
      //remove resonating cards from hand but do not send to vestige
      newGameState[self].avelhemHand.splice(avelhemHandIndexes[0], 1);
      newGameState[self].avelhemHand.splice(avelhemHandIndexes[1], 1);
    } else {
      // console.log("It's a Skill");

      newGameState = activateAvelhem(
        newGameState,
        props.avelhem.avelhem,
        usableSkills[selectedSkill - usableAvelhems.length].id
      );

      //discard selected Avelhem
      newGameState[self].avelhemHand.splice(props.avelhem.handIndex, 1);

      //discard Skill used to resonate
      newGameState[self].skillHand.splice(
        usableSkills[selectedSkill - usableAvelhems.length].handIndex,
        1
      );
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleCancel = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
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
      case "Learn1.209":
        return element2.id === 2;

      case "Learn1.210":
        return element === "Select Button";

      ///////////////////
      case "Fire1.1":
        switch (element) {
          case "Resonator":
            return element2.id === 1;
        }
        break;

      case "Fire1.2":
        switch (element) {
          case "Select Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.209":
        dispatch(updateDemo("Learn1.210"));
        break;

      case "Learn1.210":
        dispatch(updateDemo("Learn1.211"));
        break;

      /////////////////
      case "Fire1.1":
        dispatch(updateDemo("Fire1.2"));
        break;

      case "Fire1.2":
        dispatch(updateDemo("Fire1.2.01"));

        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Select resonator.</h2>
        </div>

        <div className="fourColumn scrollable scrollable-y-only">
          {usableAvelhems.map((usableAvelhem, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedSkill === i ? "selectedSkill" : ""
              }        
              ${canClick("Resonator", usableAvelhem) ? "demoClick" : ""}
              `}
              onClick={() => {
                handleClick(true, i);
                handleUpdateDemoGuide();
              }}
            >
              <Skill
                i={i}
                usableSkill={usableAvelhem}
                canActivateSkill={true}
              />
            </div>
          ))}

          {usableSkills.map((usableSkill, i) => (
            <div
              key={i + usableAvelhems.length}
              className={`scionSkills ${
                selectedSkill === i + usableAvelhems.length
                  ? "selectedSkill"
                  : ""
              }`}
              onClick={() => {
                handleClick(true, i + usableAvelhems.length);
                handleUpdateDemoGuide();
              }}
            >
              <Skill
                i={i + usableAvelhems.length}
                usableSkill={usableSkill}
                canActivateSkill={true}
              />
            </div>
          ))}
        </div>

        {selectedSkill === null && (
          <button className="choiceButton" onClick={() => handleCancel()}>
            Cancel
          </button>
        )}

        {selectedSkill !== null && (
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
      </div>
    </div>
  );
};

export default SelectAvelhemResonator;
