import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState,} from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const toogleBtn = useRef(null);
  const [toggleBtnIcon, setToggleBtnIcon] = useState(faBarsStaggered);
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
    setIsLogin(false);
    navigate("/");
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
              <Link to="/login" className="action_btn">
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
