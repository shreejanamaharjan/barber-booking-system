import React, { useEffect } from "react";
import axios from "axios";
import { Layout } from "antd";
import image from '../assets/images/home.png'; 


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

  // React.useEffect(() => {
  //   // Any side effects can go here
  // }, []);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  //Homepage Section
  return (
    // <section className= "home_section pt-[60px] 2xl:h-[800px]">
    //   <div className="container">
    //     <div className="flex felx-col lg:flex-row gap-[90px] items-center justify-between">
    //       {/* HomePage Content */}
    //       <div>
    //         <div className="lg:w-[570px]">
    //           <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
    //           Where style meets precision.
    //           </h1>
    //           <p>
    //           We believe that a great haircut is more than just a trim – it's an
    //         experience. Our platform is a heaven for those who value style,
    //         precision, and top-notch service with few clicks.We healp you find
    //         skilled barbers dedicated to delivering personalized grooming
    //         solutions that leave you looking sharp and feeling confident.
    //           </p>
    //           <button className="btn">Look for an Appointment</button>
    //         </div>
    //         <div className="lg:w-1/2">
    //         <img src={image} alt="Description of Image" className="w-full h-auto" />
    //       </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="home_section pt-4 2xl:h-[800px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Home Page Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl leading-tight font-serif italic md:text-5xl md:leading-tight text-irisBlueColor">
              Where style meets precision.
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              We believe that a great haircut is more than just a trim – it's an experience.
              Our platform is a haven for those who value style, precision, and top-notch
              service with few clicks. We help you find skilled barbers dedicated to delivering
              personalized grooming solutions that leave you looking sharp and feeling confident.
            </p>
            <button className="btn">Look for an Appointment</button>
          </div>
          <div className="lg:w-1/2">
            <img src={image} alt="Barber Image" className="h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
