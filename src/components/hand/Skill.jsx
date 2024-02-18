import React from "react";
import "./Skill.css";

import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/gameState";

import { useCardImageSwitch } from "../../hooks/useCardImageSwitch";
import { useCardDatabase } from "../../hooks/useCardDatabase";
import { useRecurringEffects } from "../../hooks/useRecurringEffects";

const Skill = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const { getImage } = useCardImageSwitch();
  const { getSkillById } = useCardDatabase();

  const { activateSkill } = useRecurringEffects();

  const cardInfo = getSkillById(props.skill.id);

  let image = "";
  image = getImage(cardInfo.Name);

  const handleClick = () => {
    if (props.canActivateSkill) {
      let newGameState = JSON.parse(JSON.stringify(localGameState));

      //remove activated card from hand but do not send to vestige
      newGameState[self].skillHand.splice(props.skill.handIndex, 1);

      newGameState = activateSkill(newGameState, props.unit, props.skill.id);

      dispatch(updateState(newGameState));
      props.updateFirebase(newGameState);
    }
  };

  return (
    <div
      className={`select-skill ${
        !props.canActivateSkill ? "cannotUseSkill" : ""
      }`}
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() => handleClick()}
    >
      {!image && <div> {cardInfo.Name}</div>}
    </div>
  );
};

export default Skill;
