import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Backend_url } from "../server.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle update logic here
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${Backend_url}/user/logout`, { withCredentials: true });
      toast.success("Logout successful!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="px-2 py-4 flex justify-start w-full">
      <div className="bg-white text-[#450693] p-4 rounded-lg shadow-md w-full max-w-sm relative">
        <h2 className="text-lg font-bold mb-4">Profile Settings</h2>

        {message && (
          <div className="bg-[#c9f7ff] text-[#450693] p-1 rounded mb-3 text-center text-xs">
            {message}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="absolute right-2 top-2 bg-[#450693] text-white px-2 py-1 rounded text-xs hover:scale-105 transition"
        >
          Log Out
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="font-semibold text-xs">Email</label>
            <input
              type="text"
              value={user?.email || ""}
              disabled
              className="p-1 rounded border border-gray-300 text-xs focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-xs">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user?.name}
              className="p-1 rounded border border-gray-300 text-xs focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-xs">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="new password"
              className="p-1 rounded border border-gray-300 text-xs focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-xs">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="p-1 rounded border border-gray-300 text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-[#450693] text-white py-1 rounded font-semibold hover:scale-105 transition mt-3 text-xs"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
