import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "motion/react";

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
    isRemember: yup.boolean().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: SignUpFormData) => {
    console.log(data);
    reset();
  };

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center">
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
          className="flex flex-col md:w-[350px] lg:w-[550px] gap-2   w-full justify-center h-full  "
        >
          <h2 className="font-bold text-3xl text-center font-serif">Sign Up</h2>
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
                  className={`border-2  rounded-lg px-4 py-2 transition-all duration-200 outline-none  ${
                    errors.email
                      ? "border-red focus:border-red "
                      : "border-gray-400 focus:border-black"
                  }`}
                  {...register("email")}
                />
                <p className="text-red text-sm">{errors.email?.message}</p>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold flex flex-row ">
                  <p>Password</p>
                  <p className="text-red ml-[1px]"> *</p>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className={`border-2  rounded-lg px-4 py-2 transition-all duration-200 outline-none  ${
                    errors.password
                      ? "border-red focus:border-red "
                      : "border-gray-400 focus:border-black"
                  }`}
                  {...register("password")}
                />
                <p className="text-red text-sm">{errors.password?.message}</p>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold flex flex-row ">
                  <p>Confirm Password</p>
                  <p className="text-red ml-[1px]"> *</p>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`border-2  rounded-lg px-4 py-2 transition-all duration-200 outline-none  ${
                    errors.confirmPassword
                      ? "border-red focus:border-red "
                      : "border-gray-400 focus:border-black"
                  }`}
                  {...register("confirmPassword")}
                />
                <p className="text-red text-sm">
                  {errors.confirmPassword?.message}
                </p>
              </div>

              <button className="bg-black text-white rounded-lg px-4 py-2 font-semibold hover:bg-stone-900 transition-all duration-200">
                Sign Up
              </button>
              <div className=" flex flex-row items-center justify-center gap-2 text-lg">
                <p className="text-center">Already have an account? </p>
                <p
                  className="underline-offset-auto underline font-bold hover:cursor-pointer"
                  onClick={() => {
                    navigate("/auth/signin");
                  }}
                >
                  Sign In
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
      <div className="md:w-1/2 hidden md:flex">
        App preview component /To be done/
      </div>
    </div>
  );
};

export default SignUp;
