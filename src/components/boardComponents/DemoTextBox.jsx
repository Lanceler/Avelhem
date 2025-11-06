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
      case 15:
        setTutorialIndex(13);
        break;

      case 21:
      case 22:
      case 23:
      case 24:
        setTutorialIndex(19);
        break;

      case 28:
        setTutorialIndex(26);
        break;

      case 32:
        setTutorialIndex(30);
        break;

      case 41:
        setTutorialIndex(39);
        break;

      case 47:
        setTutorialIndex(45);
        break;

      case 50.1:
        setTutorialIndex(49);
        break;

      case 52:
        setTutorialIndex(50);
        break;

      case 56.1:
        setTutorialIndex(55);
        break;

      case 58:
      case 59:
        setTutorialIndex(56.1);
        break;

      case 62.1:
        setTutorialIndex(61);
        break;

      case 62.2:
        setTutorialIndex(62.1);
        break;

      case 63:
        setTutorialIndex(62.2);
        break;

      case 67:
        setTutorialIndex(65);
        break;

      case 75:
        setTutorialIndex(73);
        break;

      case 85:
        setTutorialIndex(83);
        break;

      case 90:
        setTutorialIndex(88);
        break;

      case 102:
        setTutorialIndex(100);
        break;

      case 104:
        setTutorialIndex(102);
        break;

      case 116:
      case 116.1:
      case 117:
      case 118:
      case 119:
        setTutorialIndex(114);
        break;

      case 124:
      case 125:
        setTutorialIndex(122);
        break;

      default:
        setTutorialIndex(tutorialIndex - 1);
        break;
    }
  };

  const handleForward = () => {
    switch (true) {
      case tutorialIndex === 13:
        setTutorialIndex(15);
        break;

      case [19, 20, 21, 22, 23].includes(tutorialIndex):
        setTutorialIndex(24);
        break;

      case tutorialIndex === 26:
        setTutorialIndex(28);
        break;

      case tutorialIndex === 30:
        setTutorialIndex(32);
        break;

      case tutorialIndex === 39:
        setTutorialIndex(41);
        break;

      case tutorialIndex === 45:
        setTutorialIndex(47);
        break;

      case tutorialIndex === 49:
        setTutorialIndex(50.1);
        break;

      case tutorialIndex === 50:
      case tutorialIndex === 50.1:
        setTutorialIndex(52);
        break;

      case [56, 56.1, 57, 58].includes(tutorialIndex):
        setTutorialIndex(59);
        break;

      case tutorialIndex === 61:
        setTutorialIndex(62.1);
        break;

      case tutorialIndex === 62:
      case tutorialIndex === 62.1:
        setTutorialIndex(62.2);
        break;

      case tutorialIndex === 62.2:
        setTutorialIndex(63);
        break;

      case tutorialIndex === 65:
        setTutorialIndex(67);
        break;

      case tutorialIndex === 73:
        setTutorialIndex(75);
        break;

      case tutorialIndex === 83:
        setTutorialIndex(85);
        break;

      case tutorialIndex === 88:
        setTutorialIndex(90);
        break;

      case tutorialIndex === 100:
        setTutorialIndex(102);
        break;

      case tutorialIndex === 102:
        setTutorialIndex(104);
        break;

      case [114, 115, 116, 116.1, 117, 118].includes(tutorialIndex):
        setTutorialIndex(119);
        break;

      case [122, 123].includes(tutorialIndex):
        setTutorialIndex(125);
        break;

      default:
        setTutorialIndex(tutorialIndex + 1);
        break;
    }

    // setTutorialIndex(tutorialIndex + 1);
  };

  const handleFastForward = () => {
    setTutorialIndex(demoCount);
  };

  const boxAreaStyle = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (tutorialIndex) {
          //center
          case 1:
          case 2:
            return {
              top: 350,
              left: 350,
              width: 775,
            };

          case 3:
          case 4:
            return {
              top: 440,
              left: 740,
            };

          case 5:
          case 6:
          case 7:
            return {
              top: 40,
              left: 40,
            };

          case 8:
            return {
              top: 540,
              left: 40,
            };

          case 9:
            return {
              top: 280,
              left: 740,
            };

          case 10:
            return {
              top: 380,
              left: 740,
            };

          case 11:
            return {
              top: 520,
              left: 290,
            };

          case 14:
          case 15:
            return {
              top: 40,
              left: 40,
              width: 1350,
            };

          case 16:
            return {
              top: 340,
              left: 680,
            };

          case 17:
            return {
              top: 580,
              left: 730,
            };

          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
          case 31:
          case 32:
          case 33:
            return {
              top: 40,
              left: 820,
              width: 600,
            };

          case 34:
          case 35:
          case 36:
            return {
              top: 70,
              left: 40,
              width: 650,
            };

          case 37:
          case 38:
            return {
              top: 130,
              left: 740,
              width: 550,
            };

          case 39:
          case 40:
          case 41:
            return {
              top: 40,
              left: 740,
              width: 650,
            };

          case 42:
          case 43:
            return {
              top: 440,
              left: 720,
            };

          case 44:
          case 45:
          case 46:
          case 47:
            return {
              top: 40,
              left: 740,
              width: 650,
            };

          case 49:
            return {
              top: 300,
              left: 40,
              width: 650,
            };

          case 50:
          case 50.1:
            return {
              top: 30,
              left: 40,
              width: 1000,
            };

          case 51:
          case 52:
            return {
              top: 120,
              left: 20,
              width: 350,
            };

          case 53:
            return {
              top: 150,
              left: 140,
              width: 650,
            };

          case 61:
            return {
              top: 195,
              left: 40,
              width: 640,
            };

          case 63:
            return {
              top: 140,
              left: 740,
              width: 650,
            };

          case 64:
            return {
              top: 20,
              left: 400,
              width: 750,
            };

          case 65:
            return {
              top: 50,
              left: 600,
              width: 750,
            };

          case 66:
          case 67:
            return {
              top: 390,
              left: 650,
              width: 750,
            };

          case 68:
            return {
              top: 450,
              left: 800,
              width: 380,
            };

          case 69:
            return {
              top: 80,
              left: 320,
              width: 750,
            };

          case 70:
            return {
              top: 220,
              left: 620,
              width: 750,
            };

          case 73:
            return {
              top: 30,
              left: 470,
              width: 950,
            };

          case 74:
          case 75:
            return {
              top: 30,
              left: 870,
              width: 550,
            };

          case 76:
            return {
              top: 80,
              left: 600,
              width: 750,
            };

          case 77:
          case 78:
            return {
              top: 180,
              left: 340,
            };

          case 79:
            return {
              top: 80,
              left: 340,
            };

          case 80:
          case 81:
            return {
              top: 40,
              left: 920,
              width: 450,
            };

          case 82:
            return {
              top: 220,
              left: 820,
              width: 420,
            };

          case 83:
            return {
              top: 80,
              left: 600,
              width: 700,
            };

          case 84:
          case 85:
            return {
              top: 390,
              left: 650,
              width: 750,
            };

          case 86:
          case 87:
            return {
              top: 450,
              left: 800,
              width: 380,
            };

          case 88:
            return {
              top: 80,
              left: 280,
            };

          case 89:
          case 90:
            return {
              top: 40,
              left: 820,
              width: 600,
            };

          case 91:
          case 92:
            return {
              top: 40,
              left: 280,
            };

          case 93:
            return {
              top: 180,
              left: 480,
              width: 400,
            };

          case 94:
          case 95:
          case 96:
          case 97:
          case 98:
            return {
              top: 280,
              left: 700,
              width: 650,
            };

          case 99:
            return {
              top: 140,
              left: 250,
              width: 750,
            };

          case 100:
            return {
              top: 200,
              left: 770,
              width: 620,
            };

          case 101:
          case 102:
            return {
              top: 380,
              left: 750,
              width: 420,
            };

          case 103:
          case 104:
            return {
              top: 80,
              left: 780,
              width: 620,
            };

          case 105:
            return {
              top: 40,
              left: 300,
              width: 560,
            };

          case 106:
            return {
              top: 40,
              left: 300,
              width: 650,
            };

          case 107:
            return {
              top: 140,
              left: 300,
              width: 550,
            };

          case 108:
          case 109:
            return {
              top: 290,
              left: 740,
              width: 680,
            };

          case 110:
            return {
              top: 90,
              left: 540,
              width: 650,
            };

          case 111:
          case 112:
            return {
              top: 500,
              left: 40,
              width: 700,
            };

          case 113:
            return {
              top: 220,
              left: 820,
              width: 420,
            };

          case 114:
          case 115:
          case 116:
          case 116.1:
          case 117:
          case 118:
          case 119:
            return {
              top: 55,
              left: 720,
              width: 650,
            };

          case 120:
            return {
              top: 100,
              left: 40,
              width: 490,
            };

          case 121:
            return {
              top: 200,
              left: 440,
              width: 400,
            };

          case 122:
            return {
              top: 340,
              left: 40,
            };

          case 123:
          case 124:
          case 125:
            return {
              top: 200,
              left: 740,
              width: 600,
            };

          case 126:
            return {
              top: 250,
              left: 580,
              width: 600,
            };

          case 127:
            return {
              top: 350,
              left: 640,
              width: 650,
            };

          case 128:
            return {
              top: 60,
              left: 640,
              width: 650,
            };

          case 129:
            return {
              top: 60,
              left: 640,
              width: 650,
            };

          case 130:
            return {
              top: 160,
              left: 440,
              width: 380,
            };

          case 131:
          case 132:
            return {
              top: 450,
              left: 750,
              width: 500,
            };

          default:
            return {
              top: 40,
              left: 40,
            };
        }
    }
  };

  const learnOveriewExclude = new Set([
    7, 14, 15, 20, 21, 22, 23, 24, 27, 28, 29, 31, 32, 33, 38, 40, 41, 43, 44,
    46, 47, 49, 50, 50.1, 51, 52, 53, 55, 56, 56.1, 57, 58, 59, 61, 62, 62.1,
    62.2, 63, 64, 66, 67, 68, 69, 72, 74, 75, 77, 79, 82, 84, 85, 86, 87, 89,
    90, 91, 93, 99, 101, 102, 103, 104, 107, 110, 113, 115, 116, 116.1, 117,
    118, 119, 120, 121, 123, 124, 125, 130, 132,
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
                is a 1 vs. 1 tactical dueling game. This tutorial will cover the
                game’s basic mechanics and familiarize you with its digital user
                interface.
                <br /> <br />
                To proceed through the tutorial, click on the object embedded in
                a{" "}
                <strong>
                  <span style={{ color: "#16ca1f" }}>green glow</span>
                </strong>
                . You can also use the arrow buttons below to revisit previous
                messages.
              </div>
            );

          case 2:
            return (
              <div>
                The game is set in a realm where demigods walk among mortals as
                the elements dance to their tunes. Humanity has inherited the
                Maker’s authority over creation, the godsend power known as “
                <span className="goldText">Avelhem</span>”.
                <br /> <br />
                Players take on the mantle of the titular Sovereigns, monarchs
                whose dominion is humanity itself.
              </div>
            );

          case 3:
            return (
              <div>
                The game unfolds on a board with 10 rows and 5 columns.
                <br /> <br />
                Each Sovereign positions at opposite ends of the board, with the
                outermost rows designated as their respective bases.
              </div>
            );

          case 4:
            return (
              <div>
                <span className="goldText">
                  Victory is claimed by maneuvering your units onto your
                  opponent’s base.
                </span>
                <br /> <br />
                By default, the first player to score with a unit wins. However,
                players may raise the objective for longer, more intense
                matches.
              </div>
            );

          case 5:
            return (
              <div>
                <span className="goldText">Part 1: Setup</span>
                <br /> <br />
                Prior to the game, Sovereigns must construct 2 repertoires
                (decks) that contain{" "}
                <span className="goldText">
                  50 skills cards & 20 Avelhem cards
                </span>
                , respectively. (Accounts are provided with starter repertoires,
                which can be customized.)
              </div>
            );

          case 6:
            return (
              <div>
                Repertoires are positioned to the right of the board.
                <br /> <br />
                The cards with the red borders are the skills, while those with
                the gold borders are the Avelhems.
              </div>
            );

          case 7:
            return (
              <div>
                Any player can go first, decided by any reasonable means.
                Ultimately, the option is given to the player hosting the game.
                <br /> <br />
                Click on Go First.
              </div>
            );
          case 8:
            return (
              <div>
                <span className="goldText">
                  The Initiator refers to the Sovereign whose turn it is.
                </span>
                <br /> <br />
                Once the first Initiator is decided, both Sovereigns shuffle
                their repertoires. The Initiator draws 5 skills, while their
                opponent draws 6.
              </div>
            );

          case 9:
            return (
              <div>
                Both Sovereigns then deploy pawns on the 1st, 3rd, and 5th
                columns on the 4th row of their respective sides. Pawns are
                represented by tokens featuring plain white circles.
                <br /> <br />
                Gold tokens are assigned to the host, while silver tokens are
                assigned to their opponent.
              </div>
            );
          case 10:
            return (
              <div>
                Units are deployed with 1 Health Point (HP) and Aether, which
                are represented by the heart and winged diamond icons,
                respectively.
              </div>
            );

          case 11:
            return (
              <div>
                Lastly, Sovereigns set their Defiance Points (DP) to 3.
                <br /> <br />
                Alongside Bounty Points (BP), these are displayed between one’s
                skill and Avelhem repertoires.
              </div>
            );
          case 12:
            return (
              <div>
                <span className="goldText">Part 2: Turn Structure</span>
                <br /> <br />
                To reiterate, the Initiator refers to the Sovereign whose turn
                it currently is.
                <br /> <br />
                Each turn has 6 phases: Acquisition, Bounty, Coordination,
                Defiance, Execution, and Final.
              </div>
            );

          case 13:
            return (
              <div>
                When the game is in a state where you have priority to make a
                move, the board will glow{" "}
                <span style={{ color: "#4eacf8" }}>blue</span>. This typically
                happens during your turn, but there are moments in your
                opponent’s turn when you are given opportunities to react—and
                vice versa.
              </div>
            );

          case 14:
          case 15:
            return (
              <div>
                In the <span className="goldText">Acquisition Phase</span>, the
                Initiator bolsters their resources by choosing between deploying
                a pawn or drawing cards.
                <br />
                As you already have pawns on the board and skill cards in hand,
                choose Beseech to draw 2 Avelhem cards.
              </div>
            );

          case 16:
            return (
              <div>
                Avelhems are divine powers that command and enhance creation.
                <br /> <br />
                In this game, they are bestowed via cards that ascend pawns to
                Scions of a specified class. The icon at the card’s top-left
                corner reflects its corresponding class.
              </div>
            );

          case 17:
            return (
              <div>
                For convenience, skills and Avelhems are displayed in separate
                hands.
              </div>
            );

          case 18:
            return (
              <div>
                In the <span className="goldText">Bounty Phase</span>, the
                Initiator receives 1 Bounty Point (BP) and accesses a shop where
                they can spend it on upgrades.
                <br /> <br />
                <span className="goldText">
                  BP is also obtained by eliminating the opponent’s units.
                </span>{" "}
                Sovereigns can hold up to 10 BP; excesses gained are forfeited.
              </div>
            );

          case 19:
            return (
              <div>
                Upgrades are organized into tiered categories displayed as rows.
                <br /> <br />
                Higher-tier items remain locked until the previous tier is
                purchased. For example, expanding your frontier to 4 rows
                unlocks the option to expand it to 5.
              </div>
            );

          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
            return (
              <div>
                For the purposes of this demonstration, you have been granted
                additional BP. You can make multiple purchases, as long as you
                have enough BP.
                <br /> <br />
                Upgrade your Phases twice, then proceed. (Feel free to scroll
                down to view the other categories.)
              </div>
            );

          case 25:
            return (
              <div>
                In the <span className="goldText">Coordination Phase</span>, the
                Initiator obtains their tactics for the turn.
                <br /> <br />
                Tactics are used to perform tactical actions, such as moving or
                attacking with a unit.
              </div>
            );

          case 26:
            return (
              <div>
                <span className="goldText">
                  By design, the Initiator will often pick Assent and roll 2
                  dice to gain random tactics.
                </span>{" "}
                In desperate situations, they may opt to pick Battle Cry, which
                guarantees an Assault tactic at a cost.
              </div>
            );

          case 27:
          case 28:
            return (
              <div>
                Choose Assent.
                <br /> <br />
                As noted below, tactical dice have 6 sides but 4 different
                faces. 2 of these are twice as likely as to appear as the
                others.
              </div>
            );

          case 29:
            return (
              <div>
                You have rolled 2 Advance tactics. These will provide a set of
                options for your possible tactical actions.
                <br /> <br />
                Note: The 4 different tactics have some overlap, which improves
                the odds of having access to desired actions.
              </div>
            );

          case 30:
            return (
              <div>
                In the <span className="goldText">Defiance Phase</span>, the
                Initiator may spend Defiance Points (DP) on immediate benefits,
                such as rerolling unfavorable tactics.
                <br /> <br />
                <span className="goldText">
                  2 DP is obtained as consolation when one’s unit is eliminated.
                </span>{" "}
                The maximum DP that can be held is 6.
              </div>
            );

          case 31:
          case 32:
            return (
              <div>
                Select Backtrack to reroll your tactics at the cost of 1 DP.
              </div>
            );

          case 33:
            return (
              <div>
                Unlike the Bounty Phase, the Defiance Phase is limited to 1
                expenditure. Despite having sufficient DP to spend, you will
                instead automatically proceed to the next phase.
              </div>
            );

          case 34:
            return (
              <div>
                The <span className="goldText">Execution Phase</span> functions
                similarly to the “Main Phase” in other games. Here, the
                Initiator can make active use of the resources they’ve gathered
                so far.
              </div>
            );

          case 35:
            return (
              <div>
                Simply put, the Initiator can perform the following actions:
                <br />
                1. Use a tactic <br />
                2. Activate a card <br />
                3. Activate a unit’s ability <br />
                4. Proceed to the Final Phase
              </div>
            );

          case 36:
            return (
              <div>
                With the exception of proceeding to the Final Phase,{" "}
                <span className="goldText">
                  there is no fixed order or limit to these actions
                </span>
                . The Initiator can freely alternate between using tactics,
                activating cards, and activating unit abilities, as long as they
                meet the conditions and costs.
              </div>
            );

          case 37:
            return (
              <div>
                Let’s start by using a tactic.
                <br /> <br />
                Tactics are used by both Sovereigns and units to perform
                tactical actions. Each tactic provides a unique set of options.
              </div>
            );

          case 38:
            return (
              <div>
                Tactics are displayed to the right of the board, between the
                Sovereigns’ skill repertoires.
                <br /> <br />
                Click on the Advance tactic.
              </div>
            );

          case 39:
            return (
              <div>
                As a Sovereign, you will mainly use the Advance tactic to deploy
                a pawn on a zone inside your frontier.
                <br /> <br />
                <span className="goldText">
                  The frontier initially consists of the first 3 rows of your
                  side of the board.
                </span>{" "}
                It can be expanded by purchasing upgrades in the Bounty Phase.
              </div>
            );

          case 40:
          case 41:
            return <div>Click on Deploy Pawn.</div>;

          case 42:
            return (
              <div>
                Zones eligible for deployment will have an opaque blue color;
                clicking on them would instantly deploy the pawn in their
                location.
                <br /> <br />
                In case you change your mind, you can press Cancel near the
                top-left corner of the board.
              </div>
            );

          case 43:
            return (
              <div>
                Deploy a pawn on the 3rd row and column.
                <br /> <br />
                As a reminder, units are deployed with 1 HP and Aether.
              </div>
            );

          case 44:
            return (
              <div>
                Tactics are consumed when performing the actions, preventing
                further usage.
                <br /> <br />
                That said, the Mobilize tactic provides 3 instances.{" "}
                <span className="goldText">
                  Performing actions with this tactic consumes its instances
                  rather than its entirety.
                </span>{" "}
                To illustrate, click on the Mobilize tactic.
              </div>
            );

          case 45:
            return (
              <div>
                You can use 2 Mobilize instances to draw 1 skill.
                <br /> <br />
                Note: These instances must come from a single source. In other
                words, you are not allowed to use instances from 2 different
                Mobilize tactics.
              </div>
            );

          case 46:
          case 47:
            return <div>Draw a skill.</div>;

          case 48:
            return (
              <div>
                Units can also use tactics to perform their own actions.
                <br /> <br />
                For the purposes of this demonstration, your tactics will be
                refreshed.
              </div>
            );

          case 49:
            return (
              <div>
                Click on your top-center pawn to open their menu, then click on
                the top-right button.
              </div>
            );

          case 50:
          case 50.1:
            return (
              <div>
                Units can perform 3 different tactical actions, each of which
                requires specified tactics. As mentioned earlier, these present
                overlaps.
                <br /> <br />
                Select Traverse.
              </div>
            );

          case 51:
          case 52:
            return (
              <div>
                Units can use any tactic (except Invoke) to{" "}
                <span className="goldText">traverse</span>, which is a keyword
                that means “
                <span className="goldText">move to a vacant adjacent zone</span>
                ”.
                <br /> <br />
                Click on the Advance tactic to use it.
              </div>
            );

          case 53:
            return (
              <div>
                As with deployment, zones eligible for movement will have an
                opaque blue color. Also note that in case you change your mind,
                you can press Cancel.
                <br /> <br />
                Click on the zone ahead of your pawn to make them move.
              </div>
            );

          case 54:
            return (
              <div>
                As with Advance, units can traverse via Mobilize. And since it
                has 3 instances, it allows up to 3 units to move.
              </div>
            );

          case 55:
            return (
              <div>
                Let’s make your pawn use a tactic again.
                <br /> <br />
                Open their menu, then click on the top-right button.
              </div>
            );

          case 56:
          case 56.1:
            return <div>Click on Traverse again.</div>;

          case 57:
          case 58:
          case 59:
            return (
              <div>
                This time, click on the Mobilize tactic.
                <br /> <br />
                Then make them move forward once more.
              </div>
            );

          case 60:
            return (
              <div>
                <span className="goldText">
                  Units cannot use the same Mobilize tactic more than once.
                </span>{" "}
                Though your Mobilize has 2 remaining instances, your topmost
                pawn is barred from using it. (Clarification: A unit is allowed
                to traverse twice using 2 different Mobilize tactics.)
              </div>
            );

          case 61:
            return (
              <div>
                To illustrate this point, reopen that pawn’s tactics menu.
              </div>
            );

          case 62:
          case 62.1:
            return <div>Click on Traverse again.</div>;

          case 62.2:
            return (
              <div>
                As you can see, Mobilize cannot be selected despite its 2
                remaining instances.
                <br /> <br />
                Press Return.
              </div>
            );

          case 63:
            return (
              <div>
                The other tactics and tactical actions will be discussed in a
                different tutorial. That said, players can access the{" "}
                <span className="goldText">Tactics Guide</span> by clicking on
                the{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="question-icon3"
                  style={{ fill: "#ffffe9" }}
                >
                  {" "}
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />{" "}
                </svg>{" "}
                icon at the top-right corner of the tactics.
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
            return (
              <div>
                You still have 2 Mobilize instances, which can be used to draw 1
                skill or move up to 2 more units. However, you don't need to use
                them immediately. As mentioned earlier, you can freely alternate
                between using tactics and cards.
                <br /> <br />
                On that note, let’s activate an Avelhem.
              </div>
            );

          case 66:
          case 67:
            return (
              <div>
                Avelhems are cards primarily used to ascend pawns to Scions. To
                use an Avelhem, raise your hand by clicking on any of its cards.
                Once your hand is raised, click on the specific card you want to
                activate.
                <br /> <br />
                In this case, click on the Mana Avelhem.
              </div>
            );

          case 68:
            return <div>Click on Activate.</div>;

          case 69:
            return (
              <div>
                When activated, cards are displayed on the left side of the
                board.
                <br /> <br />
                As per the Avelhem’s effect, you must select a pawn to ascend.
                Zones containing eligible units will be colored an opaque blue.
                Click on your topmost pawn.
              </div>
            );

          case 70:
            return (
              <div>
                <span className="goldText">
                  Cards are sent to their respective vestige (discard pile) when
                  they conclude their effects
                </span>
                . Vestiges are located beside their corresponding repertoire.
                <br /> <br />
                <span className="goldText">
                  Only the vestige’s owner can view its contents
                </span>{" "}
                (by clicking it); however, the number of cards it contains is
                known to everyone.
              </div>
            );

          case 71:
            return (
              <div>
                <span className="goldText">
                  Ascending pawns to Scions is the game’s core feature.
                </span>{" "}
                Pawns can only use tactics to move and attack, while Scions can
                also activate skill cards and abilities that thematically apply
                their powers.
                <br /> <br />
                Speaking of which, let’s activate an ability.
              </div>
            );

          case 72:
            return (
              <div>
                Click on your Mana Scion to open their menu. Notice the addition
                of 2 buttons. Now that your unit is a Scion, they have access to
                skills and abilities.
                <br /> <br />
                Click on the bottom-right button to open their ability menu.
              </div>
            );

          case 73:
            return (
              <div>
                Abilities are special actions available to Scions. Each Scion
                class has 1 exclusive ability.
                <br /> <br />
                Some abilities require tactics to activate. In such cases, the
                tactics would appear below the ability’s name, similar with
                tactical actions.
              </div>
            );

          case 74:
          case 75:
            return <div>Activate Amplify Aura.</div>;

          case 76:
            return (
              <div>
                Amplify Aura allows a Mana Scion to convert their own or their
                adjacent ally’s Aether into a Shield that lasts 2 turns. (It
                also has an optional second effect, which will be ignored for
                now as it is unapplicable.)
                <br /> <br />
                Like cards, activated abilities are displayed at the left of the
                board. Ability cards are for visual reference only; they are not
                game components.
              </div>
            );

          case 77:
            return (
              <div>
                Click on your Mana Scion to make them recipient of Amplify
                Aura’s effect.
              </div>
            );

          case 78:
            return (
              <div>
                Notice that the Mana Scion’s Aether icon (the winged diamond)
                has disappeared, while a silver shield icon has appeared.
              </div>
            );

          case 79:
            return (
              <div>
                In addition to these visual indicators, you can view a unit’s
                information by clicking on the top-left button of their menu.
                <br /> <br />
                Click on your Mana Scion, then click on their information
                button.
              </div>
            );

          case 80:
            return (
              <div>
                The unit’s relevant information is displayed here. For example,
                you can see their HP, Aether (or lack thereof), and their
                Shield.
              </div>
            );

          case 81:
            return (
              <div>
                It also serves as a reference guide, listing their abilities,
                talents, and even the skills they can activate. (Feel free to
                click on these cards to enlarge them for viewing.)
              </div>
            );

          case 82:
            return <div>Close the unit’s information page.</div>;

          case 83:
            return (
              <div>
                <span className="goldText">
                  Scions can use their ability up to once per turn.
                </span>{" "}
                <br /> <br />
                Therefore, you will have to wait until your next turn before
                your Mana Scion can activate Amplify Aura again.
              </div>
            );

          case 84:
          case 85:
            return (
              <div>
                Let’s activate another Avelhem card.
                <br /> <br />
                Raise your Avelhem hand, then click on your Water Avelhem.
              </div>
            );

          case 86:
            return <div>Click Activate.</div>;

          case 87:
            return (
              <div>
                Click on your rightmost pawn to ascend them into a Water Scion.
              </div>
            );

          case 88:
            return (
              <div>
                <span className="goldText">
                  Units possess talents, which are passive effects that
                  automatically activate when applicable.
                </span>{" "}
                In the case of Water Scions, their Kleptothermy talent activates
                the moment they ascend.
                <br /> <br />
                (Note: As with ability cards, talent cards are just visual
                references and not game components.)
              </div>
            );

          case 89:
          case 90:
            return (
              <div>
                Kleptothermy allows Water Scions to either restore an ally’s
                Aether or purge it if they are a foe.
                <br /> <br />
                Select the first option.
              </div>
            );

          case 91:
            return (
              <div>
                You must now select the recipient of Kleptothermy’s effect. As
                always, zones containing eligible units will have an opaque blue
                color.
                <br /> <br />
                Click on your Mana Scion to restore their Aether.
              </div>
            );

          case 92:
            return (
              <div>
                Restoring a Mana Scion’s Aether activates their Overload talent,
                which allows you to draw a skill.
              </div>
            );

          case 93:
            return <div>Select the Draw option.</div>;

          case 94:
            return (
              <div>
                <span className="goldText">
                  Tip: The sequence of your actions can matter.
                </span>{" "}
                <br /> <br />
                Had you ascended your pawn into a Water Scion before activating
                the Mana Scion’s ability, the latter would be lacking their
                Aether at this moment.
              </div>
            );

          case 95:
            return (
              <div>
                We’ve discussed tactics and abilities. Now let’s go through
                skills.
                <br /> <br />
                Skills are cards that enable Sovereign and units to perform
                special actions.
              </div>
            );

          case 96:
            return (
              <div>
                <span className="goldText">
                  Skills can be activated only by those that match their facet
                </span>
                , which is indicated by the icon in the card’s top-right corner.
                <br /> <br />
                Surge is a Mana skill; thus, its activation is exclusive to Mana
                Scions.
              </div>
            );

          case 97:
            return (
              <div>
                Conversely, a skill like Chain Lightning is exclusive to
                Lightning Scions.
              </div>
            );

          case 98:
            return (
              <div>
                Sovereign skills’ facets are represented by a crown rather than
                a unit’s icon. Like Avelhem cards, these are activated by the
                Sovereigns directly from their hand.
              </div>
            );

          case 99:
            return (
              <div>
                Let’s activate a skill.
                <br /> <br />
                Open your Mana Scion’s menu, then click on the bottom-left
                button.
              </div>
            );

          case 100:
            return (
              <div>
                The display filters your hand to show only skills that belong to
                the Scion’s class. If circumstances prevent the activation of a
                skill, the card will be grayed out.
                <br /> <br />
                (Feel free to click on the magnifying glass icon on a card to
                enlarge it for viewing. You can then click anywhere to close
                it.)
              </div>
            );

          case 101:
          case 102:
            return <div>Activate Surge.</div>;

          case 103:
          case 104:
            return (
              <div>
                Surge requires the activator to spend their Aether to traverse
                or strike. (Fortunately, clever sequencing of effects had
                restored your Mana Scion’s Aether.)
                <br /> <br />
                Select Strike.
              </div>
            );

          case 105:
            return (
              <div>
                Strike is a keyword that has 3 steps:
                <br />
                1. Target an adjacent foe. <br />
                2. Attack them. <br />
                3. If the damage was lethal, move into the zone they were
                occupying.
              </div>
            );

          case 106:
            return (
              <div>
                Attacking a unit reduces its HP by an amount equal to the
                attack’s AP (Attack Power).
                <br /> <br />
                Both HP and AP have a default value of 1; therefore, it normally
                takes a single attack to deplete a unit’s HP.
              </div>
            );

          case 107:
            return <div>Click on the only foe within striking range.</div>;

          case 108:
            return (
              <div>
                <span className="goldText">
                  When a unit’s HP is reduced to 0, they are eliminated and
                  removed from the board.
                </span>
                <br /> <br />
                Furthermore, the attacker’s Sovereign is awarded 1 BP, while
                their opponent receives 2 DP. Consequently, you now have 1 BP,
                and your opponent has 5 DP.
              </div>
            );

          case 109:
            return (
              <div>
                As per the 3rd step of strike, your Mana Scion has moved into
                the zone that the pawn was occupying.
                <br /> <br />
                Surge then concludes its effect and is sent to the vestige
                (discard pile).
              </div>
            );

          case 110:
            return (
              <div>
                Oh, why is your Mana Scion emitting a dark aura, you ask?
                <br /> <br />
                Let’s check their information page.
              </div>
            );

          case 111:
            return (
              <div>
                <em>
                  “To wield an Avelhem is to become a steward of Creation. And
                  what greater sin is there than destroying the Maker’s
                  beloved?”
                </em>
                <br /> <br />
                <span className="goldText">
                  When a Scion (not pawn) eliminates another unit, they are
                  punished with the Anathema status for 2 turns.
                </span>{" "}
                This is represented by the cascading dark purple aura.
              </div>
            );

          case 112:
            return (
              <div>
                Anathema disables a Scion’s Avelhem, stripping them of their
                abilities, talents, and skills. It also prevents them from
                attacking via any means.
                <br /> <br />
                Simply put, Scions punished with Anathema are muted and only
                allowed to move.
              </div>
            );

          case 113:
            return <div>Close the unit’s information page.</div>;

          case 114:
            return (
              <div>
                And that wraps up the Execution Phase.
                <br /> <br />
                <span className="goldText">
                  As a reminder, your objective is to move a unit onto your
                  opponent’s base.
                </span>{" "}
                For demonstration purposes, a Wind Scion has been deployed 1 row
                away from their base.
              </div>
            );

          case 115:
          case 116:
          case 116.1:
          case 117:
          case 118:
          case 119:
            return (
              <div>
                Use 1 instance of your Mobilize tactic to move that Wind Scion
                forward.
                <br /> <br />
                Open their tactics menu, then click on traverse, Mobilize, and
                their destination.
              </div>
            );

          case 120:
            return (
              <div>
                Your unit has reached the opponent’s base. However,{" "}
                <span className="goldText">
                  scoring does not occur until the end of the Final Phase
                </span>
                .
                <br /> <br />
                And without further ado, click on End Turn.
              </div>
            );

          case 121:
            return <div>Confirm that you want to end.</div>;

          case 122:
            return (
              <div>
                In the Final Phase, the Initiator winds up their turn. Unused
                tactics are forfeited, cards exceeding the hand limit are
                discarded, and the durations of their units’ statuses tick down.
                <br /> <br />
                You had 1 remaining Mobilize instance, which has now expired.
              </div>
            );

          case 123:
          case 124:
          case 125:
            return (
              <div>
                You must discard cards until your hand contains no more than 8
                skills and 0 Avelhems. (These limits can be increased by
                spending BP.)
                <br /> <br />
                For demonstration purposes, 4 skills were added to your hand,
                bringing the total to 10. Select 2 excess cards to discard.
              </div>
            );

          case 126:
            return (
              <div>
                After excess cards are discarded, the status durations of the
                Initiator’s units decrease by 1.
                <br /> <br />
                Your Mana Scion’s Shield and Anathema have both dropped from 2
                turns to 1. Their Shield icon is now blinking, and the aura of
                their Anathema has dimmed.
              </div>
            );

          case 127:
            return (
              <div>
                Lastly, the game performs a check: If any of the Initiator’s
                units are occupying the opponent’s base for the first time, they
                will score and award their Sovereign 3 BP, while their opponent
                will receive 6 DP.
              </div>
            );

          case 128:
            return (
              <div>
                Units that have scored cannot be interacted with, but they
                remain in play and count towards to their owner’s unit limit.
                (Sovereigns can control up to 8 units at a time, and no more
                than 2 allied Scions may share the same class.)
                <br /> <br />
                This has placed you in a slight disadvantage: You are now
                limited to 7 functional units and 1 functional Wind Scion.
                Scoring with a second Wind Scion would render all your Wind
                skills and Avelhems useless.
              </div>
            );

          case 129:
            return (
              <div>
                If scoring causes the Initiator to meet the victory requirement,
                they win the game. Otherwise, the game continues with their
                opponent becoming the Initiator.
                <br /> <br />
                As noted earlier, the victory requirement is automatically set
                to 1, but players may increase it once someone wins.
              </div>
            );

          case 130:
            return <div>Raise the objective to 2.</div>;

          case 131:
            return (
              <div>
                The board is now glowing red, which means it’s your opponent’s
                turn to act.
              </div>
            );

          case 132:
            return (
              <div>
                And that covers the basics. For a deeper understanding of
                mechanics and advanced strategies, refer to the rulebook and
                other tutorials.
                <br /> <br />
                <span className="goldText">End of Overview Tutorial.</span>
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
