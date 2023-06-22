import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import "../css/Navbar.css";


const Navbar = () => {
  const toogleBtn = useRef(null);
  const [toggleBtnIcon, setToggleBtnIcon] = useState(faBarsStaggered);
  const dropdownMenu = useRef(null);
  const openMenu = () => {
    dropdownMenu.current.classList.toggle("open");
    const isOpen = dropdownMenu.current.classList.contains("open");
    // console.log(toggleBtnIcon.current.classList);
    if (isOpen) {
      setToggleBtnIcon(faXmark);
    } else {
      setToggleBtnIcon(faBarsStaggered);
    }
  };
  return (
    <div className="header">
      {/*--------Navbar--------*/}
      <div className="topNav">
        {/* logo */}
        <div className="logo">
          <a href="/">
            <img src="./Image/doctorai_logo.svg" alt="" />
          </a>
        </div>
        {/* menu */}
        <ul className="links">
          <li>
            <a href="services">Services</a>
          </li>
          <li>
            <a href="about">About</a>
          </li>
          <li>
            <a href="contact-us">Contact Us</a>
          </li>
        </ul>
        {/* signup */}
        <a href="/signup" className="action_btn">
          Sign In
        </a>
        <div className="toggle_btn" ref={toogleBtn} onClick={openMenu}>
          <FontAwesomeIcon icon={toggleBtnIcon} />
        </div>
      </div>
      <div className="dropdown_menu" ref={dropdownMenu}>
        <ul>
          <li className="dropdown_links">
            <a href="services">Services</a>
          </li>
          <li className="dropdown_links">
            <a href="about">About</a>
          </li>
          <li className="dropdown_links">
            <a href="contact-us">Contact Us</a>
          </li>
          <li>
            <a href="#" className="action_btn">
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
