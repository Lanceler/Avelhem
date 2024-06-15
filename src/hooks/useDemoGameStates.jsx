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
              "01-01",
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
          turnCount: 9,
          winner: null,
          currentResolution: [{ resolution: "Execution Phase" }],
          activatingResonator: [],
        };

      default:
        return;
    }
  };

  const getDemoInstructions = () => {
    switch (demoGuide) {
      case "Fire1.1":
      case "Fire1.2":
        return "1. In this demo, objects that you need to click will be enveloped in a green glow. Click on your Avelhem hand to raise it, then click on either Fire Avelhem; resonate it with the other copy to ascend your pawn. ";

      case "Fire1.2.1":
      case "Fire1.3":
        return "2. Flash Fire (their debut talent) will activate, giving you 2 options. Select “Gain 2 Fevers.” (The other option is not available because there are no Fire skills in your Vestige.)";

      case "Fire1.4":
      case "Fire1.5":
      case "Fire1.6":
        return "3. Switch player, then press skip at the prompt. Then switch back to the first player.";

      case "Fire1.7":
        return "4. Because you resonated an Avelhem, you may either discard or shuffle it back in your repertoire. You may do either.";

      case "Fire1.8":
      case "Fire1.9":
      case "Fire1.10":
      case "Fire1.11":
        return "5. Click on the Fire Scion that just ascended and view their abilities (bottom right). Activate “Fiery Heart”. This will require you to spend 1 Fever or skill; spend the latter by selecting “Transcendence”.";

      case "Fire1.12":
        return "6. Click on your ally Metal Scion, who is currently afflicted with Frostbite; as per the effect of ”Fiery Heart”, they will be thawed from the ice.";

      case "Fire1.13":
      case "Fire1.14":
        return "7. Click on the Fire Scion again, then activate their other ability: Afterburner. It will require the use of an Invoke tactic, as well as either 2 Fevers or 1 skill. Without clicking on any cards, click on the “Spend 2 Fevers” button.";

      case "Fire1.15":
        return "8. Click on the enemy pawn to strike them as per Afterburner’s effect.";

      case "Fire1.16":
      case "Fire1.17":
        return "9. Prompt the same Fire Scion to activate a skill (bottom left). Activate their burst skill: Resplendence, which restores their Fevers and bolsters their defenses. It can also ignite an adjacent enemy; however, the only one in range is a Water Scion with Burn immunity. Therefore, press skip.";

      case "Fire1.18":
      case "Fire1.19":
      case "Fire1.20":
      case "Fire1.21":
      case "Fire1.22":
        return "10. Prompt the Fire Scion to activate their standard skill: Ignition Propulsion. Spend “Transcendence” and choose “strike” to attack the Water Scion.";

      case "Fire1.23":
      case "Fire1.24":
      case "Fire1.25":
        return "11. Prompt the Fire Scion to use a tactic (top right) and select Mobilize. Have them traverse forward into the opponent’s base.";

      case "Fire1.26":
      case "Fire1.27":
      case "Fire1.28":
      case "Fire1.29":
      case "Fire1.30":
        return "12. Select your other Fire Scion and prompt them to resonate their resonant skill: Conflagration. When selecting a resonator, use “Tea For Two”. You must spend a skill; select “Healing Rain.” Click on either Land Scion to attack them.";

      case "Fire1.31":
      case "Fire1.32":
        return "13. Prompt your Metal Scion to activate their burst skill: Arsenal Onslaught. Attack the enemy Fire Scion.";

      case "Fire1.33":
      case "Fire1.34":
      case "Fire1.35":
      case "Fire1.36":
        return "14. Switch player, then prompt the Fire Scion to activate their contingent skill: Blaze of Glory, which is triggered when a Fire Scion is targeted by an attack. Ignite the Metal Scion, then draw 1 skill when given the option.";

      case "Fire1.36.1":
      case "Fire1.37":
      case "Fire1.38":
      case "Fire1.39":
      case "Fire1.40":
        return "15. Activate Vengeful Legacy, then click on the pawn to ascend them to a Fire Scion. Flash Fire will activate; this time, the second option (recovering a Fire skill) is available. Click on it and spend any skill, then recover “Blaze Of Glory.”";

      case "Fire1.40.1":
        return "16. As per Vengeful Legacy’s effect, you may float a skill to grant the Fire Scion the Ravager status. Press skip.";

      case "Fire1.41":
      case "Fire1.42":
      case "Fire1.43":
      case "Fire1.44":
      case "Fire1.45":
        return "17. Switch back to the gold player. You will be given the option to reveal a Metal skill; since you have none, press skip. You will be then given the option to spend a skill to attack again. Spend “Chain Lightning”, then strike the enemy Fire Scion.";

      case "Fire1.45.1":
      case "Fire1.46":
        return "18. Press “End Turn”, then follow the instructions regarding the application of the Burn affliction. This ends the demo.";

      // space
    }
  };

  return { getDemoGameState, getDemoInstructions };
};
