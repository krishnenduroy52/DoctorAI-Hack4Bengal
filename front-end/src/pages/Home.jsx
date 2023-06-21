import "../css/Home.css";

const Home = () => {
  return (
    <div className="home">
      {/*--------TopBody--------*/}
      <div className="topBody">
        {/* hero image */}
        <img src="" alt="HeroImg" />
        <div className="hero-text">
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore,
            sequi!
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quae
            perferendis quis? Qui ab consectetur non fuga labore. Consequatur,
            ducimus!
          </p>
          <button>Make Appointment</button>
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

export default Home;
