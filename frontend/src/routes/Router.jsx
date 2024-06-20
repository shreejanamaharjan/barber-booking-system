import React from "react";
import HomePage from "../pages/HomePage";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import Barber from "../pages/Barber/Barber";
import BarberDetail from "../pages/Barber/BarberDetail";
import User from "../pages/User/User";
import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/barber" element={<Barber />} />
      <Route path="/barber:id" element={<BarberDetail />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
};

export default Router;
