import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SignIn = () => {
  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center">
      <div className="md:w-1/2 hidden md:flex">
        App preview component /To be done/
      </div>
      <div className="md:w-1/2 flex flex-col  xl:py-16 lg:py-12 py-8 h-full w-full items-center xl:px-24 lg:px-18 md:px-12 px-6 border">
        <div className="flex items-start w-full h-24">
          <h1 className="font-bold font-mono text-3xl tracking-tighter ">
            AIVERSE.
          </h1>
        </div>
        <div className="flex flex-col md:w-[350px] lg:w-[550px] gap-2   w-full justify-center h-full  ">
          <h2 className="font-bold text-3xl text-center font-serif">Sign In</h2>
          <div className="flex md:flex-row justify-around w-full my-12 text-center text-2xl font-medium tracking-tight flex-col gap-6 ">
            <div className="flex-grow border-2 px-6 py-3 rounded-lg flex  flex-row text-center items-center justify-center gap-3 hover:cursor-pointer hover:border-gray-500 transition-all duration-200">
              <FcGoogle />
              <p>Google</p>
            </div>
            <div className="flex-grow border-2 px-6 py-3 rounded-lg flex  flex-row text-center items-center justify-center gap-3 hover:cursor-pointer hover:border-gray-500 transition-all duration-200">
              <FaFacebook color="blue" />
              <p>Facebook</p>
            </div>
          </div>
          <div className="flex items-center w-full mb-4 ">
            <div className="flex-grow border-t border-gray-400"></div>
            <p className="px-3 mb-[4px] ">Or continue with email</p>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <form>
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex flex-col ">
                <label className="font-semibold flex flex-row">
                  <p>Email</p>
                  <p className="text-red ml-[1px]">*</p>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border-2 border-gray-400 rounded-lg px-4 py-2 transition-all duration-200 outline-none focus:border-black"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold flex flex-row ">
                  <p>Password</p>
                  <p className="text-red ml-[1px]"> *</p>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border-2 border-gray-400 rounded-lg px-4 py-2 transition-all duration-200 outline-none focus:border-black"
                />
                <div className="flex flex-row items-center mt-1 ml-1 gap-1">
                  <input
                    type="checkbox"
                    className="transition-all duration-200 accent-black"
                  />
                  <p className="font-semibold">Remember me</p>
                </div>
              </div>

              <button className="bg-black text-white rounded-lg px-4 py-2 font-semibold hover:bg-stone-900 transition-all duration-200">
                Sign In
              </button>
              <div className=" flex flex-row items-center justify-center gap-2 text-lg">
                <p className="text-center">Not registered yet? </p>
                <p className="underline-offset-auto underline font-bold ">
                  Sign up
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
