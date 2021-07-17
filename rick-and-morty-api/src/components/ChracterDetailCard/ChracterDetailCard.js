import { useHistory } from "react-router-dom";
import "./style.css";

const ChracterCardDetail = ({ chracter, episodes }) => {
  const history = useHistory();

  return (
    <fieldset className="main-fieldset">
      <legend>{chracter.name}</legend>
      <div className="chracter-detail-card">
        <section className="img-section">
          <img src={chracter.image} />
        </section>
        <fieldset className="info-section">
          <legend>Info</legend>
          <div className="chracter-detail-info-item">
            <div className="title-content">
              <i className="fas fa-venus-mars" />
              <span>Gender</span>
            </div>
            <span>{chracter.gender}</span>
          </div>
          <div className="chracter-detail-info-item">
            <div className="title-content">
              <i className="fas fa-stream" />
              <span>Status</span>
            </div>
            <span>{chracter.status}</span>
          </div>
          <div className="chracter-detail-info-item">
            <div className="title-content">
              <i className="fab fa-typo3" /> <span>Species</span>
            </div>
            <span>{chracter.species}</span>
          </div>
          <div className="chracter-detail-info-item">
            <div className="title-content">
              <i className="fas fa-map-marker" />
              <span>Origin</span>
            </div>
            <span>{chracter.origin?.name}</span>
          </div>
          <div className="chracter-detail-info-item">
            <div className="title-content">
              <i className="fas fa-location-arrow" />
              <span>Location</span>
            </div>
            <span>{chracter.location?.name}</span>
          </div>
        </fieldset>
        <fieldset className="episode-section">
          <legend>Episodes</legend>
          <table class="episodes">
            <thead>
              <tr>
                <th>Name</th>
                <th>Air Date</th>
                <th>Episode</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode) => {
                return (
                  <tr>
                    <td>{episode.name}</td>
                    <td>{episode.air_date}</td>
                    <td>{episode.episode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </fieldset>
        <div className="footer-section">
          <button
            className="back"
            onClick={() => {
              history.goBack();
            }}
          >
            BACK
          </button>
        </div>
      </div>
    </fieldset>
  );
};

export default ChracterCardDetail;
