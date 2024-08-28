import React from "react";
import "./Modal.css";

import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { useGetImages } from "../../hooks/useGetImages";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { updateDemo } from "../../redux/demoGuide";

import { useCardDatabase } from "../../hooks/useCardDatabase";

import { useSelector, useDispatch } from "react-redux";
const UnitInfo = (props) => {
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getCardImage, getElementImage } = useGetImages();
  const { isRooted } = useRecurringEffects();
  const { getScionSet } = useCardDatabase();

  const unit = props.unit;

  const team = unit.player === self ? "Ally" : "Enemy";

  const skillSet = getScionSet(unit.unitClass);

  const handleCollapse = () => {
    props.setUnitInfor(null);
  };

  const abilities = () => {
    switch (unit.unitClass) {
      case "Pawn":
        return <p className="unitInfo-text-heading2">None</p>;

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
              ⬩Spend 1 skill to strike.
            </p>

            <p className="unitInfo-text-heading2">2. Fiery Heart (One-shot)</p>
            <p className="unitInfo-text-desc">
              ⬩Spend 1 skill to purge an adjacent ally’s Frostbite and Burn.
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
            <p className="unitInfo-text-desc">
              ⬩Purge an adjacent ally’s Paralysis, Frostbite, and Burn.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Draw 1 skill.
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
              ⬩Search for 1 “Gale Conjuration”.
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

            <p className="unitInfo-text-heading2">
              2. Converge{" "}
              <span className="unitInfo-tactic-group">
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
              </span>
            </p>
            <p className="unitInfo-text-desc ">
              ⬩Draw 1 skill or restore your Aether.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You may traverse.
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
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Spend 1 skill to blast an enemy within 2 spaces. ⬩Restore your
              Aether.
            </p>

            <p className="unitInfo-text-heading2">2. Amplify Aura (One-shot)</p>
            <p className="unitInfo-text-desc">
              ⬩Convert your or an adjacent ally’s Aether into Shield for 2
              turns.
            </p>
          </>
        );

      case "Metal Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Brandish{" "}
              <span className="unitInfo-tactic-group">
                <img src={InvokeSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc">⬩Search for 1 “Frenzy Blade”.</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Draw 1 skill or restore your Aether.
            </p>

            <p className="unitInfo-text-heading2">
              2. Ballistic Armor (One-shot)
            </p>
            <p className="unitInfo-text-desc">
              ⬩Spend 1 skill and either 2 turns of Shield or 2 turns of Ward to
              blast an adjacent enemy.
            </p>
          </>
        );

      case "Plant Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Flourish (One-shot) </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Spend 2 skills to restore your Aether and gain Overgrowth.
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

  const talents = () => {
    switch (unit.unitClass) {
      case "Pawn":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Apotheosis </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You can ascend to a Scion.
            </p>

            <p className="unitInfo-text-heading2">2. Outclassed</p>
            <p className="unitInfo-text-desc">⬩You cannot Aether-blast.</p>
          </>
        );

      case "Fire Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. From the Ashes</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon your debut, you may spend 1 skill to recover then float 1
              non-burst Fire skill.
            </p>

            <p className="unitInfo-text-heading2">2. Eternal Ember</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You are immune to Frostbite and Burn.
            </p>
          </>
        );

      case "Water Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Kleptothermy</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon your debut, restore your Aether or that of an ally within 2
              spaces. Alternatively, purge an adjacent enemy’s Aether; this
              cannot affect Water Scions.
            </p>

            <p className="unitInfo-text-heading2">2. Clear as Crystal</p>
            <p className="unitInfo-text-desc">
              ⬩You are immune to Frostbite and Burn.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Your attacks against frostbitten enemies bypass Shield.
            </p>
          </>
        );

      case "Wind Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Second Wind</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon your elimination, you may recover then float 1 non-burst
              Wind skill.
            </p>

            <p className="unitInfo-text-heading2">2. Soundproof</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Your and your adjacent allies’ activations bypass “Symphonic
              Screech”.
            </p>
          </>
        );

      case "Land Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Mountain Stance</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon your debut, gain a boost: you can use{" "}
              <span className="unitInfo-tactic-group2">
                <img src={AdvanceSmall} className="unitInfo-tactic-icon2" />
              </span>{" "}
              to activate “Fortify”. Alternatively, spend 1 skill to search for
              1 “Crystallization”.
            </p>

            <p className="unitInfo-text-heading2">2. Earthen Safeguard</p>
            <p className="unitInfo-text-desc">⬩You are immune to Root.</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩If your HP is above 1, you are immune to Paralysis.
            </p>
          </>
        );

      case "Lightning Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Lightning Rod</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon your debut, you may spend 1 skill to gain 1 Charge (Max. 3).
            </p>

            <p className="unitInfo-text-heading2">2. Defibrillation</p>
            <p className="unitInfo-text-desc ">⬩You are immune to Frostbite.</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩If you have 3 Charges, you are immune to Paralysis.
            </p>
          </>
        );

      case "Mana Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Ambiance Assimilation</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon your elimination, you may search for 1 non-burst Mana skill.
            </p>

            <p className="unitInfo-text-heading2">2. Mana Feedback</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩When an enemy survives your attack, you may draw 1 skill.
            </p>
          </>
        );

      case "Metal Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Conduction</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon your debut, you may search for then float 1 “Magnetic
              Shockwave”.
            </p>
            <p className="unitInfo-text-heading2">2. Penetrator</p>
            <p className="unitInfo-text-desc ">
              ⬩Your attacks gain 1 AP for each Sharpness you have.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩If you have 2 Sharpness, your strikes bypass Shield.
            </p>
          </>
        );

      case "Plant Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Everblooming</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon your elimination, you may draw 1 skill.
            </p>

            <p className="unitInfo-text-heading2">2. Flora’s Reverence</p>
            <p className="unitInfo-text-desc ">⬩You are immune to Root.</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You can spend Blossoms in lieu of skills.
            </p>
          </>
        );
    }
  };

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Learn1.76.1":
        return element === "Collapse";
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.76.1":
        dispatch(updateDemo("Learn1.77"));

        break;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="info-modal">
        <div className="info-modal-header">
          <img
            src={getElementImage(unit.unitClass)}
            className="unit-info-icon "
          />
          <div className="info-modal-title">
            {`${unit.unitClass} (${team})`}
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={` close-modal-button unitInfo-close ${
              canClick("Collapse") ? "demoClick" : ""
            }`}
            onClick={() => {
              handleCollapse();
              handleUpdateDemoGuide();
            }}
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
          </svg>
        </div>

        <div className="info-modal-contents">
          <div className="unitInfo-Abilities-Attributes">
            <div className="unitInfo-Abilities  ">
              <p className="unitInfo-text-heading1">
                <u>
                  <strong>Abilities</strong>
                </u>
              </p>
              <div className="unitInfo-scroll scrollable">{abilities()}</div>
            </div>

            <div className="unitInfo-Attributes-SkillSet">
              <div className="unitInfo-Attributes">
                <p className="unitInfo-text-heading1">
                  <u>
                    <strong>Attributes</strong>
                  </u>
                </p>

                <div className="unitInfo-scroll scrollable">
                  {!unit.enhancements.score && (
                    <>
                      <p className="unitInfo-text-heading2">HP: {unit.hp}</p>
                      <p className="unitInfo-text-heading2">
                        Aether: {unit.aether ? "Present" : "None"}
                      </p>

                      {unit.charge > 0 && (
                        <p className="unitInfo-text-heading2">
                          Charge: {unit.charge}
                        </p>
                      )}
                      {unit.sharpness > 0 && (
                        <p className="unitInfo-text-heading2">
                          Sharpness: {unit.sharpness}
                        </p>
                      )}
                      {unit.blossom > 0 && (
                        <p className="unitInfo-text-heading2">
                          Blossom: {unit.blossom}
                        </p>
                      )}
                    </>
                  )}

                  {unit.enhancements.score && (
                    <>
                      <p className="unitInfo-text-heading2">
                        This unit has scored.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {unit.unitClass !== "Pawn" && (
                <div className="unitInfo-Attributes">
                  <p className="unitInfo-text-heading1">
                    <u>
                      <strong>Skill Set</strong>
                    </u>
                  </p>

                  <div className="unit-info-skill-set">
                    {skillSet.map((skill, i) => (
                      <div
                        key={i}
                        className="unit-info-skill"
                        style={{
                          backgroundImage: `url(${getCardImage(skill)})`,
                        }}
                        onClick={() => {
                          dispatch(updateMagnifiedSkill(skill));
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="unitInfo-Talents-Statuses">
            <div className="unitInfo-Talents ">
              <p className="unitInfo-text-heading1">
                <u>
                  <strong>Talents</strong>
                </u>
              </p>
              <div className="unitInfo-scroll scrollable">{talents()}</div>
            </div>
            <div className="unitInfo-Statuses scrollable">
              {(unit.enhancements.ravager ||
                unit.enhancements.ward ||
                unit.enhancements.shield ||
                unit.enhancements.disruption ||
                unit.enhancements.overgrowth) && (
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

                  {unit.enhancements.ward > 0 && (
                    <>
                      <p className="unitInfo-text-heading2">
                        Ward ({unit.enhancements.ward} turn
                        {unit.enhancements.ward > 1 ? "s" : ""})
                      </p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩Negates the next attack or affliction that targets this
                        unit.
                      </p>
                    </>
                  )}

                  {unit.enhancements.shield > 0 && (
                    <>
                      <p className="unitInfo-text-heading2">
                        Shield ({unit.enhancements.shield} turn
                        {unit.enhancements.shield > 1 ? "s" : ""})
                      </p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩Negates the next attack that targets this unit, unless
                        they are enhanced with Ward.
                      </p>
                    </>
                  )}

                  {unit.enhancements.disruption > 0 && (
                    <>
                      <p className="unitInfo-text-heading2">
                        Disruption ({unit.enhancements.disruption} turn
                        {unit.enhancements.disruption > 1 ? "s" : ""})
                      </p>
                      <p className="unitInfo-text-desc">
                        ⬩Prevents enemies within 2 spaces from spending their
                        Aethers and activating abilities.
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
                        ⬩<em>Frostbitten</em>, muted, and immobilized.
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
                        ⬩When Burn expires at the end of the turn, lose 1 HP.
                      </p>
                    </>
                  )}

                  {isRooted(unit) && (
                    <>
                      <p className="unitInfo-text-heading2">Root</p>
                      <p className="unitInfo-text-desc  ">
                        ⬩<em>Rooted</em>; cannot strike.
                      </p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩Must spend 1 skill to traverse or Aether-blast via
                        tactical action.
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
                        ⬩Next standard skill activated is retained upon
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
                        <span className="unitInfo-tactic-group2">
                          <img
                            src={AdvanceSmall}
                            className="unitInfo-tactic-icon2"
                          />
                        </span>
                        .
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
    </div>
  );
};

export default UnitInfo;
