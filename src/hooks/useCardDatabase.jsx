import React from "react";

export const useCardDatabase = () => {
  const skillCardList = [
    //fire
    { Name: "Ignition Propulsion", Stock: 4, CardId: 1 },
    { Name: "Conflagration", Stock: 4, CardId: 2 },
    { Name: "Blaze of Glory", Stock: 4, CardId: 3 },
    { Name: "Resplendence", Stock: 1, CardId: 4 },
    //water
    { Name: "Purification", Stock: 4, CardId: 5 },
    { Name: "Frigid Breath", Stock: 4, CardId: 6 },
    { Name: "Healing Rain", Stock: 4, CardId: 7 },
    { Name: "Glacial Torrent", Stock: 1, CardId: 8 },
    //wind
    { Name: "Aerial Impetus", Stock: 4, CardId: 9 },
    { Name: "Gale Conjuration", Stock: 4, CardId: 10 },
    { Name: "Symphonic Screech", Stock: 4, CardId: 11 },
    { Name: "Cataclysmic Tempest", Stock: 1, CardId: 12 },
    //land
    { Name: "Crystallization", Stock: 4, CardId: 13 },
    { Name: "Upheaval", Stock: 4, CardId: 14 },
    { Name: "Pitfall Trap", Stock: 4, CardId: 15 },
    { Name: "Geomancy", Stock: 1, CardId: 16 },
    //lightning
    { Name: "Chain Lightning", Stock: 4, CardId: 17 },
    { Name: "Zip and Zap", Stock: 4, CardId: 18 },
    { Name: "Thunder Thaumaturge", Stock: 4, CardId: 19 },
    { Name: "Valiant Spark", Stock: 1, CardId: 20 },
    //mana
    { Name: "Surge", Stock: 4, CardId: 21 },
    { Name: "Diffusion", Stock: 4, CardId: 22 },
    { Name: "Aegis", Stock: 4, CardId: 23 },
    { Name: "Disruption Field", Stock: 1, CardId: 24 },
    //metal
    { Name: "Magnetic Shockwave", Stock: 4, CardId: 25 },
    { Name: "Reinforce", Stock: 4, CardId: 26 },
    { Name: "Frenzy Blade", Stock: 4, CardId: 27 },
    { Name: "Arsenal Onslaught", Stock: 1, CardId: 28 },
    //plant
    { Name: "Sow And Reap", Stock: 4, CardId: 29 },
    { Name: "Efflorescence", Stock: 4, CardId: 30 },
    { Name: "Viridian Grave", Stock: 4, CardId: 31 },
    { Name: "Castle of Thorns", Stock: 1, CardId: 32 },
  ];

  return { skillCardList };
};
