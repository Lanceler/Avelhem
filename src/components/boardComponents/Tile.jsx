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
      props.moveUnit(props.movingUnit, props.zone.id);
    } else {
      // props.getZonesInRange(props.zone.row, props.zone.column, 1, false);
    }
  };

  const canClick = (element1) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 43:
            return element1 === 37;

          case 53:
            return element1 === 27;

          case 59:
            return element1 === 22;

          case 119:
            return element1 === 3;

          //////////////////////////
        }
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 43:
          case 53:
          case 59:
          case 119:
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
        <div className="tile-outline"></div>
      </div>
    </div>
  );
};

export default Tile;
