import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Demo.css";
import BoardArea from "../components/BoardArea";
import InfoPopUp from "../components/modals/InfoPopUp";
import { useDemoGameStates } from "../hooks/useDemoGameStates";
import { useSelector, useDispatch } from "react-redux";
import { updateDemo } from "../redux/demoGuide";
import { updateDemoCount } from "../redux/demoCount";
import { updatecontingencySettings } from "../redux/contingencySettings";
import { useRecurringEffects } from "../hooks/useRecurringEffects";
import { useGetImages } from "../hooks/useGetImages";

export const demoSteps = {
  aveleimHand: 1.1,
  resonate: 1.2,
};

export default function Demo() {
  const { id } = useParams(); //note: id was entered as the parameter in the routes of App.jsx
  const navigate = useNavigate();

  const { getDemoGameState } = useDemoGameStates();

  const { demoGuide } = useSelector((state) => state.demoGuide);
  const { demoCount } = useSelector((state) => state.demoCount);

  const { contingencySettings } = useSelector(
    (state) => state.contingencySettings
  );
  const dispatch = useDispatch();

  const { getBannerImage } = useGetImages();

  const [demoGameState, setDemoGameState] = useState(null);

  const [demoTitle, setDemoTitle] = useState("Gameplay Demo");

  const { newUnitStats } = useRecurringEffects();

  const [currentPlayer, setCurrentPlayer] = useState("host");
  const [infoPopUp, setInfoPopUp] = useState(null);

  // const [isDemoGuide, setIsDemoGuide] = useState(null);

  useEffect(() => {
    dispatch(
      updatecontingencySettings({
        Activation: true,
        Ascension: false,
        Elimination: true,
        Motion: true,
        Survival: true,
        Target: true,
      })
    );

    if (!id || !["game", "learn-overview", "classes"].includes(id)) {
      // console.log(id);
      navigate("/demo/game");
    } else {
      setDemoGameState(JSON.parse(JSON.stringify(getDemoGameState(id))));

      switch (id) {
        case "game":
          setInfoPopUp("game");
          setCurrentPlayer("host");
          setDemoTitle("Gameplay Demo");
          dispatch(updateDemo(null));
          dispatch(updateDemoCount(null));
          break;

        case "learn-overview":
          // setInfoPopUp("learn");
          setCurrentPlayer("guest");
          setDemoTitle("Gameplay Tutorial");

          dispatch(updateDemo("Learn-overview"));
          dispatch(updateDemoCount(1));

          dispatch(
            updatecontingencySettings({
              Activation: false,
              Ascension: false,
              Elimination: false,
              Motion: false,
              Survival: false,
              Target: true,
            })
          );
          break;

        case "classes":
          setInfoPopUp("classes");
          setDemoTitle("Class Exhibit");
          dispatch(updateDemo("Classes"));
          dispatch(updateDemoCount(null));
          break;
      }
    }
  }, [id]);

  const changeCurrentPlayer = () => {
    if (currentPlayer === "host") {
      setCurrentPlayer("guest");
    } else {
      setCurrentPlayer("host");
    }
  };

  // const canClick = (element) => {
  //   switch (demoGuide) {
  //     case "Learn1.82":
  //       return element === "Switch Player Button";
  //   }
  // };

  // const handleUpdateDemoGuide = () => {
  // };

  useEffect(() => {
    if ([7, 8, 9, 20, 29, 33, 49, 114].includes(demoCount)) {
      scriptedDemo();
    }
  }, [demoCount]);

  const scriptedDemo = () => {
    const duplicateDemoGameState = JSON.parse(JSON.stringify(demoGameState));

    switch (demoGuide) {
      case "Learn-overview":
        switch (demoCount) {
          case 7:
            setCurrentPlayer("host");
            break;

          case 8:
            duplicateDemoGameState.host.skillHand = [
              "SA-04",
              "01-01",
              "08-03",
              "05-02",
              "06-01",
            ];

            const a = duplicateDemoGameState.host.avelhemRepertoire.length;
            duplicateDemoGameState.host.avelhemRepertoire[a - 1] = 2;
            duplicateDemoGameState.host.avelhemRepertoire[a - 2] = 6;

            const b = duplicateDemoGameState.host.skillRepertoire.length;
            duplicateDemoGameState.host.skillRepertoire[b - 1] = "SB-05";
            duplicateDemoGameState.host.skillRepertoire[b - 2] = "06-02";
            break;

          case 9:
            const newZoneInfo = [...JSON.parse(duplicateDemoGameState.zones)];

            duplicateDemoGameState.host.units = [
              newUnitStats("host", 0, 6, 0, "Pawn"),
              newUnitStats("host", 1, 6, 2, "Pawn"),
              newUnitStats("host", 2, 6, 4, "Pawn"),
            ];
            duplicateDemoGameState.guest.units = [
              newUnitStats("guest", 0, 3, 4, "Pawn"),
              newUnitStats("guest", 1, 3, 2, "Pawn"),
              newUnitStats("guest", 2, 3, 0, "Pawn"),
            ];

            newZoneInfo[6][0].player = "host";
            newZoneInfo[6][0].unitIndex = 0;
            newZoneInfo[6][2].player = "host";
            newZoneInfo[6][2].unitIndex = 1;
            newZoneInfo[6][4].player = "host";
            newZoneInfo[6][4].unitIndex = 2;
            newZoneInfo[3][0].player = "guest";
            newZoneInfo[3][0].unitIndex = 2;
            newZoneInfo[3][2].player = "guest";
            newZoneInfo[3][2].unitIndex = 1;
            newZoneInfo[3][4].player = "guest";
            newZoneInfo[3][4].unitIndex = 0;

            duplicateDemoGameState.zones = JSON.stringify(newZoneInfo);
            break;

          case 20:
            duplicateDemoGameState.host.bountyPoints = 6;
            break;

          case 29:
            duplicateDemoGameState.tactics = [
              { face: "Advance", limit: 1, stock: 1 },
              { face: "Advance", limit: 1, stock: 1 },
            ];
            break;

          case 33:
          case 49:
            duplicateDemoGameState.tactics = [
              { face: "Advance", limit: 1, stock: 1 },
              { face: "Mobilize", limit: 3, stock: 3 },
            ];
            break;

          case 114:
            duplicateDemoGameState.host.units[4] = {
              player: "host",
              unitIndex: 4,
              row: 1,
              column: 3,
              unitClass: "Wind Scion",
              hp: 1,
              aether: 1,
              afflictions: {},
              enhancements: {},
              boosts: {},
              temporary: {},
            };
            break;
          //////////////////////
        }
    }

    //////////////////////

    setDemoGameState(duplicateDemoGameState);
  };

  return (
    <>
      {demoGameState && (
        <div
          className={`demo-body ${
            ["Learn-overview"].includes(demoGuide) ? "demoBlocker" : ""
          }`}
          style={{
            backgroundImage: `url(${getBannerImage("Heir")})`,
          }}
        >
          <div className="demo-header">
            {demoTitle}
            {/* {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="question-icon2"
              style={{ pointerEvents: "all", fill: "goldenrod" }}
              onClick={() => setInfoPopUp(id)}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg> */}
          </div>

          <div className="demo-board">
            <BoardArea
              userRole={currentPlayer}
              demo={true}
              demoGame={id === "game"}
              gameState={demoGameState}
              setDemoGameState={setDemoGameState}
              demoInstructions={true}
              changeCurrentPlayer={changeCurrentPlayer}
              playerStatus={"ready"}
            />
          </div>

          <div className="board-data">
            <>
              Initiator:{" "}
              {demoGameState.turnPlayer !== null &&
                demoGameState[demoGameState.turnPlayer].displayName}
              <br />
              Turn Count: {demoGameState.turnCount}
              <br />
              Phase: {demoGameState.turnPhase}
              <br />
              {demoGameState.currentResolution.length > 0 && (
                <>
                  {
                    demoGameState.currentResolution[
                      demoGameState.currentResolution.length - 1
                    ].resolution
                  }
                </>
              )}
              <br />
              {demoGameState.currentResolution.length > 0 && (
                <>
                  {
                    demoGameState.currentResolution[
                      demoGameState.currentResolution.length - 1
                    ].resolution2
                  }
                </>
              )}
            </>
          </div>

          {infoPopUp && (
            <InfoPopUp
              info={infoPopUp}
              setInfoPopUp={setInfoPopUp}
              mobile={true}
            />
          )}

          {/* display demoGuide for debugging */}

          {/* {demoGuide && <h1>{demoGuide}</h1> && <h2>{demoCount}</h2>} */}
        </div>
      )}
    </>
  );
}
