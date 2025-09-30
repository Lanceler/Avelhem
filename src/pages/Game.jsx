import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetImages } from "../hooks/useGetImages";

import { db } from "../config/firebaseConfig";
import { updateDemo } from "../redux/demoGuide";
import { updateDemoCount } from "../redux/demoCount";
import { updatecontingencySettings } from "../redux/contingencySettings";

import Loading from "../components/modals/Loading";
import BoardArea from "../components/BoardArea";

import { AnimatePresence, motion } from "framer-motion";

import InfoPopUp from "../components/modals/InfoPopUp";

import "./Game.css";

export default function Game() {
  const dispatch = useDispatch();
  const { getBannerImage } = useGetImages();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [gameError, setGameError] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [playerStatus, setPlayerStatus] = useState("");
  const [banner, setBanner] = useState({ title: "", buttonText: "" });

  const [infoPopUp, setInfoPopUp] = useState(null);
  const [infoClosed, setInfoClosed] = useState(false);

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const queryGame = queryParams.get("g");

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
    updateDemo(null);
    updateDemoCount(0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setGameError(null);

    let createdGamesCollectionRef = collection(db, "gameInfo");

    if (queryGame) {
      createdGamesCollectionRef = query(
        createdGamesCollectionRef,
        where("id", "==", queryGame)
      );
    } else {
      navigate("/");
    }

    getDocs(createdGamesCollectionRef)
      .then((snapshot) => {
        if (snapshot.empty) {
          setGameError("Game not found");
          setIsLoading(false);
        } else {
          const GameDoc = snapshot.docs[0];
          setGameId(GameDoc.data().id);
          // setIsLoading(false);
        }
      })
      .catch((err) => {
        setGameError(err.message);
        setIsLoading(false);
      });
  }, [queryGame, navigate]);

  useEffect(() => {
    // setIsLoading(true);
    let unsubscribe;

    if (gameId) {
      let documentRef = doc(db, "gameInfo", gameId);

      unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setGameData(docSnapshot.data());
        } else {
          console.log("Game does not exist");
          setIsLoading(false);
        }
      });
    }

    return () => unsubscribe?.();
  }, [gameId]);

  useEffect(() => {
    setUserRole("spectator");

    if (gameData) {
      if (!user) {
        setUserRole("spectator");
      } else if (user.uid === gameData.hostId) {
        setUserRole("host");
      } else if (user.uid === gameData.guestId) {
        setUserRole("guest");
      }

      if (gameData.teaTrial && !infoClosed) {
        setInfoPopUp("tea");
        setInfoClosed(true);
      }
      setIsLoading(false);
    }
  }, [gameData, user?.uid]);

  const handleJoinGame = async () => {
    try {
      const gameDoc = doc(db, "gameInfo", gameId);
      await updateDoc(gameDoc, {
        guestId: user.uid,
        guestName: user.displayName,
      });
      setIsLoading(false);
      setUserRole("guest");
    } catch (err) {
      setGameError(err.message);
      setIsLoading(false);
    }
  };

  const onSelectRepertoire = async (rep) => {
    setIsLoading(true);

    try {
      const gameDoc = doc(db, "gameInfo", gameId);
      let newGameState = JSON.parse(JSON.stringify(gameData.gameState));
      newGameState[userRole].skillRepertoire = rep.skillRepertoire;
      newGameState[userRole].avelhemRepertoire = rep.avelhemRepertoire;
      newGameState[userRole].displayName = user.displayName;

      await updateDoc(gameDoc, { gameState: newGameState });

      setIsLoading(false);
    } catch (err) {
      setGameError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (gameError) {
      setPlayerStatus("error");
      setBanner({
        title: gameError.toUpperCase(),
        buttonText: "Return to homepage",
      });
    } else if (gameData) {
      if (!user) {
        setPlayerStatus("login");
        setBanner({
          title: (
            <>
              INVITED BY: <br />
              {gameData.hostName}
            </>
          ),
          buttonText: <>Log in to play</>,
        });
      } else if (userRole === "host") {
        if (!gameData.guestId) {
          setPlayerStatus("waiting");
          setBanner({
            title: "WAITING FOR OPPONENT",
            buttonText: (
              <>
                Send the URL to a friend
                <br />
                to play with them.
                <br />
                <br />
                Click to copy to clipboard.
              </>
            ),
          });
        } else if (!gameData.gameState.host.skillRepertoire) {
          setPlayerStatus("pick repertoire");
        } else if (!gameData.gameState.guest.skillRepertoire) {
          setPlayerStatus("wait enemy repertoire");
          setBanner({
            title: (
              <>
                Waiting for opponent <br /> to select repertoire
              </>
            ),
            buttonText: null,
          });
        } else {
          setPlayerStatus("ready");
        }
      } else if (userRole === "guest") {
        if (!gameData.gameState.guest.skillRepertoire) {
          setPlayerStatus("pick repertoire");
        } else if (!gameData.gameState.host.skillRepertoire) {
          setPlayerStatus("wait enemy repertoire");
          setBanner({
            title: (
              <>
                Waiting for opponent <br /> to select repertoire
              </>
            ),
            buttonText: null,
          });
        } else {
          setPlayerStatus("ready");
        }
      } else if (!gameData.guestId) {
        setPlayerStatus("join");
        setBanner({
          title: (
            <>
              INVITED BY: <br />
              {gameData.hostName}
            </>
          ),
          buttonText: "Accept Challenge",
        });
      } else {
        if (
          gameData.gameState.guest.skillRepertoire &&
          gameData.gameState.host.skillRepertoire
        )
          setPlayerStatus("spectate");
        else {
          setPlayerStatus("spectate wait");
        }
      }
    }
  }, [gameData, userRole, gameError]);

  const bannerButton = () => {
    switch (playerStatus) {
      case "waiting":
        return handleCopyUrl();
      case "join":
        return handleJoinGame();
      case "login":
        return navigate("/login");
      case "error":
        return navigate("/");
      default:
        return null;
    }
  };

  const gameInvite = () => {
    return (
      <div className="game-banner-backdrop">
        <div className="game-banner-title">{banner.title}</div>
        <div className="game-banner-text-body">
          <div className="game-banner-text">
            <div className="game-banner-expansion">
              Set: {gameData?.expansion}
            </div>

            {banner.buttonText && (
              <button
                className="game-banner-button"
                onClick={() => bannerButton()}
              >
                {banner.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="game-body"
      style={{
        backgroundImage: `url(${
          gameData?.expansion === "Tea Trial"
            ? getBannerImage("Tea")
            : getBannerImage("Challenge")
        })`,
      }}
    >
      <AnimatePresence>
        <motion.div
          key="BoardArea"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.15 }}
        >
          <BoardArea
            gameState={gameData ? gameData.gameState : null}
            gameId={gameData ? gameData.id : null}
            userRole={userRole}
            playerStatus={playerStatus}
            gameInvite={gameInvite}
            onSelectRepertoire={onSelectRepertoire}
            expansion={gameData ? gameData.expansion : null}
          />
        </motion.div>
      </AnimatePresence>

      <div className="board-data">
        {gameError && <>Something went wrong...</>}
        {gameData?.gameState && (
          <>
            Initiator:{" "}
            {gameData.gameState.turnPlayer !== null &&
              gameData.gameState[gameData.gameState.turnPlayer].displayName}
            <br />
            Turn Count: {gameData.gameState.turnCount}
            <br />
            Phase: {gameData.gameState.turnPhase}
            <br />
            {gameData.gameState.currentResolution.length > 0 && (
              <>
                {
                  gameData.gameState.currentResolution[
                    gameData.gameState.currentResolution.length - 1
                  ].resolution
                }
              </>
            )}
            <br />
            {gameData.gameState.currentResolution.length > 0 && (
              <>
                {
                  gameData.gameState.currentResolution[
                    gameData.gameState.currentResolution.length - 1
                  ].resolution2
                }
              </>
            )}
          </>
        )}
      </div>
      {isLoading && <Loading />}
      {infoPopUp && (
        <InfoPopUp info={infoPopUp} setInfoPopUp={setInfoPopUp} mobile={true} />
      )}
    </div>
  );
}
