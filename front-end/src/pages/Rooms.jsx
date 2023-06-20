import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "../css/Room.css";

const Rooms = () => {
  const appID = parseInt(import.meta.env.VITE_APP_ID);
  const serverSecret = import.meta.env.VITE_APP_SERVER_SECRET;
  const { roomId } = useParams();
  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Indrajit" //userName goes here
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div className="room-page">
      <div ref={myMeeting} style={{ height: "100%" }} />
    </div>
  );
};

export default Rooms;
