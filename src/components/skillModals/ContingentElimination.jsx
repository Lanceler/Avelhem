import React from "react";
import { useState } from "react";
import "./SkillModal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import Skill from "../hand/Skill";

const ContingentElimination = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const {
    triggerBlackBusinessCard,
    triggerVengefulLegacy,
    triggerViridianGrave,
  } = useRecurringEffects();

  let eliminationContingentSkills = ["08-03", "SC-04", "SC-05"];

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    if (
      eliminationContingentSkills.includes(localGameState[self].skillHand[i])
    ) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const canActivateContingency = (skill) => {
    switch (skill) {
      case "08-03":
        return triggerViridianGrave(props.unit, props.team);

      case "SC-04":
        return props.team === "ally" && triggerVengefulLegacy(props.unit);

      case "SC-05":
        return props.team === "enemy" && triggerBlackBusinessCard(props.unit);

      default:
        return false;
    }
  };

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //pop "Triggering Elimination Ally/Enemy"
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    const zones = JSON.parse(newGameState.zones);

    //pop "Triggering Elimination Ally/Enemy"
    newGameState.currentResolution.pop();

    if (
      //prevent enemy from activating their own contingent skill
      ["Triggering Elimination Ally", "Triggering Elimination Enemy"].includes(
        newGameState.currentResolution[
          newGameState.currentResolution.length - 1
        ].resolution
      )
    ) {
      newGameState.currentResolution.pop();
    }

    //remove activated card from hand but do not send to vestige
    newGameState[self].skillHand.splice(
      usableSkills[selectedSkill].handIndex,
      1
    );

    if (usableSkills[selectedSkill].id === "08-03") {
      newGameState.currentResolution.push({
        resolution: "Plant Skill",
        resolution2: "Select Viridian Grave Activator",
        victim: props.unit,
        player: self,
      });
    }

    dispatch(updateState(newGameState));
    // props.updateFirebase(newGameState); // might remove this line of code
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Contigency: Elimination Triggered</h2> */}

        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Contigency: Elimination Triggered</h2>
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
                  canActivateSkill={canActivateContingency(usableSkill.id)}
                  selectedSkill={selectedSkill}
                  setSelectedSkill={setSelectedSkill}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedSkill === null && (
          <button className="choiceButton noYes" onClick={() => handleSkip()}>
            Skip
          </button>
        )}
        {selectedSkill !== null && (
          <button
            className="choiceButton noYes"
            onClick={() => handleActivate()}
          >
            Activate
          </button>
        )}
      </div>
    </div>
  );
};

export default ContingentElimination;
