import React from "react";
import "../modals/Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateDemoCount } from "../../redux/demoCount";

import { useGetImages } from "../../hooks/useGetImages";

import Skill from "../hand/Skill";

const ViewVestige = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
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
      case "Learn-overview":
        switch (
          demoCount
          // case 85:
          //   return true;
        ) {
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (
          demoCount
          // case 85:
          //   dispatch(updateDemoCount(demoCount + 1));
          //   break;
        ) {
        }
    }
  };

  return (
    <>
      <div className="modalBackdrop">
        <div className="modalV2">
          <div className="modalHeader2">
            <div className="modalTitle2">{`${props.vestige} Vestige`}</div>
            <div className="modalButton2">
              <button
                className={`yellowButton  ${canClick() ? "demoClick" : ""}`}
                onClick={() => {
                  handleSkip();
                  handleUpdateDemoGuide();
                }}
              >
                Close
              </button>
            </div>
          </div>

          <div className="modalContent2">
            <div className="modalScrollableY" style={{ pointerEvents: "all" }}>
              {props.team === self && !props.spectator && (
                <div className="modalContent4Column">
                  {reverseVestige.map((usableSkill, i) => (
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
              )}

              {shattered.length > 0 && (
                <>
                  <div className="modalContentText">Shattered skills:</div>
                  <div className="modalContent4Column">
                    {reverseShattered.map((usableSkill, i) => (
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

              {((props.team !== self || props.spectator) &&
                shattered.length) === 0 && (
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

export default ViewVestige;
