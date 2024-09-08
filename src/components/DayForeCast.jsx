/* eslint-disable react/prop-types */
import {
  BrightnessHighFill,
  CloudDrizzleFill,
  CloudsFill,
} from "react-bootstrap-icons";
import ShowTime from "./ShowTime";

const weatherIcons = {
  Clear: <BrightnessHighFill color="orange" fontSize={48} />,
  Clouds: <CloudsFill color="skyBlue" fontSize={48} />,
  Rain: <CloudDrizzleFill color="grey" fontSize={48} />,
};

const DayForeCast = ({ item }) => {
  return (
    <>
      <div className="sub-box flex flex-col gap-5 justify-center content-center text-center p-5">
        <div className="flex gap-1 justify-center content-center">
          <h3 className="text-3xl font-semibold">
            {(item.main.temp - 273.15).toFixed(1)}°C
          </h3>
        </div>
        <p className="text-md">
          Feels like {(item.main.feels_like - 273.15).toFixed(1)}
          °C
        </p>
        <div className="self-center">{weatherIcons[item.weather[0].main]}</div>
        <ShowTime seconds={item.dt} />
      </div>
    </>
  );
};

export default DayForeCast;
