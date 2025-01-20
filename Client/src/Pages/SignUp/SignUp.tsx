import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "motion/react";
import { useAuth } from "../../Utils/Context/AuthContext";
import { SignUpFormData } from "../../Utils/Models/Forms";
import AppPreview from "../../Components/AppPreview/AppPreview";
import OAuthComponent from "../../Components/OAuth/Oauth";
import TextField from "../../Components/UI/TextField";
import Button from "../../Components/UI/Button";
import Block from "../../Components/UI/Block";

const SignUp = () => {
  const navigate = useNavigate();

  const { registerWithEmailAndPassword } = useAuth();

  const schema = yup.object().shape({
    Email: yup.string().email().required(),
    Password: yup.string().required(),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password")], "Passwords must match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = async (data: SignUpFormData) => {
    console.log(data);
    await registerWithEmailAndPassword(data);
    reset();
  };

  return (
    <Block
      className="h-screen w-screen "
      align="center"
      justify="center"
      direction="row"
    >
      <Block
        className="md:w-1/2 xl:py-16 lg:py-12 py-8 h-full w-full xl:px-24 lg:px-18 md:px-12 px-6  bg-slate-50/30"
        direction="column"
        align="center"
      >
        <Block className="w-full h-24" align="start">
          <motion.h1
            initial={{ scale: 1, opacity: 0, y: -35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold font-mono text-3xl tracking-tighter hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <TextField
              value="AIVERSE."
              className="font-bold font-mono text-3xl tracking-tighter"
            />
          </motion.h1>
        </Block>
        <motion.div
          initial={{ scale: 1, opacity: 0, y: 35 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:w-[300px] lg:w-[500px] gap-2   w-full justify-center h-full  "
        >
          <TextField
            value="Sign Up"
            className="font-bold text-3xl font-serif"
          />
          <OAuthComponent />
          <Block className="mb-4 w-full" align="center" direction="row">
            <div className="flex-grow border-t border-gray-400"></div>
            <TextField
              value="Or continue with email"
              className="px-3 mb-[4px]"
            />
            <div className="flex-grow border-t border-gray-400"></div>
          </Block>

          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="h-[400px]"
            autoComplete="off"
          >
            <Block className="mt-6" gap={6} direction="column">
              <Block direction="column">
                <label className="font-semibold flex flex-row">
                  <TextField value="Email" className="" />
                  <TextField value="*" className="text-red ml-[1px]" />
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className={`border-2  rounded-lg px-4 py-2 transition-all duration-200 outline-none  ${
                    errors.Email
                      ? "border-red focus:border-red "
                      : "border-gray-400 focus:border-black"
                  }`}
                  {...register("Email")}
                />
                <TextField className="text-red text-sm text-left">
                  {errors.Email?.message}
                </TextField>
              </Block>
              <Block direction="column">
                <label className="font-semibold flex flex-row ">
                  <TextField value="Password" className="" />
                  <TextField value="*" className="text-red ml-[1px]" />
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className={`border-2  rounded-lg px-4 py-2 transition-all duration-200 outline-none  ${
                    errors.Password
                      ? "border-red focus:border-red "
                      : "border-gray-400 focus:border-black"
                  }`}
                  {...register("Password")}
                />
                <TextField className="text-red text-sm text-left">
                  {errors.Password?.message}
                </TextField>
              </Block>
              <Block direction="column">
                <label className="font-semibold flex flex-row ">
                  <TextField value="Confirm Password" className="" />
                  <TextField value="*" className="text-red ml-[1px]" />
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`border-2  rounded-lg px-4 py-2 transition-all duration-200 outline-none  ${
                    errors.ConfirmPassword
                      ? "border-red focus:border-red "
                      : "border-gray-400 focus:border-black"
                  }`}
                  {...register("ConfirmPassword")}
                />
                <TextField className="text-red text-sm text-left">
                  {errors.ConfirmPassword?.message}
                </TextField>
              </Block>

              <Button
                className="bg-black rounded-lg hover:bg-stone-900 px-4 py-2"
                type="submit"
                TextColor="white"
              >
                <TextField value="Sign Up" color="white" />
              </Button>
              <Block
                className="text-lg"
                align="center"
                direction="row"
                gap={2}
                justify="center"
              >
                <TextField value="Not registered yet?" color="black" />
                <TextField
                  value="Sign Up"
                  className="underline-offset-auto underline font-extrabold  hover:cursor-pointer"
                  color="black"
                  onClick={() => {
                    navigate("/auth/signin");
                  }}
                />
              </Block>
            </Block>
          </form>
        </motion.div>
      </Block>
      <div className="md:w-1/2 hidden md:flex h-full w-full bg-slate-400 items-center justify-center">
        <AppPreview />
      </div>
    </Block>
  );
};

export default SignUp;
