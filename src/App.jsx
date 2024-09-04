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

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="app-body">
      <div className="app">
        {authIsReady && (
          <BrowserRouter>
            <Navbar />

            <div className="app-content">
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
                  element={user ? <MyRepertoires /> : <Navigate to="/login" />}
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
                <Route path="/rules/:id" element={<Rules />} />

                <Route path="/demo/" element={<Demo />} />
                <Route path="/demo/:id" element={<Demo />} />
              </Routes>
            </div>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
