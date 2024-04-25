import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Tile.css";

const Tile = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  // const dispatch = useDispatch();

  let deployable = false;
  let movable = false;
  let unitSelectable = false;

  if (props.validZones.includes(props.zone.id)) {
    if (props.tileMode === "deploy") {
      deployable = true;
    } else if (props.tileMode === "move" && !props.zone.player) {
      movable = true;
    } else if (props.tileMode === "selectUnit") {
      unitSelectable = true;
    }
  }

  const onClickTile = () => {
    if (deployable) {
      props.deployUnit(props.zone.row, props.zone.column, props.deployClass);
    } else if (movable) {
      props.moveUnit(props.movingUnit, props.zone.id, props.movingSpecial);
      props.setMovingSpecial(null);
    } else {
      // props.getZonesInRange(props.zone.row, props.zone.column, 1, false);
    }
  };

  return (
    <div
      className={deployable || movable || unitSelectable ? "selectable" : ""}
      onClick={() => onClickTile()}
    >
      <div className={`tile ${self !== "guest" ? "" : "reversed-tile"}`}>
        {/* Tile coordinates below */}

        {/* {!props.zone.player && (
          <>
            [{props.zone.row},{props.zone.column}]
          </>
        )} */}
      </div>
    </div>
  );
};

export default Tile;
