import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "motion/react";
import { SignInFormData } from "../../Utils/Models/User";
import { useAuth } from "../../Utils/Context/AuthContext";
import AppPreview from "../../Components/AppPreview/AppPreview";
import OAuthComponent from "../../Components/OAuth/Oauth";

const SignIn = () => {
  const navigate = useNavigate();

  const { loginWithEmailAndPassword } = useAuth();

  const schema = yup.object().shape({
    Email: yup.string().email().required(),
    Password: yup.string().required(),
    RememberMe: yup.boolean().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = async (data: SignInFormData) => {
    await loginWithEmailAndPassword(data);
    reset();
  };

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center">
      <div className="md:w-1/2 hidden md:flex h-full w-full bg-slate-400 items-center justify-center">
        <AppPreview />
      </div>
      <div className="md:w-1/2 flex flex-col  xl:py-16 lg:py-12 py-8 h-full w-full items-center xl:px-24 lg:px-18 md:px-12 px-6  bg-slate-50/30">
        <div className="flex items-start w-full h-24">
          <motion.h1
            initial={{ scale: 1, opacity: 0, y: -35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold font-mono text-3xl tracking-tighter hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            AIVERSE.
          </motion.h1>
        </div>
        <motion.div
          initial={{ scale: 1, opacity: 0, y: 35 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:w-[350px] lg:w-[500px] gap-2   w-full justify-center h-full  "
        >
          <h2 className="font-bold text-3xl text-center font-serif">Sign In</h2>
          <OAuthComponent />
          <div className="flex items-center w-full mb-4 ">
            <div className="flex-grow border-t border-gray-400"></div>
            <p className="px-3 mb-[4px] ">Or continue with email</p>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="h-[400px]"
            autoComplete="off"
          >
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
                  {...register("Email")}
                />
                <p className="text-red text-sm">{errors.Email?.message}</p>
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
                  {...register("Password")}
                />
                <p className="text-red text-sm">{errors.Password?.message}</p>
                <div className="flex flex-row items-center mt-1 ml-1 gap-1">
                  <input
                    type="checkbox"
                    className="transition-all duration-200 accent-black hover:cursor-pointer"
                    {...register("RememberMe")}
                  />
                  <p className="font-semibold">Remember me</p>
                </div>
              </div>

              <button className="bg-black text-white rounded-lg px-4 py-2 font-semibold hover:bg-stone-900 transition-all duration-200">
                Sign In
              </button>
              <div className=" flex flex-row items-center justify-center gap-2 text-lg">
                <p className="text-center">Not registered yet? </p>
                <p
                  className="underline-offset-auto underline font-bold hover:cursor-pointer"
                  onClick={() => {
                    navigate("/auth/signup");
                  }}
                >
                  Sign up
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
