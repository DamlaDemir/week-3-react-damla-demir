import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/character/";

export const getAllChracters = async (queryParams = {}) => {
  let response = await axios.get(`${BASE_URL}`, { params: queryParams });

  if (response.status === 200) {
    return response.data;
  } else {
    alert("Error on get chracter list!");
  }
};

export const getChracter = async (id) => {
  let response = await axios.get(`${BASE_URL}${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    alert("Error on get chrater detail!");
  }
};

export const getEpisodesByChracter = async (episodeEndPoints) => {
  let episodes = [];

  await Promise.all(
    episodeEndPoints.map(async (episodeUrl) => {
      let episodeListResponse = await axios.get(episodeUrl);

      if (episodeListResponse.status === 200) {
        episodes.push(episodeListResponse.data);
      }
    })
  );

  return episodes;
};
