import "../css/Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log("Appointment button clicked");

    try {
      const response = await axios.post("http://localhost:3000/apppointment", {
        doctorId: "2",
        clientId: "abc",
        timeOfAppointment: 10,
        dateOfAppointment: "2023-06-22",
        about: "Follow-up checkup",
      });

      if (response.status === 200) {
        toast.success("Appointment booked successfully");
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred");
    }
  };

  return (
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
          <h1>
            Empowering Healthcare through Artificial Intelligence
          </h1>
          <p>
            Detect. Connect. Heal. Seamlessly schedule doctor meetings after disease detection, unlocking your path to optimal health.
          </p>
          <button type="button" onClick={handleSubmit}>Make Appointment</button>
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
  );
};

export default () => (
  <>
    <ToastContainer position="bottom-right" theme="colored" />
    <Home />
  </>
);
