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
import Board from "../components/Board";

export default function Game() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [gameId, setGameId] = useState(null);
  const [gameData, setGameData] = useState(null);

  const [userRole, SetUserRole] = useState("");

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
      SetUserRole("host");
    } else if (gameData && user.uid === gameData.guestId) {
      SetUserRole("guest");
    } else {
      SetUserRole("");
    }
    console.log("Role identified: " + userRole);
  }, [gameData && gameData.hostId, gameData && gameData.guestId]);

  //---Realtime data functionality above

  //---Player situation functionality below

  const onJoinGame = async () => {
    setIsLoading(true);

    try {
      const gameDoc = doc(db, "gameInfo", gameId);

      await updateDoc(gameDoc, {
        guestId: user.uid,
        guestName: user.displayName,
      });
      setIsLoading(false);
      SetUserRole("guest");
    } catch (err) {
      setError(err.message);
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
      setError(err.message);
      setIsLoading(false);
    }
  };

  const readgameState = () => {
    let playerSituation = 0;

    if (gameData && userRole === "host") {
      if (!gameData.guestId) {
      } else {
        playerSituation = 1;

        if (!gameData.gameState.host.skillRepertoire) {
          playerSituation = 1.5;
        } else if (!gameData.gameState.guest.skillRepertoire) {
          playerSituation = 1.6;
        }
      }
    } else if (gameData && userRole === "guest") {
      playerSituation = 1;

      if (!gameData.gameState.guest.skillRepertoire) {
        playerSituation = 1.5;
      } else if (!gameData.gameState.host.skillRepertoire) {
        playerSituation = 1.6;
      }
    } else if (gameData) {
      if (!gameData.guestId) {
        playerSituation = 2;
      } else {
        playerSituation = 3;
      }
    }

    switch (playerSituation) {
      case 0:
        return <div>Waiting</div>;
      case 1:
        return (
          <>
            <div>Role: {userRole}</div>
            <Board
              gameState={gameData.gameState}
              gameId={gameData.id}
              userRole={userRole}
            />
          </>
        );

      case 1.5:
        return <SelectRepertoire onSelectRepertoire={onSelectRepertoire} />;

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
      {/* <div>Game</div> */}
      {/* {gameId && <div>Game Id: {gameId}</div>} */}
      {gameData && <div>Creator: {gameData.hostName}</div>}
      {error && <div>Error: {error}</div>}
      {readgameState()}
      {isLoading && <Loading />}
    </>
  );
}
