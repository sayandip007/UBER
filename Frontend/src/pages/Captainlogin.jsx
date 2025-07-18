import React, { useState } from "react";
import { Link } from "react-router-dom";

const Captainlogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [captainData, setcaptainData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    // Handle login logic here
    setcaptainData({ email: email, password: password });

    setemail("");
    setpassword("");
  };
  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://dl.memuplay.com/new_market/img/com.ubercab.driver.icon.2023-05-22-09-13-49.png"
          alt=""
        />
        <form
          onSubmit={(e) => submitHandler(e)}
          className="bg-white p-7 rounded"
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-[#eeeeee] mb-7 roundded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 roundded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="Password"
          />
          <button
            className="bg-[#111] text-white font-semibold  mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Want to Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#ffae00] flex items-center justify-center text-white font-semibold  mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
