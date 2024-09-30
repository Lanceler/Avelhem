import React, { useState } from "react";
import "../modals/Modal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../../redux/magnifySkill";
import { updateState } from "../../redux/gameState";

import { useGetImages } from "../../hooks/useGetImages";

const ViewRepertoireTrial = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);

  const dispatch = useDispatch();

  const { getCardImage } = useGetImages();

  let repertoire = [];
  let floatingRepertoire = [];

  switch (props.repertoire) {
    case "Skill Repertoire":
      repertoire = [...localGameState[props.team].skillRepertoire];
      floatingRepertoire = repertoire.splice(
        0,
        localGameState[props.team].skillFloat
      );
      break;
    case "Avelhem Repertoire":
      repertoire = [...localGameState[props.team].avelhemRepertoire];
      floatingRepertoire = repertoire.splice(
        0,
        localGameState[props.team].avelhemFloat
      );
      break;
  }

  //shuffle display (for consistency with repertoire)
  const sortRepertoire = [...repertoire].sort();

  //   console.log(sortRepertoire);

  const handleSkip = () => {
    props.setShowPile(null);
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <div className="modalHeader">
            <div className="modalTitle">{`${props.repertoire} (Sorted)`}</div>
            <div className="modalButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={"close-modal-button"}
                onClick={() => {
                  handleSkip();
                }}
              >
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
              </svg>
            </div>
          </div>

          <br />

          <div
            className="scrollable scrollable-y-only"
            style={{ pointerEvents: "all" }}
          >
            {props.team === self && !props.spectator && (
              <>
                {floatingRepertoire.length > 0 && (
                  <>
                    <h3>Floating cards</h3>
                    <div className="fourColumn">
                      {floatingRepertoire.map((usableSkill, i) => (
                        <div
                          key={i}
                          className="scionSkills pile-view-skill"
                          style={{
                            backgroundImage: `url(${getCardImage(
                              usableSkill
                            )})`,
                          }}
                        >
                          <button
                            className="zoom-button"
                            onClick={() => {
                              dispatch(updateMagnifiedSkill(usableSkill));
                            }}
                          >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {floatingRepertoire.length > 0 && <h3>Non-floating cards</h3>}
                <div className="fourColumn">
                  {sortRepertoire.map((usableSkill, i) => (
                    <div
                      key={i}
                      className="scionSkills pile-view-skill"
                      style={{
                        backgroundImage: `url(${getCardImage(usableSkill)})`,
                      }}
                    >
                      <button
                        className="zoom-button"
                        onClick={() => {
                          dispatch(updateMagnifiedSkill(usableSkill));
                        }}
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRepertoireTrial;
