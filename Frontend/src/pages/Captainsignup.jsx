import React, { useState } from "react";
import { Link } from "react-router-dom";

const Captainsignup = () => {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setuserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setuserData({
        fullName: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
      });
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10"
            src="https://dl.memuplay.com/new_market/img/com.ubercab.driver.icon.2023-05-22-09-13-49.png"
            alt=""
          />
          <form
            onSubmit={(e) => submitHandler(e)}
            className="bg-white p-7 rounded"
          >
            <h3 className="text-lg font-medium mb-2">What's your Name</h3>

            <div className="flex gap-4 mb-6">
              <input
                required
                className="bg-[#eeeeee] w-1/2 roundded px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 roundded px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className="text-lg font-medium mb-6">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 roundded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="Email@example.com"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-5 roundded px-4 py-2 border w-full text-base placeholder:text-base"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button
              className="bg-[#111] text-white font-semibold  mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[12px] leading-tight alifn-text-center">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Policy</span> and <span className="underline">Terms of
            Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Captainsignup