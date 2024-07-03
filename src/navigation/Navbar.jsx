import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";

import AvelhemLogo from "../assets/others/AvelhemLogo.png";

import DemoDropdown from "./DemoDropdown";

import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logOut } = useLogOut();

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <div className="pushDown"></div>
      <nav className="navbar">
        <div className="leftContainer">
          <Link to="/">
            <img src={AvelhemLogo} className="avelhem-logo" />
          </Link>
          <span></span>
          {/* <div className="nav-user">{user && user.displayName}</div> */}
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              to="/demo/learn"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Tutorial
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to="/demo"
              className={`nav-links ${
                dropdown ? "nav-links-dropExpanded" : ""
              }`}
              // className="nav-links-dropExpanded"
              onClick={closeMobileMenu}
            >
              <>
                Demonstrations{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="caret-down"
                >
                  <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                </svg>
              </>
            </Link>

            <>{dropdown && <DemoDropdown />}</>
            {/* <DemoDropdown /> */}
          </li>

          {user && (
            <li className="nav-item">
              <Link
                to="/create-game"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Create Game
              </Link>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <Link
                to="/repertoires"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Repertoires
              </Link>
            </li>
          )}

          {!user && (
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
          )}

          {!user && (
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <Link
                // to="/"
                className="nav-links"
                // onClick={closeMobileMenu}
                onClick={logOut}
              >
                Log Out
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
