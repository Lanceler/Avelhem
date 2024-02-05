import React from "react";

import { useSelector, useDispatch } from "react-redux";

export const useRecurringEffects = () => {
  const { self } = useSelector((state) => state.teams);

  //=========================================
  //Exported functions below

  const assignTactics = (gamestate, first, second) => {
    gamestate.tactics = [first, second];

    return gamestate;
  };

  const drawAvelhem = (gameState) => {
    console.log("drawAvelhem");

    gameState[self].avelhemHand.push(gameState[self].avelhemRepertoire.pop());

    //To do: If deck empties, shuffle discard pile into it.

    return gameState;
  };

  const drawSkill = (gameState) => {
    console.log("drawSkill");

    gameState[self].skillHand.push(gameState[self].skillRepertoire.pop());
    //To do: If deck empties, shuffle discard pile into it.

    return gameState;
  };

  const rollTactic = (extraMobilize) => {
    const mobilizeLimit = 3 + extraMobilize;

    const dieFaces = [
      { face: "advance", stock: 1 },
      { face: "advance", stock: 1 },
      { face: "mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "mobilize", stock: mobilizeLimit, limit: mobilizeLimit },
      { face: "assault", stock: 1 },
      { face: "invoke", stock: 1 },
    ];

    return dieFaces[Math.floor(Math.random() * dieFaces.length)];
  };

  return {
    assignTactics,
    drawAvelhem,
    drawSkill,
    rollTactic,
  };
};
