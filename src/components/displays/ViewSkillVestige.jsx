import React, { useState } from "react";
import "../modals/Modal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import ZoomCard from "./ZoomCard";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

const ViewSkillVestige = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);

  const { getImage2 } = useCardImageSwitch();

  const [zoom, setZoom] = useState(false);
  const [zoomId, setZoomId] = useState(null);

  const closeZoom = () => {
    setZoom(false);
  };

  const openZoom = (id) => {
    setZoom(true);
    setZoomId(id);
    console.log("Open Zoom");
  };

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

  return (
    <>
      <div className="modal-backdrop">
        {zoom === true && <ZoomCard cardInfo={zoomId} closeZoom={closeZoom} />}
        <div className="modal">
          <div className="twoColumn3-1">
            <h2 className="choiceTitle">{`${props.vestige} Vestige`}</h2>
            <button
              className="collapseSelected unitInfo-close"
              onClick={() => handleSkip()}
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
                      backgroundImage: `url(${getImage2(usableSkill.id)})`,
                    }}
                  >
                    <button
                      className="zoom-button"
                      onClick={() => {
                        openZoom(usableSkill.id);
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
                        backgroundImage: `url(${getImage2(usableSkill.id)})`,
                      }}
                    >
                      <button
                        className="zoom-button"
                        onClick={() => {
                          openZoom(usableSkill.id);
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
