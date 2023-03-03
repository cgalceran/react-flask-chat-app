import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import passlogo from "../images/pass.svg";
import userlogo from "../images/user.svg";
import { FaCaretRight } from "react-icons/fa";

const Signup = () => {
  const { register, login } = useContext(UserContext);

  const onSubmit = (e) => {
    e.preventDefault();
    register(
      e.target.email.value,
      e.target.firstname.value,
      e.target.lastname.value,
      e.target.password.value
    );
    e.target.reset();
  };

  return (
    <section>
      <div className="w-auto">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 rounded-3xl bg-[#171717] pl-8 pr-8 pb-2 transition-transform duration-200 ease-in-out hover:scale-105 hover:border-2 hover:border-black"
        >
          <p className="m-6 text-center text-lg text-[rgb(255,255,255)]">
            Register
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
              placeholder="Email Address"
              className="border-none bg-[#171717] p-2 text-[#d3d3d3] outline-none"
              type="email"
              autoComplete="off"
            />
          </div>

          <div className="flex max-w-xs items-center justify-start gap-2 rounded-3xl p-2 shadow-inner shadow-black">
            <FaCaretRight
              style={{ height: "1.3em", width: "1.3em", fill: "white" }}
            />

            <input
              onChange={(e) => e.target.value}
              id="firstname"
              placeholder="First Name"
              className="border-none bg-[#171717] p-2 text-[#d3d3d3] outline-none"
              type="text"
              autoComplete="off"
            />
          </div>

          <div className="flex max-w-xs items-center justify-start gap-2 rounded-3xl p-2 shadow-inner shadow-black">
            <FaCaretRight
              style={{ height: "1.3em", width: "1.3em", fill: "white" }}
            />
            <input
              onChange={(e) => e.target.value}
              id="lastname"
              placeholder="Last Name"
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
              autoComplete="off"
            ></input>
          </div>
          <p className="text-white">Password maximum 8 characters</p>

          <div className=" m-10 flex flex-row justify-center gap-3">
            <button
              type="submit"
              className="rounded-lg border-none bg-[#252525] p-2 px-3 text-white outline-none ease-in-out hover:bg-black hover:text-white"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
