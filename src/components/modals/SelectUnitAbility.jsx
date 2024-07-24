import React, { useState, useEffect } from "react";
import "./Modal.css";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SelectUnitAbility = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const {} = useCardDatabase();

  const {
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
          abilityName: "Afterburner",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={InvokeSmall} style={{ height: 35 }} />
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 2 Fevers or 1 skill to strike.
              </div>
            </>
          ),
        },
        {
          abilityName: "Fiery Heart",
          abilityQualifier: (
            <div className="abilityQualifier">
              <span className="abilityQualifier">
                <em>One-shot</em>
              </span>
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 1 Fever or 1 skill to purge an adjacent ally’s Frostbite
                and Burn.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Water Scion":
      switch (unit.boosts.glacialTorrent) {
        case 2:
          message = `Glacial Torrent boost: The next 2 abilities you activate do not require a tactic. `;
          break;
        case 1:
          message = `Glacial Torrent boost: The next ability you activate does not require a tactic. `;
          break;
      }

      abilityDetails = [
        {
          abilityName: "Hydrotherapy",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AdvanceSmall} style={{ height: 35 }} />
              {"\u00A0\u00A0or\u00A0\u00A0"}
              <img src={AssaultSmall} style={{ height: 35 }} />
              {"\u00A0\u00A0or\u00A0\u00A0"}
              <img src={InvokeSmall} style={{ height: 35 }} />
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Purge an adjacent ally’s Paralysis, Frostbite, and Burn.
              </div>
            </>
          ),
        },
        {
          abilityName: "Cold Embrace",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />
              {"\u00A0\u00A0or\u00A0\u00A0"}
              <img src={InvokeSmall} style={{ height: 35 }} />
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Strike a frostbitten enemy or freeze an adjacent enemy for 2
                turns.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Wind Scion":
      abilityDetails = [
        {
          abilityName: "Air Dash",
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
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Move to a zone 2 spaces away (bypass motion contingent skills).
              </div>
            </>
          ),
        },
        {
          abilityName: "Reap the Whirlwind",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Search for 1 “Gale Conjuration”.
              </div>
              <div className="abilityText ">
                ⬩You may traverse or blast an adjacent enemy.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Land Scion":
      if (unit.boosts.mountainStance) {
        message = `Mountain Stance boost: You can use an Invoke tactic to activate Fortify.`;
      }

      abilityDetails = [
        {
          abilityName: "Fortify",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />{" "}
              {unit.boosts.mountainStance && (
                <span>
                  {"\u00A0\u00A0or\u00A0\u00A0"}
                  <img src={InvokeSmall} style={{ height: 35 }} />
                </span>
              )}
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">⬩Gain Shield for 2 turns.</div>
              <div className="abilityText ">
                ⬩You may float 1 skill to traverse or strike.
              </div>
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
          abilityName: "Galvanize",
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
          abilityText: (
            <>
              <div className="abilityText ">⬩Gain 1 Charge (Max. 3).</div>
              <div className="abilityText ">⬩You may traverse.</div>
            </>
          ),
        },
        {
          abilityName: "Arc Flash",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 3 Charges to search for then float 1 Lightning skill.
              </div>
              <div className="abilityText ">⬩You may traverse.</div>
              <div className="abilityText ">⬩You may traverse or strike.</div>
            </>
          ),
        },
      ];
      break;

    case "Mana Scion":
      abilityDetails = [
        {
          abilityName: "Particle Beam",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 1 skill to blast (2 AP) an enemy within 2 spaces.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Metal Scion":
      abilityDetails = [
        {
          abilityName: "Brandish",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={InvokeSmall} style={{ height: 35 }} />
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">⬩Search for 1 “Frenzy Blade”.</div>
              <div className="abilityText ">
                ⬩Draw 1 skill or restore your Virtue.
              </div>
            </>
          ),
        },
      ];
      break;

    case "Plant Scion":
      abilityDetails = [
        {
          abilityName: "Flourish",
          abilityQualifier: (
            <div className="abilityQualifier">
              <span className="abilityQualifier">
                <em>One-shot</em>
              </span>
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 2 skills to restore your Virtue and gain Overgrowth.
              </div>
            </>
          ),
        },
        {
          abilityName: "Ambrosia",
          abilityQualifier: <div className="abilityQualifier"></div>,
          abilityText: (
            <>
              <div className="abilityText ">
                ⬩Spend 1 Blossom to purge your or an adjacent ally’s Paralysis,
                Frostbite, and Burn.
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
              (unit.fever >= 2 ||
                newGameState[unit.player].skillHand.length > 0)
            );
          case 1:
            return (
              !unit.temporary.usedFieryHeart &&
              (unit.fever >= 1 ||
                newGameState[unit.player].skillHand.length > 0) &&
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
            return true;
        }

      case "Land Scion":
        switch (i) {
          case 0:
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
        }

      case "Metal Scion":
        switch (i) {
          case 0:
            return true;
        }

      case "Plant Scion":
        switch (i) {
          case 0:
            return !unit.temporary.usedFlourish && unit.blossom
              ? unit.blossom + newGameState[unit.player].skillHand.length >= 2
              : newGameState[unit.player].skillHand.length >= 2;
          case 1:
            return unit.blossom >= 1 && !unit.temporary.usedFlourish;
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

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });

          break;
        }
        break;

      case "Water Scion":
        if (selectedChoice === 0) {
          if (unit.boosts.glacialTorrent > 0) {
            unit.boosts.glacialTorrent -= 1;
            newGameState[unit.player].units[unit.unitIndex] = unit;

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
          } else {
            newGameState.currentResolution.push({
              resolution: "Unit Ability",
              resolution2: "Ability - select tactic",
              unit: unit,
              details: {
                title: "Hydrotherapy",
                message: "Use an Advance, Assault, or Invoke tactic.",
                restriction: ["Advance", "Assault", "Invoke"],
                stock: 1,
                reason: "Hydrotherapy",
                canSkip: "Return",
              },
            });
          }
        } else if (selectedChoice === 1) {
          if (unit.boosts.glacialTorrent > 0) {
            unit.boosts.glacialTorrent -= 1;
            newGameState[unit.player].units[unit.unitIndex] = unit;

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
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Ability - select tactic",
            unit: unit,
            details: {
              title: "Reap the Whirlwind",
              message: "Use an Assault tactic.",
              restriction: ["Assault"],
              stock: 1,
              reason: "Reap the Whirlwind",
              canSkip: "Return",
            },
          });
        }
        break;

      case "Land Scion":
        if (selectedChoice === 0) {
          let fortifyMessage = "Use an Assault tactic.";
          let fortifyRestriction = ["Assault"];

          if (unit.boosts.mountainStance) {
            fortifyMessage = "Use an Assault or Invoke tactic.";
            fortifyRestriction = ["Assault", "Invoke"];
          }

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
            newGameState[unit.player].units[unit.unitIndex] = unit;

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

            newGameState.currentResolution.push({
              resolution: "Animation Delay",
              priority: self,
            });
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

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });
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

          newGameState.currentResolution.push({
            resolution: "Animation Delay",
            priority: self,
          });
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

  const handleViewBoard = () => {
    props.hideOrRevealModale();
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.122":
        return element2 === 0;

      case "Learn1.236":
      case "Learn1.243":
        return element2 === 1;

      case "Learn1.123":
      case "Learn1.237":
      case "Learn1.244":
        return element === "Select Button";

      ///////////////////////////////
      case "Fire1.9":
        switch (element) {
          case "Ability":
            return element2 === 1;
        }
        break;

      case "Fire1.10":
      case "Fire1.14":
        switch (element) {
          case "Select Button":
            return true;
        }
        break;

      case "Fire1.13":
        switch (element) {
          case "Ability":
            return element2 === 0;
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.122":
        dispatch(updateDemo("Learn1.123"));
        break;

      case "Learn1.236":
        dispatch(updateDemo("Learn1.237"));
        break;

      case "Learn1.237":
        dispatch(updateDemo("Learn1.238"));
        break;

      case "Learn1.243":
        dispatch(updateDemo("Learn1.244"));
        break;

      case "Learn1.244":
        dispatch(updateDemo("Learn1.245"));
        break;

      ////////////////////////
      case "Fire1.9":
        dispatch(updateDemo("Fire1.10"));
        break;

      case "Fire1.10":
        dispatch(updateDemo("Fire1.11"));
        break;

      case "Fire1.13":
        dispatch(updateDemo("Fire1.14"));
        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalTitle">{unit.unitClass} Abilities</div>
        </div>

        {message && <h3 style={{ maxWidth: 700 }}>{message}</h3>}
        <br />

        <div
          className={`${
            abilityDetails.length === 2 ? "twoColumn" : "oneAbility"
          } column-centered`}
        >
          {abilityDetails.map((detail, i) => (
            <div
              key={i}
              className={`modal-option-outline ${
                selectedChoice === i ? "selected-modal-option" : ""
              } ${canClick("Ability", i) ? "demoClick" : ""}`}
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
                <div className="modal-option-header modal-option-header-ability">
                  <div
                    className="modal-option-title"
                    style={
                      detail.abilityName === "Reap the Whirlwind"
                        ? { fontSize: 30 }
                        : {}
                    }
                  >
                    {detail.abilityName}
                  </div>

                  <div>{detail.abilityQualifier}</div>
                </div>
                <div className="modal-option-text scroll">
                  {detail.abilityText}
                </div>
              </div>
            </div>
          ))}
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
