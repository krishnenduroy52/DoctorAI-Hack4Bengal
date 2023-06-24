import React from "react";
import "../css/Modal.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Modal({
  show,
  onClose,
  img,
  bigText,
  smallText,
  percentage,
}) {
  return (
    <div className="modalWrapper">
      <div className="modal">
        <button onClick={onClose} className="btnClose btn-close" />
        <div className="mainContainer">
          <img src={img} alt="" className="main__img" />
          <div className="textPart" align="center">
            <div className="header_modal">
              <h2
                className={`big__text ${
                  bigText === "Normal" || bigText === "Notumor"
                    ? "text_normal"
                    : "text_red"
                }`}
              >
                <span style={{ color: "#555", fontSize: "18px" }}>
                  It seem to be
                </span>
                <br />
                {bigText}
              </h2>
              <CircularProgressbar
                className="probality_bar"
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
            <p className="small__text">{smallText}</p>
            <div className="AllBtn">
              <button className="Thanks__btn btnGive" onClick={onClose}>
                No Thanks
              </button>
              <button
                className="btnGive shop__btnGive"
                style={{ backgroundColor: "black" }}
                onClick={onClose}
              >
                Appointment
              </button>
            </div>
            <p className="nointerest" onClick={onClose}></p>
          </div>
        </div>
      </div>
    </div>
  );
}