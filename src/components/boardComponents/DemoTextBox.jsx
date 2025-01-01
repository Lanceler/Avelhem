import React from "react";
import "./DemoTextBox.css";
import { useSelector, useDispatch } from "react-redux";
import { updateDemoCount } from "../../redux/demoCount";

const DemoTextBox = () => {
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const boxAreaStyle = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          //middle, slightly raised
          case 1:
          case 2:
          case 39:
            return {
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 650,
            };

          //bottom left
          case 5:
          case 6:
            return {
              top: "75%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              width: 600,
            };

          //bottom right
          case 41:
          case 42:
            return {
              top: "75%",
              left: "70%",
              transform: "translate(-50%, -50%)",
              width: 600,
            };

          //middle right
          case 9:
          case 10:
          case 17:
            return {
              top: "50%",
            };

          //center of board; small
          case 12:
          case 40:
            return {
              top: "50%",
              left: "30%",
              width: 350,
              height: 150,
            };

          //middle right; slightly small
          case 13:
            return {
              top: "52%",
              left: "71.0%",
              width: 550,
              height: 200,
            };

          //lower right; small
          case 18:
            return {
              top: "75%",
              left: "75%",
              width: 400,
              height: 160,
            };

          default:
            return {
              top: "15%",
              left: "75%",
              transform: "translate(-50%, -50%)",
              width: 700,
            };
        }
    }
  };

  const excludedshowNext = new Set([
    7, 15, 16, 21, 22, 23, 24, 25, 28, 29, 30, 32, 37, 38, 39, 42, 44, 45,
  ]);

  const showNext = () => {
    if (demoGuide === "Learn-overview") {
      return !excludedshowNext.has(demoCount);
    }
    return true;
  };

  const getDemoInstructions = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 1:
            return (
              <div>
                <strong>Avelhem: War of the Sovereigns</strong> is a competitive
                two-player board game. This tutorial will cover its basic
                mechanics and familiarize you with its digital user interface.
                <br /> <br />
                To proceed through the tutorial, click on the object embedded in
                a green glow.
              </div>
            );

          case 2:
            return (
              <div>
                <strong>Overview:</strong> Humanity has inherited the Maker’s
                dominion and authority over creation, the power known as
                Avelhem.
                <br /> <br />
                Players assume the roles of Sovereigns, ordained monarchs whose
                Avelhems compel humankind itself. Impelled by grand ambitions,
                the Sovereigns embark on conquest, hellbent on enthroning their
                bloodline as the one and only.
              </div>
            );

          case 3:
            return (
              <div>
                The game unfolds on a board with 10 rows and 5 columns.
                Sovereigns position at opposite sides and designate the rows
                closest to them as their respective bases.
                <br /> <br />
                To win, one must maneuver their units into the opponent’s base.
                This can be achieved with tactics provided each turn, along with
                the aid of skill cards and inherent abilities.
              </div>
            );

          case 4:
            return (
              <div>
                Sovereigns can set the number of units required for victory to a
                maximum of 5.
                <br /> <br />
                This digital simulator automatically sets the objective to 1
                while offering the flexibility to raise it whenever a Sovereign
                wins.
              </div>
            );

          case 5:
            return (
              <div>
                <strong>Setup:</strong> Sovereigns must construct 2 repertoires
                (decks) that contain 60 skill cards & 20 Avelhem cards,
                respectively.
                <br /> <br />
                (In this website, accounts are provided starter repertoires,
                which can be customized in the Repertoires page.)
              </div>
            );

          case 6:
            return (
              <div>
                You can find the repertoires (decks) to the right of the board.
                The cards with the red borders are skills, while those with the
                gold borders are Avelhems.
                <br /> <br />
                The repertoires above belong to your opponent, while the pair
                below belongs to you.
              </div>
            );

          case 7:
            return (
              <div>
                Either player can play the first turn, decided by any reasonable
                means. Ultimately, the option is given to the host.
                <br /> <br />
                Click on “Go First”.
              </div>
            );

          case 8:
            return (
              <div>
                <strong>
                  The Initiator refers to the Sovereign whose turn it is.
                </strong>
                <br /> <br />
                Once the first turn’s Initiator has been selected, both
                Sovereigns shuffle their repertoires and draw 4 skill cards.
              </div>
            );

          case 9:
            return (
              <div>
                In addition, the Initiator adds 1 copy of “Transcendence” to
                their hand and places another in their vestige (discard pile).
                Each repertoire has its respective vestige, placed to its right.
                Whenever a repertoire is depleted, its vestige is shuffled to
                form a new one.
                <br /> <br />
                The other Sovereign adds 2 copies of Transcendence to their
                hand, bringing their card count to 6 (opposed to your 5).
              </div>
            );

          case 10:
            return (
              <div>
                Transcendence is a special skill card that has no effect. As per
                its text, it is revealed while in one’s hand.
                <br /> <br />
                Therefore, you can observe the two copies in your opponent’s
                hand; likewise, your single copy is revealed to them. Also note
                that your second copy is in the vestige, located to the right of
                your skill repertoire.
              </div>
            );

          case 11:
            return (
              <div>
                Both Sovereigns then place pawns on the 1st, 3rd, and 5th
                columns on the 4th row of their respective sides.
                <br /> <br />
                Gold units are assigned to the host, while silver units are
                assigned to the guest. Pawns are represented by tokens featuring
                plain white circles.
              </div>
            );

          case 12:
            return (
              <div>
                Units are deployed with 1 HP and Aether. These are represented
                by the pulsing heart and winged-diamond icons, respectively.
              </div>
            );

          case 13:
            return (
              <div>
                Lastly, Sovereigns set their Fate Defiance (FD) to 3.
                <br /> <br />
                Alongside Bounty Points (BP), this can be found between one’s
                skill and Avelhem repertoires.
              </div>
            );

          case 14:
            return (
              <div>
                With the setup complete, let us proceed to the turn structure.
                <br /> <br />
                To reiterate, the Initiator refers to the Sovereign whose turn
                it currently is. Each turn has 6 phases.
              </div>
            );

          case 15:
          case 16:
            return (
              <div>
                The first phase is the Acquisition Phase, where the Initiator is
                presented options that involve deploying a pawn or drawings
                cards.
                <br /> <br />
                As you already have pawns on the board and skill cards in hand,
                choose to draw 2 Avelhem cards via Beseech.
              </div>
            );

          case 17:
            return (
              <div>
                The titular Avelhems refer to the power that commands and
                enhances creation. In this game, they are bestowed via cards
                that ascend pawns to Scions of a specified class.
                <br /> <br />
                The icon at an Avelhem’s top left corner reflects its
                corresponding class.
              </div>
            );

          case 18:
            return (
              <div>
                For convenience, skills and Avelhems are displayed separately.
                The latter is found to the right of the former.
              </div>
            );

          case 19:
            return (
              <div>
                Up next is the Bounty Phase. The Initiator receives 1 Bounty
                Point (BP) and accesses a shop, where they can spend BP on
                upgrades that affect the remainder of the game.
                <br /> <br />1 BP is also obtained by eliminating an enemy unit.
                Sovereigns hold up to 10 BP; excesses gained are forfeited.
              </div>
            );

          case 20:
            return (
              <div>
                Upgrades are organized into tiered categories, each displayed as
                a row.
                <br /> <br />
                Higher-tier items are locked behind the purchase of the
                preceding tier, located at their left. For example, you must
                expand your frontier to 4 rows before you can purchase the
                expansion to 5 rows.
              </div>
            );

          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
            return (
              <div>
                For the sake of this demonstration, you have been provided
                additional BP. You may make multiple purchases in a single
                visit, provided your BP is sufficient.
                <br /> <br />
                Upgrade your Acquisition Phase twice, then proceed.
              </div>
            );

          case 26:
            return (
              <div>
                The third phase is the Coordination Phase, where the Initiator
                obtains their tactics for the turn. Tactics are used to perform
                actions.
              </div>
            );

          case 27:
            return (
              <div>
                This phase offers 3 options. Sovereigns will often be choosing
                Assent, which provides a pair of random tactics. Battle Cry and
                Convene are more situational, as they guarantee certain tactics
                but have costs or restrictions.
                <br /> <br />
                (Also note that these options can also be upgraded to provide
                additional benefits.)
              </div>
            );

          case 28:
          case 29:
            return (
              <div>
                Choose Assent.
                <br /> <br />
                As noted below, tactical dice have 6 sides but 4 different
                faces. 2 of these are twice as likely to appear as the others.
                The Convene option provides an exclusive tactic that cannot be
                rolled, but it will not be covered in this tutorial.
              </div>
            );

          case 30:
            return (
              <div>
                You have rolled an Advance and a Mobilize Tactic.
                <br /> <br />
                These will determine your options for possible actions.
              </div>
            );

          case 31:
            return (
              <div>
                The fourth phase is the Defiance Phase. The Initiator may spend
                Fate Defiance (FD) on immediate benefits, such as renewing their
                hand or rerolling unfavorable tactics.
                <br /> <br />
                Sovereigns start the game with 3 FD, can hold up to 6 FD
                (excesses gained are forfeited), and gain 2 FD as consolation
                whenever their units are eliminated.
              </div>
            );

          case 32:
            return (
              <div>
                Unlike the Bounty Phase, the Defiance Phase allows no more than
                1 expenditure. For example, if you have 2 FD and spend 1 to
                reroll your tactics, you cannot reroll again. Instead, you
                automatically proceed to the next phase.
                <br /> <br />
                For now, press skip.
              </div>
            );

          case 33:
            return (
              <div>
                The fifth phase is the Execution Phase. Simply put, this is
                where the Initiator—as well as their units—can activate effects
                via cards, tactics, and abilities. It is akin to the “Main
                Phase” of some other games.
                <br /> <br />
                There is no arbitrary limit nor strict sequence to these
                activations. In other words, one could theoretically activate
                all the cards from their hand while using tactics and abilities
                in between.
              </div>
            );

          case 34:
            return (
              <div>
                Let’s start with using a tactic. As mentioned earlier, tactics
                are used to perform actions. Each type of tactic provides a
                different set of options with a little overlap.
              </div>
            );

          case 35:
            return (
              <div>
                Click on the Advance tactic located to the left of the board.
              </div>
            );

          case 36:
            return (
              <div>
                As a Sovereign, you will mainly use the Advance tactic to deploy
                a pawn on a zone in your frontier. The frontier initially
                consists of the first 3 rows of your side of the board, and it
                can be extended by spending BP on upgrades.
                <br /> <br />
                Note: Sovereigns can have up to 8 units on the board.
              </div>
            );

          case 37:
          case 38:
            return <div>Click on Deploy Pawn.</div>;

          case 39:
            return (
              <div>
                Zones eligible for deployment are colored blue; clicking on them
                would instantly deploy the pawn. Deploy a new pawn on the 3rd
                row and column.
                <br /> <br />
                Note: In case you change your mind, there is a cancel button by
                the top left corner of the board.
              </div>
            );

          case 40:
            return (
              <div>
                As noted earlier, units are deployed with 1 HP and Aether,
                represented by the pulsing heart and winged-diamond icons.
              </div>
            );

          case 41:
            return (
              <div>
                Performing actions via a tactics consumes them, preventing
                further usage. As the Advance tactic has been used, it is
                blackened out like other disabled options.
                <br /> <br />
                To maximize their value, one should consider the tradeoffs.
              </div>
            );

          case 42:
            return (
              <div>
                That said, the Mobilize tactic comes with 3 instances:
                performing actions with this tactic consumes its instances
                rather than its entirety.
                <br /> <br />
                To illustrate, click on the Mobilize tactic to the left of the
                board.
              </div>
            );

          case 43:
            return (
              <div>
                As a Sovereign, you can use 2 Mobilize instances to draw 1 skill
                card from the top of your repertoire.
                <br /> <br />
                Note: These instances must come from a single source; in other
                words, you are not allowed to use 1 instance each from 2
                Mobilize tactics.
              </div>
            );

          case 44:
          case 45:
            return <div>Draw a skill card.</div>;

          //=========================
        }
    }
  };

  return (
    <div className="demo-text-box-area" style={boxAreaStyle()}>
      <div className="demo-text-box">{getDemoInstructions()}</div>

      <button
        className="redButton demo-text-box-button demoClick"
        style={{ visibility: showNext() ? "" : "hidden" }}
        onClick={() => dispatch(updateDemoCount(demoCount + 1))}
      >
        Next
      </button>
    </div>
  );
};

export default DemoTextBox;
