import React from "react";
import { useState, useEffect } from "react";
import "../modals/Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import Skill from "../hand/Skill";

const ViewSkillVestige = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getImage2 } = useCardImageSwitch();

  let vestige = [...localGameState[self].skillVestige];
  let shattered = [...localGameState[self].skillShattered];

  //reverse display (for consistency with repertoire)
  let reverseVestige = [];
  for (let c in vestige) {
    reverseVestige.unshift({ id: vestige[c], vestigeIndex: c });
  }

  let reverseShattered = [];
  for (let c in shattered) {
    reverseShattered.unshift({ id: shattered[c], shatteredIndex: c });
  }

  const handleSkip = () => {
    props.setShowPile(null);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="twoColumn3-1">
          <h2 className="choiceTitle">Skill Vestige</h2>
        </div>

        <div className="scrollable scrollable-y-only">
          <div className="fourColumn">
            {reverseVestige.map((usableSkill, i) => (
              <div
                key={i}
                className="scionSkills pile-view-skill"
                style={{
                  backgroundImage: `url(${getImage2(usableSkill.id)})`,
                }}
              ></div>
            ))}
          </div>

          {shattered.length > 0 && (
            <>
              <h3>Shattered skills:</h3>
              <div className="fourColumn">
                {reverseShattered.map((usableSkill, i) => (
                  <div
                    key={i}
                    className="scionSkills pile-view-skill"
                    style={{
                      backgroundImage: `url(${getImage2(usableSkill.id)})`,
                    }}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>

        <button className="choiceButton noYes" onClick={() => handleSkip()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewSkillVestige;
