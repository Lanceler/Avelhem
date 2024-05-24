import React from "react";
import "./Modal.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
const UnitInfo = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getElementImage } = useCardImageSwitch();

  const { isRooted } = useRecurringEffects();

  const unit = props.unit;

  const team = unit.player === self ? "Ally" : "Enemy";

  const handleCollapse = () => {
    props.setUnitInfor(null);
  };

  const abilities = () => {
    switch (unit.unitClass) {
      case "Pawn":
        return <p className="unitInfo-text-heading2">None.</p>;

      case "Fire Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Afterburner{" "}
              <span className="unitInfo-tactic-group">
                <img src={InvokeSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Spend 2 Fevers or 1 skill to strike.
            </p>

            <p className="unitInfo-text-heading2">2. Fiery Heart (One-shot)</p>
            <p className="unitInfo-text-desc">
              ⬩Spend 1 Fever or 1 skill to purge an adjacent ally’s Frostbite
              and Burn.
            </p>
          </>
        );

      case "Water Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Hydrotherapy{" "}
              <span className="unitInfo-tactic-group">
                <img src={AdvanceSmall} className="unitInfo-tactic-icon" />
                <img src={AssaultSmall} className="unitInfo-tactic-icon" />
                <img src={InvokeSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Purge an adjacent ally’s Paralysis, Frostbite, and Burn.
            </p>

            <p className="unitInfo-text-heading2">
              2. Cold Embrace{" "}
              <span className="unitInfo-tactic-group">
                <img src={AssaultSmall} className="unitInfo-tactic-icon" />
                <img src={InvokeSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc">
              ⬩Strike a frostbitten enemy or freeze an adjacent enemy for 2
              turns.
            </p>
          </>
        );

      case "Wind Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Air Dash (One-shot){" "}
              <span className="unitInfo-tactic-group">
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
              </span>
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Move to a zone 2 spaces away (bypass motion contingent skills).
            </p>

            <p className="unitInfo-text-heading2">
              2. Reap the Whirlwind{" "}
              <span className="unitInfo-tactic-group">
                <img src={AssaultSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc">
              ⬩Search for then float 1 “Gale Conjuration”.
            </p>
            <p className="unitInfo-text-desc">
              ⬩You may traverse or blast an adjacent enemy.
            </p>
          </>
        );

      case "Land Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Fortify{" "}
              <span className="unitInfo-tactic-group">
                <img src={AssaultSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc ">⬩Gain Shield for 2 turns.</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You may float 1 skill to traverse or strike.
            </p>
          </>
        );

      case "Lightning Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Galvanize (One-shot){" "}
              <span className="unitInfo-tactic-group">
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
              </span>
            </p>
            <p className="unitInfo-text-desc ">⬩Gain 1 Charge (Max. 3).</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You may traverse.
            </p>

            <p className="unitInfo-text-heading2">
              2. Arc Flash{" "}
              <span className="unitInfo-tactic-group">
                <img src={AssaultSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc">
              ⬩Spend 3 Charges to search for then float 1 non-burst Lightning
              skill.
            </p>
            <p className="unitInfo-text-desc">⬩You may traverse.</p>
            <p className="unitInfo-text-desc">⬩You may traverse or strike.</p>
          </>
        );

      case "Mana Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Particle Beam{" "}
              <span className="unitInfo-tactic-group">
                <img src={AssaultSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc ">
              ⬩Spend 1 skill to blast (2 AP) an enemy 2 spaces away.
            </p>
          </>
        );

      case "Metal Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Brandish{" "}
              <span className="unitInfo-tactic-group">
                <img src={AssaultSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc">⬩Search for 1 “Frenzy Blade”.</p>
            <p className="unitInfo-text-desc">
              ⬩Draw 1 skill or restore your Virtue.
            </p>
          </>
        );

      case "Plant Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Flourish (One-shot) </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Spend 2 skills to restore your Virtue and gain Overgrowth.
            </p>

            <p className="unitInfo-text-heading2">2. Ambrosia</p>
            <p className="unitInfo-text-desc">
              ⬩Spend 1 Blossom to purge your or an adjacent ally’s Paralysis,
              Burn, and Frostbite.
            </p>
          </>
        );
    }
  };

  return (
    <div className="modal-backdrop unitInfo-text">
      <div className="unitInfoModal">
        <div className="unitInfoHeader">
          <img
            src={getElementImage(unit.unitClass)}
            className="unitInfo-icon"
          />
          <h2 className="unitInfo-name">{`${unit.unitClass} (${team})`}</h2>
          <button
            className="collapseSelected unitInfo-close"
            onClick={() => handleCollapse()}
          >
            X
          </button>
        </div>

        <div className="unitInfo-Abilities-Attributes">
          <div className="unitInfo-Abilities scrollable">
            <p className="unitInfo-text-heading1">
              <u>
                <strong>Abilities</strong>
              </u>
            </p>
            <>{abilities()}</>
          </div>
          <div className="unitInfo-Attributes scrollable">
            <p className="unitInfo-text-heading1">
              <u>
                <strong>Attributes</strong>
              </u>
            </p>

            {!unit.enhancements.score && (
              <>
                <p className="unitInfo-text-heading2">HP: {unit.hp}</p>
                <p className="unitInfo-text-heading2">
                  Virtue: {unit.virtue ? "Present" : "Absent"}
                </p>
                {unit.fever && (
                  <p className="unitInfo-text-heading2">Fever: {unit.fever}</p>
                )}
                {unit.charge && (
                  <p className="unitInfo-text-heading2">
                    Charge: {unit.charge}
                  </p>
                )}
                {unit.sharpness && (
                  <p className="unitInfo-text-heading2">
                    Sharpness: {unit.sharpness}
                  </p>
                )}
                {unit.blossom && (
                  <p className="unitInfo-text-heading2">
                    Blossom: {unit.blossom}
                  </p>
                )}
              </>
            )}

            {unit.enhancements.score && (
              <>
                <p className="unitInfo-text-heading2">This unit has scored.</p>
              </>
            )}
          </div>
        </div>

        <div className="unitInfo-Talents-Statuses">
          <div className="unitInfo-Talents scrollable">
            <h3>Talents</h3>
          </div>
          <div className="unitInfo-Statuses scrollable">
            {(unit.enhancements.ravager ||
              unit.enhancements.ward ||
              unit.enhancements.shield ||
              unit.enhancements.disruption ||
              unit.enhancements.overgrowth ||
              unit.enhancements.proliferation) && (
              <>
                <p className="unitInfo-text-heading1">
                  <u>
                    <strong>Enhancements</strong>
                  </u>
                </p>

                {unit.enhancements.ravager && (
                  <>
                    <p className="unitInfo-text-heading2">Ravager</p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩Immune to Anathema.
                    </p>
                  </>
                )}

                {unit.enhancements.ward && (
                  <>
                    <p className="unitInfo-text-heading2">
                      Ward ({unit.enhancements.ward} turn
                      {unit.enhancements.ward > 1 ? "s" : ""})
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩Negates the next attack or targeting affliction, then
                      purges. (Applies before Shield.)
                    </p>
                  </>
                )}

                {unit.enhancements.shield && (
                  <>
                    <p className="unitInfo-text-heading2">
                      Shield ({unit.enhancements.shield} turn
                      {unit.enhancements.shield > 1 ? "s" : ""})
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩Negates the next attack, then purges.
                    </p>
                  </>
                )}

                {unit.enhancements.disruption && (
                  <>
                    <p className="unitInfo-text-heading2">
                      Disruption ({unit.enhancements.disruption} turn
                      {unit.enhancements.disruption > 1 ? "s" : ""})
                    </p>
                    <p className="unitInfo-text-desc">
                      ⬩Prevents enemies within 2 spaces from spending their
                      Virtues and activating abilities.
                    </p>
                    <p className="unitInfo-text-desc">
                      ⬩Prevents adjacent enemies from activating non-burst
                      skills.
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩This enhancement is purged if the unit is muted or if
                      their Shield is purged.
                    </p>
                  </>
                )}

                {unit.enhancements.overgrowth && (
                  <>
                    <p className="unitInfo-text-heading2">Overgrowth</p>
                    <p className="unitInfo-text-desc ">
                      ⬩Afflicts adjacent enemies with Root.
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩This enhancement is purged if the unit moves or has an
                      affliction.
                    </p>
                  </>
                )}

                {unit.enhancements.proliferation && (
                  <>
                    <p className="unitInfo-text-heading2">
                      Proliferation ({unit.enhancements.proliferation} turn
                      {unit.enhancements.proliferation > 1 ? "s" : ""})
                    </p>
                    <p className="unitInfo-text-desc ">
                      ⬩Afflicts enemies within 2 spaces with Root.
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩This enhancement is purged if the unit’s Overgrowth is
                      purged.
                    </p>
                  </>
                )}
              </>
            )}

            {(unit.afflictions.anathema ||
              unit.afflictions.paralysis ||
              unit.afflictions.frostbite ||
              unit.afflictions.burn ||
              isRooted(unit)) && (
              <>
                <p className="unitInfo-text-heading1">
                  <u>
                    <strong>Afflictions</strong>
                  </u>
                </p>

                {unit.afflictions.anathema && (
                  <>
                    <p className="unitInfo-text-heading2">
                      Anathema ({unit.afflictions.anathema} turn
                      {unit.afflictions.anathema > 1 ? "s" : ""})
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩<em>Punished</em> and muted.
                    </p>
                  </>
                )}

                {unit.afflictions.paralysis && (
                  <>
                    <p className="unitInfo-text-heading2">
                      Paralysis ({unit.afflictions.paralysis} turn
                      {unit.afflictions.paralysis > 1 ? "s" : ""})
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩<em>Paralyzed</em>, muted, and immobilized.
                    </p>
                  </>
                )}

                {unit.afflictions.frostbite && (
                  <>
                    <p className="unitInfo-text-heading2">
                      Frostbite ({unit.afflictions.frostbite} turn
                      {unit.afflictions.frostbite > 1 ? "s" : ""})
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩<em>Frozen</em>, muted, and immobilized.
                    </p>
                  </>
                )}

                {unit.afflictions.burn && (
                  <>
                    <p className="unitInfo-text-heading2">
                      Burn ({unit.afflictions.burn} turn
                      {unit.afflictions.burn > 1 ? "s" : ""})
                    </p>
                    <p className="unitInfo-text-desc  ">
                      ⬩<em>Burning</em>; immune to Frostbite.
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩When Burn expires, lose 1 HP.
                    </p>
                  </>
                )}

                {isRooted(unit) && (
                  <>
                    <p className="unitInfo-text-heading2">Root</p>
                    <p className="unitInfo-text-desc  ">
                      ⬩<em>Rooted</em>; cannot strike nor Virtue-blast.
                    </p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩Must spend 1 skill when traversing via tactical action.
                    </p>
                  </>
                )}
              </>
            )}

            {(unit.boosts.ambidexterity ||
              unit.boosts.glacialTorrent ||
              unit.boosts.galeConjuration ||
              unit.boosts.mountainStance ||
              unit.boosts.valiantSpark) && (
              <>
                <p className="unitInfo-text-heading1">
                  <u>
                    <strong>Boosts</strong>
                  </u>
                </p>

                {unit.boosts.ambidexterity && (
                  <>
                    <p className="unitInfo-text-heading2">Ambidexterity</p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩The next standard skill activated will float upon
                      conclusion.
                    </p>
                  </>
                )}

                {unit.boosts.glacialTorrent && (
                  <>
                    <p className="unitInfo-text-heading2">Glacial Torrent</p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩Can activate the next{" "}
                      {unit.boosts.glacialTorrent > 1
                        ? "2 abilties"
                        : "ability"}{" "}
                      without using a tactic.
                    </p>
                  </>
                )}

                {unit.boosts.galeConjuration && (
                  <>
                    <p className="unitInfo-text-heading2">Gale Conjuration</p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩Next attack has 2 AP.
                    </p>
                  </>
                )}

                {unit.boosts.mountainStance && (
                  <>
                    <p className="unitInfo-text-heading2">Mountain Stance</p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩Can activate “Fortify” by using{" "}
                      <span className="unitInfo-tactic-group">
                        <img
                          src={InvokeSmall}
                          className="unitInfo-tactic-icon2"
                        />
                      </span>
                    </p>
                  </>
                )}

                {unit.boosts.valiantSpark && (
                  <>
                    <p className="unitInfo-text-heading2">Valiant Spark</p>
                    <p className="unitInfo-text-desc unitInfo-text-last">
                      ⬩Can activate “Arc Flash” without using a tactic.
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitInfo;
