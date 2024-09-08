import { useCallback, useEffect, useState } from "react";
import Table from "./Table";

const App = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [sort, setSort] = useState("name");

  const onHandleScroll = useCallback(
    (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;
      if (scrollTop + clientHeight + 1 >= scrollHeight && !isLoading) {
        setOffset((prevOffset) => prevOffset + 20);
      }
    },
    [isLoading]
  );

  const onClickSort = (sortItem) => {
    setData([]);
    setSort(sortItem);
    setOffset(0);
  };

  const onCLickSearch = useCallback(() => {
    if (searchInput.trim() === "") {
      alert("Please Enter City Name");
    } else {
      onClickSort("name");
      setSearchClick((prev) => !prev);
    }
  }, [searchInput]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const url =
        searchInput === ""
          ? `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=${sort}&limit=20&offset=${offset}`
          : `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search(name%2C%20%22${searchInput}%22)&order_by=${sort}&limit=20&offset=${offset}`;

      const response = await fetch(url);
      const result = await response.json();
      setData((prevData) => [...prevData, ...result.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onNotFoundData = useCallback(() => {
    return (
      <p className="text-center font-semibold text-2xl md:text-3xl m-4 md:m-20">
        No Data Found
      </p>
    );
  }, [isLoading]);

  useEffect(() => {
    fetchData();
  }, [offset, searchClick, sort]);

  return (
    <div
      className="w-full h-screen overflow-y-scroll scroll-smooth pt-4 px-4 md:px-8 lg:px-20"
      onScroll={onHandleScroll}
    >
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-4 md:mb-8">
        Weather Forecast
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-6">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          className="px-4 py-2 text-sm md:text-md rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-white text-gray-700 focus:outline-gray-300 border-gray-300"
          placeholder="Type your city...."
        />
        <button
          onClick={onCLickSearch}
          className="font-bold rounded-lg text-sm md:text-md px-4 md:px-6 h-10 bg-gray-800 text-white"
        >
          Search
        </button>
        {searchInput === "" && data.length !== 0 && !isLoading ? (
          <button
            disabled
            className="font-bold rounded-lg text-sm md:text-md px-4 md:px-6 h-10 bg-gray-400 text-white cursor-not-allowed"
          >
            All Cities
          </button>
        ) : (
          <button
            onClick={() => {
              setSearchInput("");
              setData([]);
              setSearchClick((prev) => !prev);
            }}
            className="font-bold rounded-lg text-sm md:text-md px-4 md:px-6 h-10 bg-gray-800 text-white"
          >
            All Cities
          </button>
        )}
      </div>

      {data.length === 0 && !isLoading ? (
        onNotFoundData()
      ) : (
        <Table data={data} onClickSort={onClickSort} sort={sort} />
      )}
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <div className="border-gray-300 h-8 w-8 md:h-12 md:w-12 m-4 md:m-20 animate-spin rounded-full border-4 md:border-8 border-t-blue-600" />
        </div>
      )}
    </div>
  );
};

export default App;
