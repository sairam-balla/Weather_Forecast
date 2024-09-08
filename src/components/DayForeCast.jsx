/* eslint-disable react/prop-types */
import {
  BrightnessHighFill,
  CloudDrizzleFill,
  CloudsFill,
} from "react-bootstrap-icons";
import ShowTime from "./ShowTime";

const weatherIcons = {
  Clear: <BrightnessHighFill color="orange" fontSize={36} />,
  Clouds: <CloudsFill color="skyBlue" fontSize={36} />,
  Rain: <CloudDrizzleFill color="grey" fontSize={36} />,
};

const DayForeCast = ({ item }) => {
  return (
    <div className="sub-box flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center items-center text-center p-4 sm:p-5 md:p-6 bg-white shadow-md rounded-lg">
      {/* Container for temperature and icon, will be row on larger screens and column on smaller */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
        <div className="flex items-center justify-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            {(item.main.temp - 273.15).toFixed(1)}°C
          </h3>
        </div>
        <div className="flex justify-center items-center">
          {weatherIcons[item.weather[0].main]}
        </div>
      </div>
      <p className="text-sm sm:text-md md:text-lg">
        Feels like {(item.main.feels_like - 273.15).toFixed(1)}°C
      </p>
      <ShowTime seconds={item.dt} />
    </div>
  );
};

export default DayForeCast;
