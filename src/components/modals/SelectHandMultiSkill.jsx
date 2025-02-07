import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import SkillMultiSelect from "../hand/SkillMultiSelect";

const SelectHandMultiSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const { avelhemToScion, drawSkill, endDefiancePhase, rollTactic } =
    useRecurringEffects();
  const { getScionSet } = useCardDatabase();

  //selectedAvelhems refers to their index in the hand
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillHand = [...localGameState[self].skillHand];
  const selectLimit = props.details.count;

  let canSkip = true;
  let skipMessage = "Skip";
  let selectMessage = "Select";

  switch (props.details.reason) {
    case "Artifice":
    case "Battle Cry":
      skipMessage = "Return";
      break;

    case "Skill Hand Limit":
      canSkip = false;
      selectMessage = "Discard";
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
      case "Battle Cry":
        //1. gain assault tactic
        newGameState.tactics[0] = { face: "Assault", stock: 1, limit: 1 };

        if (newGameState[self].bountyUpgrades.coordination >= 1) {
          newGameState.tactics[1] = rollTactic();
        } else {
          newGameState.tactics[1] = { face: "Null", stock: 0, limit: 1 };
        }

        //2. change phase
        newGameState.turnPhase = "Defiance";
        newGameState.currentResolution.pop();
        newGameState.currentResolution.push({
          resolution: "Defiance Phase Selection",
        });

        //3. Display tactics
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Tactic Results",
        });

      //DO NOT break; it will discard skills just like "Skill Hand Limit"

      case "Skill Hand Limit":
        //1. get list of cards to be discarded
        let excessSkills = [];
        for (let i of selectedSkills) {
          excessSkills.push(skillHand[i]);
        }

        // console.log(excessSkills);

        //2. sort selected skills in descending order so they can be spliced smoothly
        let sortedSelectedSkills2 = [...selectedSkills].sort((a, b) => b - a);

        // console.log("sortedSelectedSkills2");
        // console.log(sortedSelectedSkills2);

        //3. remove selected skills from hand
        for (let i of sortedSelectedSkills2) {
          // console.log(i);
          skillHand.splice(i, 1);
        }

        newGameState[self].skillHand = [...skillHand];

        // console.log("skillHand");
        // console.log(skillHand);

        //4. discard selected Skills
        for (let skill of excessSkills) {
          newGameState[self].skillVestige.push(skill);
        }

        break;

      case "Artifice":
        //do an extra pop
        newGameState.currentResolution.pop();

        //deduct FD
        if (!newGameState.teaTrial) {
          newGameState[self].fateDefiance -= 1;
        }

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
        skillsToReturn.reverse();
        for (let skill of skillsToReturn) {
          newGameState[self].skillRepertoire.unshift(skill);
        }

        //5. for each returned skill, draw 1 skill

        for (let skill of skillsToReturn) {
          newGameState = drawSkill(newGameState);
        }

        //6. End Defiance Phase

        newGameState = endDefiancePhase(newGameState);

        //7. inform enemy Defiance Action

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Player",
          player: enemy,
          title: "Defiance: Artifice",
          message: `Your opponent has returned ${skillsToReturn.length} skills to their repertoire and drawn the same number.`,
          specMessage: `${
            self === "host" ? "Gold" : "Silver"
          } Sovereign has returned ${
            skillsToReturn.length
          } skills to their repertoire and drawn the same number.`,
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
            resolution: "Search Card",
            player: self,
            details: {
              restriction: getScionSet(avelhemToScion(parseInt(skillCode))),
              exclusion: [],
              searchTitle: "Transmute",
              searchMessage: `Search for 1 ${avelhemToScion(
                parseInt(skillCode)
              ).replace("Scion", "Skill")}.`,
              outcome: "Add",
              revealTitle: null,
              revealMessage: null,
              messageTitle: "Transmute",
              message: null,
              specMessage: null,
            },
          });
        }

        //7. inform enemy of aspects

        let transmuteMessage = "";
        let specTransmuteMessage = "";

        switch (skillsToShuffle.length) {
          case 1:
            transmuteMessage = `Your opponent has revealed a skill with the following aspect: ${avelhemToScion(
              parseInt(skillsToShuffle[0])
            ).replace(" Scion", "")}.`;
            specTransmuteMessage = `${
              self === "host" ? "Gold" : "Silver"
            } Sovereign has revealed a skill with the following aspect: ${avelhemToScion(
              parseInt(skillsToShuffle[0])
            ).replace(" Scion", "")}.`;

            break;
          case 2:
            transmuteMessage = `Your opponent has revealed skills with the following aspects: ${avelhemToScion(
              parseInt(skillsToShuffle[0])
            ).replace(" Scion", "")} and ${avelhemToScion(
              parseInt(skillsToShuffle[1])
            ).replace(" Scion", "")}.`;

            specTransmuteMessage = `${
              self === "host" ? "Gold" : "Silver"
            } Sovereign has revealed skills with the following aspects: ${avelhemToScion(
              parseInt(skillsToShuffle[0])
            ).replace(" Scion", "")} and ${avelhemToScion(
              parseInt(skillsToShuffle[1])
            ).replace(" Scion", "")}.`;

            break;
        }

        //console.log(transmuteMessage);

        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Player",
          player: enemy,
          title: "Transmute",
          message: transmuteMessage,
          specMessage: specTransmuteMessage,
        });

        break;

      default:
        break;
    }

    // console.log("newGameState[self].skillHand");
    // console.log(newGameState[self].skillHand);
    // console.log("newGameState[self].skillRepertoire");
    // console.log(newGameState[self].skillRepertoire);
    // console.log("newGameState[self].skillVestige");
    // console.log(newGameState[self].skillVestige);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedSkills.includes(i)) {
        selectedSkills.splice(selectedSkills.indexOf(i), 1);
        setSelectedSkills([...selectedSkills]);
      } else if (selectedSkills.length < selectLimit) {
        setSelectedSkills([...selectedSkills, i]);
      }
    }
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

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 127:
            return element2 === 0;
          case 128:
            return element2 === 1;
          case 129:
            return element1 === "Button";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 127:
          case 128:
          case 129:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{props.details.title}</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{props.details.message}</div>

          <div className="modalContent4Column modalScrollableY">
            {skillHand.map((usableSkill, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedSkills.includes(i)
                    ? "modalCardOptionOutlineSelected"
                    : ""
                }`}
                onClick={() => {
                  handleClick(canAdd(usableSkill), i);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalCard 
                   ${canClick("Skill", i) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedSkills.includes(i) ? "none" : "",
                  }}
                >
                  <SkillMultiSelect
                    i={i}
                    usableSkill={usableSkill}
                    canAdd={canAdd(usableSkill)}
                    selectedSkills={selectedSkills}
                    addLimit={selectLimit}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {canSkip && selectedSkills.length === 0 && (
            <button className="redButton2" onClick={() => handleSkip()}>
              {skipMessage}
            </button>
          )}

          {selectedSkills.length > 0 &&
            !["Skill Hand Limit", "Battle Cry"].includes(
              props.details.reason
            ) && (
              <button className="redButton2" onClick={() => handleSelect()}>
                {selectMessage}
              </button>
            )}

          {["Skill Hand Limit", "Battle Cry"].includes(props.details.reason) &&
            selectedSkills.length === props.details.count && (
              <button
                className={`redButton2 ${
                  canClick("Button") ? "demoClick" : ""
                }`}
                onClick={() => {
                  handleSelect();
                  handleUpdateDemoGuide();
                }}
              >
                {selectMessage}
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default SelectHandMultiSkill;
