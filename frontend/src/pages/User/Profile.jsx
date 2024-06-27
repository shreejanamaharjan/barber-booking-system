import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";

const Profile = ({ users }) => {
  const { token } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  //   const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    location: "",
    phone: "",
  });
  useEffect(() => {
    setFormData({
      name: users?.name || "",
      email: users?.email || "",
      password: users?.password || "",
      location: users?.location || "",
      phone: users?.phone || "",
      photo: users?.photo || "",
    });
  }, [users]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
    console.log(file.name);
    setFormData({ ...formData, photo: URL.createObjectURL(file) });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", users._id); // Assuming user._id is needed for identification
      if (formData.name) formDataToSend.append("name", formData.name);
      if (formData.password)
        formDataToSend.append("password", formData.password);
      if (formData.location)
        formDataToSend.append("location", formData.location);
      if (formData.phone) formDataToSend.append("phone", formData.phone);
      if (selectedFile) formDataToSend.append("photo", selectedFile);

      const response = await axios.post(
        `${BASE_URL}/users/userProfileUpdate/${users._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.data;
      console.log(result);

      if (response.ok) {
        navigate("/home");
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[13px] leading-3 text-headingColor placeholder:text-textColor cursor-pointer"
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full pr-4  py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[13px] leading-3 text-headingColor placeholder:text-textColor cursor-pointer"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Phone No."
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full pr-4  py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[13px] leading-3 text-headingColor placeholder:text-textColor cursor-pointer"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full pr-4  py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[13px] leading-3 text-headingColor placeholder:text-textColor cursor-pointer"
        />
      </div>
      <div className="mb-3 flex items-center justify-between">
        {formData.photo && (
          <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
            <img
              src={formData.photo}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </figure>
        )}
        <div className="relative w-[130px] h-[50px]">
          <input
            type="file"
            name="photo"
            id="customFile"
            onChange={handleFileInputChange}
            accept=".jpeg, .jpg, .png"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-poiner"
          />
          <label
            htmlFor="customFile"
            className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
          >
            Upload Photo
          </label>
        </div>
      </div>

      <div className="mt-3">
        <button
          type="submit"
          className="w-full bg-primaryColor text-white text-[16px] leading-[3px] rounded-lg px-4 py-3"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default Profile;
