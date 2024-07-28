import React, { useState, useEffect } from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";
import { updateDemo } from "../../redux/demoGuide";

import { useRecurringEffects } from "../../hooks/useRecurringEffects";

export default function SelectFirstPlayer(props) {
  const { localGameState } = useSelector((state) => state.gameState);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const dispatch = useDispatch();

  const { newUnitStats, shuffleCards } = useRecurringEffects();

  let randomChoices = ["host", "guest"];

  const getRandomFromArray = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  const canClick = () => {
    switch (demoGuide) {
      case "Learn1.2":
        return true;
    }
  };

  const handleSetFirstPlayer = (choice) => {
    const newGameState = JSON.parse(JSON.stringify(localGameState));

    newGameState.turnPlayer = choice;

    let hostSkillRepertoire = [...newGameState.host.skillRepertoire];
    hostSkillRepertoire = shuffleCards(hostSkillRepertoire);
    let hostStartingHand = hostSkillRepertoire.splice(
      hostSkillRepertoire.length - 4,
      4
    );

    newGameState.host.skillHand = hostStartingHand;
    newGameState.host.skillRepertoire = hostSkillRepertoire;

    let hostAvelhemRepertoire = [...newGameState.host.avelhemRepertoire];
    newGameState.host.avelhemRepertoire = shuffleCards(hostAvelhemRepertoire);
    let guestSkillRepertoire = [...newGameState.guest.skillRepertoire];
    guestSkillRepertoire = shuffleCards(guestSkillRepertoire);

    let guestStartingHand = guestSkillRepertoire.splice(
      guestSkillRepertoire.length - 4,
      4
    );

    newGameState.guest.skillHand = guestStartingHand;
    newGameState.guest.skillRepertoire = guestSkillRepertoire;

    let guestAvelhemRepertoire = [...newGameState.guest.avelhemRepertoire];
    newGameState.guest.avelhemRepertoire = shuffleCards(guestAvelhemRepertoire);

    newGameState.guest.skillHand.push("SX-01");
    newGameState.host.skillHand.push("SX-01");

    if (choice === "host") {
      newGameState.guest.skillHand.push("SX-01");
      newGameState.host.skillVestige.push("SX-01");
    } else {
      newGameState.host.skillHand.push("SX-01");
      newGameState.guest.skillVestige.push("SX-01");
    }

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

    let newZoneInfo = [...JSON.parse(localGameState.zones)];

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

    newGameState.zones = JSON.stringify(newZoneInfo);

    newGameState.turnCount = 1;
    newGameState.turnPhase = "Acquisition";
    newGameState.currentResolution.push({
      resolution: "Acquisition Phase Selection",
    });

    dispatch(updateState(newGameState));
    props.updateFirebase(newGameState);
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.2":
        dispatch(updateDemo("Learn1.3"));
        break;
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
