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
              "04-01",
              "04-01",
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
              "SB-03",
              "SB-03",
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
              "07-01",
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

      case "fire":
        return {
          activatingUnit: [],
          host: {
            avelhemFloat: 0,
            score: 0,
            avelhemHand: [1, 1],
            fateDefiances: 0,
            units: [
              {
                row: 4,
                fever: 2,
                afflictions: {},
                player: "host",
                enhancements: { ravager: true },
                temporary: {},
                column: 0,
                unitIndex: 0,
                hp: 1,
                unitClass: "Fire Scion",
                virtue: 1,
                boosts: {},
              },
              null,
              {
                virtue: 1,
                player: "host",
                hp: 1,
                unitIndex: 2,
                afflictions: {},
                row: 3,
                unitClass: "Pawn",
                enhancements: {},
                boosts: {},
                temporary: {},
                column: 2,
              },
              {
                player: "host",
                unitIndex: 3,
                boosts: {},
                virtue: 1,
                row: 2,
                temporary: {},
                afflictions: { frostbite: 1 },
                unitClass: "Metal Scion",
                hp: 1,
                column: 1,
                enhancements: {},
              },
            ],
            skillShattered: [],
            skillFloat: 0,
            avelhemVestige: [1, 7, 5, 3],
            displayName: "Gold Player",
            skillHand: [
              "SX-01",
              "SX-01",
              "01-04",
              "01-01",
              "01-02",
              "01-02",
              "SA-02",
              "01-01",
              "02-03",
              "07-04",
            ],
            skillRepertoire: [
              "07-03",
              "02-03",
              "06-03",
              "01-02",
              "SA-03",
              "02-01",
              "SA-04",
              "08-02",
              "SC-04",
              "07-02",
              "01-03",
              "06-01",
              "07-03",
              "06-03",
              "SB-02",
              "02-01",
              "06-01",
              "06-01",
              "08-03",
              "06-04",
              "SB-01",
              "08-02",
              "08-01",
              "SB-02",
              "01-02",
              "08-03",
              "01-03",
              "07-03",
              "SB-05",
              "SC-04",
              "08-03",
              "01-01",
              "07-02",
              "SA-03",
              "07-03",
              "02-03",
              "06-03",
              "07-02",
              "02-03",
              "SA-04",
              "01-03",
              "02-01",
              "02-01",
              "01-01",
              "SC-03",
              "08-03",
              "06-03",
              "06-01",
              "SB-01",
              "01-03",
              "08-02",
              "05-01",
            ],
            avelhemRepertoire: [7, 2, 3, 3, 3, 6, 6, 6, 7, 2, 7, 2, 1, 6],
            skillVestige: [],
            bountyUpgrades: {
              avelhem: 0,
              acquisition: 0,
              coordination: 0,
              frontier: 0,
              victory: 0,
              tactics: 0,
            },
            bountyPoints: 0,
          },
          zones:
            '[[{"id":0,"row":0,"column":0,"player":"guest","unitIndex":5},{"id":1,"row":0,"column":1},{"id":2,"row":0,"column":2},{"id":3,"row":0,"column":3},{"id":4,"row":0,"column":4}],[{"id":5,"row":1,"column":0,"player":"guest","unitIndex":1},{"id":6,"row":1,"column":1,"player":null,"unitIndex":null},{"id":7,"row":1,"column":2,"player":null,"unitIndex":null},{"id":8,"row":1,"column":3,"player":"guest","unitIndex":0},{"id":9,"row":1,"column":4}],[{"id":10,"row":2,"column":0,"player":null,"unitIndex":null},{"id":11,"row":2,"column":1,"player":"host","unitIndex":3},{"id":12,"row":2,"column":2,"player":null,"unitIndex":null},{"id":13,"row":2,"column":3,"player":"guest","unitIndex":4},{"id":14,"row":2,"column":4}],[{"id":15,"row":3,"column":0,"player":null,"unitIndex":null},{"id":16,"row":3,"column":1,"player":null,"unitIndex":null},{"id":17,"row":3,"column":2,"player":"host","unitIndex":2},{"id":18,"row":3,"column":3,"player":null,"unitIndex":null},{"id":19,"row":3,"column":4,"player":null,"unitIndex":null}],[{"id":20,"row":4,"column":0,"player":"host","unitIndex":0},{"id":21,"row":4,"column":1,"player":null,"unitIndex":null},{"id":22,"row":4,"column":2,"player":null,"unitIndex":null},{"id":23,"row":4,"column":3,"player":null,"unitIndex":null},{"id":24,"row":4,"column":4}],[{"id":25,"row":5,"column":0,"player":"guest","unitIndex":3},{"id":26,"row":5,"column":1,"player":"guest","unitIndex":2},{"id":27,"row":5,"column":2,"player":null,"unitIndex":null},{"id":28,"row":5,"column":3,"player":null,"unitIndex":null},{"id":29,"row":5,"column":4}],[{"id":30,"row":6,"column":0,"player":null,"unitIndex":null},{"id":31,"row":6,"column":1,"player":null,"unitIndex":null},{"id":32,"row":6,"column":2,"player":null,"unitIndex":null},{"id":33,"row":6,"column":3},{"id":34,"row":6,"column":4,"player":null,"unitIndex":null}],[{"id":35,"row":7,"column":0},{"id":36,"row":7,"column":1,"player":null,"unitIndex":null},{"id":37,"row":7,"column":2},{"id":38,"row":7,"column":3},{"id":39,"row":7,"column":4}],[{"id":40,"row":8,"column":0,"player":null,"unitIndex":null},{"id":41,"row":8,"column":1},{"id":42,"row":8,"column":2},{"id":43,"row":8,"column":3},{"id":44,"row":8,"column":4}],[{"id":45,"row":9,"column":0},{"id":46,"row":9,"column":1},{"id":47,"row":9,"column":2},{"id":48,"row":9,"column":3},{"id":49,"row":9,"column":4}]]',
          turnPlayer: "host",
          guest: {
            avelhemHand: [],
            skillFloat: 0,
            score: 0,
            skillVestige: ["SX-01", "SX-01", "02-01"],
            bountyPoints: 0,
            bountyUpgrades: {
              tactics: 0,
              coordination: 0,
              victory: 0,
              avelhem: 0,
              acquisition: 0,
              frontier: 0,
            },
            skillShattered: ["02-04"],
            skillHand: [
              "01-03",
              "SC-02",
              "02-02",
              "02-01",
              "05-03",
              "07-02",
              "04-03",
              "SC-04",
            ],
            avelhemRepertoire: [3, 2, 3, 3, 2, 2, 1, 7, 7, 7, 1, 4, 3, 1],
            avelhemVestige: [2, 4, 4, 7, 4, 1],
            fateDefiances: 0,
            units: [
              {
                row: 1,
                unitClass: "Water Scion",
                enhancements: { ward: 0 },
                boosts: {},
                temporary: {},
                unitIndex: 0,
                virtue: 1,
                player: "guest",
                hp: 1,
                column: 3,
                afflictions: { anathema: 0 },
              },
              {
                column: 0,
                afflictions: {},
                boosts: {},
                row: 1,
                unitClass: "Fire Scion",
                fever: 2,
                enhancements: {},
                player: "guest",
                virtue: 1,
                unitIndex: 1,
                hp: 1,
                temporary: {},
              },
              {
                unitClass: "Land Scion",
                enhancements: {},
                hp: 1,
                column: 1,
                row: 5,
                unitIndex: 2,
                afflictions: {},
                player: "guest",
                temporary: {},
                boosts: {},
                virtue: 1,
              },
              {
                virtue: 1,
                boosts: {},
                unitIndex: 3,
                unitClass: "Land Scion",
                row: 5,
                column: 0,
                enhancements: {},
                hp: 1,
                player: "guest",
                temporary: {},
                afflictions: {},
              },
              {
                temporary: {},
                row: 2,
                enhancements: {},
                virtue: 1,
                hp: 1,
                unitIndex: 4,
                column: 3,
                player: "guest",
                unitClass: "Pawn",
                boosts: {},
                afflictions: {},
              },
              {
                virtue: 1,
                boosts: {},
                row: 0,
                temporary: {},
                unitClass: "Pawn",
                player: "guest",
                column: 0,
                hp: 1,
                unitIndex: 5,
                afflictions: {},
                enhancements: {},
              },
            ],
            displayName: "Silver Player",
            avelhemFloat: 0,
            skillRepertoire: [
              "07-03",
              "07-03",
              "02-03",
              "02-01",
              "07-01",
              "SA-02",
              "07-03",
              "07-01",
              "SB-01",
              "07-02",
              "01-02",
              "SB-04",
              "01-04",
              "01-01",
              "01-02",
              "SA-02",
              "SB-03",
              "02-03",
              "04-04",
              "04-03",
              "SA-03",
              "02-03",
              "02-01",
              "08-01",
              "07-02",
              "05-01",
              "05-01",
              "02-02",
              "02-02",
              "04-01",
              "07-01",
              "04-03",
              "SA-04",
              "SA-03",
              "01-03",
              "01-01",
              "04-03",
              "07-01",
              "SB-03",
              "SB-01",
              "07-04",
              "07-02",
              "01-02",
              "02-02",
              "07-03",
              "04-01",
              "SA-04",
              "SB-04",
              "01-01",
              "08-01",
            ],
          },
          turnPhase: "Execution",
          tactics: [
            { limit: 1, stock: 1, face: "Invoke" },
            { stock: 3, face: "Mobilize", limit: 3 },
          ],
          activatingTarget: [],
          winObjective: 1,
          activatingSkill: [],
          turnCount: 0,
          winner: null,
          currentResolution: [{ resolution: "Execution Phase" }],
          activatingResonator: [],
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
                The game unfolds on a board with 10 rows and 5 columns.
                Sovereigns are equipped with 2 repertoires (decks), consisting
                of 60 skills and 20 Avelhems, respectively.
                <br />
                <br />
                <em>
                  <strong>
                    (Reminder: In this demo, objects that you need to click will
                    be enveloped in a green glow.)
                  </strong>
                </em>
              </div>
            );

          case "Learn1.2":
            return (
              <div>
                Sovereigns must designate the gold and silver pieces between
                themselves. Either can play the first turn as determined by any
                reasonable means. For this demo, gold will play first.
                <br />
                <br />
                In this virtual simulator, the host always takes gold.
              </div>
            );

          case "Learn1.3":
            return (
              <div>
                At the start of the game, Sovereigns set their FD counters to 3
                and deploy pawns on the first, third, and fifth columns on the
                fourth row of their side of the board. They then shuffle their
                repertoires and draw 4 skills.
              </div>
            );

          case "Learn1.5":
            return (
              <div>
                Furthermore, they add 2 copies of the “Transcendence” skill to
                their hands. The first Sovereign, however, immediately places
                one of them in their vestige (discard pile).
              </div>
            );

          case "Learn1.6":
            return (
              <div>
                The <strong>Initiator</strong> refers to the Sovereign whose
                turn it currently is. Each turn has 6 phases.
                <br />
                <br />
                The first is the <strong>Acquisition Phase</strong>, which
                offers the Initiator the opportunity to bolster their resources
                by reinforcing their army or drawing cards.
              </div>
            );

          case "Learn1.7":
          case "Learn1.8":
            return (
              <div>
                There are 3 options available, and these can be upgraded to
                provided additional effects.
                <br />
                <br />
                Since you already have pawns on the board and skills in your
                hand, select the Beseech option to draw 2 Avelhems.
              </div>
            );

          case "Learn1.9":
            return (
              <div>
                Up next is the <strong>Bounty Phase</strong>, where the
                Initiator can spend BP (Bounty Points) on long-term upgrades,
                such as those in the Acquisition Phase.
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
                As you currently have 0 BP, proceed to the next phase.
              </div>
            );

          case "Learn1.11":
          case "Learn1.12":
            return (
              <div>
                The third Phase is the <strong>Coordination Phase</strong>,
                which provides the Initiator with tactics. Sovereigns and units
                expend tactics to perform tactical actions.
                <br />
                <br />
                This phase offers 3 options, varying in control and cost. As it
                is free, Sovereigns will more than often opt to Assent.
              </div>
            );

          case "Learn1.13":
            return (
              <div>
                <strong>Assent</strong> rolls 2 dice. Though cubic, these dice
                have 4 different faces. Advance and Mobilize are more likely to
                appear as they are present on 2 sides each. Each tactic offers a
                set of options with overlaps to some degree. These will be
                demonstrated in detail as they come along.
              </div>
            );

          case "Learn1.14":
            return (
              <div>
                The <strong>Defiance Phase</strong> allows the Initiator to
                spend FD (Fate Defiance) on immediate yet short-term benefits,
                such as rerolling unfavorable tactics.{" "}
                <strong>
                  FD is primarily obtained as consolation when an ally unit is
                  eliminated.
                </strong>{" "}
                The Initiator may choose at most 1 benefit, even though they
                have sufficient FD for multiple.
              </div>
            );

          case "Learn1.15":
            return (
              <div>
                Sovereigns start the game with 3 FD. That said, press Skip for
                now.
              </div>
            );

          case "Learn1.16":
            return (
              <div>
                And now comes the <strong>Execution Phase</strong>, where the
                Initiator’s preparations from the previous phases come into
                fruition!
              </div>
            );

          case "Learn1.17":
            return (
              <div>
                During the Execution Phase, the Initiator and their units can
                utilize cards they have accumulated and tactics they have
                obtained. The latter can also activate innate abilities.
              </div>
            );

          case "Learn1.18":
            return (
              <div>
                Let’s start by activating an Avelhem.{" "}
                <strong>
                  Avelhems are activated by Sovereigns, and they are primarily
                  used to ascend pawns into Scions of a specific class.
                </strong>
                <br />
                <br />
                To activate an Avelhem, click on your hand to raise it. Then
                click on the specific card to be activated.
              </div>
            );

          case "Learn1.19":
          case "Learn1.20":
          case "Learn1.20.01":
            return (
              <div>
                Activate your Mana Avelhem to ascend your center pawn into a
                Mana Scion.
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
                vestige (discard pile). You are allowed to view the contents of
                your own vestiges at any time.
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
                Activate your Land Avelhem to ascend your right pawn into a Land
                Scion.
              </div>
            );

          case "Learn1.24":
            return (
              <div>
                Units possess <strong>class-exclusive talents</strong>, which
                are passive effects that automatically activate when applicable.
                In the case of Land Scions, their{" "}
                <strong>“Mountain Stance”</strong> talent activates upon their
                debut (as they enter play via ascension or deployment).
              </div>
            );

          case "Learn1.25":
          case "Learn1.26":
            return (
              <div>
                Mountain Stance is a modular effect; pick the second choice,
                which allows you to spend 1 skill to search for
                “Crystallization”.
              </div>
            );

          case "Learn1.27":
            return (
              <div>
                Spending a skill would discard it from the hand, so it is
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
                <br />
                <br />
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
                <strong>Search</strong> in an effect where a Sovereign views the
                contents of their repertoire in an attempt to locate a card and
                add it to their hand (unless stated otherwise). Searches are
                subject to restrictions; a search is considered successful if it
                yields an eligible card. (Ineligible cards will be greyed out.)
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
                <br />
                <br />
                Click on the Advance tactic below.
              </div>
            );

          case "Learn1.35":
          case "Learn1.36":
            return (
              <div>
                As a Sovereign, you have these 3 options when utilizing an
                Advance tactic. In most situations, deploying a pawn would be
                the only available option.
                <br />
                <br />
                <strong>
                  Note: Sovereigns can have up to 8 units on the board.
                </strong>
              </div>
            );

          case "Learn1.37":
            return (
              <div>
                The <strong>frontier</strong> refers to the set of zones (tiles)
                where you can deploy your units. The frontier initially consists
                of 3 rows, starting from your side of the board. But, as you may
                have noticed during the Bounty Phase, it can be expanded to 6
                rows.
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
                Once utilized, tactics are expended and are no longer available
                for further use.
                <br />
                <br />
                That said, the Mobilize tactic has a quirk that allows multiple
                (but still limited) usage.
              </div>
            );

          case "Learn1.46":
            return (
              <div>
                Unlike other tactics, Mobilize comes with{" "}
                <strong>3 instances</strong> that can be used either separately
                or simultaneously.
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
                You have depleted your tactics. Now let us go over skill cards.
                <br />
                <br />
                Skill cards have 2 icons on their upper left corner: the aspect
                and method.
              </div>
            );

          case "Learn1.65":
            return (
              <div>
                The <strong>aspect</strong> identifies who can activate the
                skill, be it the Sovereign themself or a specific Scion.
                <br />
                <br />
                The <strong>method</strong> indicates the nuances of activation.
              </div>
            );

          case "Learn1.66":
            return (
              <div>
                The Crystallization skill you searched earlier is a standard
                (method) Land (aspect) skill.
                <br />
                <br />
                Displaying a circular sapphire icon,{" "}
                <strong>standard skills</strong> exhibit rudimentary features.
                Simply put, they can be activated during one’s Execution Phase.
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
                match the unit. Click on Crystallization and activate it.
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
                increases the activator’s HP (Health Points) to 2.
                <br />
                <br />
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
                enhancement (positive status) that protects the unit from the
                next attack they would receive.
              </div>
            );

          case "Learn1.72":
          case "Learn1.73":
            return <div>Spend “Sow and Reap”.</div>;

          case "Learn1.74":
            return (
              <div>
                There is nothing left to do in this Execution Phase. But before
                moving on, let us go over another unit feature.
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
                unit, including their innate talents and abilities.
                <br />
                <br />
                (Abilities will be demonstrated next turn.)
              </div>
            );

          case "Learn1.76":
            return (
              <div>
                You can also find their status conditions with their definitions
                and durations.
                <br />
                <br />
                Speaking of statuses, visual indicators will be present on the
                affected units; for example, a silver icon at the bottom right
                corner of your Land Scion is representing their Shield.
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
                selectively discard the excess. <br />
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

          case "Learn1.80":
            return <div>Click on End Turn.</div>;

          case "Learn1.81":
            return (
              <div>
                The board has turned from red to black.{" "}
                <strong>
                  When the board is red, the game proceeds through your inputs
                </strong>
                , primarily when it is your turn -- but there are occasions when
                Sovereigns are prompted during their opponent’s turn.
                Conversely, <strong>black corresponds to your opponent.</strong>
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
                <strong>Conduction</strong>, the debut talent of Metal Scions,
                allows them to search for then float “Magnetic Shockwave”, which
                is the standard skill of their class. This is similar to the
                Mountain Stance talent of Land Scions, but there are some
                differences. First, Conduction is not modular; it has no
                alternate effect.
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

          case "Learn1.104":
            return (
              <div>
                Now let us go over the second skill method.
                <br /> <br />
                Displaying a bichromatic alexandrite icon,{" "}
                <strong>resonant skills</strong> synergize to provide additional
                effects.
              </div>
            );

          case "Learn1.105":
            return (
              <div>
                Like standard skills, resonant skills can be activated only
                during one’s own Execution Phase. Exclusive to these skills is
                their <strong>resonance</strong>, which is an additional effect
                that applies only when the skill is resonated. Activating a
                resonant skill without resonating it would apply only its
                primary sub-effects.
              </div>
            );

          case "Learn1.106":
          case "Learn1.107":
          case "Learn1.108":
          case "Learn1.109":
            return (
              <div>
                To resonate a skill, activate it with a resonator, which is
                either an identical copy or a valid substitute.
                <br /> <br />
                Make your Metal Scion resonate their “Reinforce” skill.
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
                your Metal Scion has gained 1 Sharpness (indicated by the grey
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
                Furthermore, you retained (returned to hand) the Reinforce you
                activated instead of discarding it. That said, the other
                Reinforce used as the resonator was still discarded.
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
                said, some Scion classes can nonetheless utilize it.
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
                skills, but they do not rely on the possession of specific
                cards.
              </div>
            );

          case "Learn1.122":
          case "Learn1.123":
            return (
              <div>
                Some skills, such as Metal Scion’s Brandish, require the usage
                of specific tactics. In such cases, the requirement is displayed
                under its name.
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
                This will shuffle your repertoire. But as mentioned earlier, the
                floating Magnetic Shockwave will retain its position.
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
                Sovereigns cannot use the Assault tactic.
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
                attack eliminates the enemy, they move to the zone the latter
                was occupying.
              </div>
            );

          case "Learn1.131":
            return (
              <div>
                When a unit suffers an attack, they lose HP equal to its AP
                (Attack Power). By default, attacks have 1 AP; thus, units tend
                to be eliminated by a single attack. Metal Scions have a talent
                that increases the AP of their attacks for every Sharpness they
                possess.
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
                the latter. <strong>Targeting</strong> occurs when an enemy unit
                is designated as the recipient of an attack or status
                affliction. And it so happens that Mana Scions have a skill that
                can be activated in response.
              </div>
            );

          case "Learn1.137":
            return (
              <div>
                Displaying a triangular ruby icon,{" "}
                <strong>contingent skills</strong> enable timely reactions to
                certain events.
                <br /> <br />
                (Reminder: You can view a card by clicking on its magnifying
                glass icon.)
              </div>
            );

          case "Learn1.138":
            return (
              <div>
                Exclusive to contingent skills is the{" "}
                <strong>contingency</strong> property, which specifies
                conditions for its activation. Unlike other skills, contingent
                skills can be activated during any phase of either Sovereign’s
                turn, but only if the contingency is satisfied.
              </div>
            );

          case "Learn1.139":
          case "Learn1.140":
          case "Learn1.141":
            return (
              <div>
                “Aegis”, the contingent skill of Mana Scions, can be activated
                when they or an adjacent ally is targeted.
                <br />
                <br />
                Activate it.
              </div>
            );

          case "Learn1.142":
            return (
              <div>
                Aegis has 2 sub-effects, the first of which draws a skill if the
                activator is the targeted unit. (This has been automatically
                applied: you have drawn “Tea For Two”)
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
                In this situation, Shield suffices for protection.
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
                contingent skill relevant to the situation: Frenzy Blade can be
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
                another Sharpness, evinced by the second grey diamond.
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
                Mana skill (burst is the fourth and final skill method).
                <br /> <br />
                Search for Aegis.
              </div>
            );

          case "Learn1.161":
            return (
              <div>
                Only 1 contingent skill can be activated in response to a
                triggering event. In the event that both Sovereigns possess
                eligible contingent skills, the Initiator yields priority to
                their opponent.
              </div>
            );

          case "Learn1.162":
            return (
              <div>
                When an event triggers both a talent and a contingent skill, the
                former activates first. The activation of a talent does not
                hinder the activation of a contingent skill.
              </div>
            );

          case "Learn1.163":
          case "Learn1.164":
            return (
              <div>
                For example, now that Ambiance Assimilation has concluded, you
                can activate “Vengeful Legacy”, a contingent Sovereign skill
                that is triggered when an ally Scion is eliminated. It allows
                you to ascend an ally pawn within 2 spaces from the eliminated
                Scion to the same class.
              </div>
            );

          case "Learn1.164.1":
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
                Ravager is visually represented by a rising red aura. Unlike
                Shield and Ward, it has an indefinite duration.
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
                Two that was floated via Vengeful Legacy.
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
                Press The Attack is a resonant Sovereign skill that converts 2
                Advance tactics into 2 Assaults. This effect is mandatory; thus,
                you must have 2 unused Advance tactics to activate it.
              </div>
            );

          case "Learn1.191":
            return (
              <div>
                You do not have a second copy of Press The Attack, but you can
                still resonate it with a valid substitute.
              </div>
            );

          case "Learn1.192":
          case "Learn1.193":
            return (
              <div>
                Tea For Two is a standard Sovereign skill with a{" "}
                <strong>substitute</strong> property that allows it to serve as
                a resonator for any Avelhem or resonant skill instead.
                <br />
                <br />
                (Reminder: You can click on the magnifying glass icon to view
                the card.)
              </div>
            );

          case "Learn1.194":
            return (
              <div>
                As per the second sub-effect of Press The Attack, draw 2
                Avelhems.
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
                Water Scions. Speaking of which, promote your pawn by resonating
                your Water Avelhems.
              </div>
            );

          case "Learn1.212":
            return (
              <div>
                The debut talent of Water Scions allows them to either restore a
                friendly unit’s Virtue or remove that of an enemy.
                <br />
                <br />
                (When units are deployed, they are automatically granted Virtue,
                the applications of which will be discussed later.)
              </div>
            );

          case "Learn1.213":
          case "Learn1.214":
          case "Learn1.215":
            return (
              <div>
                Since all your units still possess their Virtues, purge the
                Virtue of the enemy Metal Scion.
              </div>
            );

          case "Learn1.216":
            return (
              <div>
                The visual indicator of a Virtue is found at the bottom center
                of a unit (to the right of the heart-shaped HP icon). As the
                Metal Scion no longer possesses their Virtue, their icon is
                absent.
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
                <strong>burst skills</strong> unleash powerful effects. Like
                standard and resonant skills, they can only be activated during
                the Execution Phase. What distinguishes them is the fact that{" "}
                <strong>
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
                hand and add up to 3 Water skills among them to your hand.
                <br />
                <br />
                Inspections function similar to searches, but they are limited
                to a specified number of cards, starting from the top of the
                repertoire.
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
                Up next is an explanation of Virtues.{" "}
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
                As mentioned earlier, units inherently possess a Virtue.
                <br />
                <br />
                <strong>
                  Virtues are primarily used to perform and mitigate
                  Virtue-blasts.
                </strong>{" "}
                Scions (not pawns) can perform a Virtue-blast via the Advance
                tactic.
              </div>
            );

          case "Learn1.256":
            return (
              <div>
                When a unit performs a <strong>Virtue-blast</strong>, they
                expend their Virtue to blast an enemy. When the attack connects,
                the victim is given the option to mitigate it.
              </div>
            );

          case "Learn1.257":
            return (
              <div>
                <strong>Mitigating a Virtue-blast reduces its AP by 1.</strong>
                <br />
                <br />
                When a unit mitigates a Virtue-blast, they spend their Virtue
                and transfer it to the attacker. (Muted units cannot spend their
                Virtues; thus, they are most vulnerable to Virtue-blasts.)
              </div>
            );

          case "Learn1.258":
          case "Learn1.259":
          case "Learn1.260":
          case "Learn1.261":
          case "Learn1.262":
            return (
              <div>
                Let’s see it in action. Make your Water Scion Virtue-blast the
                enemy pawn.
              </div>
            );

          case "Learn1.263":
            return <div>Switch player.</div>;

          case "Learn1.264":
            return <div>Opt to reduce the AP.</div>;

          case "Learn1.265":
            return (
              <div>
                Attacks have 1 AP by default; thus, the damage dealt by the
                Virtue-blast was reduced to 0. <br />
                <br />
                Due to the mitigation, the Water Scion regained the Virtue they
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
            return <div>Demo over.</div>;

          ////////////////////
        }
        break;

      case demoGuide.slice(0, 4) === "Fire":
        switch (demoGuide) {
          case "Fire1.1":
          case "Fire1.1.1":
          case "Fire1.1.2":
          case "Fire1.1.3":
          case "Fire1.2":
          case "Fire1.2.01":
            return (
              <div>
                1. Click on your Avelhem hand to raise it, then click on a Fire
                Avelhem; resonate it with the other copy to ascend your pawn.
                <br />
                <br />
                <em>
                  <strong>
                    (Reminder: In this demo, objects that you need to click will
                    be enveloped in a green glow.)
                  </strong>
                </em>
              </div>
            );

          case "Fire1.2.1":
          case "Fire1.3":
            return "2. Flash Fire (their debut talent) will activate. Select “Gain 2 Fevers.” (The other option is not available because there are no Fire skills in your Vestige.) Fever is necessary to activate Fire skills (except their burst).";

          case "Fire1.4":
          case "Fire1.5":
          case "Fire1.6":
            return "3. Switch player, then press skip at the prompt. Then switch back to the first player.";

          case "Fire1.7":
            return "4. Because you resonated an Avelhem, you may either discard or shuffle it back in your repertoire.";

          case "Fire1.8":
          case "Fire1.9":
          case "Fire1.10":
          case "Fire1.11":
          case "Fire1.11.1":
            return "5. Click on the Fire Scion that just ascended and view their abilities (bottom right). Activate “Fiery Heart”, which can cure the Frostbite and Burn of an adjacent ally. This will require you to spend 1 Fever or skill; spend the latter by selecting “Transcendence”.";

          case "Fire1.12":
            return "6. Click on your ally Metal Scion, who is currently afflicted with Frostbite; as per the effect of ”Fiery Heart”, they will be thawed from the ice.";

          case "Fire1.13":
          case "Fire1.14":
            return "7. Click on the Fire Scion again, then activate their other ability: Afterburner. It allows them to strike by expending an Invoke tactic, as well as either 2 Fevers or 1 skill. Without clicking on any cards, click on the “Spend 2 Fevers” button.";

          case "Fire1.15":
            return "8. Click on the enemy pawn to strike them as per Afterburner’s effect.";

          case "Fire1.16":
          case "Fire1.17":
            return (
              <div>
                9. Prompt the same Fire Scion to activate a skill (bottom left).
                Activate their burst skill: Resplendence, which restores their
                Fevers and bolsters their defenses.{" "}
                <em>
                  <strong>
                    (Reminder: You can click on the magnifying glass icon at the
                    top right corner of a card to view it up close.)
                  </strong>
                </em>
              </div>
            );

          case "Fire1.17.1":
            return "10. Resplendence can also ignite an adjacent enemy at the cost of 1 skill; however, the only enemy in range is a Water Scion with Burn immunity. Therefore, press skip. (The Burn affliction will be demonstrated later.)";

          case "Fire1.18":
          case "Fire1.19":
          case "Fire1.20":
          case "Fire1.21":
          case "Fire1.22":
            return "11. Prompt the Fire Scion to activate their standard skill: Ignition Propulsion, which allows them to traverse or strike on demand. Spend “Transcendence” and choose “strike” to attack the Water Scion. Notice that it consumes 1 Fever, evinced by the disappearance of 1 orange crystal.";

          case "Fire1.23":
          case "Fire1.24":
          case "Fire1.25":
            return "12. Prompt the Fire Scion to use a tactic (top right) and select Mobilize. Have them traverse forward into the opponent’s base.";

          case "Fire1.26":
          case "Fire1.27":
          case "Fire1.28":
          case "Fire1.29":
          case "Fire1.29.1":
          case "Fire1.30":
            return "13. Select your other Fire Scion and prompt them to resonate their resonant skill: Conflagration. When selecting a resonator, use “Tea For Two”. You must spend a skill; select “Healing Rain.” Click on either Land Scion to attack them. Likewise, this consumes 1 Fever.";

          case "Fire1.31":
          case "Fire1.32":
            return "14. Normally, resonating “Conflagration” would give you the option to float it. However, because “Tea For Two” was used as the resonator, you drew 1 card instead. That aside, prompt your Metal Scion to activate their burst skill: Arsenal Onslaught. Attack the enemy Fire Scion.";

          case "Fire1.33":
          case "Fire1.34":
          case "Fire1.35":
          case "Fire1.36":
            return "15. Switch player, then prompt the Fire Scion to activate their contingent skill: Blaze of Glory, which is triggered when a Fire Scion is targeted by an attack. Ignite the Metal Scion, then draw 2 skills when given the option.";

          case "Fire1.36.1":
          case "Fire1.37":
          case "Fire1.38":
          case "Fire1.39":
          case "Fire1.40":
            return "16. Activate Vengeful Legacy, a contingent Sovereign skill triggered by the elimination of an ally Scion. Click on the pawn to ascend them to a Fire Scion. Flash Fire will activate; this time, the second option (recovering a Fire skill) is available. Click on it and spend any skill, then recover “Blaze Of Glory.”";

          case "Fire1.40.1":
            return "17. As per Vengeful Legacy’s effect, you may float a skill to grant the Fire Scion the Ravager status. Press skip.";

          case "Fire1.41":
          case "Fire1.42":
          case "Fire1.43":
          case "Fire1.44":
          case "Fire1.45":
            return "18. Switch back to the gold player. You will be given the option to reveal a Metal skill; since you have none, press skip. You will be then given the option to spend a skill to attack again. Spend “Chain Lightning”, then strike the enemy Fire Scion. They have no Fever; thus, “Blaze Of Glory” is not triggered. ";

          case "Fire1.45.1":
          case "Fire1.46":
            return "19. Press “End Turn”, then follow the instructions regarding the application of the Burn affliction on your Metal Scion. Note that the enemy Land Scion is also afflicted with Burn; however, they will suffer its consequences at the end of their turn. This ends the demo.";
        }
        break;
    }
  };

  return { getDemoGameState, getDemoInstructions };
};
