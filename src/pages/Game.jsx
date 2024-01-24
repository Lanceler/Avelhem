import { useAuthContext } from "../hooks/useAuthContext";

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { db } from "../config/firebaseConfig";

import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import SelectRepertoire from "../components/modals/SelectRepertoire";
import Loading from "../components/modals/Loading";

export default function Game() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [gameId, setGameId] = useState(null);
  const [gameData, setGameData] = useState(null);

  const [playerNumber, SetPlayerNumber] = useState("player2");

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const queryGame = queryParams.get("g");

  //---Realtime data functionality below
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

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
          setError("No game found.");
          setIsLoading(false);
        } else {
          const GameDoc = snapshot.docs[0];
          setGameId(GameDoc.data().id);

          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [queryGame]);

  useEffect(() => {
    setIsLoading(true);

    console.log(playerNumber);

    let unsubscribe;

    if (gameId) {
      let documentRef = doc(db, "gameInfo", gameId);

      unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setGameData(docSnapshot.data());
          console.log("Change!");
          // readGameState();
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
      SetPlayerNumber("player1");
    }
    console.log("NOOO!!!");
  }, [gameData && gameData.hostId]);

  //---Realtime data functionality above

  //---Player situation functionality below

  const onJoinGame = async () => {
    setIsLoading(true);

    try {
      const gameDoc = doc(db, "gameInfo", gameId);

      await updateDoc(gameDoc, {
        guestId: user.uid,
      });
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const onSelectRepertoire = async (rep) => {
    setIsLoading(true);

    try {
      const gameDoc = doc(db, "gameInfo", gameId);

      let newGameState = JSON.parse(JSON.stringify(gameData.GameState));
      newGameState.skillRepertoires[playerNumber] = rep.skillRepertoire;
      newGameState.avelhemRepertoires[playerNumber] = rep.avelhemRepertoire;

      await updateDoc(gameDoc, { GameState: newGameState });

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const readGameState = () => {
    let playerSituation = 0;

    if (gameData && user.uid === gameData.hostId) {
      console.log("Host");

      if (!gameData.guestId) {
        console.log("Waiting");
      } else {
        console.log("Play");
        playerSituation = 1;

        if (!gameData.GameState.skillRepertoires.player1) {
          playerSituation = 1.5;
        } else if (!gameData.GameState.skillRepertoires.player2) {
          playerSituation = 1.6;
        }
      }
    } else if (gameData && user.uid === gameData.guestId) {
      console.log("Guest");
      console.log("Play");
      playerSituation = 1;

      if (!gameData.GameState.skillRepertoires.player2) {
        playerSituation = 1.5;
      } else if (!gameData.GameState.skillRepertoires.player1) {
        playerSituation = 1.6;
      }
    } else if (gameData) {
      if (!gameData.guestId) {
        console.log("Do you want to join?");
        playerSituation = 2;
      } else {
        console.log("Spectate?");
        playerSituation = 3;
      }
    }

    switch (playerSituation) {
      case 0:
        return <div>Waiting</div>;
      case 1:
        return (
          <>
            <div>Play, {playerNumber}</div>
          </>
        );

      case 1.5:
        return (
          <>
            <div>Select your repertoire</div>
            <SelectRepertoire onSelectRepertoire={onSelectRepertoire} />
          </>
        );

      case 1.6:
        return (
          <>
            <div>Waiting for opponent to select repertoire</div>
          </>
        );

      case 2:
        return (
          <>
            <button onClick={() => onJoinGame()}>Join Game</button>
          </>
        );
      case 3:
        return <div>Spectate?</div>;
      default:
        return <div>Spectate?</div>;
    }
  };

  //---Player situations functionality above

  return (
    <>
      <div>Game</div>
      {gameId && <div>Game Id: {gameId}</div>}
      {gameData && <div>Creator: {gameData.hostName}</div>}
      {error && <div>Error: {error}</div>}
      {readGameState()}
      {isLoading && <Loading />}
    </>
  );
}
