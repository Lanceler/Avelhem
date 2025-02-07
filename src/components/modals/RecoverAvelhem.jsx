import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { updateDemo } from "../../redux/demoGuide";

import Skill from "../hand/Skill";

const RecoverAvelhem = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const dispatch = useDispatch();

  const {} = useRecurringEffects();

  const [selectedAvelhem, setSelectedAvelhem] = useState(null);

  let vestige = [...localGameState[self].avelhemVestige];

  //reverse display (for consistency with repertoire)
  let recoverVestige = [];
  for (let c in vestige) {
    recoverVestige.unshift({ id: vestige[c], vestigeIndex: c });
  }

  const canRecover = (avelhem) => {
    if (props.details.restriction === null) {
      return true;
    } else {
      return props.details.restriction.includes(avelhem);
    }
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    if (props.details.outcome === "Add") {
      //add selected Avelhem from vestige to hand
      newGameState[self].avelhemHand.push(
        newGameState[self].avelhemVestige.splice(
          newGameState[self].avelhemVestige.length - 1 - selectedAvelhem,
          1
        )[0]
      );
    } else if (props.details.outcome === "Float") {
      //take selected card then put it at the top of deck (end of array)
      newGameState[self].avelhemRepertoire.push(
        newGameState[self].avelhemVestige.splice(
          newGameState[self].avelhemVestige.length - 1 - selectedAvelhem,
          1
        )[0]
      );

      // increase floating count
      newGameState[self].avelhemFloat = newGameState[self].avelhemFloat + 1;
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleClick = (canActivate, i) => {
    if (canActivate) {
      if (selectedAvelhem === i) {
        setSelectedAvelhem(null);
      } else {
        setSelectedAvelhem(i);
      }
    }
  };

  const handleSkip = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {
    switch (
      demoGuide
      //////////////////
    ) {
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{props.details.title}</div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{props.details.message}</div>
          <div className="modalContent4Column modalScrollableY">
            {recoverVestige.map((usableAvelhem, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedAvelhem === i ? "modalCardOptionOutlineSelected" : ""
                }`}
                onClick={() => {
                  handleClick(canRecover(usableAvelhem.id), i);
                  // handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalCard 
                   ${canClick("Avelhem Card", i) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedAvelhem === i ? "none" : "",
                  }}
                >
                  <Skill
                    i={i}
                    usableSkill={usableAvelhem}
                    canActivateSkill={canRecover(usableAvelhem.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedAvelhem !== null && (
            <button className="redButton2" onClick={() => handleSelect()}>
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecoverAvelhem;
