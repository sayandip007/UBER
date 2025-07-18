import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userData, setuserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    // Handle login logic here
    setuserData({ email: email, password: password });

    setemail("");
    setpassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://www.citypng.com/public/uploads/preview/uber-text-word-white-logo-png-701751694707221r0neubngm8.png"
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
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link to='/captain-login' className="bg-[#10b461] flex items-center justify-center text-white font-semibold  mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
