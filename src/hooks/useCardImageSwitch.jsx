import React from "react";

import FrenzyBladeSm from "../assets/skillcards/FrenzyBladeSm.png";
import AmbidexterityMed from "../assets/skillcards/AmbidexterityMed.png";

import IgnitionPropulsion from "../assets/skillcards/IgnitionPropulsion.png";
import Conflagration from "../assets/skillcards/Conflagration.png";
import BlazeOfGlory from "../assets/skillcards/BlazeOfGlory.png";
import Resplendence from "../assets/skillcards/Resplendence.png";

import Purification from "../assets/skillcards/Purification.png";
import FrigidBreath from "../assets/skillcards/FrigidBreath.png";
import HealingRain from "../assets/skillcards/HealingRain.png";
// import GlacialTorrent from "../assets/skillcards/GlacialTorrent.png";

import AerialImpetus from "../assets/skillcards/AerialImpetus.png";
import GaleConjuration from "../assets/skillcards/GaleConjuration.png";
import SymphonicScreech from "../assets/skillcards/SymphonicScreech.png";
import CataclysmicTempest from "../assets/skillcards/CataclysmicTempest.png";

// import Crystallization from "../assets/skillcards/Crystallization.png";
// import Upheaval from "../assets/skillcards/Upheaval.png";
import PitfallTrap from "../assets/skillcards/PitfallTrap.png";
// import Geomancy from "../assets/skillcards/Geomancy.png";

import ChainLightning from "../assets/skillcards/ChainLightning.png";
import ZipAndZap from "../assets/skillcards/ZipAndZap.png";
import ThunderThaumaturge from "../assets/skillcards/ThunderThaumaturge.png";
import ValiantSpark from "../assets/skillcards/ValiantSpark.png";

import Surge from "../assets/skillcards/Surge.png";
import Diffusion from "../assets/skillcards/Diffusion.png";
import Aegis from "../assets/skillcards/Aegis.png";
import DisruptionField from "../assets/skillcards/DisruptionField.png";

import MagneticShockwave from "../assets/skillcards/MagneticShockwave.png";
import Reinforce from "../assets/skillcards/Reinforce.png";
import FrenzyBlade from "../assets/skillcards/FrenzyBlade.png";
import ArsenalOnslaught from "../assets/skillcards/ArsenalOnslaught.png";

import SowAndReap from "../assets/skillcards/SowAndReap.png";
import Efflorescence from "../assets/skillcards/Efflorescence.png";
import ViridianGrave from "../assets/skillcards/ViridianGrave.png";
import CastleOfThorns from "../assets/skillcards/CastleOfThorns.png";

// import HeirsEndeavor from "../assets/skillcards/HeirsEndeavor.png";
// import TeaForTwo from "../assets/skillcards/TeaForTwo.png";
// import UnbridledPower from "../assets/skillcards/UnbridledPower.png";
// import DarkHalo from "../assets/skillcards/DarkHalo.png";
// import Reminiscence from "../assets/skillcards/Reminiscence.png";
// import Foreshadow from "../assets/skillcards/Foreshadow.png";
// import Transmute from "../assets/skillcards/Transmute.png";
import Ambidexterity from "../assets/skillcards/Ambidexterity.png";
// import Providence from "../assets/skillcards/Providence.png";
// import FerventPrayer from "../assets/skillcards/FerventPrayer.png";
// import PressTheAttack from "../assets/skillcards/PressTheAttack.png";
import PowerAtTheFinalHour from "../assets/skillcards/PowerAtTheFinalHour.png";
import FatedRivalry from "../assets/skillcards/FatedRivalry.png";
// import MatchMadeInHeaven from "../assets/skillcards/MatchMadeInHeaven.png";
// import VengefulLegacy from "../assets/skillcards/VengefulLegacy.png";
// import BlackBusinessCard from "../assets/skillcards/BlackBusinessCard.png";
// import Coalescence from "../assets/skillcards/Coalescence.png";

export const useCardImageSwitch = (cardName) => {
  const getImage = (cardName) => {
    switch (cardName) {
      case "Ignition Propulsion":
        return IgnitionPropulsion;
      // return IgnitionPropulsionSmall;
      case "Conflagration":
        return Conflagration;
      case "Blaze Of Glory":
        return BlazeOfGlory;
      case "Resplendence":
        return Resplendence;

      case "Purification":
        return Purification;
      case "Frigid Breath":
        return FrigidBreath;
      case "Healing Rain":
        return HealingRain;
      // case "Glacial Torrent":
      //   return GlacialTorrent;

      case "Aerial Impetus":
        return AerialImpetus;
      case "Gale Conjuration":
        return GaleConjuration;
      case "Symphonic Screech":
        return SymphonicScreech;
      case "Cataclysmic Tempest":
        return CataclysmicTempest;

      // case "Crystallization":
      //   return Crystallization;
      // case "Upheaval":
      //   return Upheaval;
      case "Pitfall Trap":
        return PitfallTrap;
      // case "Geomancy":
      //   return Geomancy;

      case "Chain Lightning":
        return ChainLightning;
      case "Zip And Zap":
        return ZipAndZap;
      case "Thunder Thaumaturge":
        return ThunderThaumaturge;
      case "Valiant Spark":
        return ValiantSpark;

      case "Surge":
        return Surge;
      case "Diffusion":
        return Diffusion;
      case "Aegis":
        return Aegis;
      case "Disruption Field":
        return DisruptionField;

      case "Magnetic Shockwave":
        return MagneticShockwave;
      case "Reinforce":
        return Reinforce;
      case "Frenzy Blade":
        return FrenzyBlade;
      case "Arsenal Onslaught":
        return ArsenalOnslaught;

      case "Sow And Reap":
        return SowAndReap;
      case "Efflorescence":
        return Efflorescence;
      case "Viridian Grave":
        return ViridianGrave;
      case "Castle Of Thorns":
        return CastleOfThorns;

      // case "Heir’s Endeavor":
      //   return HeirsEndeavor;
      // case "Tea For Two":
      //   return TeaForTwo;
      // case "Unbridled Power":
      //   return UnbridledPower;
      // case "Dark Halo":
      //   return DarkHalo;
      // case "Reminiscence":
      //   return Reminiscence;
      // case "Foreshadow":
      //   return Foreshadow;

      // case "Transmute":
      //   return Transmute;
      case "Ambidexterity":
        // return Ambidexterity;
        return AmbidexterityMed;
      // case "Providence":
      //   return Providence;
      // case "Fervent Prayer":
      //   return FerventPrayer;
      // case "Press The Attack":
      //   return PressTheAttack;
      case "Power At The Final Hour":
        return PowerAtTheFinalHour;
      case "Fated Rivalry":
        return FatedRivalry;
      // case "Match Made In Heaven":
      //   return MatchMadeInHeaven;
      // case "Vengeful Legacy":
      //   return VengefulLegacy;
      // case "Black Business Card":
      //   return BlackBusinessCard;

      // case "Coalescence,":
      //   return Coalescence;

      default:
        return "";
    }
  };

  return { getImage };
};
