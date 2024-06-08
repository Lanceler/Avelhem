import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SelectSkillDiscard = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getZonesWithAllies, isMuted } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let newGameState = JSON.parse(JSON.stringify(localGameState));

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  let unit = null;
  if (props.unit) {
    unit = newGameState[props.unit.player].units[props.unit.unitIndex];
  }

  const canBeDiscarded = (skill) => {
    if (!props.restriction) {
      return true;
    }
    if (props.restriction.includes(skill)) {
      return true;
    }
    return false;
  };

  const handleBlossom = () => {
    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    unit.blossom -= 1;

    newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

    dispatch(updateState(newGameState));
    //props.updateFirebase(newGameState);
  };

  const handleFever = () => {
    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    unit.fever -= props.fever;

    newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

    dispatch(updateState(newGameState));
    //props.updateFirebase(newGameState);
  };

  const handleSelect = () => {
    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    const isAdjacentToManaScion = (unitInfo) => {
      const zones = JSON.parse(localGameState.zones);
      const adjacentAllies = getZonesWithAllies(unitInfo, 1, true); // includes self

      for (let i of adjacentAllies) {
        const zone = zones[Math.floor(i / 5)][i % 5];
        const unit = localGameState[zone.player].units[zone.unitIndex];

        if (unit.unitClass === "Mana Scion" && !isMuted(unit)) {
          return true;
        }
      }

      return false;
    };

    // Mana Scion talent: Mana Scions and their adjacent allies
    // may float Mana skills when spending them
    if (
      unit &&
      ["06-01", "06-02", "06-03", "06-04"].includes(
        usableSkills[selectedSkill].id
      ) &&
      isAdjacentToManaScion(props.unit)
    ) {
      newGameState.currentResolution.push({
        resolution: "Mana Restructure",
        // player: self,
        unit: unit,
        details: {
          reason: "Mana Restructure",
          title: "Mana Restructure",
          message:
            "When a Mana Scion or their adjacent ally spends a Mana skill, they may float it instead.",
          no: "Discard",
          yes: "Float",
          skill: newGameState[self].skillHand.splice(
            usableSkills[selectedSkill].handIndex,
            1
          )[0],
        },
      });
    } else {
      //send selected skill to vestige
      newGameState[self].skillVestige.push(
        newGameState[self].skillHand.splice(
          usableSkills[selectedSkill].handIndex,
          1
        )[0]
      );
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
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
                  canActivateSkill={canBeDiscarded(usableSkill.id)}
                  selectedSkill={selectedSkill}
                  setSelectedSkill={setSelectedSkill}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedSkill === null && unit && unit.blossom > 0 && (
          <button className="choiceButton" onClick={() => handleBlossom()}>
            Spend 1 Blossom
          </button>
        )}

        {selectedSkill === null && props.fever && unit.fever >= props.fever && (
          <button className="choiceButton" onClick={() => handleFever()}>
            {`Spend ${props.fever === 1 ? "1 Fever" : "2 Fevers"}`}
          </button>
        )}

        {selectedSkill !== null && (
          <button className="choiceButton" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectSkillDiscard;
