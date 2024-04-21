import React, { useState, useEffect } from "react";
import "./Modal.css";

import GoldFrame from "../../assets/others/GoldFrame.png";
import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const SelectSovereignTactic = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const { drawAvelhem, drawSkill } = useRecurringEffects();

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
            </>
          ),
        },
        {
          abilityName: "Convert Tactic",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 4 FD to gain an Assault tactic.
              </div>
            </>
          ),
        },
        {
          abilityName: "Deploy Scion",
          abilityQualifier: <div className="abilityQualifier"></div>,
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
          abilityName: "Reroll Tactic",
          abilityQualifier: (
            <div className="abilityQualifier">
              {newGameState[self].bountyUpgrades.tactics < 1 && (
                <>Available after upgrading via Bounty Phase.</>
              )}
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Reroll this tactic. <br />
                If the result is{" "}
                <img src={InvokeSmall} style={{ height: 21 }} />, convert it to{" "}
                <img src={AssaultSmall} style={{ height: 21 }} />.
              </div>
              <div className="abilityText ">⬩Gain 1 FD.</div>
              <div className="abilityText ">
                ⬩You may recover 1 “Transcendence”.
              </div>
            </>
          ),
        },
      ];
      break;
  }

  const canChoice = (i) => {
    switch (face) {
      case "Advance":
        switch (i) {
          case 0:
            break;
          case 1:
            break;
        }
        break;

      case "Assault":
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
    newGameState.currentResolution.pop();

    newGameState.tactics[props.dice].stock -= 1;

    switch (face) {
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
            //reroll tactic

            const rerollInvoke = () => {
              const mobilizeLimit =
                newGameState[self].bountyUpgrades.tactics > 2 ? 4 : 3;

              const dieFaces = [
                { face: "Advance", stock: 1, limit: 1 },
                { face: "Advance", stock: 1, limit: 1 },
                {
                  face: "Mobilize",
                  stock: mobilizeLimit,
                  limit: mobilizeLimit,
                },
                {
                  face: "Mobilize",
                  stock: mobilizeLimit,
                  limit: mobilizeLimit,
                },
                { face: "Assault", stock: 1, limit: 1 },

                //   { face: "Invoke", stock: 1, limit: 1 }, // replaced with 2nd Assault
                { face: "Assault", stock: 1, limit: 1 },
              ];

              return dieFaces[Math.floor(Math.random() * dieFaces.length)];
            };

            newGameState.tactics[props.dice] = rerollInvoke();

            newGameState[self].fateDefiances = Math.min(
              6,
              newGameState[self].fateDefiances + 1
            );

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
    }

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleReturn = () => {
    newGameState.currentResolution.pop();
    dispatch(updateState(newGameState));
  };

  let modalColumn = "oneAbility";
  let modalClass = "singleAbilityModal";

  switch (abilityDetails.length) {
    case 2:
      modalColumn = "twoColumn";
      modalClass = "dualAbilityModal";
      break;

    case 3:
      modalColumn = "threeColumn";
      modalClass = "";
      break;
  }

  return (
    <div className="modal-backdrop">
      <div className={`modal ${modalClass}`}>
        <div className="">
          <h2 className="choiceTitle">Tactical Action</h2>
        </div>

        {message && <h4>{message}</h4>}

        <div className={modalColumn}>
          {abilityDetails.map((detail, i) => (
            <div
              key={i}
              className={`customChoice ${
                selectedChoice === i ? "selectedChoice" : ""
              } `}
              style={{ backgroundImage: `url(${GoldFrame})` }}
              onClick={() => handleChoice(i)}
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
                <div className="abilityContent scroll">
                  {detail.abilityText}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedChoice === null && (
          <button className="choiceButton" onClick={() => handleReturn()}>
            Return
          </button>
        )}

        {selectedChoice !== null && (
          <button className="choiceButton" onClick={() => handleSelect()}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectSovereignTactic;
