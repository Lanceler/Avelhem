import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDemoCount } from "../../redux/demoCount";

import "./Tile.css";

const Tile = (props) => {
  const { self } = useSelector((state) => state.teams);
  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

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

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 39:
            return element1 === 37;
          case 51:
            return element1 === 27;
          case 58:
            return element1 === 22;
          case 70:
            return element1 === 28;
          case 123:
            return element1 === 3;

          ////////////////////////////
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 39:
          case 51:
          case 58:
          case 70:
          case 123:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
    }
  };

  return (
    <div
      className={`${
        deployable || movable || unitSelectable ? "selectable" : ""
      } ${canClick(props.zone.id) ? "demoClick" : ""}`}
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
