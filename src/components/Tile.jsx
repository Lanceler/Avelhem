import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../redux/demoGuide";

import "./Tile.css";

const Tile = (props) => {
  const { localGameState } = useSelector((state) => state.gameState);
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);

  const dispatch = useDispatch();

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

  const canClick = (element, element2) => {
    switch (demoGuide) {
      case "Fire1.25":
        switch (element) {
          case "Tile":
            return [2, 3, 4].includes(element2);
        }
        break;
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Fire1.25":
        dispatch(updateDemo("Fire1.26"));
        break;
    }
  };

  return (
    <div
      className={`${
        deployable || movable || unitSelectable ? "selectable" : ""
      } ${canClick("Tile", props.zone.id) ? "demoClick" : ""}`}
      onClick={() => {
        onClickTile();
        handleUpdateDemoGuide();
      }}
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
