import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import "../css/Home.css";

const Home = () => {
  const openMenu = () => {
  }
  return (
    <div className="header">
      {/*--------Navbar--------*/}
      <div className="topNav">
        {/* logo */}
        <div className="logo">
          <a href="">
            <img src="" alt="" />
            Logo
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
        <a href="#" className="action_btn">
          Sign In
        </a>
        <div className="toggle_btn" onClick={openMenu}>
          <FontAwesomeIcon icon={faBarsStaggered} />
        </div>
      </div>
      <div className="dropdown_menu">
        <ul>
          <li>
            <a href="services">Services</a>
          </li>
          <li>
            <a href="about">About</a>
          </li>
          <li>
            <a href="contact-us">Contact Us</a>
          </li>
          <li><a href="#" className="action_btn">
            Sign In
          </a></li>
        </ul>
      </div>
      {/*--------TopBody--------*/}
      <div className="topBody">{/* hero image */}</div>
      {/* Models of CT scan and MRI machines */}
      <div className="modelSection">{/* Models */}</div>
      {/* --------BottomBody--------*/}
      <div className="bottomBody">{/* About */}</div>
    </div>
  );
};

export default Home;
