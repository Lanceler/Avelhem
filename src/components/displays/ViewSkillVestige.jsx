import React, { useState } from "react";
import "../modals/Modal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const ViewSkillVestige = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { getCardImage } = useCardImageSwitch();

  let vestige = [];
  let shattered = [];

  switch (props.vestige) {
    case "Skill":
      vestige = [...localGameState[props.team].skillVestige];
      shattered = [...localGameState[props.team].skillShattered];
      break;
    case "Avelhem":
      vestige = [...localGameState[props.team].avelhemVestige];
      break;
  }

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

  const canClick = () => {
    switch (demoGuide) {
      case "Learn1.20.2":
        return true;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.20.2":
        dispatch(updateDemo("Learn1.21"));
        break;
    }
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <div className="twoColumn3-1">
            <h2 className="choiceTitle">{`${props.vestige} Vestige`}</h2>
            <button
              className={`collapseSelected unitInfo-close ${
                canClick() ? "demoClick" : ""
              }`}
              onClick={() => {
                handleSkip();
                handleUpdateDemoGuide();
              }}
            >
              X
            </button>
          </div>

          <div className="scrollable scrollable-y-only">
            {props.team === self && (
              <div className="fourColumn">
                {reverseVestige.map((usableSkill, i) => (
                  <div
                    key={i}
                    className="scionSkills pile-view-skill"
                    style={{
                      backgroundImage: `url(${getCardImage(usableSkill.id)})`,
                    }}
                  >
                    <button
                      className="zoom-button"
                      onClick={() => {
                        dispatch(updateMagnifiedSkill(usableSkill.id));
                      }}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {shattered.length > 0 && (
              <>
                <h3>Shattered skills:</h3>
                <div className="fourColumn">
                  {reverseShattered.map((usableSkill, i) => (
                    <div
                      key={i}
                      className="scionSkills pile-view-skill"
                      style={{
                        backgroundImage: `url(${getCardImage(usableSkill.id)})`,
                      }}
                    >
                      <button
                        className="zoom-button"
                        onClick={() => {
                          dispatch(updateMagnifiedSkill(usableSkill.id));
                        }}
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {(props.team !== self && shattered.length) === 0 && (
              <>
                <h3>No cards available for viewing.</h3>
              </>
            )}
          </div>

          {/* <button className="choiceButton" onClick={() => handleSkip()}>
            Close
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ViewSkillVestige;
