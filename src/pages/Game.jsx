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
import { updatecontingencySettings } from "../redux/contingencySettings";

import SelectRepertoire from "../components/modals/SelectRepertoire";
import Loading from "../components/modals/Loading";
import BoardArea from "../components/BoardArea";

import { AnimatePresence, motion } from "framer-motion";

import "./Game.css";

export default function Game() {
  const dispatch = useDispatch();
  const { getBannerImage } = useGetImages();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [gameError, setGameError] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [playerStatus, setPlayerStatus] = useState("");
  const [banner, setBanner] = useState({ title: "", buttonText: "" });

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
  }, [dispatch]);

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
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setGameError(err.message);
        setIsLoading(false);
      });
  }, [queryGame, navigate]);

  useEffect(() => {
    setIsLoading(true);
    let unsubscribe;

    if (gameId) {
      let documentRef = doc(db, "gameInfo", gameId);

      unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setGameData(docSnapshot.data());
        } else {
          console.log("Game does not exist");
        }
      });
    }

    setIsLoading(false);

    return () => unsubscribe?.();
  }, [gameId]);

  useEffect(() => {
    if (gameData && user.uid === gameData.hostId) {
      setUserRole("host");
    } else if (gameData && user.uid === gameData.guestId) {
      setUserRole("guest");
    } else {
      setUserRole("spectator");
    }
  }, [gameData, user.uid]);

  const handleJoinGame = async () => {
    setIsLoading(true);

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
      if (userRole === "host") {
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
            title: "Waiting for opponent to select repertoire",
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
            title: "Waiting for opponent to select repertoire",
            buttonText: null,
          });
        } else {
          setPlayerStatus("ready");
        }
      } else if (!gameData.guestId) {
        setPlayerStatus("join");
        setBanner({
          // title: "ACCEPT CHALLENGE",
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
      case "error":
        return navigate("/");
      default:
        return null;
    }
  };

  return (
    <div
      className="game-body"
      style={{
        backgroundImage: `url(${getBannerImage("MetalBG")})`,
        // backgroundImage: `url(${getBannerImage("Challenge")})`,
      }}
    >
      <AnimatePresence>
        {!["ready", "spectate"].includes(playerStatus) && (
          <motion.div
            key="game-banner"
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="game-banner"
            style={{
              backgroundImage: `url(${getBannerImage("Challenge")})`,
            }}
          >
            <div className="game-banner-backdrop">
              <div className="game-banner-title">{banner.title}</div>
              <div className="game-banner-text-body">
                <div className="game-banner-text">
                  {banner.buttonText && (
                    <button
                      className="home-banner-button"
                      onClick={() => bannerButton()}
                    >
                      {banner.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {["ready", "spectate"].includes(playerStatus) && (
          <motion.div
            key="BoardArea"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            // exit={{ opacity: 0, transition: { duration: 0.75 } }}
          >
            <BoardArea
              gameState={gameData.gameState}
              gameId={gameData.id}
              userRole={userRole}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {playerStatus === "pick repertoire" && (
        <SelectRepertoire onSelectRepertoire={onSelectRepertoire} />
      )}
      {isLoading && <Loading />}
    </div>
  );
}
