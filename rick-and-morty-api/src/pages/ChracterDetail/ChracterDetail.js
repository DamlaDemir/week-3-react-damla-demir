import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChracterDetailCard } from "../../components";
import "./style.css";

const ChracterDetail = () => {
  const [chracter, setChracter] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const { id } = useParams();

  useEffect(async () => {
    await getChracterDetail();
  }, []);

  const getChracterDetail = async () => {
    let episodes = [],
      response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );

    if (response.status === 200) {
      await Promise.all(
        response.data.episode.map(async (episodeUrl) => {
          let episodeListResponse = await axios.get(episodeUrl);

          if (episodeListResponse.status === 200) {
            episodes.push(episodeListResponse.data);
          }
        })
      );

      setChracter(response.data);
      setEpisodes(episodes);
    } else {
      alert("Error on get chrater detail!");
    }
  };

  return (
    <div className="chracter-detail-wrapper">
      <ChracterDetailCard chracter={chracter} episodes={episodes} />
    </div>
  );
};

export default ChracterDetail;
