import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";

const User = () => {
  const { user, token } = useContext(AuthContext);
  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setuserInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user, token]);

  return (
    <div>
      <p>Email: {userInfo.email}</p>
      <p>Role: {userInfo.role}</p>
      <p>Gender: {userInfo.gender}</p>
    </div>
  );
};

export default User;
