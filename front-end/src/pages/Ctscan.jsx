import React, { useState } from "react";
import axios from "axios";

function Ctscan() {
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
    <div>
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
    </div>
  );
}

export default Ctscan;
