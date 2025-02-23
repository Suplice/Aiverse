import { useState } from "react";
import { useUser } from "../../Utils/Context/UserContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../Utils/Models/User";
import { useAuth } from "../../Utils/Context/AuthContext";
import useToast from "../../Utils/hooks/useToast";

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

  const { showToast } = useToast();

  const [isEditingName, setIsEditingName] = useState(false);
  const [, setUserName] = useState<string>(user?.Name || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [userEmail, setUserEmail] = useState<string>(user?.Email || "");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [selectedSubPage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  /**
   * `handleChangeName` function updates the user's name.
   * It gets the new name from the form data.
   * It updates the user's name in the database.
   * If the update is successful, it sets the new name to the user state.
   * It sets the editing state to false.
   * It shows a toast message with the result of the operation.
   * If there is an error, it logs the error to the console.
   * @function handleChangeName
   * @param {FormData} data payload of the form
   */
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
        setUserName(name);
        showToast("Name updated successfully", "success");
      } catch {
        showToast("An error occurred. Please try again.", "error");
      }
    }
  };

  /**
   * `handleChangeEmail` function updates the user's email.
   * It gets the new email from the form data.
   * It updates the user's email in the database.
   * If the update is successful, it sets the new email to the user state.
   * It sets the editing state to false.
   * It shows a toast message with the result of the operation.
   *
   * @function handleChangeEmail
   * @param {FormData} data payload of the form
   */
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
        setUserEmail(email);
        showToast("Email updated successfully", "success");
      } catch {
        showToast("An error occurred. Please try again.", "error");
      }
    }
  };

  /**
   * `handleChangePassword` function updates the user's password.
   * It gets the new password from the form data.
   * It updates the user's password in the database.
   * If the update is successful, it sets the new password to the user state.
   * It sets the editing state to false.
   * It shows a toast message with the result of the operation.
   * If there is an error, it logs the error to the console.
   *
   * @function handleChangePassword
   * @param {FormData} data payload of the form
   */
  const handleChangePassword: SubmitHandler<FormData> = async (data) => {
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
        showToast("Password updated successfully", "success");
      } catch {
        showToast("An error occurred. Please try again.", "error");
      }
    }
  };

  /**
   * `handleToggleChangePassword` function toggles the editing state of the password.
   * It sets the editing state to true.
   * @function handleToggleChangePassword
   * @returns {void}
   */
  const handleToggleChangePassword = () => {
    setIsEditingPassword(true);
  };

  /**
   * `handleEditEmail` function toggles the editing state of the email.
   * It sets the editing state to true.
   * It resets the email input field.
   * @function handleEditEmail
   * @returns {void}
   */
  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setUserEmail("");
  };

  /**
   * `handleEditName` function toggles the editing state of the name.
   * It sets the editing state to true.
   * It resets the name input field.
   * @function handleEditName
   * @returns {void}
   */
  const handleEditName = () => {
    setIsEditingName(true);
    setUserName("");
  };
  return (
    <div className="p-4 bg-[#121212]">
      <div className="flex flex-col items-start justify-center gap-6 mt-4">
        <div className="flex flex-col lg:flex-col items-center bg-[#1E1E1E] gap-4  w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-2  p-6 h-auto border-[#333333]">
          <div className="flex-col md:flex-row flex w-full items-center gap-4">
            <div className="flex gap-4 items-start">
              <strong className="text-lg text-white lg:pl-16">Name:</strong>
              <span className="text-lg text-gray-400 flex-grow">
                {!isEditingName ? user?.Name ?? "Guest" : ""}
              </span>
            </div>

            {isEditingName ? (
              <div className="flex items-center gap-2 w-full flex-col ">
                <form
                  onSubmit={handleSubmit(handleChangeName)}
                  className="flex items-center gap-2 w-full justify-between"
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
                      validate: (value) =>
                        value !== user!.Name ||
                        "Name has to be different from the current one",
                    })}
                    placeholder={user!.Name ?? "Guest"}
                    className="px-4 py-2 border border-[#333333] rounded bg-[#1E1E1E] text-white  outline-none"
                    autoComplete="off"
                  />
                  <div className="gap-4 flex items-center">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border border-gray-500 bg-[#1E1E1E] text-green-500 hover:bg-green-600 hover:text-black outline-none"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                      }}
                      type="reset"
                      className="px-6 py-2 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border border-gray-500 bg-[#1E1E1E] text-gray-200 hover:bg-gray-600 hover:text-white outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-full flex justify-center md:justify-end lg:pr-16">
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

          {errors.name && isEditingName && (
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
                {!isEditingEmail ? user?.Email : ""}
              </span>
            </div>
            {isEditingEmail ? (
              <div className="flex items-center gap-2 w-full flex-col ">
                <form
                  onSubmit={handleSubmit(handleChangeEmail)}
                  className="flex items-center gap-2 w-full justify-between"
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
                      validate: (value) =>
                        value !== user!.Email ||
                        "Email has to be different from the current one",
                    })}
                    className="px-4 py-2 border border-[#333333] rounded bg-[#1E1E1E] text-white  outline-none"
                    placeholder={user?.Email ?? "Email"}
                  />

                  <div className="gap-4 flex items-center">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border border-gray-500 bg-[#1E1E1E] text-green-500 hover:bg-green-600 hover:text-black outline-none"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingEmail(false);
                      }}
                      type="reset"
                      className="px-6 py-2 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border border-gray-500 bg-[#1E1E1E] text-gray-200 hover:bg-gray-600 hover:text-white outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-full flex justify-center md:justify-end lg:pr-16">
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
          {errors.email && isEditingEmail && (
            <div className="text-red/90 text-sm mt-2">
              {errors.email.message}
            </div>
          )}
        </div>

        {user?.Provider === "EMAIL" && (
          <div className="flex flex-col items-center gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-2 border-[#1F1F1F] p-6 h-auto bg-[#1E1E1E]">
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
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-white">
                      Old Password
                    </label>
                    <input
                      type="password"
                      {...register("oldPassword", {
                        required: "Old password is required.",
                      })}
                      className="px-4 py-2 border border-[#333333] rounded bg-[#121212] text-white w-full"
                    />
                    {errors.oldPassword?.message && (
                      <p className="text-red/90 text-sm mb-4">
                        {errors.oldPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-white">
                      New Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "New password is required.",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long.",
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
                      <p className="text-red/90 text-sm mb-4">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-white">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Please confirm your new password.",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match.",
                      })}
                      className="px-4 py-2 border border-[#333333] rounded bg-[#121212] text-white w-full"
                    />
                    {errors.confirmPassword?.message && (
                      <p className="text-red/90 text-sm mb-4">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center my-2 mt-6">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg shadow-md outline-none transition-all duration-300 transform ease-in-out border border-gray-500  bg-[#232323] text-green-500 hover:bg-gray-700 hover:text-white"
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
