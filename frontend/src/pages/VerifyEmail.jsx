import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationResult, setVerificationResult] = useState({
    success: null,
    message: "",
  });

  const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      code: params.get("code"),
    };
  };

  useEffect(() => {
    const { code } = getQueryParams(location.search);

    console.log("Verification code from URL:", code);

    const handleVerifyEmail = async () => {
      if (!code) {
        setVerificationResult({
          success: false,
          message: "Verification code is missing.",
        });
        return;
      }

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/verifyEmail`,
          {},
          {
            params: { code },
          }
        );

        const { success, message } = response.data;

        setVerificationResult({ success, message });
      } catch (error) {
        console.error("Error verifying email:", error);
        setVerificationResult({
          success: false,
          message: "Failed to verify email. Please try again later.",
        });
      }
    };

    handleVerifyEmail();
  }, [location.search, navigate]);

  return (
    <div className="w-80 h-90 m-auto ">
      <h2>
        Thank you! for choosing us. <br /> Your email had been verified
        successfully. <br />
        Click
      </h2>
      <Link to="/login" className="text-primaryColor font-medium ml-1">
        here
      </Link>
      <h2>to login</h2>
    </div>
  );
};

export default VerifyEmail;
