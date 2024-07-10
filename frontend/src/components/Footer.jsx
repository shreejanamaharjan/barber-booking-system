import React from "react";

import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillGithub } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://github.com/shreeyashrestha01",
    icon: <AiFillGithub className="group-hover:text-white w-6 h-6" />,
  },
  {
    path: "https://www.linkedin.com/in/shreejana-maharjan-1079b5268/",
    icon: <RiLinkedinFill className="group-hover:text-white w-6 h-6" />,
  },
  {
    path: "https://github.com/Ashilakhadka",
    icon: <AiFillGithub className="group-hover:text-white w-6 h-6" />,
  }
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/home#about",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blogs",
  },
];

const quickLinks02 = [
  {
    path: "/services",
    display: "Explore Your Options",
  },
  {
    path: "/services",
    display: "Find your barber",
  },
  {
    path: "/qna",
    display: "Get an Opinion",
  },
];

const quickLinks03 = [
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="" height={150} width={150} />
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright © {year} developed by Team Heather all rights reserved.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Links
            </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-3">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              You can:
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-3">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Queries
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-3">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
