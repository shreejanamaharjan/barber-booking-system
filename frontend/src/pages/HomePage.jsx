import React, { useEffect } from "react";
import axios from "axios";
import { Layout } from "antd";
import Slider from "react-slick";
import slider1 from "../slider_images/slide1.jpg";
import slider2 from "../slider_images/slide2.jpg";
import slider3 from "../slider_images/slide3.jpg";

const HomePage = () => {
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    // Any side effects can go here
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Layout>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={slider1} alt="Slide 1" />
          </div>
          <div>
            <img src={slider2} alt="Slide 2" />
          </div>
          <div>
            <img src={slider3} alt="Slide 3" />
          </div>
        </Slider>
        <div className="description">
          <h1 className="header">Find the best Barber Shop</h1>
          <p>
            Where style meets precision.
            <br />
            We believe that a great haircut is more than just a trim – it's an
            experience. Our platform is a heaven for those who value style,
            precision, and top-notch service with few clicks.We healp you find
            skilled barbers dedicated to delivering personalized grooming
            solutions that leave you looking sharp and feeling confident.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
