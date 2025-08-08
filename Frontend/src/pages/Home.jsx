import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          opacity: 1,
        })
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        })
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          opacity: 0,
        })
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolutr left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        <img
          className="h=full w=screen object-cover"
          src="https://preview.redd.it/uber-map-no-more-hotspots-and-boots-completely-empty-is-it-v0-rkz96es2vukb1.jpg?width=640&crop=smart&auto=webp&s=732431f27689bbac31031be5ebc739a70cb96b0d"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen top-0 absolute w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 left-10 top-[45%] bg-gray-900 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up Location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your Destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="opacity-0 bg-red-500 h-0"></div>
      </div>
    </div>
  );
}

export default Home;
