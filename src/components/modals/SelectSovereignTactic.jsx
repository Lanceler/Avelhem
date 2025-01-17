import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const SelectSovereignTactic = (props) => {
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

  let message = null;

  let abilityDetails = [];
  switch (face) {
    case "Advance":
      abilityDetails = [
        {
          abilityName: "Deploy Pawn",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Deploy a pawn in your frontier.
              </div>
              {/* <div className="abilityText ">
                ⬩
                {newGameState[self].bountyUpgrades.tactics < 1 && (
                  <>If upgraded: </>
                )}
                You may draw 1 Avelhem.
              </div> */}
            </>
          ),
        },
        {
          abilityName: "Convert Tactic",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 6 FD to gain an Assault tactic.
              </div>
            </>
          ),
        },
        {
          abilityName: "Deploy Scion",
          abilityQualifier: (
            <div className="abilityQualifier">
              {newGameState[self].bountyUpgrades.tactics < 3 && (
                <div style={{ fontSize: 20 }}>Must be unlocked</div>
              )}
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Float 1 skill to deploy a Scion in your frontier.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Mobilize":
      abilityDetails = [
        {
          abilityName: "Draw Skill",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 2 instances to draw 1 skill.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Assault":
    case "Null":
      abilityDetails = [
        {
          abilityName: "Null",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">No tactical actions available.</div>
            </>
          ),
        },
      ];
      break;

    case "Invoke":
      abilityDetails = [
        {
          abilityName: "Draw Avelhem",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">⬩Draw 3 Avelhems.</div>
            </>
          ),
        },
        {
          abilityName: "Draw Skill",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">⬩Draw 2 skills.</div>
            </>
          ),
        },
        {
          abilityName: "Defy Fate",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">⬩Gain 2 FD.</div>
              {/* <div className="abilityText ">⬩Draw 1 Avelhem.</div> */}
              <div className="abilityText ">
                ⬩You may recover 1 “Transcendence”.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Rally":
      abilityDetails = [
        {
          abilityName: "Deploy Pawn",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 1 instance to deploy a pawn in your frontier.
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

          // case 2:
          //   return newGameState[self].bountyUpgrades.tactics > 0;
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
              newGameState[self].fateDefiance + 2
            );

            //Recover Transcendence
            if (newGameState[self].skillVestige.includes("SX-01")) {
              newGameState.currentResolution.push({
                resolution: "Recover Skill",
                player: self,
                restriction: ["SX-01"],
                message: "You may recover 1 “Transcendence”",
                outcome: "Add",
                canSkip: true,
              });
            }

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
    // switch (demoGuide) {
    //   case "Learn1.35":
    //     return element1 === "Tactic" && element2 === 0;

    //   case "Learn1.36":
    //     return element1 === "Select Button";

    //   case "Learn1.38":
    //   case "Learn1.48":
    //   case "Learn1.116":
    //     return element1 === "Return Button";
    // }

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
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Tactical Action: {props.face}</div>
        </div>

        {message && <h3>{message}</h3>}
        <br />

        <div className="modalContent">
          {abilityDetails.map((detail, i) => (
            <div
              key={i}
              className={`modal-option-outline ${
                selectedChoice === i ? "selected-modal-option" : ""
              } ${canClick("Tactic", i) ? "demoClick" : ""}`}
              onClick={() => {
                handleChoice(i);
                handleUpdateDemoGuide();
              }}
            >
              <div
                className={`modal-option-content ${
                  canChoice(i) ? "" : "disabled-modal-option-content"
                } `}
              >
                <div className="modal-option-header">
                  <div className="modal-option-title ">
                    {detail.abilityName}
                  </div>

                  <div>{detail.abilityQualifier}</div>
                </div>
                <div className="modalChoiceText ">{detail.abilityText}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="modalBottomButton">
          {selectedChoice === null && (
            <button
              className={`redButton ${
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
              className={`redButton ${
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

export default SelectSovereignTactic;
