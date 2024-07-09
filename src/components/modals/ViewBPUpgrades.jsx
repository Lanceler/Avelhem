import React, { useState } from "react";
import "./Modal.css";

import { useGetImages } from "../../hooks/useGetImages";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import InfoPopUp from "./InfoPopUp";

import { useSelector, useDispatch } from "react-redux";
const ViewBPUpgrades = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const [infoPopUp, setInfoPopUp] = useState(null);

  const team = props.team === "self" ? self : enemy;

  const upgrades = localGameState[team].bountyUpgrades;

  const handleCollapse = () => {
    props.setViewBP(null);
  };

  return (
    <div className="modal-backdrop unitInfo-text">
      <div className="unitInfoModal ">
        <div className="unitInfoHeader">
          <h2 className="unitInfo-name">
            {`Bounty Upgrades (${props.team})`}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="question-icon2"
              onClick={() => setInfoPopUp("BP")}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </h2>
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
                <p className="unitInfo-text-desc">
                  Frontier expanded to {upgrades.frontier + 3} rows.
                </p>
                <br />
              </>
            )}
          </div>

          <div>
            {upgrades.acquisition > 0 && (
              <>
                <h3>Acquisition:</h3>

                {upgrades.acquisition >= 1 && (
                  <p className="unitInfo-text-desc">
                    Pawns deployed via Appoint gain Shield for 2 turns.
                  </p>
                )}
                {upgrades.acquisition >= 2 && (
                  <p className="unitInfo-text-desc">Beseech grants 1 FD.</p>
                )}
                {upgrades.acquisition >= 3 && (
                  <p className="unitInfo-text-desc">
                    May spend 1 skill to draw another skill via Cultivate.
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

                {upgrades.coordination >= 1 && (
                  <p className="unitInfo-text-desc">Convene unlocked.</p>
                )}
                {upgrades.coordination >= 2 && (
                  <p className="unitInfo-text-desc">
                    Convene upgraded: gain 1 Advance tactic and draw 1 Avelhem.
                  </p>
                )}
                {upgrades.coordination >= 3 && (
                  <p className="unitInfo-text-desc">
                    Battle Cry upgraded: roll 1 tactical die.
                  </p>
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
                  <p className="unitInfo-text-desc">
                    Invoke upgraded: unlocked Divine Invocation
                  </p>
                )}
                {upgrades.tactics >= 2 && (
                  <p className="unitInfo-text-desc">
                    Advance upgraded: may draw 1 Avelhem after deploying a pawn.
                  </p>
                )}
                {upgrades.tactics >= 3 && (
                  <p className="unitInfo-text-desc">
                    Mobilize upgraded: instances raised from 3 to 4.
                  </p>
                )}
                {upgrades.tactics >= 4 && (
                  <p className="unitInfo-text-desc">
                    Advance upgraded: can float 1 skill to deploy a Scion in
                    their frontier.
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
                  <p className="unitInfo-text-desc">
                    Can retain up to 1 Avelhem at the end of turn.
                  </p>
                )}
                {upgrades.avelhem >= 2 && (
                  <p className="unitInfo-text-desc">
                    Avelhems have an alternate effect: spend 3 FD to search for
                    1 non-burst skill with the matching aspect.
                  </p>
                )}
                {upgrades.avelhem >= 3 && (
                  <p className="unitInfo-text-desc">
                    Units ascending via Avelhems gain Shield for 2 turns.
                  </p>
                )}
                {upgrades.avelhem >= 4 && (
                  <p className="unitInfo-text-desc">
                    Avelhems have an alternate effect: spend 3 FD to recover 1
                    skill with the matching aspect.
                  </p>
                )}
                <br />
              </>
            )}
          </div>
        </div>
      </div>
      {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />}
    </div>
  );
};

export default ViewBPUpgrades;
