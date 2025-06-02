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
    canBallisticArmor,
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

  let message = null;

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
        {
          optionName: "Fiery Heart",
          abilityQualifier: (
            <div className="abilityQualifier">
              <span className="abilityQualifier">
                <em>One-shot</em>
              </span>
            </div>
          ),
          optionText: (
            <>
              <div>
                ⬩Spend 1 skill to purge an adjacent ally’s Frost and Burn.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Water Scion":
      switch (unit.torrent) {
        case 2:
          message = `Torrent: The next 2 abilities you activate do not require a tactic.`;
          break;
        case 1:
          message = `Torrent: The next ability you activate does not require a tactic.`;
          break;
      }

      abilityDetails = [
        {
          optionName: "Hydrotherapy",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AdvanceSmall} style={{ height: 35 }} />
              {"\u00A0\u00A0or\u00A0\u00A0"}
              <img src={InvokeSmall} style={{ height: 35 }} />
            </div>
          ),
          optionText: (
            <>
              <div>
                ⬩Purge an adjacent ally’s turn-based afflictions (except
                Anathema).
              </div>
              <div>⬩You may float 1 skill to search for 1 “Healing Rain”.</div>
              <div>
                <br />
              </div>
            </>
          ),
        },
        {
          optionName: "Cold Embrace",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />
              {"\u00A0\u00A0or\u00A0\u00A0"}
              <img src={InvokeSmall} style={{ height: 35 }} />
            </div>
          ),
          optionText: (
            <>
              <div>
                ⬩Strike a frozen foe or freeze an adjacent foe for 2 turns.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Wind Scion":
      abilityDetails = [
        {
          optionName: "Air Dash",
          abilityQualifier: (
            <>
              <div className="modal-option-oneshot">
                <em>One-shot</em>
              </div>
              <div className="abilityQualifier">
                <img src={MobilizeSmall} style={{ height: 30 }} />
                <img src={MobilizeSmall} style={{ height: 30 }} />
                <img src={MobilizeSmall} style={{ height: 30 }} />
              </div>
            </>
          ),
          optionText: (
            <>
              <div>⬩Move to a zone 2 spaces away.</div>
            </>
          ),
        },
        {
          optionName: "Reap the Whirlwind",
          abilityQualifier: (
            <div className="modal-option-oneshot">
              {/* <em>One-shot</em> */}
            </div>
          ),
          optionText: (
            <>
              <div>
                ⬩Float 1 Wind skill and spend 2 Cyclones to blast an adjacent
                foe.
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
      if (unit.boosts.valiantSpark) {
        message = `Valiant Spark boost: You can activate Arc Flash without using a tactic. `;
      }

      abilityDetails = [
        {
          optionName: "Galvanize",
          abilityQualifier: (
            <>
              <div className="abilityQualifier">
                <span className="">
                  <em>One-shot</em>
                </span>
              </div>
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
          optionName: "Particle Beam",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />
            </div>
          ),
          optionText: (
            <>
              <div>⬩Spend 1 skill to blast a foe within 2 spaces.</div>
            </>
          ),
        },
        {
          optionName: "Amplify Aura",
          abilityQualifier: (
            <div className="abilityQualifier">
              <span className="abilityQualifier">
                <em>One-shot</em>
              </span>
            </div>
          ),
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
          optionName: "Brandish",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={InvokeSmall} style={{ height: 35 }} />
            </div>
          ),
          optionText: (
            <>
              <div>⬩Search for 1 “Frenzy Blade”.</div>
              <div>⬩Draw 1 skill or restore your Aether.</div>
            </>
          ),
        },
        {
          optionName: "Ballistic Armor",
          abilityQualifier: (
            <div className="abilityQualifier">
              <span className="abilityQualifier">
                <em>One-shot</em>
              </span>
            </div>
          ),
          optionText: (
            <>
              <div>
                ⬩Spend 1 skill and either 2 turns of Shield or 2 turns of Ward
                to blast an adjacent foe.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Plant Scion":
      abilityDetails = [
        {
          optionName: "Flourish",
          abilityQualifier: (
            <div className="abilityQualifier">
              <span className="abilityQualifier">
                <em>One-shot</em>
              </span>
            </div>
          ),
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
    if (isMuted(unit) || isDisrupted(unit, 2)) {
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
          case 1:
            return (
              !unit.temporary.usedFieryHeart &&
              (newGameState[unit.player].skillHand.length > 0 ||
                unit.ember >= 2) &&
              getZonesWithAllies(unit, 1, false).length > 0
            );
        }

      case "Water Scion":
        switch (i) {
          case 0:
            return getZonesWithAllies(unit, 1, false).length > 0;
          case 1:
            return getZonesWithEnemies(unit, 1).length > 0;
        }

      case "Wind Scion":
        switch (i) {
          case 0:
            return (
              getVacant2SpaceZones(unit).length > 0 &&
              !unit.temporary.usedAirDash
            );
          case 1:
            return (
              unit.cyclone > 1 &&
              ["03-01", "03-02", "03-03", "03-04"].some((s) =>
                newGameState[unit.player].skillHand.includes(s)
              ) &&
              getZonesWithEnemies(unit, 1).length > 0
            );
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
            return !unit.temporary.usedGalvanize;
          case 1:
            return unit.charge >= 3;
        }

      case "Mana Scion":
        switch (i) {
          case 0:
            return (
              getZonesWithEnemies(unit, 2).length > 0 &&
              newGameState[unit.player].skillHand.length > 0
            );
          case 1:
            return !unit.temporary.usedAmplifyAura && canAmplifyAura(unit);
        }

      case "Metal Scion":
        switch (i) {
          case 0:
            return true;
          case 1:
            return (
              !unit.temporary.usedBallisticArmor &&
              newGameState[unit.player].skillHand.length > 0 &&
              canBallisticArmor(unit)
            );
        }

      case "Plant Scion":
        switch (i) {
          case 0:
            return (
              !unit.temporary.usedFlourish &&
              (unit.blossom
                ? unit.blossom + newGameState[unit.player].skillHand.length >= 2
                : newGameState[unit.player].skillHand.length >= 2)
            );
          case 1:
            return unit.blossom >= 1;
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
        } else if (selectedChoice === 1) {
          updateData = true;
          newGameState.activatingSkill.push("FieryHeart");
          newGameState.activatingUnit.push(unit);

          newGameState.currentResolution.push({
            resolution: "Tactic End",
            unit: unit,
            effect: true,
          });

          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Activating Fiery Heart",
            unit: unit,
          });

          newGameState = animationDelay(newGameState, self);

          break;
        }
        break;

      case "Water Scion":
        if (selectedChoice === 0) {
          if (unit.torrent > 0) {
            unit.torrent -= 1;
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

            newGameState = animationDelay(newGameState, self);
          } else {
            newGameState.currentResolution.push({
              resolution: "Unit Ability",
              resolution2: "Ability - select tactic",
              unit: unit,
              details: {
                title: "Hydrotherapy",
                message: "Use an Advance or Invoke tactic.",
                restriction: ["Advance", "Invoke"],
                stock: 1,
                reason: "Hydrotherapy",
                canSkip: "Return",
              },
            });
          }
        } else if (selectedChoice === 1) {
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
                restriction: ["Assault", "Invoke"],
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
              title: "Air Dash",
              message: "Use 3 instances of 1 mobilize tactic.",
              restriction: ["Mobilize"],
              stock: 3,
              reason: "Air Dash",
              canSkip: "Return",
            },
          });
        } else if (selectedChoice === 1) {
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
          if (unit.boosts.valiantSpark) {
            delete unit.boosts.valiantSpark;
            //newGameState[unit.player].units[unit.unitIndex] = unit;

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
          } else {
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
        }
        break;

      case "Mana Scion":
        if (selectedChoice === 0) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Ability - select tactic",
            unit: unit,
            details: {
              title: "Particle Beam",
              message: "Use an Assault tactic.",
              restriction: ["Assault"],
              stock: 1,
              reason: "Particle Beam",
              canSkip: "Return",
            },
          });
        } else if (selectedChoice === 1) {
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
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Ability - select tactic",
            unit: unit,
            details: {
              title: "Brandish",
              message: "Use an Invoke tactic.",
              restriction: ["Invoke"],
              stock: 1,
              reason: "Brandish",
              canSkip: "Return",
            },
          });
        } else if (selectedChoice === 1) {
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
          case 90:
            return element2 === 1;

          case 91:
            return element1 === "Select Button";

          ///////////////////////////////
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 90:
          case 91:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalV2">
        <div className="modalHeader2">
          <div className="modalTitle2">{unit.unitClass} Abilities</div>
        </div>

        <div className="modalContent2">
          <div className="modalContentText">{message}</div>

          <div className="modalContent2Column">
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
