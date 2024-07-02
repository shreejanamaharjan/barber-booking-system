import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { useLocation } from "react-router-dom";

const Services = () => {
  const { user, token } = useContext(AuthContext);
  const [userInfo, setuserInfo] = useState({});
  const [serviceInfo, setserviceInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const barberId = queryParams.get("barberID");
  console.log(barberId);
  console.log(user);
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
  });

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/barbers/getAllService/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setuserInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const fetchServiceInfo = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/barbers/getAllService/${barberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setserviceInfo(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching service data:", error);
      setLoading(false);
    }
  };
  console.log(serviceInfo);
  useEffect(() => {
    if (user) {
      fetchUserInfo();
      fetchServiceInfo();
    }
  }, [user, token]);
  console.log(userInfo);
  console.log(serviceInfo);

  if (loading) {
    return <div>Loading...</div>;
  }

  const deleteService = async (serviceID) => {
    console.log(serviceID);
    try {
      const res = await axios.delete(
        `${BASE_URL}/barbers/deleteService/${serviceID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = res.data;
      if (res.status === 200) {
        alert(result.message);
        // fetchServiceInfo();
        fetchUserInfo();
      }
      console.log(result);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/barbers/createService/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = res.data;

      console.log(result);

      if (res.status === 201) {
        alert(result.message);
        setFormData({
          serviceName: "",
          serviceDescription: "",
          servicePrice: "",
        });
        fetchUserInfo();
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  return (
    <div>
      {user.role === "barber" ? (
        <div className="conatiner flex">
          <form
            className="space-y-4 lg:flex flex-col p-[10px] items-center h-max w-full"
            onSubmit={submitHandler}
          >
            <h2 className="text-2xl font-bold mb-4">Add a New Service</h2>
            <div className="mb-3">
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-gray-700"
              >
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[13px] leading-3 text-headingColor placeholder:text-textColor cursor-pointer"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="servicePrice"
                className="block text-sm font-medium text-gray-700"
              >
                Service Price
              </label>
              <input
                type="number"
                id="servicePrice"
                name="servicePrice"
                value={formData.servicePrice}
                onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[13px] leading-3 text-headingColor placeholder:text-textColor cursor-pointer"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="serviceDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Service Description
              </label>
              <textarea
                id="serviceDescription"
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[13px] leading-3 text-headingColor placeholder:text-textColor cursor-pointer"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primaryColor hover:bg-headingColor"
            >
              Add Service
            </button>
          </form>
          <div className="ml-[15px] w-full mt-[10px] mr-[10px]">
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            {userInfo.service &&
              userInfo.service.map((service) => (
                <div
                  key={service._id}
                  className="border-2 border-solid p-6 rounded-md w-full mb-4"
                >
                  <div className="flex items-center justify-between text-center h-16 overflow-hidden">
                    <div className="w-1/3 text-lg leading-8 text-headingColor font-bold">
                      {service.serviceName}
                    </div>
                    <div className="w-1/3 text-md leading-8 text-primaryColor font-semibold">
                      {service.price}
                    </div>
                    <div className="w-1/3 text-[10px] leading-8 text-primaryColor font-semibold">
                      {service.description}
                    </div>
                    <div>
                      <button
                        className=" bg-red-600 p-2 text-[10px]  rounded-md text-white"
                        onClick={() => deleteService(service._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="max-w-[1170px] px-5 mx-auto mt-[10px]">
          <div className="grid md:grid-cols-3 gap-10 flex ">
            {serviceInfo.service &&
              serviceInfo.service.map((service) => (
                <div
                  key={service._id}
                  className="pd-[50px] px-[30px] rounded-md border border-solid"
                >
                  <div className="text-center mt-4 h-[60px]  ">
                    <div className="text-[18px] leading-[30px] text-headingColor font-bold">
                      {service.serviceName}
                    </div>
                    <div className="text-[14px] leading-[30px] text-primaryColor font-semibold ">
                      {service.price}
                    </div>
                    <div className="text-[14px] leading-[30px] text-primaryColor font-semibold ">
                      {service.description}
                    </div>
                  </div>
                  <div className="mb-[10px] mt-[10px]">
                    <button
                      className="w-full bg-primaryColor mt-4 p-3 text-[15px] rounded-md text-white"
                      // onClick={() => handleMakeAppointment(barber._id)}
                    >
                      Make Appointment
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
