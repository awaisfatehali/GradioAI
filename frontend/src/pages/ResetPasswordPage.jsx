import React, { useEffect, useState } from "react";
import NotVerify from "../components/NotVerify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Backend_url } from "../server";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPasswordPage = () => {
  const { reset_token } = useParams();
  const navigate = useNavigate();

  const [tokenValid, setTokenValid] = useState(null); // null = checking, true = valid, false = invalid
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1: Verify token on mount
  useEffect(() => {
    if (reset_token) {
      const verifyToken = async () => {
        try {
          await axios.post(`${Backend_url}/user/verify-reset-token`, {
            token: reset_token,
          });
          setTokenValid(true);
        } catch (error) {
          setTokenValid(false);
        }
      };
      verifyToken();
    } else {
      setTokenValid(false);
    }
  }, [reset_token]);

  // Step 2: Submit new password
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${Backend_url}/user/reset-password`, {
        token: reset_token,
        newPassword,
      });
      toast.success(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // States
  if (tokenValid === null) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#caf0f8]">
        <p className="text-[#450693] text-xl font-semibold font-poppins">Verifying link...</p>
      </div>
    );
  }

  if (tokenValid === false) return <NotVerify />;

  return (
    <div className="h-screen flex justify-center items-center font-poppins bg-[#caf0f8]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#450693] p-8 rounded-[10px] shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] w-full max-w-md"
      >
        <h1 className="text-white text-xl text-center mb-6 font-semibold">
          Reset Your Password
        </h1>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-white font-medium mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <AiOutlineEye size={25} />
              ) : (
                <AiOutlineEyeInvisible size={24} />
              )}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:bg-blue-600 text-[#450693] font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;