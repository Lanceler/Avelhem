import React, { useState } from "react";
import "./Modal2.scss";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SelectUnitAbility = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const {} = useCardDatabase();

  const {
    animationDelay,
    canAmplifyAura,
    canStrike,
    getVacant2SpaceZones,
    getZonesWithAllies,
    getZonesWithEnemies,
    isDisrupted,
    isMuted,
  } = useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = newGameState[props.unit.player].units[props.unit.unitIndex];

  let updateLocal = true;
  let updateData = false;

  let message = "Units can activate their ability up to once per turn.";

  let abilityDetails = [];
  switch (unit.unitClass) {
    case "Fire Scion":
      abilityDetails = [
        {
          optionName: "Afterburner",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={InvokeSmall} style={{ height: 35 }} />
            </div>
          ),
          optionText: (
            <>
              <div>⬩Spend 1 skill to strike.</div>
            </>
          ),
        },
      ];
      break;

    case "Water Scion":
      message =
        "Clear as Crystal: You can activate your ability more than once per turn.";
      switch (unit.torrent) {
        case 2:
          message =
            message +
            " (Torrent: Your ability’s next 2 activations do not require tactics.";
          break;
        case 1:
          message =
            message +
            " (Torrent: Your ability’s next activation does not require a tactic.";
          break;
      }

      abilityDetails = [
        {
          optionName: "Cold Embrace",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AdvanceSmall} style={{ height: 35 }} />
              {"\u00A0\u00A0or\u00A0\u00A0"}
              <img src={AssaultSmall} style={{ height: 35 }} />
            </div>
          ),
          optionText: (
            <>
              <div>⬩Strike a frozen foe or freeze an adjacent foe.</div>
            </>
          ),
        },
      ];
      break;

    case "Wind Scion":
      abilityDetails = [
        {
          optionName: "Reap the Whirlwind",
          abilityQualifier: (
            <>
              <div className="abilityQualifier">
                <img src={MobilizeSmall} style={{ height: 30 }} />
                <img src={MobilizeSmall} style={{ height: 30 }} />
                <img src={MobilizeSmall} style={{ height: 30 }} />
              </div>
            </>
          ),
          optionText: (
            <>
              <div>⬩Move to a zone within 2 spaces.</div>
              <div>
                ⬩You may spend 2 Cyclones to restore your Aether or Aether-blast
                an adjacent foe.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Land Scion":
      if (unit.aftershock === 2) {
        message = `You may spend 2 Aftershocks to use an Advance tactic to activate your abilities.`;
      }

      abilityDetails = [
        {
          optionName: "Fortify",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />{" "}
            </div>
          ),
          optionText: (
            <>
              <div>⬩Gain Shield for 2 turns.</div>
              <div>⬩You may float 1 skill to traverse or strike.</div>
            </>
          ),
        },
        {
          optionName: "Leyline Convergence",
          abilityQualifier: (
            <>
              <div className="abilityQualifier"></div>
              <div className="abilityQualifier">
                <img src={MobilizeSmall} style={{ height: 30 }} />
                <img src={MobilizeSmall} style={{ height: 30 }} />
                <img src={MobilizeSmall} style={{ height: 30 }} />
              </div>
            </>
          ),
          optionText: (
            <>
              <div>⬩Restore your Aether.</div>
              <div>⬩You may traverse.</div>
            </>
          ),
        },
      ];
      break;

    case "Lightning Scion":
      abilityDetails = [
        {
          optionName: "Galvanize",
          abilityQualifier: (
            <>
              <div className="abilityQualifier"></div>
              <div className="abilityQualifier">
                <img src={MobilizeSmall} style={{ height: 30 }} />
                <img src={MobilizeSmall} style={{ height: 30 }} />
              </div>
            </>
          ),
          optionText: (
            <>
              <div>⬩Gain 1 Charge.</div>
              <div>⬩You may traverse.</div>
            </>
          ),
        },
        {
          optionName: "Arc Flash",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />
            </div>
          ),
          optionText: (
            <>
              <div>
                ⬩Spend 3 Charges to search for then float 1 Lightning skill.
              </div>
              <div>⬩You may traverse.</div>
              <div>⬩You may traverse or strike.</div>
              <div>
                <br />
              </div>
            </>
          ),
        },
      ];
      break;

    case "Mana Scion":
      abilityDetails = [
        {
          optionName: "Amplify Aura",
          abilityQualifier: <div className="abilityQualifier"></div>,
          optionText: (
            <>
              <div>
                ⬩Convert your or an adjacent ally’s Aether into Shield for 2
                turns.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Metal Scion":
      abilityDetails = [
        {
          optionName: "Ballistic Armor",
          abilityQualifier: <div className="abilityQualifier"></div>,
          optionText: (
            <>
              <div>⬩Spend your Shield or Ward to restore your Aether.</div>
              <div>⬩You may float 1 skill to Aether-blast an adjacent foe.</div>
            </>
          ),
        },
      ];
      break;

    case "Plant Scion":
      message =
        "Flora’s Reverence: You can activate your abilities more than once per turn.";
      abilityDetails = [
        {
          optionName: "Flourish",
          abilityQualifier: <div className="abilityQualifier"></div>,
          optionText: (
            <>
              <div>
                ⬩Spend 2 skills to restore your Aether and gain Overgrowth.
              </div>
            </>
          ),
        },
        {
          optionName: "Ambrosia",
          abilityQualifier: <div className="abilityQualifier"></div>,
          optionText: (
            <>
              <div>
                ⬩Spend 1 Blossom to purge your or an adjacent ally’s afflictions
                (except Root and Anathema).
              </div>
            </>
          ),
        },
      ];
      break;
  }

  const canChoice = (i) => {
    if (isMuted(unit) || isDisrupted(unit, 1)) {
      return false;
    }

    if (unit.temporary.usedFirstAbility && i === 0) {
      return false;
    }

    if (unit.temporary.usedSecondAbility && i === 1) {
      return false;
    }

    switch (unit.unitClass) {
      // case "Template":
      //   switch (i) {
      //     case 0:
      //       return false;
      //   }

      case "Fire Scion":
        switch (i) {
          case 0:
            return (
              canStrike(unit) &&
              (newGameState[unit.player].skillHand.length > 0 ||
                unit.ember >= 2)
            );
        }

      case "Water Scion":
        switch (i) {
          case 0:
            return getZonesWithEnemies(unit, 1).length > 0;
        }

      case "Wind Scion":
        switch (i) {
          case 0:
            return getVacant2SpaceZones(unit).length > 0;
        }

      case "Land Scion":
        switch (i) {
          case 0:
          case 1:
            return true;
        }

      case "Lightning Scion":
        switch (i) {
          case 0:
            return true;
          case 1:
            return unit.charge >= 3;
        }

      case "Mana Scion":
        switch (i) {
          case 0:
            return canAmplifyAura(unit);
        }

      case "Metal Scion":
        switch (i) {
          case 0:
            return unit.enhancements.shield > 0 || unit.enhancements.ward > 0;
        }

      case "Plant Scion":
        switch (i) {
          case 0:
            return (
              newGameState[unit.player].skillHand.length > 1 ||
              (newGameState[unit.player].skillHand.length === 1 &&
                unit.blossom > 1)
            );
          case 1:
            return unit.blossom > 0;
        }
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

    switch (unit.unitClass) {
      // case "TEMPLATE":
      //   if (selectedChoice === 1) {
      //     //1st choice
      //   } else {
      //     //2nd choice
      //   }
      //   break;

      case "Fire Scion":
        if (selectedChoice === 0) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Ability - select tactic",
            unit: unit,
            details: {
              title: "Afterburner",
              message: "Use an Invoke tactic.",
              restriction: ["Invoke"],
              stock: 1,
              reason: "Afterburner",
              canSkip: "Return",
            },
          });
        }
        break;

      case "Water Scion":
        if (selectedChoice === 0) {
          if (unit.torrent > 0) {
            unit.torrent -= 1;

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
          } else {
            newGameState.currentResolution.push({
              resolution: "Unit Ability",
              resolution2: "Ability - select tactic",
              unit: unit,
              details: {
                title: "Cold Embrace",
                message: "Use an Assault, or Invoke tactic.",
                restriction: ["Advance", "Assault"],
                stock: 1,
                reason: "Cold Embrace",
                canSkip: "Return",
              },
            });
          }
        }
        break;

      case "Wind Scion":
        if (selectedChoice === 0) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Ability - select tactic",
            unit: unit,
            details: {
              title: "Reap the Whirlwind",
              message: "Use 3 instances of 1 mobilize tactic.",
              restriction: ["Mobilize"],
              stock: 3,
              reason: "Reap the Whirlwind",
              canSkip: "Return",
            },
          });
        }

        break;

      case "Land Scion":
        if (selectedChoice === 0) {
          const fortifyMessage =
            unit.aftershock === 2
              ? "Use an Assault or Advance tactic."
              : "Use an Assault tactic.";

          const fortifyRestriction =
            unit.aftershock === 2 ? ["Assault", "Advance"] : ["Assault"];

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Ability - select tactic",
            unit: unit,
            details: {
              title: "Fortify",
              message: fortifyMessage,
              restriction: fortifyRestriction,
              stock: 1,
              reason: "Fortify",
              canSkip: "Return",
            },
          });
        } else if (selectedChoice === 1) {
          const leylineConvergenceMessage =
            unit.aftershock === 2
              ? "Use an Advance tactic or 3 instances of Mobilize."
              : "Use 3 instances of Mobilize.";

          const leylineConvergenceRestriction =
            unit.aftershock === 2 ? ["Mobilize", "Advance"] : ["Mobilize"];

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Ability - select tactic",
            unit: unit,
            details: {
              title: "Leyline Convergence",
              message: leylineConvergenceMessage,
              restriction: leylineConvergenceRestriction,
              stock: 3,
              reason: "Leyline Convergence",
              canSkip: "Return",
            },
          });
        }
        break;

      case "Lightning Scion":
        if (selectedChoice === 0) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Ability - select tactic",
            unit: unit,
            details: {
              title: "Galvanize",
              message: "Use 2 instances of 1 mobilize tactic.",
              restriction: ["Mobilize"],
              stock: 2,
              reason: "Galvanize",
              canSkip: "Return",
            },
          });
        } else if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Ability - select tactic",
            unit: unit,
            details: {
              title: "Arc Flash",
              message: "Use an Assault tactic.",
              restriction: ["Assault"],
              stock: 1,
              reason: "Arc Flash",
              canSkip: "Return",
            },
          });
        }
        break;

      case "Mana Scion":
        if (selectedChoice === 0) {
          updateData = true;
          newGameState.activatingSkill.push("AmplifyAura");
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
            effect: true,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Activating Amplify Aura",
            unit: unit,
          });

          newGameState = animationDelay(newGameState, self);
        }
        break;

      case "Metal Scion":
        if (selectedChoice === 0) {
          updateData = true;
          newGameState.activatingSkill.push("BallisticArmor");
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
            effect: true,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Activating Ballistic Armor",
            unit: unit,
          });

          newGameState = animationDelay(newGameState, self);
        }
        break;

      case "Plant Scion":
        if (selectedChoice === 0) {
          updateData = true;
          newGameState.activatingSkill.push("Flourish");
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
            effect: true,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Activating Flourish",
            unit: unit,
          });

          newGameState = animationDelay(newGameState, self);
        } else if (selectedChoice === 1) {
          updateData = true;
          newGameState.activatingSkill.push("Ambrosia");
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
            effect: true,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Activating Ambrosia",
            unit: unit,
          });

          newGameState = animationDelay(newGameState, self);
        }
        break;

      //
    }

    if (updateLocal) {
      dispatch(updateState(newGameState));
    }

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
          case 74:
            return element2 === 0;

          case 75:
            return element1 === "Select Button";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 74:
          case 75:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{unit.unitClass} Ability</div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{message}</div>

          <div className="modalContent1Column">
            {abilityDetails.map((detail, i) => (
              <div
                key={i}
                // className={`modal-option-outline ${
                //   selectedChoice === i ? "selected-modal-option" : ""
                // } ${canClick("Ability", i) ? "demoClick" : ""}`}
                className={`
                  modalOptionOutline
                  modalMediumOptionOutline ${
                    selectedChoice === i
                      ? "modalMediumOptionOutlineSelected"
                      : ""
                  }`}
                onClick={() => {
                  handleChoice(i);
                  handleUpdateDemoGuide();
                }}
              >
                <div
                  // className={`modal-option-content ${
                  //   canChoice(i) ? "" : "disabled-modal-option-content"
                  // } `}

                  className={`modalMedium
                    ${canChoice(i) ? "" : "disabledModal"} 
                    ${canClick("Ability", i) ? "demoClick" : ""}
                    `}
                  style={{
                    boxShadow: selectedChoice === i ? "none" : "",
                  }}
                >
                  <div className="modal-option-header modal-option-header-ability">
                    <div
                      className="modalOptionTitle"
                      style={
                        detail.optionName === "Reap the Whirlwind"
                          ? { fontSize: 28 }
                          : {}
                      }
                    >
                      {detail.optionName}
                    </div>

                    <div>{detail.abilityQualifier}</div>
                  </div>
                  <div className="modalOptionText">{detail.optionText}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modalBottomButton">
          {selectedChoice === null && (
            <button className="redButton" onClick={() => handleReturn()}>
              Return
            </button>
          )}

          {selectedChoice !== null && (
            <button
              className={`redButton ${
                canClick("Select Button") ? "demoClick" : ""
              }`}
              onClick={() => {
                {
                  handleSelect();
                  handleUpdateDemoGuide();
                }
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

export default SelectUnitAbility;
