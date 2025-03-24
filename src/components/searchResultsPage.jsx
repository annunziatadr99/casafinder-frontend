import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const query = location.search;
        const response = await axios.get(
          `http://localhost:8080/api/properties/search${query}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
        setError("Errore durante la ricerca. Riprova più tardi.");
      }
    };

    fetchResults();
  }, [location.search]);

  const handleAddToFavorites = async (propertyId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8080/api/favorites", propertyId, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Annuncio aggiunto ai preferiti!");
    } catch (error) {
      console.error("Errore nell'aggiungere ai preferiti:", error);
      alert("Errore nell'aggiungere ai preferiti.");
    }
  };

  return (
    <Container className="my-5">
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      <Row className="mt-4">
        {results.length > 0 ? (
          results.map((property) => (
            <Col md={4} className="mb-4" key={property.id}>
              <Card
                className="search-results-card card-common-style position-relative"
                onClick={() => navigate(`/annuncio/${property.id}`)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={property.imageUrl || "default-image.jpg"}
                  alt="Immagine Annuncio"
                  className="img-thumbnail"
                />
                <Card.Body className="content">
                  <p className="font-weight-bold">
                    {property.titolo || "Titolo non disponibile"}
                  </p>
                  <p>
                    <strong>Prezzo:</strong>{" "}
                    <span className="dynamic-result">
                      €{property.prezzo?.toLocaleString() || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Indirizzo:</strong>{" "}
                    <span className="dynamic-result">
                      {property.indirizzo || "Non specificato"}
                    </span>
                  </p>
                  <p>
                    <strong>Tipo:</strong>{" "}
                    <span className="dynamic-result">
                      {property.tipo || "Non specificato"}
                    </span>
                  </p>
                  <p>
                    <strong>Zona:</strong>{" "}
                    <span className="dynamic-result">
                      {property.zona || "Non specificata"}
                    </span>
                  </p>
                </Card.Body>
                {/* Icona Cuore per aggiungere ai preferiti con stile modificato */}
                <i
                  className="bi bi-heart-fill favorite-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavorites(property.id);
                  }}
                ></i>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center mt-4">Nessun annuncio trovato.</p>
        )}
      </Row>
    </Container>
  );
};

export default SearchResultsPage;
