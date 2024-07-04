import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const DemoDropdown = (props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleClick = () => {
    setOpenDropdown(!openDropdown);
    props.closeMobileMenu();
  };

  const demoItems = [
    {
      title: "Sample Game",
      path: "/demo/game",
    },
    {
      title: "Fire Scion",
      path: "/demo/fire",
    },
  ];

  return (
    <>
      <ul
        onClick={handleClick}
        className={openDropdown ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {demoItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className="dropdown-link"
                to={item.path}
                onClick={() => setOpenDropdown(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
        <li>
          <Link className="dropdown-link more-to-add">More to be added</Link>
        </li>
      </ul>
    </>
  );
};

export default DemoDropdown;
