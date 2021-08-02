import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChracterDetailCard } from "../../components";
import { getChracter, getEpisodesByChracter } from "../../services/ApiService";
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
      response = await getChracter(id);

    episodes = await getEpisodesByChracter(response.episode);

    setChracter(response);
    setEpisodes(episodes);
  };

  return (
    <div className="chracter-detail-wrapper">
      <ChracterDetailCard chracter={chracter} episodes={episodes} />
    </div>
  );
};

export default ChracterDetail;
