import React, { useEffect, useState } from "react";

const FirstComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/GetWeatherForecast"
        );

        console.log(response);

        const data = await response.json();

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {count}
      <button
        className="px-10 py-5 border-2 border-black"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add value
      </button>
      <button
        className="px-10 py-5 border-2 border-black"
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Don't click me!
      </button>
    </div>
  );
};

export default FirstComponent;
