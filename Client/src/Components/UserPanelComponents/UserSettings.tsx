import { useState } from "react";
import { useUser } from "../../Utils/Context/UserContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../Utils/Models/User";
import { useAuth } from "../../Utils/Context/AuthContext";

interface FormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  oldPassword: string;
}

const UserSettings = () => {
  const { user, updateUserName, updateUserEmail, updateUserPassword } =
    useUser();
  const { setUser } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName] = useState<string>(user?.Name || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [userEmail] = useState<string>(user?.Email || "");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [selectedSubPage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();

  const handleChangeName: SubmitHandler<FormData> = async (data) => {
    const { name } = data;
    if (name) {
      try {
        await updateUserName(name);
        setUser(
          (prevUser) =>
            ({
              ...prevUser,
              Name: name,
            } as User)
        );
        setIsEditingName(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditName = () => {
    setIsEditingName(true);
    setValue("name", userName); 
  };

  const handleChangeEmail: SubmitHandler<FormData> = async (data) => {
    const { email } = data;
    if (email) {
      try {
        await updateUserEmail(email);
        setUser(
          (prevUser) =>
            ({
              ...prevUser,
              Email: email,
            } as User)
        );
        setIsEditingEmail(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChangePassword: SubmitHandler<FormData> = async (data)  => {
    const { password } = data;
    if (password) {
      try {
        await updateUserPassword(password);
        setUser(
          (prevUser) =>
            ({
              ...prevUser,
              Password: password,
            } as User)
        );
        setIsEditingPassword(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleToggleChangePassword = () => {
    setIsEditingPassword(true);
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setValue("email", userEmail); 
  };
  return (
    <div className="p-4 bg-[#121212]">
      <div className="flex flex-col items-start justify-center gap-6 mt-4">
      <div className="flex flex-col lg:flex-col items-center bg-[#1E1E1E] gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-2  p-6 h-auto border-[#333333]">
          <div className="flex-col md:flex-row flex w-full items-center gap-4">
            <div className="flex gap-4 items-start">
              <strong className="text-lg text-white lg:pl-16">Name:</strong>
              <span className="text-lg text-gray-400 flex-grow">
                {user?.Name}
              </span>
            </div>


            {isEditingName ? (
              <div className="flex items-center gap-2 w-full flex-col ">
                <form
                  onSubmit={handleSubmit(handleChangeName)}
                  className="flex items-center gap-2 w-full"
                >
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[a-zA-Z0-9]{1,10}$/, 
                        message: "Name can only contain letters and numbers",
                      },
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters long",
                      },
                      maxLength: {
                        value: 10,
                        message: "Name cannot exceed 10 characters",
                      },
                    })}
                    defaultValue={userName}
                    className="px-4 py-2 border border-[#333333] rounded bg-[#1E1E1E] text-white w-full"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-black"
                  >
                    Save
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex justify-end lg:pr-16">
                {user?.Provider === "EMAIL" && (
                  <button
                    onClick={handleEditName}
                    className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
                      userEmail === "Email"
                        ? "bg-gradient-to-r from-[#6D6D6D] to-[#333333] text-white border-[#444444] scale-105"
                        : "bg-[#2C2C2C] text-[#E0E0E0] border-[#3A3A3A] hover:bg-[#444444] hover:border-[#222222] hover:text-white hover:scale-105"
                    }`}
                  >
                    Change
                  </button>
                )}
              </div>
            )}
          </div>
          {errors.name && (
            <div className="text-red/90 text-sm mt-2">
              {errors.name.message}
            </div>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-col items-center bg-[#1E1E1E] gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-2  p-6 h-auto border-[#333333]">
        <div className="flex-col md:flex-row flex w-full items-center gap-4">
            <div className="flex gap-4 items-start">
            <strong className="text-lg text-white lg:pl-16">Email:</strong>
            <span className="text-lg text-gray-400 flex-grow">
              {user?.Email}
            </span>
            </div>
            
            {isEditingEmail ? (
              <div className="flex items-center gap-2 w-full flex-col ">
                <form
                  onSubmit={handleSubmit(handleChangeEmail)}
                  className="flex items-center gap-2 w-full"
                >
                  <input
                    type="text"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    defaultValue={userEmail}
                    className="px-4 py-2 border border-[#333333] rounded bg-[#1E1E1E] text-white w-full"
                  />

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-black"
                  >
                    Save
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex justify-end lg:pr-16">
                {user?.Provider === "EMAIL" && (
                  <button
                    onClick={handleEditEmail}
                    className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
                      userEmail === "Email"
                        ? "bg-gradient-to-r from-[#6D6D6D] to-[#333333] text-white border-[#444444] scale-105"
                        : "bg-[#2C2C2C] text-[#E0E0E0] border-[#3A3A3A] hover:bg-[#444444] hover:border-[#222222] hover:text-white hover:scale-105"
                    }`}
                  >
                    Change
                  </button>
                )}
              </div>
            )}
          </div>
          {errors.email && (
            <div className="text-red/90 text-sm mt-2">
              {errors.email.message}
            </div>
          )}
        </div>

        {user?.Provider === "EMAIL" && (
          <div className="flex flex-col items-center gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-2 border-[#1F1F1F] p-6 h-auto bg-[#1E1E1E] border border-[#333333]">
            <div className="flex items-center gap-2 w-full justify-center">
              <button
                onClick={handleToggleChangePassword}
                className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
                  selectedSubPage === "Password"
                    ? "bg-gradient-to-r from-[#6D6D6D] to-[#333333] text-white border-[#444444] scale-105"
                    : "bg-[#2C2C2C] text-[#E0E0E0] border-[#3A3A3A] hover:bg-[#444444] hover:border-[#222222] hover:text-white hover:scale-105"
                }`}
              >
                Change password
              </button>
            </div>

            {isEditingPassword && (
              <div className="flex flex-col gap-4 mt-4 w-full p-6 h-auto bg-[#1E1E1E] rounded-lg border border-[#333333]">
                 <form onSubmit={handleSubmit(handleChangePassword)}>
                  {/* Old Password */}
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-white">Old Password</label>
                    <input
                      type="password"
                      {...register("oldPassword", { required: "Old password is required." })}
                      className="px-4 py-2 border border-[#333333] rounded bg-[#121212] text-white w-full"
                    />
                    {errors.oldPassword?.message && (
                      <p className="text-red/90 text-sm mt-2">{errors.oldPassword.message}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-white">New Password</label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "New password is required.",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters long.",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message:
                            "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
                        },
                      })}
                      className="px-4 py-2 border border-[#333333] rounded bg-[#121212] text-white w-full"
                    />
                    {errors.password?.message && (
                      <p className="text-red/90 text-sm mt-2">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-white">Confirm Password</label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Please confirm your new password.",
                        validate: (value) =>
                          value === watch("password") || "Passwords do not match.",
                      })}
                      className="px-4 py-2 border border-[#333333] rounded bg-[#121212] text-white w-full"
                    />
                    {errors.confirmPassword?.message && (
                      <p className="text-red/90 text-sm mt-2">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex justify-center my-2">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-black"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
