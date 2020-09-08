import React, { useEffect, useState, useCallback } from "react";
import { fetchTitleDetails } from "../api/omdb";
import ColorThief from "colorthief";
import Chart from "./Chart";

import "./TitleDetails.css";
import Loader from "./Loader";

const TitleDetails = ({ match }) => {
  const [titleDetails, setTitleDetails] = useState({ episodes: [] });
  const [loaded, setLoaded] = useState(false);
  const [dominantColor, setDominantColor] = useState({
    r: 0,
    b: 0,
    g: 0,
  });

  const posterRef = useCallback((img) => {
    if (img != null) {
      const colorThief = new ColorThief();
      img.addEventListener("load", function () {
        const [r, g, b] = colorThief.getColor(img);
        setDominantColor({ r, g, b });
      });
    }
  }, []);

  useEffect(() => {
    const { titleId } = match.params;
    (async () => {
      const response = await fetchTitleDetails(titleId);

      setTitleDetails(response);
      setLoaded(true);
      document.title = document.title + " | " + response.Title;
    })();
  }, [match]);

  return (
    <div className="title-details">
      {loaded ? (
        <>
          <div className="title-details__data">
            <div className="title-details__poster">
              <img
                crossOrigin=""
                ref={posterRef}
                src={titleDetails.Poster}
                alt={titleDetails.Title}
              />
            </div>
            <div className="title-details__info">
              <div className="title-details__title">{titleDetails.Title}</div>
              <div className="title-details__year">{titleDetails.Year}</div>
              <div className="title-details__synopsis">{titleDetails.Plot}</div>
              <div className="title-details__cast">
                Cast: {titleDetails.Actors}
              </div>
              <div className="title-details__rating">
                Rating: {titleDetails.imdbRating}
              </div>
            </div>
          </div>
          {dominantColor && (
            <Chart color={dominantColor} titleDetails={titleDetails} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TitleDetails;
