import React, { useState, useEffect } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";
import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const SelectSovereignTactic = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

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
          abilityQualifier: (
            <div className="abilityQualifier">
              {newGameState[self].bountyUpgrades.tactics < 2 && (
                <div style={{ fontSize: 18 }}>
                  {/* Can be upgraded <br /> via Bounty Phase <br /> (2nd Tactics). */}
                </div>
              )}
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Deploy a pawn in your frontier.
              </div>
              <div className="abilityText ">
                ⬩
                {newGameState[self].bountyUpgrades.tactics < 2 && (
                  <>If upgraded: </>
                )}
                You may draw 1 Avelhem.
              </div>
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
              {newGameState[self].bountyUpgrades.tactics < 4 && (
                <div style={{ fontSize: 18 }}>Available after upgrade.</div>
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
          abilityQualifier: (
            <div className="abilityQualifier">
              No tactical actions available.
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText "></div>
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
          abilityName: "Divine Invocation",
          abilityQualifier: (
            <div className="abilityQualifier">
              {newGameState[self].bountyUpgrades.tactics < 1 && (
                <div style={{ fontSize: 18 }}>Available after upgrade.</div>
              )}
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">⬩Gain 2 FD.</div>
              <div className="abilityText ">⬩Draw 1 Avelhem.</div>
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
            return newGameState[self].fateDefiances >= 6;
          case 2:
            return (
              newGameState[self].bountyUpgrades.tactics >= 4 &&
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
            return true;

          case 2:
            return newGameState[self].bountyUpgrades.tactics > 0;
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

            if (newGameState[self].bountyUpgrades.tactics >= 2) {
              newGameState.currentResolution.push({
                resolution: "Misc.",
                resolution2: "Advance Avelhem Draw",
                player: self,
                details: {
                  reason: "Advance Avelhem Draw",
                  title: "Advance Tactic",
                  message: "You may draw 1 Avelhem.",
                  no: "Skip",
                  yes: "Draw",
                },
              });
            }

            newGameState.currentResolution.push({
              resolution: "Deploying Pawn",
              zoneIds: getVacantFrontier(),
              dice: props.dice,
            });
            break;

          case 1:
            newGameState[self].fateDefiances -= 6;

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
            newGameState[self].fateDefiances = Math.min(
              6,
              newGameState[self].fateDefiances + 2
            );

            //Draw 1 Avelhem
            newGameState = drawAvelhem(newGameState);

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
            //NERFED: no longer rerolls
            //reroll tactic
            // const rerollInvoke = () => {
            //   const mobilizeLimit =
            //     newGameState[self].bountyUpgrades.tactics > 2 ? 4 : 3;

            //   const dieFaces = [
            //     { face: "Advance", stock: 1, limit: 1 },
            //     { face: "Advance", stock: 1, limit: 1 },
            //     {
            //       face: "Mobilize",
            //       stock: mobilizeLimit,
            //       limit: mobilizeLimit,
            //     },
            //     {
            //       face: "Mobilize",
            //       stock: mobilizeLimit,
            //       limit: mobilizeLimit,
            //     },
            //     {
            //       face: "Mobilize",
            //       stock: mobilizeLimit,
            //       limit: mobilizeLimit,
            //     },

            //     //   { face: "Invoke", stock: 1, limit: 1 }, // replaced with 2nd Assault
            //     { face: "Assault", stock: 1, limit: 1 },
            //   ];

            //   return dieFaces[Math.floor(Math.random() * dieFaces.length)];
            // };

            // newGameState.tactics[props.dice] = rerollInvoke();

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

  // let modalColumn = "oneAbility";
  // let modalClass = "singleAbilityModal";

  // switch (abilityDetails.length) {
  //   case 2:
  //     modalColumn = "twoColumn";
  //     modalClass = "dualAbilityModal";
  //     break;

  //   case 3:
  //     modalColumn = "threeColumn";
  //     modalClass = "";
  //     break;
  // }

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.35":
        return element === "Tactic" && element2 === 0;

      case "Learn1.36":
        return element === "Select Button";

      case "Learn1.38":
      case "Learn1.48":
      case "Learn1.116":
        return element === "Return Button";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.35":
        dispatch(updateDemo("Learn1.36"));
        break;

      case "Learn1.36":
        dispatch(updateDemo("Learn1.37"));
        break;

      case "Learn1.38":
        dispatch(updateDemo("Learn1.39"));
        break;

      case "Learn1.48":
        dispatch(updateDemo("Learn1.49"));
        break;

      case "Learn1.116":
        dispatch(updateDemo("Learn1.117"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">Tactical Action: {props.face}</div>
        </div>

        {message && <h4>{message}</h4>}
        <br />

        <div className="modalContent">
          {abilityDetails.map((detail, i) => (
            <div
              key={i}
              className={`customChoice ${
                selectedChoice === i ? "selectedChoice" : ""
              } ${canClick("Tactic", i) ? "demoClick" : ""}`}
              style={{ backgroundImage: `url(${GoldFrame})` }}
              onClick={() => {
                handleChoice(i);
                handleUpdateDemoGuide();
              }}
            >
              <div
                // className="abilityFrame"
                className={`abilityFrame ${
                  canChoice(i) ? "" : "disabledAbility"
                } `}
              >
                <div className="abilityHeader">
                  <h3 className="abilityName ">{detail.abilityName}</h3>

                  <div>{detail.abilityQualifier}</div>
                </div>
                <div className="abilityContent scrollable">
                  {detail.abilityText}
                </div>
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
