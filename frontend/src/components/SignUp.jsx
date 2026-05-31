import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../server";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  // const navigate = useNavigate();
  // const {isAuthenticated,} = useSelector((state)=>state.user)

  // useEffect(() => {
  //  if(isAuthenticated){
  //   navigate("/");
  //  }
  // }, [])
  const [email, SetEmail] = useState("");
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [visible, SetVisible] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${Backend_url}/user/create-user`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } },
      )
      .then((res) => {
        toast.success(res.data.message);
        SetName("");
        SetEmail("");
        SetPassword("");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  return (
    <>
      <div className=" h-screen flex   justify-center items-center font-poppins bg-[#caf0f8]  sm:rounded-r-[40px]">
        <form
          onSubmit={HandleSubmit}
          className="bg-[#450693] p-8 rounded-[10px] shadow-[-5px_5px_rgba(0,_98,_90,_0.4),_-10px_10px_rgba(0,_98,_90,_0.3),_-15px_15px_rgba(0,_98,_90,_0.2),_-20px_20px_rgba(0,_98,_90,_0.1),_-25px_25px_rgba(0,_98,_90,_0.05)]
 w-full max-w-md"
        >
          <div className="mb-2 pt-2">
            <label className="block text-white font-medium" htmlFor="email">
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => SetName(e.target.value)}
              className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your Email"
              required
            />
          </div>
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

          <div className="">
            <label className="block text-white font-medium" htmlFor="email">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                required
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

          <h4 className="mt-4">
            Allready have an account?{" "}
            <Link to={"/login"}>
              {" "}
              <span className="text-blue-400 font-bold">Log-In</span>{" "}
            </Link>
          </h4>
          <button
            type="submit"
            className="w-full bg-white hover:bg-blue-600 text-[#450693] hover:text-[#450693] font-semibold py-2 px-4 rounded-lg transition-colors mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
