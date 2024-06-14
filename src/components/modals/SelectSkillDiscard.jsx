import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const SelectSkillDiscard = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

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

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Fire1.10":
      case "Fire1.19":
        switch (element) {
          case "Skill Card":
            return element2.id === "SX-01";
        }
        break;

      case "Fire1.28":
        switch (element) {
          case "Skill Card":
            return element2.id === "02-03";
        }
        break;

      case "Fire1.38":
        switch (element) {
          case "Skill Card":
            return true;
        }
        break;

      case "Fire1.11":
      case "Fire1.20":
      case "Fire1.29":
      case "Fire1.39":
        switch (element) {
          case "Select Button":
            return true;
        }
        break;

      case "Fire1.14":
        switch (element) {
          case "Select Fever Button":
            return true;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Fire1.10":
        dispatch(updateDemo("Fire1.11"));
        break;

      case "Fire1.11":
        dispatch(updateDemo("Fire1.12"));
        break;

      case "Fire1.14":
        dispatch(updateDemo("Fire1.15"));
        break;

      case "Fire1.19":
        dispatch(updateDemo("Fire1.20"));
        break;

      case "Fire1.28":
        dispatch(updateDemo("Fire1.29"));
        break;

      case "Fire1.38":
        dispatch(updateDemo("Fire1.39"));
        break;
    }
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
                } ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}`}
                onClick={() => {
                  handleUpdateDemoGuide();
                }}
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
          <button
            className={`choiceButton ${
              canClick("Select Button") ? "demoClick" : ""
            }`}
            onClick={() => handleBlossom()}
          >
            Spend 1 Blossom
          </button>
        )}

        {selectedSkill === null && props.fever && unit.fever >= props.fever && (
          <button
            className={`choiceButton ${
              canClick("Select Fever Button") ? "demoClick" : ""
            }`}
            onClick={() => {
              handleFever();
              handleUpdateDemoGuide();
            }}
          >
            {`Spend ${props.fever === 1 ? "1 Fever" : "2 Fevers"}`}
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

export default SelectSkillDiscard;
