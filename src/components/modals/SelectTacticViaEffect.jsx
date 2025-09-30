import React, { useState } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useGetImages } from "../../hooks/useGetImages";

import InfoPopUp from "./InfoPopUp";

const SelectTacticViaEffect = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const [selectedChoice, setSelectedChoice] = useState(null);

  const dispatch = useDispatch();

  const [infoPopUp, setInfoPopUp] = useState(null);

  const {
    animationDelay,
    drawAvelhem,
    drawSkill,
    enterMoveMode,
    getVacantAdjacentZones,
  } = useRecurringEffects();

  const { getTacticImage } = useGetImages();

  let canUseTactic = [false, false];

  let skipMessage = "Skip";

  if (props.details.canSkip === "Return") {
    skipMessage = "Return";
  }

  let updateData = false;

  const enoughStock = (i) => {
    if (localGameState.tactics[i].face === "Mobilize") {
      return localGameState.tactics[i].stock >= props.details.stock;
    } else {
      return localGameState.tactics[i].stock > 0;
    }
  };

  if (
    localGameState.tactics[0] !== null &&
    (!props.unit || !props.unit.temporary.used0thTactic) &&
    props.details.restriction.includes(localGameState.tactics[0].face) &&
    enoughStock(0)
  ) {
    canUseTactic[0] = true;
  }

  if (
    localGameState.tactics[1] !== null &&
    (!props.unit || !props.unit.temporary.used1stTactic) &&
    props.details.restriction.includes(localGameState.tactics[1].face) &&
    enoughStock(1)
  ) {
    canUseTactic[1] = true;
  }

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Tactic Selection
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleProceed = (i) => {
    // if (canUseTactic[i] && localGameState.tactics[i].stock > 0) {

    // }

    let newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Tactic Selection
    newGameState.currentResolution.pop();

    //deduct stock from tactic
    if (localGameState.tactics[i].face === "Mobilize") {
      newGameState.tactics[i].stock -= props.details.stock;
    } else {
      newGameState.tactics[i].stock -= 1;
    }

    let unit = null;
    if (props.unit) {
      unit = newGameState[props.unit.player].units[props.unit.unitIndex];

      //prevent unit from using tactic again
      if (newGameState.tactics[i].face === "Mobilize") {
        if (i === 0) {
          unit.temporary.used0thTactic = true;
        } else if (i === 1) {
          unit.temporary.used1stTactic = true;
        }
      }
    }

    switch (props.details.reason) {
      //Abilities
      case "Afterburner":
        updateData = true;
        newGameState.activatingSkill.push("Afterburner");
        newGameState.activatingUnit.push(unit);

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: unit,
          effect: true,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Ability",
          resolution2: "Activating Afterburner",
          unit: unit,
        });

        newGameState = animationDelay(newGameState, self);

        break;

      case "Cold Embrace":
        updateData = true;
        newGameState.activatingSkill.push("ColdEmbrace");
        newGameState.activatingUnit.push(unit);

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: unit,
          effect: true,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Ability",
          resolution2: "Activating Cold Embrace",
          unit: unit,
        });

        newGameState = animationDelay(newGameState, self);
        break;

      case "Reap the Whirlwind":
        updateData = true;
        newGameState.activatingSkill.push("ReapTheWhirlwind");
        newGameState.activatingUnit.push(unit);

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: unit,
          effect: true,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Ability",
          resolution2: "Activating Reap the Whirlwind",
          unit: unit,
        });

        newGameState = animationDelay(newGameState, self);
        break;

      case "Fortify":
        if (newGameState.tactics[i].face === "Advance") {
          delete unit.aftershock;
        }

        updateData = true;
        newGameState.activatingSkill.push("Fortify");
        newGameState.activatingUnit.push(unit);

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: unit,
          effect: true,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Ability",
          resolution2: "Activating Fortify",
          unit: unit,
        });

        newGameState = animationDelay(newGameState, self);
        break;

      case "Leyline Convergence":
        if (newGameState.tactics[i].face === "Advance") {
          delete unit.aftershock;
        }

        updateData = true;
        newGameState.activatingSkill.push("LeylineConvergence");
        newGameState.activatingUnit.push(unit);

        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: unit,
          effect: true,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Ability",
          resolution2: "Activating Leyline Convergence",
          unit: unit,
        });

        newGameState = animationDelay(newGameState, self);
        break;

      case "Galvanize":
        updateData = true;
        newGameState.activatingSkill.push("Galvanize");
        newGameState.activatingUnit.push(unit);

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: unit,
          effect: true,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Ability",
          resolution2: "Activating Galvanize",
          unit: unit,
        });

        newGameState = animationDelay(newGameState, self);
        break;

      case "Arc Flash":
        updateData = true;
        newGameState.activatingSkill.push("ArcFlash");
        newGameState.activatingUnit.push(unit);

        newGameState.currentResolution.push({
          resolution: "Tactic End",
          unit: unit,
          effect: true,
        });

        newGameState.currentResolution.push({
          resolution: "Unit Ability",
          resolution2: "Activating Arc Flash",
          unit: unit,
        });

        newGameState = animationDelay(newGameState, self);
        break;

      //Skills

      case "Aerial Impetus":
        const mobilizeLimit =
          newGameState[self].bountyUpgrades.tactics >= 2 ? 4 : 3;

        newGameState.tactics[i].stock = mobilizeLimit;
        newGameState.tactics[i].limit = mobilizeLimit;
        newGameState.tactics[i].face = "Mobilize";
        break;

      case "Surge":
        newGameState.currentResolution.push({
          resolution: "Mana Skill",
          resolution2: "Surge3",
          unit: unit,
        });

        newGameState = enterMoveMode(
          getVacantAdjacentZones(unit),
          unit,
          newGameState,
          null
        );

        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Diffusion":
        //2. Continue
        newGameState.currentResolution.push({
          resolution: "Mana Skill",
          resolution2: "Diffusion3",
          unit: unit,
        });

        //1. Blast 1st enemy
        newGameState.currentResolution.push({
          resolution: "Mana Skill",
          resolution2: "Diffusion2",
          unit: unit,
        });
        //newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
        break;

      case "Reminiscence":
        newGameState = drawSkill(newGameState);
        newGameState = drawSkill(newGameState);
        newGameState = drawSkill(newGameState);
        break;

      case "Ambidexterity":
        newGameState.tactics[i].stock += 1;
        newGameState.tactics[i].face = "Invoke";
        break;

      case "Providence":
        newGameState = drawSkill(newGameState);
        newGameState = drawSkill(newGameState);
        newGameState = drawSkill(newGameState);
        newGameState = drawAvelhem(newGameState);
        newGameState = drawAvelhem(newGameState);
        newGameState = drawAvelhem(newGameState);

        if (props.details.resonated === "resonated") {
          newGameState.tactics[i].stock += 1;
          newGameState.tactics[i].face = "Advance";
        }

        break;

      default:
        break;
    }

    dispatch(updateState(newGameState));
    if (updateData === true) {
      props.updateFirebase(newGameState);
    }
  };

  const handleSelect = (i) => {
    if (canUseTactic[i] && localGameState.tactics[i].stock > 0) {
      if (selectedChoice === i) {
        setSelectedChoice(null);
      } else {
        setSelectedChoice(i);
      }
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.123":
        return element2 === 0;

      case "Learn1.123.1":
        return element === "Proceed";

      ///////
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.123":
        dispatch(updateDemo("Learn1.123.1"));
        break;

      case "Learn1.123.1":
        dispatch(updateDemo("Learn1.124"));
        break;

      ////////////////
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">
            {props.details.title}
            <span style={{ opacity: 0 }}>.</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="question-icon2"
              onClick={() => setInfoPopUp("Tactics")}
              style={{ fill: "goldenrod" }}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </div>
          <div className="modalButton2">
            <button className="yellowButton" onClick={() => handleViewBoard()}>
              View Board
            </button>
          </div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{props.details.message}</div>

          <div className="modalContent2Column">
            {localGameState.tactics.map((tactic, i) => (
              <div className="modalTactics" key={i}>
                <div
                  className={`modalOptionOutline modalTacticOptionOutline
                ${
                  selectedChoice === i ? "modalTacticOptionOutlineSelected" : ""
                }`}
                  onClick={() => {
                    handleSelect(i);
                    handleUpdateDemoGuide();
                  }}
                >
                  <div
                    className={`modalTactic
                     ${canUseTactic[i] ? "" : "disabledModal"}
                     ${canClick("Tactic", i) ? "demoClick" : ""}`}
                    style={{
                      boxShadow: selectedChoice === i ? "none" : "",
                    }}
                  >
                    <div
                      className="modalTacticImage"
                      style={{
                        backgroundImage: `url(${getTacticImage(tactic.face)})`,
                      }}
                    ></div>
                  </div>
                </div>
                <h2 style={{ marginTop: 10 }}>{tactic.face}</h2>
                <div className="tactic-label">Instances: {tactic.stock}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedChoice !== null && (
            <button
              className={`redButton2 ${canClick("Proceed") ? "demoClick" : ""}`}
              onClick={() => {
                handleProceed(selectedChoice);
                handleUpdateDemoGuide();
              }}
            >
              Select
            </button>
          )}
          {props.details.canSkip && selectedChoice === null && (
            <button className="redButton2" onClick={() => handleSkip()}>
              {skipMessage}
            </button>
          )}
        </div>
      </div>
      {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />}
    </div>
  );
};

export default SelectTacticViaEffect;
