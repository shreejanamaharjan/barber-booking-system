import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import Bookings from "./Bookings";
import Profile from "./Profile";
import userImg from "../../assets/images/userImg.png";

const User = () => {
  const { user, token } = useContext(AuthContext);
  const [userInfo, setuserInfo] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [tab, setTab] = useState("bookings");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/users/userProfile/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setuserInfo(response);
        console.log(userInfo.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user, token]);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pd-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img
                  src={userImg}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <div className="text-[18px] leading-[30px] text-headingColor font-bold"></div>
              <div className="text-[14px] leading-[30px] text-primaryColor font-semibold ">
                Gender:
              </div>
            </div>
            <div className="mt-[50px] md:mt-[100px]">
              <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                Delete Account
              </button>
            </div>
          </div>
          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button
                onClick={() => setTab("bookings")}
                className={`${
                  tab === "bookings" && "bg-primaryColor text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-heading-Color font-semibold text-[16px] leading-7 border border-solid borer-primaryColor`}
              >
                My Booking
              </button>

              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && "bg-primaryColor text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-heading-Color font-semibold text-[16px] leading-7 border border-solid borer-primaryColor`}
              >
                Profile Setting
              </button>
            </div>
            {tab === "bookings" && <Bookings user={userInfo} />}
            {tab === "settings" && <Profile users={userInfo} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
