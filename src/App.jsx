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

import { useGetImages } from "./hooks/useGetImages";

import { AnimatePresence, motion } from "framer-motion";

function App() {
  const { user, authIsReady } = useAuthContext();

  const [loadingImages, setLoadingImages] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const { imagesLoadingList } = useGetImages();

  const totalImages = imagesLoadingList.length;

  const maxRetries = 3;

  useEffect(() => {
    const imageElements = imagesLoadingList.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => handleImageLoad(src, true);
      img.onerror = () => handleImageLoad(src, false);
      return img;
    });

    const retryCounts = new Map();

    const handleImageLoad = (src, success) => {
      setImagesLoaded((prev) => {
        const loaded = prev + 1;

        if (loaded >= totalImages) {
          setImagesLoaded(totalImages);
          setLoadingImages(false);
          return loaded;
        }

        return loaded;
      });

      if (
        !success &&
        (!retryCounts.has(src) || retryCounts.get(src) < maxRetries)
      ) {
        const retryCount = (retryCounts.get(src) || 0) + 1;
        retryCounts.set(src, retryCount);
        loadImage(src); // Retry loading the image
      }
    };

    const loadImage = (src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => handleImageLoad(src, true);
      img.onerror = () => handleImageLoad(src, false);
    };

    imagesLoadingList.forEach((src) => {
      retryCounts.set(src, 0); // Initialize retry count
      loadImage(src);
    });
  }, []);

  useEffect(() => {
    if (!loadingImages) {
      setShowContent(true);
    }
  }, [loadingImages]);

  ////////

  const animateDuration = 3;

  return (
    <div className="app-body">
      <div className="app">
        {authIsReady && (
          <BrowserRouter>
            <Navbar />

            <div className="app-content">
              <AnimatePresence>
                <motion.div
                  layout={true}
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: animateDuration },
                  }}
                  className="loading-image"
                  key={1}
                >
                  <LoadingImage
                    percentLoaded={Math.round(
                      (imagesLoaded / totalImages) * 100
                    )}
                  />
                </motion.div>

                {/* {showContent && (
                  <motion.div
                    layout={true}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: animateDuration + 1 },
                    }}
                    key={0}
                    style={{ height: "100%" }}
                  >
                    <Routes>
                      <Route exact path="/" element={<Home />} />

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
                        element={
                          user ? <Repertoire /> : <Navigate to="/login" />
                        }
                      />

                      <Route
                        path="/create-game"
                        element={
                          user ? <CreateGame /> : <Navigate to="/login" />
                        }
                      />

                      <Route
                        path="/game"
                        element={user ? <Game /> : <Navigate to="/login" />}
                      />

                      <Route path="/rules" element={<Rules />} />

                      <Route path="/demo/" element={<Demo />} />

                      <Route path="/demo/:id" element={<Demo />} />
                    </Routes>
                  </motion.div>
                )}

                {!showContent && (
                  <motion.div
                    layout={true}
                    initial={{ opacity: 1, scale: 1 }}
                    // transition={{ duration: 1.5, scale: 0.5 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: animateDuration },
                    }}
                    className="loading-image"
                    key={1}
                  >
                    <LoadingImage
                      percentLoaded={Math.round(
                        (imagesLoaded / totalImages) * 100
                      )}
                    />
                  </motion.div>
                )} */}
              </AnimatePresence>
            </div>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
