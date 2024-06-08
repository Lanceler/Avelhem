import React from "react";
import "./Modal.css";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";

import { useSelector, useDispatch } from "react-redux";
const InfoPopUp = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const handleCollapse = () => {
    props.setInfoPopUp(null);
  };

  const infoTitle = () => {
    switch (props.info) {
      case "Tactics":
        return "Tactics Guide";

      case "BP":
        return "BP (Bounty Point) Info.";

      case "FD":
        return "FD (Fate Defiance) Info.";
    }
  };

  const infoBody = () => {
    switch (props.info) {
      case "Tactics":
        return (
          <>
            <div className="unitInfo-text-heading1">
              <strong>Advance </strong>
              <span className="infoPopUp-tactic-group">
                <img src={AdvanceSmall} className="infoPopUp-tactic-icon" />
              </span>
            </div>
            <div className="unitInfo-text-heading2">
              Sovereign Tactical Actions
            </div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">
                ⬩Deploy a pawn in your frontier. ⬩If upgraded, you may draw 1
                Avelhem.
              </li>
              <li className="unitInfo-text-desc">
                ⬩Spend 6 FD to gain an Assault tactic.
              </li>
              <li className="unitInfo-text-desc">
                ⬩<em>(Available after upgrading Advance twice)</em> Float 1
                skill to deploy a Scion in your frontier.
              </li>
            </ol>
            <div className="unitInfo-text-heading2">Unit Tactical Actions</div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">⬩Traverse.</li>
              <li className="unitInfo-text-desc">
                ⬩Virtue-blast an adjacent enemy.
              </li>
            </ol>

            <br />

            <div className="unitInfo-text-heading1">
              <strong>Mobilize </strong>
              <span className="infoPopUp-tactic-group">
                <img src={MobilizeSmall} className="infoPopUp-tactic-icon" />
              </span>
            </div>

            <div className="unitInfo-text-heading2">
              Sovereign Tactical Actions
            </div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">
                ⬩Use 2 instances to draw 1 skill.
              </li>
            </ol>
            <div className="unitInfo-text-heading2">Unit Tactical Actions</div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">
                ⬩Use 1 instance to traverse.
              </li>
            </ol>

            <div className="unitInfo-text-heading2">
              {/* <em> */}
              Note: Mobilize provides 3 (4 if upgraded) instances. Once a unit
              has used any instances of a Mobilize tactic, they are prohibited
              from using its remainder.
              {/* </em> */}
            </div>

            <br />

            <div className="unitInfo-text-heading1">
              <strong>Assault </strong>
              <span className="infoPopUp-tactic-group">
                <img src={AssaultSmall} className="infoPopUp-tactic-icon" />
              </span>
            </div>
            <div className="unitInfo-text-heading2">Unit Tactical Actions</div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">⬩Traverse.</li>
              <li className="unitInfo-text-desc">⬩Strike.</li>
            </ol>

            <br />

            <div className="unitInfo-text-heading1">
              <strong>Invoke </strong>
              <span className="infoPopUp-tactic-group">
                <img src={InvokeSmall} className="infoPopUp-tactic-icon" />
              </span>
            </div>
            <div className="unitInfo-text-heading2">
              Sovereign Tactical Actions
            </div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">⬩Draw 3 Avelhems.</li>
              <li className="unitInfo-text-desc">⬩Draw 2 skills.</li>
              <li className="unitInfo-text-desc">
                ⬩<em>(Available after upgrading Invoke)</em> Gain 2 FD. ⬩Draw 1
                Avelhem. ⬩You may recover 1 “Transcendence”.
              </li>
            </ol>

            <br />

            <div className="unitInfo-text-heading1">
              <strong>Rally </strong>
            </div>
            <div className="unitInfo-text-heading2">
              Sovereign Tactical Actions
            </div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">
                Use 1 instance to deploy a pawn in your frontier.
              </li>
            </ol>
          </>
        );

      case "BP":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <p>
                BP is a resource that can be spent on upgrades during the Bounty
                Phase.
              </p>
              <p>
                Sovereigns can possess up to 10 BP at a time; excesses gained
                are forfeit.
              </p>
              <p>Sovereigns earn BP as follows:</p>

              <ul className="infoPopUp-list2">
                <li className="unitInfo-text-desc">
                  1 BP when an enemy is eliminated.
                </li>
                <li className="unitInfo-text-desc">
                  2 BP when an ally scores.
                </li>
                <li className="unitInfo-text-desc">
                  3 BP when the opponent’s skill repertoire is depleted.
                </li>
              </ul>
            </div>
          </div>
        );

      case "FD":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <p>
                FD is a resource that can be spent to obtain immediate benefits
                during the Defiance Phase.
              </p>
              <p>
                Some effects also require the expenditure of FD to activate.
              </p>
              <p>
                Sovereigns can possess up to 6 FD at a time; excesses gained are
                forfeited.
              </p>
              <p>Sovereigns earn FD as follows:</p>

              <ul className="infoPopUp-list2">
                <li className="unitInfo-text-desc">
                  2 FD when an ally is eliminated.
                </li>
                <li className="unitInfo-text-desc">
                  6 FD when an enemy scores.
                </li>
                <li className="unitInfo-text-desc">
                  6 FD when the opponent’s skill repertoire is depleted.
                </li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="modal-backdrop unitInfo-text">
      <div className="unitInfoModal ">
        <div className="unitInfoHeader">
          <h2 className="unitInfo-name">{infoTitle()}</h2>
          <button
            className="collapseSelected unitInfo-close"
            onClick={() => handleCollapse()}
          >
            X
          </button>
        </div>

        <div className="scrollable">{infoBody()}</div>
      </div>
    </div>
  );
};

export default InfoPopUp;
