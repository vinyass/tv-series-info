import React, { useState } from "react";
import SearchItem from "./SearchItem";
import { searchTitle } from "../api/omdb";
import useDebouncedEffect from "../hooks/useDebouncedEffect";
import Loader from "./Loader";

const SearchResults = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useDebouncedEffect(
    async () => {
      if (searchText !== "") {
        setLoading(true);
        const response = await searchTitle(searchText);
        setLoading(false);
        setSearchResults(response);
      } else {
        setSearchResults([]);
        setLoading(false);
      }
    },
    1000,
    [searchText]
  );
  return (
    <>
      <div className="app__search-container">
        <input
          type="text"
          placeholder="Enter a TV series name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="app__search-results">
        {loading ? (
          <Loader />
        ) : (
          searchResults.map((res) => <SearchItem item={res} key={res.imdbID} />)
        )}
      </div>
    </>
  );
};

export default SearchResults;
