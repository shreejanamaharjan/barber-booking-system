import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import Appointment from "./Appointment";
import BarberProfile from "./BarberProfile";
import Overview from "./Overview";

const BarberDetail = () => {
  const { user, token } = useContext(AuthContext);
  const [userInfo, setuserInfo] = useState({});
  const [tab, setTab] = useState("appointments");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setuserInfo(response.data);
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
  if (!userInfo || !userInfo.data) {
    return <div>No user information available</div>;
  }
  return (
    <section className="py-[15px]">
      <div className="max-w-full px-5 mx-auto md:max-w-[1170px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="pd-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img
                  src={`http://localhost:5000/barber-booking-system/uploads/${userInfo.data.photo}`}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <div className="text-[18px] leading-[30px] text-headingColor font-bold">
                {userInfo.data.email}
              </div>
              <div className="text-[14px] leading-[30px] text-primaryColor font-semibold ">
                {userInfo.data.role}
              </div>
            </div>
            <div className="mt-[50px] md:mt-[100px]">
              <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                Delete Account
              </button>
            </div>
          </div>
          <div className="md:col-span-2 md:px-[30px]">
            <div className="flex flex-wrap">
              <button
                onClick={() => setTab("overview")}
                className={`${
                  tab === "overview" && "bg-primaryColor text-white"
                } p-2 mr-5 mb-5 px-5 rounded-md text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Overview
              </button>
              <button
                onClick={() => setTab("appointments")}
                className={`${
                  tab === "appointments" && "bg-primaryColor text-white"
                } p-2 mr-5 mb-5 px-5 rounded-md text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Appointments
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && "bg-primaryColor text-white"
                } p-2 mr-5 mb-5 px-5 rounded-md text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Profile Setting
              </button>
            </div>
            {tab === "overview" && <Overview user={userInfo} />}
            {tab === "appointments" && <Appointment user={userInfo} />}
            {tab === "settings" && <BarberProfile user={userInfo.data} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BarberDetail;
