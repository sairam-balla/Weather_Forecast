// eslint-disable-next-line react/prop-types
const ShowDate = ({ seconds }) => {
  const apiDate = new Date(seconds * 1000 + 5.5 * 60 * 60 * 1000);

  const year = apiDate.getFullYear();
  const day = apiDate.getDate().toString().padStart(2, "0");
  const month = (apiDate.getMonth() + 1).toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div>
      <p>Date: {formattedDate}</p>
    </div>
  );
};

export default ShowDate;
