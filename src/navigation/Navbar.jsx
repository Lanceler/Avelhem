import "./Navbar.css";

import React from "react";
import { Link } from "react-router-dom";

import { useLogOut } from "../hooks/useLogout"; // fix capitalization if needed; for some reason, it insists on lower o in 'out', when it should be upper

import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logOut } = useLogOut();

  return (
    <>
      <div className="pushDown"></div>
      <div className="navbar">
        <nav>
          <Link to="/">
            <h1>Avelhem</h1>
          </Link>
          <div>
            <div>
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
