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

import Navbar from "./navigation/navbar";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import MyRepertoires from "./pages/MyRepertoires";
import CreateRepertoire from "./pages/CreateRepertoire";

function App() {
  const [count, setCount] = useState(0);
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
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
              path="/create-repertoire"
              element={user ? <CreateRepertoire /> : <Navigate to="/login" />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
