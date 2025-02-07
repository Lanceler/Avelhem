import React from "react";
import { useState } from "react";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SelectResonator = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const { activateAvelhem, activateSkill, activateSovereignSkillAndResonate } =
    useRecurringEffects();

  let usableAvelhems = [];
  let usableSkills = [];
  let validResonators = [];

  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i * 1,
    });
  }

  if (props.avelhem) {
    validResonators = ["SA-02"];

    for (let i in localGameState[self].avelhemHand) {
      usableAvelhems.push({
        id: localGameState[self].avelhemHand[i],
        handIndex: i * 1,
      });
    }

    usableAvelhems = usableAvelhems.filter(
      (a) =>
        a.handIndex !== props.avelhem.handIndex &&
        a.id === props.avelhem.avelhem
    );

    usableSkills = usableSkills.filter((skill) =>
      validResonators.includes(skill.id)
    );
  } else {
    validResonators = [props.skill.id, "SA-01", "SA-02", "SA-03"];

    usableSkills = usableSkills.filter(
      (skill) =>
        validResonators.includes(skill.id) &&
        skill.handIndex * 1 !== props.skill.handIndex * 1
    );
  }

  const canUseResonator = (resonator) => {
    switch (resonator) {
      case "SA-01":
        return props.unit === null; // only Sovereign Skills can resonate with Heir’s Endeavor
      case "SA-03":
        return props.unit !== null && props.unit.enhancements.ravager; // only Ravagers can resonate with Dark Halo
      default:
        return true;
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    if (props.avelhem) {
      newGameState.currentResolution.pop();

      if (selectedSkill < usableAvelhems.length) {
        // console.log("Resonator is an Avelhem");

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
        // console.log("Resonator is a Skill");

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
    } else {
      //Resonant skill
      if (props.unit) {
        //Scion skill
        newGameState = activateSkill(
          newGameState,
          props.unit,
          props.skill.id,
          usableSkills[selectedSkill].id
        );
      } else {
        //Sovereign skill
        newGameState = activateSovereignSkillAndResonate(
          newGameState,
          props.skill.id,
          usableSkills[selectedSkill].id
        );
      }

      const skillHandIndexes = [
        props.skill.handIndex,
        usableSkills[selectedSkill].handIndex,
      ];

      //get index in descending order
      skillHandIndexes.sort((a, b) => b - a);

      //remove resonating cards from hand but do not send to vestige
      newGameState[self].skillHand.splice(skillHandIndexes[0], 1);
      newGameState[self].skillHand.splice(skillHandIndexes[1], 1);
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleCancel = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
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
      case "Learn1.108":
        return element2.id === "07-02";
      case "Learn1.193":
        return element === "Select Button";

      ///////////////////
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.108":
        dispatch(updateDemo("Learn1.109"));
        break;

      ///////////////////////
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Select Resonator</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContent4Column modalScrollableY">
            {usableAvelhems.map((usableSkill, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedSkill === i ? "modalCardOptionOutlineSelected" : ""
                }`}
                onClick={() => {
                  handleClick(canUseResonator(usableSkill.id), i);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalCard 
                   ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedSkill === i ? "none" : "",
                  }}
                >
                  <Skill
                    usableSkill={usableSkill}
                    canActivateSkill={canUseResonator(usableSkill.id)}
                  />
                </div>
              </div>
            ))}

            {usableSkills.map((usableSkill, i) => (
              <div
                key={i + usableAvelhems.length}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedSkill === i + usableAvelhems.length
                    ? "modalCardOptionOutlineSelected"
                    : ""
                }`}
                onClick={() => {
                  handleClick(
                    canUseResonator(usableSkill.id),
                    i + usableAvelhems.length
                  );
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalCard 
                   ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow:
                      selectedSkill === i + usableAvelhems.length ? "none" : "",
                  }}
                >
                  <Skill
                    usableSkill={usableSkill}
                    canActivateSkill={canUseResonator(usableSkill.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedSkill === null && (
            <button className="redButton2" onClick={() => handleCancel()}>
              Cancel
            </button>
          )}

          {selectedSkill !== null && (
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

export default SelectResonator;
