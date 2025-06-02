import React, { useState, useEffect } from "react";
import "./DemoTextBox.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateDemoCount } from "../../redux/demoCount";

const DemoTextBox = () => {
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);
  const dispatch = useDispatch();

  const [tutorialIndex, setTutorialIndex] = useState(0);

  useEffect(() => {
    setTutorialIndex(demoCount);
  }, [demoCount]);

  const handleBack = () => {
    switch (tutorialIndex) {
      case 16:
        setTutorialIndex(14);
        break;
      case 22:
      case 23:
      case 24:
      case 25:
        setTutorialIndex(20);
        break;
      case 29:
        setTutorialIndex(27);
        break;
      case 38:
        setTutorialIndex(36);
        break;
      case 45:
        setTutorialIndex(43);
        break;
      case 47:
        setTutorialIndex(45);
        break;
      case 50:
        setTutorialIndex(48);
        break;
      case 54:
        setTutorialIndex(52);
        break;
      case 57:
      case 58:
        setTutorialIndex(55);
        break;
      case 61:
        setTutorialIndex(59);
        break;
      case 66:
        setTutorialIndex(64);
        break;
      case 68:
      case 69:
      case 70:
        setTutorialIndex(66);
        break;
      case 73:
        setTutorialIndex(71);
        break;
      case 79:
        setTutorialIndex(77);
        break;
      case 81:
      case 82:
      case 83:
        setTutorialIndex(79);
        break;
      case 91:
        setTutorialIndex(89);
        break;
      case 95:
        setTutorialIndex(93);
        break;
      case 103:
        setTutorialIndex(101);
        break;
      case 106:
        setTutorialIndex(104);
        break;
      case 108:
        setTutorialIndex(106);
        break;
      case 119:
      case 120:
      case 121:
      case 122:
      case 123:
        setTutorialIndex(117);
        break;
      case 128:
      case 129:
        setTutorialIndex(126);
        break;
      default:
        setTutorialIndex(tutorialIndex - 1);
        break;
    }
  };

  const handleForward = () => {
    setTutorialIndex(tutorialIndex + 1);
  };

  const handleFastForward = () => {
    setTutorialIndex(demoCount);
  };

  const boxAreaStyle = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (tutorialIndex) {
          //left center, slightly raised
          case 1:
          case 2:
            return {
              top: "35%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              width: 675,
            };

          //bottom right, slightly raised
          case 3:
          case 85:
            return {
              top: "75%",
              left: "75%",
              transform: "translate(-50%, -50%)",
              width: 675,
            };

          //middle center, slightly raised; small
          case 93:
          case 136:
            return {
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 650,
              // height: 200,
            };

          //middle of board, slightly smaller
          case 39:
          case 46:
          case 47:
            return {
              top: "40%",
              left: "37.5%",
              transform: "translate(-50%, -50%)",
              width: 620,
              // height: 210,
            };

          //center of board; small
          case 12:
            return {
              top: "53%",
              left: "30%",
              width: 500,
              // height: 150,
            };

          //center of board; a bit small
          case 40:
            return {
              top: "50%",
              left: "30%",
              width: 500,
              // height: 180,
            };

          // top center of board, a bit smaller
          case 105:
          case 106:
          case 113:
          case 135:
            return {
              top: "17.5%",
              left: "35%",
              width: 550,
              // height: 210,
            };

          // top center of board; small
          case 60:
          case 61:
          case 75:
          case 102:
          case 103:
          case 109:
            return {
              top: "20%",
              left: "35%",
              width: 350,
              // height: 150,
            };

          // top center of board, a bit lower; small
          case 125:
            return {
              top: "30%",
              left: "35%",
              width: 350,
              // height: 120,
            };

          //bottom left
          case 5:
          case 6:
          case 77:
            return {
              top: "75%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              width: 600,
            };

          //middle left
          case 107:
          case 108:
            return {
              top: "50%",
              left: "22.5%",
              width: 600,
            };

          //top left
          case 124:
          case 134:
            return {
              top: "25%",
              left: "25%",
              transform: "translate(-50%, -50%)",
              width: 700,
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
          case 8:
          case 9:
          case 10:
          case 17:
          case 92:
            return {
              top: "50%",
              left: "72.5%",
            };

          //middle top right; slightly small
          case 35:
            return {
              top: "32.5%",
              left: "71.0%",
              width: 620,
              // height: 175,
            };

          //middle right; slightly small
          case 13:
          case 73:
          case 74:
          case 84:
          case 86:
          case 87:
          case 99:
          case 112:
          case 133:
            return {
              top: "52%",
              left: "71.0%",
              width: 610,
              // height: 200,
            };

          //lower right; small
          case 18:
          case 63:
          case 64:
          case 72:
            return {
              top: "75%",
              left: "75%",
              width: 450,
              // height: 160,
            };

          //top right smaller
          case 98:
          case 127:
          case 128:
          case 129:
            return {
              top: "12.5%",
              width: 550,
            };

          default:
            return {
              top: "20%",
              left: "72.5%",
              transform: "translate(-50%, -50%)",
              width: 750,
            };
        }
    }
  };

  const learnOveriewExclude = new Set([
    7, 15, 16, 21, 22, 23, 24, 25, 28, 29, 30, 32, 35, 37, 38, 39, 42, 44, 45,
    46, 47, 48, 49, 50, 51, 53, 54, 55, 56, 57, 58, 60, 61, 62, 63, 64, 65, 66,
    67, 68, 69, 70, 72, 73, 74, 75, 79, 80, 81, 82, 83, 84, 85, 86, 87, 90, 91,
    92, 94, 95, 97, 98, 99, 102, 103, 105, 106, 107, 108, 109, 118, 119, 120,
    121, 122, 123, 124, 125, 127, 128, 129, 136,
  ]);

  const showNext = () => {
    if (demoGuide === "Learn-overview") {
      return !learnOveriewExclude.has(demoCount);
    }
    return true;
  };

  const getDemoInstructions = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (tutorialIndex) {
          case 1:
            return (
              <div>
                <span className="goldText">Avelhem: War of the Sovereigns</span>{" "}
                is a competitive two-player board game. This tutorial will cover
                its basic mechanics and familiarize you with its digital user
                interface.
                <br /> <br />
                To proceed through the tutorial, click on the object embedded in
                a <span style={{ color: "#25d01c" }}>green glow</span>. You can
                also use the arrow buttons below to revisit previous messages.
              </div>
            );

          case 2:
            return (
              <div>
                <span className="goldText">Overview:</span> Humanity has
                inherited the Maker’s dominion and authority over creation, the
                power known as Avelhem.
                <br /> <br />
                <span className="goldText">
                  Players assume the roles of the titular Sovereigns
                </span>
                , ordained monarchs whose Avelhems grant rulership over
                humankind itself. Impelled by grand ambitions, the Sovereigns
                embark on conquest, hellbent on enthroning their bloodline as
                the one and only.
              </div>
            );

          case 3:
            return (
              <div>
                <span className="goldText">
                  The game unfolds on a board with 10 rows and 5 columns.
                </span>{" "}
                Sovereigns position at opposite sides and designate the rows
                closest to them as their respective bases.
                <br /> <br />
                <span className="goldText">
                  To win, one must maneuver their units into the opponent’s
                  base.
                </span>{" "}
                This can be achieved with tactics allocated each turn, along
                with the aid of skill cards and inherent abilities.
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
                <span className="goldText">Setup:</span> Sovereigns must
                construct 2 repertoires (decks) that contain 60 skill cards & 20
                Avelhem cards, respectively.
                <br /> <br />
                (In this website, accounts are provided starter repertoires,
                which can be customized in the Repertoires page.)
              </div>
            );

          case 6:
            return (
              <div>
                You can find the repertoires (decks) to the right of the board.
                <br /> <br />
                The cards with the red borders are{" "}
                <span className="goldText">skills</span>, while those with the
                gold borders are <span className="goldText">Avelhems</span>.
              </div>
            );

          case 7:
            return (
              <div>
                Either player can play the first turn, decided by any reasonable
                means. Ultimately, the option is given to the host.
                <br /> <br />
                Click on Go First.
              </div>
            );

          case 8:
            return (
              <div>
                <span className="goldText">
                  The Initiator refers to the Sovereign whose turn it is.
                </span>{" "}
                Once the first Initiator is decided, both Sovereigns shuffle
                their repertoires.{" "}
                <span className="goldText">
                  The Initiator draws 5 cards, while their opponent draws 6.
                </span>
                <br /> <br />
                Note: When you are in the position to make a move or decision,
                your side will glow blue. On occasion, this can happen even
                during your opponent’s turn.
              </div>
            );

          case 9:
            return (
              <div>
                Each repertoire has its respective vestige (discard pile).
                <br /> <br />
                Unlike some other games, decking out does not result to an
                instant loss.{" "}
                <span className="goldText">
                  When a repertoire is depleted, its vestige is shuffled to form
                  a new one.
                </span>
              </div>
            );

          case 10:
            return (
              <div>
                Everyone is privy to the number of cards in every location: all
                hands, repertoires (decks), and vestiges (discard piles).
                <br /> <br />
                That said,{" "}
                <span className="goldText">
                  no one is allowed to view the contents of a repertoire
                </span>
                , unless an effect allows them to. One may view the contents of
                their own hand and vestiges at any time.
              </div>
            );

          case 11:
            return (
              <div>
                Both Sovereigns then{" "}
                <span className="goldText">
                  place pawns on the 1st, 3rd, and 5th columns on the 4th row
                </span>{" "}
                of their respective sides.
                <br /> <br />
                <span className="goldText">
                  Pawns are represented by tokens featuring plain white circles.
                </span>{" "}
                Gold units are assigned to the host, while silver units are
                assigned to the guest.
              </div>
            );

          case 12:
            return (
              <div>
                <span className="goldText">
                  Units are deployed with 1 HP and Aether.
                </span>{" "}
                These are represented by the pulsing heart and winged-diamond
                icons, respectively.
              </div>
            );

          case 13:
            return (
              <div>
                <span className="goldText">
                  Lastly, Sovereigns set their Fate Defiance (FD) to 3.
                </span>
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
                it currently is.{" "}
                <span className="goldText">Each turn has 6 phases.</span>
              </div>
            );

          case 15:
          case 16:
            return (
              <div>
                The first phase is the{" "}
                <span className="goldText">Acquisition Phase</span>
                , where the Initiator is presented options that involve
                deploying a pawn or drawings cards.
                <br /> <br />
                As you already have pawns on the board and skill cards in hand,
                choose to draw 2 Avelhem cards via Beseech.
              </div>
            );

          case 17:
            return (
              <div>
                <span className="goldText">
                  The titular Avelhems refer to the power that commands and
                  enhances creation.
                </span>{" "}
                In this game, they are bestowed via cards that ascend pawns to
                Scions of a specified class.
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
                Up next is the <span className="goldText">Bounty Phase</span>.
                <br /> <br />
                <span className="goldText">
                  The Initiator receives 1 Bounty Point (BP) and accesses a shop
                </span>
                , where they can spend BP on upgrades.
                <br /> <br />
                <span className="goldText">
                  1 BP is also obtained by eliminating a foe.
                </span>{" "}
                Sovereigns can hold up to 10 BP; excesses gained are forfeited.
              </div>
            );

          case 20:
            return (
              <div>
                Upgrades are placed into tiered categories presented in rows.
                <br /> <br />
                <span className="goldText">
                  Higher-tier items are locked behind the purchase of the
                  preceding tier
                </span>
                , located at their left. For example, you must expand your
                frontier to 4 rows before you can purchase the expansion to 5
                rows.
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
                Upgrade your Acquisition Phase twice, then proceed. (Feel free
                to scroll down to view the other categories.)
              </div>
            );

          case 26:
            return (
              <div>
                The third phase is the{" "}
                <span className="goldText">Coordination Phase</span>, where the
                Initiator obtains their tactics for the turn.
                <br /> <br />
                <span className="goldText">
                  Tactics are used to perform actions.
                </span>
              </div>
            );

          case 27:
            return (
              <div>
                This phase offers 3 options.{" "}
                <span className="goldText">
                  Sovereigns will often be choosing Assent, which provides a
                  pair of random tactics.
                </span>
                <br /> <br />
                (Battle Cry and Convene are more situational, as they guarantee
                certain tactics but have costs or restrictions. Also note that
                these options can also be upgraded to provide additional
                benefits.)
              </div>
            );

          case 28:
          case 29:
            return (
              <div>
                Choose Assent.
                <br /> <br />
                As noted below,{" "}
                <span className="goldText">
                  tactical dice have 6 sides but 4 different faces.
                </span>{" "}
                2 of these are twice as likely to appear as the others. The
                Convene option provides an exclusive tactic that cannot be
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
                The fourth phase is the{" "}
                <span className="goldText">Defiance Phase</span>. Here, the{" "}
                <span className="goldText">
                  Initiator may spend Fate Defiance (FD) on immediate benefits
                </span>
                , such as renewing their hand or rerolling unfavorable tactics.
                <br /> <br />
                <span className="goldText">
                  Sovereigns gain 2 FD as consolation when their units are
                  eliminated.
                </span>{" "}
                They start the game with 3 and can hold up to 6.
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
                The fifth phase is the{" "}
                <span className="goldText">Execution Phase</span>. Simply put,{" "}
                <span className="goldText">
                  this is where the Initiator and their units can activate
                  effects via cards, tactics, and abilities.
                </span>{" "}
                It is akin to the “Main Phase” of some other games.
                <br /> <br />
                There is no arbitrary limit nor strict sequence to these
                activations. In other words, one could theoretically activate
                all the cards in their hand while using tactics and abilities in
                between.
              </div>
            );

          case 34:
            return (
              <div>
                Let’s start with using a tactic.
                <br /> <br />
                As mentioned earlier, tactics are used to perform actions.{" "}
                <span className="goldText">
                  Each type provides a different set of options with a little
                  overlap.
                </span>
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
                a pawn on a zone in your frontier.{" "}
                <span className="goldText">
                  The frontier initially consists of the first 3 rows of your
                  side of the board
                </span>
                , and it can be extended by spending BP on upgrades.
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
                <span className="goldText">
                  Zones eligible for deployment are colored blue
                </span>
                ; clicking on one of them would instantly deploy the pawn. In
                case you change your mind, you can press Cancel by the top left
                corner of the board.
                <br /> <br />
                Deploy a new pawn on the 3rd row and column.
              </div>
            );

          case 40:
            return (
              <div>
                As stated earlier,{" "}
                <span className="goldText">
                  units are deployed with 1 HP and Aether
                </span>
                , represented by the pulsing heart and winged-diamond icons.
              </div>
            );

          case 41:
            return (
              <div>
                Performing actions via a tactics consumes them, preventing
                further usage. As the Advance tactic has been used, it is
                blackened like other disabled options.
                <br /> <br />
                To maximize value, one should consider the tradeoffs.
              </div>
            );

          case 42:
            return (
              <div>
                That said, the Mobilize tactic comes with 3 instances:{" "}
                <span className="goldText">
                  performing actions with this tactic consumes its instances
                  rather than its entirety.
                </span>
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
                Note: These{" "}
                <span className="goldText">
                  instances must come from a single source
                </span>
                ; in other words, you are not allowed to use 1 instance each
                from 2 Mobilize tactics.
              </div>
            );

          case 44:
          case 45:
            return <div>Draw a skill card.</div>;

          case 46:
          case 47:
            return (
              <div>
                Units can also use tactics to perform their own actions.{" "}
                <span className="goldText">
                  For the sake of this demonstration, your tactics have been
                  reset.
                </span>
                <br /> <br />
                Click on your top center pawn to open their menu, then click on
                top right button, which features a cube icon.
              </div>
            );

          case 48:
            return <div>Click on the Advance tactic.</div>;

          case 49:
          case 50:
            return (
              <div>
                Units can use the Advance tactic to{" "}
                <span className="goldText">traverse</span>, which is a keyword
                that means{" "}
                <span className="goldText">
                  “move to a vacant adjacent zone”
                </span>
                .
                <br /> <br />
                Click on the Traverse option.
              </div>
            );

          case 51:
            return (
              <div>
                Similar with deployment, zones eligible for movement are colored
                blue. Also note that in case you change your mind, you can press
                the cancel button at the top left corner.
                <br /> <br />
                Click on the zone ahead of your pawn to make them move.
              </div>
            );

          case 52:
            return (
              <div>
                As mentioned, some tactics have a little overlap.
                <br /> <br />
                <span className="goldText">
                  As with Advance, Mobilize allows units to traverse
                </span>
                —in fact, the latter does it better as it allows for multiple
                movements.
              </div>
            );

          case 53:
          case 54:
            return (
              <div>
                Let’s make your pawn use a tactic again.
                <br /> <br />
                Click on them to open their menu, then click on the top right
                button.
              </div>
            );

          case 55:
            return <div>Click on Mobilize.</div>;

          case 56:
          case 57:
          case 58:
            return (
              <div>
                Click on the traverse option, then make them move forward again.
              </div>
            );

          case 59:
            return (
              <div>
                <span className="goldText">
                  A unit cannot use the same Mobilize tactic more than once.
                </span>{" "}
                Since your top center pawn has already moved via the Mobilize
                tactic, they are barred from using its remaining instances.
                <br /> <br />
                (Clarification: A unit is allowed to traverse twice using 2
                different Mobilize tactics.)
              </div>
            );

          case 60:
          case 61:
            return (
              <div>
                To illustrate this point, click on that pawn again and open
                their tactics menu.
              </div>
            );

          case 62:
            return (
              <div>
                As you can see, the Mobilize tactic is blackened despite having
                2 remaining instances.
                <br /> <br />
                Press Return.
              </div>
            );

          case 63:
            return (
              <div>
                The other actions you can perform with these tactics, as well as
                the other tactics, will be discussed in a different tutorial.
                That said, players can access the Tactics Guide by clicking on
                the{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="question-icon3"
                  style={{ fill: "#ffffe9" }}
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                </svg>{" "}
                icon at the top right corner of the tactics.
              </div>
            );

          case 64:
            return (
              <div>
                Feel free to skim through the Tactics Guide or close it
                immediately.
              </div>
            );

          case 65:
          case 66:
            return (
              <div>
                Since you have remaining instances, let’s move another unit.
                <br /> <br />
                Make your right pawn move closer to the top center one. Open
                their menu, then click on the upper right button.
              </div>
            );

          case 67:
          case 68:
          case 69:
          case 70:
            return (
              <div>
                Follow the same steps as earlier: Click on Mobilize, traverse,
                and the destination.
              </div>
            );

          case 71:
            return (
              <div>
                Aside from tactics, you can also use cards. Let’s start by using
                an Avelhem.
                <br /> <br />
                As a reminder, Avelhems are cards primarily used to ascend pawns
                into Scions.
              </div>
            );

          case 72:
          case 73:
            return (
              <div>
                To use an Avelhem card, click on any card in your hand to raise
                it, then click on the specific card you want to activate. In
                this case, click on the Fire Avelhem card.
              </div>
            );

          case 74:
            return <div>Click on the Activate button.</div>;

          case 75:
            return (
              <div>
                The zones of eligible units will be colored blue.
                <br /> <br />
                Click on your topmost pawn to ascend them.
              </div>
            );

          case 76:
            return (
              <div>
                Ascending pawns into Scions is the game’s core feature. Pawns
                can only use tactics to move and attack, while{" "}
                <span className="goldText">
                  Scions can also activate skill cards and abilities that
                  thematically apply their powers
                </span>
                .
                <br /> <br />
                <span className="goldText">
                  Each Sovereign can have up to 2 Scions of the same class in
                  play.
                </span>{" "}
                For example, controlling 2 Fire Scions prevents you from
                ascending a pawn to another Fire Scion until either is removed
                from play.
              </div>
            );

          case 77:
            return (
              <div>
                <span className="goldText">
                  Scions also have class-exclusive talents
                </span>
                , which are special effects that automatically activate when
                applicable.
                <br /> <br />
                In the case of Fire Scions, their “From the Ashes” talent
                activates when they debut (enter play).
              </div>
            );

          case 78:
          case 79:
            return (
              <div>
                This talent allows them to recover a Fire skill from the vestige
                (discard pile) and float it (put it on top of the repertoire).
                Since your vestige does not contain any Fire skills, this effect
                is currently not applicable
                <br /> <br />
                Note: The talent card is for visual reference only; it is not a
                game component.
              </div>
            );

          case 80:
          case 81:
          case 82:
          case 83:
            return (
              <div>
                Activate your Mana Avelhem card to ascend your right pawn.
                <br /> <br />
                Like last time, click on your hand, the specific card, the
                Activate button, and lastly the unit you want to ascend.
              </div>
            );

          case 84:
            return (
              <div>
                <span className="goldText">
                  Cards are sent to their respective vestige when they conclude
                  their effects.
                </span>{" "}
                You can view the contents of your own vestige at any time by
                clicking on it.
                <br /> <br />
                Click on your Avelhem vestige, located to the right of its
                repertoire.
              </div>
            );

          case 85:
            return (
              <div>
                <span className="goldText">
                  Only the vestige’s owner can view its contents
                </span>
                ; however, the number of cards it contains is known to everyone.
                <br /> <br />
                Close your Avelhem vestige.
              </div>
            );

          case 86:
            return (
              <div>
                As mentioned, Scions gain access to abilities and skills. Let’s
                demonstrate the use of abilities with the Mana Scion. Click on
                them to open their menu.
              </div>
            );

          case 87:
            return (
              <div>
                Notice the addition of 2 buttons.
                <br /> <br />
                Click on the bottom right one to open their ability menu.
              </div>
            );

          case 88:
            return (
              <div>
                <span className="goldText">
                  Each Scion class has 2 exclusive abilities.
                </span>
                <br /> <br />
                Some abilities require the use of tactics. For example, Mana
                Scions can use an Assault tactic to activate Particle Beam,
                which lets them attack a foe as far as 2 spaces away. (Normally,
                units can use the Assault tactic to attack adjacent foes.)
              </div>
            );

          case 89:
            return (
              <div>
                On the other hand, some abilities do not require tactics, making
                them more reliable and accessible. Amplify Aura is one such
                example; however, it also has the “One-shot” property, which
                means that it cannot be activated more than once per turn.
              </div>
            );

          case 90:
          case 91:
            return <div>Activate Amplify Aura.</div>;

          case 92:
            return (
              <div>
                <span className="goldText">
                  Amplify Aura allows a Mana Scion to convert their own or their
                  adjacent ally’s Aether into a Shield that lasts 2 turns.
                </span>{" "}
                Shield is a status condition that negates the next attack the
                unit would receive.
                <br /> <br />
                Click on the Fire Scion to make them recipient of Amplify Aura’s
                effect.
                <br /> <br />
                Note: The ability card is for visual reference only; it is not a
                game component.
              </div>
            );

          case 93:
            return (
              <div>
                Notice that the Fire Scion’s Aether icon (formerly located
                beside the HP icon) has disappeared, while a silver shield icon
                has appeared.
                <br /> <br />
                Note: This is but one of Aether’s applications, but this
                attribute will be discussed in detail in a different tutorial.
              </div>
            );

          case 94:
          case 95:
            return (
              <div>
                In addition to these visual indicators, you can access a unit’s
                information by clicking on the top left button of their menu.
                <br /> <br />
                Click on your Fire Scion, then click on their information
                button.
              </div>
            );

          case 96:
            return (
              <div>
                Relevant information regarding the selected unit is displayed
                here. As you can see, it indicates their HP, their Aether (or
                lack thereof), as well as statuses such as their Shield.
              </div>
            );

          case 97:
            return (
              <div>
                It also serves as a reference guide, listing their abilities,
                talents, and even the skill cards they can activate. Clicking on
                these cards will display them up close so you can read them.
                <br /> <br />
                Click on the left-most card of their skill set.
              </div>
            );

          case 98:
            return <div>Click anywhere to close it.</div>;

          case 99:
            return <div>Close the information display.</div>;

          case 100:
            return (
              <div>
                The last portion of Execution Phase demonstration is the
                activation of Scion skill cards.
                <br /> <br />
                <span className="goldText">
                  Scions can activate skill with aspects that match their class.
                </span>{" "}
                A skill card’s aspect can be found at its top left corner. For
                example, Ignition Propulsion is a Fire skill; only Fire Scions
                can activate it.
              </div>
            );

          case 101:
            return (
              <div>
                Conversely, Reminiscence is a Sovereign skill. Its aspect is
                represented by a crown.
                <br /> <br />
                Like Avelhem cards, Sovereigns skill cards are activated
                directly from one’s hand.
              </div>
            );

          case 102:
          case 103:
            return (
              <div>
                Click on your Fire Scion to open their menu, then click on the
                bottom left button to open their skill selection.
              </div>
            );

          case 104:
            return (
              <div>
                This display will filter out cards that do not match the unit’s
                aspect.
                <br /> <br />
                If you are unfamiliar with what a card does, click on the
                magnifying glass icon on its top right corner to view it up
                close. You can then click anywhere to close it.
              </div>
            );

          case 105:
          case 106:
            return (
              <div>
                Scion skills can be thought of as abilities that require
                specific cards to activate.
                <br /> <br />
                Activate Ignition Propulsion.
              </div>
            );

          case 107:
          case 108:
            return (
              <div>
                Ignition Propulsion requires the activator to spend (discard) a
                skill card from hand, in addition to the activated card itself.
                <br /> <br />
                Spending skills is a recurring theme in a number of effects. The
                decision to part with or keep a card can potentially alter the
                course of the game, so choose carefully. For now, discard
                “Viridian Grave” (the third skill).
              </div>
            );

          case 109:
            return (
              <div>
                Click on the enemy pawn to designate them as the attack target.
              </div>
            );

          case 110:
            return (
              <div>
                <span className="goldText">
                  Attacking a foe reduces their HP.
                </span>{" "}
                The amount deducted is equivalent to the attack’s AP (Attack
                Power).
                <br /> <br />
                HP and AP are 1 by default; therefore, it normally takes a
                single attack to deplete a unit’s HP.
              </div>
            );

          case 111:
            return (
              <div>
                <span className="goldText">
                  When a unit’s HP is reduced to 0, they are eliminated and
                  removed from the board.
                </span>{" "}
                Furthermore, the Sovereign of the eliminated unit receives 2 FD,
                while their opponent receives 1 BP.
                <br /> <br />
                <span className="goldText">
                  When a unit eliminates an enemy via strike, they automatically
                  move into the zone the victim was occupying.
                </span>
              </div>
            );

          case 112:
            return (
              <div>
                And as mentioned earlier, you have gained 1 BP, while your
                opponent has gained 2 FD (they started with 3, which brings
                their total to 5).
              </div>
            );

          case 113:
            return (
              <div>
                As per Ignition Propulsion’s second sub-effect, your Fire Scion
                has recovered their Aether (represented by the return of their
                winged-diamond icon).
                <br /> <br />
                …But what is with that dark aura, you ask?
              </div>
            );

          case 114:
            return (
              <div>
                <strong>
                  <em>
                    “To wield an Avelhem is to become a steward of Creation. And
                    what greater sin is there than destroying the Maker’s
                    beloved?”
                  </em>
                </strong>
                <br /> <br />
                <span className="goldText">
                  When a Scion (not pawn) eliminates another unit, they are
                  punished with the Anathema status for 2 turns.
                </span>{" "}
                This is represented by a dark purple aura flowing downward.
              </div>
            );

          case 115:
            return (
              <div>
                Anathema disables Scion’s power, stripping them of their
                abilities, talents, and access to skill cards. They also cannot
                attack via any means.
                <br /> <br />
                Simply put, punished Scions can only traverse.
              </div>
            );

          case 116:
            return (
              <div>
                The affliction of the Anathema is delayed until after the unit
                has concluded all their activated effects.
                <br /> <br />
                (This will be emphasized and explained in another demo.)
              </div>
            );

          case 117:
            return (
              <div>
                And that wraps up the Execution Phase. But before we move to the
                last phase, a pawn has been deployed on the 2nd row of the board
                for the sake of another demonstration.
                <br /> <br />
                <span className="goldText">
                  As a reminder, your objective is to move your units into your
                  opponent’s base.
                </span>
              </div>
            );

          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
          case 123:
            return (
              <div>
                Using your last Mobilize instance, move that pawn into the zone
                above them.
                <br /> <br />
                Open their tactics menu, then click on Mobilize, traverse, and
                the destination.
              </div>
            );

          case 124:
            return (
              <div>
                It is not enough that a unit moves into the enemy base. They
                must also occupy it at the end of their turn.
                <br /> <br />
                And without further ado, click on the End Turn button. The
                Initiator can end their turn anytime as long as there are no
                ongoing effects.
              </div>
            );
          case 125:
            return <div>Confirm that you want to end.</div>;

          case 126:
            return (
              <div>
                The last phase is the{" "}
                <span className="goldText">Final Phase</span>. During this
                phase, the{" "}
                <span className="goldText">
                  Initiator forfeits unused tactics and must discard any excess
                  cards from hand
                </span>
                .
                <br /> <br />
                The skill card limit is 8, while the Avelhem card limit is 0
                (but it can be upgraded to 1).
              </div>
            );

          case 127:
          case 128:
          case 129:
            return (
              <div>
                For the sake of this demonstration, your hand size has increased
                to 10 skill cards. Select 2 excess cards to be discarded.
              </div>
            );

          case 130:
            return (
              <div>
                After excess cards are discarded,{" "}
                <span className="goldText">
                  the durations of turn-based statuses affecting the Initiator’s
                  units decrease by 1
                </span>
                .
                <br /> <br />
                The durations of your Fire Scion’s Shield and Anathema have
                decreased from 2 turns to 1: Their Shield icon is now blinking,
                and their aura of Anathema has weakened.
              </div>
            );

          case 131:
            return (
              <div>
                Lastly, the game performs a check:{" "}
                <span className="goldText">
                  If the any of the Initiator’s units are occupying their
                  opponent’s base for the first time, they will score
                </span>
                .
              </div>
            );

          case 132:
            return (
              <div>
                Units that have scored stay on the board, but they cannot be
                interacted with and continue to contribute to their owner’s unit
                limits.
                <br /> <br />
                Reminder: A Sovereign can have up to 8 units at a time, and no
                more than 2 ally Scions can have the same class.
              </div>
            );

          case 133:
            return (
              <div>
                Furthermore, the Sovereign of the scoring unit gains 3 BP, while
                their opponent gains 6 FD.
                <br /> <br /> This is triple the yield of eliminating a unit.
              </div>
            );

          case 134:
            return (
              <div>
                Lastly, if scoring causes the Initiator to meet the victory
                requirement, they win. Otherwise, their opponent takes their
                turn as the Initiator and goes through the same phases.
              </div>
            );

          case 135:
            return (
              <div>
                As mentioned earlier, the victory requirement in this simulator
                is automatically set to 1, but players may choose to raise it
                once someone wins.
              </div>
            );

          case 136:
            return (
              <div>
                And that covers the basics. Consider reading the rules or
                playing the other tutorials for a deeper understanding of the
                mechanics and its nuances.
                <br /> <br />
                End of Overview Tutorial.
              </div>
            );

          //=========================
        }
    }
  };

  return (
    <div className="demo-text-box-area" style={boxAreaStyle()}>
      <div className="demo-text-box">{getDemoInstructions()}</div>

      <div className="demo-text-buttons">
        <button
          className="play-button"
          disabled={tutorialIndex <= 1}
          onClick={() => handleBack()}
        >
          <div className="triangle-left"></div>
        </button>
        <button
          className="play-button"
          onClick={() => handleForward()}
          disabled={tutorialIndex >= demoCount}
        >
          <div className="triangle-right"></div>
        </button>
        <button
          className="play-button"
          onClick={() => handleFastForward()}
          disabled={tutorialIndex >= demoCount}
        >
          <div className="triangle-right"></div>
          <div className="triangle-right"></div>
        </button>

        <button
          className={"redButton2 demo-text-box-button demo-button demoClick"}
          style={{ visibility: showNext() ? "" : "hidden" }}
          onClick={() => dispatch(updateDemoCount(demoCount + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DemoTextBox;
