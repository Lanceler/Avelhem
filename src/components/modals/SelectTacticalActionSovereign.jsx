import React, { useState } from "react";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const SelectTacticalActionSovereign = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { canDeploy, drawAvelhem, drawSkill, getVacantFrontier } =
    useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let face = props.face;

  let optionDetails = [];
  switch (face) {
    case "Advance":
      optionDetails = [
        {
          optionName: "Deploy Pawn",
          optionQualifier: (
            <div>
              You can have up to <br /> 8 units in play.
            </div>
          ),
          optionText: (
            <>
              <div className="">⬩Deploy a pawn in your frontier.</div>
            </>
          ),
        },
        {
          optionName: "Convert Tactic",
          optionQualifier: null,
          optionText: (
            <>
              <div className="">⬩Spend 6 FD to gain an Assault tactic.</div>
            </>
          ),
        },
        {
          optionName: "Deploy Scion",
          optionQualifier: (
            <div>
              {newGameState[self].bountyUpgrades.tactics < 3 && (
                <div>Must be unlocked</div>
              )}
              {newGameState[self].bountyUpgrades.tactics === 3 && (
                <div>
                  You can have up to <br /> 8 units in play.
                </div>
              )}
            </div>
          ),
          optionText: (
            <>
              <div className="">
                ⬩Float 1 skill to deploy a Scion in your frontier.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Mobilize":
      optionDetails = [
        {
          optionName: "Draw Skill",
          optionQualifier: null,
          optionText: (
            <>
              <div className="">⬩Use 2 instances to draw 1 skill.</div>
            </>
          ),
        },
      ];
      break;

    case "Assault":
    case "Null":
      optionDetails = [
        {
          optionName: "Null",
          optionQualifier: null,
          optionText: (
            <>
              <div className="">No tactical actions available.</div>
            </>
          ),
        },
      ];
      break;

    case "Invoke":
      optionDetails = [
        {
          optionName: "Draw Avelhem",
          optionQualifier: null,
          optionText: (
            <>
              <div className="">⬩Draw 3 Avelhems.</div>
            </>
          ),
        },
        {
          optionName: "Draw Skill",
          optionQualifier: null,
          optionText: (
            <>
              <div className="">⬩Draw 2 skills.</div>
            </>
          ),
        },
        {
          optionName: "Defy Fate",
          optionQualifier: null,
          optionText: (
            <>
              <div className="">⬩Gain 3 FD.</div>
            </>
          ),
        },
      ];
      break;

    case "Rally":
      optionDetails = [
        {
          optionName: "Deploy Pawn",
          optionQualifier: (
            <div>
              You can have up to <br /> 8 units in play.
            </div>
          ),
          optionText: (
            <>
              <div className="">
                ⬩Use 1 instance to deploy a pawn in your frontier.
              </div>
            </>
          ),
        },
      ];
      break;
  }

  const canChoice = (i) => {
    if (newGameState.tactics[props.dice].stock < 1) {
      return false;
    }

    switch (face) {
      case "Advance":
        switch (i) {
          case 0:
            return canDeploy();
          case 1:
            return newGameState[self].fateDefiance >= 6;
          case 2:
            return (
              newGameState[self].bountyUpgrades.tactics >= 3 &&
              canDeploy() &&
              newGameState[self].skillHand.length > 0
            );
        }
        break;

      case "Mobilize":
        switch (i) {
          case 0:
            return newGameState.tactics[props.dice].stock >= 2;
        }

      case "Assault":
      case "Null":
        switch (i) {
          case 0:
            return false;
        }

      case "Invoke":
        switch (i) {
          case 0:
          case 1:
          case 2:
            return true;
        }
        break;

      case "Rally":
        switch (i) {
          case 0:
            return canDeploy();
        }
        break;
    }
    return false;
  };

  const handleChoice = (i) => {
    if (selectedChoice === i) {
      setSelectedChoice(null);
    } else if (canChoice(i)) {
      setSelectedChoice(i);
    }
  };

  const handleSelect = () => {
    let updateData = true;

    const deployPawnSelected =
      (face === "Advance" && selectedChoice === 0) ||
      (face === "Rally" && selectedChoice === 0);

    if (!deployPawnSelected) {
      newGameState.currentResolution.pop();
    }

    newGameState.tactics[props.dice].stock -= 1;

    switch (face) {
      case "Advance":
        switch (selectedChoice) {
          case 0:
            updateData = false;

            newGameState.currentResolution.push({
              resolution: "Deploying Pawn",
              zoneIds: getVacantFrontier(),
              dice: props.dice,
            });
            break;

          case 1:
            newGameState[self].fateDefiance -= 6;

            //Gain assault command
            newGameState.tactics[props.dice].stock += 1;
            newGameState.tactics[props.dice].face = "Assault";
            break;

          case 2:
            //refund stock
            newGameState.tactics[props.dice].stock += 1;

            newGameState.currentResolution.push({
              resolution: "Misc.",
              resolution2: "Advance Deploy Scion: Choose Element",
              player: self,
              details: {
                reason: "Advance Deploy Scion",
                title: "Deploy Scion",
                tactic: props.dice,
                message: "Deploy a Scion; choose their class.",
              },
            });
            break;
        }
        break;

      case "Mobilize":
        switch (selectedChoice) {
          case 0:
            newGameState.tactics[props.dice].stock -= 1; // uses 2 instances
            newGameState = drawSkill(newGameState);
            break;
        }
        break;

      case "Invoke":
        switch (selectedChoice) {
          case 0:
            newGameState = drawAvelhem(newGameState);
            newGameState = drawAvelhem(newGameState);
            newGameState = drawAvelhem(newGameState);
            break;

          case 1:
            newGameState = drawSkill(newGameState);
            newGameState = drawSkill(newGameState);
            break;

          case 2:
            //Gain FD
            newGameState[self].fateDefiance = Math.min(
              6,
              newGameState[self].fateDefiance + 3
            );

            break;
        }
        break;

      case "Rally":
        switch (selectedChoice) {
          case 0:
            updateData = false;

            newGameState.currentResolution.push({
              resolution: "Deploying Pawn",
              zoneIds: getVacantFrontier(),
              dice: props.dice,
            });

            break;
        }
        break;
    }

    dispatch(updateState(newGameState));

    if (updateData) {
      props.updateFirebase(newGameState);
    }
  };

  const handleReturn = () => {
    newGameState.currentResolution.pop();
    dispatch(updateState(newGameState));
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 37:
          case 44:
            return element2 === 0;

          case 38:
          case 45:
            return element1 === "Select Button";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 37:
          case 38:
          case 44:
          case 45:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">Tactical Action: {props.face}</div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">Choose 1:</div>

          <div className={`modalContent${optionDetails.length}Column`}>
            {optionDetails.map((detail, i) => (
              <div
                key={i}
                className={`modalOptionOutline
                  modalMediumOptionOutline
                   ${
                     selectedChoice === i
                       ? "modalMediumOptionOutlineSelected"
                       : ""
                   } `}
                onClick={() => {
                  handleChoice(i);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  className={`modalMedium ${
                    canChoice(i) ? "" : "disabledModal"
                  } 
                  ${canClick("Tactic", i) ? "demoClick" : ""}`}
                  style={{
                    boxShadow: selectedChoice === i ? "none" : "",
                  }}
                >
                  <div className="modalOptionHeader">
                    <div className="modalOptionTitle">{detail.optionName}</div>
                    <div className="modalOptionQualifier">
                      {detail.optionQualifier}
                    </div>
                  </div>
                  <div className="modalOptionText">{detail.optionText}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalFooter">
          {selectedChoice === null && (
            <button
              className={`redButton2 ${
                canClick("Return Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                handleReturn();
                handleUpdateDemoGuide();
              }}
            >
              Return
            </button>
          )}

          {selectedChoice !== null && (
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
        </div>
      </div>
    </div>
  );
};

export default SelectTacticalActionSovereign;
