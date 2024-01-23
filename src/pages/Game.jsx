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

export default function Game() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [gameId, setGameId] = useState(null);
  const [gameData, setGameData] = useState(null);

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
    let unsubscribe;
    if (gameId) {
      let documentRef = doc(db, "gameInfo", gameId);

      unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setGameData(docSnapshot.data());
          console.log("Change!");
        } else {
          console.log("Game does not exist");
        }
      });
    }

    return () => unsubscribe?.();
  }, [gameId]);

  //------

  return (
    <>
      <div>Game</div>
      {gameId && <div>gameId: {gameId}</div>}
      {gameData && <div>gameData: {gameData.hostName}</div>}
      {error && <div>{error}</div>}
    </>
  );
}
