import React, { useState, useContext } from "react";
import "../styles/RegisterStyles.css";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import signupImg from "../assets/images/signup.png";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setpreviewURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    role: "customer",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    console.log(file);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
  };
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* image box */}
          <div className="hidden lg:block rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt=""
                className=" rounded-l-lg "
                height={150}
                width={400}
              />
            </figure>
          </div>

          {/* signup form */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[13px] leading-3 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4  py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[15px] leading-5 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4  py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[13px] leading-3 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[13px] leading-3">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-[400] text-[13px] leading-3 px-4 py-3 focus:outline-none"
                  >
                    <option value="barber">Barber</option>
                    <option value="customer">Customer</option>
                  </select>
                </label>

                <label className="text-headingColor font-bold text-[13px] leading-3">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-[400] text-[13px] leading-3 px-4 py-3 focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[16px] leading-[3px] rounded-lg px-4 py-3"
                >
                  Sign Up
                </button>
              </div>

              <p className="mt-3 text-textColor text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
