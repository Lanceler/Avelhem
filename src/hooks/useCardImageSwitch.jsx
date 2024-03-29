import React from "react";

import FireAvelhem from "../assets/avelhemcards/FireAvelhem.png";
import IgnitionPropulsion from "../assets/skillcards/IgnitionPropulsion.png";
import Conflagration from "../assets/skillcards/Conflagration.png";
import BlazeOfGlory from "../assets/skillcards/BlazeOfGlory.png";
import Resplendence from "../assets/skillcards/Resplendence.png";

import WaterAvelhem from "../assets/avelhemcards/WaterAvelhem.png";
import Purification from "../assets/skillcards/Purification.png";
import FrigidBreath from "../assets/skillcards/FrigidBreath.png";
import HealingRain from "../assets/skillcards/HealingRain.png";
import GlacialTorrent from "../assets/skillcards/GlacialTorrent.png";

import WindAvelhem from "../assets/avelhemcards/WindAvelhem.png";
import AerialImpetus from "../assets/skillcards/AerialImpetus.png";
import GaleConjuration from "../assets/skillcards/GaleConjuration.png";
import SymphonicScreech from "../assets/skillcards/SymphonicScreech.png";
import CataclysmicTempest from "../assets/skillcards/CataclysmicTempest.png";

import LandAvelhem from "../assets/avelhemcards/LandAvelhem.png";
import Crystallization from "../assets/skillcards/Crystallization.png";
import Upheaval from "../assets/skillcards/Upheaval.png";
import PitfallTrap from "../assets/skillcards/PitfallTrap.png";
import Geomancy from "../assets/skillcards/Geomancy.png";

import LightningAvelhem from "../assets/avelhemcards/LightningAvelhem.png";
import ChainLightning from "../assets/skillcards/ChainLightning.png";
import ZipAndZap from "../assets/skillcards/ZipAndZap.png";
import ThunderThaumaturge from "../assets/skillcards/ThunderThaumaturge.png";
import ValiantSpark from "../assets/skillcards/ValiantSpark.png";

import ManaAvelhem from "../assets/avelhemcards/ManaAvelhem.png";
import Surge from "../assets/skillcards/Surge.png";
import Diffusion from "../assets/skillcards/Diffusion.png";
import Aegis from "../assets/skillcards/Aegis.png";
import DisruptionField from "../assets/skillcards/DisruptionField.png";

import MetalAvelhem from "../assets/avelhemcards/MetalAvelhem.png";
import MagneticShockwave from "../assets/skillcards/MagneticShockwave.png";
import Reinforce from "../assets/skillcards/Reinforce.png";
import FrenzyBlade from "../assets/skillcards/FrenzyBlade.png";
import ArsenalOnslaught from "../assets/skillcards/ArsenalOnslaught.png";

import PlantAvelhem from "../assets/avelhemcards/PlantAvelhem.png";
import SowAndReap from "../assets/skillcards/SowAndReap.png";
import Efflorescence from "../assets/skillcards/Efflorescence.png";
import ViridianGrave from "../assets/skillcards/ViridianGrave.png";
import CastleOfThorns from "../assets/skillcards/CastleOfThorns.png";

import HeirsEndeavor from "../assets/skillcards/HeirsEndeavor.png";
import TeaForTwo from "../assets/skillcards/TeaForTwo.png";
import CouplesCoffee from "../assets/skillcards/CouplesCoffee.png";
import DarkHalo from "../assets/skillcards/DarkHalo.png";
import Reminiscence from "../assets/skillcards/Reminiscence.png";
import Foreshadow from "../assets/skillcards/Foreshadow.png";
import Transmute from "../assets/skillcards/Transmute.png";
import Ambidexterity from "../assets/skillcards/Ambidexterity.png";
import Providence from "../assets/skillcards/Providence.png";
import FerventPrayer from "../assets/skillcards/FerventPrayer.png";
// import PressTheAttack from "../assets/skillcards/PressTheAttack.png";
import PowerAtTheFinalHour from "../assets/skillcards/PowerAtTheFinalHour.png";
import FatedRivalry from "../assets/skillcards/FatedRivalry.png";
import MatchMadeInHeaven from "../assets/skillcards/MatchMadeInHeaven.png";
import VengefulLegacy from "../assets/skillcards/VengefulLegacy.png";
import BlackBusinessCard from "../assets/skillcards/BlackBusinessCard.png";
import Coalescence from "../assets/skillcards/Coalescence.png";
import Transcendence from "../assets/skillcards/Transcendence.png";

export const useCardImageSwitch = () => {
  const getImage2 = (id) => {
    switch (id) {
      case "SX-01":
        return Transcendence;

      case 1:
        return FireAvelhem;
      case "01-01":
        return IgnitionPropulsion;
      case "01-02":
        return Conflagration;
      case "01-03":
        return BlazeOfGlory;
      case "01-04":
        return Resplendence;

      case 2:
        return WaterAvelhem;
      case "02-01":
        return Purification;
      case "02-02":
        return FrigidBreath;
      case "02-03":
        return HealingRain;
      case "02-04":
        return GlacialTorrent;

      case 3:
        return WindAvelhem;
      case "03-01":
        return AerialImpetus;
      case "03-02":
        return GaleConjuration;
      case "03-03":
        return SymphonicScreech;
      case "03-04":
        return CataclysmicTempest;

      case 4:
        return LandAvelhem;
      case "04-01":
        return Crystallization;
      case "04-02":
        return Upheaval;
      case "04-03":
        return PitfallTrap;
      case "04-04":
        return Geomancy;

      case 5:
        return LightningAvelhem;
      case "05-01":
        return ChainLightning;
      case "05-02":
        return ZipAndZap;
      case "05-03":
        return ThunderThaumaturge;
      case "05-04":
        return ValiantSpark;

      case 6:
        return ManaAvelhem;
      case "06-01":
        return Surge;
      case "06-02":
        return Diffusion;
      case "06-03":
        return Aegis;
      case "06-04":
        return DisruptionField;

      case 7:
        return MetalAvelhem;
      case "07-01":
        return MagneticShockwave;
      case "07-02":
        return Reinforce;
      case "07-03":
        return FrenzyBlade;
      case "07-04":
        return ArsenalOnslaught;

      case 8:
        return PlantAvelhem;
      case "08-01":
        return SowAndReap;
      case "08-02":
        return Efflorescence;
      case "08-03":
        return ViridianGrave;
      case "08-04":
        return CastleOfThorns;

      case "SA-01":
        return HeirsEndeavor;
      case "SA-02":
        return TeaForTwo;
      case "SA-03":
        return DarkHalo;
      case "SA-04":
        return Reminiscence;
      case "SA-05":
        return Foreshadow;

      case "SB-01":
        return Transmute;
      case "SB-02":
        return Ambidexterity;
      case "SB-03":
        return Providence;
      case "SB-04":
        return FerventPrayer;
      // case "SB-05":
      //   return PressTheAttack;

      case "SC-01":
        return PowerAtTheFinalHour;
      case "SC-02":
        return FatedRivalry;
      case "SC-03":
        return MatchMadeInHeaven;
      case "SC-04":
        return VengefulLegacy;
      case "SC-05":
        return BlackBusinessCard;

      case "SD-01":
        return Coalescence;

      default:
        return "";
    }
  };

  const getImage = (cardName) => {
    switch (cardName) {
      case "Fire Avelhem":
        return FireAvelhem;
      case "Ignition Propulsion":
        return IgnitionPropulsion;
      case "Conflagration":
        return Conflagration;
      case "Blaze Of Glory":
        return BlazeOfGlory;
      case "Resplendence":
        return Resplendence;

      case "Water Avelhem":
        return WaterAvelhem;
      case "Purification":
        return Purification;
      case "Frigid Breath":
        return FrigidBreath;
      case "Healing Rain":
        return HealingRain;
      case "Glacial Torrent":
        return GlacialTorrent;

      case "Wind Avelhem":
        return WindAvelhem;
      case "Aerial Impetus":
        return AerialImpetus;
      case "Gale Conjuration":
        return GaleConjuration;
      case "Symphonic Screech":
        return SymphonicScreech;
      case "Cataclysmic Tempest":
        return CataclysmicTempest;

      case "Land Avelhem":
        return LandAvelhem;
      case "Crystallization":
        return Crystallization;
      case "Upheaval":
        return Upheaval;
      case "Pitfall Trap":
        return PitfallTrap;
      case "Geomancy":
        return Geomancy;

      case "Lightning Avelhem":
        return LightningAvelhem;
      case "Chain Lightning":
        return ChainLightning;
      case "Zip And Zap":
        return ZipAndZap;
      case "Thunder Thaumaturge":
        return ThunderThaumaturge;
      case "Valiant Spark":
        return ValiantSpark;

      case "Mana Avelhem":
        return ManaAvelhem;
      case "Surge":
        return Surge;
      case "Diffusion":
        return Diffusion;
      case "Aegis":
        return Aegis;
      case "Disruption Field":
        return DisruptionField;

      case "Metal Avelhem":
        return MetalAvelhem;
      case "Magnetic Shockwave":
        return MagneticShockwave;
      case "Reinforce":
        return Reinforce;
      case "Frenzy Blade":
        return FrenzyBlade;
      case "Arsenal Onslaught":
        return ArsenalOnslaught;

      case "Plant Avelhem":
        return PlantAvelhem;
      case "Sow And Reap":
        return SowAndReap;
      case "Efflorescence":
        return Efflorescence;
      case "Viridian Grave":
        return ViridianGrave;
      case "Castle Of Thorns":
        return CastleOfThorns;

      case "Heir’s Endeavor":
        return HeirsEndeavor;
      case "Tea For Two":
        return TeaForTwo;
      // case "Unbridled Power":
      //   return UnbridledPower;
      case "Dark Halo":
        return DarkHalo;
      case "Reminiscence":
        return Reminiscence;
      case "Foreshadow":
        return Foreshadow;

      case "Transmute":
        return Transmute;
      case "Ambidexterity":
        return Ambidexterity;
      case "Providence":
        return Providence;
      case "Fervent Prayer":
        return FerventPrayer;
      // case "Press The Attack":
      //   return PressTheAttack;
      case "Power At The Final Hour":
        return PowerAtTheFinalHour;
      case "Fated Rivalry":
        return FatedRivalry;
      case "Match Made In Heaven":
        return MatchMadeInHeaven;
      case "Vengeful Legacy":
        return VengefulLegacy;
      case "Black Business Card":
        return BlackBusinessCard;

      case "Coalescence":
        return Coalescence;

      default:
        return "";
    }
  };

  return { getImage, getImage2 };
};
