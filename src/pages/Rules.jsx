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
        "units",
        "cards",
        "tactics",
        "statuses",
        "keywords",
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
              <Link to="/rules/keywords">
                <button>Keywords</button>
              </Link>
            </div>
          )}

          {id === "summary" && (
            <div className="rules-text">
              <h2>Overview</h2>
              <p>
                <em>Avelhem: War of the Sovereigns</em> is a board game set in a
                fantastical realm where two players assume the roles of
                Sovereigns vying for dominance.
              </p>
              <br />
              <p>
                Sovereigns alternate taking turns consisting of multiple phases.
                Each turn provides up to two tactics that can be used to perform
                various actions such as drawing a card and deploying or moving a
                unit. Sovereigns can accumulate cards over the course of
                multiple turns and activate them at opportune moments to
                supplement their limited actions.
              </p>
              <br />
              <p>
                Units enter play as pawns capable of movement and attack. Pawns
                can ascend to Scions, unlocking access to exclusive abilities,
                talents, and skill cards with a variety of effects.
              </p>
              <br />
              <br />
              <h3>Objective</h3>
              <p>
                A Sovereign wins by moving one of their pieces to the opponent’s
                end of the board. When victory is achieved, the Sovereigns may
                opt to continue the game by raising the number of units required
                for victory.
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
                    The base game provides each Sovereign a playset consisting
                    of 32 (8 unique) Avelhems and 136 (46 unique) skills
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
                    Defiances
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

              <h3>1. Agree on the score objective.</h3>
              <p>
                By default, the game is a race to score 1 point. Whenever
                victory is achieved, the Sovereigns may opt to continue the game
                by raising the objective by 1, up to a maximum of 5. It is
                recommended that Sovereigns agree on a final score objective
                beforehand, as it may influence strategies and repertoire
                creation.
              </p>

              <br />
              <h3>2. Select repertoires.</h3>
              <p>
                New accounts are provided 3 identical starter repertoires, which
                can be customized in the Repertoires page. Avelhem and skill
                repertoires must contain exactly 20 and 60 cards, respectively.
              </p>
              <br />

              <h3>
                3. Distribute unit tokens and decide who plays the first turn.
              </h3>
              <p>
                The host is assigned the gold unit tokens and given the choice
                of playing first or second (they also have the option of
                choosing randomly). Their opponent is assigned the silver unit
                tokens.
              </p>
              <br />

              <h3>4. Choose sides and deploy pawns.</h3>
              <p>
                The board is oriented with 10 rows and 5 columns. Sovereigns
                take their positions on opposite sides, with the row closest to
                each of them designated as their base. Pawns are deployed on the
                1st, 3rd, and 5th columns of the 4th row from each Sovereign’s
                side.
                <br />
                (Note: Units are deployed with Aether; in a physical
                implementation, these would be represented by one of the
                miscellaneous tokens.)
              </p>
              <br />

              <h3>5. Set Fate Defiance (FD) counters to 3.</h3>
              <p>
                A Sovereign’s FD, as well as their BP, is displayed between
                their Avelhem and skill repertoires.
              </p>
              <br />

              <h3>6. Shuffle repertoires and draw skill cards.</h3>
              <p>
                After shuffling, both Sovereigns draw 4 skill cards. The
                Sovereign who plays the first turn adds 1 copy of
                “Transcendence” to their hand and places the other copy in their
                vestige. The second Sovereigns adds 2 copies of “Transcendence”
                to their hand.
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
                be activated from one’s hand, and they are sent to the vestige
                upon the conclusion of their effects, unless stated otherwise.
                When a repertoire is depleted, its corresponding vestige is
                shuffled to replenish it. For more information, visit the{" "}
                <Link to="/rules/cards">Cards page</Link>.
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
              <hr />
              <h2>Turn Structure</h2>
              <p>
                Sovereigns alternate taking turns consisting of multiple phases.
                The Initiator refers to the Sovereign whose turn it currently
                is.
              </p>
              <br />
              <h3>Acquisition Phase</h3>
              <p>
                The Acquisition Phase commences the Initiator’s turn, providing
                the opportunity to bolster resources. During this phase, the
                Initiator must choose 1 of the following:
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
                (BP) on upgrades in tiered categories. Items in subsequent tiers
                become available after their precedents have been purchased.
                Multiple purchases are allowed, as long as BP is sufficient. BP
                is earned primarily by eliminating enemy units. (See Bounty
                Phase Catalog for details.)
              </p>
              <br />
              <h3>Coordination Phase</h3>
              <p>
                The Coordination Phase provides the Initiator’s tactics, which
                determine their possible actions. During this Phase, the
                Initiator must choose 1 of the following:
              </p>
              <ul>
                <li>Assent: Roll 2 tactical dice.</li>
                <li>Battle Cry: Spend 3 skills to gain 1 Assault tactic.</li>
                <li>Convene: Gain 1 Rally tactic.</li>
              </ul>
              <br />
              <h3>Defiance Phase</h3>
              <p>
                The Defiance Phase grants the Initiator the opportunity to spend
                Fate Defiance (FD) on immediate benefits. FD is primarily
                received as consolation when allied units are eliminated. During
                this phase, the Initiator may choose 1 of the following:
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
                perform actions and activate effects. The following can be
                performed in any sequence, combination, and frequency, provided
                the resources are sufficient:
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
                The Final Phase wraps up the Initiator’s turn. During this
                phase, the Initiator applies the following in sequence:
              </p>
              <ol>
                <li>Forfeit unused tactics.</li>
                <li>Discard all Avelhems from hand.</li>
                <li>Selectively discard skills in excess of 8 from hand.</li>

                <li>
                  Decrease the durations of their units’ turn-based statuses by
                  1.
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
                abilities, talents, and skills.
              </p>
              <br />

              <h3>Abilities</h3>
              <p>
                Scions have 2 unique abilities, which are special actions they
                can manually activate. Some abilities require a tactic to be
                used. Abilities with the “One-shot” property can only be
                activated once per turn.
              </p>
              <br />

              <h3>Talents</h3>
              <p>
                Each class has 2 unique talents that provide passive effects.
                Scions have either a debut talent, which activates the moment
                they ascend or deploy, or an elimination talent, which activates
                when they are eliminated. A pawn’s capability to ascend is tied
                to their “Apotheosis” talent; thus, they cannot ascend if they
                are afflicted with a status that mutes (disables talents). Some
                talents are triggered by events. If an event triggers both a
                talent and a contingent skill (see{" "}
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

              <h3>Boost</h3>
              <p>
                Boosts are temporary benefits that can improve a unit’s
                performance. Boosts expire upon their application or at the
                Final Phase if unutilized. Units muted by a status have their
                boosts negated.
              </p>
              <br />

              <h3>Status</h3>
              <p>
                Statuses affect units in various ways. There are 2 kinds of
                statuses: enhancements provide advantages, while afflictions
                apply disadvantages. For more information, visit the{" "}
                <Link to="/rules/statuses">Statuses page</Link>.
              </p>
              <br />

              <h3 className="rules-anathema">Anathema</h3>
              <p>
                Anathema is a Scion’s punishment for using their Avelhem to slay
                a fellow Demigod or human. When a Scion eliminates another Scion
                or pawn, they suffer Anathema for 2 turns. The affliction is
                delayed until the unit has resolved all the effects they have
                activated. For example, suppose a Scion activates a skill card
                that lets them attack and then perform an additional effect. If
                the skill’s attack eliminates an enemy, Anathema will be delayed
                until the entire skill has concluded.
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
                be activated from one’s hand, and they are sent to the vestige
                upon the conclusion of their effects, unless stated otherwise.
                When a repertoire is depleted, its corresponding vestige is
                shuffled to replenish it. Sovereigns cannot view the contents of
                their repertoires unless they are performing a search or
                inspection. Sovereigns are allowed to view the contents of their
                own vestiges at any time.
              </p>
              <br />
              <br />
              <h3>Avelhems</h3>
              <p>
                The titular Avelhems refer to the power and authority over the
                elements of creation. In this game, they take the form of cards
                that Sovereigns can activate to ascend their pawns to Scions of
                a specified class. The icon at an Avelhem’s top left corner
                reflects its corresponding Scion class. Sovereigns can resonate
                Avelhems by activating them with a resonator, which can be
                either an identical copy or a valid substitute. When a card is
                resonated, its resonance will be applied as an additional
                effect.
              </p>
              <br />
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
                  <li>
                    Standard skills, indicated by blue circular sapphires, are
                    the simplest to activate.
                  </li>
                  <li>
                    They follow all general card mechanics: they can only be
                    activated during the Execution Phase when there is no other
                    effect ongoing, and they are sent to the vestige after
                    concluding their effects.
                  </li>
                </ul>
              </p>

              <br />

              <p>
                <strong>Resonant</strong>
                <ul>
                  <li>
                    Resonant skills, indicated by rectangular alexandrites, also
                    follow the general card mechanics.
                  </li>
                  <li>
                    Like Avelhems, they possess resonances, which are extra
                    effects that activate if they are resonated (activated with
                    an identical card or valid substitute). The additional card
                    that is paired with them is referred to as their
                    “resonator.”
                  </li>
                </ul>
              </p>

              <br />

              <p>
                <strong>Contingent</strong>
                <ul>
                  <li>
                    Contingent skills, indicated by triangular rubies, have a
                    “contingency” listed before their effects.
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
                </ul>
              </p>

              <br />

              <p>
                <strong>Burst</strong>
                <ul>
                  <li>
                    Burst skills, indicated by cracking amethysts, return to
                    observing the general card mechanics with one major
                    deviation.
                  </li>
                  <li>
                    Unlike other cards, burst skills are shattered (removed from
                    play) rather than discarded after they conclude their
                    effects. Discarding them via any other means (such as
                    spending) would still send them to the vestige.
                  </li>
                  <li>Shattered skills are revealed to both Sovereigns.</li>
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
            </div>
          )}

          {id === "tactics" && (
            <div className="rules-text">
              <h2>Tactics</h2>
              <p>
                Tactics are resources provided every turn, and they represent
                the opportunity to actualize an action. Tactics are obtained
                during the Coordination Phase and can be rerolled during the
                Defiance Phase. Unused tactics do not carry over to subsequent
                turns.
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
                    <li>
                      Note: A unit cannot use an individual Mobilize tactic more
                      than once. (For example, a unit that traverses using 1
                      Mobilize instance cannot use the remaining instances of
                      the same tactic to traverse again, but they are allowed to
                      traverse via a second Mobilize tactic.)
                    </li>
                  </ul>
                </li>
              </ul>

              <br />

              <h3>Assault</h3>
              <ul>
                <li>Roll chance: 1 / 6</li>
                <li>There are no Sovereign actions.</li>
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
                <li>There are no unit actions.</li>
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
                <li>There are no unit actions.</li>
              </ul>

              <br />
              <br />

              {/* <div className="rules-image-container">
                <div className="rules-image-desc">
                  From left to right: Advance, Mobilize, Assault, Invoke, Rally
                </div>

                <img
                  src={}
                  className="rules-skill-display"
                  alt="From left to right: Advance, Mobilize, Assault, Invoke, Rally"
                />
              </div> */}
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
