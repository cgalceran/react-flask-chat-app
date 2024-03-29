import React, { useContext, useEffect} from "react";
import passlogo from "../images/pass.svg";
import userlogo from "../images/user.svg";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Login = () => {
  const { login, setIsAuthorized, alertLogin, alertTextLogin, setIsGuest, isGuest } =
    useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    login(e.target.email.value, e.target.password.value);
    e.target.reset();
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const logGuest = () => {
    login('guest@guest.com', '12345');
  }

  return (
    <div onSubmit={onSubmit} className=" w-80 drop-shadow-xl">
      <form
        action="submit"
        className="flex flex-col gap-3 rounded-3xl bg-[#171717] pl-8 pr-8 pb-2 transition-transform duration-200 ease-in-out hover:scale-105 hover:border-2 hover:border-black"
      >
        <p
          className="m-6 text-center text-lg text-[rgb(255,255,255)]"
          id="heading"
        >
          Login
        </p>

        <div className="flex max-w-xs items-center justify-start gap-2 rounded-3xl p-2 shadow-inner shadow-black">
          <img
            src={userlogo}
            style={{ height: "1.3em", width: "1.3em", fill: "white" }}
            alt="userlogo"
          />
          <input
            onChange={(e) => e.target.value}
            id="email"
            placeholder="Email"
            className="border-none bg-[#171717] p-2 text-[#d3d3d3] outline-none"
            type="text"
            autoComplete="off"
          />
        </div>

        <div className="flex max-w-xs items-center justify-start gap-2 rounded-3xl p-2 shadow-inner shadow-black">
          <img
            src={passlogo}
            style={{ height: "1.3em", width: "1.3em", fill: "white" }}
            alt="passlogo"
          />
          <input
            onChange={(e) => e.target.value}
            id="password"
            placeholder="Password"
            className="border-none bg-[#171717] p-2 text-[#d3d3d3] outline-none"
            type="password"
            maxLength="8"
            autoComplete="off"
          ></input>
        </div>
        {alertLogin ? (
          <p className="text-center text-white">{alertTextLogin}</p>
        ) : (
          <p className="text-center text-white">Please enter your password</p>
        )}
        <div className=" m-10 flex flex-row justify-center gap-3">
          <button
            type="submit"
            className="rounded-lg border-none bg-[#252525] p-2 px-3 text-white outline-none ease-in-out hover:bg-black hover:text-white"
          >
            Login
          </button>

          <button
            onClick={navigateToSignup}
            className="rounded-lg border-none bg-[#252525] p-2 px-3 text-white outline-none ease-in-out hover:bg-black hover:text-white"
          >
            Sign Up
          </button>

          <button 
          onClick={logGuest}          
          className="rounded-lg border-none bg-[#252525] p-2 px-3 text-white outline-none ease-in-out hover:bg-black hover:text-white">
            Guest
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
