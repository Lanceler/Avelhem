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
      CardId: "01-01",
    },
    {
      Name: "Conflagration",
      Stock: 4,
      Aspect: "Fire",
      Method: "Resonant",
      CardId: "01-02",
    },
    {
      Name: "Blaze Of Glory",
      Stock: 4,
      Aspect: "Fire",
      Method: "Contingent",
      CardId: "01-03",
    },
    {
      Name: "Resplendence",
      Stock: 1,
      Aspect: "Fire",
      Method: "Burst",
      CardId: "01-04",
    },
    //water
    {
      Name: "Purification",
      Stock: 4,
      Aspect: "Water",
      Method: "Standard",
      CardId: "02-01",
    },
    {
      Name: "Frigid Breath",
      Stock: 4,
      Aspect: "Water",
      Method: "Resonant",
      CardId: "02-02",
    },
    {
      Name: "Healing Rain",
      Stock: 4,
      Aspect: "Water",
      Method: "Contingent",
      CardId: "02-03",
    },
    {
      Name: "Glacial Torrent",
      Stock: 1,
      Aspect: "Water",
      Method: "Burst",
      CardId: "02-04",
    },
    //wind
    {
      Name: "Aerial Impetus",
      Stock: 4,
      Aspect: "Wind",
      Method: "Standard",
      CardId: "03-01",
    },
    {
      Name: "Gale Conjuration",
      Stock: 4,
      Aspect: "Wind",
      Method: "Resonant",
      CardId: "03-02",
    },
    {
      Name: "Symphonic Screech",
      Stock: 4,
      Aspect: "Wind",
      Method: "Contingent",
      CardId: "03-03",
    },
    {
      Name: "Cataclysmic Tempest",
      Stock: 1,
      Aspect: "Wind",
      Method: "Burst",
      CardId: "03-04",
    },
    //land
    {
      Name: "Crystallization",
      Stock: 4,
      Aspect: "Land",
      Method: "Standard",
      CardId: "04-01",
    },
    {
      Name: "Upheaval",
      Stock: 4,
      Aspect: "Land",
      Method: "Resonant",
      CardId: "04-02",
    },
    {
      Name: "Pitfall Trap",
      Stock: 4,
      Aspect: "Land",
      Method: "Contingent",
      CardId: "04-03",
    },
    {
      Name: "Geomancy",
      Stock: 1,
      Aspect: "Land",
      Method: "Burst",
      CardId: "04-04",
    },
    //lightning
    {
      Name: "Chain Lightning",
      Stock: 4,
      Aspect: "Lightning",
      Method: "Standard",
      CardId: "05-01",
    },
    {
      Name: "Zip And Zap",
      Stock: 4,
      Aspect: "Lightning",
      Method: "Resonant",
      CardId: "05-02",
    },
    {
      Name: "Thunder Thaumaturge",
      Stock: 4,
      Aspect: "Lightning",
      Method: "Contingent",
      CardId: "05-03",
    },
    {
      Name: "Valiant Spark",
      Stock: 1,
      Aspect: "Lightning",
      Method: "Burst",
      CardId: "05-04",
    },
    //mana
    {
      Name: "Surge",
      Stock: 4,
      Aspect: "Mana",
      Method: "Standard",
      CardId: "06-01",
    },
    {
      Name: "Diffusion",
      Stock: 4,
      Aspect: "Mana",
      Method: "Resonant",
      CardId: "06-02",
    },
    {
      Name: "Aegis",
      Stock: 4,
      Aspect: "Mana",
      Method: "Contingent",
      CardId: "06-03",
    },
    {
      Name: "Disruption Field",
      Stock: 1,
      Aspect: "Mana",
      Method: "Burst",
      CardId: "06-04",
    },
    //metal
    {
      Name: "Magnetic Shockwave",
      Stock: 4,
      Aspect: "Metal",
      Method: "Standard",
      CardId: "07-01",
    },
    {
      Name: "Reinforce",
      Stock: 4,
      Aspect: "Metal",
      Method: "Resonant",
      CardId: "07-02",
    },
    {
      Name: "Frenzy Blade",
      Stock: 4,
      Aspect: "Metal",
      Method: "Contingent",
      CardId: "07-03",
    },
    {
      Name: "Arsenal Onslaught",
      Stock: 1,
      Aspect: "Metal",
      Method: "Burst",
      CardId: "07-04",
    },
    //plant
    {
      Name: "Sow And Reap",
      Stock: 4,
      Aspect: "Plant",
      Method: "Standard",
      CardId: "08-01",
    },
    {
      Name: "Efflorescence",
      Stock: 4,
      Aspect: "Plant",
      Method: "Resonant",
      CardId: "08-02",
    },
    {
      Name: "Viridian Grave",
      Stock: 4,
      Aspect: "Plant",
      Method: "Contingent",
      CardId: "08-03",
    },
    {
      Name: "Castle Of Thorns",
      Stock: 1,
      Aspect: "Plant",
      Method: "Burst",
      CardId: "08-04",
    },

    //sovereign
    {
      Name: "Heir’s Endeavor",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-01",
    },
    {
      Name: "Tea For Two",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-02",
    },
    {
      Name: "Dark Halo",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-03",
    },
    {
      Name: "Reminiscence",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-04",
    },
    {
      Name: "Foreshadow",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Standard",
      CardId: "SA-05",
    },
    {
      Name: "Transmute",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-01",
    },
    {
      Name: "Ambidexterity",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-02",
    },
    {
      Name: "Providence",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-03",
    },
    {
      Name: "Fervent Prayer",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-04",
    },
    {
      Name: "Press The Attack",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Resonant",
      CardId: "SB-05",
    },
    {
      Name: "Power At The Final Hour",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-01",
    },
    {
      Name: "Fated Rivalry",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-02",
    },
    {
      Name: "Match Made In Heaven",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-03",
    },
    {
      Name: "Vengeful Legacy",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-04",
    },
    {
      Name: "Black Business Card",
      Stock: 2,
      Aspect: "Sovereign",
      Method: "Contingent",
      CardId: "SC-05",
    },
    {
      Name: "Coalescence",
      Stock: 1,
      Aspect: "Sovereign",
      Method: "Burst",
      CardId: "SD-01",
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
