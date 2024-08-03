import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetImages } from "../hooks/useGetImages";

import "./Home.css";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuthContext();
  const { getBannerImage } = useGetImages();

  return (
    <div className="home-body">
      <div
        className="home-content"
        style={{
          // backgroundImage: `url(${getBannerImage("MountainFields")})`,
          backgroundImage: `url(${getBannerImage("LandBG")})`,
        }}
      >
        <div className="home-title">HOME</div>

        <div
          className="home-banner"
          style={{ backgroundImage: `url(${getBannerImage("Foreshadow")})` }}
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
                {!user ? (
                  <Link to="/login">
                    <button className="home-banner-button">Log In</button>
                  </Link>
                ) : (
                  <Link to="/create-game">
                    <button className="home-banner-button">Host A Game</button>
                  </Link>
                )}
              </div>
              <div className="home-banner-text">
                {!user ? (
                  <Link to="/SignUp">
                    <button className="home-banner-button">
                      Create Account
                    </button>
                  </Link>
                ) : (
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
      </div>
    </div>
  );
}
