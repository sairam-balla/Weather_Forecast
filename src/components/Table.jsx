/* eslint-disable react/display-name */
import { ArrowDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import React from "react";

/* eslint-disable react/prop-types */
const Table = React.memo(({ data, onClickSort, sort }) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead className="uppercase font-semibold bg-gray-600 text-gray-100">
          <tr>
            <td className="py-2 px-4 border text-center text-sm md:text-base">
              S.No.
            </td>
            <td className="py-2 px-4 border text-center text-sm md:text-base">
              City Name
              <button
                disabled={sort === "name"}
                onClick={() => onClickSort("name")}
                className={`ml-2 ${
                  sort === "name" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ArrowDown className="w-4 h-4 inline" />
              </button>
            </td>
            <td className="py-2 px-4 border text-center text-sm md:text-base">
              Country
              <button
                disabled={sort === "cou_name_en"}
                onClick={() => onClickSort("cou_name_en")}
                className={`ml-2 ${
                  sort === "cou_name_en" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ArrowDown className="w-4 h-4 inline" />
              </button>
            </td>
            <td className="py-2 px-4 border text-center text-sm md:text-base hidden md:table-cell">
              Time Zone
              <button
                disabled={sort === "timezone"}
                onClick={() => onClickSort("timezone")}
                className={`ml-2 ${
                  sort === "timezone" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ArrowDown className="w-4 h-4 inline" />
              </button>
            </td>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-700">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border text-center text-sm md:text-base">
                {index + 1}
              </td>
              <td className="py-2 px-4 border text-center text-sm md:text-base">
                <Link
                  to={`/city/${item.name}`}
                  className="text-blue-500 hover:underline"
                >
                  {item.name}
                </Link>
              </td>
              <td className="py-2 px-4 border text-center text-sm md:text-base">
                {item.cou_name_en}
              </td>
              <td className="py-2 px-4 border text-center text-sm md:text-base hidden md:table-cell">
                {item.timezone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Table;
