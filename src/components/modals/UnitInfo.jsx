import React from "react";
import "./Modal.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

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

  return (
    <div className="modal-backdrop">
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
            <h3>Abilities</h3>
          </div>
          <div className="unitInfo-Attributes scrollable">
            <h3>Attributes</h3>
            <p>HP: {unit.hp}</p>
            <p>Virtue: {unit.virtue ? "Present" : "Absent"}</p>
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
                <h3>Enhancements</h3>

                {unit.enhancements.ravager && (
                  <p>Ravager: Immune to Anathema.</p>
                )}

                {unit.enhancements.ward && (
                  <p>
                    Ward ({unit.enhancements.ward} turn
                    {unit.enhancements.ward > 1 ? "s" : ""}): Negates the next
                    attack or targeting affliction, then purges. (Applies before
                    Shield.)
                  </p>
                )}

                {unit.enhancements.shield && (
                  <p>
                    Shield ({unit.enhancements.shield} turn
                    {unit.enhancements.shield > 1 ? "s" : ""}): Negates the next
                    attack, then purges.
                  </p>
                )}

                {unit.enhancements.disruption && (
                  <p>
                    Disruption ({unit.enhancements.disruption} turn
                    {unit.enhancements.disruption > 1 ? "s" : ""}): Prevents
                    enemies within 2 spaces from spending their Virtues and
                    activating abilities. Prevents adjacent enemies from
                    activating non-burst skills. This enhancement is purged if
                    the unit is muted or if their Shield is purged.
                  </p>
                )}

                {unit.enhancements.overgrowth && (
                  <p>
                    Overgrowth: Afflicts adjacent enemies with Root. This
                    enhancement is purged if the unit moves or has an
                    affliction.
                  </p>
                )}

                {unit.enhancements.proliferation && (
                  <p>
                    Proliferation ({unit.enhancements.proliferation} turn
                    {unit.enhancements.proliferation > 1 ? "s" : ""}): Afflicts
                    enemies within 2 spaces with Root. This enhancement is
                    purged if the unit’s Overgrowth is purged.
                  </p>
                )}
              </>
            )}

            {(unit.afflictions.anathema ||
              unit.afflictions.paralysis ||
              unit.afflictions.frostbite ||
              unit.afflictions.burn ||
              isRooted(unit)) && (
              <>
                <h3>Afflictions</h3>

                {unit.enhancements.ravager && (
                  <p>Ravager: Immune to Anathema.</p>
                )}

                {unit.afflictions.anathema && (
                  <p>
                    Anathema ({unit.afflictions.anathema} turn
                    {unit.afflictions.anathema > 1 ? "s" : ""}):{" "}
                    <em>Punished</em> and muted.
                  </p>
                )}

                {unit.afflictions.paralysis && (
                  <p>
                    Paralysis ({unit.afflictions.paralysis} turn
                    {unit.afflictions.paralysis > 1 ? "s" : ""}):{" "}
                    <em>Paralyzed</em>, muted, and immobilized.
                  </p>
                )}

                {unit.afflictions.frostbite && (
                  <p>
                    Frostbite ({unit.afflictions.frostbite} turn
                    {unit.afflictions.frostbite > 1 ? "s" : ""}):{" "}
                    <em>Frozen</em>, muted, and immobilized.
                  </p>
                )}

                {unit.afflictions.burn && (
                  <p>
                    Burn ({unit.afflictions.burn} turn
                    {unit.afflictions.burn > 1 ? "s" : ""}): <em>Burning</em>;
                    immune to Frostbite. When Burn expires, lose 1 HP.
                  </p>
                )}

                {isRooted(unit) && (
                  <p>
                    Root: <em>Rooted</em>; cannot strike nor Virtue-blast. Must
                    spend 1 skill when traversing via tactical action.
                  </p>
                )}
              </>
            )}
            <h3>Boosts</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitInfo;
