import React from "react";
import "./Skill.css";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SelectedSkill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const { getCardImage } = useCardImageSwitch();

  const {
    activateSovereignSkill,
    canActivateSovereignSkill,
    canActivateSovereignResonance,
  } = useRecurringEffects();

  let canActivateSkill = false;
  let canResonateSkill = false;

  if (
    localGameState.turnPlayer === self &&
    localGameState.currentResolution[
      localGameState.currentResolution.length - 1
    ].resolution === "Execution Phase"
  ) {
    canActivateSkill = canActivateSovereignSkill(props.selectedSkill.id);
    canResonateSkill = canActivateSovereignResonance(props.selectedSkill.id);
  }

  // console.log(props.selectedSkill);

  const handleActivate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState[self].skillHand.splice(props.selectedSkill.handIndex, 1);

    newGameState = activateSovereignSkill(newGameState, props.selectedSkill.id);

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);

    props.setRaise(false);
    props.setSelectedSkill(null);
  };

  const handleCollapse = () => {
    props.setSelectedSkill(null);
  };

  const handleResonate = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.push({
      resolution: "Choose Resonator",
      player: self,
      unit: null,
      skill: props.selectedSkill,
    });

    props.setRaise(false);
    props.setSelectedSkill(null);
    dispatch(updateState(newGameState));
  };

  const canClick = (element) => {
    switch (demoGuide) {
      case "Learn1.191":
        return element === "Resonate Button";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.191":
        dispatch(updateDemo("Learn1.192"));
        break;
    }
  };

  return (
    <div className="handModal-backdrop">
      <div className="handModal">
        <div className="selectedCardModal">
          <div
            className="displayedAvelhem"
            style={{
              backgroundImage: `url(${getCardImage(props.selectedSkill.id)})`,
            }}
          ></div>
          <div className="displayedCardOptions">
            {canActivateSkill && (
              <>
                <button
                  className="activateButton displayCardButton"
                  onClick={() => handleActivate()}
                >
                  Activate
                </button>
              </>
            )}

            {canResonateSkill && (
              <>
                <button
                  className={`activateButton displayCardButton ${
                    canClick("Resonate Button") ? "demoClick" : ""
                  }`}
                  onClick={() => {
                    handleResonate();
                    handleUpdateDemoGuide();
                  }}
                >
                  Resonate
                </button>
              </>
            )}
          </div>
        </div>
        <button className="collapseSelected" onClick={() => handleCollapse()}>
          X
        </button>
      </div>
    </div>
  );
};

export default SelectedSkill;
