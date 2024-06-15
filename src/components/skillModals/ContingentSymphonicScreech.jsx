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
  const { contingencySettings } = useSelector(
    (state) => state.contingencySettings
  );

  const dispatch = useDispatch();

  const [selectedSkill, setSelectedSkill] = useState(null);

  const { enterSelectUnitMode, getZonesWithEnemies, isMuted } =
    useRecurringEffects();

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

    enterSelectUnitMode(
      zonesWithWindScions,
      props.activator,
      newGameState,
      null,
      "symphonic screech",
      null
    );
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

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const contingencySkip = () => {
    if (!contingencySettings.Activation) {
      for (let usableSkill of usableSkills) {
        if (canActivateContingency(usableSkill.id)) {
          return;
        }
      }

      handleSkip();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>Contigency: Activation Triggered</h2> */}

        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Contigency: Activation Triggered</h2>
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
                onClick={() => {
                  handleClick(true, i);
                  // handleUpdateDemoGuide();
                }}
              >
                <Skill
                  i={i}
                  usableSkill={usableSkill}
                  canActivateSkill={true}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedSkill === null && (
          <button className="choiceButton" onClick={() => handleSkip()}>
            Skip
          </button>
        )}
        {selectedSkill !== null && (
          <button className="choiceButton" onClick={() => handleActivate()}>
            Activate
          </button>
        )}
      </div>
      {contingencySkip()}
    </div>
  );
};

export default ContingentSymphonicScreech;
