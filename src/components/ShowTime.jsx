// eslint-disable-next-line react/prop-types
const ShowTime = ({ seconds }) => {
  const apiDate = new Date(seconds * 1000 + 5.5 * 60 * 60 * 1000);

  const hours = apiDate.getHours();
  const minutes = apiDate.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

  return (
    <div>
      <p>{formattedTime}</p>
    </div>
  );
};

export default ShowTime;
