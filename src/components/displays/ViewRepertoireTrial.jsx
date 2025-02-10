import React from "react";
import "../modals/Modal2.scss";

import { useSelector } from "react-redux";
import Skill from "../hand/Skill";

const ViewRepertoireTrial = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);

  let repertoire = [];
  let fRepertoire = [];

  switch (props.repertoire) {
    case "Skill Repertoire":
      repertoire = [...localGameState[props.team].skillRepertoire];
      fRepertoire = repertoire
        .reverse()
        .splice(0, localGameState[props.team].skillFloat);

      break;
    case "Avelhem Repertoire":
      repertoire = [...localGameState[props.team].avelhemRepertoire];
      fRepertoire = repertoire
        .reverse()
        .splice(0, localGameState[props.team].avelhemFloat);
      break;
  }

  //shuffle display (for consistency with repertoire)
  // const sortRepertoire = [...repertoire].sort();

  let floatingRepertoire = [];
  for (let c in fRepertoire) {
    floatingRepertoire.push({ id: fRepertoire[c], fRepertoire: c });
  }

  let sortRepertoire = [];
  for (let c in repertoire) {
    sortRepertoire.unshift({ id: repertoire[c], repertoireIndex: c });
  }

  const handleSkip = () => {
    props.setShowPile(null);
  };

  return (
    <>
      <div className="modalBackdrop">
        <div className="modalV2">
          <div className="modalHeader2">
            <div className="modalTitle2">{`${props.repertoire} (Sorted)`}</div>
            <div className="modalButton2">
              <button
                className={`yellowButton`}
                onClick={() => {
                  handleSkip();
                }}
              >
                Close
              </button>
            </div>
          </div>

          <div className="modalContent2">
            <div className="modalScrollableY" style={{ pointerEvents: "all" }}>
              {props.team === self && !props.spectator && (
                <>
                  {floatingRepertoire.length > 0 && (
                    <>
                      <div className="modalContentText">Floating cards</div>
                      <div className="modalContent4Column">
                        {floatingRepertoire.map((usableSkill, i) => (
                          <div
                            key={i}
                            className={`modalOptionOutline modalCardOptionOutline `}
                          >
                            <div
                              className={`modalCard 
                          `}
                            >
                              <Skill
                                usableSkill={usableSkill}
                                canActivateSkill={true}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {floatingRepertoire.length > 0 && (
                    <div className="modalContentText">Non-floating cards</div>
                  )}
                  <div className="modalContent4Column">
                    {sortRepertoire.map((usableSkill, i) => (
                      <div
                        key={i}
                        className={`modalOptionOutline modalCardOptionOutline `}
                      >
                        <div
                          className={`modalCard 
                          `}
                        >
                          <Skill
                            usableSkill={usableSkill}
                            canActivateSkill={true}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {(props.team !== self || props.spectator) && (
                <div className="modalContentText">
                  No cards available for viewing.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRepertoireTrial;
