import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import { useState } from "react";

import "./App.css";

import Board from "./components/Board";
import Piece from "./components/Piece";

import Navbar from "./navigation/Navbar";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import MyRepertoires from "./pages/MyRepertoires";
import Repertoire from "./pages/Repertoire";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App-body">
      <div className="App">
        {authIsReady && (
          <BrowserRouter>
            <Navbar />
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
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
