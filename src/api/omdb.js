import axios from "axios";

const BASE_URL = "https://www.omdbapi.com",
  API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const searchTitle = async (s) => {
  const response = await axios.get(BASE_URL, {
    params: {
      s,
      type: "series",
      apikey: API_KEY,
    },
  });
  console.log(response);
  if (response.data.Response === "False") {
    return [];
  }
  return response.data.Search;
};

export const fetchTitleDetails = async (i) => {
  let { data } = await axios.get(BASE_URL, {
    params: {
      i,
      apikey: API_KEY,
    },
  });

  data.episodes = [];
  const totalSeasons = parseFloat(data.totalSeasons);
  for (let idx = 1; idx <= totalSeasons; idx++) {
    const seasonData = await fetchSeasonDetails(data.imdbID, idx);
    const episodeData = seasonData.data.Episodes.map((episode) => {
      return {
        ...episode,
        season: seasonData.data.Season,
        episodeNumber: `Season${idx} Episode${episode.Episode}`,
      };
    }).filter((episode) => episode.imdbRating !== "N/A");
    data.episodes.push(...episodeData);
  }

  return data;
};

const fetchSeasonDetails = async (titleId, seasonNumber) => {
  return axios.get(BASE_URL, {
    params: {
      i: titleId,
      Season: seasonNumber,
      apikey: API_KEY,
    },
  });
};
