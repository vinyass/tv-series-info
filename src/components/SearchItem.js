import React from "react";
import { useHistory } from "react-router-dom";

import "./SearchItem.css";

const SearchItem = ({ item: { imdbID, Poster, Title, Year } }) => {
  const history = useHistory();
  const openDetails = () => {
    history.push(`/titles/${imdbID}`);
  };
  return (
    <div className="search-item" key={imdbID} onClick={openDetails}>
      <div className="search-item__poster">
        <img src={Poster} alt={Title} />
      </div>
      <div className="search-item__info">
        <div className="search-item__title">{Title}</div>
        <div className="search-item__year">{Year}</div>
      </div>
    </div>
  );
};

export default SearchItem;
