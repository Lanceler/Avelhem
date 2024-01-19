import React from "react";

import IgnitionPropulsion from "../assets/skillcards/IgnitionPropulsion.png";
import Conflagration from "../assets/skillcards/Conflagration.png";
import BlazeOfGlory from "../assets/skillcards/BlazeOfGlory.png";
import Resplendence from "../assets/skillcards/Resplendence.png";

import AerialImpetus from "../assets/skillcards/AerialImpetus.png";
import GaleConjuration from "../assets/skillcards/GaleConjuration.png";
import SymphonicScreech from "../assets/skillcards/SymphonicScreech.png";
import CataclysmicTempest from "../assets/skillcards/CataclysmicTempest.png";

import ChainLightning from "../assets/skillcards/ChainLightning.png";
import ZipAndZap from "../assets/skillcards/ZipAndZap.png";
import ThunderThaumaturge from "../assets/skillcards/ThunderThaumaturge.png";
import ValiantSpark from "../assets/skillcards/ValiantSpark.png";

export const useCardImageSwitch = (cardName) => {
  const getImage = (cardName) => {
    switch (cardName) {
      case "Ignition Propulsion":
        return IgnitionPropulsion;
      case "Conflagration":
        return Conflagration;
      case "Blaze Of Glory":
        return BlazeOfGlory;
      case "Resplendence":
        return Resplendence;

      case "Aerial Impetus":
        return AerialImpetus;
      case "Gale Conjuration":
        return GaleConjuration;
      case "Symphonic Screech":
        return SymphonicScreech;
      case "Cataclysmic Tempest":
        return CataclysmicTempest;

      case "Chain Lightning":
        return ChainLightning;
      case "Zip And Zap":
        return ZipAndZap;
      case "Thunder Thaumaturge":
        return ThunderThaumaturge;
      case "Valiant Spark":
        return ValiantSpark;

      default:
        return "";
    }
  };

  return { getImage };
};
