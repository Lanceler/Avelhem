import "./Home.css";

import React from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import { useEffect } from "react";

import { useGetImages } from "../hooks/useGetImages";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuthContext();
  const { getBannerImage } = useGetImages();

  return (
    <div className="home-body">
      <div className="home-content">
        <div
          className="home-banner"
          style={{ backgroundImage: `url(${getBannerImage("Tea")})` }}
        >
          <div className="home-banner-backdrop">
            <div className="home-banner-title">LEARN TO PLAY</div>
            <div className="home-banner-text-body">
              <div className="home-banner-text">
                <Link to="/demo/learn">
                  <button className="home-banner-button">
                    Interactive Tutorial
                  </button>
                </Link>
              </div>
              <div className="home-banner-text">
                <Link to="/">
                  <button className="home-banner-button">
                    Rulebook (To do)
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="home-banner"
          style={{ backgroundImage: `url(${getBannerImage("Challenge")})` }}
        >
          <div className="home-banner-backdrop">
            <div className="home-banner-title">ENTER THE FRAY</div>
            <div className="home-banner-text-body">
              <div className="home-banner-text">
                {!user && (
                  <Link to="/login">
                    <button className="home-banner-button">Sign In</button>
                  </Link>
                )}
                {user && (
                  <Link to="/create-game">
                    <button className="home-banner-button">Host A Game</button>
                  </Link>
                )}
              </div>
              <div className="home-banner-text">
                {!user && (
                  <Link to="/SignUp">
                    <button className="home-banner-button">
                      Create Account
                    </button>
                  </Link>
                )}
                {user && (
                  <Link to="/repertoires">
                    <button className="home-banner-button">
                      View Repertoires
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="home-banner"></div> */}
      </div>

      {/* <br />
      <div className="abilityText">
        This page (and the website in general) is under construction.
      </div>
      <div className="abilityText">
        To get started with a game, click on “Create Game” in the navigation bar
        above.
      </div>
      <div className="abilityText">
        You may also view and customize your decks by clicking on “Repertoires”.
      </div> */}
    </div>
  );
}
