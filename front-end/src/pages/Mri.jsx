import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "../css/predictionpage.css";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

function Mri() {
  // fileupload & Result
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showGive, setshowGive] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      axios
        .post("http://localhost:8000/predict-mri", formData)
        .then((response) => {
          setResult(response.data);
          setshowGive(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedFile]);

  // Drag and Drop
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setIsDraggingOver(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDraggingOver(true),
    onDragLeave: () => setIsDraggingOver(false),
  });
  return (
    <div
      className="main-container flex items-center justify-center overflow-x-clip"
      style={{ height: "90vh" }}
    >
      <div className="prediction-bg">
        <img
          src="https://i.vimeocdn.com/video/705159602-6253f49a7fc7d987ebb415d7e8801754ce272a8dcbe92b4ddf45b7189a82c047-d_640x360.jpg"
          alt=""
        />
      </div>
      {/* <div className="prediction-bg-right">
        <img src="./Image/doctor-bg.jpg" alt="" />
      </div> */}
      <div className="py-4 md:py-8">
        <div className="mx-auto w-full px-8 max-w-5xl relative">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center md:gap-4">
            <div className="left-container flex flex-col md:flex-row lg:flex-col items-center gap-6 md:gap-8">
              <video
                preload="auto"
                className="left-container-video w-full h-auto rounded-4xl max-w-[320px] lg:max-w-[420px]"
                poster="https://i.vimeocdn.com/video/705159602-6253f49a7fc7d987ebb415d7e8801754ce272a8dcbe92b4ddf45b7189a82c047-d_640x360.jpg"
                autoPlay
                muted
                playsInline
                src="./videos/brain-human-face.mp4"
              ></video>
              <div className="flex flex-col gap-4">
                <h1 className="font-display font-bold text-typo m-0 text-4xl md:text-5xl lg:text-6xl text-center md:!text-left">
                  Detect
                  <br />
                  <span className="text-orange-400">Brain Tumor</span>
                  <br />
                  MRI image
                </h1>
                <p className="text-typo-tertiary font-bold text-xl m-0 !text-typo text-center md:!text-left">
                  100% Automatically and
                  <span className="!py-1 !px-4 bg-brush bg-no-repeat bg-cover bg-center">
                    Free
                  </span>
                </p>
              </div>
            </div>
            <div className="right-container relative group flex flex-col gap-4">
              <div className="dropzone-enabled" {...getRootProps()}>
                <input {...getInputProps()} />

                <div
                  className={`right-container-drop  w-full flex flex-col sm:justify-center sm:items-center sm:gap-8 sm:pt-36 sm:pb-16 rounded-4xl bg-white shadow-2xl ${
                    isDraggingOver ? "right-container-drag" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="upload-btn border border-transparent rounded-full font-bold transition ease-in-out text-center font-body no-underline text-white hover:no-underline inline-flex items-center justify-center text-2xl px-8 py-2.5 hover:bg-primary-hover active:bg-primary-hover active:scale-[0.98] focus:outline-none focus-visible:outline-none focus:ring-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-hover"
                    onClick={() => {
                      // Handle click on the upload button here
                    }}
                  >
                    Upload Image
                  </button>
                  <div className="hidden sm:flex flex-col gap-1.5">
                    <p className="m-0 font-bold text-xl text-typo-secondary">
                      or drop a file,
                    </p>
                    <span className="text-xs text-typo-secondary text-center">
                      Paste Image and Wait
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {result && showGive ? (
        <Modal
          show={showGive}
          onClose={() => setshowGive(false)}
          img="Image/modelBanner.jpg"
          bigText={`${result.predicted_class}`}
          smallText="We recommend you to make a appointment with doctor"
          percentage={`${Math.round(result.probability)}`}
        />
      ) : null}
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

export default Mri;
