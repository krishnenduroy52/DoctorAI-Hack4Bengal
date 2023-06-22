import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const toogleBtn = useRef(null);
  const [toggleBtnIcon, setToggleBtnIcon] = useState(faBarsStaggered);
  const dropdownMenu = useRef(null);

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("doctor_ai_userID");
    console.log(token);
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    console.log(isLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctor_ai_userID");
    setIsLogin(false);
  };

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
        {isLogin === false ? (
          <Link to="/signup" className="action_btn">
            Sign In
          </Link>
        ) : (
          <Link onClick={handleLogout} className="action_btn">
            Logout
          </Link>
        )}
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
          {isLogin === false ? (
            <li className="dropdown_links">
              <Link to="/signup" className="action_btn">
                Sign In
              </Link>
            </li>
          ) : (
            <li className="dropdown_links">
              <Link onClick={handleLogout} className="action_btn">
                Log Out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
