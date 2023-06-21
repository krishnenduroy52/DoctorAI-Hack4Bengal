import "../css/Home.css";

const Home = () => {
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
          <button>Make Appointment</button>
        </div>
      </div>

      {/* Models of CT scan and MRI machines */}
      <div className="modelSection">{/* Models */}</div>
      {/* --------BottomBody--------*/}
      <div className="bottomBody">{/* About */}</div>
    </div>
  );
};

export default Home;
