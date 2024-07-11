import "./Home.css";

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
      {user && <div className="abilityText">Hello, {user.displayName}</div>}

      <div className="home-content">
        <div
          className="home-banner"
          style={{ backgroundImage: `url(${getBannerImage("Learn")})` }}
        >
          <div className="home-banner-backdrop">
            <div className="home-banner-title">LEARN TO PLAY</div>
            <div className="home-banner-title">
              Try our interactive tutorial.
            </div>
          </div>
        </div>

        <div
          className="home-banner"
          style={{ backgroundImage: `url(${getBannerImage("Challenge")})` }}
        >
          <div className="home-banner-backdrop">
            Create a free account to play against a friend.
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
