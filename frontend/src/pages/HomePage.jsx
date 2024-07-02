import React, { useEffect } from "react";
import axios from "axios";
import { Layout } from "antd";
import image from "../assets/images/home.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleRedirect = async (event) => {
    navigate("/barber");
  };
  return (
    <section className="home_section pt-4 2xl:h-[800px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Home Page Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl leading-tight font-serif italic md:text-5xl md:leading-tight text-irisBlueColor">
              Where style meets precision.
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              We believe that a great haircut is more than just a trim – it's an
              experience. Our platform is a haven for those who value style,
              precision, and top-notch service with few clicks. We help you find
              skilled barbers dedicated to delivering personalized grooming
              solutions that leave you looking sharp and feeling confident.
            </p>
            <button className="btn" onClick={handleRedirect}>
              Look for an Appointment
            </button>
          </div>
          <div className="lg:w-1/2">
            <img
              src={image}
              alt="Barber Image"
              className="h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
