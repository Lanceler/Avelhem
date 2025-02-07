import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemoCount } from "../../redux/demoCount";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

export default function SelectFirstPlayer(props) {
  const { localGameState } = useSelector((state) => state.gameState);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const dispatch = useDispatch();
  const { newUnitStats, shuffleCards } = useRecurringEffects();

  const randomChoices = ["host", "guest"];

  const getRandomFromArray = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  const handleSetFirstPlayer = (choice) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));
    newGameState.turnPlayer = choice;

    // initialize host
    let hostSkillRepertoire = [...newGameState.host.skillRepertoire];
    hostSkillRepertoire = shuffleCards(hostSkillRepertoire);
    const hostStartingHand = hostSkillRepertoire.splice(
      hostSkillRepertoire.length - 5,
      5
    );
    newGameState.host.skillHand = hostStartingHand;
    newGameState.host.skillRepertoire = hostSkillRepertoire;
    let hostAvelhemRepertoire = [...newGameState.host.avelhemRepertoire];
    newGameState.host.avelhemRepertoire = shuffleCards(hostAvelhemRepertoire);

    // initialize guest
    let guestSkillRepertoire = [...newGameState.guest.skillRepertoire];
    guestSkillRepertoire = shuffleCards(guestSkillRepertoire);
    const guestStartingHand = guestSkillRepertoire.splice(
      guestSkillRepertoire.length - 5,
      5
    );

    newGameState.guest.skillHand = guestStartingHand;
    newGameState.guest.skillRepertoire = guestSkillRepertoire;
    let guestAvelhemRepertoire = [...newGameState.guest.avelhemRepertoire];
    newGameState.guest.avelhemRepertoire = shuffleCards(guestAvelhemRepertoire);

    //extra draw for 2nd player
    if (choice === "host") {
      newGameState.guest.skillHand.push(
        newGameState.guest.skillRepertoire.pop()
      );
    } else {
      newGameState.host.skillHand.push(newGameState.host.skillRepertoire.pop());
    }

    const newZoneInfo = [...JSON.parse(localGameState.zones)];

    if (!(demoGuide === "Learn-overview" && demoCount === 7)) {
      newGameState.host.units = [
        newUnitStats("host", 0, 6, 0, "Pawn"),
        newUnitStats("host", 1, 6, 2, "Pawn"),
        newUnitStats("host", 2, 6, 4, "Pawn"),
      ];
      newGameState.guest.units = [
        newUnitStats("guest", 0, 3, 4, "Pawn"),
        newUnitStats("guest", 1, 3, 2, "Pawn"),
        newUnitStats("guest", 2, 3, 0, "Pawn"),
      ];

      newZoneInfo[6][0].player = "host";
      newZoneInfo[6][0].unitIndex = 0;
      newZoneInfo[6][2].player = "host";
      newZoneInfo[6][2].unitIndex = 1;
      newZoneInfo[6][4].player = "host";
      newZoneInfo[6][4].unitIndex = 2;
      newZoneInfo[3][0].player = "guest";
      newZoneInfo[3][0].unitIndex = 2;
      newZoneInfo[3][2].player = "guest";
      newZoneInfo[3][2].unitIndex = 1;
      newZoneInfo[3][4].player = "guest";
      newZoneInfo[3][4].unitIndex = 0;
    }

    newGameState.zones = JSON.stringify(newZoneInfo);

    newGameState.turnCount = 1;
    newGameState.turnPhase = "Acquisition";
    newGameState.currentResolution.push({
      resolution: "Acquisition Phase Selection",
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const canClick = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 7:
            return true;
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 7:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal column-centered">
        <button
          className={`redButton ${canClick() ? "demoClick" : ""}`}
          onClick={() => {
            handleSetFirstPlayer("host");
            handleUpdateDemoGuide();
          }}
        >
          Go First
        </button>
        <button
          className="redButton"
          onClick={() => handleSetFirstPlayer("guest")}
        >
          Go Second
        </button>
        <button
          className="redButton"
          onClick={() =>
            handleSetFirstPlayer(getRandomFromArray(randomChoices))
          }
        >
          Random
        </button>
      </div>
    </div>
  );
}
