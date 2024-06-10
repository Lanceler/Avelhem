import React, { useEffect, useState } from "react";
import "./Demo.css";

import Board from "../components/Board";

import InfoPopUp from "../components/modals/InfoPopUp";

export default function Demo() {
  const initialDemoGameState = {
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

  const [demoGameState, setDemoGameState] = useState(
    JSON.parse(JSON.stringify(initialDemoGameState))
  );

  const [currentPlayer, setCurrentPlayer] = useState("host");
  const [infoPopUp, setInfoPopUp] = useState("Demo");

  const changeCurrentPlayer = () => {
    if (currentPlayer === "host") {
      setCurrentPlayer("guest");
    } else {
      setCurrentPlayer("host");
    }
  };

  return (
    <div className="demo-body">
      <h1 className="demo-header">
        Gameplay Demo{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="question-icon"
          onClick={() => setInfoPopUp("Demo")}
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        </svg>
      </h1>
      <div>
        {currentPlayer === "host" && (
          <Board
            gameState={demoGameState}
            userRole={"host"}
            demo={true}
            setDemoGameState={setDemoGameState}
          />
        )}

        {currentPlayer === "guest" && (
          <Board
            gameState={demoGameState}
            userRole={"guest"}
            demo={true}
            setDemoGameState={setDemoGameState}
          />
        )}

        <button
          className="choiceButton demo-switch-button"
          onClick={() => changeCurrentPlayer()}
        >
          Switch Player
        </button>
      </div>

      {infoPopUp && <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} />}
    </div>
  );
}
