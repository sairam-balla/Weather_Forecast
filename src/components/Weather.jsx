/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DayForeCast from "./DayForeCast";
import ShowDate from "./ShowDate";

const timeStamps = [0, 8, 16, 24, 32];

const Weather = () => {
  const [first, setFirst] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { city } = useParams();

  const onNotFoundData = useCallback(() => {
    return (
      !isLoading && (
        <p className="text-center font-semibold text-3xl m-20">No Data Found</p>
      )
    );
  }, [isLoading]);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      const apiKey = "b41339cc2c5ad23f125d3c0aaac1ba23";
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );
        const data = await response.json();
        setFirst(data);
      } catch (error) {
        setFirst({ ...error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const DayCard = ({ first, minNum }) => {
    return (
      <>
        {minNum <= 8 ? (
          minNum === 0 ? (
            <h1>Today</h1>
          ) : (
            <h1>Tomorrow</h1>
          )
        ) : (
          <ShowDate seconds={first.list[minNum].dt} />
        )}
        <div className="weather-card flex flex-row justify-between gap-2 bg-slate-400 p-5 rounded-xl">
          {first.list &&
            first.list.map((item, index) => {
              return (
                index <= minNum + 7 &&
                index >= minNum && <DayForeCast key={index} item={item} />
              );
            })}
        </div>
      </>
    );
  };

  const fiveDayForecast = () => (
    <div className="flex flex-col gap-6">
      {timeStamps.map((item) => (
        <DayCard key={item} minNum={item} first={first} />
      ))}
    </div>
  );
  return (
    <div className="weather-bg-container bg-blue-300 p-12 min-h-screen">
      <h1 className="text-4xl font-semibold text-center">Weather Forecast</h1>
      <div className="text-start">
        <Link to="/">
          <button
            className="font-bold rounded-lg text-md px-6 h-10 bg-[#374151] text-[#ffffff]"
            type="button"
          >
            Back
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-center">City: {city}</h1>
        {isLoading && (
          <div className="w-full flex justify-center content-center">
            <div className="border-gray-300 h-12 w-12 m-20 animate-spin rounded-full border-8 border-t-blue-600" />
          </div>
        )}
        {first.cod === "200" ? fiveDayForecast() : onNotFoundData()}
      </div>
    </div>
  );
};

export default Weather;
