import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const AreaPersonale = () => {
  const [userData, setUserData] = useState({});
  const [userAnnouncements, setUserAnnouncements] = useState([]);
  const [favoriteAnnouncements, setFavoriteAnnouncements] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Funzione per recuperare le email inviate
  const fetchEmails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/emails/logs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSentEmails(response.data);
    } catch (error) {
      console.error("Errore nel recuperare le email inviate:", error);
      setError("Errore nel recuperare i tuoi dati. Riprova più tardi.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchData = async () => {
        try {
          // Recupera i dati utente
          const response = await axios.get(
            "http://localhost:8080/api/user/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserData(response.data);

          // Recupera gli annunci dell'utente
          const userAnnResponse = await axios.get(
            "http://localhost:8080/api/user/announcements",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUserAnnouncements(userAnnResponse.data);

          // Recupera gli annunci preferiti
          const favAnnResponse = await axios.get(
            "http://localhost:8080/api/favorites",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setFavoriteAnnouncements(favAnnResponse.data);

          // Richiama la funzione per recuperare le email inviate
          fetchEmails();
        } catch (error) {
          console.error("Errore nel recuperare i dati utente:", error);
          setError("Errore nel recuperare i tuoi dati. Riprova più tardi.");
        }
      };
      fetchData();
    } else {
      navigate("/"); // Reindirizza alla home page se il token non esiste
    }
  }, [navigate]);

  const handleDeleteAnnouncement = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserAnnouncements((prev) =>
        prev.filter((annuncio) => annuncio.id !== id)
      );
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'annuncio:", error);
      setError("Non è stato possibile eliminare l'annuncio. Riprova.");
    }
  };

  const handleEditAnnouncement = (id) => {
    navigate(`/modifica-annuncio/${id}`);
  };

  const handleRemoveFavorite = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavoriteAnnouncements((prev) =>
        prev.filter((annuncio) => annuncio.id !== id)
      );
    } catch (error) {
      console.error(
        "Errore durante la rimozione dell'annuncio preferito:",
        error
      );
      setError("Non è stato possibile rimuovere l'annuncio. Riprova.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <Container className="my-5">
      {/* Intestazione della pagina */}
      <div className="page-header">
        <h1>Ciao {userData.nome}</h1>
        <span>
          Questo è il tuo centro di controllo dove potrai gestire i tuoi annunci
          personali, preferiti e email inviate.
        </span>
      </div>

      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {/* Sezione Dati Utente */}
      <Row>
        <Col md={6}>
          <div className="section-container">
            <h3 className="section-title">Dati Utente</h3>
            <div className="user-data-card">
              <Row className="list-group-item mb-3">
                <Col md={3}>
                  <strong>Nome:</strong>
                </Col>
                <Col md={9} className="dynamic-result">
                  {userData.nome}
                </Col>
              </Row>
              <Row className="list-group-item mb-3">
                <Col md={3}>
                  <strong>Cognome:</strong>
                </Col>
                <Col md={9} className="dynamic-result">
                  {userData.cognome}
                </Col>
              </Row>
              <Row className="list-group-item mb-3">
                <Col md={3}>
                  <strong>Username:</strong>
                </Col>
                <Col md={9} className="dynamic-result">
                  {userData.username}
                </Col>
              </Row>
              <Row className="list-group-item mb-3">
                <Col md={3}>
                  <strong>Email:</strong>
                </Col>
                <Col md={9} className="dynamic-result">
                  {userData.email}
                </Col>
              </Row>
              <Row className="list-group-item">
                <Col md={3}>
                  <strong>Telefono:</strong>
                </Col>
                <Col md={9} className="dynamic-result">
                  {userData.telefono}
                </Col>
              </Row>
            </div>
          </div>
        </Col>

        {/* Sezione Email Inviate */}
        <Col md={6}>
          <div className="section-container">
            <h3 className="section-title">Email Inviate</h3>
            <ul className="list-group">
              {sentEmails.map((email) => (
                <li key={email.id} className="list-group-item">
                  <p>
                    <strong>Destinatario:</strong>{" "}
                    <span className="dynamic-result">{email.recipient}</span>
                  </p>
                  <p>
                    <strong>Oggetto:</strong>{" "}
                    <span className="dynamic-result">{email.subject}</span>
                  </p>
                  <p>
                    <strong>Inviata il:</strong>{" "}
                    <span className="dynamic-result">
                      {new Date(email.sentAt).toLocaleString()}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>

      {/* Sezione I Tuoi Annunci */}
      <Row className="section-container">
        <Col md={12}>
          <h3 className="section-title">I tuoi Annunci</h3>
          <Row>
            {userAnnouncements.map((annuncio) => (
              <Col md={4} key={annuncio.id} className="mb-4">
                <div
                  className="card-common-style"
                  style={{ position: "relative", cursor: "pointer" }}
                  onClick={() => navigate(`/annuncio/${annuncio.id}`)}
                >
                  <img
                    src={annuncio.imageUrl || "default-image.jpg"}
                    alt={annuncio.titolo || "Immagine Annuncio"}
                    className="img-thumbnail"
                  />
                  <div className="content">
                    <p className="font-weight-bold">
                      {annuncio.titolo || "Titolo non disponibile"}
                    </p>
                    <p>
                      <strong>Prezzo:</strong>{" "}
                      <span className="dynamic-result">
                        €{annuncio.prezzo?.toLocaleString() || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong>Indirizzo:</strong>{" "}
                      <span className="dynamic-result">
                        {annuncio.indirizzo || "Non specificato"}
                      </span>
                    </p>
                    <p>
                      <strong>Tipo:</strong>{" "}
                      <span className="dynamic-result">
                        {annuncio.tipo || "Non specificato"}
                      </span>
                    </p>
                    <p>
                      <strong>Zona:</strong>{" "}
                      <span className="dynamic-result">
                        {annuncio.zona || "Non specificata"}
                      </span>
                    </p>
                  </div>
                  {/* Icona per eliminare l'annuncio */}
                  <i
                    className="bi bi-trash-fill action-icon trash-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAnnouncement(annuncio.id);
                    }}
                  ></i>
                  {/* Icona per modificare l'annuncio */}
                  <i
                    className="bi bi-gear-fill action-icon gear-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAnnouncement(annuncio.id);
                    }}
                  ></i>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Sezione Annunci Preferiti */}
      <Row>
        {favoriteAnnouncements.map((annuncio) => (
          <Col md={4} key={annuncio.id} className="mb-4">
            <div
              className="card-common-style"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => navigate(`/annuncio/${annuncio.property?.id}`)} // Uso di annuncio.property.id
            >
              <img
                src={annuncio.property?.imageUrl || "default-image.jpg"}
                alt={annuncio.property?.titolo || "Immagine Annuncio"}
                className="img-thumbnail"
              />
              <div className="content">
                <p className="font-weight-bold">
                  {annuncio.property?.titolo || "Titolo non disponibile"}
                </p>
                <p>
                  <strong>Prezzo:</strong>{" "}
                  <span className="dynamic-result">
                    €{annuncio.property?.prezzo?.toLocaleString() || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>Indirizzo:</strong>{" "}
                  <span className="dynamic-result">
                    {annuncio.property?.indirizzo || "Non specificato"}
                  </span>
                </p>
                <p>
                  <strong>Tipo:</strong>{" "}
                  <span className="dynamic-result">
                    {annuncio.property?.tipo || "Non specificato"}
                  </span>
                </p>
                <p>
                  <strong>Zona:</strong>{" "}
                  <span className="dynamic-result">
                    {annuncio.property?.zona || "Non specificata"}
                  </span>
                </p>
              </div>
              {/* Icona per rimuovere dai preferiti */}
              <i
                className="bi bi-trash-fill action-icon trash-icon2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavorite(annuncio.id);
                }}
              ></i>
            </div>
          </Col>
        ))}
      </Row>

      {/* Pulsante Logout */}
      <div className="text-center mt-4">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default AreaPersonale;
