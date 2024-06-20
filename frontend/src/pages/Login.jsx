import React, { useState, useContext } from "react";
import "../styles/RegisterStyles.css";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) alert(result.message);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.data.role,
          token: result.token,
        },
      });

      console.log(result, "login data");

      navigate("/home");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <section className="px-5 lg:px-0 flex items-center justify-center">
      <div className="rounded-lg shadow-md md:p-10 text-center">
        <h3 className="text-headingColor text-2xl lg:text-3xl leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back
        </h3>
        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[15px] leading-5 text-headingColor placeholder:text-textColor cursor-pointer"
              required
              aria-label="Email"
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[15px] leading-5 text-headingColor placeholder:text-textColor cursor-pointer"
              required
              aria-label="Password"
            />
          </div>

          <div className="mt-9">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[3px] rounded-lg px-4 py-3"
            >
              Login
            </button>

            <p className="mt-5 text-textColor text-center">
              Don't have an account?
              <Link
                to="/register"
                className="text-primaryColor font-medium ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
