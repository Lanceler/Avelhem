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

  let newGameState = JSON.parse(JSON.stringify(localGameState));

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

  const requiresExact = ["Skill Hand Limit", "Cataclysmic Tempest", "Flourish"];

  switch (props.details.reason) {
    case "Artifice":
    case "Battle Cry":
      skipMessage = "Return";
      break;

    case "Skill Hand Limit":
      canSkip = false;
      selectMessage = "Discard";
      break;

    case "Cataclysmic Tempest":
      canSkip = false;
      selectMessage = "Float";
      break;

    case "Flourish":
      canSkip = false;
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
    newGameState.currentResolution.pop();

    //1. get list of selected cards
    let selectedCards = [];
    for (let i of selectedSkills) {
      selectedCards.push(skillHand[i]);
    }

    //2. sort selected skills in descending order so they can be spliced smoothly
    let sortedSelectedSkills = [...selectedSkills].sort((a, b) => b - a);

    //3. remove selected skills from hand
    for (let i of sortedSelectedSkills) {
      skillHand.splice(i, 1);
    }

    newGameState[self].skillHand = [...skillHand];

    switch (props.details.reason) {
      case "Battle Cry":
        //0. discard selected Skills
        for (let card of selectedCards) {
          newGameState[self].skillVestige.push(card);
        }

        //1. gain assault tactic
        newGameState.tactics[0] = { face: "Assault", stock: 1, limit: 1 };

        if (
          newGameState[self].bountyUpgrades.phases >= 2 &&
          selectedSkills.length === 3
        ) {
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

        if (newGameState[self].bountyUpgrades.phases === 3) {
          newGameState[self].defiancePoints = Math.min(
            6,
            newGameState[self].defiancePoints + 1
          );
        }

        //3. Display tactics
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Tactic Results",
          player: self,
        });

        break;

      case "Skill Hand Limit":
        //0. discard selected Skills
        for (let card of selectedCards) {
          newGameState[self].skillVestige.push(card);
        }
        break;

      case "Artifice":
        //do an extra pop
        newGameState.currentResolution.pop();

        //deduct DP
        if (!newGameState.teaTrial) {
          newGameState[self].defiancePoints -= 1;
        }

        //1. place selected skills at bottom of repertoire (start of array)
        selectedCards.reverse();
        for (let card of selectedCards) {
          newGameState[self].skillRepertoire.unshift(card);
        }

        //2. for each returned skill, draw 1 skill
        for (let card of selectedCards) {
          newGameState = drawSkill(newGameState);
        }

        //3. End Defiance Phase
        newGameState = endDefiancePhase(newGameState);

        //4. inform enemy Defiance Action
        newGameState.currentResolution.push({
          resolution: "Misc.",
          resolution2: "Message To Player",
          player: enemy,
          title: "Defiance: Artifice",
          message: `Your opponent placed ${selectedCards.length} skill${
            selectedCards.length > 1 ? "s" : ""
          } at the bottom of their repertoire and drew the same number.`,
          specMessage: `${
            self === "host" ? "Gold" : "Silver"
          } Sovereign placed ${selectedCards.length} skill${
            selectedCards.length > 1 ? "s" : ""
          } at the bottom of their repertoire and drew the same number.`,
        });

        break;

      case "Cataclysmic Tempest":
        //1. float selected cards
        for (let card of selectedCards) {
          newGameState[self].skillRepertoire.push(card);
          newGameState[self].skillFloat += 1;
        }
        break;

      case "Flourish":
        //0. discard selected Skills
        for (let card of selectedCards) {
          newGameState[self].skillVestige.push(card);
        }

        //1. Gain Blossom
        const flourishUnit =
          newGameState[props.unit.player].units[props.unit.unitIndex];
        flourishUnit.blossom = 3;

        break;

      case "Transmute":
        //1. place selected skills at bottom of repertoire (start of array)
        selectedCards.reverse();
        for (let card of selectedCards) {
          newGameState[self].skillRepertoire.unshift(card);
        }
        selectedCards.reverse();

        //2. if resonated, do a search for Avelhems
        if (props.resonated === "resonated") {
          newGameState.currentResolution.push({
            resolution: "Sovereign Resonant Skill",
            resolution2: "TransmuteR1",
            player: self,
            skillsToShuffle: selectedCards,
          });
        }

        //3. do a search for each revealed/shuffled skill
        for (let card of selectedCards) {
          const skillCode = card.substring(0, 2);

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

        //4. inform enemy of facets
        let transmuteMessage = "";
        let specTransmuteMessage = "";

        switch (selectedCards.length) {
          case 1:
            transmuteMessage = `Your opponent has revealed a skill with the following facet: ${avelhemToScion(
              parseInt(selectedCards[0])
            ).replace(" Scion", "")}.`;
            specTransmuteMessage = `${
              self === "host" ? "Gold" : "Silver"
            } Sovereign has revealed a skill with the following facet: ${avelhemToScion(
              parseInt(selectedCards[0])
            ).replace(" Scion", "")}.`;
            break;

          case 2:
            transmuteMessage = `Your opponent has revealed skills with the following facets: ${avelhemToScion(
              parseInt(selectedCards[0])
            ).replace(" Scion", "")} and ${avelhemToScion(
              parseInt(selectedCards[1])
            ).replace(" Scion", "")}.`;

            specTransmuteMessage = `${
              self === "host" ? "Gold" : "Silver"
            } Sovereign has revealed skills with the following facets: ${avelhemToScion(
              parseInt(selectedCards[0])
            ).replace(" Scion", "")} and ${avelhemToScion(
              parseInt(selectedCards[1])
            ).replace(" Scion", "")}.`;
            break;
        }

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
          case 123:
            return element2 === 0;
          case 124:
            return element2 === 1;
          case 125:
            return element1 === "Button";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 123:
          case 124:
          case 125:
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

          {/* Can be lower than limit */}
          {selectedSkills.length > 0 &&
            !["Battle Cry", ...requiresExact].includes(
              props.details.reason
            ) && (
              <button className="redButton2" onClick={() => handleSelect()}>
                {selectMessage}
              </button>
            )}

          {/* Must be exact */}
          {selectedSkills.length === props.details.count &&
            requiresExact.includes(props.details.reason) && (
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

          {/* Must be exact: 2 or 3*/}
          {(newGameState[self].bountyUpgrades.phases < 2
            ? selectedSkills.length === props.details.count
            : selectedSkills.length >= 2) &&
            ["Battle Cry"].includes(props.details.reason) && (
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
