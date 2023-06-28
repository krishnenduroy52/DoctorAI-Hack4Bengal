import "../css/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      <div className="home">
        {/*--------TopBody--------*/}
        <div className="topBody">
          {/* hero image */}
          <img
            src="./Image/doctor-hero.svg"
            alt="HeroImg"
            className="hero_image"
          />
          <div className="hero-text">
            <h1>Empowering Healthcare through Artificial Intelligence</h1>
            <p>
              Detect. Connect. Heal. Seamlessly schedule doctor meetings after
              disease detection, unlocking your path to optimal health.
            </p>
            <Link type="button" to="/appointment" className="appointment-btn" state={{about: "This is for testing from home"}}>
              Make Appointment
            </Link>
          </div>
        </div>

        {/* Models of CT scan and MRI machines */}
        <div className="modelSection">
          {/* Models */}
          <div className="models">
            <button className="CtScan">
              <p>CT SCAN</p> <p>Lorem ipsum dolor sit amet.</p>
            </button>
            <button className="MRIScan">
              <p>MRI SCAN</p> <p>Lorem ipsum dolor sit amet.</p>
            </button>
            <button className="LungXRayScan">
              <p>Lungs X-RAY</p> <p>Lorem ipsum dolor sit amet.</p>
            </button>
          </div>
        </div>
        {/* --------BottomBody--------*/}
        <div className="bottomBody">{/* About */}</div>
      </div>
    </>
  );
};

export default Home;
