import React, { useState } from "react";
import "./Modal2.scss";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";

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
          optionQualifier: (
            <div>
              {newGameState[self].bountyUpgrades.tactics < 3 && (
                <div>Must be unlocked</div>
              )}
            </div>
          ),
          optionText: (
            <>
              <div className="">
                ⬩Spend 3 DP to reroll this tactic to{" "}
                <img src={AssaultSmall} style={{ height: 21 }} />.
              </div>
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
                ⬩Float 1 skill to deploy a Scion in your frontier. (Activate
                their “Upon Ascension” talent, if any.)
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
              <div className="">⬩You may draw 1 Avelhem.</div>
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
      ];
      break;

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
            return (
              newGameState[self].bountyUpgrades.tactics >= 2 &&
              newGameState[self].defiancePoints >= 2
            );
          // case 2:
          //   return (
          //     newGameState[self].bountyUpgrades.tactics >= 3 &&
          //     canDeploy() &&
          //     newGameState[self].skillHand.length > 0
          //   );
        }
        break;

      case "Mobilize":
        switch (i) {
          case 0:
            return newGameState.tactics[props.dice].stock >= 2;
        }

      case "Assault":
        switch (i) {
          case 0:
            return canDeploy();
        }
        break;

      case "Null":
        switch (i) {
          case 0:
            return false;
        }
        break;

      case "Invoke":
        switch (i) {
          case 0:
          case 1:
            return true;
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
      ["Advance", "Assault"].includes(face) && selectedChoice === 0;

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
            newGameState[self].defiancePoints -= 3;

            //Gain assault command
            newGameState.tactics[props.dice].stock += 1;
            newGameState.tactics[props.dice].face = "Assault";
            break;

          // case 2:
          //   //refund stock
          //   newGameState.tactics[props.dice].stock += 1;

          //   newGameState.currentResolution.push({
          //     resolution: "Misc.",
          //     resolution2: "Advance Deploy Scion: Choose Element",
          //     player: self,
          //     details: {
          //       reason: "Advance Deploy Scion",
          //       title: "Deploy Scion",
          //       tactic: props.dice,
          //       message: "Deploy a Scion; choose their class.",
          //     },
          //   });
          //   break;
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

      case "Assault":
        switch (selectedChoice) {
          case 0:
            updateData = false;

            newGameState.currentResolution.push({
              resolution: "Deploying Pawn",
              zoneIds: getVacantFrontier(),
              dice: props.dice,
              assault: true,
            });
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
          case 40:
          case 46:
            return element2 === 0;

          case 41:
          case 47:
            return element1 === "Select Button";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 40:
          case 41:
          case 46:
          case 47:
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
