import React, { useState } from "react";
import axios from "axios";
import "../css/predictionpage.css";

function Ctscan() {
  // fileupload & Result
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      axios
        .post("http://localhost:8000/predict-ct", formData)
        .then((response) => {
          setResult(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div
      className="main-container flex items-center justify-center overflow-x-clip"
      style={{ minHeight: "calc(100vh - 700px)" }}
    >
      <div className="py-4 md:py-8">
        <div className="mx-auto w-full px-8 max-w-5xl relative">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center md:gap-4">
            <div className="left-container flex flex-col md:flex-row lg:flex-col items-center lg:items-start gap-6 md:gap-8">
              <video
                preload="auto"
                className="left-container-video w-full h-auto rounded-4xl max-w-[320px] lg:max-w-[420px]"
                poster="https://images.pexels.com/videos/7089596/pexels-photo-7089596.jpeg?auto=compress&cs=tinysrgb&w=600"
                autoPlay
                muted
                playsInline
                src="./videos/ctscan_video.mp4"
              ></video>
              <div className="flex flex-col gap-4">
                <h1 className="font-display font-bold text-typo m-0 text-4xl md:text-5xl lg:text-6xl text-center md:!text-left">
                  Detect Carcinoma <br /> CT-Scan image
                </h1>
                <p className="text-typo-tertiary font-bold text-xl m-0 !text-typo text-center md:!text-left">
                  100% Automatically and
                  <span className="!py-1 !px-4 bg-brush bg-no-repeat bg-cover bg-center">
                    Free
                  </span>
                </p>
              </div>
            </div>
            <div className="right-container relative group flex flex-col gap-4 md:gap-8 mt-8 md:mt-28">
              <div className="dropzone-enabled"></div>
              <div className="right-container-drop w-full flex flex-col sm:justify-center sm:items-center sm:gap-8 sm:pt-36 sm:pb-16 rounded-4xl bg-white shadow-2xl">
                <button
                  type="button"
                  className="upload-btn border border-transparent rounded-full font-bold transition ease-in-out text-center font-body no-underline text-white hover:no-underline inline-flex items-center justify-center text-2xl px-8 py-2.5 hover:bg-primary-hover active:bg-primary-hover active:scale-[0.98] focus:outline-none focus-visible:outline-none focus:ring-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-hover"
                >
                  Upload Image
                </button>
                <div className="hidden sm:flex flex-col gap-1.5">
                  <p className="m-0 font-bold text-xl text-typo-secondary">
                    or drop a file,
                  </p>
                  <span className="text-xs text-typo-secondary text-center">
                    paste image or
                    <a
                      href="#"
                      className="text-typo-secondary select-photo-url-btn underline"
                    >
                      URL
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div>
      <h1>Image Upload App</h1>
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
      {result && (
        <div>
          <h2>Result</h2>
          <p>Predicted Class: {result.predicted_class}</p>
          <p>Probability: {result.probability.toFixed(2)}%</p>
        </div>
      )}
    </div> */
}

export default Ctscan;
