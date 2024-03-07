import React from "react";
import { useState } from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import Skill from "../hand/Skill";

const ContingentSurvivalAlly = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const {
    activateHealingRain,
    getZonesWithAllies,
    triggerHealingRain,
    triggerPowerAtTheFinalHour,
  } = useRecurringEffects();

  let survivalAllyContingentSkills = ["02-03", "SC-01"];

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    if (
      survivalAllyContingentSkills.includes(localGameState[self].skillHand[i])
    ) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const canActivateContingency = (skill) => {
    switch (skill) {
      case "02-03":
        return triggerHealingRain(props.victim, props.type);

      case "SC-01":
        return triggerPowerAtTheFinalHour(props.attacker, props.victim);

      default:
        return false;
    }
  };

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //pop "Triggering Ally Survival"
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);

    //pop "Triggering Target"
    newGameState.currentResolution.pop();

    if (
      //prevent enemy from activating their own contingent skill
      newGameState.currentResolution[newGameState.currentResolution.length - 1]
        .resolution === "Triggering Survival Enemy"
    ) {
      newGameState.currentResolution.pop();
    }

    //remove activated card from hand but do not send to vestige
    newGameState[self].skillHand.splice(
      usableSkills[selectedSkill].handIndex,
      1
    );

    if (usableSkills[selectedSkill].id === "02-03") {
      newGameState.currentResolution.push({
        resolution: "Select Healing Rain Activator",
        victim: props.victim,
        player: self,
      });
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState); // might remove this line of code
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="skill-modal">
        <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Contigency: Survival Triggered</h2>

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
                canActivateSkill={canActivateContingency(usableSkill.id)}
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

export default ContingentSurvivalAlly;
