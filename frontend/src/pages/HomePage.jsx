import React, {useEffect} from 'react';
import axios from 'axios';
import { Layout } from 'antd';
import Slider from 'react-slick';

const HomePage = () => {
//login user data
  const getUserData = async () => {
    try{
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
    } catch (error){
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
    slidesToScroll: 1
  };

  return (
    <Layout>
      <div className="homepage-container">
        <h1>homepage</h1>
        <div className="button-container">
          <button className="nav-button">Home</button>
          <button className="nav-button">Gallery</button>
          <button className="nav-button">Services</button>
          <button className="nav-button">About Us</button>
        </div>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src="C:\Users\kabir\OneDrive\Desktop\barber-booking-system\frontend\src\slider images\slide1.jpg" alt="Slide 1" />
          </div>
          <div>
            <img src="C:\Users\kabir\OneDrive\Desktop\barber-booking-system\frontend\src\slider images\slide2.webp" alt="Slide 2" />
          </div>
          <div>
            <img src="C:\Users\kabir\OneDrive\Desktop\barber-booking-system\frontend\src\slider images\slide3.jpg" alt="Slide 3" />
          </div>
        </Slider>
      </div>
    </Layout>
  );
};


export default HomePage;
