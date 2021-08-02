import axios from "axios";
import { isResponseOk } from "../helpers/utils";

const BASE_URL = "https://rickandmortyapi.com/api/character/";

export const getAllChracters = async (queryParams = {}) => {
  try {
    let data;
    let response = await axios.get(`${BASE_URL}`, { params: queryParams });

    if (isResponseOk(response)) {
      data = mappedAllChracters(response.data);
    } else {
      data = mappedAllChracters(data);
    }

    return data;
  } catch (err) {
    throw new Error("Error on get chracter list!");
  }
};

export const getChracter = async (id) => {
  try {
    let data;
    let response = await axios.get(`${BASE_URL}${id}`);

    if (isResponseOk(response)) {
      data = mappedChracter(response.data);
    } else {
      data = mappedChracter(data);
    }

    return data;
  } catch (err) {
    throw new Error("Error on get chracter detail!");
  }
};

export const getEpisodesByChracter = async (episodeEndPoints) => {
  try {
    let data,
      episodes = [];

    await Promise.all(
      episodeEndPoints.map(async (episodeUrl) => {
        let episodeListResponse = await axios.get(episodeUrl);

        if (isResponseOk(episodeListResponse)) {
          data = mappedEpisode(episodeListResponse.data);
          episodes.push(data);
        } else {
          throw new Error();
        }
      })
    );
    return episodes;
  } catch (err) {
    throw new Error("Error on get episodes!");
  }
};

const mappedAllChracters = (chracterData) => {
  const { info: { pages = 0 } = {}, results = [] } = chracterData || {};
  return {
    info: {
      pages,
    },
    results,
  };
};

const mappedChracter = (chracterData) => {
  const {
    id,
    name,
    image,
    gender,
    status,
    species,
    origin = {},
    location = {},
    episode = [],
  } = chracterData || {};
  return {
    id,
    name,
    image,
    gender,
    status,
    species,
    origin,
    location,
    episode,
  };
};

const mappedEpisode = (episodeData) => {
  const { name, air_date, episode } = episodeData || {};
  return {
    name,
    air_date,
    episode,
  };
};
