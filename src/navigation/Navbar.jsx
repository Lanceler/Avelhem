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

  // const onMouseEnter = () => {
  //   setDropdown(true);
  // };

  // const onMouseLeave = () => {
  //   setDropdown(false);
  // };

  return (
    <>
      <div className="pushDown"></div>
      <nav className="navbar">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="menu-icon"
            onClick={() => {
              setClick(!click), setDropdown(false);
            }}
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>

        <div className="leftContainer">
          <Link to="/">
            <img src={AvelhemLogo} className="avelhem-logo" />
          </Link>
          <span></span>
          {/* <div className="nav-user">{user && user.displayName}</div> */}
        </div>

        <ul className={`nav-menu ${click ? "active" : ""}`}>
          <li className="nav-item">
            <Link
              to="/demo/learn"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Tutorial{" "}
            </Link>
          </li>
          <li
            className="nav-item"
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
          >
            <Link
              // to="/demo"
              className={`nav-links ${
                dropdown ? "nav-links-dropExpanded" : ""
              }`}
              // className="nav-links-dropExpanded"
              onClick={() => {
                // closeMobileMenu();
                setDropdown(!dropdown);
              }}
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

            <>
              {dropdown && <DemoDropdown closeMobileMenu={closeMobileMenu} />}
            </>
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
