import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import "../index.css";

const DettaglioAnnuncio = () => {
  const { id } = useParams(); // Recupera l'ID dell'annuncio dalla route
  const [property, setProperty] = useState(null);
  const [emailSubject, setEmailSubject] = useState(""); // Campo oggetto email
  const [emailContent, setEmailContent] = useState(""); // Campo contenuto email
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:8080/api/properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Dati della proprietà:", response.data);
        setProperty(response.data); // Salva i dettagli della proprietà
      } catch (error) {
        console.error("Errore nel recupero dei dettagli dell'annuncio:", error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8080/api/emails/send",
        {
          recipient: property.user.email, // Email del destinatario
          subject: emailSubject, // Oggetto
          content: emailContent, // Contenuto
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Email inviata con successo!");
      setEmailSubject(""); // Reset del campo oggetto
      setEmailContent(""); // Reset del campo contenuto
      setErrorMessage("");
    } catch (error) {
      console.error("Errore nell'invio dell'email:", error);
      setErrorMessage("Errore nell'invio dell'email. Riprova più tardi.");
      setSuccessMessage("");
    }
  };

  if (!property) {
    return (
      <Container className="my-5 text-center">
        <h2>Caricamento dettagli dell annuncio...</h2>
      </Container>
    );
  }

  return (
    <Container className="dettaglio-annuncio my-5">
      {/* Contenitore Card di Dettaglio Annuncio */}
      <div className="section-container">
        <Row className="mb-4">
          <Col className="text-center">
            <img
              src={property.imageUrl || "default-image.jpg"}
              alt="Immagine della Proprietà"
              className="dettaglio-annuncio-img"
            />
          </Col>
        </Row>
        <Row className="card-details-row">
          <Col>
            <h3 className="card-title">{property.titolo}</h3>
          </Col>
          <Col className="text-end">
            <h3 className="dynamic-price">
              €{property.prezzo?.toLocaleString()}
            </h3>
          </Col>
        </Row>
        <Row className="card-details-row">
          <Col>
            <p>
              <strong>Indirizzo:</strong>{" "}
              <span className="dynamic-result">{property.indirizzo}</span>
            </p>
          </Col>
          <Col>
            <p>
              <strong>Zona:</strong>{" "}
              <span className="dynamic-result">{property.zona}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <h4 className="description-title">Descrizione</h4>
          <p className="dynamic-result">{property.descrizione}</p>
        </Row>
        <Row>
          <h4 className="characteristics-title">Caratteristiche</h4>
          <Row className="features-row">
            <Col>
              <p>
                <strong>Tipo:</strong>{" "}
                <span className="dynamic-result">{property.tipo}</span>
              </p>
            </Col>
            <Col>
              <p>
                <strong>Superficie:</strong>{" "}
                <span className="dynamic-result">{property.superficie} mq</span>
              </p>
            </Col>
          </Row>
          <Row className="bath-balcony-row">
            <Col>
              <p>
                <strong>Numero di Balconi:</strong>{" "}
                <span className="dynamic-result">{property.numeroBalconi}</span>
              </p>
            </Col>
            <Col>
              <p>
                <strong>Numero di Bagni:</strong>{" "}
                <span className="dynamic-result">{property.numeroBagni}</span>
              </p>
            </Col>
          </Row>
        </Row>
      </div>

      {/* Contenitore Email */}
      <div className="section-container mt-5">
        <h4 className="email-title">Invia un Email al Proprietario:</h4>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Oggetto:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci l'oggetto dell'email"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              required
              className="placeholder-centered"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contenuto:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Scrivi il contenuto dell'email"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              required
              className="placeholder-centered"
            />
          </Form.Group>
          <Button type="submit" className="btn-red">
            Invia
          </Button>
        </Form>
      </div>
      <div className="text-center mt-4">
        <Button className="btn-red" onClick={() => navigate(-1)}>
          Torna Indietro
        </Button>
      </div>
    </Container>
  );
};

export default DettaglioAnnuncio;
