import React from "react";
import TextField from "../../Components/UI/TextField";
import Block from "../../Components/UI/Block";

const LoadingPage = () => {
  return (
    <Block className="h-screen bg-gray-100" justify="center" align="center">
      <Block align="center" direction="column">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          <TextField
            value="Loading..."
            className="text-gray-700 font-medium mt-4 text-lg"
          />
        </div>
      </Block>
    </Block>
  );
};

export default LoadingPage;
