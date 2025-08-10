import React, {useState,useRef} from 'react'
import { Link } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function CaptainRiding() {

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100)",
        });
      }
    }[finishRidePanel]
  );

  return (
    <div className="h-screen relative">
        
      <div className="fixed p-4 top-0 flex items-center justify-between w-full">
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
      <div className="h-4/5">
        <img
          className="h=full w=screen object-cover"
          src="https://preview.redd.it/uber-map-no-more-hotspots-and-boots-completely-empty-is-it-v0-rkz96es2vukb1.jpg?width=640&crop=smart&auto=webp&s=732431f27689bbac31031be5ebc739a70cb96b0d"
          alt=""
        />
      </div>
      <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10" 
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
      <h5
        className="p-1 text-center w-[95%] absolute top-0"
        onClick={() => {
          
        }}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button className="w-full mt-5 flex  justify-center bg-green-600  text-white font-semibold p-3 rounded-lg">Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className="fixed w-full transform-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12">
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  )
}

export default CaptainRiding