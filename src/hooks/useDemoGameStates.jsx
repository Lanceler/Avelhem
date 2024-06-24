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
            displayName: "Gold Player",
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
            displayName: "Silver Player",
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
              "04-04",
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
          case "Learn1.1":
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
                themselves (in this virtual simulator, the host takes gold).
                Either can play the first turn as determined by any reasonable
                means. For this demo, gold will play first.
              </div>
            );

          case "Learn1.3":
            return (
              <div>
                At the start of the game, Sovereigns set their FD counters to 3
                and deploy pawns on the first, third, and fifth columns on the
                fourth row their side of the board. They then shuffle their
                repertoires and draw 4 skills.
              </div>
            );

          case "Learn1.5":
            return (
              <div>
                Furthermore, the first Sovereign adds 1 “Transcendence” to their
                hand and places the other copy in their vestige (discard pile),
                while the second Sovereign adds both of their copies to their
                hand. (“Transcendence” is a skill that is always part of the
                opening hand, and it is never included in the repertoire.)
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
                offers the Initiator the opportunity to bolsters their resources
                by reinforcing their army or drawing cards.
              </div>
            );

          case "Learn1.7":
          case "Learn1.8":
            return (
              <div>
                There are 3 options available, and these can be upgraded to
                provided additional effects. Since you already have pawns on the
                board and skills in your hand, select the “Bequeath” option to
                draw 2 Avelhems.
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
                As you have 0 BP at the moment, proceed to the next phase.
              </div>
            );

          case "Learn1.11":
          case "Learn1.12":
            return (
              <div>
                The third Phase is the <strong>Coordination Phase</strong>,
                which provides the Initiator with tactics. Tactics are expended
                to perform tactical actions. This phase also provides 3 options,
                but players will find themselves opting to Assent virtually
                every turn.
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
                As previously mentioned, Sovereigns start the game with 3 FD.
                That said, press Skip (at the bottom left corner of the prompt)
                for now.
              </div>
            );

          case "Learn1.16":
            return (
              <div>
                And now comes the <strong>Execution Phase</strong>, where the
                Initiator’s prerations from the previous phases come into
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
                Let’s start by activating an Avelhem. Avelhems are activated by
                Sovereigns, and they are primarily used to ascend pawns into
                Scions.
                <br />
                <br />
                <strong>
                  To activate an Avelhem, click on your hand to raise it. Then
                  click on the specific card to be activated.
                </strong>
              </div>
            );

          case "Learn1.19":
          case "Learn1.20":
            return (
              <div>
                Activate your Mana Avelhem and use it to ascend your center pawn
                into a Mana Scion.
                <br />
                <br />
                <strong>
                  Note: The zones of eligible units will be highlighted in blue.
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
            return (
              <div>
                Activate your Land Avelhem and use it to ascend your right pawn
                into a Land Scion.
              </div>
            );

          case "Learn1.24":
            return (
              <div>
                Units have class-exclusive talents, which are passive effects
                that automatically activate when applicable. In the case of Land
                Scions, their <strong>“Mountain Stance”</strong> talent
                activates upon their debut (as they enter play via ascension or
                deployment).
              </div>
            );

          case "Learn1.25":
          case "Learn1.26":
            return (
              <div>
                Mountain Stance is a modular effect; pick the second option,
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
                Spend Transcendence. <br />
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
                yields an eligible card.
              </div>
            );

          case "Learn1.31":
            return (
              <div>
                Sovereigns are allowed to intentionally fail searches despite
                the existence of a valid card; however, resources spent on
                unsuccessful searches are not refunded. Regardless, repertoires
                are shuffled after every search.
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
                Click on the Advance Tactic below.
              </div>
            );

          case "Learn1.35":
          case "Learn1.36":
            return (
              <div>
                As a Sovereign, you have 3 options when utilizing an Advance
                tactic. In most situations, deploying a pawn would be the only
                available option.
                <br />
                <br />
                (Feel free to take a moment to read the other options.)
              </div>
            );

          case "Learn1.37":
            return (
              <div>
                The <strong>frontier</strong> refers to the set of zones (tiles)
                where you can deploy your units. The frontier initially consists
                of 3 rows. But, as you may have noticed during the Bounty Phase,
                it can be expanded to 6 rows.{" "}
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
                As mentioned earlier, units can also use tactics. Click on your
                Mana Scion to open their personal menu, then click on the
                tactics button at the upper right.
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
                As the objective of the game is to manuever a unit to the
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
                  Note: The zones of eligible destinations will be highlighted
                  in blue.
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
                Unlike other tactics, Mobilize comes with 3{" "}
                <strong>“instances”</strong> that can be used either separately
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
                draw 1 skill.{" "}
                <em>
                  That said, using multiple instances simultaneously is
                  permittable only via a single tactic
                </em>
                : in the event you have 2 Mobilize tactics, you are not allowed
                to draw by using 1 instance from each.
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
                Click on your Mana Scion to open a menu, then click on the
                tactics button at the upper right. This time, click on Mobilize.
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
                Traversing via Mobilize only uses 1 instance. However, a unit
                cannot use the same Mobilize tactic more than once. Therefore,
                your Mana Scion cannot traverse again using the remaing
                instances. That said, in the event you have 2 Mobilize tactics,
                it would be possible for a unit to traverse twice, using 1
                instance from each.
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
                Now let us go over skill cards.
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
                The Crystallization skill you searched earlier is an example of
                a standard (method) Land (aspect) skill.
                <br />
                <br />
                Represented by a circular sapphire, standard skills exhibit
                rudimentary features. Simply put, they can be activated during
                one’s Execution Phase.
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
            return (
              <div>
                This display will filter out any non-Land skills.
                <br />
                <br />
                Click on Crystallization and activate it.
              </div>
            );

          ////////////////////
        }
        break;

      case demoGuide.slice(0, 4) === "Fire":
        switch (demoGuide) {
          case "Fire1.1":
          case "Fire1.2":
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
          case "Fire1.30":
            return "13. Select your other Fire Scion and prompt them to resonate their resonant skill: Conflagration. When selecting a resonator, use “Tea For Two”. You must spend a skill; select “Healing Rain.” Click on either Land Scion to attack them. Likewise, this consumes 1 Fever.";

          case "Fire1.31":
          case "Fire1.32":
            return "14. Normally, resonating “Conflagration” would give you the option to float it. However, because “Tea For Two” was used as the resonator, you drew 1 card instead. That aside, prompt your Metal Scion to activate their burst skill: Arsenal Onslaught. Attack the enemy Fire Scion.";

          case "Fire1.33":
          case "Fire1.34":
          case "Fire1.35":
          case "Fire1.36":
            return "15. Switch player, then prompt the Fire Scion to activate their contingent skill: Blaze of Glory, which is triggered when a Fire Scion is targeted by an attack. Ignite the Metal Scion, then draw 1 skill when given the option.";

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
