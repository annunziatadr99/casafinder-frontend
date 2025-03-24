import { Container, Row, Col } from "react-bootstrap";
import "../index.css"; // Assicurati di importare il CSS correttamente

const Footer = () => {
  return (
    <footer className="footer-custom mt-auto py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} CasaFinder. Tutti i diritti
              riservati.
            </p>
            <p>
              Seguici su:
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {" "}
                Facebook
              </a>{" "}
              |
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {" "}
                Twitter
              </a>{" "}
              |
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {" "}
                Instagram
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
