import React from "react";
import "./Modal.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
const ViewBPUpgrades = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const team = props.team === "self" ? self : enemy;

  const upgrades = localGameState[team].bountyUpgrades;

  const handleCollapse = () => {
    props.setViewBP(null);
  };

  return (
    <div className="modal-backdrop unitInfo-text">
      <div className="unitInfoModal ">
        <div className="unitInfoHeader">
          <h2 className="unitInfo-name">{`Bounty Upgrades (${props.team})`}</h2>
          <button
            className="collapseSelected unitInfo-close"
            onClick={() => handleCollapse()}
          >
            X
          </button>
        </div>

        <div className="scrollable">
          <div>
            {upgrades.frontier > 0 && (
              <>
                <h3>Frontier:</h3>
                <p>Frontier expanded to {upgrades.frontier + 2} rows.</p>
                <br />
              </>
            )}
          </div>

          <div>
            {upgrades.acquisition > 0 && (
              <>
                <h3>Acquisition:</h3>

                {upgrades.acquisition >= 1 && (
                  <p>Pawns deployed via Appoint gain Shield for 2 turns.</p>
                )}
                {upgrades.acquisition >= 2 && <p>Beseech grants 1 FD.</p>}
                {upgrades.acquisition >= 3 && (
                  <p>
                    Sovereign may spend 1 skill to draw another skill via
                    Cultivate.
                  </p>
                )}
                <br />
              </>
            )}
          </div>

          <div>
            {upgrades.coordination > 0 && (
              <>
                <h3>Cordination:</h3>

                {upgrades.coordination >= 1 && <p>Convene unlocked.</p>}
                {upgrades.coordination >= 2 && (
                  <p>
                    Convene upgraded: gain 1 Advance tactic and draw 1 Avelhem.
                  </p>
                )}
                {upgrades.coordination >= 3 && (
                  <p>Battle Cry upgraded: roll 1 tactical die.</p>
                )}
                <br />
              </>
            )}
          </div>

          <div>
            {upgrades.tactics > 0 && (
              <>
                <h3>Tactics:</h3>

                {upgrades.tactics >= 1 && (
                  <p>Invoke upgraded: Unlocked Special Invocation</p>
                )}
                {upgrades.tactics >= 2 && (
                  <p>
                    Advance upgraded: Sovereign may draw 1 Avelhem after
                    deploying a pawn.
                  </p>
                )}
                {upgrades.tactics >= 3 && (
                  <p>Mobilize upgraded: Instances raised from 3 to 4.</p>
                )}
                {upgrades.tactics >= 4 && (
                  <p>
                    Advance upgraded: Sovereign may float 1 skill to deploy a
                    Scion in their frontier.
                  </p>
                )}
                <br />
              </>
            )}
          </div>

          <div>
            {upgrades.avelhem > 0 && (
              <>
                <h3>Avelhem:</h3>

                {upgrades.avelhem >= 1 && (
                  <p>Can retain up to 1 Avelhem at the end of turn.</p>
                )}
                {upgrades.avelhem >= 2 && (
                  <p>
                    Avelhems have an alternate effect: Spend 3 FD to search for
                    1 non-burst skill with the matching aspect.
                  </p>
                )}
                {upgrades.avelhem >= 3 && (
                  <p>Units ascending via Avelhems gain Shield for 2 turns.</p>
                )}
                {upgrades.avelhem >= 4 && (
                  <p>
                    Avelhems have an alternate effect: Spend 3 FD to recover 1
                    skill with the matching aspect.
                  </p>
                )}
                <br />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBPUpgrades;
