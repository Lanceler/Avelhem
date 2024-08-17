import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../../redux/demoGuide";

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
      case "Learn1.44":
        return element === "Tile" && [27].includes(element2);

      case "Learn1.52":
        return element === "Tile" && [22].includes(element2);

      case "Learn1.58":
        return element === "Tile" && [26].includes(element2);

      case "Learn1.63":
        return element === "Tile" && [28].includes(element2);

      case "Learn1.196":
        return element === "Tile" && [27].includes(element2);

      case "Learn1.254":
        return element === "Tile" && [18].includes(element2);

      case "Learn1.273":
        return element === "Tile" && [3].includes(element2);

      ////////////////////////////
      case "Fire1.25":
        return element === "Tile" && [2, 3, 4].includes(element2);
    }
  };

  const handleUpdateDemoGuide = () => {
    switch (demoGuide) {
      case "Learn1.44":
        dispatch(updateDemo("Learn1.45"));
        break;

      case "Learn1.52":
        dispatch(updateDemo("Learn1.53"));
        break;

      case "Learn1.58":
        dispatch(updateDemo("Learn1.59"));
        break;

      case "Learn1.63":
        dispatch(updateDemo("Learn1.64"));
        break;

      case "Learn1.196":
        dispatch(updateDemo("Learn1.197"));
        break;

      case "Learn1.254":
        dispatch(updateDemo("Learn1.255"));
        break;

      case "Learn1.273":
        dispatch(updateDemo("Learn1.274"));
        break;

      /////////////////////////////
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
