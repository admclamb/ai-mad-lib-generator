import React, { useState } from "react";

const Searchbar = ({ setQuery }) => {
  const [search, setSearch] = useState("");
  const changeSearch = ({ target: { value } }) => {
    setSearch(value);
  };
  const submitQuery = (event) => {
    event.preventDefault();
    setQuery(search.toLowerCase());
  };
  return (
    <form onSubmit={submitQuery}>
      <div className="flex flex-col gap-2">
        <label htmlFor="lib-search" className="text-slate-600">
          Search for Ad-Lib
        </label>
        <div className="relative">
          <input
            type="text"
            id="lib-search"
            placeholder="Search for an ad-lib..."
            className="border rounded py-2 pl-3 pr-24 w-full drop-shadow-sm focus:drop-shadow-xl ease-out duration-300 outline-offset-4"
            value={search}
            onChange={changeSearch}
          />
          <button
            className={`absolute top-1/2 ease-out duration-200 -translate-y-1/2 right-0 py-2 px-3 border rounded-r disabled:cursor-not-allowed ${
              search.length > 0
                ? "text-white bg-gray-900 border-gray-900"
                : "text-slate-600 bg-white"
            }`}
            type="submit"
            disabled={search.length === 0}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
