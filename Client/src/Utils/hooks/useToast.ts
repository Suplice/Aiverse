import { toast } from "react-toastify";

export type ToastProps = {
  message: string;
  success: "info" | "success" | "warning" | "error" | "default";
};

const useToast = () => {
  const toastSettings = {
    autoClose: 3000,
    pauseOnHover: false,
    theme: "dark",
  };

  const showToast = (
    message: ToastProps["message"],
    success: ToastProps["success"]
  ) => {
    switch (success) {
      case "info":
        toast.info(message, toastSettings);
        break;
      case "success":
        toast.success(message, toastSettings);

        break;
      case "warning":
        toast.warning(message, toastSettings);

        break;
      case "error":
        toast.error(message, toastSettings);

        break;
      default:
        toast(message, toastSettings);
        break;
    }
  };

  return { showToast };
};

export default useToast;
