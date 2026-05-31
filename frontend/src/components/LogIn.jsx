import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Backend_url } from "../server";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LogIn = () => {
  const Navigate = useNavigate();
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [visible, SetVisible] = useState(false);
  const [forgetPass,setForgetPass] = useState(false)


  const HandleForgetPassword = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${Backend_url}/user/request-reset-password`,{
        email,
      })
      if(response?.data?.ssuccess){
        toast.success(response?.data?.message || "Email Sent Check Your Email!")
      }
    } catch (error) {
      toast.error(error||"Error Occured!")
    }
  }
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${Backend_url}/user/login-user`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        toast.success("Login Successfully!");
        setTimeout(() => {
          Navigate("/");
          window.location.reload();
        }, 2000);
        // window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <div className=" h-screen flex justify-center items-center font-poppins bg-[#caf0f8]  rounded-l-[40px]">
        <form
          onSubmit={forgetPass ? HandleForgetPassword : HandleSubmit}
          className="bg-[#450693] p-8 rounded-[10px] shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] w-full max-w-md"
        >
          {
            forgetPass && (
              <h1 className="text-white text-xl text-center">Enter email to recover Password!</h1>
            )
          }
          <div className="mb-2 pt-2">
            <label className="block text-white font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className={forgetPass && "hidden"}>
            <label className="block text-white font-medium" htmlFor="email">
              Password
            </label>
            <div className=" mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => SetVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 cursor-pointer"
                  size={24}
                  onClick={() =>
                    visible ? SetVisible(false) : SetVisible(true)
                  }
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center h-[50px]">
            <h4 className="mt-4">
              Not Register!
              <Link to={"/signup"}>
                <span className="text-blue-400 font-bold"> Sign-Up</span>
              </Link>
            </h4>
            {
              forgetPass ? (<Link onClick={()=>setForgetPass(false)}>
              <p className="mt-4 text-blue-400">Login</p>
            </Link>):(<Link onClick={()=>setForgetPass(true)}>
              <p className="mt-4 text-blue-400">Forgot Password?</p>
            </Link>)
            }
          </div>
          <button
            type="submit"
            className="w-full bg-white hover:bg-blue-600 text-[#450693] hover:text-[#450693] font-semibold py-2 px-4 rounded-lg transition-colors mt-4"
          >
            {
              forgetPass ? "Recover Password" : "LogIn"
            }
          </button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
