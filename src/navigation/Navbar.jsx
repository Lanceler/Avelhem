import "./Navbar.css";

import React from "react";
import { Link } from "react-router-dom";

import { useLogOut } from "../hooks/useLogOut";

import { useAuthContext } from "../hooks/useAuthContext";

import AvelhemLogo from "../assets/others/AvelhemLogo.png";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logOut } = useLogOut();

  return (
    <>
      <div className="pushDown"></div>
      <div className="navbar">
        <nav>
          <div className="leftContainer">
            <Link to="/">
              {/* <h1 className="avelhem-title">Avelhem</h1> */}
              <img src={AvelhemLogo} className="avelhem-logo" />
            </Link>
            <h3>{user && user.displayName}</h3>
          </div>

          <div>
            <div className="navLinks">
              {user && <Link to="/my-games">My Games</Link>}
              {user && <Link to="/repertoires">My Repertoires</Link>}
              {!user && <Link to="/login">Login</Link>}
              {!user && <Link to="/signup">Sign up</Link>}
              {user && (
                <span onClick={logOut} className="logout">
                  Logout
                </span>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
