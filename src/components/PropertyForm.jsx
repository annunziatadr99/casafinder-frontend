import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const PropertyForm = () => {
  const [preview, setPreview] = useState(null); // Stato per l'anteprima immagine
  const [titolo, setTitolo] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [tipo, setTipo] = useState("AFFITTO"); // Inizializzazione in maiuscolo
  const [indirizzo, setIndirizzo] = useState("");
  const [zona, setZona] = useState(""); // Stato per il nuovo campo Zona
  const [descrizione, setDescrizione] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [numeroBagni, setNumeroBagni] = useState("");
  const [numeroBalconi, setNumeroBalconi] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Stato per il successo
  const navigate = useNavigate();

  // Gestisce il caricamento dell'immagine e genera l'anteprima
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Gestione dell'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Recupera il token JWT
    const userId = localStorage.getItem("userId"); // Recupera l'userId dal localStorage

    if (!token || !userId) {
      setError("Errore: Effettua il login per pubblicare un annuncio.");
      return;
    }

    // Converti "tipo" in maiuscolo per evitare errori di backend
    const tipoUpperCase = tipo.toUpperCase();

    // Configura i dati da inviare al backend tramite FormData
    const formData = new FormData();
    formData.append("file", image); // Immagine caricata
    formData.append("userId", userId); // Associazione con l'utente loggato
    formData.append("titolo", titolo);
    formData.append("prezzo", prezzo);
    formData.append("tipo", tipoUpperCase); // Convertito in maiuscolo
    formData.append("indirizzo", indirizzo);
    formData.append("zona", zona); // Nuovo campo zona
    formData.append("descrizione", descrizione);
    formData.append("superficie", superficie);
    formData.append("numeroBagni", numeroBagni);
    formData.append("numeroBalconi", numeroBalconi);

    try {
      const response = await fetch("http://localhost:8080/api/properties", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setError("");
        console.log("Annuncio pubblicato con successo.");
        navigate("/profile"); // Reindirizza all'area personale
      } else {
        const data = await response.json();
        setError(
          data.error || "Errore durante la pubblicazione dell'annuncio."
        );
      }
    } catch (error) {
      console.error("Errore durante la pubblicazione:", error);
      setError("Errore durante la pubblicazione dell'annuncio.");
    }
  };

  return (
    <Container className="my-5 property-form-custom">
      <h3>Pubblica un Annuncio:</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTitolo">
              <Form.Label>
                <strong>Titolo:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il titolo"
                value={titolo}
                onChange={(e) => setTitolo(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formPrezzo">
              <Form.Label>
                <strong>Prezzo (€):</strong>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il prezzo"
                value={prezzo}
                onChange={(e) => setPrezzo(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTipo">
              <Form.Label>
                <strong>Tipo:</strong>
              </Form.Label>
              <Form.Select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value="AFFITTO">AFFITTO</option>
                <option value="VENDITA">VENDITA</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formIndirizzo">
              <Form.Label>
                <strong>Indirizzo:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci l'indirizzo"
                value={indirizzo}
                onChange={(e) => setIndirizzo(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formZona">
              <Form.Label>
                <strong>Zona:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la zona"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDescrizione">
              <Form.Label>
                <strong>Descrizione:</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci una descrizione"
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formSuperficie">
              <Form.Label>
                <strong>Superficie (mq):</strong>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci la superficie"
                value={superficie}
                onChange={(e) => setSuperficie(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formNumeroBagni">
              <Form.Label>
                <strong>Numero di Bagni:</strong>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il numero di bagni"
                value={numeroBagni}
                onChange={(e) => setNumeroBagni(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formNumeroBalconi">
              <Form.Label>
                <strong>Numero di Balconi:</strong>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il numero di balconi"
                value={numeroBalconi}
                onChange={(e) => setNumeroBalconi(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formImage">
              <Form.Label>
                <strong>Immagine della Proprietà:</strong>
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        {preview && (
          <div className="form-group mb-3 text-center">
            <label>Anteprima Immagine:</label>
            <img
              src={preview}
              alt="Anteprima"
              className="img-thumbnail mt-2"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && (
          <Alert variant="success">Annuncio pubblicato con successo!</Alert>
        )}
        <Button className="btn-publish w-100" type="submit">
          Pubblica Annuncio
        </Button>
      </Form>
    </Container>
  );
};

export default PropertyForm;
