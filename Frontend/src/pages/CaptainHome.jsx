import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmridePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmridePopupPanelRef = useRef(null);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100)",
        });
      }
    }[ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmridePopupPanel) {
        gsap.to(confirmridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmridePopupPanelRef.current, {
          transform: "translateY(100)",
        });
      }
    }[confirmridePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-4 top-0 flex ittemms-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-b-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h=full w=screen object-cover"
          src="https://preview.redd.it/uber-map-no-more-hotspots-and-boots-completely-empty-is-it-v0-rkz96es2vukb1.jpg?width=640&crop=smart&auto=webp&s=732431f27689bbac31031be5ebc739a70cb96b0d"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full transform-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12">
        <RidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
      </div>
      <div ref={confirmridePopupPanelRef} className="fixed h-screen w-full transform-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12">
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
