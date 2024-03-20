import React from "react";
import { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import Skill from "../hand/Skill";

const YouMaySpend1Skill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getZonesWithAllies, isMuted } = useRecurringEffects();

  const [selectedSkill, setSelectedSkill] = useState(null);

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    usableSkills.push({
      id: localGameState[self].skillHand[i],
      handIndex: i,
    });
  }

  const canBeDiscarded = (skill) => {
    if (props.details.restriction === null) {
      return true;
    }
    if (props.details.restriction.includes(skill)) {
      return true;
    }
    return false;
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    switch (props.details.reason) {
      case "Resplendence1":
        newGameState.currentResolution.push({
          resolution: "Resplendence2",
          unit: props.unit,
        });
        break;

      case "Crystallization1":
        newGameState.currentResolution.push({
          resolution: "Crystallization2",
          unit: props.unit,
        });
        break;

      case "Cataclysmic Tempest8":
        newGameState.currentResolution.push({
          resolution: "Cataclysmic Tempest9",
          unit: props.unit,
        });
        break;

      case "Pitfall Trap":
        newGameState.currentResolution.push({
          resolution: "Pitfall Trap3",
          unit: props.unit,
          victim: props.victim,
        });
        break;

      case "Thunder Thaumaturge":
        newGameState.currentResolution.push({
          resolution: "Recover Skill",
          player: self,
          restriction: ["05-01", "05-02", "05-04"],
          message:
            "Recover 1 Lightning skill other than “Thunder Thaumaturge”.",
          outcome: "Add",
        });
        break;

      case "Diffusion Shield":
        newGameState.currentResolution.push({
          resolution: "DiffusionR3",
          unit: props.unit,
        });
        break;

      case "Arsenal Onslaught Attack":
        newGameState.currentResolution.push({
          resolution: "Arsenal Onslaught6",
          unit: props.unit,
        });
        break;

      default:
        break;
    }

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
      (props.unit !== null) &
        ["06-01", "06-02", "06-03", "06-04"].includes(
          usableSkills[selectedSkill].id
        ) &&
      isAdjacentToManaScion(props.unit)
    ) {
      newGameState.currentResolution.push({
        resolution: "Mana Restructuring",
        player: self,
        skill: usableSkills[selectedSkill],
      });
    } else {
      //send selected skill to vestige
      newGameState[self].skillVestige.push(
        ...newGameState[self].skillHand.splice(
          usableSkills[selectedSkill].handIndex,
          1
        )
      );
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Discarding Skill resolution
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // maybe not needed?
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.details.title}</h2>
        <h3>{props.details.message}</h3>

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
                canActivateSkill={canBeDiscarded(usableSkill.id)}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          ))}
        </div>

        {selectedSkill === null && (
          <button onClick={() => handleSkip()}>Skip</button>
        )}

        {selectedSkill !== null && (
          <button onClick={() => handleSelect()}>Select</button>
        )}
      </div>
    </div>
  );
};

export default YouMaySpend1Skill;
