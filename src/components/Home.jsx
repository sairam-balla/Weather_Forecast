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
      <p className="text-center font-semibold text-3xl m-20">No Data Found</p>
    );
  }, [isLoading]);

  useEffect(() => {
    fetchData();
  }, [offset, searchClick, sort]);

  return (
    <div
      className="w-full h-dvh overflow-y-scroll scroll-smooth pt-12 px-40"
      onScroll={onHandleScroll}
    >
      <h1 className="text-center text-3xl font-semibold">Weather Forecast</h1>
      <div className="flex justify-center content-center gap-6 m-6">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          className="px-4 py-2 self-center text-md rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-[#ffffff] text-[#444444] focus:outline-[#aaaaaa] border-[#cccccc]"
          placeholder="Type your city...."
        />
        <button
          onClick={onCLickSearch}
          className="font-bold rounded-lg text-md px-6 h-10 bg-[#374151] text-[#ffffff]"
        >
          Search
        </button>
        {searchInput === "" && data.length !== 0 && !isLoading ? (
          <button
            disabled
            className="font-bold rounded-lg text-md px-6 h-10 bg-[#a7a7a8] text-[#ffffff] cursor-not-allowed"
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
            className="font-bold rounded-lg text-md px-6 h-10 bg-[#374151] text-[#ffffff]"
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
        <div className="w-full flex justify-center content-center">
          <div className="border-gray-300 h-12 w-12 m-20 animate-spin rounded-full border-8 border-t-blue-600" />
        </div>
      )}
    </div>
  );
};

export default App;
