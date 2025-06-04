import React, { useState, useEffect } from "react";
import "./Modal.css";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

import Skill from "../hand/Skill";

const ScionSkillSelect = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const { activateSkill, canActivateResonance, canActivateSkill } =
    useRecurringEffects();

  const { getScionSet } = useCardDatabase();

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [canResonate, setCanResonate] = useState(null);

  useEffect(() => {
    if (usableSkills[selectedSkill]) {
      if (canActivateResonance(props.unit, usableSkills[selectedSkill].id)) {
        setCanResonate(true);
      } else {
        setCanResonate(false);
      }
    } else {
      setCanResonate(false);
    }
  }, [selectedSkill]);

  let usableSkills = [];
  for (let i in localGameState[self].skillHand) {
    if (
      getScionSet(props.unit.unitClass).includes(
        localGameState[self].skillHand[i]
      )
    ) {
      usableSkills.push({
        id: localGameState[self].skillHand[i],
        handIndex: i,
      });
    }
  }

  const handleResonate = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.currentResolution.push({
      resolution: "Choose Resonator",
      player: props.unit.player,
      unit: props.unit,
      skill: usableSkills[selectedSkill],
    });

    dispatch(updateState(newGameState));
  };

  const handleReturn = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleSelect = () => {
    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //remove activated card from hand but do not send to vestige
    newGameState[self].skillHand.splice(
      usableSkills[selectedSkill].handIndex,
      1
    );

    newGameState = activateSkill(
      newGameState,
      props.unit,
      usableSkills[selectedSkill].id
    );

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
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

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 105:
            return element2.id === "01-01";

          case 106:
            return element1 === "Select Button";
        }

      //   /////////////////////////////////////////
    }

    // return element1 === "Resonate Button";

    //////////////////////
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 105:
          case 106:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Activate Scion Skill</div>
          <div className="modalButton2"></div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">
            {localGameState[self].bountyUpgrades.burst < 1 &&
            usableSkills.length > 0
              ? "You cannot activate burst skills until you have upgraded them."
              : ""}
          </div>
          <div className="modalContentText">
            {usableSkills.length === 0
              ? `No ${props.unit.unitClass
                  .replace("Scion", "")
                  .trim()} skills in hand.`
              : ""}
          </div>

          <div className="modalContent4Column modalScrollableY">
            {usableSkills.map((usableSkill, i) => (
              <div
                key={i}
                className={`modalOptionOutline modalCardOptionOutline ${
                  selectedSkill === i ? "modalCardOptionOutlineSelected" : ""
                }`}
                onClick={() => {
                  handleClick(
                    canActivateSkill(props.unit, usableSkill.id) ||
                      canActivateResonance(props.unit, usableSkill.id),
                    i
                  );
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalCard
                   ${canClick("Skill Card", usableSkill) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedSkill === i ? "none" : "",
                  }}
                >
                  <Skill
                    i={i}
                    usableSkill={usableSkill}
                    canActivateSkill={
                      canActivateSkill(props.unit, usableSkill.id) ||
                      canActivateResonance(props.unit, usableSkill.id)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedSkill === null && (
            <button className="redButton2" onClick={() => handleReturn()}>
              Return
            </button>
          )}

          {selectedSkill !== null &&
            canActivateSkill(props.unit, usableSkills[selectedSkill].id) && (
              <button
                className={`redButton2 ${
                  canClick("Select Button") ? "demoClick" : ""
                }`}
                onClick={() => {
                  handleSelect();
                  handleUpdateDemoGuide();
                }}
              >
                Select
              </button>
            )}

          {canResonate && (
            <button
              className={`redButton2 ${
                canClick("Resonate Button") ? "demoClick" : ""
              }`}
              onClick={() => handleResonate()}
            >
              Resonate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScionSkillSelect;
