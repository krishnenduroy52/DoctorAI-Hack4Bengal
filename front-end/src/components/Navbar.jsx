import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faXmark,
  faAngleUp,
  faAngleDown,
  faUser,
  faRightFromBracket,

} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import services_menu from "../assets/json-data/services_menu.json";
import logo from "/Image/doctorai_logo.svg";

const Navbar = () => {
  const toogleBtn = useRef(null);
  const servicesBtn = useRef(null);
  const [toggleBtnIcon, setToggleBtnIcon] = useState(faBarsStaggered);
  const [serviceBtnIcon, setServiceBtnIcon] = useState(faAngleDown);
  const dropdownMenu = useRef(null);

  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("doctor_ai_userID");
  useEffect(() => {
    console.log(token);
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    console.log(isLogin);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("doctor_ai_userID");
    localStorage.removeItem("doctor_ai_isDoc");
    setIsLogin(false);
    window.location.href = "/";
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

  const openServices = () => {
    servicesBtn.current.classList.toggle("open");
    const isOpen = servicesBtn.current.classList.contains("open");
    // console.log(toggleBtnIcon.current.classList);
    if (isOpen) {
      setServiceBtnIcon(faAngleUp);
    } else {
      setServiceBtnIcon(faAngleDown);
    }
  };

  return (
    <div className="header">
      {/*--------Navbar--------*/}
      <div className="topNav">
        {/* logo */}
        <div className="logo">
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        {/* menu */}
        <ul className="links">
          <li className="services">
            <a className="no-link" onClick={openServices}>
              Services{" "}
              <FontAwesomeIcon className="ml-1 w-2" icon={serviceBtnIcon} />
            </a>
            <div ref={servicesBtn} className="services_options">
              <ul>
                {services_menu.items.map((item, index) => {
                  return (
                    <Link key={index} to={item.url}>
                      <li>{item.title}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </li>
          <li>
            <a href="/general/chat">General</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact-us">Contact Us</a>
          </li>
        </ul>
        {/* signup */}
        {isLogin === false ? (
          <Link to="/login" className="action_btn">
            Sign In
          </Link>
        ) : (
          <div className="profile_dropdown">
            <button className="action_btn" onClick={toggleProfileDropdown}>
            <FontAwesomeIcon className="fa-margin" icon={faUser} />
              Profile
            </button>
            {showProfileDropdown && (
              <div className="profile_dropdown_content">
                <Link to="/profile">View Profile</Link>
                <Link onClick={handleLogout}> <FontAwesomeIcon className="fa-margin" icon={faRightFromBracket} /> Logout</Link>
              </div>
            )}
          </div>
        )}
        <div className="toggle_btn" ref={toogleBtn} onClick={openMenu}>
          <FontAwesomeIcon icon={toggleBtnIcon} />
        </div>
      </div>
      <div className="dropdown_menu" ref={dropdownMenu}>
        <ul>
          <li className="dropdown_links">
            <a className="no-link">Services</a>
          </li>
          <li className="dropdown_links">
            <a href="about">About</a>
          </li>
          <li className="dropdown_links">
            <a href="contact-us">Contact Us</a>
          </li>
          {isLogin === false ? (
            <Link to="/login" className="action_btn">
              Sign In
            </Link>
          ) : (
            <div className="profile_dropdown">
              <button className="action_btn" onClick={toggleProfileDropdown}>
                Profile
              </button>
              {showProfileDropdown && (
                <div className="profile_dropdown_content">
                  <Link to="/profile">View Profile</Link>
                  <Link onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
