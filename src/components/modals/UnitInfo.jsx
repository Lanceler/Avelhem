import React from "react";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
const UnitInfo = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self, enemy } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const unit = props.unit;

  const team = unit.player === self ? "Ally" : "Enemy";

  const handleCollapse = () => {
    props.setUnitInfor(null);
  };

  return (
    <div className="modal-backdrop">
      <div className="handModal">
        <div className="selectedCardModal">
          <h2 className="choiceTitle">{`${team} ${unit.unitClass}`}</h2>
          <h3>Test</h3>
        </div>
        <button className="collapseSelected" onClick={() => handleCollapse()}>
          X
        </button>
      </div>
    </div>
  );
};

export default UnitInfo;
