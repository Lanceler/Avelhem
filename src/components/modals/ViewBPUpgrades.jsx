import React, { useState } from "react";
import "./Modal.css";

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
    <div className="modal-backdrop">
      <div className="info-modal ">
        <div className="info-modal-header">
          <div className="info-modal-title">
            {`Bounty Upgrades (${props.team})`}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="question-icon2"
              onClick={() => setInfoPopUp("BP")}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="close-modal-button unitInfo-close"
            onClick={() => {
              handleCollapse();
            }}
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
          </svg>
        </div>

        <div className="info-modal-contents scrollable">
          <div className="">
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
                      1. May draw 1 additional Avelhem via Beseech.
                    </p>
                  )}
                  {upgrades.acquisition >= 2 && (
                    <p className="unitInfo-text-desc">
                      2. Pawns deployed via Appoint gain Shield for 2 turns.
                    </p>
                  )}
                  {upgrades.acquisition >= 3 && (
                    <p className="unitInfo-text-desc">
                      3. May spend 1 FD to draw another skill via Cultivate.
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
                    <p className="unitInfo-text-desc">
                      1. Battle Cry upgraded: roll 1 tactical die.
                    </p>
                  )}
                  {upgrades.coordination >= 2 && (
                    <p className="unitInfo-text-desc">
                      2. Convene upgraded: gain 1 Advance tactic.
                    </p>
                  )}
                  {upgrades.coordination >= 3 && (
                    <p className="unitInfo-text-desc">
                      3. Assent upgraded: gain 1 FD.
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
                      1. Rally upgraded: instances raised from 2 to 3.
                    </p>
                  )}
                  {upgrades.tactics >= 2 && (
                    <p className="unitInfo-text-desc">
                      2. Mobilize upgraded: instances raised from 3 to 4.
                    </p>
                  )}
                  {upgrades.tactics >= 3 && (
                    <p className="unitInfo-text-desc">
                      3. Advance upgraded: “Deploy Scion” action unlocked.
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
                      1. Avelhem resonance grants Shield for 2 turns.
                    </p>
                  )}
                  {upgrades.avelhem >= 2 && (
                    <p className="unitInfo-text-desc">
                      2. Avelhem hand limit raised to 1
                    </p>
                  )}
                  {upgrades.avelhem >= 3 && (
                    <p className="unitInfo-text-desc">
                      3. Avelhems have an alternate effect: spend 2 FD to
                      recover 1 skill with the matching aspect.
                    </p>
                  )}

                  <br />
                </>
              )}
            </div>

            <div>
              {upgrades.skill > 0 && (
                <>
                  <h3>Skill:</h3>

                  {upgrades.skill >= 1 && (
                    <p className="unitInfo-text-desc">
                      1. Scions can use any skill that belongs to their class as
                      a resonator
                    </p>
                  )}
                  {upgrades.skill >= 2 && (
                    <p className="unitInfo-text-desc">
                      2. Can activate burst skills.
                    </p>
                  )}
                  {upgrades.skill >= 3 && (
                    <p className="unitInfo-text-desc">
                      3. Skill hand limit raised to 12
                    </p>
                  )}

                  <br />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />}
    </div>
  );
};

export default ViewBPUpgrades;
