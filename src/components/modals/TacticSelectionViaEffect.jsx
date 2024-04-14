import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const TacticSelectionViaEffect = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { canMove, canStrike, drawAvelhem, drawSkill, getTacticImage } =
    useRecurringEffects();

  let canUseTactic = [false, false];

  let skipMessage = "Skip";

  if (props.details.canSkip === "Return") {
    skipMessage = "Return";
  }

  let updateData = false;

  if (
    localGameState.tactics[0] !== null &&
    (!props.unit || !props.unit.temporary.used0thTactic) &&
    props.details.restriction.includes(localGameState.tactics[0].face) &&
    localGameState.tactics[0].stock >= props.details.stock
  ) {
    canUseTactic[0] = true;
  }

  if (
    localGameState.tactics[1] !== null &&
    (!props.unit || !props.unit.temporary.used1stTactic) &&
    props.details.restriction.includes(localGameState.tactics[1].face) &&
    localGameState.tactics[1].stock >= props.details.stock
  ) {
    canUseTactic[1] = true;
  }

  const handleSkip = () => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    //end Tactic Selection
    newGameState.currentResolution.pop();

    dispatch(updateState(newGameState));
  };

  const handleClickTactic = (i) => {
    if (canUseTactic[i] && localGameState.tactics[i].stock > 0) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //end Tactic Selection
      newGameState.currentResolution.pop();

      //deduct stock from tactic
      newGameState.tactics[i].stock -= props.details.stock;

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

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });

          break;

        case "Hydrotherapy":
          updateData = true;
          newGameState.activatingSkill.push("Hydrotherapy");
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
            effect: true,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Activating Hydrotherapy",
            unit: unit,
          });

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });
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

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });
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

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });
          break;

        case "Fortify":
          if (newGameState.tactics[i].face === "Invoke") {
            delete unit.boosts.mountainStance;
            newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
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

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });
          break;

        case "Galvanize":
          updateData = true;
          newGameState.activatingSkill.push("Galvanize");
          newGameState.activatingUnit.push(unit);

          unit.temporary.usedGalvanize = true;
          newGameState[props.unit.player].units[props.unit.unitIndex] = unit;

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

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });
          break;

        case "Particle Beam":
          updateData = true;
          newGameState.activatingSkill.push("ParticleBeam");
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
            effect: true,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Activating Particle Beam",
            unit: unit,
          });

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });
          break;

        case "Brandish":
          updateData = true;
          newGameState.activatingSkill.push("Brandish");
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
            effect: true,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Activating Brandish",
            unit: unit,
          });

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });
          break;

        //Skills

        case "Surge":
          unit.virtue = 1;

          if (canMove(unit) || canStrike(unit)) {
            newGameState.currentResolution.push({
              resolution: "Mana Skill",
              resolution2: "Surge2",
              unit: unit,
              details: {
                title: "Surge",
                reason: "Surge2",
              },
            });
          }

          newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
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
          newGameState[props.unit.player].units[props.unit.unitIndex] = unit;
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
    }
  };

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* <button onClick={() => handleViewBoard()}>View Board</button>
        <h2>{props.details.title}</h2> */}

        <div className="twoColumn">
          <h2 className="choiceTitle">{props.details.title}</h2>
          <button className="choiceButton" onClick={() => handleViewBoard()}>
            View Board
          </button>
        </div>

        <h3>{props.details.message}</h3>
        <br />

        <div className="twoColumn">
          {localGameState.tactics.map((tactic, index) => (
            <div className="center" key={index}>
              <div
                className={`tacticBG ${
                  !canUseTactic[index] ? "disabledTacticBG" : ""
                }`}
              >
                <div
                  key={index}
                  className={`tactic ${
                    !canUseTactic[index] ? "disabledTactic" : ""
                  }`}
                  onClick={() => handleClickTactic(index)}
                  style={{
                    backgroundImage: `url(${getTacticImage(index)})`,
                  }}
                ></div>
              </div>
              {tactic.face}
              <br />
              Instances: {tactic.stock}
            </div>
          ))}
        </div>

        {props.details.canSkip && (
          <button
            button
            className="choiceButton noYes"
            onClick={() => handleSkip()}
          >
            {skipMessage}
          </button>
        )}
      </div>
    </div>
  );
};

export default TacticSelectionViaEffect;
