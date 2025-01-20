import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "motion/react";
import { SignInFormData } from "../../Utils/Models/Forms";
import { useAuth } from "../../Utils/Context/AuthContext";
import AppPreview from "../../Components/AppPreview/AppPreview";
import OAuthComponent from "../../Components/OAuth/Oauth";
import TextField from "../../Components/UI/TextField";
import Button from "../../Components/UI/Button";
import Block from "../../Components/UI/Block";

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
    <Block
      className="h-screen  w-screen"
      direction="row"
      align="center"
      justify="center"
    >
      <div className="md:w-1/2 hidden md:flex h-full w-full bg-slate-400 items-center justify-center">
        <AppPreview />
      </div>

      <Block
        className="md:w-1/2 xl:py-16 lg:py-12 py-8 h-full w-full xl:px-24 lg:px-18 md:px-12 px-6  bg-slate-50/30"
        direction="column"
        align="center"
      >
        <Block className="h-24 w-full" align="start">
          <motion.h1
            initial={{ scale: 1, opacity: 0, y: -35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hover:cursor-pointer"
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
          className="flex flex-col md:w-[350px] lg:w-[500px] gap-2   w-full justify-center h-full  "
        >
          <TextField
            value="Sign In"
            className="font-bold text-3xl font-serif"
          />
          <OAuthComponent />
          <Block className="mb-4 w-full " align="center" direction="row">
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
                  className="border-2 border-gray-400 rounded-lg px-4 py-2 transition-all duration-200 outline-none focus:border-black"
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
                  className="border-2 border-gray-400 rounded-lg px-4 py-2 transition-all duration-200 outline-none focus:border-black"
                  {...register("Password")}
                />

                <TextField className="text-red text-sm text-left">
                  {errors.Password?.message}
                </TextField>
                <Block
                  className="mt-1 ml-1"
                  gap={1}
                  direction="row"
                  align="center"
                >
                  <input
                    type="checkbox"
                    className="transition-all duration-200 accent-black hover:cursor-pointer"
                    {...register("RememberMe")}
                  />

                  <TextField value="Remember Me" className="" />
                </Block>
              </Block>

              <Button
                className="bg-black rounded-lg hover:bg-stone-900 px-4 py-2"
                type="submit"
                TextColor="white"
              >
                <TextField value="Sign In" color="white" />
              </Button>
              <Block
                className="text-lg"
                align="center"
                justify="center"
                gap={2}
                direction="row"
              >
                <TextField value="Not registered yet?" color="black" />
                <TextField
                  value="Sign Up"
                  className="underline-offset-auto underline font-extrabold  hover:cursor-pointer"
                  color="black"
                  onClick={() => {
                    navigate("/auth/signup");
                  }}
                />
              </Block>
            </Block>
          </form>
        </motion.div>
      </Block>
    </Block>
  );
};

export default SignIn;
