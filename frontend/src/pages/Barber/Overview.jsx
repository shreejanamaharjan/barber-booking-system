import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import Appointment from "./Appointment";
import BarberProfile from "./BarberProfile";

const Overview = () => {
  const { user, token } = useContext(AuthContext);
  const [barberInfo, setBarberInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/barbers/getSingleBarber/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBarberInfo(response.data); // Set response.data instead of response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if barberInfo.data exists and then access its properties safely
  const barberDetail = barberInfo.data && barberInfo.data.barberDetail;
  const barber = barberInfo.data && barberInfo.data.barber;

  return (
    <section className="py-[15px] ">
      <div className="max-w-full px-5 mx-auto md:max-w-[1170px] mt-4 pd-[50px] px-[30px] rounded-md">
        <div className="text-[18px] leading-[30px] text-headingColor font-bold">
          Bio:{" "}
          {barberDetail
            ? barberDetail.bio || "update-profile"
            : "update-profile"}
        </div>
        <div className="text-[14px] leading-[30px] text-headingColor font-semibold ">
          Phone: {barber ? barber.phone || "update-profile" : "update-profile"}
        </div>
        <div className="text-[14px] leading-[30px] text-headingColor font-semibold ">
          Gender:{" "}
          {barber ? barber.gender || "update-profile" : "update-profile"}
        </div>
        <div className="text-[14px] leading-[30px] text-headingColor font-semibold ">
          Location:{" "}
          {barber ? barber.location || "update-profile" : "update-profile"}
        </div>
        <div className="text-[14px] leading-[30px] text-headingColor font-semibold ">
          Specification:{" "}
          {barberDetail
            ? barberDetail.specification || "update-profile"
            : "update-profile"}
        </div>
        <div className="text-[14px] leading-[30px] text-headingColor font-semibold ">
          Experience:{" "}
          {barberDetail
            ? barberDetail.experience || "update-profile"
            : "update-profile"}
        </div>
      </div>
    </section>
  );
};

export default Overview;
