import { Link } from "react-router-dom";
import "./style.css";

const ChracterCard = ({ chracter }) => {
  return (
    <article className="chracter-card">
      <section className="card-header">
        <img src={chracter.image} alt="profile-img" />
      </section>
      <section className="card-body">
        <div className="chracter-title">{chracter.name}</div>
        <div className="chracter-info">
          <div className="chracter-info-item">
            <i className="fas fa-venus-mars">
              <span>Gender</span>
            </i>
            <span>{chracter.gender}</span>
          </div>
          <div className="chracter-info-item">
            <i className="fas fa-stream">
              <span>Status</span>
            </i>
            <span>{chracter.status}</span>
          </div>
          <div className="chracter-info-item">
            <i className="fas fa-location-arrow">
              <span>Location</span>
            </i>
            <span>{chracter.location.name}</span>
          </div>
        </div>
      </section>
      <section className="card-footer">
        <Link to={`/chracterDetail/${chracter.id}`}>Show Detail</Link>
      </section>
    </article>
  );
};

export default ChracterCard;
