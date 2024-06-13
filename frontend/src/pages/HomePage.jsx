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
            <img src="./src/slider images/slide1.jpg" alt="Slide 1" />
          </div>
          <div>
            <img src="./src/slider images/slide2.jpg" alt="Slide 2" />
          </div>
          <div>
            <img src="./src/slider images/slide3.jpg" alt="Slide 3" />
          </div>
        </Slider>
        <div className= "description">
          <h1 className='header'>Find the best Barber Shop</h1>
           <p>Where style meets precision.<br />We believe that a great haircut is more than just a trim – it's an experience. Our platform is a heaven for those who value style, precision, and top-notch service with few clicks.We healp you find skilled barbers dedicated to delivering personalized grooming solutions that leave you looking sharp and feeling confident.</p>
        </div>
      </div>
    </Layout>
  );
};


export default HomePage;
