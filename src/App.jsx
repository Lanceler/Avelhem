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

import { AnimatePresence, motion } from "framer-motion";

function App() {
  const { user, authIsReady } = useAuthContext();

  const [loadingImages, setLoadingImages] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const { imagesLoadingList } = useCardImageSwitch();

  const totalImages = imagesLoadingList.length;

  useEffect(() => {
    const imageElements = imagesLoadingList.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => handleImageLoad();
      img.onerror = () => handleImageLoad();
      return img;
    });

    const handleImageLoad = () => {
      setImagesLoaded((prev) => {
        const loaded = prev + 1;

        if (loaded === totalImages) {
          setImagesLoaded(totalImages);
          setLoadingImages(false);
          return loaded;
        }

        return loaded;
      });
    };
  }, []);

  useEffect(() => {
    if (!loadingImages) {
      setShowContent(true);
    }
  }, [loadingImages]);

  ////////

  return (
    <div className="App-body">
      <div className="App">
        {authIsReady && (
          <BrowserRouter>
            <Navbar />

            <div className="content">
              {showContent && (
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

              <div style={{ position: "absolute", top: 0, zIndex: 1000 }}>
                <AnimatePresence>
                  {!showContent && (
                    <>
                      <motion.div
                        layout={true}
                        initial={{ opacity: 1, scale: 1 }}
                        // transition={{ duration: 1.5, scale: 0.5 }}
                        exit={{ opacity: 0, transition: { duration: 1.5 } }}
                        className="loading-image"
                        key={1}
                      >
                        <LoadingImage
                          percentLoaded={Math.round(
                            (imagesLoaded / totalImages) * 100
                          )}
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
