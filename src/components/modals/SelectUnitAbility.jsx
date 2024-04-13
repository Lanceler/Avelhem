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
import { useCardDatabase } from "../../hooks/useCardDatabase";

const SelectUnitAbility = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const {} = useCardDatabase();

  const { canStrike, getZonesWithAllies, getZonesWithEnemies, isDisrupted } =
    useRecurringEffects();

  let newGameState = JSON.parse(JSON.stringify(localGameState));
  let unit = props.unit;

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
              {" "}
              <span className="abilityQualifier">One-shot</span>{" "}
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
            <div className="abilityQualifier">
              <span className="abilityQualifier">One-shot {"\u00A0"}</span>
              <img src={MobilizeSmall} style={{ height: 35 }} />
              <img src={MobilizeSmall} style={{ height: 35 }} />
            </div>
          ),
          abilityText: (
            <>
              <div className="abilityText ">⬩Move to a zone 2 spaces away.</div>
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
      abilityDetails = [
        {
          abilityName: "Fortify",
          abilityQualifier: (
            <div className="abilityQualifier">
              <img src={AssaultSmall} style={{ height: 35 }} />
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
      abilityDetails = [
        {
          abilityName: "Galvanize",
          abilityQualifier: (
            <div className="abilityQualifier">
              <span className="abilityQualifier">One-shot</span>{" "}
              <img src={MobilizeSmall} style={{ height: 35 }} />
              <img src={MobilizeSmall} style={{ height: 35 }} />
            </div>
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
                ⬩Spend 3 Charges to inspect 3 skills; you may float 1 Lightning
                skill among them.
              </div>
              <div className="abilityText ">⬩You may traverse or strike.</div>
              <div className="abilityText ">
                ⬩If you chose to traverse, you may traverse again or strike.
              </div>
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
              <span className="abilityQualifier">One-shot</span>
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
    if (isDisrupted(unit, 2)) {
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
            // return to do
            break;
          case 1:
            return true; // to do
        }

      case "Land Scion":
        switch (i) {
          case 0:
            return true; // to do
        }

      case "Lightning Scion":
        switch (i) {
          case 0:
            return true; // to do
          case 1:
            return unit.charge >= 3;
        }

      case "Mana Scion":
        switch (i) {
          case 0:
            return getZonesWithEnemies(unit, 2).length > 0;
        }

      case "Metal Scion":
        switch (i) {
          case 0:
            return true;
        }

      case "Plant Scion":
        switch (i) {
          case 0:
            return (
              unit.blossom + newGameState[unit.player].skillHand.length >= 2
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
            resolution2: "Fire: Afterburner - select tactic",
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
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Water: Hydrotherapy - select tactic",
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
        } else if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Water: Cold Embrace - select tactic",
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
        break;

      case "Wind Scion":
        if (selectedChoice === 0) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Wind: Air Dash - select tactic",
            unit: unit,
            details: {
              title: "Air Dash",
              message: "Use 2 instances of 1 mobilize tactic.",
              restriction: ["Mobilize"],
              stock: 2,
              reason: "Air Dash",
              canSkip: "Return",
            },
          });
        } else if (selectedChoice === 1) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Wind: Reap the Whirlwind - select tactic",
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
          //
        }
        break;

      case "Lightning Scion":
        if (selectedChoice === 0) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Lightning: Galvanize - select tactic",
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
          //2nd choice
        }
        break;

      case "Mana Scion":
        if (selectedChoice === 0) {
          newGameState.currentResolution.push({
            resolution: "Unit Ability",
            resolution2: "Mana: Particle Beam - select tactic",
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
            resolution2: "Metal: Brandish - select tactic",
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
          //1st choice
        } else if (selectedChoice === 1) {
          //2nd choice
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

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="">
          <h2 className="choiceTitle">{unit.unitClass} Abilities</h2>
        </div>

        <div
          className={`${
            abilityDetails.length === 2 ? "twoColumn" : "oneAbility"
          }`}
        >
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

export default SelectUnitAbility;
