import React, { useState, useEffect } from "react";

import "./dashboard.css";

import {
  FaTools,
  FaShoppingCart,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if menu is open

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  useEffect(() => {
    const mainMenuLi = document
      .getElementById("mainMenu")
      .querySelectorAll("li");

    function changeActive() {
      mainMenuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    mainMenuLi.forEach((n) => n.addEventListener("click", changeActive));
  }, []);

  return (
    <menu className={isMenuOpen ? "open" : ""}> 
      <h1 className="site-title" >
       <i className="site-name"></i><br></br>
       <FaBars onClick={toggleMenu}/>

      </h1><br></br>

     
      <ul id="mainMenu">
        <li>
          <Icon icon={<FaTools />} />
          {isMenuOpen && <span>Farm Management Tools</span>} 
        </li>
        <li>
          <Icon icon={<FaShoppingCart />} />
          {isMenuOpen && <span>Farm Supply Marketplace</span>}
        </li>
        <li>
          <Icon icon={<FaCalendarAlt />} />
          {isMenuOpen && <span>Crop Calendar</span>}
        </li>
        <li>
          <Icon icon={<FaChartLine />} />
          {isMenuOpen && <span>Analytics</span>}
        </li>
      </ul>

      <ul className="lastMenu">
        <Icon icon={<FaCog />} />
        {isMenuOpen && <span>Settings</span>}
        <Icon icon={<FaSignOutAlt />} />
        {isMenuOpen && <span>Logout</span>}
      </ul>
    </menu>
  );
}

const Icon = ({ icon }) => (
  <li>
    <a href="#">{icon}</a>
  </li>
);

export default Menu;
