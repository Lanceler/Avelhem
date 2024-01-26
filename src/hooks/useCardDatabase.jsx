import React from "react";

export const useCardDatabase = () => {
  const avelhemCardList = [
    {
      Name: "Fire Avelhem",
      Stock: 4,
      Method: "Avelhem",
      CardId: 1,
    },
    {
      Name: "Water Avelhem",
      Stock: 4,
      Method: "Avelhem",
      CardId: 2,
    },
    {
      Name: "Wind Avelhem",
      Stock: 4,
      Method: "Avelhem",
      CardId: 3,
    },
    {
      Name: "Land Avelhem",
      Stock: 4,
      Method: "Avelhem",
      CardId: 4,
    },
    {
      Name: "Lightning Avelhem",
      Stock: 4,
      Method: "Avelhem",
      CardId: 5,
    },
    {
      Name: "Mana Avelhem",
      Stock: 4,
      Method: "Avelhem",
      CardId: 6,
    },
    {
      Name: "Metal Avelhem",
      Stock: 4,
      Method: "Avelhem",
      CardId: 7,
    },
    {
      Name: "Plant Avelhem",
      Stock: 4,
      Method: "Avelhem",
      CardId: 8,
    },
  ];

  const skillCardList = [
    //fire
    {
      Name: "Ignition Propulsion",
      Stock: 4,
      Aspect: "Fire",
      Method: "Standard",
      CardId: "1-1",
    },
    {
      Name: "Conflagration",
      Stock: 4,
      Aspect: "Fire",
      Method: "Resonant",
      CardId: "1-2",
    },
    {
      Name: "Blaze Of Glory",
      Stock: 4,
      Aspect: "Fire",
      Method: "Contingent",
      CardId: "1-3",
    },
    {
      Name: "Resplendence",
      Stock: 1,
      Aspect: "Fire",
      Method: "Burst",
      CardId: "1-4",
    },
    //water
    {
      Name: "Purification",
      Stock: 4,
      Aspect: "Water",
      Method: "Standard",
      CardId: "2-1",
    },
    {
      Name: "Frigid Breath",
      Stock: 4,
      Aspect: "Water",
      Method: "Resonant",
      CardId: "2-2",
    },
    {
      Name: "Healing Rain",
      Stock: 4,
      Aspect: "Water",
      Method: "Contingent",
      CardId: "2-3",
    },
    {
      Name: "Glacial Torrent",
      Stock: 1,
      Aspect: "Water",
      Method: "Burst",
      CardId: "2-4",
    },
    //wind
    {
      Name: "Aerial Impetus",
      Stock: 4,
      Aspect: "Wind",
      Method: "Standard",
      CardId: "3-1",
    },
    {
      Name: "Gale Conjuration",
      Stock: 4,
      Aspect: "Wind",
      Method: "Resonant",
      CardId: "3-2",
    },
    {
      Name: "Symphonic Screech",
      Stock: 4,
      Aspect: "Wind",
      Method: "Contingent",
      CardId: "3-3",
    },
    {
      Name: "Cataclysmic Tempest",
      Stock: 1,
      Aspect: "Wind",
      Method: "Burst",
      CardId: "3-4",
    },
    //land
    {
      Name: "Crystallization",
      Stock: 4,
      Aspect: "Land",
      Method: "Standard",
      CardId: "4-1",
    },
    {
      Name: "Upheaval",
      Stock: 4,
      Aspect: "Land",
      Method: "Resonant",
      CardId: "4-2",
    },
    {
      Name: "Pitfall Trap",
      Stock: 4,
      Aspect: "Land",
      Method: "Contingent",
      CardId: "4-3",
    },
    {
      Name: "Geomancy",
      Stock: 1,
      Aspect: "Land",
      Method: "Burst",
      CardId: "4-4",
    },
    //lightning
    {
      Name: "Chain Lightning",
      Stock: 4,
      Aspect: "Lightning",
      Method: "Standard",
      CardId: "5-1",
    },
    {
      Name: "Zip And Zap",
      Stock: 4,
      Aspect: "Lightning",
      Method: "Resonant",
      CardId: "5-2",
    },
    {
      Name: "Thunder Thaumaturge",
      Stock: 4,
      Aspect: "Lightning",
      Method: "Contingent",
      CardId: "5-3",
    },
    {
      Name: "Valiant Spark",
      Stock: 1,
      Aspect: "Lightning",
      Method: "Burst",
      CardId: "5-4",
    },
    //mana
    {
      Name: "Surge",
      Stock: 4,
      Aspect: "Mana",
      Method: "Standard",
      CardId: "6-1",
    },
    {
      Name: "Diffusion",
      Stock: 4,
      Aspect: "Mana",
      Method: "Resonant",
      CardId: "6-2",
    },
    {
      Name: "Aegis",
      Stock: 4,
      Aspect: "Mana",
      Method: "Contingent",
      CardId: "6-3",
    },
    {
      Name: "Disruption Field",
      Stock: 1,
      Aspect: "Mana",
      Method: "Burst",
      CardId: "6-4",
    },
    //metal
    {
      Name: "Magnetic Shockwave",
      Stock: 4,
      Aspect: "Metal",
      Method: "Standard",
      CardId: "7-1",
    },
    {
      Name: "Reinforce",
      Stock: 4,
      Aspect: "Metal",
      Method: "Resonant",
      CardId: "7-2",
    },
    {
      Name: "Frenzy Blade",
      Stock: 4,
      Aspect: "Metal",
      Method: "Contingent",
      CardId: "7-3",
    },
    {
      Name: "Arsenal Onslaught",
      Stock: 1,
      Aspect: "Metal",
      Method: "Burst",
      CardId: "7-4",
    },
    //plant
    {
      Name: "Sow And Reap",
      Stock: 4,
      Aspect: "Plant",
      Method: "Standard",
      CardId: "8-1",
    },
    {
      Name: "Efflorescence",
      Stock: 4,
      Aspect: "Plant",
      Method: "Resonant",
      CardId: "8-2",
    },
    {
      Name: "Viridian Grave",
      Stock: 4,
      Aspect: "Plant",
      Method: "Contingent",
      CardId: "8-3",
    },
    {
      Name: "Castle Of Thorns",
      Stock: 1,
      Aspect: "Plant",
      Method: "Burst",
      CardId: "8-4",
    },

    //sovereign
    {
      Name: "Heir’s Endeavor",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-1",
    },
    {
      Name: "Tea For Two",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-2",
    },
    {
      Name: "Unbridled Power",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-3",
    },
    {
      Name: "Dark Halo",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-4",
    },
    {
      Name: "Reminiscence",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-5",
    },
    {
      Name: "Foreshadow",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-6",
    },
    {
      Name: "Transmute",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-1",
    },
    {
      Name: "Ambidexterity",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-2",
    },
    {
      Name: "Providence",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-3",
    },
    {
      Name: "Fervent Prayer",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-4",
    },
    {
      Name: "Press The Attack",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-5",
    },
    {
      Name: "Power At The Final Hour",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-1",
    },
    {
      Name: "Fated Rivalry",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-2",
    },
    {
      Name: "Match Made In Heaven",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-3",
    },
    {
      Name: "Vengeful Legacy",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-4",
    },
    {
      Name: "Black Business Card",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-5",
    },
    {
      Name: "Coalescence",
      Stock: 1,
      Aspect: "Sovereign",
      Method: "Burst",
      CardId: "SD-1",
    },
  ];

  const getAvelhemById = (id) => {
    return avelhemCardList.find((card) => card.CardId === id);
  };

  const getSkillById = (id) => {
    return skillCardList.find((card) => card.CardId === id);
  };

  return { avelhemCardList, skillCardList, getAvelhemById, getSkillById };
};
