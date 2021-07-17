import "./style.css";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="content-wrapper">{children}</main>
    </div>
  );
};

export default Layout;
