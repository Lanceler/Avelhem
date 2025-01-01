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

  const canClick = (element1, element2) => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 39:
            return element1 === "Tile" && element2 === 37;
        }
    }

    // switch (demoGuide) {
    //   case "Learn1.44":
    //     return element === "Tile" && [27].includes(element2);

    //   case "Learn1.52":
    //     return element === "Tile" && [22].includes(element2);

    //   case "Learn1.58":
    //     return element === "Tile" && [26].includes(element2);

    //   case "Learn1.63":
    //     return element === "Tile" && [28].includes(element2);

    //   case "Learn1.196":
    //     return element === "Tile" && [27].includes(element2);

    //   case "Learn1.254":
    //     return element === "Tile" && [18].includes(element2);

    //   case "Learn1.273":
    //     return element === "Tile" && [3].includes(element2);

    ////////////////////////////
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 39:
            dispatch(updateDemoCount(demoCount + 1));
            break;
        }
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
