import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetImages } from "../hooks/useGetImages";

import RulesImg from "../assets/others/Rules.png";
import Setup from "../assets/rules/Setup.png";
import UnitTokens from "../assets/rules/UnitTokens.png";
import SkillDisplay from "../assets/rules/SkillDisplay.png";
import SkillSetDisplay from "../assets/rules/SkillSetDisplay.png";
import SkillSubstitute from "../assets/rules/SkillSubstitute.png";
import DiceFaces from "../assets/rules/DiceFaces.png";
import StatusSkill from "../assets/rules/StatusSkill.png";
import EffectSkill from "../assets/rules/EffectSkill.png";
import InterruptSkill from "../assets/rules/InterruptSkill.png";

import "./Rules.css";

export default function Rules() {
  const { id } = useParams(); //note: id was entered as the parameter in the routes of App.jsx
  const navigate = useNavigate();

  const { getBannerImage } = useGetImages();

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
      ].includes(id)
    ) {
      navigate("/rules");
    }
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [id]);

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
              <Link to="/rules/summary">
                <button>Overview & Summary</button>
              </Link>
              <br />
              <Link to="/rules/turn-structure">
                <button>Turn Structure</button>
              </Link>
              <br />
              <Link to="/rules/units">
                <button>Units</button>
              </Link>
              <br />
              <Link to="/rules/cards">
                <button>Cards</button>
              </Link>
              <br />
              <Link to="/rules/tactics">
                <button>Tactics</button>
              </Link>
              <br />
              <Link to="/rules/statuses">
                <button>Statuses</button>
              </Link>
              <br />
              <Link to="/rules/effects">
                <button>Effects & Keywords</button>
              </Link>
            </div>
          )}
          {id === "summary" && (
            <div className="rules-text">
              <h2>Overview</h2>
              <p>
                <em>Avelhem: War of the Sovereigns</em> is a board game set in a
                fantastical realm where two players assume the roles of
                Sovereigns, leading their armies on a grid-based battlefield.
              </p>
              <br />
              <p>
                Sovereigns alternate taking turns consisting of six phases. Each
                turn provides up to two tactics that can be used to perform
                various actions such as drawing a card and deploying or moving a
                unit. Sovereigns can accumulate cards over the course of
                multiple turns and activate them at opportune moments to extend
                their limited actions.
              </p>
              <br />
              <p>
                Units enter play as pawns capable of movement and attack. Pawns
                can ascend to Scions with elemental affinities, unlocking access
                to exclusive abilities, talents, and skill cards with a variety
                of effects.
              </p>
              <br />
              <br />
              <h3>Objective</h3>
              <p>
                A Sovereign wins by moving a set number of their pieces to the
                opponent’s end of the board.
              </p>

              <br />
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
                    Displays upgrades and tallies Bounty Points and Fate
                    Defiance
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
                (Note: Units acquire Aether when deployed; in a physical
                implementation, these would be represented by one of the
                miscellaneous tokens.)
              </p>
              <br />

              <h3>5. Set Fate Defiance (FD) counters to 3</h3>
              <p>
                In this digital simulator, a Sovereign’s FD, as well as their
                BP, is displayed between their Avelhem and skill repertoires.
              </p>
              <br />

              <h3>6. Shuffle repertoires and draw skill cards</h3>
              <p>
                After shuffling, both Sovereigns draw 4 skill cards. The
                Sovereign who plays the first turn adds 1 copy of
                “Transcendence” to their hand and places the other copy in their
                vestige (discard pile). The second Sovereigns adds 2 copies of
                “Transcendence” to their hand.
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
                Sovereigns alternate taking turns, which consist of six phases.
                The Initiator refers to the Sovereign whose turn it currently
                is. For more information, visit the{" "}
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
                During the Bounty Phase, the Initiator may spend Bounty Points
                (BP) on permanent upgrades to move closer to victory.
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
                The Defiance Phase is where the Initiator can spend Fate
                Defiance (FD) on immediate benefits that can improve their
                current turn, such as rerolling unfavorable tactics or drawing
                an additional skill card.
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
                depleted. Sovereigns receive 2 FD when their units are
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
                a skill card represents its aspect, which determines who can
                exclusively activate it. For example, a Sovereign skill (which
                has a crown icon) can only be activated by a Sovereign.
                Likewise, a Lightning skill can only be activated by a Lightning
                Scion. The gem below a skill’s aspect is its method, which
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
                Sovereigns alternate taking turns consisting of six phases. The
                Initiator refers to the Sovereign whose turn it currently is.
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
                During the Bounty Phase, the Initiator may spend Bounty Points
                (BP) on permanent upgrades to move closer to victory. These
                upgrades are organized into tiered categories, with higher-tier
                items becoming available once their prerequisites are purchased.
                Multiple purchases can be made in a single turn, provided the
                Initiator has sufficient BP.
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
                <li>Convene: Gain 1 Rally tactic.</li>
              </ul>
              <br />
              <h3>Defiance Phase</h3>
              <p>
                The Defiance Phase is where the Initiator can spend Fate
                Defiance (FD) on immediate benefits that can improve their
                current turn.
              </p>
              <br />
              <p>
                During this phase, the Initiator may choose 1 of the following:
              </p>
              <ul>
                <li>
                  Artifice: Spend 1 FD to select up to 5 skills from your hand;
                  place them at the bottom of your repertoire, then draw the
                  same number.
                </li>
                <li>Backtrack: Spend 1 FD to reroll your tactics.</li>
                <li>
                  Curate: Spend 2 FD to reroll your tactics with 3 dice, then
                  disregard 1 of them.
                </li>
                <li>
                  Destine: Spend 2 FD and 1 Scion skill to ascend an ally pawn
                  to the matching class.
                </li>
                <li>Ex Machina: Spend 3 FD to search for 1 Sovereign skill.</li>
                <li>
                  Finesse: Spend 4 FD to draw 1 skill. You may recover 1
                  “Transcendence”.
                </li>
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
                      When the Initiator’s unit scores, they gain 2 BP, while
                      their opponent receives 6 FD.
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
                depleted. Sovereigns receive 2 FD when their units are
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
                used. Abilities with the “One-shot” property can only be
                activated once per turn; this limit applies to units
                individually.
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

              <h3>Aspects</h3>
              <p>
                The icon at the top left corner of a skill card represents its
                aspect, which determines who can exclusively activate it. For
                example, a Sovereign skill (which has a crown icon) can only be
                activated by a Sovereign. Likewise, a Lightning skill can only
                be activated by a Lightning Scion.
              </p>

              <br />
              <h3>Method</h3>
              <p>
                The gem below a skill’s aspect is its method, which determines
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
                  <li>Their icon is a circular blue sapphire.</li>
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
                  <li>Their icon is a triangular red ruby.</li>
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
                  <li>Their icon is a hexagonal purple amethyst.</li>
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

              <h3>Substitute</h3>
              <p>
                Some skills have a “Substitute” property that allows them to
                function as a resonator for certain cards. When used this way,
                these skills provide alternative effects in place of their
                primary ones. For example, Heir’s Endeavor as a resonator can
                only resonate with Sovereign skills, and it allows the activator
                to inspect skills when the resonance concludes, while its
                primary effect of recovering a Sovereign skill is ignored.
              </p>

              <br />
              <br />

              <div className="rules-image-container">
                <div className="rules-image-desc">
                  Skills with substitute properties
                </div>

                <img
                  src={SkillSubstitute}
                  className="rules-skill-display"
                  alt="Skills with substitute properties"
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
                    <li>Spend 6 FD to convert to an Assault tactic.</li>
                    <li>
                      Float 1 skill to deploy a Scion.{" "}
                      <em>(Must be unlocked via Bounty Phase.)</em>
                    </li>
                  </ul>
                </li>
                <li>
                  Units Actions:
                  <ul>
                    <li>Traverse (move to a vacant adjacent zone).</li>
                    <li>Aether-blast an adjacent enemy.</li>
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
                    <li>Spend 2 instances to draw 1 skill.</li>
                  </ul>
                </li>
                <li>
                  Units Action:
                  <ul>
                    <li>
                      Spend 1 instance to traverse (move to a vacant adjacent
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
                      Strike (attack an adjacent enemy, then move to their zone
                      if they were eliminated).
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
                    <li>Gain 2 FD and recover up to 1 “Transcendence”.</li>
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
                    <li>Spend 1 instance to deploy a pawn.</li>
                  </ul>
                </li>
                <li>Rally does not provide any unit actions.</li>
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
                duration, the status persists indefinitely. For example, Frigid
                Breath can freeze (apply frostbite) enemy units for 1 turn,
                while Efflorescence grants the activator Overgrowth
                indefinitely.
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
                  <strong>Disruption</strong>: Prevents enemies within 2 spaces
                  from the unit from activating abilities and spending their
                  Aether. Prevents enemies adjacent to the unit from activating
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
                  <strong>Frostbite</strong>: Mutes and immobilizes the unit.
                </li>
                <li>
                  <strong>Burn</strong>: Grants the unit immunity to Frostbite.
                  When this status expires, the unit loses 1 HP.
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
                Effects are the instructions of cards, actions, abilities, and
                talents. These are divided into sub-effects, applied
                sequentially amd written from the perspective of the entity
                performing them.
              </p>
              <br />

              <p>
                Sub-effects are mandatory unless qualified by the phrase “you
                may”. An effect cannot be activated if its mandatory sub-effects
                cannot be fulfilled. For example, a Sovereign cannot activate
                Press the Attack unless they have 2 Advance tactics to convert.
                Its subsequent sub-effects are optional.
              </p>

              <br />
              <p>
                Conditional sub-effects begin with an “if” statement, which must
                be true for it to apply. If the statement is false, only the
                corresponding sub-effect is ignored. For example, a Mana Scion
                who activates Aegis will draw a skill only if they were
                targeted.
              </p>

              <br />
              <p>
                Modular sub-effects present the activator a choice between two
                options. Continuing from the previous example, Mana Scion who
                activates Aegis must either grant Shield or spend 1 skill to
                grant Ward (see <Link to="/rules/statuses">Statuses</Link>) to
                the targeted unit. If they cannot spend a skill, they default to
                the former option.
              </p>

              <br />
              <br />
              <div className="rules-image-container">
                <div className="rules-image-desc">
                  A skill with optional sub-effects (left), & a skill with
                  conditional and modular sub-effects (right)
                </div>

                <img
                  src={EffectSkill}
                  className="rules-skill-display"
                  alt="Skills with mandatory, optional, conditional, and modular sub-effects"
                />
              </div>

              <br />
              <br />

              <h2>Effect Interruption</h2>
              <p>
                Effects cannot be halted or interrupted, except by the
                activations of talents and contingent skills. After the
                interruption’s effects conclude, the interrupted effect will
                resume if possible. For example, if a Lightning Scion activates
                Zip and Zap and moves to a zone adjacent to an enemy Land Scion,
                the Land Scion can activate Pitfall Trap before Zip and Zap’s
                second sub-effect is performed. If Pitfall Trap paralyzes or
                eliminates the Lightning Scion, Zip and Zap will conclude
                prematurely, as its effects can no longer be applied. However,
                if Pitfall Trap fails to incapacitate the Lightning Scion, they
                will resume applying their skill’s effect.
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
    </div>
  );
}
