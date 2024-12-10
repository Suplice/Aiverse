import React, { useEffect } from "react";
import { useAuth } from "../Utils/Context/AuthContext";

const FirstComponent: React.FC = () => {
  const { user, Logout } = useAuth();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>Data:</div>
      <div>Id: {user?.Id}</div>
      <div>Name: {user?.Name}</div>
      <div>Email: {user?.Email}</div>
      <div>Provider: {user?.Provider}</div>
      <button
        className="px-4 py-2 text-white bg-red rounded-md hover:bg-red/70 duration-200 transition-all"
        onClick={async () => {
          await Logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default FirstComponent;
