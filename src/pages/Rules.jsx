import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Rules.css";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetImages } from "../hooks/useGetImages";

import RulesImg from "../assets/others/Rules.png";
import Setup from "../assets/rules/Setup.jpg";
import UnitTokens from "../assets/rules/UnitTokens.png";
import SkillDisplay from "../assets/rules/SkillDisplay.png";
import SkillSetDisplay from "../assets/rules/SkillSetDisplay.png";
import SkillSubstitute from "../assets/rules/SkillSubstitute.png";
import DiceFaces from "../assets/rules/DiceFaces.png";
import StatusSkill from "../assets/rules/StatusSkill.png";
import EffectSkill from "../assets/rules/EffectSkill.png";
import InterruptSkill from "../assets/rules/InterruptSkill.png";
import KeywordSkill from "../assets/rules/KeywordSkill.png";

import { useSelector, useDispatch } from "react-redux";
import { updateMagnifiedSkill } from "../redux/magnifySkill";
import ZoomCard from "../components/displays/ZoomCard";

export default function Rules() {
  const { id } = useParams(); //note: id was entered as the parameter in the routes of App.jsx
  const navigate = useNavigate();
  const location = useLocation();

  const { getBannerImage } = useGetImages();

  const { magnifiedSkill } = useSelector((state) => state.magnifiedSkill);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !id ||
      ![
        "summary",
        "turn-structure",
        "units",
        "cards",
        "tactics",
        "statuses",
        "effects",
        "trial-over-tea",
      ].includes(id)
    ) {
      navigate("/rules");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const elementId = location.hash.replace("#", "");
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="rule-body">
      <div className="rule-content">
        <div
          className="rules-bg"
          style={{
            backgroundImage: `url(${getBannerImage("WindBG")})`,
          }}
        ></div>

        <div className="rule-content2">
          <div className="rule-title">
            <Link to="/rules/">
              <img src={RulesImg} className="page-title" />
            </Link>
          </div>
          {!id && (
            <div className="rules-text">
              <ol className="rule-index">
                <li>
                  <Link to="/rules/summary">Overview & Summary</Link>
                </li>

                <li>
                  <Link to="/rules/turn-structure">Turn Structure</Link>
                </li>
                <li>
                  <Link to="/rules/units">Units</Link>
                </li>
                <li>
                  <Link to="/rules/cards">Cards</Link>
                </li>
                <li>
                  <Link to="/rules/tactics">Tactics</Link>
                </li>
                <li>
                  <Link to="/rules/statuses">Statuses</Link>
                </li>
                <li>
                  <Link to="/rules/effects">Effects & Keywords</Link>
                </li>
                <li>Appendix (To-do)</li>
                <br />
                <li>
                  <Link to="/rules/trial-over-tea">Trial Over Tea</Link>
                </li>
              </ol>
            </div>
          )}
          {id === "summary" && (
            <div className="rules-text">
              <h2>Overview</h2>
              <p>
                <em>Avelhem: War of the Sovereigns</em> is a two-player board
                game set in a fantastical realm where humanity has inherited the
                Maker’s authority over creation. Players assume the roles of
                Sovereigns, monarchs with dominion over other humans.
              </p>
              <br />
              <p>
                Each turn is divided into several phases during which Sovereigns
                can use up to two tactics to perform various actions, such as
                drawing cards and deploying units. Sovereigns can accumulate
                cards and activate them at opportune moments to supplement their
                limited tactics.
              </p>
              <br />
              <p>
                Units enter battle as pawns that can move and attack. With the
                use of Avelhem cards, pawns can ascend to Scions with elemental
                affinities that grant access to unique abilities, talents, and
                skill cards that offer a range of thematic effects.
              </p>
              <br />

              <h3>Objective</h3>
              <p>
                A Sovereign wins by moving a designated number of their units to
                the opponent’s end of the board.
              </p>

              <br />
              <h3>Components</h3>
              <ol>
                <li>Game board</li>
                <ul>
                  <li>Features a grid with 10 rows and 5 columns</li>
                </ul>

                <li>Custom dice</li>
                <ul>
                  <li>
                    3 identical cubic dice; faces consist of 2 Advance, 2
                    Mobilize, 1 Assault, and 1 Invoke
                  </li>
                </ul>

                <li>Avelhem and skill cards</li>
                <ul>
                  <li>
                    The base game provides 2 playsets each consisting of 32 (8
                    unique) Avelhems and 136 (46 unique) skills
                  </li>
                </ul>

                <li>Unit tokens</li>
                <ul>
                  <li>
                    The base game provides gold and silver sets each with 8
                    pawns and 16 (8 unique) Scion tokens
                  </li>
                </ul>

                <li>Player boards</li>
                <ul>
                  <li>
                    Displays upgrades and tallies Bounty Points and Defiance
                    Points
                  </li>
                </ul>

                <li>Miscellaneous tokens</li>
                <ul>
                  <li>Tracks and represents units’ attributes and statuses</li>
                  <li>
                    (The digital simulator does not use these tokens; rather, it
                    utilizes various visual assets)
                  </li>
                </ul>
              </ol>
              <hr />
              <h2>Setup</h2>
              <p>
                In this website, users can host a game through the Create Game
                page and invite an opponent by sending them the link. One must
                be logged in to host or join a game. Once a second player has
                joined, third parties can use the same link to spectate.
              </p>
              <br />
              <p>
                Sovereigns perform the following steps when starting a game:
              </p>
              <br />

              <h3>1. Agree on the score objective</h3>
              <p>
                By default, the game is a race to score 1 point. Whenever
                victory is achieved, the Sovereigns may opt to continue the game
                by raising the objective by 1, up to a maximum of 5. It is
                recommended that Sovereigns agree on a final score objective
                beforehand, as it may influence strategies and repertoire
                creation.
              </p>

              <br />
              <h3>2. Select repertoires (decks)</h3>
              <p>
                New accounts are provided 3 identical starter repertoires, which
                can be customized in the Repertoires page. Avelhem and skill
                repertoires must contain exactly 20 and 60 cards, respectively.
              </p>
              <br />

              <h3>
                3. Distribute unit tokens and decide who plays the first turn
              </h3>
              <p>
                The host is assigned the gold unit tokens and given the choice
                of playing first or second (they also have the option of
                choosing randomly). Their opponent is assigned the silver unit
                tokens.
              </p>
              <br />

              <h3>4. Choose sides and deploy pawns</h3>
              <p>
                The board is oriented with 10 rows and 5 columns. Sovereigns
                take their positions on opposite sides, with the row closest to
                each of them designated as their base. Pawns are deployed on the
                1st, 3rd, and 5th columns of the 4th row from each Sovereign’s
                side.
                <br />
                (Note: Units acquire Aether when they are deployed; in a
                physical implementation, these would be represented by one of
                the miscellaneous tokens.)
              </p>
              <br />

              <h3>5. Set Defiance Points (DP) counters to 3</h3>
              <p>
                In this digital simulator, a Sovereign’s DP, as well as their
                BP, is displayed between their Avelhem and skill repertoires.
              </p>
              <br />

              <h3>6. Shuffle repertoires and draw skill cards</h3>
              <p>
                After shuffling, the Sovereign who goes first draw 5 skill
                cards, while their opponent draws 6.
              </p>
              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">
                  Gamestate at setup (virtual simulator)
                </div>
                <img
                  src={Setup}
                  className="rules-skill-display"
                  alt="Gamestate at setup"
                />
              </div>
              <hr />

              <h2>Turn Structure</h2>
              <p>
                The Initiator refers to the Sovereign whose turn it currently
                is. Each turn consists of six phases. For more information,
                visit the{" "}
                <Link to="/rules/turn-structure">Turn Structure page</Link>.
              </p>
              <br />
              <h3>Acquisition Phase</h3>
              <p>
                The Acquisition Phase begins the Initiator’s turn, offering the
                opportunity to bolster their resources by deploying a pawn or
                drawing cards.
              </p>

              <br />
              <h3>Bounty Phase</h3>
              <p>
                During the Bounty Phase, the Initiator receives 1 Bounty Point
                (BP) and can access the BP shop.
              </p>
              <br />
              <h3>Coordination Phase</h3>
              <p>
                The Coordination Phase provides the Initiator with tactics,
                which determine their possible actions.
              </p>

              <br />
              <h3>Defiance Phase</h3>
              <p>
                The Defiance Phase is where the Initiator can spend Defiance
                Points (DP) on immediate benefits that can improve their current
                turn, such as rerolling unfavorable tactics or drawing an
                additional skill card.
              </p>

              <br />
              <h3>Execution Phase</h3>
              <p>
                The Execution Phase is where the Initiator and their units
                perform actions and activate effects.
              </p>

              <br />

              <h3>Final Phase</h3>
              <p>
                The Final Phase concludes the Initiator’s turn by resolving
                tasks such as discarding excess cards and reducing the duration
                of status conditions. If the game is not over, the other
                Sovereign begins their turn as the new Initiator.
              </p>

              <hr />

              <h2>Units</h2>
              <p>
                Units are the Sovereigns’ subservient soldiers. When in play,
                they occupy a zone on the board. (Zones can only have 1
                occupant.) Each Sovereign can have up to 8 units in play at a
                time, and no more than 2 ally Scions can have the same class.
                For more information, visit the{" "}
                <Link to="/rules/units">Units page</Link>.
              </p>
              <br />
              <h3>Deployment</h3>
              <p>
                With the exception of the pawns in the start of the game, units
                are deployed within their Sovereign’s frontier, which initially
                includes the first 3 rows from their side of the board.
                Sovereigns can spend BP to expand their frontier.
              </p>
              <br />
              <h3>Health Points (HP)</h3>
              <p>
                Units start with 1 HP, which can be increased by certain effects
                and reduced primarily by attacks. An attack’s power (AP)
                determines the amount of HP it deducts, with the default AP
                being 1.
              </p>
              <br />
              <h3>Elimination</h3>
              <p>
                Units are eliminated and removed from play when their HP is
                depleted. Sovereigns receive 2 DP when their units are
                eliminated, and they are awarded 1 BP when they eliminate their
                opponent’s units.
              </p>
              <br />
              <h3>Class and Ascension</h3>
              <p>
                A unit’s class defines its capabilities. Units start as pawns
                and can ascend to Scions with access to class-exclusive
                abilities, talents, and skills.
              </p>
              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">
                  From left to right: Pawn, Metal Scion, & Fire Scion unit
                  tokens
                </div>
                <img
                  src={UnitTokens}
                  className="rules-unit-token"
                  alt="From left to right: Pawn, Metal Scion, Fire Scion"
                />
              </div>
              <hr />
              <h2>Cards</h2>
              <p>
                Cards belong to two categories: Avelhems and skills, each with
                its own repertoire (deck) and vestige (discard pile). Cards can
                be activated from the hand to apply their effects and are sent
                to the vestige once those effects conclude, unless otherwise
                specified. When a repertoire is depleted, its corresponding
                vestige is shuffled to replenish it. For more information, visit
                the <Link to="/rules/cards">Cards page</Link>.
              </p>
              <br />
              <h3>Avelhems</h3>
              <p>
                The titular Avelhems refer to the power and authority over the
                elements of creation. In this game, they take the form of cards
                that Sovereigns can activate to ascend their pawns to Scions of
                a specified class. The icon at an Avelhem’s top left corner
                reflects its corresponding Scion class.
              </p>
              <br />
              <h3>Skills</h3>
              <p>
                Skills are the applications of powers granted by Avelhems. These
                cards offer a wider variety of effects that can activated by
                Sovereigns, as well as units. The icon at the top left corner of
                a skill card represents its facet, which determines who can
                exclusively activate it. For example, a Sovereign skill (which
                has a crown icon) can only be activated by a Sovereign.
                Likewise, a Lightning skill can only be activated by a Lightning
                Scion. The gem below a skill’s facet is its method, which
                determines mechanics of its activation.
              </p>
              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">
                  From left to right: Plant Avelhem, Sovereign skill, &
                  Lightning skill cards
                </div>

                <img
                  src={SkillDisplay}
                  className="rules-skill-display"
                  alt="Left: Plant Avelhem card; Right: Reminiscence, a Standard Sovereign skill card"
                />
              </div>
            </div>
          )}

          {id === "turn-structure" && (
            <div className="rules-text">
              <h2>Turn Structure</h2>
              <p>
                The Initiator refers to the Sovereign whose turn it currently
                is. Each turn consists of six phases.
              </p>
              <br />
              <h3>Acquisition Phase</h3>
              <p>
                The Acquisition Phase begins the Initiator’s turn, offering the
                opportunity to bolster their resources.
              </p>
              <br />
              <p>
                During this phase, the Initiator must choose 1 of the following:
              </p>
              <ul>
                <li>Appoint: Deploy a pawn in your frontier.</li>
                <li>Beseech: Draw 2 Avelhems.</li>
                <li>Cultivate: Draw 1 skill. </li>
              </ul>
              <br />
              <h3>Bounty Phase</h3>
              <p>
                During the Bounty Phase, the Initiator receives 1 Bounty Point
                (BP) and accesses the BP shop, where they can spend BP on
                upgrades. These are organized into tiered categories, with
                higher-tier items becoming available once their prerequisites
                are purchased. Multiple purchases can be made in a single turn,
                provided the Initiator has sufficient BP.
              </p>
              <br />
              <h3>Coordination Phase</h3>
              <p>
                The Coordination Phase provides the Initiator with tactics,
                which determine their possible actions.
              </p>

              <br />
              <p>
                During this Phase, the Initiator must choose 1 of the following:
              </p>
              <ul>
                <li>Assent: Roll 2 tactical dice.</li>
                <li>Battle Cry: Spend 3 skills to gain 1 Assault tactic.</li>
                {/* <li>Convene: Gain 1 Rally tactic.</li> */}
              </ul>
              <br />
              <h3>Defiance Phase</h3>
              <p>
                The Defiance Phase is where the Initiator can spend Defiance
                Points (DP) on immediate benefits that can improve their current
                turn.
              </p>
              <br />
              <p>
                During this phase, the Initiator may choose 1 of the following:
              </p>
              <ul>
                <li>
                  Artifice: Spend 1 DP to select up to 5 skills from your hand;
                  place them at the bottom of your repertoire, then draw the
                  same number.
                </li>
                <li>Backtrack: Spend 1 DP to reroll your tactics.</li>
                <li>
                  Curate: Spend 2 DP to reroll your tactics with 3 dice, then
                  disregard 1 of them.
                </li>
                <li>
                  Destine: Spend 2 DP and 1 Scion skill to ascend an ally pawn
                  to the matching class.
                </li>
                <li>Ex Machina: Spend 3 DP to search for 1 Sovereign skill.</li>
                <li>Finesse: Spend 3 DP to draw 1 skill.</li>
              </ul>
              <br />
              <h3>Execution Phase</h3>
              <p>
                The Execution Phase is where the Initiator and their units
                perform actions and activate effects.
              </p>
              <br />
              <p>
                The following can be performed in any sequence, combination, and
                frequency, provided the resources are sufficient:
              </p>
              <ul>
                <li>
                  Activate an Avelhem or skill card (
                  <Link to="/rules/cards">See Cards</Link>).
                </li>
                <li>
                  Use a tactic to perform an action (
                  <Link to="/rules/tactics">See Tactics</Link>).
                </li>
                <li>
                  Activate a unit’s ability (
                  <Link to="/rules/units">See Units</Link>).
                </li>
              </ul>
              <br />
              <p>
                When there are no ongoing effects, the Initiator can conclude
                their Execution Phase.
              </p>
              <br />

              <h3>Final Phase</h3>
              <p>
                The Final Phase concludes the Initiator’s turn by making them
                apply the following in sequence:
              </p>
              <ol>
                <li>Forfeit unused tactics.</li>
                <li>Discard all Avelhems from hand.</li>
                <li>Selectively discard skills in excess of 8 from hand.</li>

                <li>
                  Remove their units’ boosts and decrease the durations of their
                  units’ turn-based statuses by 1.
                  <ul>
                    <li>
                      The Burn affliction is decreased first, followed by all
                      other statuses simultaneously.
                    </li>
                    <li>
                      If multiple of the Initiator’s units are afflicted with
                      Burn, they may decrease them in any desired sequence.
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
          )}

          {id === "units" && (
            <div className="rules-text">
              <h2>Units</h2>
              <p>
                Units are the Sovereigns’ subservient soldiers. When in play,
                they occupy a zone on the board. (Zones can only have 1
                occupant.) Each Sovereign can have up to 8 units in play at a
                time, and no more than 2 ally Scions can have the same class.
              </p>
              <br />
              <h3>Deployment</h3>
              <p>
                With the exception of the pawns in the start of the game, units
                are deployed within their Sovereign’s frontier, which initially
                includes the first 3 rows from their side of the board.
                Sovereigns can spend BP to expand their frontier.
              </p>
              <br />
              <h3>Health Points (HP)</h3>
              <p>
                Units start with 1 HP, which can be increased by certain effects
                and reduced primarily by attacks. An attack’s power (AP)
                determines the amount of HP it deducts, with the default AP
                being 1. In the digital simulator, HP is displayed within a
                heart-shaped icon at the bottom left side of a unit.
              </p>
              <br />
              <h3>Elimination</h3>
              <p>
                Units are eliminated and removed from play when their HP is
                depleted. Sovereigns receive 2 DP when their units are
                eliminated, and they are awarded 1 BP when they eliminate their
                opponent’s units.
              </p>
              <br />

              <h3>Class and Ascension</h3>
              <p>
                A unit’s class defines its capabilities. Units start as pawns
                and can ascend to Scions with access to class-exclusive
                abilities, talents, and skills. A pawn’s capability to ascend is
                tied to their “Apotheosis” talent; thus, they cannot ascend if
                they are muted (see <Link to="/rules/statuses">Statuses</Link>).
              </p>
              <br />

              <h3>Abilities</h3>
              <p>
                Scions have 2 unique abilities, which are special actions they
                can manually activate. Some abilities require a tactic to be
                used. Each ability can be activated no more than once per turn;
                this limit applies to units individually.
              </p>
              <br />

              <h3>Talents</h3>
              <p>
                Each class has 2 unique talents that provide passive effects.
                Some talents are triggered by events. If an event triggers both
                a talent and a contingent skill (see{" "}
                <Link to="/rules/cards">Cards</Link>), the talent activates
                first.
              </p>
              <br />

              <h3>Aether</h3>
              <p>
                Aether is granted to a unit upon their deployment, and it is
                primarily spent to perform and mitigate Aether-blasts (see{" "}
                <Link to="/rules/tactics">Tactics</Link>). Units cannot possess
                more than 1 Aether.
              </p>
              <br />

              <h3>Boosts</h3>
              <p>
                Boosts are temporary benefits that can improve a unit’s
                performance. Boosts expire upon their application or at the
                Final Phase if unutilized. Units muted by a status have their
                boosts negated.
              </p>
              <br />

              <h3>Status</h3>
              <p>
                Statuses are conditions that influence units. Positive statuses
                are called enhancements, while negative ones are called
                afflictions. For more information, visit the{" "}
                <Link to="/rules/statuses">Statuses page</Link>.
              </p>
              <br />

              <h3 className="rules-anathema">Anathema</h3>
              <p>
                Anathema is a Scion’s punishment for using their Avelhem to slay
                a fellow Demigod or human. When a Scion eliminates another Scion
                or pawn, they are afflicted with Anathema for 2 turns. The
                affliction is delayed until the unit has resolved all the
                effects they have activated. For example, suppose a Scion
                activates a skill card that lets them attack and then perform an
                additional effect. If the skill’s attack eliminates an enemy,
                Anathema will be delayed until the entire skill has concluded.
              </p>
              <br />
              <br />

              <div className="rules-image-container">
                <div className="rules-image-desc">
                  From left to right: Pawn, Metal Scion, & Fire Scion unit
                  tokens
                </div>
                <img
                  src={UnitTokens}
                  className="rules-unit-token"
                  alt="From left to right: Pawn, Metal Scion, Fire Scion"
                />
              </div>
            </div>
          )}
          {id === "cards" && (
            <div className="rules-text">
              <h2>Cards</h2>
              <p>
                Cards belong to two categories: Avelhems and skills, each with
                its own repertoire (deck) and vestige (discard pile). Cards can
                be activated from the hand to apply their effects and are sent
                to the vestige once those effects conclude, unless otherwise
                specified.
              </p>
              <br />
              <p>
                When a repertoire is depleted, its corresponding vestige is
                shuffled to replenish it. Sovereigns cannot view the contents of
                their repertoires unless they are performing a search or
                inspection. Sovereigns are allowed to view the contents of their
                own vestiges at any time.
              </p>
              <br />
              <h3>Avelhems</h3>
              <p>
                The titular Avelhems refer to the power and authority over the
                elements of creation. In this game, they take the form of cards
                that Sovereigns can activate to ascend their pawns to Scions of
                a specified class. The icon at an Avelhem’s top left corner
                reflects its corresponding Scion class.
              </p>
              <br />
              <p>
                Sovereigns can resonate Avelhems by activating them together
                with a resonator, which can be either an identical card or a
                valid substitute. When a card is resonated, its resonance will
                be applied as an additional effect.
              </p>
              <br />
              <h3>Skills</h3>
              <p>
                Skills are the applications of powers granted by Avelhems. These
                cards offer a wider variety of effects that can activated by
                Sovereigns, as well as units.
              </p>

              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">
                  From left to right: Plant Avelhem, Sovereign skill, &
                  Lightning skill cards
                </div>

                <img
                  src={SkillDisplay}
                  className="rules-skill-display"
                  alt="Left: Plant Avelhem card; Right: Reminiscence, a Standard Sovereign skill card"
                />
              </div>

              <br />
              <br />

              <h3>Facets</h3>
              <p>
                The icon at the top left corner of a skill card represents its
                facet, which determines who can exclusively activate it. For
                example, a Sovereign skill (which has a crown icon) such as{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("SA-04"));
                  }}
                >
                  Reminiscence
                </span>{" "}
                can only be activated by a Sovereign. Likewise, a Lightning
                skill such as{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("05-04"));
                  }}
                >
                  Valiant Spark
                </span>{" "}
                can only be activated by a Lightning Scion.
              </p>

              <br />
              <h3>Method</h3>
              <p>
                The gem below a skill’s facet is its method, which determines
                mechanics of its activation. A Scion’s skill set consists of 4
                cards, 1 for each method: standard, resonant, contingent, and
                burst.
              </p>

              <br />

              <p>
                <strong>Standard</strong>
                <ul>
                  <li>Standard skills are the simplest to activate.</li>
                  <li>
                    They follow all general card mechanics: they can only be
                    activated during the Execution Phase when there is no other
                    effect ongoing, and they are sent to the vestige after
                    concluding their effects.
                  </li>
                  <li>
                    Their icon is a circular blue sapphire. For example, see{" "}
                    <span
                      className="rule-view-card"
                      onClick={() => {
                        dispatch(updateMagnifiedSkill("01-01"));
                      }}
                    >
                      Ignition Propulsion
                    </span>
                    .
                  </li>
                </ul>
              </p>

              <br />

              <p>
                <strong>Resonant</strong>
                <ul>
                  <li>
                    Resonant skills also follow the general card mechanics.
                  </li>
                  <li>
                    Like Avelhems, they possess resonances, which are extra
                    effects that are applied if they are resonated (activated
                    with a resonator, which can be either an identical card or
                    valid substitute).
                  </li>
                  <li>
                    Their icon is a rectangular green and purple alexandrite.
                    For example, see{" "}
                    <span
                      className="rule-view-card"
                      onClick={() => {
                        dispatch(updateMagnifiedSkill("01-02"));
                      }}
                    >
                      Conflagration
                    </span>
                    .
                  </li>
                </ul>
              </p>

              <br />

              <p>
                <strong>Contingent</strong>
                <ul>
                  <li>
                    Contingent skills have a “contingency” listed before their
                    effects.
                  </li>
                  <li>
                    As the exception to the rules, contingent skills can be
                    activated outside the owner’s Execution Phase and even while
                    other effects are ongoing, but only at the moment their
                    contingencies are satisfied.
                  </li>
                  <li>
                    When an effect is interrupted by a contingent skill, it will
                    resume — if possible — after the latter concludes.
                  </li>
                  <li>
                    Only 1 contingent skill can be activated in response to a
                    triggering event. If both Sovereigns have contingent skills
                    that were simultaneously triggered, the Initiator (the
                    Sovereign whose turn it currently is), yields priority to
                    their opponent.
                  </li>
                  <li>
                    If an event triggers both a talent (see{" "}
                    <Link to="/rules/units">Units</Link>) and a contingent
                    skill, the talent activates first.
                  </li>
                  <li>
                    Their icon is a triangular red ruby. For example, see{" "}
                    <span
                      className="rule-view-card"
                      onClick={() => {
                        dispatch(updateMagnifiedSkill("01-03"));
                      }}
                    >
                      Blaze of Glory
                    </span>
                    .
                  </li>
                </ul>
              </p>

              <br />

              <p>
                <strong>Burst</strong>
                <ul>
                  <li>
                    Burst skills observe the general card mechanics with one
                    major deviation.
                  </li>
                  <li>
                    Unlike other cards, burst skills are shattered (removed from
                    play) rather than discarded after they conclude their
                    effects. Discarding them via any other means (such as
                    spending) would still send them to the vestige.
                  </li>
                  <li>
                    Shattered skills are set aside where they are revealed to
                    both Sovereigns.
                  </li>
                  <li>
                    Their icon is a hexagonal purple amethyst. For example, see{" "}
                    <span
                      className="rule-view-card"
                      onClick={() => {
                        dispatch(updateMagnifiedSkill("01-04"));
                      }}
                    >
                      Resplendence
                    </span>
                    .
                  </li>
                </ul>
              </p>

              <br />
              <br />

              <div className="rules-image-container">
                <div className="rules-image-desc">
                  From left to right: Fire standard, resonant, contingent, &
                  burst skills
                </div>

                <img
                  src={SkillSetDisplay}
                  className="rules-skill-display"
                  alt="From left to right: Fire standard, resonant, contingent, & burst skills"
                />
              </div>

              <br />
              <br />

              <h2>Substitute</h2>
              <p>
                Some skills have a “Substitute” property that allows them to
                function as a resonator for certain cards. When used this way,
                these skills provide alternative effects in place of their
                primary ones. For example,{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("SA-01"));
                  }}
                >
                  Heir’s Endeavor
                </span>{" "}
                as a resonator can only resonate with Sovereign skills, and it
                allows the activator to inspect skills when the resonance
                concludes, while its primary effect of recovering a Sovereign
                skill is ignored.
              </p>
              <br />
              <h2>Float</h2>
              <p>
                Some effects require or cause cards to be floated. When a card
                is floated, it is placed on top of its repertoire and rotated by
                90 degrees. When repertoires are shuffled, their floating cards
                retain their positions on top.
              </p>

              <br />
              <br />

              <div className="rules-image-container">
                <div className="rules-image-desc">
                  Skills with substitute properties and effects that can float
                  cards
                </div>

                <img
                  src={SkillSubstitute}
                  className="rules-skill-display"
                  alt="Skills with substitute properties and effects that can float cards"
                />
              </div>
            </div>
          )}
          {id === "tactics" && (
            <div className="rules-text">
              <h2>Tactics</h2>
              <p>
                Tactics are resources representing opportunities to execute
                actions. They are obtained during the Coordination Phase, where
                certain options either guarantee specific tactics or provide
                random ones through dice rolls. Unused tactics do not carry over
                to the next turn.
              </p>
              <br />
              <p>
                There are 5 tactics, each offering a unique set of options for
                Sovereigns and units.
              </p>
              <br />
              <h3>Advance</h3>
              <ul>
                <li>Roll chance: 2 / 6</li>
                <li>
                  Sovereign Actions:
                  <ul>
                    <li>Deploy a pawn.</li>
                    <li>Spend 6 DP to convert to an Assault tactic.</li>
                    <li>
                      Float 1 skill to deploy a Scion.{" "}
                      <em>(Must be unlocked via Bounty Phase.)</em>
                    </li>
                  </ul>
                </li>
                <li>
                  Units Actions:
                  <ul>
                    <li>
                      <a
                        onClick={() => {
                          navigate("/rules/effects#traverse");
                        }}
                      >
                        Traverse
                      </a>
                      .
                    </li>
                    <li>Aether-blast an adjacent foe.</li>
                  </ul>
                </li>
              </ul>
              <br />
              <h3>Mobilize</h3>
              <ul>
                <li>Roll chance: 2 / 6</li>
                <li>
                  Mobilize provides 3 instances; actions are performed using
                  instances rather than the entire tactic.
                </li>
                <li>
                  Sovereign Action:
                  <ul>
                    <li>Use 2 instances to draw 1 skill.</li>
                  </ul>
                </li>
                <li>
                  Units Action:
                  <ul>
                    <li>
                      Use 1 instance to traverse (move to a vacant adjacent
                      zone).
                    </li>
                  </ul>
                </li>
              </ul>
              <br />
              <pr>
                Note: A unit cannot use an individual Mobilize tactic more than
                once. For example, a unit that traverses using 1 Mobilize
                instance cannot use the remaining instances of the same tactic
                to traverse again, but they are allowed to traverse via a second
                Mobilize tactic.
              </pr>
              <br />
              <br />
              <h3>Assault</h3>
              <ul>
                <li>Roll chance: 1 / 6</li>
                <li>Assault does not provide any Sovereign actions.</li>
                <li>
                  Units Actions:
                  <ul>
                    <li>Traverse (move to a vacant adjacent zone).</li>
                    <li>
                      Strike (attack an adjacent foe, then move to their zone if
                      they were eliminated).
                    </li>
                  </ul>
                </li>
              </ul>
              <br />
              <h3>Invoke</h3>
              <ul>
                <li>Roll chance: 1 / 6</li>
                <li>
                  Sovereign Actions:
                  <ul>
                    <li>Draw 3 Avelhems.</li>
                    <li>Draw 2 skills.</li>
                  </ul>
                </li>
                <li>Invoke does not provide any unit actions.</li>
              </ul>
              <br />
              <h3>Rally</h3>
              <ul>
                <li>Roll chance: 0; obtainable only via Convene</li>
                <li>
                  Rally provides 2 instances; actions are performed using
                  instances rather than the entire tactic.
                </li>
                <li>
                  Sovereign Action:
                  <ul>
                    <li>Use 1 instance to deploy a pawn.</li>
                  </ul>
                </li>
                {/* <li>Rally does not provide any unit actions.</li> */}
              </ul>
              <br />
              <h2>Other Uses</h2>
              <p>
                In addition to the actions discussed above, the activation of
                some abilities and the effects of some skills require tactics.
              </p>
              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">
                  From left to right: Advance, Mobilize, Assault, Invoke, &
                  Rally
                </div>

                <img
                  src={DiceFaces}
                  className="rules-skill-display"
                  alt="From left to right: Advance, Mobilize, Assault, Invoke, & Rally"
                />
              </div>
            </div>
          )}
          {id === "statuses" && (
            <div className="rules-text">
              <h2>Statuses</h2>
              <p>
                Statuses are conditions that influence units. Positive statuses
                are called enhancements, while negative ones are called
                afflictions. In the physical implementation of the game,
                miscellaneous tokens would represent statuses; in the digital
                simulator, various visual assets are used instead.
              </p>
              <br />
              <h3>Duration</h3>
              <p>
                The duration of a turn-based status is stated with the effect or
                mechanic that applies it. In the absence of an explicit
                duration, the status persists indefinitely. For example,{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("02-02"));
                  }}
                >
                  Frigid Breath
                </span>{" "}
                can freeze (apply frost) enemy units for 1 turn, while{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("08-02"));
                  }}
                >
                  Efflorescence
                </span>{" "}
                grants the activator Overgrowth indefinitely.
              </p>
              <br />
              <p>
                Turn-based statuses decrease in duration during the Final Phase,
                after excess cards are discarded. If present, the Burn
                affliction is always the first status to tick down, followed by
                all other statuses simultaneously. If multiple units are
                afflicted with Burn, the Sovereign chooses the order in which
                Burn expires for each unit.
              </p>
              <br />
              <h3>Removal</h3>
              <p>
                Statuses are removed either through purge or expiration. Purge
                refers to a keyword found in certain effects or mechanics that
                explicitly remove specific statuses. Purge also occurs when a
                unit acquires immunity to a corresponding affliction. Expiration
                occurs when the duration of a status drops to 0 — typically
                during the Final Phase. The distinction between purge and
                expiration matters solely for the Burn affliction, as Burn
                causes damage to the affected unit only if it expires.
                {/* Note: update with Infect and Avian passive */}
              </p>
              <br />
              <p>
                Note: Eliminating a unit does not purge their statuses. For
                example, the{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("AmbianceAssimilation"));
                  }}
                >
                  Ambiance Assimilation
                </span>{" "}
                talent of Mana Scions activates when they are eliminated. This
                talent will not activated if they are muted by an affliction.
              </p>
              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">
                  A skill that can apply a temporary status (left) & a skill
                  that can apply an indefinite status (right)
                </div>

                <img
                  src={StatusSkill}
                  className="rules-skill-display"
                  alt="A skill that can apply a temporary status & a skill
                  that can apply an indefinite status"
                />
              </div>
              <br />
              <br />
              <h3>Enhancements</h3>
              <ul>
                <li>
                  <strong>Ravager</strong>: Grants the unit immunity to
                  Anathema.
                </li>
                <li>
                  <strong>Ward</strong>: Negates the next attack or affliction
                  that targets the unit.
                </li>
                <li>
                  <strong>Shield</strong>: Negates the next attack that targets
                  the unit, unless they are enhanced with Ward.
                </li>
                <li>
                  <strong>Disruption</strong>: Prevents foes within 2 spaces
                  from the unit from activating abilities and spending their
                  Aether. Prevents foes adjacent to the unit from activating
                  non-burst skills. This status is purged if the unit is muted
                  or not enhanced with Shield.
                </li>
                <li>
                  <strong>Overgrowth</strong>: Enemies adjacent to the unit are
                  afflicted with Root. This status is purged if the unit moves
                  or has an affliction.
                </li>
              </ul>
              <br />
              <h3>Afflictions</h3>
              <ul>
                <li>
                  <strong>Anathema</strong>: Mutes the unit.
                </li>
                <li>
                  <strong>Paralysis</strong>: Mutes and immobilizes the unit.
                </li>
                <li>
                  <strong>Frost</strong>: Mutes and immobilizes the unit.
                </li>
                <li>
                  <strong>Burn</strong>: Grants the unit immunity to Frost. When
                  this status expires, the unit loses 1 HP.
                </li>
                <li>
                  <strong>Root</strong>: Prevents the unit from performing a
                  strike. Forces the unit to spend 1 skill when they traverse or
                  Aether-blast via tactical action. This status is purged if the
                  unit is not adjacent to an enemy enhanced with Overgrowth.
                </li>
              </ul>
              <br />
              <h3>Mute</h3>
              <p>
                Afflictions that mute units disable their powers. Muted units
                cannot attack, spend Aether, or activate skill cards, talents,
                and abilities. Any boosts (see{" "}
                <Link to="/rules/units">Units</Link>) they possess or would
                receive are removed.
              </p>
              <br />

              <p>
                To put it simply, the only action muted units can perform is to
                traverse.
              </p>

              <br />
              <h3>Immobilize</h3>
              <p>
                Afflictions that immobilize units prevent them from performing
                any action.
              </p>
            </div>
          )}

          {id === "effects" && (
            <div className="rules-text">
              <h2>Effects</h2>
              <p>
                Effects are the instructions of cards, actions, abilities,
                talents, and keywords. These are broken down into steps,
                typically consisting of single sentences. Steps are written from
                the perspective of the entity performing them. On cards, steps
                are separated by line breaks for clarity.
              </p>
              <br />

              <p>
                Steps are mandatory by default; those qualified with the phrase{" "}
                <em>“you may” </em>are optional. An effect cannot be activated
                if its mandatory steps cannot be fulfilled. For example, a
                Sovereign cannot activate{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("SB-05"));
                  }}
                >
                  Press the Attack
                </span>{" "}
                unless they have 2 Advance tactics to convert. Its subsequent
                steps are optional.
              </p>

              <br />
              <p>
                Conditional steps have statements that begin with <em>“if”</em>{" "}
                and are applied only when their statements are true. A false
                statement will not prevent the activation of the effect, but its
                corresponding step will be ignored. For example, a Mana Scion
                who activates{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("06-03"));
                  }}
                >
                  Aegis
                </span>{" "}
                will draw a skill only if they were targeted. Regardless, it
                will proceed to its next step.
              </p>

              <br />
              <p>
                Modular steps present the activator a choice between two
                options. Either can be chosen, provided it can be accomplished.
                Continuing from the previous example, a Mana Scion who activates{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("06-03"));
                  }}
                >
                  Aegis
                </span>{" "}
                must either grant Shield or spend 1 skill to grant Ward (see{" "}
                <Link to="/rules/statuses">Statuses</Link>) to the targeted
                unit. If they cannot spend a skill, they default to the former
                option.
              </p>

              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">
                  A skill with optional steps (left), & a skill with conditional
                  and modular steps (right)
                </div>

                <img
                  src={EffectSkill}
                  className="rules-skill-display"
                  alt="Skills with mandatory, optional, conditional, and modular steps"
                />
              </div>

              <br />
              <br />

              <h2>Interruption</h2>
              <p>
                Effects cannot be stopped or interrupted unless a talent or
                contingent skill is triggered and activated, which would then
                apply its own effect. After the interruptions’ effects resolve,
                the effect that was interrupted resumes, unless the aftermath of
                the interruption has made it impossible to do so. For example,
                if a Lightning Scion activates{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("05-02"));
                  }}
                >
                  Zip and Zap
                </span>{" "}
                and uses its first step to move next to an enemy Land Scion, the
                Land Scion can activate{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("04-03"));
                  }}
                >
                  Pitfall Trap
                </span>{" "}
                before the second step of Zip and Zap applies. If Pitfall Trap
                paralyzes or eliminates the Lightning Scion, Zip and Zap
                concludes abruptly since its remaining steps can no longer be
                applied. Conversely, if Pitfall Trap fails to incapacitate the
                Lightning Scion, they will resume applying the effect of Zip and
                Zap.
              </p>

              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">
                  Pitfall Trap (right) can interrupt Zip and Zap (left)
                </div>

                <img
                  src={InterruptSkill}
                  className="rules-skill-display"
                  alt="Pitfall Trap (right) can interrupt Zip and Zap (left)"
                />
              </div>

              <br />
              <br />

              <h2>Keywords</h2>
              <p>
                Keywords are effects compressed into single words for the sake
                of brevity. These observe the same rules discussed earlier and
                can appear within other effects. For example, the first step of{" "}
                <span
                  className="rule-view-card"
                  onClick={() => {
                    dispatch(updateMagnifiedSkill("07-04"));
                  }}
                >
                  Arsenal Onslaught
                </span>{" "}
                is simply “Strike”. This can be restated and expanded as 3
                steps: “(1)Target an adjacent foe. (2)Attack them. (3)If the
                attack was lethal, move to the zone they were occupying.”
              </p>

              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">Skills with keywords</div>

                <img
                  src={KeywordSkill}
                  className="rules-skill-display"
                  alt="Skills with keywords"
                />
              </div>

              <br />
              <br />

              <h2>Unit Keywords</h2>
              <p>Below is a list of keywords that influence units.</p>

              <br />
              <h3>Traverse</h3>
              <ul>
                <li>Move to an adjacent zone.</li>
              </ul>
              <br />
              <h3>Strike</h3>
              <ul>
                <li>Target an adjacent foe.</li>
                <li>Attack them.</li>
                <li>
                  If the attack was lethal, move to the zone they were
                  occupying.
                </li>
              </ul>

              <br />
              <h3>Spend</h3>
              <ul>
                <li>Decrease your quantity of the specified attribute.</li>
                {/* <li>
                  (Example: the Ballistic Armor ability of Metal Scions requires
                  them to spend 2 turns of Shield or 2 turns Ward.)
                </li> */}
              </ul>

              <br />

              <p>
                Note: The following keywords are always proceeded by a phrase
                indicating the unit they must affect. For example, if a step
                states “blast an adjacent foe, the first step of blast changes
                from <em>“Target a unit”</em> into{" "}
                <em>“Target an adjacent foe</em>.
              </p>

              <br />
              <h3>Blast</h3>
              <ul>
                <li>Target a unit.</li>
                <li>Attack them.</li>
              </ul>

              <br />
              <h3>Aether-blast</h3>
              <ul>
                <li>
                  Spend your Aether to blast a unit; when the attack occurs,
                  they may spend their Aether to mitigate it.
                </li>
                <li>
                  (Note: When Aether-blasts are mitigated, the attack’s AP is
                  reduced by 1, but the attacker’s Aether is restored.)
                </li>
              </ul>

              <br />
              <h3>Paralyze</h3>
              <ul>
                <li>Target a unit.</li>
                <li>Inflict them with Paralysis.</li>
              </ul>

              <br />
              <h3>Ignite</h3>
              <ul>
                <li>Target a unit.</li>
                <li>Inflict them with Burn.</li>
              </ul>

              <br />
              <h3>Freeze</h3>
              <ul>
                <li>Target a unit.</li>
                <li>Inflict them with Frost.</li>
              </ul>

              {/* <br />
              <h3>Infect</h3>
              <ul>
                <li>Target a unit.</li>
                <li>Inflict them with Infection.</li>
              </ul> */}

              <br />
              <h3>Purge</h3>
              <ul>
                <li>Select a unit.</li>
                <li>If they possess the specified attribute, remove it.</li>
              </ul>

              <br />

              <h2>Card Keywords</h2>
              <p>Below is a list of keywords that influence cards.</p>

              <br />
              <h3>Spend</h3>
              <ul>
                <li>Place a card from your hand into your vestige.</li>
              </ul>

              <br />
              <h3>Float</h3>
              <ul>
                <li>
                  Place a card from your hand (or another specified location) on
                  top of your repertoire and rotate it 90 degrees.
                </li>
              </ul>

              <br />
              <h3>Search</h3>
              <ul>
                <li>
                  View the contents of your repertoire. If a card matches the
                  given criteria, you may add it to your hand (or another
                  specified location).
                </li>
                <li>Shuffle the repertoire.</li>
              </ul>

              <br />
              <h3>Inspect</h3>
              <ul>
                <li>
                  View a specified number of cards from the top of a repertoire.
                </li>
                <li>
                  Return them in their original order unless stated otherwise.
                </li>
              </ul>

              <br />
              <h3>Recover</h3>
              <ul>
                <li>
                  Place a card from your vestige into your hand (or another
                  specified location).
                </li>
              </ul>
              <br />
              <h3>Retain</h3>
              <ul>
                <li>
                  After a card concludes its effects, return it to your hand
                  instead of discarding it.
                </li>
              </ul>
              <br />
              <h3>Reveal</h3>
              <ul>
                <li>
                  Show the front side of a card to your opponent and allow them
                  to view its details for a short reasonable amount of time.
                </li>
              </ul>
              {/*  */}
            </div>
          )}

          {id === "trial-over-tea" && (
            <div className="rules-text">
              <h2>Trial Over Tea</h2>
              <p>
                Trial Over Tea is a game mode that introduces a few house rules
                to simplify gameplay:
              </p>
              <ul>
                <li>
                  Sovereigns play with identical repertoires and start with 5
                  Bounty Points (BP).
                </li>
                <li>
                  The Avelhem repertoire size is reduced from 20 to 16 cards and
                  includes 4 copies each of{" "}
                  <strong>
                    <span
                      className="rule-view-card"
                      onClick={() => {
                        dispatch(updateMagnifiedSkill(1));
                      }}
                    >
                      Fire
                    </span>
                    ,{" "}
                    <span
                      className="rule-view-card"
                      onClick={() => {
                        dispatch(updateMagnifiedSkill(4));
                      }}
                    >
                      Land
                    </span>
                    ,{" "}
                    <span
                      className="rule-view-card"
                      onClick={() => {
                        dispatch(updateMagnifiedSkill(6));
                      }}
                    >
                      Mana
                    </span>
                    , and{" "}
                    <span
                      className="rule-view-card"
                      onClick={() => {
                        dispatch(updateMagnifiedSkill(7));
                      }}
                    >
                      Metal
                    </span>
                  </strong>{" "}
                  Avelhems.
                </li>
                <li>
                  The skill repertoire size is reduced from 60 to 40 cards.
                </li>

                <li>Artifice and Backtrack cost 0 instead of 1 DP.</li>
                <li>
                  Sovereigns can click on their own repertoires to view the
                  contents. (The cards will be sorted and won’t reflect their
                  actual order.)
                </li>
              </ul>
              <br />
              <br />
              <h2>Unit & Skill Profiles</h2>
              <br />
              <h3>Fire Scion</h3>
              <p>Fire Scions possess an attack-oriented skill set.</p>
              <ul>
                <li>
                  As they enter play, their{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("FromTheAshes"));
                    }}
                  >
                    From the Ashes
                  </span>{" "}
                  talent allows them to recover then float a Fire skill at the
                  cost of any skill from their hand.
                </li>
                <li>
                  Their{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("Afterburner"));
                    }}
                  >
                    Afterburner
                  </span>{" "}
                  ability allows them to strike using an Invoke tactic, doubling
                  their opportunity to attack.
                </li>
                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("01-01"));
                    }}
                  >
                    Ignition Propulsion
                  </span>{" "}
                  and{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("01-02"));
                    }}
                  >
                    Conflagration
                  </span>{" "}
                  are reliable attacks, but they cost an additional skill to
                  use.
                  <ul>
                    <li>
                      Ignition Propulsion provides extra movement by using foes
                      as stepping stones. If enhanced with Ravager, Fire Scions
                      can use multiple copies to move up to 4 times in one turn,
                      which can create an opportunity to score.
                    </li>
                  </ul>
                </li>

                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("01-03"));
                    }}
                  >
                    Blaze of Glory
                  </span>
                  , their contingent skill, is not included in this mode.
                </li>
                <li>
                  Their burst skill{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("01-04"));
                    }}
                  >
                    Resplendence
                  </span>{" "}
                  is their sole defensive tool that increases their HP to 2 and
                  grants them Shield. It can also be used to search for another
                  Fire skill.
                </li>
              </ul>

              <br />

              <h3>Land Scion</h3>
              <p>Land Scions boast the highest durability.</p>
              <ul>
                <li>
                  {" "}
                  As they enter play, their{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("MountainStance"));
                    }}
                  >
                    Mountain Stance
                  </span>{" "}
                  talent grants them 2 Aftershocks, which improves the
                  accessibility of their abilities.
                </li>
                <li>
                  Their{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("Fortify"));
                    }}
                  >
                    Fortify
                  </span>{" "}
                  ability allows allows them to use an Assault (or Advance by
                  spending Aftershocks) tactic to gain Shield for 2 turns. They
                  may then float 1 skill to traverse or strike, as a unit
                  normally would with this tactic.
                </li>
                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("04-01"));
                    }}
                  >
                    Crystallization
                  </span>{" "}
                  raises their HP to 2 and gives them the option to float 1
                  skill to gain Shield for 2 turns.
                  <ul>
                    <li>
                      If your Land Scion unlikely to be attacked the following
                      turn (for reasons such as the lack of foes in proximity),
                      do not waste resources on gaining Shield.
                    </li>
                    <li>
                      If you do not need to deal with a Shielded foe urgently,
                      consider waiting for their Shield to expire before
                      dedicating resources to attack them. Do not bother
                      attacking a Shielded unit if you cannot follow up with
                      another attack to finish them off.
                    </li>
                  </ul>
                </li>

                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("04-02"));
                    }}
                  >
                    Upheaval
                  </span>{" "}
                  can paralyze up to 2 adjacent foes for 1 turn.
                  <ul>
                    <li>
                      Though it won’t eliminate them, it will limit the
                      opponent’s opportunity to launch a counterattack when
                      their turn rolls in.
                    </li>
                    <li>
                      Paralysis also makes units more vulnerable to
                      Aether-blasts.
                    </li>
                  </ul>
                </li>
                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("04-03"));
                    }}
                  >
                    Pitfall Trap
                  </span>{" "}
                  can paralyze units that move next to them, and it can follow
                  up with a blast to add injury to insult. The mere existence of
                  this skill puts opponents on their guard, even if the card
                  isn’t in the hand.
                  <ul>
                    <li>
                      Land Scions can safely approach their counterparts, as
                      they are immune to paralysis due to Land skills.
                    </li>
                    <li>
                      Mana Scions have an ability that allows them to attack
                      from 2 spaces away without fear of springing Land Scions’
                      traps.
                    </li>
                  </ul>
                </li>
                <li>
                  Their burst skill{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("04-04"));
                    }}
                  >
                    Geomancy
                  </span>{" "}
                  ability allows them to raise their HP to 3. Furthermore, it
                  functions similarly as Ignition Propulsion: it can be used to
                  attack and potentially move but with no costs attached.
                </li>
              </ul>

              <br />

              <h3>Metal Scion</h3>
              <p>Metal Scions specialize against durable opponents.</p>
              <ul>
                <li>
                  {" "}
                  As they enter play, their{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("Conduction"));
                    }}
                  >
                    Conduction
                  </span>{" "}
                  talent allows them to search for their Magnetic Shockwave
                  skill and put it on top of their repertoire.
                </li>

                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("07-02"));
                    }}
                  >
                    Reinforce
                  </span>{" "}
                  can be used to gain 1 Sharpness or raise their HP to 2.
                  <ul>
                    <li>
                      Their Penetrator talent increases the AP of their attacks
                      for every Sharpness they possess; with 2 Sharpness, their
                      strikes can pierce Shield.
                    </li>
                  </ul>
                </li>

                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("07-01"));
                    }}
                  >
                    Magnetic Shockwave
                  </span>{" "}
                  can paralyze 1 adjacent foe, and its potency increases as the
                  user invests in their Sharpness. 1 Sharpness allows them to
                  paralyze another foe, while 2 Sharpness allows them to blast a
                  paralyzed foe.
                </li>

                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("07-03"));
                    }}
                  >
                    Frenzy Blade
                  </span>{" "}
                  can be activated when an adjacent foe survives an attack. This
                  is another source of Sharpness, and it allows them to attack
                  the surviving foe.
                  <ul>
                    <li>
                      This is especially useful against sturdy Land Scions.
                    </li>
                    <li>
                      Frenzy Blade is a great follow-up for Aether-blasts that
                      were mitigated.
                    </li>
                    <li>
                      Their{" "}
                      <span
                        className="rule-view-card"
                        onClick={() => {
                          dispatch(updateMagnifiedSkill("Brandish"));
                        }}
                      >
                        Brandish
                      </span>{" "}
                      ability allows allows them to use an Invoke tactic to
                      search for this skill.
                    </li>
                  </ul>
                </li>
                <li>
                  Their burst skill{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("07-04"));
                    }}
                  >
                    Arsenal Onslaught
                  </span>{" "}
                  allows them to strike up to 2 times, and it can even paralyze
                  an enemy in between the attacks.
                  <ul>
                    <li>
                      This can allow the user to move twice, provided that both
                      attacks are lethal. Consider saving Arsenal Onslaught for
                      the scoring maneuver.
                    </li>
                  </ul>
                </li>
              </ul>

              <br />

              <h3>Mana Scion</h3>
              <p>
                Mana Scions provide well-rounded utility, but their role in this
                mode focuses on defensive support.
              </p>
              <ul>
                <li>
                  Unlike the previous classes, they do have a talent that
                  activates when they enter play. Instead, their{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("AmbianceAssimilation"));
                    }}
                  >
                    Ambiance Assimilation{" "}
                  </span>
                  activates when they are eliminated, allowing them to search
                  for a Mana skill.
                </li>

                <li>
                  Once per turn, they can activate{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("AmplifyAura"));
                    }}
                  >
                    Amplify Aura
                  </span>{" "}
                  to convert their or an adjacent ally’s Aether into Shield for
                  2 turns.
                  <ul>
                    <li>
                      This pairs well with the Ballistic Armor ability of Metal
                      Scions and the Aether-restoring effects of various
                      classes.
                    </li>
                  </ul>
                </li>

                <li>
                  They can use an Assault tactic to activate{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("ParticleBeam"));
                    }}
                  >
                    Particle Beam
                  </span>
                  , which allows them to attack foes within 2 spaces away.
                  <ul>
                    <li>
                      This is especially useful against Land Scions who are
                      ready to spring their Pitfall Traps.
                    </li>
                  </ul>
                </li>

                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("06-01"));
                    }}
                  >
                    Surge
                  </span>{" "}
                  and{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("06-02"));
                    }}
                  >
                    Diffusion
                  </span>{" "}
                  are not included in this mode.
                  <ul>
                    <li>
                      These powerful skills hindered by their dependecy on
                      tactics.
                    </li>
                  </ul>
                </li>

                <li>
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("06-03"));
                    }}
                  >
                    Aegis
                  </span>{" "}
                  can be activated when they or an adjacent ally is targeted to
                  protect them.
                  <ul>
                    <li>Shield protects against attacks.</li>
                    <li>
                      Wards protect against attacks and status afflictions.
                    </li>
                    <li>
                      Consider accumulating copies to prepare for an
                      unsurmountable push.
                    </li>
                  </ul>
                </li>
                <li>
                  At the cost of 1 Mana skill, their burst skill{" "}
                  <span
                    className="rule-view-card"
                    onClick={() => {
                      dispatch(updateMagnifiedSkill("06-04"));
                    }}
                  >
                    Dirusption Field
                  </span>{" "}
                  shuts down their foes for 2 turns.
                  <ul>
                    <li>
                      Enemies within 2 spaces from them cannot activate their
                      abilities nor spend their Aether, preventing them from
                      performing and even mitigating Aether-blasts.{" "}
                    </li>
                    <li>Adjacent foes cannot use non-burst skills.</li>
                  </ul>
                </li>
              </ul>
            </div>
          )}

          {id && (
            <div className="rules-text">
              <br />
              <div className="rules-return">
                <Link to="/rules/">
                  <button className="home-banner-button">Return</button>
                </Link>
              </div>
              <br />
            </div>
          )}
        </div>
      </div>
      {magnifiedSkill && (
        <ZoomCard cardInfo={magnifiedSkill} repertoire={true} />
      )}
    </div>
  );
}
