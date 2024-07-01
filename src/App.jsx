import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";

import Navbar from "./navigation/Navbar";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import MyRepertoires from "./pages/MyRepertoires";
import Repertoire from "./pages/Repertoire";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";
import Demo from "./pages/Demo";
import Rules from "./pages/Rules";

import LoadingImage from "./components/displays/LoadingImage";

import { useCardImageSwitch } from "./hooks/useCardImageSwitch";

function App() {
  const { user, authIsReady } = useAuthContext();

  const [loadingImages, setLoadingImages] = useState(true);
  const [percentLoaded, setPercentLoaded] = useState(0);
  const { imagesLoadingList } = useCardImageSwitch();

  let loadedImages = 0;
  const totalImages = imagesLoadingList.length;
  useEffect(() => {
    const imageElements = imagesLoadingList.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => handleImageLoad();
      img.onerror = () => handleImageLoad();
      return img;
    });

    function handleImageLoad() {
      loadedImages++;
      if (loadedImages === totalImages) {
        setLoadingImages(false);
      }
    }
  }, [imagesLoadingList]);

  useEffect(() => {
    setPercentLoaded(Math.round(loadedImages / totalImages) * 100);
  }, [loadedImages]);

  ////////

  return (
    <div className="App-body">
      <div className="App">
        {authIsReady && (
          <BrowserRouter>
            <Navbar />

            {/* <LoadingImage percentLoaded={50} /> */}

            {loadingImages && <LoadingImage percentLoaded={percentLoaded} />}
            {!loadingImages && (
              <>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" />}
                  />

                  <Route
                    path="/login"
                    element={!user ? <LogIn /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/signup"
                    element={!user ? <SignUp /> : <Navigate to="/" />}
                  />

                  <Route
                    path="/repertoires"
                    element={
                      user ? <MyRepertoires /> : <Navigate to="/login" />
                    }
                  />

                  <Route
                    path="/repertoire/:id"
                    element={user ? <Repertoire /> : <Navigate to="/login" />}
                  />

                  <Route
                    path="/create-game"
                    element={user ? <CreateGame /> : <Navigate to="/login" />}
                  />

                  <Route
                    path="/game"
                    element={user ? <Game /> : <Navigate to="/login" />}
                  />

                  <Route path="/rules" element={<Rules />} />

                  <Route path="/demo/" element={<Demo />} />

                  <Route path="/demo/:id" element={<Demo />} />
                </Routes>
              </>
            )}
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
