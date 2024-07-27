import React, { useState } from "react";
import "../modals/Modal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useGetImages } from "../../hooks/useGetImages";

const ViewVestige = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { getCardImage } = useGetImages();

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
          <div className="modalHeader">
            <div className="modalTitle">{`${props.vestige} Vestige`}</div>
            <div className="modalButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={` close-modal-button  ${
                  canClick() ? "demoClick" : ""
                }`}
                onClick={() => {
                  handleSkip();
                  handleUpdateDemoGuide();
                }}
              >
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
              </svg>
            </div>
          </div>

          <br />

          <div className="scrollable scrollable-y-only">
            {props.team === self && !props.spectator && (
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

            {((props.team !== self || props.spectator) && shattered.length) ===
              0 && (
              <>
                <h3>No cards available for viewing.</h3>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVestige;
