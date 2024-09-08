/* eslint-disable react/display-name */
import { ArrowDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import React from "react";

/* eslint-disable react/prop-types */
const Table = React.memo(({ data, onClickSort, sort }) => {
  return (
    <div className="relative overflow-hidden shadow-md rounded-lg">
      <table className="table-fixed w-full text-left">
        <thead className="uppercase font-semibold bg-[#6b7280] text-[#e5e7eb]">
          <tr>
            <td className="py-3 border text-center w-20  p-4">S.No.</td>
            <td className="py-3 border text-center p-4">
              City Name
              <button
                disabled={sort === "name" ? true : false}
                onClick={() => onClickSort("name")}
              >
                <ArrowDown className="mx-2" />
              </button>
            </td>
            <td className="py-3 border text-center p-4">
              Country
              <button
                disabled={sort === "cou_name_en" ? true : false}
                onClick={() => onClickSort("cou_name_en")}
              >
                <ArrowDown className="mx-2" />
              </button>
            </td>
            <td className="py-3 border text-center p-4">
              Time Zone
              <button
                disabled={sort === "timezone" ? true : false}
                onClick={() => onClickSort("timezone")}
              >
                <ArrowDown className="mx-2" />
              </button>
            </td>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-500 bg-[#FFFFFF] text-[#6b7280]">
          {data.map((item, index) => (
            <tr className="py-2" key={index}>
              <td className="py-2 border text-center  p-4">{index + 1}</td>
              <td className="py-2 border text-center  p-4">
                <Link to={`/city/${item.name}`}>{item.name}</Link>
              </td>
              <td className="py-2 border text-center  p-4">
                {item.cou_name_en}
              </td>
              <td className="py-2 border text-center  p-4">{item.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Table;
