export const useCardDatabase = () => {
  const SL = 3; //Non-burst Scion skill limit
  const AVELHEM_LIMIT = 4;

  const makeAvelhemCard = (name, id) => {
    return {
      Name: name,
      Stock: AVELHEM_LIMIT,
      CardId: id,
    };
  };

  const avelhemCardList = [
    makeAvelhemCard("Fire Avelhem", 1),
    makeAvelhemCard("Water Avelhem", 2),
    makeAvelhemCard("Wind Avelhem", 3),
    makeAvelhemCard("Land Avelhem", 4),
    makeAvelhemCard("Lightning Avelhem", 5),
    makeAvelhemCard("Mana Avelhem", 6),
    makeAvelhemCard("Metal Avelhem", 7),
    makeAvelhemCard("Plant Avelhem", 8),

    // Expansion
    makeAvelhemCard("Avian Avelhem", 9),
  ];

  const makeSkillCard = (name, stock, aspect, method, id) => {
    return {
      Name: name,
      Stock: stock,
      Aspect: aspect,
      Method: method,
      CardId: id,
    };
  };

  const skillCardList = [
    makeSkillCard("Ignition Propulsion", SL, "Fire", "Standard", "01-01"),
    makeSkillCard("Conflagration", SL, "Fire", "Resonant", "01-02"),
    makeSkillCard("Blaze of Glory", SL, "Fire", "Contingent", "01-03"),
    makeSkillCard("Resplendence", 1, "Fire", "Burst", "01-04"),

    makeSkillCard("Purification", SL, "Water", "Standard", "02-01"),
    makeSkillCard("Frigid Breath", SL, "Water", "Resonant", "02-02"),
    makeSkillCard("Healing Rain", SL, "Water", "Contingent", "02-03"),
    makeSkillCard("Glacial Torrent", 1, "Water", "Burst", "02-04"),

    makeSkillCard("Aerial Impetus", SL, "Wind", "Standard", "03-01"),
    makeSkillCard("Gale Conjuration", SL, "Wind", "Resonant", "03-02"),
    makeSkillCard("Symphonic Screech", SL, "Wind", "Contingent", "03-03"),
    makeSkillCard("Cataclysmic Tempest", 1, "Wind", "Burst", "03-04"),

    makeSkillCard("Crystallization", SL, "Land", "Standard", "04-01"),
    makeSkillCard("Upheaval", SL, "Land", "Resonant", "04-02"),
    makeSkillCard("Pitfall Trap", SL, "Land", "Contingent", "04-03"),
    makeSkillCard("Geomancy", 1, "Land", "Burst", "04-04"),

    makeSkillCard("Chain Lightning", SL, "Lightning", "Standard", "05-01"),
    makeSkillCard("Zip and Zap", SL, "Lightning", "Resonant", "05-02"),
    makeSkillCard(
      "Thunder Thaumaturge",
      SL,
      "Lightning",
      "Contingent",
      "05-03"
    ),
    makeSkillCard("Valiant Spark", 1, "Lightning", "Burst", "05-04"),

    makeSkillCard("Surge", SL, "Mana", "Standard", "06-01"),
    makeSkillCard("Diffusion", SL, "Mana", "Resonant", "06-02"),
    makeSkillCard("Aegis", SL, "Mana", "Contingent", "06-03"),
    makeSkillCard("Disruption Field", 1, "Mana", "Burst", "06-04"),

    makeSkillCard("Magnetic Shockwave", SL, "Metal", "Standard", "07-01"),
    makeSkillCard("Reinforce", SL, "Metal", "Resonant", "07-02"),
    makeSkillCard("Frenzy Blade", SL, "Metal", "Contingent", "07-03"),
    makeSkillCard("Arsenal Onslaught", 1, "Metal", "Burst", "07-04"),

    makeSkillCard("Sow and Reap", SL, "Plant", "Standard", "08-01"),
    makeSkillCard("Efflorescence", SL, "Plant", "Resonant", "08-02"),
    makeSkillCard("Viridian Grave", SL, "Plant", "Contingent", "08-03"),
    makeSkillCard("Castle of Thorns", 1, "Plant", "Burst", "08-04"),

    makeSkillCard("Raptor Blitz", SL, "Avian", "Standard", "09-01"),
    makeSkillCard("Reconnaissance", SL, "Avian", "Resonant", "09-02"),
    makeSkillCard("Guardian Wings", SL, "Avian", "Contingent", "09-03"),
    makeSkillCard("Vanguard Fleet", 1, "Avian", "Burst", "09-04"),

    //Sovereign
    makeSkillCard("Heir’s Endeavor", 2, "Sovereign", "Standard", "SA-01"),
    makeSkillCard("Tea for Two", 2, "Sovereign", "Standard", "SA-02"),
    makeSkillCard("Dark Halo", 2, "Sovereign", "Standard", "SA-03"),
    makeSkillCard("Reminiscence", 2, "Sovereign", "Standard", "SA-04"),
    makeSkillCard("Foreshadow", 2, "Sovereign", "Standard", "SA-05"),

    makeSkillCard("Transmute", 2, "Sovereign", "Resonant", "SB-01"),
    makeSkillCard("Ambidexterity", 2, "Sovereign", "Resonant", "SB-02"),
    makeSkillCard("Providence", 2, "Sovereign", "Resonant", "SB-03"),
    makeSkillCard("Fervent Prayer", 2, "Sovereign", "Resonant", "SB-04"),
    makeSkillCard("Press the Attack", 2, "Sovereign", "Resonant", "SB-05"),

    makeSkillCard(
      "Power at the Final Hour",
      2,
      "Sovereign",
      "Contingent",
      "SC-01"
    ),
    makeSkillCard("Fated Rivalry", 2, "Sovereign", "Contingent", "SC-02"),
    makeSkillCard(
      "Match Made in Heaven",
      2,
      "Sovereign",
      "Contingent",
      "SC-03"
    ),
    makeSkillCard("Vengeful Legacy", 2, "Sovereign", "Contingent", "SC-04"),
    makeSkillCard("Black Business Card", 2, "Sovereign", "Contingent", "SC-05"),

    // {
    //   Name: "Coalescence",
    //   Stock: 1,
    //   Aspect: "Sovereign",
    //   Method: "Burst",
    //   CardId: "SD-01",
    // },
  ];

  const skillCardListExpansion = ["09-01", "09-02", "09-03", "09-04"];

  const getScionSet = (unitClass) => {
    switch (unitClass) {
      case "Fire Scion":
        return ["01-01", "01-02", "01-03", "01-04"];
      case "Water Scion":
        return ["02-01", "02-02", "02-03", "02-04"];
      case "Wind Scion":
        return ["03-01", "03-02", "03-03", "03-04"];
      case "Land Scion":
        return ["04-01", "04-02", "04-03", "04-04"];
      case "Lightning Scion":
        return ["05-01", "05-02", "05-03", "05-04"];
      case "Mana Scion":
        return ["06-01", "06-02", "06-03", "06-04"];
      case "Metal Scion":
        return ["07-01", "07-02", "07-03", "07-04"];
      case "Plant Scion":
        return ["08-01", "08-02", "08-03", "08-04"];

      //Expansion
      case "Avian Scion":
        return ["09-01", "09-02", "09-03", "09-04"];

      default:
        return;
    }
  };

  const getAvelhemById = (id) => {
    return avelhemCardList.find((card) => card.CardId === id);
  };

  const getAvelhemIndex = (id) => {
    return avelhemCardList.findIndex((card) => card.CardId === id);
  };

  const getSkillById = (id) => {
    return skillCardList.find((card) => card.CardId === id);
  };

  const getSkillIndex = (id) => {
    return skillCardList.findIndex((card) => card.CardId === id);
  };

  const allBurstSkills = () => {
    return [
      "01-04",
      "02-04",
      "03-04",
      "04-04",
      "05-04",
      "06-04",
      "07-04",
      "08-04",
      "09-04",
      // "SD-01",
    ];
  };

  const allContingentSkills = () => {
    return [
      "01-03",
      "02-03",
      "03-03",
      "04-03",
      "05-03",
      "06-03",
      "07-03",
      "08-03",
      "09-03",
      "SC-01",
      "SC-02",
      "SC-03",
      "SC-04",
      "SC-05",
    ];
  };

  const pressTheAttackList = () => {
    return [
      "01-01", //Ignition Propulsion
      "01-02", //Conflagration
      "02-02", //Frigid Breath
      "03-04", //Cataclysmic Cyclone
      "04-03", //Pitfall Trap
      "04-04", //Geomancy
      "05-01", //Chain Lightning
      "05-02", //Zip and Zap
      "06-01", //Surge
      "06-02", //Diffusion
      "07-01", //Magnetic Shockwave
      "07-03", //Frenzy Blade
      "07-04", //Arsenal Onslaught
      "08-01", //Sow and Reap
      "09-01", //Raptor Blitz
    ];
  };

  const sovereignSkillList = () => {
    return [
      "SA-01",
      "SA-02",
      "SA-03",
      "SA-04",
      "SA-05",
      "SB-01",
      "SB-02",
      "SB-03",
      "SB-04",
      "SB-05",
      "SC-01",
      "SC-02",
      "SC-03",
      "SC-04",
      "SC-05",
      "SD-01",
    ];
  };

  const starterSkillRepertoire = [
    "01-01", // Ignition Propulsion
    "01-01", // Ignition Propulsion
    "01-01", // Ignition Propulsion
    "01-02", // Conflagration
    "01-02", // Conflagration
    "01-02", // Conflagration
    "01-03", // Conflagration
    "01-03", // Conflagration
    "01-03", // Conflagration
    "02-01", // Purification
    "02-01", // Purification
    "02-01", // Purification
    "02-02", // Frigid Breath
    "02-02", // Frigid Breath
    "02-02", // Frigid Breath
    "02-03", // Healing Rain
    "02-03", // Healing Rain
    "02-03", // Healing Rain
    "03-01", // Aerial Impetus
    "03-01", // Aerial Impetus
    "03-01", // Aerial Impetus
    "03-02", // Gale Conjuration
    "03-02", // Gale Conjuration
    "03-02", // Gale Conjuration
    "04-01", // Crystallization
    "04-01", // Crystallization
    "04-01", // Crystallization
    "04-03", // Pitfall Trap
    "04-03", // Pitfall Trap
    "04-03", // Pitfall Trap
    "06-01", // Surge
    "06-01", // Surge
    "06-01", // Surge
    "06-03", // Aegis
    "06-03", // Aegis
    "06-03", // Aegis
    "SA-02", // Tea for Two
    "SA-02", // Tea for Two
    "SA-03", // Dark Halo
    "SA-03", // Dark Halo
    "SA-04", // Reminiscence
    "SA-04", // Reminiscence
    "SB-01", // Transmute
    "SB-01", // Transmute
    "SB-03", // Providence
    "SB-03", // Providence
    "SC-02", // Fated Rivalry
    "SC-02", // Fated Rivalry
    "SC-04", // Vengeful Legacy
    "SC-04", // Vengeful Legacy
  ];

  const starterAvelhemRepertoire = [
    //Fire
    1, 1, 1, 1,
    //Water
    2, 2, 2, 2,
    //Wind
    3, 3, 3, 3,
    //Land
    4, 4, 4, 4,
    //Mana
    6, 6, 6, 6,
  ];

  return {
    avelhemCardList,
    skillCardList,
    skillCardListExpansion,
    getScionSet,
    getAvelhemById,
    getAvelhemIndex,
    getSkillById,
    getSkillIndex,
    allBurstSkills,
    allContingentSkills,
    pressTheAttackList,
    sovereignSkillList,
    starterAvelhemRepertoire,
    starterSkillRepertoire,
  };
};
