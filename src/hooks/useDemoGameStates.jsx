import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const useDemoGameStates = () => {
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const getDemoGameState = (demo) => {
    switch (demo) {
      case "game":
        return {
          activatingUnit: [],
          activatingTarget: [],
          tactics: [],
          host: {
            bountyPoints: 0,
            skillRepertoire: [
              "01-01",
              "01-01",
              "01-01",
              "01-01",
              "01-02",
              "01-02",
              "01-02",
              "01-02",
              "01-03",
              "01-03",
              "01-03",
              "01-04",
              "02-01",
              "02-01",
              "02-01",
              "02-01",
              "02-02",
              "02-02",
              "02-02",
              "02-02",
              "02-03",
              "02-03",
              "02-04",
              "04-01",
              "04-01",
              "04-01",
              "04-01",
              "04-03",
              "04-03",
              "04-03",
              "04-03",
              "04-04",
              "07-01",
              "07-01",
              "07-01",
              "07-01",
              "07-02",
              "07-02",
              "07-02",
              "07-02",
              "07-03",
              "07-03",
              "07-03",
              "07-03",
              "07-04",
              "SA-02",
              "SA-02",
              "SA-03",
              "SA-03",
              "SA-04",
              "SA-04",
              "SB-01",
              "SB-01",
              "SB-03",
              "SB-03",
              "SB-04",
              "SB-04",
              "SB-05",
              "SB-05",
              "03-04",
            ],
            bountyUpgrades: {
              frontier: 0,
              coordination: 0,
              avelhem: 0,
              victory: 0,
              acquisition: 0,
              tactics: 0,
            },
            avelhemFloat: 0,
            avelhemVestige: [],
            skillHand: [],
            units: [],
            skillShattered: [],
            displayName: "Gold Sovereign",
            score: 0,
            avelhemRepertoire: [
              1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 7, 7, 7, 7,
            ],
            skillVestige: [],
            skillFloat: 0,
            avelhemHand: [],
            fateDefiances: 3,
          },
          turnCount: 0,
          currentResolution: [],
          activatingResonator: [],
          guest: {
            avelhemFloat: 0,
            bountyPoints: 0,
            skillFloat: 0,
            displayName: "Silver Sovereign",
            score: 0,
            avelhemRepertoire: [
              1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 7, 7, 7, 7,
            ],
            skillShattered: [],
            avelhemHand: [],
            fateDefiances: 3,
            skillVestige: [],
            skillHand: [],
            skillRepertoire: [
              "01-01",
              "01-01",
              "01-01",
              "01-01",
              "01-02",
              "01-02",
              "01-02",
              "01-02",
              "01-03",
              "01-03",
              "01-03",
              "01-04",
              "02-01",
              "02-01",
              "02-01",
              "02-01",
              "02-02",
              "02-02",
              "02-02",
              "02-02",
              "02-03",
              "02-03",
              "02-03",
              "02-03",
              "02-04",
              "04-01",
              "04-01",
              "04-01",
              "04-01",
              "04-03",
              "04-03",
              "04-03",
              "04-03",
              "04-04",
              "07-01",
              "07-01",
              "07-01",
              "07-01",
              "07-02",
              "07-02",
              "07-02",
              "07-02",
              "07-03",
              "07-03",
              "07-03",
              "07-03",
              "07-04",
              "SA-02",
              "SA-02",
              "SA-03",
              "SA-03",
              "SA-04",
              "SA-04",
              "SB-01",
              "SB-01",
              "SB-03",
              "SB-03",
              "SB-04",
              "SB-04",
              "03-04",
            ],
            bountyUpgrades: {
              coordination: 0,
              acquisition: 0,
              victory: 0,
              avelhem: 0,
              tactics: 0,
              frontier: 0,
            },
            units: [],
            avelhemVestige: [],
          },
          winObjective: 1,
          winner: null,
          zones:
            '[[{"id":0,"row":0,"column":0},{"id":1,"row":0,"column":1},{"id":2,"row":0,"column":2},{"id":3,"row":0,"column":3},{"id":4,"row":0,"column":4}],[{"id":5,"row":1,"column":0},{"id":6,"row":1,"column":1},{"id":7,"row":1,"column":2},{"id":8,"row":1,"column":3},{"id":9,"row":1,"column":4}],[{"id":10,"row":2,"column":0},{"id":11,"row":2,"column":1},{"id":12,"row":2,"column":2},{"id":13,"row":2,"column":3},{"id":14,"row":2,"column":4}],[{"id":15,"row":3,"column":0},{"id":16,"row":3,"column":1},{"id":17,"row":3,"column":2},{"id":18,"row":3,"column":3},{"id":19,"row":3,"column":4}],[{"id":20,"row":4,"column":0},{"id":21,"row":4,"column":1},{"id":22,"row":4,"column":2},{"id":23,"row":4,"column":3},{"id":24,"row":4,"column":4}],[{"id":25,"row":5,"column":0},{"id":26,"row":5,"column":1},{"id":27,"row":5,"column":2},{"id":28,"row":5,"column":3},{"id":29,"row":5,"column":4}],[{"id":30,"row":6,"column":0},{"id":31,"row":6,"column":1},{"id":32,"row":6,"column":2},{"id":33,"row":6,"column":3},{"id":34,"row":6,"column":4}],[{"id":35,"row":7,"column":0},{"id":36,"row":7,"column":1},{"id":37,"row":7,"column":2},{"id":38,"row":7,"column":3},{"id":39,"row":7,"column":4}],[{"id":40,"row":8,"column":0},{"id":41,"row":8,"column":1},{"id":42,"row":8,"column":2},{"id":43,"row":8,"column":3},{"id":44,"row":8,"column":4}],[{"id":45,"row":9,"column":0},{"id":46,"row":9,"column":1},{"id":47,"row":9,"column":2},{"id":48,"row":9,"column":3},{"id":49,"row":9,"column":4}]]',
          activatingSkill: [],
          turnPlayer: null,
          turnPhase: null,
          skipAscensionTrigger: true,
        };

      case "learn":
        return {
          winner: null,
          activatingSkill: [],
          winObjective: 1,
          turnPlayer: null,
          activatingTarget: [],
          activatingResonator: [],
          zones:
            '[[{"id":0,"row":0,"column":0},{"id":1,"row":0,"column":1},{"id":2,"row":0,"column":2},{"id":3,"row":0,"column":3},{"id":4,"row":0,"column":4}],[{"id":5,"row":1,"column":0},{"id":6,"row":1,"column":1},{"id":7,"row":1,"column":2},{"id":8,"row":1,"column":3},{"id":9,"row":1,"column":4}],[{"id":10,"row":2,"column":0},{"id":11,"row":2,"column":1},{"id":12,"row":2,"column":2},{"id":13,"row":2,"column":3},{"id":14,"row":2,"column":4}],[{"id":15,"row":3,"column":0},{"id":16,"row":3,"column":1},{"id":17,"row":3,"column":2},{"id":18,"row":3,"column":3},{"id":19,"row":3,"column":4}],[{"id":20,"row":4,"column":0},{"id":21,"row":4,"column":1},{"id":22,"row":4,"column":2},{"id":23,"row":4,"column":3},{"id":24,"row":4,"column":4}],[{"id":25,"row":5,"column":0},{"id":26,"row":5,"column":1},{"id":27,"row":5,"column":2},{"id":28,"row":5,"column":3},{"id":29,"row":5,"column":4}],[{"id":30,"row":6,"column":0},{"id":31,"row":6,"column":1},{"id":32,"row":6,"column":2},{"id":33,"row":6,"column":3},{"id":34,"row":6,"column":4}],[{"id":35,"row":7,"column":0},{"id":36,"row":7,"column":1},{"id":37,"row":7,"column":2},{"id":38,"row":7,"column":3},{"id":39,"row":7,"column":4}],[{"id":40,"row":8,"column":0},{"id":41,"row":8,"column":1},{"id":42,"row":8,"column":2},{"id":43,"row":8,"column":3},{"id":44,"row":8,"column":4}],[{"id":45,"row":9,"column":0},{"id":46,"row":9,"column":1},{"id":47,"row":9,"column":2},{"id":48,"row":9,"column":3},{"id":49,"row":9,"column":4}]]',
          host: {
            skillRepertoire: [
              "02-01",
              "02-01",
              "02-01",
              "02-01",
              "02-03",
              "02-03",
              "02-03",
              "02-03",
              "02-04",
              "04-01",
              "04-01",
              "04-02",
              "04-02",
              "04-03",
              "04-03",
              "04-03",
              "04-03",
              "06-03",
              "06-03",
              "06-03",
              "06-03",
              "06-04",
              "07-02",
              "07-02",
              "07-02",
              "07-02",
              "07-03",
              "07-03",
              "07-03",
              "07-03",
              "07-04",
              "08-01",
              "08-01",
              "08-01",
              "08-01",
              "08-02",
              "08-02",
              "08-02",
              "08-02",
              "08-03",
              "08-03",
              "08-03",
              "08-03",
              "08-04",
              "SA-01",
              "SA-01",
              "SA-04",
              "SA-04",
              "SB-01",
              "SB-01",
              "SB-02",
              "SB-02",
              "SB-04",
              "SB-05",
              "SC-01",
              "SC-01",
              "SC-03",
              "SC-03",
              "SC-05",
              "SC-05",
            ],
            skillFloat: 0,
            score: 0,
            avelhemVestige: [],
            fateDefiances: 3,
            avelhemFloat: 0,
            avelhemHand: [],
            bountyUpgrades: {
              coordination: 0,
              frontier: 0,
              avelhem: 0,
              acquisition: 0,
              victory: 0,
              tactics: 0,
            },
            units: [],
            skillHand: [],
            avelhemRepertoire: [
              2, 2, 2, 2, 4, 4, 4, 4, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8,
            ],
            skillVestige: [],
            skillShattered: [],
            bountyPoints: 0,
            displayName: "Gold Player",
          },
          turnCount: 0,
          tactics: [],
          guest: {
            score: 0,
            avelhemHand: [],
            avelhemRepertoire: [
              1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 7, 7, 8, 8,
            ],
            avelhemFloat: 0,
            skillFloat: 0,
            skillHand: [],
            skillRepertoire: [
              "01-01",
              "01-01",
              "01-01",
              "01-01",
              "01-02",
              "01-02",
              "01-02",
              "01-02",
              "01-03",
              "01-03",
              "01-03",
              "01-04",
              "02-01",
              "02-01",
              "02-01",
              "02-01",
              "02-02",
              "02-02",
              "02-02",
              "02-02",
              "02-03",
              "02-03",
              "02-03",
              "02-03",
              "02-04",
              "03-04",
              "04-01",
              "04-01",
              "04-01",
              "04-01",
              "04-03",
              "04-03",
              "04-03",
              "04-03",
              "04-04",
              "07-01",
              "07-01",
              "07-01",
              "07-03",
              "07-02",
              "07-02",
              "07-02",
              "07-02",
              "07-03",
              "07-03",
              "07-04",
              "SA-02",
              "SA-02",
              "SA-03",
              "SA-03",
              "SA-04",
              "SA-04",
              "SB-01",
              "SB-01",
              "SB-03",
              "SB-03",
              "SB-04",
              "SB-04",
              "SB-05",
              "SB-05",
            ],
            fateDefiances: 3,
            bountyPoints: 0,
            avelhemVestige: [],
            units: [],
            bountyUpgrades: {
              tactics: 0,
              victory: 0,
              acquisition: 0,
              coordination: 0,
              frontier: 0,
              avelhem: 0,
            },
            skillShattered: [],
            skillVestige: [],
            displayName: "Silver Player",
          },
          activatingUnit: [],
          turnPhase: null,
          currentResolution: [],
        };

      default:
        return;
    }
  };

  const getDemoInstructions = () => {
    switch (true) {
      case demoGuide.slice(0, 5) === "Learn":
        switch (demoGuide) {
          case "Learn1.1.1":
            return (
              <div>
                This demo is an interactive tutorial that will familiarize you
                with general gameplay mechanics, as well as the simulator’s
                interface.
                <br />
                <br />
                To proceed through, click on objects and buttons that are
                glowing green.
              </div>
            );

          case "Learn1.1.2":
            return (
              <div>
                <em>
                  <strong>Avelhem: War of the Sovereigns</strong>
                </em>{" "}
                is competitive board game where 2 players assume the roles of
                Sovereigns vying for dominance.
                <br />
                <br />
                From this point onwards, the term “Sovereign” will refer to a
                player.
              </div>
            );

          case "Learn1.1.3":
            return (
              <div>
                The game unfolds on a board with 10 rows and 5 columns, where
                units can be deployed. Sovereigns take their positions on
                opposite sides, with the row closest to each of them designated
                as their base.{" "}
                <strong>
                  To win, a Sovereign must score 1 point by moving any of their
                  units into their opponent’s base.
                </strong>
              </div>
            );

          case "Learn1.1.4":
            return (
              <div>
                When victory is achieved, Sovereigns may opt to continue playing
                by incrementing the score objective, up to a maximum 5.
              </div>
            );

          case "Learn1.1.5":
            return (
              <div>
                <strong>
                  Prior to the game, each Sovereign must construct a pair of
                  repertoires (decks) consisting of 20 Avelhem cards and 60
                  skills cards.
                </strong>{" "}
                Although the game is initially a race to score 1 point, it is
                recommended that Sovereigns agree on a final objective
                beforehand, as it may influence their strategies and repertoire
                creation.
              </div>
            );

          case "Learn1.1.5.1":
            return (
              <div>
                You can find the repertoires (decks) to the right of the board.
                The cards with the red borders are skills, while those with the
                gold borders are Avelhems. The repertoires on top are your
                opponent’s, while the pair below is yours.
              </div>
            );

          case "Learn1.1.6":
            return (
              <div>
                Sovereigns will take turns consisting of multiple phases.{" "}
                <strong>
                  The “Initiator” refers to the Sovereign whose turn it
                  currently is.
                </strong>{" "}
                Either Sovereign can be the first turn’s Initiator, determined
                by any reasonable means.
              </div>
            );

          case "Learn1.2":
            return (
              <div>
                Sovereigns are designated either the gold or silver unit tokens
                to represent their armies. In this simulator, the host is always
                assigned the gold tokens and is given the choice of taking the
                first or second turn.
                <br />
                <br />
                Click on Go First.
              </div>
            );

          case "Learn1.3":
            return (
              <div>
                Once the Initiator of the first turn has been decided, both
                Sovereigns set their FD counters to 3 and deploy pawns on the
                first, third, and fifth columns on fourth row of their side of
                the board.{" "}
                <em>(FD will be explained when it becomes relevant.)</em> They
                then shuffle their repertoires (decks) and draw 4 skills cards
                each.
              </div>
            );

          case "Learn1.5":
            return (
              <div>
                Furthermore, the first Sovereign adds 1 copy of “Transcendence”
                to their hand and places another copy in their vestige (discard
                pile). The second Sovereign adds 2 copies of “Transcendence” to
                their hand.
                <br />
                <br />
                And that concludes the setup. Let’s proceed to the turn
                structure.
              </div>
            );

          case "Learn1.6":
            return (
              <div>
                Each turn has 6 phases, the first of which is the{" "}
                <strong>Acquisition Phase</strong>, where the Initiator is given
                the opportunity to bolster their resources by deploying
                reinforcements or drawing more cards.
                <br />
                <br />
                <strong>
                  (Reminder: The Initiator is the Sovereign whose turn it
                  currently is.)
                </strong>
              </div>
            );

          case "Learn1.7":
          case "Learn1.8":
            return (
              <div>
                Since you already have pawns on the board and skills in your
                hand, select “Beseech” to draw 2 Avelhems.
              </div>
            );

          case "Learn1.8.1":
            return (
              <div>
                The titular Avelhems refer to the powers bestowed upon mortals
                that grant them divine authority over specific facets of
                creation. In this game, they are represented by cards that can
                be activated to ascend pawns to Scions with abilities and
                effects that thematically apply their facet.
              </div>
            );

          case "Learn1.8.2":
            return (
              <div>
                For your convenience, skills and Avelhems are held in separate
                hands. The latter can found to the right of the former.
              </div>
            );

          case "Learn1.9":
            return (
              <div>
                Up next is the <strong>Bounty Phase</strong>, where the
                Initiator can spend BP (Bounty Points) on permanent upgrades,
                such as the additional effects shown during the Acquisition
                Phase.
              </div>
            );

          case "Learn1.10":
            return (
              <div>
                <strong>
                  BP is primarily earned by eliminating enemy units.
                </strong>{" "}
                <br />
                <br />
                As you currently have 0 BP, proceed to the next phase. (But feel
                free to scroll through the options first.)
              </div>
            );

          case "Learn1.11":
          case "Learn1.12":
            return (
              <div>
                The <strong>Coordination Phase</strong> presents the Initiator
                the means to obtain tactics, which allow them and their units to
                perform actions.
                <br />
                <br />
                Choose the “Assent” option.
              </div>
            );

          case "Learn1.13":
            return (
              <div>
                Assent rolls 2 dice and grants the results as tactics. Though
                cubic with 6 sides, these dice have 4 different faces. The
                “Advance” and “Mobilize” tactics are more likely to appear as
                they are present on 2 sides each.
              </div>
            );

          case "Learn1.13.1":
            return (
              <div>
                Tactics determine the actions that can be taken, each providing
                a few options. There are overlaps between different tactics to
                some degree, but each tactic excels in its own speciality. For
                example, both these tactics allow units to move, but the latter
                does it better.
                <br />
                <br />
                Click on Proceed.
              </div>
            );

          case "Learn1.13.2":
            return (
              <div>
                Tactics are displayed between your and your opponent’s
                repertoires. At a later phase, you will be able to click and
                activate them.
              </div>
            );

          case "Learn1.14":
            return (
              <div>
                The <strong>Defiance Phase</strong> allows the Initiator to
                spend Fate Defiance (FD) on immediate yet short-term benefits,
                such as rerolling unfavorable tactics. The Initiator may choose
                at most 1 of these options once, even though they have
                sufficient FD to afford multiple.
              </div>
            );

          case "Learn1.15":
            return (
              <div>
                Sovereigns start the game with 3 FD.{" "}
                <strong>
                  <br />
                  <br />2 FD is obtained as consolation when an ally unit is
                  eliminated.
                </strong>{" "}
                <br />
                <br />
                Press Skip.
              </div>
            );

          case "Learn1.16":
            return (
              <div>
                The first 4 phases prepare the Initiator for the{" "}
                <strong>Execution Phase</strong>. There’s a lot that can be done
                in this phase, and these can be performed in any sequence and
                frequency, as long as you have the resources.
              </div>
            );

          case "Learn1.17":
            return (
              <div>
                Simply put, the Execution Phase is where the Initiator and their
                units perform actions using tactics and activate the effects of
                cards and abilities.
              </div>
            );

          case "Learn1.17.1":
            return (
              <div>
                Let’s start by activating an Avelhem card.{" "}
                <strong>
                  Avelhems are activated by Sovereigns, and they are primarily
                  used to ascend pawns to Scions of a specified class.
                </strong>{" "}
                Unlike pawns, Scions have the benefit of being able to activate
                abilities, talents, and skill cards.
              </div>
            );

          case "Learn1.18":
            return (
              <div>
                To activate an Avelhem, raise your Avelhem hand (found at the
                lower right corner) by clicking on any of its cards, then click
                on the specific one you want to use.
              </div>
            );

          case "Learn1.19":
          case "Learn1.20":
          case "Learn1.20.01":
            return (
              <div>
                Activate your Mana Avelhem to ascend your center pawn to a Mana
                Scion.
                <br />
                <br />
                <strong>
                  Note: The zones of eligible units will be colored blue.
                </strong>
              </div>
            );

          case "Learn1.20.1":
          case "Learn1.20.2":
            return (
              <div>
                When a card concludes its effects, it is sent to its respective
                vestige (discard pile). You (and only you) are allowed to view
                the contents of your own vestiges at any time.
                <br />
                <br />
                Click on either vestige to view its contents, then close it.
              </div>
            );

          case "Learn1.21":
          case "Learn1.22":
          case "Learn1.23":
          case "Learn1.23.01":
            return (
              <div>
                Activate your Land Avelhem to ascend your right pawn to a Land
                Scion.
              </div>
            );

          case "Learn1.24":
            return (
              <div>
                <strong>
                  Units possess class-exclusive talents, which are passive
                  effects that automatically activate when applicable.
                </strong>{" "}
                In the case of Land Scions, their{" "}
                <strong>“Mountain Stance”</strong> talent activates upon their
                debut (as they enter play via ascension or deployment).
              </div>
            );

          case "Learn1.25":
          case "Learn1.26":
            return (
              <div>
                Mountain Stance is a talent with a modular effect.
                <br />
                <br />
                Pick the option that allows you to spend any skill from your
                hand to search for the “Crystallization” skill from your
                repertoire.
              </div>
            );

          case "Learn1.27":
            return (
              <div>
                Spending a skill would discard it from your hand, so it is
                important to consider the tradeoff.
                <br />
                <br />
                Fortunately, you have a copy of “Transcendence”, which is a
                skill that has no effect, as it was designed primarily to be
                spent in lieu of useful skills.
              </div>
            );

          case "Learn1.28":
          case "Learn1.29":
            return (
              <div>
                Spend Transcendence.
                <br /> <br />
                <strong>
                  Note: At any time during the demo, you can click on the
                  magnifying glass icon at the top right corner of a card to
                  view it up close. Clicking anywhere would close the view.
                </strong>
              </div>
            );

          case "Learn1.30":
            return (
              <div>
                <strong>Search</strong> in an effect that allows Sovereigns to
                view the contents of their repertoire (deck) in an attempt to
                locate a card and add it to their hand (unless stated
                otherwise). Searches are subject to restrictions; a search is
                considered successful if it yields an eligible card.
                <br /> <br />
                Ineligible cards will be greyed out in the selection.
              </div>
            );

          case "Learn1.31":
            return (
              <div>
                Sovereigns are allowed to intentionally fail searches despite
                the existence of a valid card; however, resources spent on
                unsuccessful searches are not refunded.
                <br />
                <br />
                Regardless,{" "}
                <strong>repertoires are shuffled after every search</strong>.
              </div>
            );

          case "Learn1.32":
          case "Learn1.33":
            return <div>Add Crystallization to your hand.</div>;

          case "Learn1.34":
            return (
              <div>
                Now let us go over the use of tactics, starting with Advance.
                Sovereigns can activate tactics by clicking on them.
                <br />
                <br />
                Click on the Advance tactic below.
              </div>
            );

          case "Learn1.35":
          case "Learn1.36":
            return (
              <div>
                As a Sovereign, you choose between 3 actions when using an
                Advance tactic. Currently, only the option to deploy a pawn is
                available.
                <br />
                <br />
                <strong>
                  Note: Each Sovereign can have up to 8 units on the board.
                </strong>
              </div>
            );

          case "Learn1.37":
            return (
              <div>
                The{" "}
                <strong>
                  frontier refers to the set of zones (tiles) where you can
                  deploy your units
                </strong>
                . The frontier initially consists of 3 rows, starting from your
                side of the board. But, as you may have noticed during the
                Bounty Phase, it can be expanded to cover 6 rows.
              </div>
            );

          case "Learn1.38":
            return (
              <div>
                For now, press Cancel by the upper left corner of the board,
                then Return at the bottom of the prompt.
              </div>
            );

          case "Learn1.39":
            return (
              <div>
                As mentioned earlier, units can also use tactics. <br />
                <br />
                Click on your Mana Scion to open their personal menu, then click
                on the tactics button at the upper right.
              </div>
            );

          case "Learn1.40":
            return <div>Click on Advance.</div>;

          case "Learn1.41":
            return (
              <div>
                Units have 2 options available when using the Advance tactic,
                the first of which enables them to move to an adjacent zone.
                <br />
                <br />
                As the objective of the game is to maneuver a unit to the
                opposite side of the board, it is important to manage resources
                for movement.
              </div>
            );

          case "Learn1.42":
          case "Learn1.43":
          case "Learn1.44":
            return (
              <div>
                Make your Mana Scion traverse to the zone ahead of them.
                <br />
                <br />
                <strong>
                  Note: The zones of eligible destinations will be colored blue.
                </strong>
              </div>
            );

          case "Learn1.45":
            return (
              <div>
                In general, tactics are no longer available for further use once
                utilized.
                <br />
                <br />
                That said, the Mobilize tactic has a feature that allows it to
                be used multiple times.
              </div>
            );

          case "Learn1.46":
            return (
              <div>
                Unlike other tactics,{" "}
                <strong>Mobilize comes with 3 instances</strong> that can be
                used either separately or simultaneously.
                <br />
                <br />
                Click on the Mobilize Tactic below.
              </div>
            );

          case "Learn1.47":
            return (
              <div>
                As a Sovereign, you can use 2 instances of a Mobilize tactic to
                draw 1 skill. Using multiple instances simultaneously is
                permittable only via a single tactic: in the event you have 2
                Mobilize tactics, you are not allowed to draw by using 1
                instance from each.
              </div>
            );

          case "Learn1.48":
            return (
              <div>
                Press Return for now, so we can go over how units can utilize
                the Mobilize tactic.
              </div>
            );

          case "Learn1.49":
            return (
              <div>
                Click on your Mana Scion to open their personal menu, then click
                on the tactics button at the upper right. This time, click on
                Mobilize.
              </div>
            );

          case "Learn1.50":
          case "Learn1.51":
          case "Learn1.52":
            return (
              <div>
                As with Advance, Mobilize enables units to traverse. This is an
                example of the overlaps mentioned earlier.
                <br />
                <br />
                Once more, make your Mana Scion traverse to the zone ahead of
                them.
              </div>
            );

          case "Learn1.53":
            return (
              <div>
                Traversing via Mobilize uses 1 instance.{" "}
                <em>
                  However, a unit cannot use the same Mobilize tactic more than
                  once.
                </em>{" "}
                Therefore, your Mana Scion cannot traverse again using the
                remaining instances. That said, in the event you have 2 Mobilize
                tactics, it would be possible for a unit to traverse twice,
                using 1 instance from each.
              </div>
            );

          case "Learn1.54":
          case "Learn1.55":
          case "Learn1.56":
          case "Learn1.57":
          case "Learn1.58":
          case "Learn1.59":
          case "Learn1.60":
          case "Learn1.61":
          case "Learn1.62":
          case "Learn1.63":
            return (
              <div>
                Use the remaining instances to move your other units towards
                your Mana scion.
              </div>
            );

          case "Learn1.64":
            return (
              <div>
                You have depleted your tactics. Now let us go over the
                activation of skill cards.
                <br />
                <br />
                Skills are the applications of powers granted by Avelhems.{" "}
                <strong>
                  These cards offer a wider variety of effects that can
                  activated by Sovereigns, as well as units.
                </strong>
              </div>
            );

          case "Learn1.65":
            return (
              <div>
                Skill cards have 2 icons at their upper left corner: the aspect
                and method. The <strong>aspect</strong> identifies who can
                activate the skill, be it the Sovereign themself or a specific
                Scion. The <strong>method</strong> indicates the nuances of its
                activation.
              </div>
            );

          case "Learn1.65.1":
            return (
              <div>
                For example, “Chain Lightning” has the Lightning aspect. This
                icon is identical to what you’d find on a Lightning Scion unit
                token. Only a Lightning Scion can activate this skill, and its
                effect is written in their perspective.
              </div>
            );

          case "Learn1.65.2":
            return (
              <div>
                On the other hand, “Reminiscence” is a Sovereign skill. Its
                aspect is represented by a crown.
              </div>
            );

          case "Learn1.66":
            return (
              <div>
                The Crystallization skill you searched earlier has the Land
                aspect, which means it can only be activated by a Land Scion.
                <br />
                <br />
                It is also a <strong>standard skill</strong>, which displays a
                circular sapphire icon below its aspect. Standard skills are the
                simplest cards, containing only the most basic features.
              </div>
            );

          case "Learn1.67":
            return (
              <div>
                To make your Land Scion activate a skill, open their personal
                menu and then click on the skill button at the lower left.
              </div>
            );

          case "Learn1.68":
          case "Learn1.69":
            return (
              <div>
                This display will filter out any skills with aspects that do not
                match the selected unit. Click on Crystallization and activate
                it.
                <br />
                <br />
                <strong>
                  Reminder: You can click on the magnifying glass icon at the
                  top right corner of a card to view it up close.
                </strong>
              </div>
            );

          case "Learn1.70":
            return (
              <div>
                Crystallization’s effect has 2 sub-effects, the first of which
                increases the activator’s Health Points (HP) to 2. This has been
                applied, evinced by the number 2 in their heart-shaped HP icon.
                Speaking of HP, <strong>units have 1 HP by default</strong>.
                Thus, they are prone to elimination due to a single attack.
                (Attacks will be discussed next turn.)
              </div>
            );

          case "Learn1.71":
            return (
              <div>
                Crystallization’s second sub-effect is optional, as it was
                qualified by the phrase “you may”. The activator can opt to
                spend a skill to gain <strong>Shield</strong>, which is an
                enhancement (positive status) that protects them from the next
                attack they would receive.
              </div>
            );

          case "Learn1.72":
          case "Learn1.73":
            return <div>Spend “Sow and Reap”.</div>;

          case "Learn1.74":
            return (
              <div>
                Another thing you can do in the Execution Phase is activate a
                unit’s ability, which will be demonstrated next turn. But before
                moving on, let us go over another feature.
                <br />
                <br />
                Click on your Land Scion to open their personal menu, then click
                on the information button at the top left.
              </div>
            );

          case "Learn1.75":
            return (
              <div>
                This screen will display the details pertaining to the selected
                unit, including their innate talents (passive effects) and
                abilities (active effects).
                <br />
                <br />
                (Abilities will be demonstrated next turn.)
              </div>
            );

          case "Learn1.76":
            return (
              <div>
                You can also find their status conditions with accompanying
                definitions and durations.
                <br />
                <br />
                Speaking of statuses, visual indicators will be present on the
                affected units; for example, For example, notice the silver
                shield icon on your Land Scion.
              </div>
            );

          case "Learn1.76.1":
            return <div>Close it to proceed.</div>;

          case "Learn1.77":
            return (
              <div>
                As long as there are no ongoing activated effects, you can
                conclude your Execution Phase by pressing the End Turn button by
                the top left corner of the board.
              </div>
            );

          case "Learn1.78":
            return (
              <div>
                Doing so would trigger the procedures of the{" "}
                <strong>Final Phase</strong>.
              </div>
            );

          case "Learn1.79":
            return (
              <div>
                During the Final Phase, all unused Avelhems are discarded.{" "}
                <br />
                <br />
                If the Initiator’s hand has more than 8 skills, they must
                selectively discard the excess.
                <br />
                <br />
                Unused tactics are also forfeited.
              </div>
            );

          case "Learn1.79.1":
            return (
              <div>
                Furthermore, the status durations of the Initiator’s units
                decrease by 1 (unless the duration is indefinite). At the
                present circumstances, only this step is applicable: the
                duration of your Land Scion’s Shield will decrement from 2 turns
                to 1.
              </div>
            );

          case "Learn1.79.1.1":
            return (
              <div>
                Lastly, once the previous steps are done, the game will apply
                scoring. Units score when the occupy the enemy’s base (the
                furthest row on their side of the board) at the very end of the
                Final Phase. Units that have scored remain on the board, but
                they cannot be interacted with nor score again.
              </div>
            );

          case "Learn1.79.2":
            return (
              <div>
                Let’s quickly go over the 6 phases before ending the turn. It
                may help to notice that the names of each phase start with the
                letters A to F.
              </div>
            );

          case "Learn1.79.3":
            return (
              <div>
                The Acquisition Phase allows the Initiator to bolster their
                resources by deploying a pawn or drawing a card from either
                their Avelhem or skill repertoire.
              </div>
            );

          case "Learn1.79.4":
            return (
              <div>
                The Bounty Phase allows the Initiator to spend BP on permanent
                upgrades that can bring them closer to victory.
              </div>
            );

          case "Learn1.79.5":
            return (
              <div>
                The Coordination Phase provides the Initiator the tactics for
                the turn.
              </div>
            );

          case "Learn1.79.6":
            return (
              <div>
                The Defiance Phase allows the Initiator to spend FD on immediate
                short-term benefits.
              </div>
            );

          case "Learn1.79.7":
            return (
              <div>
                The Execution Phase is where the Initiator and their units can
                activate cards they’ve accumulated and perform actions using the
                tactics obtained during the previous phases. This is also where
                units can activate their abilities.
              </div>
            );

          case "Learn1.79.8":
            return (
              <div>
                Lastly, the Final Phase wraps up the turn. The Initiator
                discards excess cards, forfeits unused tactics, and ticks down
                the statuses affecting their units.
                <br />
                <br />
                If the game does not conclude due to the Initiator’s victory,
                their opponent takes the following turn.
              </div>
            );

          case "Learn1.80":
            return <div>Click on End Turn.</div>;

          case "Learn1.81":
            return (
              <div>
                The board has turned from red to black.{" "}
                <strong>
                  When the board is red, the game is waiting for your input to
                  proceed
                </strong>
                . This is usually the case when it is your turn, but there are
                occasions when Sovereigns are prompted during their opponent’s
                turn. Conversely,{" "}
                <strong>black corresponds to your opponent.</strong>
              </div>
            );

          case "Learn1.82":
            return (
              <div>
                Click on the Switch Player button by the bottom left corner of
                the board to change to the perspective of the Silver Sovereign.
              </div>
            );

          case "Learn1.83":
          case "Learn1.84":
            return (
              <div>
                The Silver Sovereign is now the Initiator. Likewise, they begin
                with the Acquisition Phase. <br />
                <br /> Select Beseech.
              </div>
            );

          case "Learn1.85":
            return <div>Proceed through the Bounty Phase.</div>;

          case "Learn1.86":
          case "Learn1.87":
          case "Learn1.88":
            return <div>Assent to roll.</div>;

          case "Learn1.89":
          case "Learn1.90":
            return (
              <div>
                You can reroll undesirable tactics via Backtack and Curate. The
                latter costs an additional FD, but it provides better odds. Give
                it a try.
              </div>
            );

          case "Learn1.91":
          case "Learn1.92":
          case "Learn1.93":
            return (
              <div>
                Invoke and Assault each have a 1 of 6 chance to appear on a die
                roll. As we have already discussed Advance, disregard it for
                this turn.
              </div>
            );

          case "Learn1.94":
          case "Learn1.95":
          case "Learn1.96":
          case "Learn1.97":
            return (
              <div>
                Use your Metal Avelhem to ascend your center pawn to a Metal
                Scion.
              </div>
            );

          case "Learn1.98":
            return (
              <div>
                <strong>Conduction</strong>, the debut talent (passive effect)
                of Metal Scions, allows them to search for then float “Magnetic
                Shockwave”, which is the standard skill of their class. This is
                similar to the Mountain Stance talent of Land Scions, but there
                are some differences. First, Conduction is not modular; it has
                no alternate effect.
              </div>
            );

          case "Learn1.99":
            return (
              <div>
                Second, Conduction can search without the need to spend a skill.
                <br />
                <br />
                Lastly, it will float the searched skill rather than add it to
                the hand.
              </div>
            );

          case "Learn1.100":
            return (
              <div>
                <strong>
                  Floating a card places it on top of its repertoire
                </strong>{" "}
                and rotates it by 90 degrees. When a repertoire is shuffled, its
                floating cards retain their positions. (It is impossible to have
                a non-floating card above a floating one).
              </div>
            );

          case "Learn1.101":
          case "Learn1.102":
          case "Learn1.103":
            return (
              <div>Activate Conduction and search for Magnetic Shockwave.</div>
            );

          case "Learn1.103.1":
            return (
              <div>
                As you can see, the topmost card of your skill repertoire is
                rotated. The card count also indicates the number of floating
                skills inside a parenthesis.
              </div>
            );

          case "Learn1.104":
            return (
              <div>
                Now let us go over the second skill method.
                <br /> <br />
                <strong>Resonant skills</strong> have a bichromatic alexandrite
                icon. These skills possess a <strong>resonance</strong>, which
                is an additional effect that applies only when the skill is
                resonated.
              </div>
            );

          case "Learn1.105":
            return (
              <div>
                Activating a resonant skill without resonating it would apply
                only its primary sub-effects.
                <br /> <br />
                To resonate a skill, activate it with a resonator, which can be
                either an identical copy or a card that functions as a valid
                substitute.
              </div>
            );

          case "Learn1.106":
          case "Learn1.107":
          case "Learn1.108":
          case "Learn1.109":
            return (
              <div>
                Make your Metal Scion resonate their “Reinforce” skill.
                <br />
                <br />
                <strong>
                  Reminder: You can click on the magnifying glass icon at the
                  top right corner of a card to view it up close. Use this
                  opportunity to view its icons and read its effect text.
                </strong>
              </div>
            );

          case "Learn1.109.1":
          case "Learn1.110":
          case "Learn1.111":
          case "Learn1.112":
            return (
              <div>
                Reinforce has a modular primary effect; choose to spend 1 skill
                (Transcendence) to gain 1 HP.
              </div>
            );

          case "Learn1.113":
            return (
              <div>
                Because Reinforce was resonated, its resonance was also applied:
                your Metal Scion has gained 1 Sharpness (indicated by the purple
                diamond hovering above its class icon).
                <br /> <br />
                <strong>
                  Sharpness is an attribute exclusive to Metal Scions
                </strong>
                ; its quantity affects their talents and skills.
              </div>
            );

          case "Learn1.114":
            return (
              <div>
                Furthermore, you retained the Reinforce you activated by
                returning it to your hand instead of discarding it. That said,
                you still discarded the other Reinforce that was used as the
                resonator.
              </div>
            );

          case "Learn1.115":
            return (
              <div>
                Let’s revisit tactics. Click on the Invoke tactic below.
              </div>
            );

          case "Learn1.116":
            return (
              <div>
                As a Sovereign, you have these 3 options when utilizing an
                Invoke tactic. But for now, press Return.
              </div>
            );

          case "Learn1.117":
            return (
              <div>
                On that note, you can consult the Tactics Guide by pressing the{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="question-icon3"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                </svg>{" "}
                icon at the top right corner of the tactics display. This will
                list the set of actions they provided.
              </div>
            );

          case "Learn1.118":
            return <div>Close it to proceed.</div>;

          case "Learn1.119":
            return (
              <div>
                The Invoke tactic does not provide units with any actions. That
                said, some Scions can still utilize it.
                <br /> <br />
                For example, Metal Scions possess an ability that can be
                activated via Invoke.
              </div>
            );

          case "Learn1.120":
            return (
              <div>
                Speaking of which, let us go over abilities.
                <br /> <br />
                Click on your Metal Scion to open their personal menu, then
                click on the ability button at the bottom right.
              </div>
            );

          case "Learn1.121":
            return (
              <div>
                <strong>Abilities</strong> are class-exclusive effects that can
                be activated during one’s Execution Phase. They are akin to
                skills, but they are more accessible as they can be activated
                without the possession of specific cards.
              </div>
            );

          case "Learn1.122":
          case "Learn1.123":
          case "Learn1.123.1":
            return (
              <div>
                Some abilities, such as Metal Scion’s Brandish, require specific
                tactics. In such cases, the requirement is displayed under its
                name. Those with the "One-shot" property are limited to 1
                activation per turn.
                <br /> <br />
                Activate Brandish.
              </div>
            );

          case "Learn1.124":
          case "Learn1.125":
            return (
              <div>
                Search for “Frenzy Blade”.
                <br /> <br />
                The repertoire is shuffled every search. But as previously
                mentioned, floating cards will retain their positions.
              </div>
            );

          case "Learn1.126":
          case "Learn1.127":
            return (
              <div>
                The second sub-effect of Brandish is modular; choose to draw 1
                skill, which is guaranteed to be the floating Magnetic
                Shockwave.
              </div>
            );

          case "Learn1.128":
          case "Learn1.129":
            return (
              <div>
                Sovereigns cannot use the Assault tactic to perform any actions,
                so let’s demonstrate it with units.
                <br /> <br />
                Click on your Metal Scion to open their personal menu, then
                click on the tactics button at the upper right. This time, click
                on Assault.
              </div>
            );

          case "Learn1.130":
            return (
              <div>
                Assault, like Advance and Mobilize, can be used to traverse. And
                it provides the exclusive option to strike.
                <br /> <br />
                When a unit strikes, it attacks an adjacent enemy. If their
                attack eliminates the enemy, they must move to the zone the
                latter was occupying.
              </div>
            );

          case "Learn1.131":
            return (
              <div>
                When a unit suffers an attack, they lose HP equal to its Attack
                Power (AP). By default, attacks have 1 AP; thus, units tend to
                be eliminated by a single attack.
                <br /> <br />
                On that note, the “Penetrator” talent of Metal Scions increases
                the AP of their attacks for every Sharpness they possess.
              </div>
            );

          case "Learn1.132":
          case "Learn1.133":
          case "Learn1.134":
            return <div>Strike the enemy Mana Scion.</div>;

          case "Learn1.135":
            return (
              <div>
                Although it’s the Silver Sovereign’s turn, the board has turned
                black, which means the Gold Sovereign is being prompted to make
                a decision. <br /> <br />
                Switch to their perspective.
              </div>
            );

          case "Learn1.136":
            return (
              <div>
                By striking Gold’s Mana Scion, Silver’s Metal Scion has targeted
                the latter.{" "}
                <strong>
                  Targeting occurs when an enemy unit is designated as the
                  recipient of an attack or status affliction
                </strong>
                . And it so happens that Mana Scions have a skill that can be
                activated in response.
              </div>
            );

          case "Learn1.137":
            return (
              <div>
                <strong>Contingent skills</strong> can be identified by their
                triangular ruby icons.
                <br />
                <br />
                Exclusive to contingent skills is the{" "}
                <strong>contingency</strong> property, which specifies
                conditions for its activation.
              </div>
            );

          case "Learn1.138":
            return (
              <div>
                Unlike other skills, contingent skills can be activated during
                any phase of either Sovereign’s turn, but only if the
                contingency is satisfied.
              </div>
            );

          case "Learn1.139":
          case "Learn1.140":
          case "Learn1.141":
            return (
              <div>
                “Aegis”, the contingent skill of Mana Scions, can be activated
                when they or an adjacent ally is targeted. Try activating it.
                <br />
                <br />
                <strong>
                  Reminder: You can click on the magnifying glass icon at the
                  top right corner of a card to view it up close. Use this
                  opportunity to view its icons and read its effect text.
                </strong>
              </div>
            );

          case "Learn1.142":
            return (
              <div>
                Aegis has 2 sub-effects, the first of which draws a skill if the
                activator is the targeted unit. (This has been automatically
                applied: you have drawn “Tea For Two”.)
                <br /> <br />
                The second is modular, offering the choice to provide Shield or
                Ward at the cost of 1 skill.
              </div>
            );

          case "Learn1.143":
          case "Learn1.144":
            return (
              <div>
                <strong>Ward</strong> is another enhancement, functioning as an
                improved version of Shield. It can negate the next attack{" "}
                <strong>or affliction</strong> (negative status) that the unit
                would receive from an enemy.
                <br /> <br />
                In this situation, Shield suffices for protection and is more
                economical.
              </div>
            );

          case "Learn1.145":
            return (
              <div>
                The Mana Scion enhanced themself with Shield, which was
                immediately removed by the Metal Scion’s attack.
                <br /> <br />
                The board is black again, so return to the Silver Sovereign’s
                perspective.
              </div>
            );

          case "Learn1.146":
          case "Learn1.147":
          case "Learn1.148":
            return (
              <div>
                Unfortunately for the Mana Scion, the Metal Scion also has a
                contingent skill fit for the situation: Frenzy Blade can be
                activated when an adjacent enemy survives an attack.
                <br /> <br />
                Activate it.
              </div>
            );

          case "Learn1.149":
          case "Learn1.150":
            return (
              <div>
                The first sub-effect of Frenzy Blade granted your Metal Scion
                another Sharpness, evinced by the second purple diamond.
                <br /> <br />
                The second sub-effect offers the option to draw 1 skill or spend
                1 skill to gain Shield. Choose the latter.
              </div>
            );

          case "Learn1.151":
          case "Learn1.152":
            return <div>Spend Transcendence.</div>;

          case "Learn1.153":
          case "Learn1.154":
            return (
              <div>
                Lastly, Frenzy Blade forces the activator to attack the
                surviving enemy, either via strike or blast. Unlike strike,{" "}
                <strong>
                  blast does not make the unit move when dealing lethal damage.
                </strong>
                <br /> <br />
                Choose to strike.
              </div>
            );

          case "Learn1.155":
            return (
              <div>
                The board is black again; switch to the other perspective.
              </div>
            );

          case "Learn1.156":
            return (
              <div>
                The Gold Sovereign does not possess another copy of Aegis nor
                any other contingent skill that could be activated in response.
                However, for the sake of bluffing, they still received this
                prompt.
                <br /> <br />
                Press skip.
              </div>
            );

          case "Learn1.157":
            return (
              <div>
                The Metal Scion’s attack proceeds and connects, eliminating the
                Mana Scion.
                <br /> <br />
                But before the Metal Scion moves as per their strike,{" "}
                <strong>Ambiance Assimilation</strong>, the Mana Scion’s
                elimination talent, activates.
              </div>
            );

          case "Learn1.158":
          case "Learn1.159":
          case "Learn1.160":
            return (
              <div>
                When they are eliminated, Mana Scions can search for a non-burst
                Mana skill and add it to their hand. (Burst is the fourth and
                final skill method, which will be discussed later.)
                <br /> <br />
                Search for another copy of Aegis.
              </div>
            );

          case "Learn1.161":
            return (
              <div>
                Only 1 contingent skill can be activated in response to a
                triggering event. If both Sovereigns possess eligible contingent
                skills, the Initiator yields priority to their opponent.
              </div>
            );

          case "Learn1.162":
            return (
              <div>
                When an event triggers both a talent and a contingent skill, the
                talent activates first. The activation of a talent does not
                hinder the activation of a contingent skill.
              </div>
            );

          case "Learn1.163":
          case "Learn1.164":
          case "Learn1.164.1":
            return (
              <div>
                For example, now that Ambiance Assimilation has concluded, you
                can activate “Vengeful Legacy”, a contingent Sovereign skill
                that is triggered when an ally Scion is eliminated. It allows
                you to ascend an ally pawn within 2 spaces from the eliminated
                Scion to the same class.
              </div>
            );

          case "Learn1.165":
          case "Learn1.166":
            return (
              <div>
                Vengeful Legacy’s second sub-effect gives you the option to
                float a skill from your hand to grant the newly ascended Scion
                the <strong>Ravager</strong> enhancement, which will be
                discussed a bit later.
                <br />
                <br />
                For now, float “Tea For Two.”
              </div>
            );

          case "Learn1.167":
            return (
              <div>
                Tea For Two has been floated, evinced by the rotated card.
                <br />
                <br />
                Ravager is visually represented by a rising red aura. Unlike
                Shield and Ward, it has a permanent duration.
                <br />
                <br />
                Return to the Silver Sovereign’s perspective.
              </div>
            );

          case "Learn1.168":
            return (
              <div>
                Now that the chain of effects has concluded, the Metal Scion
                finally moves into the zone occupied by the eliminated Mana
                Scion.
                <br />
                <br />
                Frenzy Blade is then discarded as per its conclusion.
              </div>
            );

          case "Learn1.168.1":
            return (
              <div>
                As mentioned earlier, BP is awarded when an enemy is eliminated.
                The Silver Sovereign now has 1 BP. As consolation, the Gold
                Sovereign received 2 FD.
                <br />
                <br />
                BP and FD are capped at 10 and 6, respectively. Any excesses
                gained are forfeit.
              </div>
            );

          case "Learn1.169":
            return (
              <div>
                It is important to note that when a Scion (not pawn) eliminates
                another unit, they are afflicted with <strong>Anathema</strong>{" "}
                for 2 turns. Anathema is an affliction (negative status) that
                mutes units.{" "}
                <strong>Muted units are only allowed to traverse</strong>; they
                cannot attack nor activate skills, abilities, and talents.
              </div>
            );

          case "Learn1.169.1":
            return (
              <div>
                Anathema takes effect once the unit has finished performing all
                effects they have activated.
                <br />
                <br />
                In this case, the Metal Scion received Anathema after Frenzy
                Blade concluded rather than immediately after eliminating the
                Mana Scion.
              </div>
            );

          case "Learn1.170":
            return (
              <div>
                <strong>
                  <em>
                    “To wield an Avelhem is to become a steward of creation. And
                    what greater sin is there than slaying the Maker’s beloved?”
                  </em>
                </strong>
                <br />
                <br />
                It is believed that Anathema is penance for using one’s Avelhem
                to vanquish a fellow human...
              </div>
            );

          case "Learn1.170.1":
            return (
              <div>
                But that notion is challenged by another phenomenon:{" "}
                <strong>
                  those enhanced with the Ravager status are immune to the
                  backlash of Anathema.
                </strong>
              </div>
            );

          case "Learn1.171":
            return (
              <div>
                You still have an unused Plant Avelhem, but for the sake of the
                demonstration, do not activate it. As mentioned earlier, unused
                Avelhems are discarded during the Final Phase. Repertoires have
                only 20 Avelhems, but fret not.{" "}
                <strong>
                  Whenever a repertoire is depleted, its vestige is shuffled to
                  form a new one.
                </strong>
              </div>
            );

          case "Learn1.172":
          case "Learn1.173":
          case "Learn1.173.1":
            return <div>Click on End Turn, then switch perspective.</div>;

          case "Learn1.174":
          case "Learn1.175":
            return (
              <div>
                Cultivate to draw 1 skill, which is guaranteed to be the Tea For
                Two that you floated when you activated Vengeful Legacy.
              </div>
            );

          case "Learn1.176":
          case "Learn1.177":
          case "Learn1.178":
          case "Learn1.179":
          case "Learn1.180":
            return (
              <div>
                For the sake of the demonstration, you have been given 10 BP.
                Expand your frontier twice.
                <br />
                <br />
                Unlike the Defiance Phase, the Bounty Phase allows multiple
                purchases, provided that BP is sufficient.
              </div>
            );

          case "Learn1.181":
          case "Learn1.182":
          case "Learn1.183":
            return <div>Assent to roll</div>;

          case "Learn1.184":
          case "Learn1.185":
          case "Learn1.186":
          case "Learn1.187":
            return (
              <div>
                Spend 3 FD on Ex Machina, which allows you to search for any
                Sovereign skill. Search for “Press The Attack”.
              </div>
            );

          case "Learn1.188":
          case "Learn1.189":
            return (
              <div>
                Activate the skill you just searched for. Like Avelhems,
                Sovereign skills are activated directly from your hand. Click on
                any skill to raise your hand, then click on the specific card to
                be activated.
              </div>
            );

          case "Learn1.190":
            return (
              <div>
                A crown icon represents the aspect of Sovereign skills.
                <br />
                <br />
                Press The Attack is a Sovereign skill that converts 2 Advance
                tactics into 2 Assaults. This effect is mandatory; thus, you
                must have 2 unused Advance tactics to activate it.
              </div>
            );

          case "Learn1.191":
            return (
              <div>
                Press The Attack is also resonant skill. Although you do not
                have another copy of it, you can still resonate it using a valid
                substitute.
              </div>
            );

          case "Learn1.192":
          case "Learn1.193":
            return (
              <div>
                Tea For Two is a standard Sovereign skill with a{" "}
                <strong>substitute</strong> property that allows it to serve as
                a resonator for any Avelhem or resonant skill. If used as a
                resonator, it will not apply its primary effect.
                <br />
                <br />
                (Reminder: You can click on the magnifying glass icon to view
                the card.)
              </div>
            );

          case "Learn1.194":
            return (
              <div>
                Press The Attack has converted your tactics.
                <br />
                <br />
                As per its second sub-effect, draw 2 Avelhems.
              </div>
            );

          case "Learn1.195":
          case "Learn1.196":
            return (
              <div>
                As per the third sub-effect of Press The Attack, deploy a pawn.
                Place them between your Scions.
              </div>
            );

          case "Learn1.197":
            return (
              <div>
                You have resolved the primary effect of Press The Attack.
                Because it was resonated, the sub-effects of its resonance will
                proceed.
              </div>
            );

          case "Learn1.198":
          case "Learn1.199":
            return (
              <div>
                The resonance’s first sub-effect allows you to search for any
                Scion skill that allows the activator to strike or blast.
                <br />
                <br />
                Search for Surge, the standard skill of Mana Scions.
              </div>
            );

          case "Learn1.200":
            return (
              <div>
                To prove the legitimacy of the search, the skill in its entirety
                is revealed the opponent. In most situations, the digital
                simulator skips the revelation of searches (especially if it is
                restricted to 1 particular skill), since it assumes the rules
                are enforced.
              </div>
            );

          case "Learn1.201":
            return (
              <div>
                Some searches are restricted to an aspect (such as Ambiance
                Assimilation being limited to Mana Skills), but this does not
                require a full revelation either. The legitimacy of the search
                can be proven by displaying the aspect icon at the corner of the
                card, concealing the rest of the information. For the same
                reason, the simulator skips this.
                <br />
                <br />
              </div>
            );

          case "Learn1.202":
            return (
              <div>
                Without further ado, switch perspective to see how a revelation
                appears from the other end.
                <br />
                <br />
              </div>
            );

          case "Learn1.203":
          case "Learn1.204":
            return <div>Press Proceed and switch back.</div>;

          case "Learn1.205":
            return (
              <div>
                The last sub-effect of a skill’s resonance either retains (such
                as in the case of Metal Scions’ Reinforce) or gives the option
                to float it. Resonating Press The Attack would normally retain
                it; however, as per Tea For Two’s substitute property, the
                retention was negated. Instead, you drew a skill.
              </div>
            );

          case "Learn1.206":
          case "Learn1.207":
          case "Learn1.208":
          case "Learn1.209":
          case "Learn1.210":
          case "Learn1.211":
            return (
              <div>
                The skill you drew is “Glacial Torrent”, the burst skill of
                Water Scions. Speaking of which, ascend your central pawn into a
                Water Scion. Like resonant skills, Avelhems can also be
                resonated.
              </div>
            );

          case "Learn1.212":
            return (
              <div>
                The debut talent of Water Scions allows them to either restore a
                friendly unit’s Aether or remove that of an enemy.
                <br />
                <br />
                (When units are deployed, they are automatically granted Aether,
                the applications of which will be discussed later.)
              </div>
            );

          case "Learn1.213":
          case "Learn1.214":
          case "Learn1.215":
            return (
              <div>
                Since all your units still possess their Aethers, purge the
                Aether of the enemy Metal Scion.
              </div>
            );

          case "Learn1.216":
            return (
              <div>
                The visual indicator of a unit’s Aether is found at their bottom
                center (beside the heart-shaped HP icon). As the Metal Scion no
                longer possesses their Aether, their icon is absent.
              </div>
            );

          case "Learn1.216.1":
            return (
              <div>
                All Avelhems have the same resonance: they grant the Scion the
                Ravager enhancement, then they give the Sovereign the option to
                shuffle the card back into their repertoire instead of
                discarding it (regardless, the resonator is still discarded).
                Opt to discard it.
              </div>
            );

          case "Learn1.216.2":
            return (
              <div>
                Like your Mana Scion, your Water Scion is enhanced with the
                Ravager status. This is represented by the rising red aura.
                Units enhanced with Ravager are immune to Anathema.
                <br />
                <br />
                (Reminder: Scions are afflicted with 2 turns of Anathema when
                they eliminate an enemy.)
              </div>
            );

          case "Learn1.217":
          case "Learn1.218":
          case "Learn1.219":
            return (
              <div>
                Click on your Water Scion and make them activate their burst
                skill.
              </div>
            );

          case "Learn1.220":
            return (
              <div>
                Displaying a hexagonal amethyst icon,{" "}
                <strong>burst skills</strong> unleash powerful effects.{" "}
                <strong>
                  Their activation is as simple as standard skills. However,
                  burst skills are shattered (removed from play) rather than
                  discarded upon the conclusion of their effects.
                </strong>
              </div>
            );

          case "Learn1.221":
            return (
              <div>
                The first sub-effect of Glacial Torrent grants the activator
                Ward (represented by the golden shield icon) for 3 turns and a
                boost that allows them to activate their next 2 abilities
                without using a tactic (each usage is indicated by a blue
                diamond).
              </div>
            );

          case "Learn1.222":
            return (
              <div>
                <strong>Boosts</strong> are temporary benefits that expire upon
                use or at the end of the turn; they are akin to enhancements,
                albeit more fleeting. If a unit is muted, any boosts they
                possess or would obtain are removed.
              </div>
            );

          case "Learn1.223":
            return (
              <div>
                The second sub-effect allows you to inspect 5 skills from your
                repertoire and add up to 3 Water skills among them to your hand.{" "}
                <strong>
                  Inspections function similar to searches, but they are limited
                  to a specified number of cards, starting from the top of the
                  repertoire.
                </strong>
              </div>
            );

          case "Learn1.224":
            return (
              <div>
                When an inspection ends, cards are returned in their original
                sequence; the repertoire is not shuffled (unless stated
                otherwise).
              </div>
            );

          case "Learn1.225":
          case "Learn1.226":
          case "Learn1.227":
            return <div>Add the 2 Water skills to your hand.</div>;

          case "Learn1.228":
            return (
              <div>
                As mentioned earlier, burst skills are shattered rather than
                discarded upon the conclusion of their effects. Nonetheless,
                they can still be discarded via other means, such as being
                spent. Shattered skills are excluded from effects that could
                recover a card from the vestige, so burst skills are essentially
                usable once.
              </div>
            );

          case "Learn1.229":
            return (
              <div>
                Burst skills are limited to a single copy in the repertoire,
                making them all the more valuable. (Avelhems and non-burst Scion
                skills are allowed up to 4 copies, while Sovereign skills are
                allowed up to 2.)
              </div>
            );

          case "Learn1.229.1":
            return (
              <div>
                As you may recall, cards in the vestige can be viewed by their
                owners at any time. Shattered skills, on the other hand, can
                been viewed by anyone. Technically, shattered skills are not
                placed in the vestige. However, for the sake of convenience, you
                can find your (or your opponent’s) shattered skills by viewing
                it.
              </div>
            );

          case "Learn1.229.2":
            return (
              <div>
                Shattered skills are displayed below and separately from cards
                that are in the vestige. Close the display to proceed.
              </div>
            );

          case "Learn1.230":
          case "Learn1.231":
          case "Learn1.232":
            return (
              <div>
                Before you put the Water Scion’s boost into action, activate
                their “Frigid Breath” skill.
              </div>
            );

          case "Learn1.233":
            return (
              <div>
                Frigid Breath allows the activator to freeze an enemy (inflict
                them with the Frostbite affliction). <strong>Frostbite</strong>{" "}
                mutes a unit and renders them immobile, preventing them from
                even traversing.
                <br />
                <br />
                Freeze the Metal Scion.
              </div>
            );

          case "Learn1.234":
            return (
              <div>
                Frigid Breath can freeze another unit (or even the same one) at
                the cost of floating a skill, but that will not necessary. Press
                Skip.
              </div>
            );

          case "Learn1.235":
            return (
              <div>
                Put the Water Scion’s boost to use. Click on them and view their
                abilities.
              </div>
            );

          case "Learn1.236":
          case "Learn1.237":
            return (
              <div>
                Water Scions have 2 abilities, both of which require tactics.
                But as per the boost obtained from Glacial Torrent, the next 2
                abilities they activate will not use them.
                <br />
                <br />
                Activate Cold Embrace.
              </div>
            );

          case "Learn1.238":
          case "Learn1.239":
          case "Learn1.240":
            return (
              <div>
                Cold Embrace allows Water Scions to strike a frostbitten enemy
                or freeze one. Strike the frostbitten Metal Scion
              </div>
            );

          case "Learn1.241":
            return (
              <div>
                Water Scions have a talent that allows them to bypass Shield
                when attacking frostbitten enemies. Therefore, even though the
                Metal Scion had shield, their HP was still reduced.
              </div>
            );

          case "Learn1.242":
          case "Learn1.243":
          case "Learn1.244":
          case "Learn1.245":
          case "Learn1.246":
          case "Learn1.247":
            return (
              <div>
                Activate Cold Embrace once more to finish off the Metal Scion!
              </div>
            );

          case "Learn1.248":
            return (
              <div>
                Due to the Metal Scion’s elimination, the Gold Sovereign gains 1
                BP, while the Silver Sovereign gains 2 FD.
                <br />
                <br />
                Because the Water Scion is enhanced with Ravager, they are not
                punished with Anethema.
              </div>
            );

          case "Learn1.249":
            return (
              <div>
                As per strike, the Water Scion moves into the zone of their
                victim.
              </div>
            );

          case "Learn1.250":
          case "Learn1.251":
          case "Learn1.252":
          case "Learn1.253":
          case "Learn1.254":
            return (
              <div>
                Up next is an explanation of Aethers.{" "}
                <strong>
                  For the sake of the demo, your tactics have been rerolled.
                </strong>
                <br />
                <br />
                Make your Water Scion traverse to beside the enemy pawn via
                Mobilize.
              </div>
            );

          case "Learn1.255":
            return (
              <div>
                As mentioned earlier, units inherently possess an Aether.
                <br />
                <br />
                <strong>
                  Aethers are primarily used to perform and mitigate
                  Aether-blasts.
                </strong>{" "}
                Scions (not pawns) can perform an Aether-blast via the Advance
                tactic.
              </div>
            );

          case "Learn1.256":
            return (
              <div>
                When a unit performs a <strong>Aether-blast</strong>, they
                expend their Aether to blast an enemy. When the attack connects,
                the victim is given the option to mitigate it.
              </div>
            );

          case "Learn1.257":
            return (
              <div>
                <strong>Mitigating an Aether-blast reduces its AP by 1.</strong>
                <br />
                <br />
                When a unit mitigates an Aether-blast, they spend their Aether
                and transfer it to the attacker. (Muted units cannot spend their
                Aethers; thus, they are most vulnerable to Aether-blasts.)
              </div>
            );

          case "Learn1.258":
          case "Learn1.259":
          case "Learn1.260":
          case "Learn1.261":
          case "Learn1.262":
            return (
              <div>
                Let’s see it in action. Make your Water Scion Aether-blast the
                enemy pawn.
              </div>
            );

          case "Learn1.263":
            return (
              <div>
                The pawn no longer possesses their Aether; thus, they are prone
                to the next Aether-blast.
                <br />
                <br />
                Switch player.
              </div>
            );

          case "Learn1.264":
            return <div>Opt to reduce the AP.</div>;

          case "Learn1.265":
            return (
              <div>
                Attacks have 1 AP by default; thus, the damage dealt by the
                Aether-blast was reduced to 0. <br />
                <br />
                Due to the mitigation, the Water Scion regained the Aether they
                spent on their attack.
              </div>
            );

          case "Learn1.266":
            return <div>Switch player.</div>;

          case "Learn1.267":
            return (
              <div>
                At that covers most basics of the game. All that is left is
                scoring and winning.
              </div>
            );

          case "Learn1.268":
            return (
              <div>
                <strong>
                  To score, a Sovereign must maneuver units to their opponent’s
                  base
                </strong>{" "}
                (the furthest row on their side of the board). The score needed
                to win is a predetermined number from 1 to 5. In this simulator,
                the score objective is set to 1; whenever it is achieved, the
                Sovereigns may opt to continue the game by raising it.
              </div>
            );

          case "Learn1.269":
          case "Learn1.270":
          case "Learn1.271":
          case "Learn1.272":
          case "Learn1.273":
            return (
              <div>
                For the sake of this demo, a pawn has been deployed a space away
                from the enemy base. <br />
                <br />
                Make them move via Mobilize.
              </div>
            );

          case "Learn1.274":
            return (
              <div>
                Moving into the opponent’s base is not enough to score; the unit
                must survive there by the end of the Final Phase. <br />
                <br />
                Click on End Turn.
              </div>
            );

          case "Learn1.275":
            return (
              <div>
                And that concludes the interactive portion of the tutorial.
                <br />
                <br />
                It is worth noting that should the game proceed after a unit
                scores, the Sovereign of the scoring unit gains 2 BP, while
                their opponent gains 6 FD.
              </div>
            );

          case "Learn1.276":
            return (
              <div>
                Units that have scored stay on the board, but they cannot be
                interacted with. Furthermore, they continue counting towards
                their Sovereign’s unit limits. (Sovereigns can have up to 8
                units on the board, and no more than 2 ally Scions can share a
                class.)
              </div>
            );

          case "Learn1.277":
            return (
              <div>
                Lastly, there are some nuances in the rules that were not
                discussed in this demo but still automatically applied by the
                simulator. Nonetheless, they can be found in the rules
                documentation.
              </div>
            );

          case "Learn1.278":
            return (
              <div>
                The game is initially a race to score 1 point. Once this has
                been achieved, Sovereigns can agree to continue the game by
                raising the objective, up to a maximum of 5.
                <br />
                <br />
                Demo over.
              </div>
            );

          ////////////////////
        }
        break;
    }
  };

  return { getDemoGameState, getDemoInstructions };
};
