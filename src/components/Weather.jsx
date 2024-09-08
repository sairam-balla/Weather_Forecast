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
        <p className="text-center font-semibold text-xs sm:text-sm md:text-md lg:text-lg m-4">
          No Data Found
        </p>
      )
    );
  }, [isLoading]);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      // eslint-disable-next-line no-undef
      const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;
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
      <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
        {minNum <= 8 ? (
          minNum === 0 ? (
            <h1 className="text-xs sm:text-sm md:text-lg">Today</h1>
          ) : (
            <h1 className="text-xs sm:text-sm md:text-lg">Tomorrow</h1>
          )
        ) : (
          <ShowDate seconds={first.list[minNum].dt} />
        )}
        <div className="weather-card flex flex-col md:flex-row md:justify-center md:flex-wrap md:w-full justify-between gap-2 sm:gap-4 md:gap-6 bg-slate-400 p-2 sm:p-4 md:p-5 rounded-xl">
          {first.list &&
            first.list.map((item, index) => {
              return (
                index <= minNum + 7 &&
                index >= minNum && <DayForeCast key={index} item={item} />
              );
            })}
        </div>
      </div>
    );
  };

  const fiveDayForecast = () => (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
      {timeStamps.map((item) => (
        <DayCard key={item} minNum={item} first={first} />
      ))}
    </div>
  );

  return (
    <div className="weather-bg-container bg-blue-300 p-4 sm:p-6 md:p-8 lg:p-12 min-h-screen">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-2 sm:mb-4 md:mb-6 lg:mb-8">
        Weather Forecast
      </h1>
      <div className="text-center mb-2 sm:mb-4">
        <Link to="/">
          <button
            className="font-bold rounded-lg text-xs sm:text-sm md:text-md px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-white"
            type="button"
          >
            Back
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-semibold text-center mb-2 sm:mb-4 md:mb-6 lg:mb-8">
          City: {city}
        </h1>
        {isLoading && (
          <div className="w-full flex justify-center items-center py-4">
            <div className="border-gray-300 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 m-4 animate-spin rounded-full border-4 sm:border-4 md:border-6 lg:border-8 border-t-blue-600" />
          </div>
        )}
        {first.cod === "200" ? fiveDayForecast() : onNotFoundData()}
      </div>
    </div>
  );
};

export default Weather;
