import "../css/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const handleMakeAppointment = () => {
    navigate("/appointment"); // Redirect to the "/appointment" route
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log("Appointment button clicked");

    try {
      const response = await axios.post("http://localhost:3000/appointment", {
        doctorId: "6498643b433385d056ca7b9b",
        clientId: "649707673426d14bb924d2f0",
        timeOfAppointment: 10,
        dateOfAppointment: "2023-06-22",
        about: "General Checkup",
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
            <Link type="button" to="/appointment" className="appointment-btn">
              Make Appointment
            </Link>
            {/* onClick={handleSubmit} */}
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
