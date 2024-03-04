import React from "react";
import { useState } from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import Skill from "../hand/Skill";

const ContingentSymphonicScreech = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const { getZonesWithEnemies, isMuted } = useRecurringEffects();

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    if (localGameState[self].skillHand[i] === "03-03") {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //pop "Triggering Screech"
    newGameState.currentResolution.pop();
    // newGameState.currentResolution.pop(); // why is there a second?

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);

    //pop "Triggering Screech"
    newGameState.currentResolution.pop();

    const zonesWithEnemies = getZonesWithEnemies(props.activator, 2);
    let zonesWithWindScions = [];

    for (let z of zonesWithEnemies) {
      const zone = zones[Math.floor(z / 5)][z % 5];
      const unit = newGameState[zone.player].units[zone.unitIndex];

      if (unit.unitClass === "Wind Scion" && !isMuted(unit)) {
        zonesWithWindScions.push(z);
      }
    }

    props.setIntrudingPlayer(self);

    props.enterSelectUnitMode(
      zonesWithWindScions,
      props.activator,
      newGameState,
      null,
      "symphonic screech"
    );
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Contigency: Activation Triggered</h2>

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
                canActivateSkill={true}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          ))}
        </div>
        <button onClick={() => handleSkip()}>Skip</button>
        {selectedSkill !== null && (
          <button onClick={() => handleActivate()}>Activate</button>
        )}
      </div>
    </div>
  );
};

export default ContingentSymphonicScreech;
