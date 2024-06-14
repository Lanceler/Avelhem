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

      case "game":
        return "Gameplay Demo";

      case "fire":
        return "Fire Scion Demo";
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

      case "game":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <p>
                <em>
                  Note: You can close this message by clicking on the X button
                  to the right. If you wish to view this again, click on the{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="question-icon0"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                  </svg>{" "}
                  beside the page header.
                </em>
              </p>
              <br />
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
                3. The game board’s color can either be red or black. It appears
                red to player with priority (usually the turn player). If it
                appears black, switch player to proceed.
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

      case "fire":
        return (
          <div>
            <div className="unitInfo-text-desc">
              <p>
                <em>
                  Note: You can close this message by clicking on the X button
                  to the right. If you wish to view this again, click on the{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="question-icon0"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                  </svg>{" "}
                  beside the page header.
                </em>
              </p>
              <br />
              <p>
                <strong>
                  Brandishing destructive power, Fire Scions exhibit an
                  offense-oriented kit that must be fueled through the
                  expenditure of skill cards and Fever—a unique attribute
                  exclusive to their class.
                </strong>
              </p>
              <br />
              <p>
                Please follow the instructions below. A green glow will envelop
                the objects you need to click on.
              </p>
              <br />
              <p>
                1. Click on your Avelhem hand to raise it, then click on either
                Fire Avelhem then <strong>resonate</strong> it with the other
                copy to ascend your pawn.
              </p>
              <br />
              <p>
                2. Flash Fire (their debut talent) will activate, giving you 2
                options. Select “Gain 2 Fevers.” (The other option of recovering
                a Fire skill will not be available because there are no Fire
                skills in your Vestige.)
              </p>
              <br />
              <p>
                3. Switch player, then press skip at the prompt. Then switch
                back to the first player.
              </p>
              <br />
              <p>
                4. Because you resonated an Avelhem, you may either discard or
                shuffle it back in your repertoire. For this demo, you may do
                either.
              </p>
              <br />
              <p>
                5. Click on the Fire Scion that just ascended and view their
                abilities (bottom right). Activate “Fiery Heart”. This will
                require you to spend 1 Fever or skill; for this demo, we will
                spend the latter. Scroll down the card list and select
                “Transcendence”. (“Transcendence” is a card that literally does
                nothing, and it was designed to be used as discard fodder.)
              </p>
              <br />
              <p>
                6. Click on your ally Metal Scion, who is currently afflicted
                with Frostbite; as per the effect of ”Fiery Heart”, they will be
                thawed from the ice.
              </p>
              <br />
              7. Click on the Fire Scion again, then activate their other
              ability: Afterburner. It will require the use of an Invoke tactic,
              as well as either 2 Fevers or 1 skill. This time, we will spend
              Fever. Without clicking on any cards, click on the “Spend 2 Fever”
              button.
              <br />
              <p>
                8. Click on the enemy pawn to strike them as per Afterburner’s
                effect.
              </p>
              <br />
              <p>
                9. Prompt the same Fire Scion activate a skill (bottom left).
                Activate their burst skill: Resplendence. You will be given the
                option to spend 1 skill to ignite an adjacent enemy; however,
                the only enemy is range is a Water Scion, and they possess a
                talent that grant them immunity to burn. Therefore, press skip.
              </p>
              <br />
              <p>
                10. Prompt the Fire Scion to activate their standard skill:
                Ignition Propulsion. Spend “Transcendence” and choose “strike”
                to attack the Water Scion.
              </p>
              <br />
              <p>
                11. Prompt the Fire Scion to use a tactic (top right) and select
                Mobilize. Have them traverse forward into the opponent’s base.
              </p>
              <br />
              <p>
                12. Select your other Fire Scion and prompt them to resonate
                their resonant skill: Conflagration. When selecting a resonator,
                use “Tea For Two”. You must spend a skill, select “Healing
                Rain.” Click on either Land Scion to attack them.
              </p>
              <br />
              <p>
                13. Prompt your Metal Scion to activate their burst skill:
                Arsenal Onslaught. Attack the enemy Fire Scion.
              </p>
              <br />
              <p>
                15. Activate Vengeful Legacy, then click on the pawn to ascend
                them to a Fire Scion. Flash Fire will activate; this time, the
                second option (recovering a Fire skill) is available. Click on
                it and spend any skill, then recover “Blaze Of Glory.”
              </p>
              <br />
              <p>
                16. As per Vengeful Legacy’s effect, you may float a skill to
                grant the Fire Scion the Ravager status. Press skip.
              </p>
              <br />
              <p>
                17. Switch back to the gold player. You will be given the option
                to reveal a metal skill; since you have none, press skip. You
                will be then given the option to spend a skill to attack again.
                Spend “Chain Lightning”, then strike the enemy Fire Scion.
              </p>
              <br />
              <p>18. Press “End Turn”, then follow the instructions.</p>
              <br />
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
