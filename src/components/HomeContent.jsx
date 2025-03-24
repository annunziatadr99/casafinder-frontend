import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link per navigare
import "../index.css";
import logo from "../assets/Casafinder.svg";
import SearchBar from "./SearchBar";

const HomeContent = () => {
  return (
    <div className="home-content-custom text-center">
      <Row>
        <Col>
          {/* Logo reso cliccabile con Link alla homepage */}
          <Link to="/">
            <img src={logo} alt="CasaFinder Logo" className="home-logo" />
          </Link>
          <p className="home-text">Il N.1 per vendere e comprare</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <SearchBar />
        </Col>
      </Row>
    </div>
  );
};

export default HomeContent;
