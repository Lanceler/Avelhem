import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import SkillMultiSelect from "../hand/SkillMultiSelect";

const SelectSkillHandMulti = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { avelhemToScion, drawSkill, endDefiancePhase } = useRecurringEffects();
  const { getScionSet } = useCardDatabase();

  //selectedAvelhems refers to their index in the hand
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillHand = [...localGameState[self].skillHand];
  const selectLimit = props.details.count;

  let canSkip = true;
  let skipMessage = "Skip";
  let selectMessage = "Select";

  switch (props.details.reason) {
    case "Arcana":
      skipMessage = "Return";
      break;

    case "Transmute":
      canSkip = false;
      selectMessage = "Shuffle";
      break;

    default:
      break;
  }

  const canAdd = (skill) => {
    switch (props.details.reason) {
      case "Transmute":
        if (skill[0] !== "S") {
          return true;
        }
        break;

      default:
        return true;
    }

    return false;
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "Arcana":
        //do an extra pop
        newGameState.currentResolution.pop();

        //deduct FD
        newGameState[self].fateDefiances -= 1;

        // console.log(selectedSkills);

        //1. get list of cards to be returned
        let skillsToReturn = [];
        for (let i of selectedSkills) {
          skillsToReturn.push(skillHand[i]);
        }

        // console.log(skillsToReturn);

        //2. sort selected skills in descending order so they can be spliced smoothly
        let sortedSelectedSkills1 = [...selectedSkills].sort((a, b) => b - a);

        // console.log("sortedSelectedSkills1");
        // console.log(sortedSelectedSkills1);

        //3. remove selected skills from hand
        for (let i of sortedSelectedSkills1) {
          // console.log(i);
          skillHand.splice(i, 1);
        }

        newGameState[self].skillHand = [...skillHand];

        // console.log("skillHand");
        // console.log(skillHand);

        //4. place selected skills at bottom of repertoire (start of array)
        // if skill is "Transcendence" (SX-01), sent to vestige instead
        //5. for each returned skill, draw 1 skill

        skillsToReturn.reverse();
        for (let skill of skillsToReturn) {
          if (skill === "SX-01") {
            newGameState[self].skillVestige.push(skill);
          } else {
            newGameState[self].skillRepertoire.unshift(skill);
          }

          newGameState = drawSkill(newGameState);
        }

        //6. End Defiance Phase

        newGameState = endDefiancePhase(newGameState);

        //7. inform enemy Defiance Action

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Enemy",
          player: enemy,
          title: "Defiance: Aracana",
          message: `Your opponent has returned ${skillsToReturn.length} skills to their repertoire and drawn the same number.`,
        });

        break;

      case "Transmute":
        // console.log(selectedSkills);

        //1. get list of cards to be shuffled
        let skillsToShuffle = [];
        for (let i of selectedSkills) {
          skillsToShuffle.push(skillHand[i]);
        }

        // console.log(skillsToShuffle);

        //2. sort selected skills in descending order so they can be spliced smoothly
        let sortedSelectedSkills = [...selectedSkills].sort((a, b) => b - a);

        // console.log("sortedSelectedSkills");
        // console.log(sortedSelectedSkills);

        //3. remove selected skills from hand
        for (let i of sortedSelectedSkills) {
          // console.log(i);
          skillHand.splice(i, 1);
        }

        newGameState[self].skillHand = [...skillHand];

        // console.log("skillHand");
        // console.log(skillHand);

        //4. place selected skills at bottom of repertoire (start of array)
        newGameState[self].skillRepertoire = [
          ...skillsToShuffle,
          ...newGameState[self].skillRepertoire,
        ];

        // console.log("newGameState[self].skillRepertoire");
        // console.log(newGameState[self].skillRepertoire);

        //5. if resonated, do a search for Avelhems
        if (props.resonated === "resonated") {
          newGameState.currentResolution.push({
            resolution: "Sovereign Resonant Skill",
            resolution2: "TransmuteR1",
            player: self,
            skillsToShuffle: skillsToShuffle,
          });
        }

        //6. do a search for each revealed/shuffled skill

        for (let skill of skillsToShuffle) {
          const skillCode = skill.substring(0, 2);

          newGameState.currentResolution.push({
            resolution: "Search Skill",
            player: self,
            restriction: getScionSet(avelhemToScion(parseInt(skillCode))),
            message: `Search for 1 ${avelhemToScion(
              parseInt(skillCode)
            ).replace("Scion", "Skill")}.`,
            outcome: "Add",
            reveal: "Transmute",
          });
        }

        //7. inform enemy of aspects

        let transmuteMessage = "";

        switch (skillsToShuffle.length) {
          case 1:
            transmuteMessage = `Your opponent has revealed a skill with the following aspect: ${avelhemToScion(
              parseInt(skillsToShuffle[0])
            ).replace(" Scion", "")}.`;
            break;
          case 2:
            transmuteMessage = `Your opponent has revealed skills with the following aspects: ${avelhemToScion(
              parseInt(skillsToShuffle[0])
            ).replace(" Scion", "")} and ${avelhemToScion(
              parseInt(skillsToShuffle[1])
            ).replace(" Scion", "")}.`;
            break;
        }

        //console.log(transmuteMessage);

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Enemy",
          player: enemy,
          title: "Transmute",
          message: transmuteMessage,
        });

        break;

      default:
        break;
    }

    console.log("newGameState[self].skillHand");
    console.log(newGameState[self].skillHand);
    console.log("newGameState[self].skillRepertoire");
    console.log(newGameState[self].skillRepertoire);
    console.log("newGameState[self].skillVestige");
    console.log(newGameState[self].skillVestige);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState);
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{props.details.message}</h3>

        <div className="fourColumn  scrollable scrollable-y-only">
          {skillHand.map((usableSkill, i) => (
            <div
              key={i}
              className={`scionSkills ${
                selectedSkills.includes(i) ? "selectedSkill" : ""
              }`}
            >
              <SkillMultiSelect
                i={i}
                usableSkill={usableSkill}
                canAdd={canAdd(usableSkill)}
                // canAdd={true}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                addLimit={selectLimit}
              />
            </div>
          ))}
        </div>

        {canSkip && selectedSkills.length === 0 && (
          <button className="choiceButton noYes" onClick={() => handleSkip()}>
            {skipMessage}
          </button>
        )}

        {selectedSkills.length > 0 && (
          <button className="choiceButton noYes" onClick={() => handleSelect()}>
            {selectMessage}
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectSkillHandMulti;
