import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import Booking from "../Booking.jsx";

const Barber = () => {
  const { user, token } = useContext(AuthContext);
  const [barberInfo, setbarberInfo] = useState({});
  const [photo, setPhoto] = useState({});
  const [tab, setTab] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/barbers/getAllBarber`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setbarberInfo(response.data.barbers);
        console.log(response.data.barbers);
        // setuserInfo(userInfo.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchInfo();
    }
  }, [user, token]);

  if (loading) {
    return <div>Loading...</div>;
  }
  // console.log(uInfo.data.photo);
  if (!barberInfo) {
    return <div>No user information available</div>;
  }
  console.log(barberInfo);
  const handleServices = (barberId) => {
    console.log(barberId);
    navigate(`/services?barberID=${barberId}`);
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10 flex ">
          {barberInfo.map((barber) => (
            <div
              key={barber._id}
              className="pd-[50px] px-[30px] rounded-md border border-solid"
            >
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor mt-[5px]">
                  <img
                    src={`http://localhost:5000/barber-booking-system/uploads/${barber.photo}`}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>
              <div className="text-center mt-4 h-[60px] overflow-hidden ">
                <div className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {barber.name}
                </div>
                <div className="text-[14px] leading-[30px] text-primaryColor font-semibold ">
                  {barber.location}
                </div>
              </div>
              <div className="mb-[10px] ">
                <button
                  className="w-full bg-headingColor mt-4 p-3 text-[15px] rounded-md text-white"
                  onClick={() => handleOverview(barber._id)}
                >
                  Overview
                </button>
                <button
                  className="w-full bg-primaryColor mt-4 p-3 text-[15px] rounded-md text-white"
                  onClick={() => handleServices(barber._id)}
                >
                  Services
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Barber;
