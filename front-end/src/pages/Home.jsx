import "../css/Home.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import wave from "../../public/Image/wave.svg";
import FAQSection from "../components/FAQSection";
import faqData from "../assets/json-data/faqData.json";
import Chat from "./Chat";
import services_menu from "../assets/json-data/services_menu.json";
// Image import
import ctScanModelImg from "../img/ct-scan.png";
import BrainTumor from "../img/brainTumor.png";
import gif from "../img/doctor-application.gif";

const Home = () => {
  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      <div className="home">
        {/*--------TopBody--------*/}
        <div className="topBody_container">
          {/* hero image */}
          <div className="topBody">
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
              <Link
                type="button"
                to="/appointment"
                className="appointment-btn"
                state={{ about: "This is for testing from home" }}
              >
                Make Appointment
              </Link>
            </div>
          </div>
          <img className="wave-img" src={wave} />
        </div>
        {/* Models of CT scan and MRI machines */}
        <div className="modelSection">
          {/* Models */}
          <div>
            <p>
              <span>Health At Your FingerTips.</span> <br /> Check your health
              with our latest AI Technology
            </p>
            <img src={gif} className="gifimg" />
          </div>
          <div className="models">
            {services_menu.items.map((item, index) => {
              if (index !== services_menu.items.length - 1) {
                return (
                  <div key={index} className="CtScan">
                    <img src={item.src} />
                    <span>{item.title}</span>
                  </div>
                );
              }
            })}

            {/* <button className="MRIScan">
              <img src={BrainTumor} />
              <p>MRI SCAN</p>
            </button>
            <button className="LungXRayScan"> 
              <img src={ctScanModelImg} />
              <p>Lungs X-RAY</p>
            </button> */}
          </div>
        </div>
        <hr />
        <div>
          <Chat />
        </div>
        {/* <img className="wave-img" src={wave} /> */}
        {/* --------BottomBody--------*/}
        <div className="bottomBody">
          {/* About */}
          <div className="faq">
            <h1>Have a question ?</h1>
            <FAQSection faqData={faqData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
