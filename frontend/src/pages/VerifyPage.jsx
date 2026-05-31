import React, { useEffect, useState } from "react";
import Verify from "../components/Verify";
import NotVerify from "../components/NotVerify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Backend_url } from "../server";

const VerifyPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    // window.location.reload(false);
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${Backend_url}/user/activation/?`, {
            activation_token,
          });
          console.log(res.data.message);
        } catch (error) {
          console.log(error.response.data.message);
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  if (error) return <NotVerify />; // ✅ proper conditional rendering
  return <Verify />;
};

export default VerifyPage;
