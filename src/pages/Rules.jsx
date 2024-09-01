import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetImages } from "../hooks/useGetImages";

import RulesImg from "../assets/others/Rules.png";
import Setup from "../assets/others/Setup.png";
import UnitTokens from "../assets/others/UnitTokens.png";
import SkillAnatomy from "../assets/others/SkillAnatomy.png";

import "./Rules.css";

export default function Rules() {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const { getBannerImage } = useGetImages();

  const [rulesPart, setRulesPart] = useState(0);

  const handleChangeRule = (direction) => {
    if (direction === "left") {
      if (rulesPart === 0) {
        setRulesPart(rulesBody.length - 1);
      } else {
        setRulesPart(rulesPart - 1);
      }
    } else {
      if (rulesPart === rulesBody.length - 1) {
        setRulesPart(0);
      } else {
        setRulesPart(rulesPart + 1);
      }
    }
  };

  const rulesBody = [
    //0 Overview
    <div className="rules-text">
      <h1>Overview</h1>
      <p>
        <em>Avelhem: War of the Sovereigns</em> is a board game set in a
        fantastical realm where two players assume the roles of Sovereigns vying
        for dominance.
      </p>
      <br />
      <p>
        Sovereigns alternate taking turns consisting of multiple phases. Each
        turn provides up to two tactics that can be used to perform various
        actions such as drawing a card and deploying or moving a unit.
        Sovereigns can accumulate cards over the course of multiple turns and
        activate them at opportune moments to supplement their limited actions.
      </p>
      <br />
      <p>
        Units enter play as pawns capable only of movement and attack. Pawns can
        ascend to Scions, unlocking access to exclusive abilities, talents, and
        skill cards with a variety of effects.
      </p>
      <br />
      <br />

      <h2>Objective</h2>
      <p>
        A Sovereign wins by moving one of their pieces to the opponent’s end of
        the board. When victory is achieved, the Sovereigns may opt to continue
        the game by raising the number of units required for victory.
      </p>
      <br />
      <br />

      <h2>Components</h2>
      <ol>
        <li>Game board</li>
        <ul>
          <li>Features a grid with 10 rows and 5 columns</li>
        </ul>

        <li>Custom dice</li>
        <ul>
          <li>
            3 identical cubic dice; faces consist of 2 Advance, 2 Mobilize, 1
            Assault, and 1 Invoke
          </li>
        </ul>

        <li>Avelhem and skill cards</li>
        <ul>
          <li>
            The base game provides each Sovereign a playset consisting of 32 (8
            unique) Avelhems and 136 (46 unique) skills
          </li>
        </ul>

        <li>Unit tokens</li>
        <ul>
          <li>
            The base game provides gold and silver sets of 8 pawns and 16 (8
            unique) Scion tokens
          </li>
        </ul>

        <li>Player boards</li>
        <ul>
          <li>
            Displays upgrades and tallies Bounty Points and Fate Defiances
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
    </div>,
    //1 Setup
    <div className="rules-text">
      <h1>Setup</h1>
      <p>
        In this website, users can host a game through the Create Game page and
        invite an opponent by sending them the link. One must be logged in to
        host or join a game. Once a second player has joined, third parties can
        use the same link to spectate.
      </p>
      <br />
      <p>The following steps are performed when starting a game:</p>
      <br />
      <br />

      <h2>1. Select repertoires.</h2>
      <p>
        New accounts are provided 3 identical starter repertoires, which can be
        customized in the Repertoires page. Avelhem and skill repertoires must
        contain exactly 20 and 60 cards, respectively.
      </p>
      <br />
      <br />

      <h2>2. Distribute unit tokens and decide who plays the first turn.</h2>
      <p>
        The host is assigned the gold unit tokens and given the choice of
        playing first or second (they have the option of choosing randomly).
        Their opponent is assigned the silver unit tokens.
      </p>
      <br />
      <br />

      <h2>3. Designate sides and deploy pawns.</h2>
      <p>
        The board is oriented with 10 rows and 5 columns. Sovereigns take their
        positions on opposite sides, with the row closest to each of them
        designated as their base. Pawns are deployed on the 1st, 3rd, and 5th
        columns of the 4th row from each Sovereign’s side.
      </p>
      <br />
      <br />

      <h2>4. Set both Sovereigns’ Fate Defiance (FD) counters to 3.</h2>
      <p>
        A Sovereign’s FD, as well as their BP, is displayed between their
        Avelhem and skill repertoires.
      </p>
      <br />
      <br />

      <h2>5. Shuffle repertoires and draw skill cards.</h2>
      <p>
        After shuffling, both Sovereigns draw 4 skill cards. The Sovereign who
        plays the first turn adds 1 copy of “Transcendence” to their hand and
        places the other copy in their vestige. The second Sovereigns adds both
        of their copies to their hand.
      </p>
    </div>,
    //2 Units
    <div className="rules-text">
      <h1>Units: Basic Mechanics</h1>
      <p>
        Units are the Sovereigns’ subservient soldiers. When in play, they
        occupy a zone on the board; zones cannot host more than a single unit.
        Each Sovereign can have up to 8 units in play at a time, and no more
        than 2 ally Scions can have the same class.
      </p>
      <br />
      <br />

      <h2>Deployment</h2>
      <p>
        With the exception of those in setup, units are deployed within their
        Sovereign’s frontier, which initially includes the first 3 rows from
        their side of the board. Sovereigns can spend BP to expand their
        frontier.
      </p>
      <br />
      <br />

      <h2>Health Points (HP)</h2>
      <p>
        Units start with 1 HP, which can be increased by certain effects and
        reduced primarily by attacks. An attack’s power (AP) determines the
        amount of HP it deducts, with the default AP being 1.
      </p>
      <br />
      <br />

      <h2>Elimination</h2>
      <p>
        Units are eliminated and removed from play when their HP is depleted.
        Sovereigns receive 2 FD when their units are eliminated and are awarded
        1 BP when they eliminate their opponent’s units.
      </p>
      <br />
      <br />

      <h2>Class and Ascension</h2>
      <p>
        A unit’s class defines its capabilities. Units start as pawns and can
        ascend to Scions to unlock class-exclusive abilities, talents, and
        skills. Pawns cannot ascend while muted (see Statuses for more
        information).
      </p>
      <br />
      <br />

      <div className="rules-image-container">
        <div>
          Exhibit - From left to right: Pawn, Metal Scion, & Fire Scion unit
          tokens
        </div>
        <img
          src={UnitTokens}
          className="rules-unit-token"
          alt="From left to right: Pawn, Metal Scion, Fire Scion"
        />
      </div>
    </div>,
    //3  Cards
    <div className="rules-text">
      <h1>Cards: Basic Mechanics</h1>
      <p>
        Cards belong to two categories: Avelhems and skills, each with its own
        repertoire (deck) and vestige (discard pile). When a repertoire is
        depleted, its corresponding vestige is shuffled to replenish it. Cards
        can be activated from one’s hand, and they are sent to the vestige upon
        the conclusion of their effects, unless stated otherwise.
      </p>

      <br />
      <br />

      <h2>Avelhems</h2>
      <p>
        Avelhems are cards that Sovereigns can activate to ascend their pawns to
        Scions of a specified class. The icon at an Avelhem’s top left corner
        reflects its corresponding Scion class. All Avelhems have the same
        resonance, which is an additional effect that is applied only if the
        card is resonated (activated with an identical copy or valid
        substitute).
      </p>
      <br />
      <br />

      <h2>Skills</h2>
      <p>
        Skill cards offer a wider variety of effects that can activated by
        Sovereigns, as well as units. The aspect of a skill, indicated by the
        icon at its top left corner, identifies its exclusive activator. For
        example, a Sovereign skill (represented by a crown icon aspect) can only
        be activated by a Sovereign. Likewise, a Lightning skill can only be
        activated by a Lightning Scion. Skills also have methods, represented by
        the gems below their aspect icons. These will be discussed at a later
        section.
      </p>
      <br />
      <br />

      <div className="rules-image-container">
        <div>
          Exhibit - From left to right: Plant Avelhem, Sovereign skill, &
          Lightning skill cards
        </div>
        <br />
        <img
          src={SkillAnatomy}
          className="rules-skill-anatomy"
          alt="Left: Plant Avelhem card; Right: Reminiscence, a Standard Sovereign skill card"
        />
      </div>
    </div>,
    //4 Phases 1
    <div className="rules-text">
      <h1>Turn Structure - Part 1</h1>
      <p>
        Sovereigns alternate taking turns consisting of multiple phases. The
        Initiator refers to the Sovereign whose turn it currently is.
      </p>
      <br />
      <br />

      <h2>Acquisition Phase</h2>
      <p>
        The Acquisition Phase commences the Initiator’s turn, providing the
        opportunity to bolster resources. During this phase, the Initiator
        chooses 1 of the following:
      </p>

      <ul>
        <li>A. Appoint: Deploy a pawn in your frontier.</li>
        <li>B. Beseech: Draw 2 Avelhems.</li>
        <li>C. Cultivate: Draw 1 skill. </li>
      </ul>

      <br />
      <br />

      <h2>Bounty Phase</h2>
      <p>
        During the Bounty Phase, the Initiator may spend Bounty Points (BP) on
        upgrades in tiered categories. (See Bounty Phase Catalog for details.)
        Items in subsequent tiers become available after their precedents have
        been purchased. Multiple purchases are allowed, as long as BP is
        sufficient. BP is earned primarily by eliminating enemy units.
      </p>

      <br />
      <br />

      <h2>Coordination Phase</h2>
      <p>
        The Coordination Phase provides the Initiator’s tactics, which determine
        their possible actions. During this Phase, the Initiator chooses 1 of
        the following:
      </p>

      <ul>
        <li>A. Assent: Roll 2 tactical dice.</li>
        <li>B. Battle Cry: Spend 3 skills to gain an Assault tactic.</li>
        <li>C. Convene: Gain a Rally tactic.</li>
      </ul>

      <br />
      <br />
    </div>,
    //5 // Phases 2
    <div className="rules-text">
      <h1>Turn Structure - Part 2</h1>
      <br />
      <br />
      <h2>Defiance Phase</h2>
      <p>
        The Defiance Phase grants the Initiator the opportunity to spend FD on
        immediate benefits. During this Defiance Phase, the Initiator may choose
        1 of the following:
      </p>
      <ol style={{ listStyleType: "upper-alpha" }}>
        <li>
          Artifice: Spend 1 FD to select up to 4 skills from your hand; place
          them at the bottom of your repertoire, then draw the same number.
        </li>
        <li>Backtrack: Spend 1 FD to reroll your tactics.</li>
        <li>
          Curate: Spend 2 FD to reroll your tactics with 3 dice, then disregard
          1 of them.
        </li>
        <li>
          Destine: Spend 2 FD and 1 Scion skill to ascend an ally pawn to the
          matching class.
        </li>
        <li>Ex Machina: Spend 3 FD to search for 1 Sovereign skill.</li>
        <li>
          Finesse: Spend 4 FD to draw 1 skill. You may recover 1
          “Transcendence”.
        </li>
      </ol>
      <br />
      <br />
      <h2>Execution Phase</h2>
      <p>
        The Execution Phase is where the Initiator and their units perform
        actions and activate effects. The following can be performed in any
        sequence, combination, and frequency, provided the resources are
        sufficient.
      </p>
      <ol style={{ listStyleType: "upper-alpha" }}>
        <li>Activate an Avelhem or Sovereign skill card.</li>
        <li>Use a tactic to perform a Sovereign action.</li>
        <li>Activate a unit’s skill card.</li>
        <li>Use a tactic to perform a unit action.</li>
        <li>Activate a unit’s ability.</li>
      </ol>
      When there are no ongoing actions or effects, the Initiator can conclude
      their Execution Phase.
      <br />
      <br />
      <h2>Final Phase</h2>
      <p>
        The Final Phase wraps up the Initiator’s turn. During this phase, the
        Initiator applies the following in sequence:
      </p>
      <ol>
        <li>Forfeit unused tactics.</li>
        <li>Discard all Avelhems from hand.</li>
        <li>Selectively discard skills in excess of 8 from hand.</li>

        <li>
          Decrease the durations of their units’ turn-based statuses by 1. The
          Burn affliction is decreased first, followed by all other statuses
          simultaneously. If multiple of their units are afflicted with Burn,
          the Initiator must decrease them one-by-one in any desired sequence.
        </li>
        <li>
          Score if applicable. A unit scores when then occupy a zone in the
          opponent’s base at the end of the Final Phase. Units can score only
          once. Units that have scored stay on the board and are still counted
          in their Sovereign’s unit limits, but they can no longer be interacted
          with. If the Initiator scores with enough units to meet the victory
          objective, they win the game. Otherwise, their opponent commences the
          next turn as the Initiator.
        </li>
      </ol>
    </div>,
  ];

  return (
    <div className="rule-body">
      <div
        className="rule-content"
        style={{
          backgroundImage: `url(${getBannerImage("WindBG")})`,
        }}
      >
        <div className="rule-title">
          <img src={RulesImg} className="page-title" />
        </div>
        <button
          onClick={() => {
            handleChangeRule("left");
          }}
        >
          Left
        </button>
        <button
          onClick={() => {
            handleChangeRule("right");
          }}
        >
          Right
        </button>
        {/* {rulesBody[rulesPart]} */}

        <div className="rules-text">
          <h1>Overview</h1>
          <p>
            <em>Avelhem: War of the Sovereigns</em> is a board game set in a
            fantastical realm where two players assume the roles of Sovereigns
            vying for dominance.
          </p>
          <br />
          <p>
            Sovereigns alternate taking turns consisting of multiple phases.
            Each turn provides up to two tactics that can be used to perform
            various actions such as drawing a card and deploying or moving a
            unit. Sovereigns can accumulate cards over the course of multiple
            turns and activate them at opportune moments to supplement their
            limited actions.
          </p>
          <br />
          <p>
            Units enter play as pawns capable only of movement and attack. Pawns
            can ascend to Scions, unlocking access to exclusive abilities,
            talents, and skill cards with a variety of effects.
          </p>
          <br />
          <br />

          <h2>Objective</h2>
          <p>
            A Sovereign wins by moving one of their pieces to the opponent’s end
            of the board. When victory is achieved, the Sovereigns may opt to
            continue the game by raising the number of units required for
            victory.
          </p>
          <br />
          <br />

          <h2>Components</h2>
          <ol>
            <li>Game board</li>
            <ul>
              <li>Features a grid with 10 rows and 5 columns</li>
            </ul>

            <li>Custom dice</li>
            <ul>
              <li>
                3 identical cubic dice; faces consist of 2 Advance, 2 Mobilize,
                1 Assault, and 1 Invoke
              </li>
            </ul>

            <li>Avelhem and skill cards</li>
            <ul>
              <li>
                The base game provides each Sovereign a playset consisting of 32
                (8 unique) Avelhems and 136 (46 unique) skills
              </li>
            </ul>

            <li>Unit tokens</li>
            <ul>
              <li>
                The base game provides gold and silver sets of 8 pawns and 16 (8
                unique) Scion tokens
              </li>
            </ul>

            <li>Player boards</li>
            <ul>
              <li>
                Displays upgrades and tallies Bounty Points and Fate Defiances
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
        </div>

        <div className="rules-text">
          <h1>Setup</h1>
          <p>
            In this website, users can host a game through the Create Game page
            and invite an opponent by sending them the link. One must be logged
            in to host or join a game. Once a second player has joined, third
            parties can use the same link to spectate.
          </p>
          <br />
          <p>The following steps are performed when starting a game:</p>
          <br />
          <br />

          <h2>1. Select repertoires.</h2>
          <p>
            New accounts are provided 3 identical starter repertoires, which can
            be customized in the Repertoires page. Avelhem and skill repertoires
            must contain exactly 20 and 60 cards, respectively.
          </p>
          <br />
          <br />

          <h2>
            2. Distribute unit tokens and decide who plays the first turn.
          </h2>
          <p>
            The host is assigned the gold unit tokens and given the choice of
            playing first or second (they have the option of choosing randomly).
            Their opponent is assigned the silver unit tokens.
          </p>
          <br />
          <br />

          <h2>3. Designate sides and deploy pawns.</h2>
          <p>
            The board is oriented with 10 rows and 5 columns. Sovereigns take
            their positions on opposite sides, with the row closest to each of
            them designated as their base. Pawns are deployed on the 1st, 3rd,
            and 5th columns of the 4th row from each Sovereign’s side.
          </p>
          <br />
          <br />

          <h2>4. Set both Sovereigns’ Fate Defiance (FD) counters to 3.</h2>
          <p>
            A Sovereign’s FD, as well as their BP, is displayed between their
            Avelhem and skill repertoires.
          </p>
          <br />
          <br />

          <h2>5. Shuffle repertoires and draw skill cards.</h2>
          <p>
            After shuffling, both Sovereigns draw 4 skill cards. The Sovereign
            who plays the first turn adds 1 copy of “Transcendence” to their
            hand and places the other copy in their vestige. The second
            Sovereigns adds both of their copies to their hand.
          </p>

          <br />
          <br />

          <div className="rules-image-container">
            <div>Exhibit - Game state at setup (virtual simulator)</div>
            <br />
            <img
              src={Setup}
              className="rules-skill-anatomy"
              alt="Game state at setup"
            />
          </div>
        </div>

        <div className="rules-text">
          <h1>Units: Basic Mechanics</h1>
          <p>
            Units are the Sovereigns’ subservient soldiers. When in play, they
            occupy a zone on the board; zones cannot host more than a single
            unit. Each Sovereign can have up to 8 units in play at a time, and
            no more than 2 ally Scions can have the same class.
          </p>
          <br />
          <br />

          <h2>Deployment</h2>
          <p>
            With the exception of those in setup, units are deployed within
            their Sovereign’s frontier, which initially includes the first 3
            rows from their side of the board. Sovereigns can spend BP to expand
            their frontier.
          </p>
          <br />
          <br />

          <h2>Health Points (HP)</h2>
          <p>
            Units start with 1 HP, which can be increased by certain effects and
            reduced primarily by attacks. An attack’s power (AP) determines the
            amount of HP it deducts, with the default AP being 1.
          </p>
          <br />
          <br />

          <h2>Elimination</h2>
          <p>
            Units are eliminated and removed from play when their HP is
            depleted. Sovereigns receive 2 FD when their units are eliminated
            and are awarded 1 BP when they eliminate their opponent’s units.
          </p>
          <br />
          <br />

          <h2>Class and Ascension</h2>
          <p>
            A unit’s class defines its capabilities. Units start as pawns and
            can ascend to Scions to unlock class-exclusive abilities, talents,
            and skills. Pawns cannot ascend while muted (see Statuses for more
            information).
          </p>
          <br />
          <br />

          <div className="rules-image-container">
            <div>
              Exhibit - From left to right: Pawn, Metal Scion, & Fire Scion unit
              tokens
            </div>
            <img
              src={UnitTokens}
              className="rules-unit-token"
              alt="From left to right: Pawn, Metal Scion, Fire Scion"
            />
          </div>
        </div>

        <div className="rules-text">
          <h1>Cards: Basic Mechanics</h1>
          <p>
            Cards belong to two categories: Avelhems and skills, each with its
            own repertoire (deck) and vestige (discard pile). When a repertoire
            is depleted, its corresponding vestige is shuffled to replenish it.
            Cards can be activated from one’s hand, and they are sent to the
            vestige upon the conclusion of their effects, unless stated
            otherwise.
          </p>

          <br />
          <br />

          <h2>Avelhems</h2>
          <p>
            Avelhems are cards that Sovereigns can activate to ascend their
            pawns to Scions of a specified class. The icon at an Avelhem’s top
            left corner reflects its corresponding Scion class. All Avelhems
            have the same resonance, which is an additional effect that is
            applied only if the card is resonated (activated with an identical
            copy or valid substitute).
          </p>
          <br />
          <br />

          <h2>Skills</h2>
          <p>
            Skill cards offer a wider variety of effects that can activated by
            Sovereigns, as well as units. The aspect of a skill, indicated by
            the icon at its top left corner, identifies its exclusive activator.
            For example, a Sovereign skill (represented by a crown icon aspect)
            can only be activated by a Sovereign. Likewise, a Lightning skill
            can only be activated by a Lightning Scion. Skills also have
            methods, represented by the gems below their aspect icons. These
            will be discussed at a later section.
          </p>
          <br />
          <br />

          <div className="rules-image-container">
            <div>
              Exhibit - From left to right: Plant Avelhem, Sovereign skill, &
              Lightning skill cards
            </div>
            <br />
            <img
              src={SkillAnatomy}
              className="rules-skill-anatomy"
              alt="Left: Plant Avelhem card; Right: Reminiscence, a Standard Sovereign skill card"
            />
          </div>
        </div>

        <div className="rules-text">
          <h1>Turn Structure</h1>
          <p>
            Sovereigns alternate taking turns consisting of multiple phases. The
            Initiator refers to the Sovereign whose turn it currently is.
          </p>
          <br />
          <br />
          <h2>Acquisition Phase</h2>
          <p>
            The Acquisition Phase commences the Initiator’s turn, providing the
            opportunity to bolster resources. During this phase, the Initiator
            chooses 1 of the following:
          </p>
          <ul>
            <li>Appoint: Deploy a pawn in your frontier.</li>
            <li>Beseech: Draw 2 Avelhems.</li>
            <li>Cultivate: Draw 1 skill. </li>
          </ul>
          <br />
          <br />
          <h2>Bounty Phase</h2>
          <p>
            During the Bounty Phase, the Initiator may spend Bounty Points (BP)
            on upgrades in tiered categories. (See Bounty Phase Catalog for
            details.) Items in subsequent tiers become available after their
            precedents have been purchased. Multiple purchases are allowed, as
            long as BP is sufficient. BP is earned primarily by eliminating
            enemy units.
          </p>
          <br />
          <br />
          <h2>Coordination Phase</h2>
          <p>
            The Coordination Phase provides the Initiator’s tactics, which
            determine their possible actions. During this Phase, the Initiator
            chooses 1 of the following:
          </p>
          <ul>
            <li>Assent: Roll 2 tactical dice.</li>
            <li>Battle Cry: Spend 3 skills to gain an Assault tactic.</li>
            <li>Convene: Gain a Rally tactic.</li>
          </ul>
          <br />
          <br />
          <h2>Defiance Phase</h2>
          <p>
            The Defiance Phase grants the Initiator the opportunity to spend FD
            on immediate benefits. During this Defiance Phase, the Initiator may
            choose 1 of the following:
          </p>
          <ul>
            <li>
              Artifice: Spend 1 FD to select up to 4 skills from your hand;
              place them at the bottom of your repertoire, then draw the same
              number.
            </li>
            <li>Backtrack: Spend 1 FD to reroll your tactics.</li>
            <li>
              Curate: Spend 2 FD to reroll your tactics with 3 dice, then
              disregard 1 of them.
            </li>
            <li>
              Destine: Spend 2 FD and 1 Scion skill to ascend an ally pawn to
              the matching class.
            </li>
            <li>Ex Machina: Spend 3 FD to search for 1 Sovereign skill.</li>
            <li>
              Finesse: Spend 4 FD to draw 1 skill. You may recover 1
              “Transcendence”.
            </li>
          </ul>
          <br />
          <br />
          <h2>Execution Phase</h2>
          <p>
            The Execution Phase is where the Initiator and their units perform
            actions and activate effects. The following can be performed in any
            sequence, combination, and frequency, provided the resources are
            sufficient.
          </p>
          <ul>
            <li>Activate an Avelhem or Sovereign skill card.</li>
            <li>Use a tactic to perform a Sovereign action.</li>
            <li>Activate a unit’s skill card.</li>
            <li>Use a tactic to perform a unit action.</li>
            <li>Activate a unit’s ability.</li>
          </ul>
          When there are no ongoing actions or effects, the Initiator can
          conclude their Execution Phase.
          <br />
          <br />
          <h2>Final Phase</h2>
          <p>
            The Final Phase wraps up the Initiator’s turn. During this phase,
            the Initiator applies the following in sequence:
          </p>
          <ol>
            <li>Forfeit unused tactics.</li>
            <li>Discard all Avelhems from hand.</li>
            <li>Selectively discard skills in excess of 8 from hand.</li>

            <li>
              Decrease the durations of their units’ turn-based statuses by 1.
              The Burn affliction is decreased first, followed by all other
              statuses simultaneously. If multiple of their units are afflicted
              with Burn, the Initiator must decrease them one-by-one in any
              desired sequence.
            </li>
            <li>
              Score if applicable. A unit scores when then occupy a zone in the
              opponent’s base at the end of the Final Phase. Units can score
              only once. Units that have scored stay on the board and are still
              counted in their Sovereign’s unit limits, but they can no longer
              be interacted with. If the Initiator scores with enough units to
              meet the victory objective, they win the game. Otherwise, their
              opponent commences the next turn as the Initiator.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
