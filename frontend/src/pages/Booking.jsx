import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext.jsx";

const Booking = () => {
  const [bookingInfo, setbookingInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const barberId = queryParams.get("barberId");
  const { dispatch, user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(barberId);
  console.log(user._id);
  const [formData, setFormData] = useState({
    phone: "",
    appointmentDate: "",
    price: "",
    comments: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/appointments/createAppointment/${barberId}/${user._id}`,
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
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center text-primaryColor">
          Book an Appointment
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Treat Yourself
        </p>
        <form className="space-y-8" onSubmit={submitHandler}>
          <div>
            <label htmlFor="phone" className="form__label">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your contact number"
              className="form__input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="appointmentDate" className="form__label">
              Appointment
            </label>
            <div className="mb-3 flex items-center justify-between">
              <div className="mb-3 flex items-center justify-between">
                <label htmlFor="date" className="text-[14px]">
                  Choose Date
                </label>
                <input
                  className="form__input mt-1"
                  type="datetime-local"
                  id="appointmentDate"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="price" className="form__label">
              Ticket Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="100"
              className="form__input mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="comments" className="form__label">
              Your Message
            </label>
            <textarea
              rows="6"
              type="text"
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              placeholder="Leave your comment here..."
              className="form__input mt-1"
            />
          </div>
          <button type="submit" className="btn rounded sm:w-fit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Booking;
