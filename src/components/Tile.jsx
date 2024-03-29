import React from "react";

import { useSelector, useDispatch } from "react-redux";

import "./Tile.css";

import Shield from "../assets/attributeIcons/Shield.png";
import Ward from "../assets/attributeIcons/Ward.png";

const Tile = (props) => {
  let deployable = false;
  let movable = false;
  let unitSelectable = false;

  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  // const dispatch = useDispatch();

  if (
    props.validZones.includes(props.zone.id) &&
    (self === localGameState.turnPlayer || self === props.intrudingPlayer)
  ) {
    if (props.tileMode === "deploy") {
      deployable = true;
    } else if (props.tileMode === "move" && !props.zone.player) {
      movable = true;
    } else if (props.tileMode === "selectUnit") {
      unitSelectable = true;
    }
  }

  let unit = null;
  if (props.zone.player === "host") {
    unit = localGameState.host.units[props.zone.unitIndex];
  } else if (props.zone.player === "guest") {
    unit = localGameState.guest.units[props.zone.unitIndex];
  }

  const onClickTile = () => {
    if (deployable) {
      props.deployPawn(props.zone.row, props.zone.column);
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
        {!props.zone.player && (
          <>
            [{props.zone.row},{props.zone.column}]
          </>
        )}
      </div>
    </div>
  );
};

export default Tile;
