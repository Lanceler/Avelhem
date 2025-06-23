import React from "react";
import "./Modal.css";

import { updateMagnifiedSkill } from "../../redux/magnifySkill";

import { useGetImages } from "../../hooks/useGetImages";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { updateDemoCount } from "../../redux/demoCount";

import { useCardDatabase } from "../../hooks/useCardDatabase";

import { useSelector, useDispatch } from "react-redux";
const UnitInfo = (props) => {
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const { getCardImage, getElementImage } = useGetImages();
  const { isRooted } = useRecurringEffects();
  const { getScionSet } = useCardDatabase();

  const unit = props.unit;

  const team = unit.player === self ? "Ally" : "Foe";

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
            <p className="unitInfo-text-desc unitInfo-text-last">⬩Strike.</p>

            <p className="unitInfo-text-heading2">2. Fiery Heart</p>
            <p className="unitInfo-text-desc">
              ⬩Spend 1 skill to purge an adjacent ally’s Frost and Burn.
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
                <img src={InvokeSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc">
              ⬩Purge an adjacent ally’s turn-based afflictions (except
              Anathema).
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You may float 1 skill to search for 1 “Healing Rain”.
            </p>

            <p className="unitInfo-text-heading2">
              2. Cold Embrace{" "}
              <span className="unitInfo-tactic-group">
                <img src={AssaultSmall} className="unitInfo-tactic-icon" />
                <img src={InvokeSmall} className="unitInfo-tactic-icon" />
              </span>
            </p>
            <p className="unitInfo-text-desc">
              ⬩Strike a frozen foe or freeze an adjacent foe for 2 turns.
            </p>
          </>
        );

      case "Wind Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Air Dash{" "}
              <span className="unitInfo-tactic-group">
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
              </span>
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Move to a zone 2 spaces away.
            </p>

            <p className="unitInfo-text-heading2">2. Reap the Whirlwind</p>
            <p className="unitInfo-text-desc">
              ⬩Float 1 Wind skill and spend 2 Cyclones to blast an adjacent foe.
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
              2. Leyline Convergence{" "}
              <span className="unitInfo-tactic-group">
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
              </span>
            </p>
            <p className="unitInfo-text-desc ">⬩Restore your Aether.</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You may traverse.
            </p>
          </>
        );

      case "Lightning Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">
              1. Galvanize{" "}
              <span className="unitInfo-tactic-group">
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
                <img src={MobilizeSmall} className="unitInfo-tactic-mobilize" />
              </span>
            </p>
            <p className="unitInfo-text-desc ">⬩Gain 1 Charge.</p>
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
              ⬩Spend 3 Charges to search for then float 1 Lightning skill.
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
              ⬩Spend 1 skill to blast a foe within 2 spaces.
            </p>

            <p className="unitInfo-text-heading2">2. Amplify Aura</p>
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

            <p className="unitInfo-text-heading2">2. Ballistic Armor</p>
            <p className="unitInfo-text-desc">
              ⬩Spend your Shield or Ward to restore your Aether.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You may float 1 skill to Aether-blast an adjacent foe.
            </p>
          </>
        );

      case "Plant Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Flourish</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Spend 2 skills to restore your Aether and gain Overgrowth.
            </p>

            <p className="unitInfo-text-heading2">2. Ambrosia</p>
            <p className="unitInfo-text-desc">
              ⬩Spend 1 Blossom to purge your or an adjacent ally’s afflictions
              (except Root and Anathema).
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
              ⬩Upon ascension, you may spend 1 skill to recover then float 1
              Fire skill.
            </p>

            <p className="unitInfo-text-heading2">2. Eternal Ember</p>
            <p className="unitInfo-text-desc">
              ⬩You are immune to Frost and Burn.
            </p>
            <p className="unitInfo-text-desc">
              ⬩When you spend a skill, gain 1 Ember; you can have up to 2
              Embers.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You can spend 2 Embers in lieu of 1 skill.
            </p>
          </>
        );

      case "Water Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Kleptothermy</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon ascension, restore your Aether or that of an ally within 2
              spaces; or purge an adjacent foe’s Aether.
            </p>

            <p className="unitInfo-text-heading2">2. Clear as Crystal</p>
            <p className="unitInfo-text-desc">
              ⬩You are immune to Frost and Burn.
            </p>
            <p className="unitInfo-text-desc">
              ⬩You can activate abilities more than once per turn.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Your attacks against frozen foes pierce Shield.
            </p>
          </>
        );

      case "Wind Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Second Wind</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon elimination, you may recover then float 1 Wind skill.
            </p>

            <p className="unitInfo-text-heading2">2. Aeromancy</p>
            <p className="unitInfo-text-desc">
              ⬩When you activate a skill, gain 1 Cyclone; you can have up to 2
              Cyclones.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Your actions do not trigger a motion contingency.
            </p>
          </>
        );

      case "Land Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Mountain Stance</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon ascension, gain 2 Aftershocks; you can have up to 2
              Aftershocks.
            </p>

            <p className="unitInfo-text-heading2">2. Salt the Earth</p>
            <p className="unitInfo-text-desc">
              ⬩You are immune to Paralysis (due to Land skills) and Root.
            </p>
            <p className="unitInfo-text-desc">
              ⬩When you successfully paralyze a foe, gain 1 Aftershock.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩When you activate an ability, you may spend 2 Aftershocks to use{" "}
              <span className="unitInfo-tactic-group2">
                <img src={AdvanceSmall} className="unitInfo-tactic-icon2" />
              </span>{" "}
              in lieu of the required tactic.
            </p>
          </>
        );

      case "Lightning Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Lightning Rod</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon ascension, you may spend 1 skill to gain 1 Charge; you can
              have up to 3 Charges.
            </p>

            <p className="unitInfo-text-heading2">2. Defibrillation</p>
            <p className="unitInfo-text-desc ">⬩You are immune to Frost.</p>
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
              ⬩Upon elimination, you may search for 1 Mana skill.
            </p>

            <p className="unitInfo-text-heading2">2. Overload</p>
            <p className="unitInfo-text-desc">
              ⬩When your Aether is restored, you may draw 1 skill.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩The attacks of your skills have 2 AP.
            </p>
          </>
        );

      case "Metal Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Conduction</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon ascension, you may search for then float 1 “Magnetic
              Shockwave”.
            </p>
            <p className="unitInfo-text-heading2">2. Penetrator</p>
            <p className="unitInfo-text-desc ">
              ⬩Your attacks gain 1 AP for each Sharpness you have; you can have
              up to 2 Sharpness.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩If you have 2 Sharpness, your strikes pierce Shield.
            </p>
          </>
        );

      case "Plant Scion":
        return (
          <>
            <p className="unitInfo-text-heading2">1. Everblooming</p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩Upon elimination, you may draw 1 skill or spend 2 Blossoms to
              recover then float 1 “Efflorescence”.
            </p>

            <p className="unitInfo-text-heading2">2. Flora’s Reverence</p>
            <p className="unitInfo-text-desc ">⬩You are immune to Root.</p>
            <p className="unitInfo-text-desc">
              ⬩You can activate abilities more than once per turn.
            </p>
            <p className="unitInfo-text-desc unitInfo-text-last">
              ⬩You can spend 2 Blossoms in lieu of 1 skill; you can have up to 3
              Blossoms.
            </p>
          </>
        );
    }
  };

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          // case 97:
          //   return element2 === 0;

          case 82:
          case 113:
            return element1 === "Collapse";
        }
    }
  };

  const handleUpdateDemoGuide = (i) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          // case 97:
          //   if (i === 0) {
          //     dispatch(updateDemoCount(demoCount + 1));
          //   }
          //   break;

          case 82:
          case 113:
            if (i === "Collapse") {
              dispatch(updateDemoCount(demoCount + 1));
            }
            break;
        }
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
            className={`close-modal-button unitInfo-close ${
              canClick("Collapse") ? "demoClick" : ""
            }`}
            onClick={() => {
              handleCollapse();
              handleUpdateDemoGuide("Collapse");
            }}
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
          </svg>
        </div>

        <div className="info-modal-contents" style={{ pointerEvents: "all" }}>
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

                      {unit.ember > 0 && (
                        <p className="unitInfo-text-heading2">
                          Ember: {unit.ember}
                        </p>
                      )}

                      {unit.torrent > 0 && (
                        <p className="unitInfo-text-heading2">
                          Torrent: {unit.torrent}
                        </p>
                      )}

                      {unit.cyclone > 0 && (
                        <p className="unitInfo-text-heading2">
                          Cyclone: {unit.cyclone}
                        </p>
                      )}

                      {unit.aftershock > 0 && (
                        <p className="unitInfo-text-heading2">
                          Aftershock: {unit.aftershock}
                        </p>
                      )}

                      {unit.charge > 0 && (
                        <p className="unitInfo-text-heading2">
                          Charge: {unit.charge}
                        </p>
                      )}

                      {unit.seal > 0 && (
                        <p className="unitInfo-text-heading2">
                          Seal: {unit.seal}
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
                        className={`unit-info-skill                          
                          ${canClick("Skill", i) ? "demoClick" : ""}`}
                        style={{
                          backgroundImage: `url(${getCardImage(skill)})`,
                        }}
                        onClick={() => {
                          dispatch(updateMagnifiedSkill(skill));
                          // handleUpdateDemoGuide(i);
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
                unit.enhancements.overgrowth ||
                unit.boosts.ambidexterity) && (
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

                  {unit.enhancements.overgrowth && (
                    <>
                      <p className="unitInfo-text-heading2">Overgrowth</p>
                      <p className="unitInfo-text-desc ">
                        ⬩Afflicts adjacent foes with Root.
                      </p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩This enhancement is purged if the unit moves or has an
                        affliction.
                      </p>
                    </>
                  )}

                  {unit.boosts.ambidexterity && (
                    <>
                      <p className="unitInfo-text-heading2">
                        Ambidexterity (1 turn)
                      </p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩Next standard skill activated is retained.
                      </p>
                    </>
                  )}
                </>
              )}

              {(unit.afflictions.anathema ||
                unit.afflictions.paralysis ||
                unit.afflictions.frost ||
                unit.afflictions.burn ||
                isRooted(unit)) && (
                <>
                  <p className="unitInfo-text-heading1">
                    <u>
                      <strong>Afflictions</strong>
                    </u>
                  </p>

                  {unit.afflictions.anathema > 0 && (
                    <>
                      <p className="unitInfo-text-heading2">
                        Anathema ({unit.afflictions.anathema} turn
                        {unit.afflictions.anathema > 1 ? "s" : ""})
                      </p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩Muted.
                      </p>
                    </>
                  )}

                  {unit.afflictions.paralysis > 0 && (
                    <>
                      <p className="unitInfo-text-heading2">
                        Paralysis ({unit.afflictions.paralysis} turn
                        {unit.afflictions.paralysis > 1 ? "s" : ""})
                      </p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩Muted and immobilized.
                      </p>
                    </>
                  )}

                  {unit.afflictions.frost > 0 && (
                    <>
                      <p className="unitInfo-text-heading2">
                        Frost ({unit.afflictions.frost} turn
                        {unit.afflictions.frost > 1 ? "s" : ""})
                      </p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩Muted and immobilized.
                      </p>
                    </>
                  )}

                  {unit.afflictions.burn > 0 && (
                    <>
                      <p className="unitInfo-text-heading2">
                        Burn ({unit.afflictions.burn} turn
                        {unit.afflictions.burn > 1 ? "s" : ""})
                      </p>
                      <p className="unitInfo-text-desc  ">⬩Immune to Frost.</p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩Loses 1 HP during the Final Phase.
                      </p>
                    </>
                  )}

                  {isRooted(unit) && (
                    <>
                      <p className="unitInfo-text-heading2">Root</p>
                      <p className="unitInfo-text-desc  ">⬩Cannot strike.</p>
                      <p className="unitInfo-text-desc unitInfo-text-last">
                        ⬩Must spend 1 skill to traverse or Aether-blast via
                        tactical action.
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
