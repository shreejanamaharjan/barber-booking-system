import React, { useEffect } from "react";
import axios from "axios";
import { Layout } from "antd";
import image from '../assets/images/collage.jpg'; 
import icon1 from '../assets/images/icon1.jpg'; 
import icon2 from '../assets/images/icon2.jpg'; 
import icon3 from '../assets/images/icon3.jpg'; 
import { Link } from 'react-router-dom';
import {BsArrowRight} from 'react-icons/bs';
import aboutImg from '../assets/images/barber.jpg';

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

  {/* HomePage Section */}
  return (
    <>
    <section className="home_section pt-4 2xl:h-[800px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Home Page Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl leading-tight font-serif italic md:text-5xl md:leading-tight text-irisBlueColor">
              Where style meets precision.
            </h1>
            <p className="mt-4 text-base text-gray-700">
              We believe that a great haircut is more than just a trim – it's an experience.
              Our platform is a haven for those who value style, precision, and top-notch
              service with few clicks. We help you find skilled barbers dedicated to delivering
              personalized grooming solutions that leave you looking sharp and feeling confident.
            </p>
            <button className="btn">Look for an Appointment</button>
            {/* HomePage counter */}
        <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
            <div>
              <h2 className="text-[36px] leading-[56px] lg:text-[30px] lg:leading-[54px] font-[700] text-headingColor">
                +20
              </h2>
              <span className="w-[100px] h-2 bg-blue-300 rounded-full block mt-[-14px]"></span>
              <p className="text__para text-base">Years of experience</p>
            </div>

            <div>
              <h2 className="text-[36px] leading-[56px] lg:text-[30px] lg:leading-[54px] font-[700] text-headingColor">
                +80
              </h2>
              <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
              <p className="text__para text-base">Our Awesome Experts</p>
            </div>

            <div>
              <h2 className="text-[36px] leading-[56px] lg:text-[30px] lg:leading-[54px] font-[700] text-headingColor">
                +1000
              </h2>
              <span className="w-[100px] h-2 bg-green-300 rounded-full block mt-[-14px]"></span>
              <p className="text__para text-base">Happy Customers</p>
            </div>
          </div>
          </div>
          <div className="lg:w-1/2">
            <img src={image} alt="Barber Image" className="h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* Our Services */}
     <section>
      <div className="container mt-[50px]">
        <div className="lg:w-[600px] mx-auto">
          <h2 className="heading text-[35px] text-center text-primaryColor">Providing the Best Services</h2>
          <p className="text__para text-center text-base">
            Transform your look with our professional haircut services. Whether you prefer classic styles or the latest trends, our skilled barbers are here to deliver precise cuts tailored to your preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon1} alt="" className="w-[130px] h-[130px]" />
            </div>

            <div className="mt-[30px] flex flex-col items-center">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Find a Barber
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
              Select a barber based on their expertise, ratings and availability for a personalized grooming experience.
              </p>

              <Link to='/barber' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
               <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>

          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon2} alt="" className="w-[130px] h-[130px]" />
            </div>

            <div className="mt-[30px] flex flex-col items-center">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Find a Location
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
              Quickly locate the nearest barber shop, ensuring convenient access to services based on current location.
              </p>

              <Link to='/barber' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
               <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>

          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon3} alt="" className="w-[130px] h-[130px]" />
            </div>

            <div className="mt-[30px] flex flex-col items-center">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Book an Appointment
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
              Schedule preferred date and time for a haircut, streamlining the process for both the customer and the barber.
              </p>

              <Link to='/barber' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
               <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
     </section>

     {/* About Us Section */}
     <div className="container mt-[50px]">
          <h2 className="heading text-[35px] text-center text-primaryColor">About Us</h2>
       
       <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <p className="text__para text-left text-base lg:w-1/2 leading-loose">
            The Barber Booking System website is a comprehensive platform designed to simplify and enhance the barber shop experience for both clients and barbers. Users can effortlessly find nearby barber shops, browse through detailed barber profiles, view available services, and book appointments at their convenience. The system offers features like real-time availability, customer reviews, and personalized recommendations, ensuring a seamless and efficient booking process. For barbers, the platform provides tools to manage appointments, client relationships, and service offerings, optimizing their workflow and increasing customer satisfaction.
          </p>

         <div className="lg:w-1/3 lg:ml-6 lg:self-end">
           <img src={aboutImg} alt="" className="h-auto w-full lg:ml-20" />
         </div>
       </div>
     </div>
     </>
  );
};

export default HomePage;
