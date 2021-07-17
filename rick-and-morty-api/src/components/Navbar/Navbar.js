import "./style.css";
import { Link } from "react-router-dom";

const Navbar = ({ children }) => {
  return (
    <ul className="nav-bar">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/chracters">Chracters</Link>
      </li>
      {/* <li>
        <Link to="/episodes">Episodes</Link>
      </li>
      <li>
        <Link to="/locations">Locations</Link>
      </li> */}
    </ul>
  );
};

export default Navbar;
