import React from "react";
import "./Modal.css";

import { updateDemoCount } from "../../redux/demoCount";

import AdvanceSmall from "../../assets/diceIcons/AdvanceSmall.png";
import MobilizeSmall from "../../assets/diceIcons/MobilizeSmall.png";
import AssaultSmall from "../../assets/diceIcons/AssaultSmall.png";
import InvokeSmall from "../../assets/diceIcons/InvokeSmall.png";
// import RallySmall from "../../assets/diceIcons/RallySmall.png";

import { useSelector, useDispatch } from "react-redux";
const InfoPopUp = (props) => {
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const handleCollapse = () => {
    props.setInfoPopUp(null);
  };

  const infoTitle = () => {
    switch (props.info) {
      case "Tactics":
        return "Tactics Guide";

      case "BP":
        return "Bounty Point (BP) Info.";

      case "DP":
        return "Defiance Point (DP) Info.";

      case "Aether-Blast Mitigation":
        return "Aether-Blast Mitigation";

      case "Final Phase":
        return "Final Phase Info.";

      case "game":
        return "Gameplay Demo";

      case "learn":
        return "Gameplay Tutorial";

      case "tea":
        return "Trial Over Tea";

      case "classes":
        return "Class Exhibit";
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
                ⬩Deploy a pawn in your frontier.
              </li>
              <li className="unitInfo-text-desc">
                ⬩Spend 6 DP to gain an Assault tactic.
              </li>
              <li className="unitInfo-text-desc">
                ⬩Float 1 skill to deploy a Scion in your frontier.{" "}
                <em>(Must be unlocked.)</em>
              </li>
            </ol>
            <div className="unitInfo-text-heading2">Unit Tactical Actions</div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">⬩Traverse.</li>
              <li className="unitInfo-text-desc">
                ⬩Aether-blast an adjacent foe.
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
              <em>
                Note: Mobilize provides 3 (4 if upgraded) instances. Units
                cannot use the instances of the same Mobilize tactic more than
                once.
              </em>
            </div>

            <br />

            <div className="unitInfo-text-heading1">
              <strong>Assault </strong>
              <span className="infoPopUp-tactic-group">
                <img src={AssaultSmall} className="infoPopUp-tactic-icon" />
              </span>
            </div>

            <div className="unitInfo-text-heading2">
              Sovereign Tactical Actions
            </div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">
                ⬩Deploy a pawn in your frontier. ⬩You may draw 1 Avelhem.
              </li>
            </ol>

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
            </ol>
            <div className="unitInfo-text-heading2">Unit Tactical Actions</div>
            <ol className="infoPopUp-list">
              <li className="unitInfo-text-desc">
                ⬩Aether-blast an adjacent foe. ⬩If upgraded: You may draw 1
                skill.
              </li>
            </ol>

            <br />
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
                  1 BP upon entering the Bounty Phase.
                </li>
                <li className="unitInfo-text-desc">
                  1 BP when a foe is eliminated.
                </li>
                <li className="unitInfo-text-desc">
                  3 BP when an ally scores.
                </li>
                <li className="unitInfo-text-desc">
                  10 BP when the opponent’s skill repertoire is depleted.
                </li>
              </ul>
            </div>
          </div>
        );

      case "DP":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <p>
                DP is a resource that can be spent to obtain immediate benefits
                during the Defiance Phase.
              </p>
              <p>
                Some effects also require the expenditure of DP to activate.
              </p>
              <p>
                Sovereigns can possess up to 6 DP at a time; excesses gained are
                forfeited.
              </p>
              <p>Sovereigns earn DP as follows:</p>

              <ul className="infoPopUp-list2">
                <li className="unitInfo-text-desc">
                  2 DP when an ally is eliminated.
                </li>
                <li className="unitInfo-text-desc">6 DP when a foe scores.</li>
                <li className="unitInfo-text-desc">
                  6 DP when the opponent’s skill repertoire is depleted.
                </li>
              </ul>
            </div>
          </div>
        );

      case "Aether-Blast Mitigation":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <p>
                When a unit is attacked via Aether-blast, they may mitigate it
                by spending their own Aether. (Tip: Muted units cannot spend
                their Aether; thus, you can deny them the option to mitigate.)
              </p>
              <br />
              <p>
                Migitating an Aether-blast reduces its AP by 1, but it also
                restores the Aether of the attacker. (Tip: Aether-blasts with at
                least 2 AP will still do damage if mitigated; avoid mitigating
                them if they remain lethal, as that would only benefit your
                opponent.)
              </p>

              <br />
              <p>
                Shield and Ward are still consumed when negating attacks that
                have 0 AP. (Tip: If your unit has Shield or Ward, do not make
                them waste their Aether on mitigation.)
              </p>
            </div>
          </div>
        );

      case "Final Phase":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <p>
                Ending the Execution Phase triggers the Final Phase, where the
                Initiator performs the following in sequence:
              </p>
              <br />
              <ol>
                <li>Forfeit unused tactics.</li>
                <li>
                  Discard all Avelhems from hand. (They can retain 1 if they
                  purchase the upgrade.)
                </li>
                <li>Selectively discard skills in excess of 8 from hand.</li>
                <li>
                  Remove their units’ boosts and decrease the durations of their
                  units’ turn-based statuses by 1.
                  <ul>
                    <li>
                      The Burn affliction is decreased first. If multiple units
                      are afflicted with Burn, the Initiator may decrease them
                      in any desired sequence.
                    </li>
                    <li>
                      All other statuses are then decreased simultaneously.
                    </li>
                  </ul>
                </li>
                <li>
                  Score if applicable. A unit scores the first time they occupy
                  a zone in the opponent’s base at the end of the Final Phase.
                  <ul>
                    <li>
                      When the Initiator’s unit scores, they gain 3 BP, while
                      their opponent receives 6 DP.
                    </li>
                    <li>
                      Units that have scored stay on the board and are still
                      counted in their Sovereign’s unit limits, but they can no
                      longer be interacted with.
                    </li>
                    <li>
                      If the Initiator scores with enough units to meet the
                      victory objective, they win the game. Otherwise, their
                      opponent commences the next turn as the Initiator.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        );

      case "game":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <p>
                <strong>
                  Thank you for trying this demo. Please note the following:
                </strong>
              </p>
              <br />
              <p>
                1. This demo allows you play as both players. Identical
                pre-constructed repertoires (decks) have been provided, and they
                will be shuffled. To switch player perspective, click on the
                “Switch Player” button at the bottom left of the board.
              </p>

              <br />
              <p>
                2. This game is coded with rule enforcement and semi-automation.
                If anything appears inconsistent with your interpretation of the
                rules, please let me know. (You can contact me via Discord, my
                username is Lanceler.)
              </p>

              <br />
              <p>
                3. The board’s color can glow blue or red. It appears blue to
                player who is in the position to act (usually the turn player).
                If it appears red, switch player to proceed.
              </p>

              <br />
              <p>
                4. The state of the game will not be saved if you leave the
                demo.{" "}
                <em>
                  (Note: Real games are saved, allowing players to resume
                  progress whenever.)
                </em>
              </p>

              <br />
              <p>
                5. To activate an Avelhem or Sovereign skill card, you must
                first raise your entire hand by clicking on it. Once the cards
                have been raised, you can click on an individual one to display
                it. If you can activate (or even resonate) the displayed card,
                the option will appear.
              </p>

              <br />
              <p>
                6. To use a tactical die, click on it. You can find them at the
                right of the board, between both players’ skill repertoires.
              </p>

              <br />
              <p>7. Clicking on a unit will display its available options.</p>
              <ul className="infoPopUp-list2">
                <li className="unitInfo-text-desc">
                  Top-left: display unit info
                </li>
                <li className="unitInfo-text-desc">
                  Top-right: activate tactical action
                </li>
                <li className="unitInfo-text-desc">
                  Bottom-left: activate skill card
                </li>
                <li className="unitInfo-text-desc">
                  Bottom-right: activate ability
                </li>
              </ul>
              <br />
              <p>
                8. Feel free to contact me with any feedback (especially for
                either game or UI improvements.) Again, my Discord username is
                Lanceler.
              </p>

              <br />
            </div>
          </div>
        );

      case "learn":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <p>
                <strong>
                  <em>Avelhem: War of the Sovereigns</em> is a strategic board
                  game where two Sovereigns (players) deploy and maneuver units
                  on a grid with the objective of reaching the opponent’s end of
                  the board.
                </strong>{" "}
              </p>
              <br />

              <p>
                This demo will serve as an interactive tutorial of the game’s
                rules and general mechanics. Instructions and explanations will
                be displayed at the top right corner of the board, and a{" "}
                <strong>
                  green glow will envelop the objects you need to click on.
                </strong>
              </p>
              <br />
              <p>Estimated time: 20 to 30 minutes.</p>
              <br />
              <p>Close this message to get started.</p>
            </div>
          </div>
        );

      case "tea":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <h4>
                Trial Over Tea is a game mode that introduces a few house rules
                to simplify gameplay:
              </h4>

              <ul className="infoPopUp-list2">
                <li className="unitInfo-text-desc">
                  Sovereigns play with identical repertoires and start with 5
                  BP.
                </li>
                <li className="unitInfo-text-desc">
                  The DP costs of Artifice and Backtrack are reduced from 1 to
                  0.
                </li>
                <li className="unitInfo-text-desc">
                  Sovereigns can click on their own repertoires to view the
                  contents. (The cards will be sorted and won’t reflect their
                  actual order.)
                </li>
              </ul>
            </div>
          </div>
        );

      case "classes":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <h4>This exhibit displays every unit class on the board.</h4>

              <ul className="infoPopUp-list2">
                <li className="unitInfo-text-desc">
                  You can view a class’ details by clicking on the corresponding
                  unit and opening their information page.
                </li>
                <li className="unitInfo-text-desc">
                  The information page lists their talents, abilities, and skill
                  set.
                </li>
                <li className="unitInfo-text-desc">
                  Clicking on a skill card would display it for viewing; you can
                  then click anywhere to close it.
                </li>
              </ul>
            </div>
          </div>
        );
    }
  };

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 64:
            return element1 === "Close";
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 64:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className={"modal-backdrop"}>
      <div className={`info-modal ${props.mobile ? "modal-mobile" : ""}`}>
        <div className="info-modal-header">
          <div className="info-modal-title">{infoTitle()}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={` close-modal-button unitInfo-close ${
              canClick("Close") ? "demoClick" : ""
            }`}
            onClick={() => {
              handleCollapse();
              handleUpdateDemoGuide();
            }}
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
          </svg>
        </div>
        <div className="info-modal-contents scrollable">
          <div className="" style={{ pointerEvents: "all" }}>
            {infoBody()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPopUp;
