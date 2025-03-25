import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ModificaAnnuncio = () => {
  const { id } = useParams(); // Ottiene l'id dell'annuncio dall'URL
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null); // Anteprima immagine
  const [titolo, setTitolo] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [tipo, setTipo] = useState("AFFITTO"); // Valore predefinito
  const [indirizzo, setIndirizzo] = useState("");
  const [zona, setZona] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [numeroBagni, setNumeroBagni] = useState("");
  const [numeroBalconi, setNumeroBalconi] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Stato per mostrare il successo

  useEffect(() => {
    // Funzione per ottenere i dettagli dell'annuncio
    const fetchPropertyDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/api/properties/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTitolo(data.titolo);
          setPrezzo(data.prezzo);
          setTipo(data.tipo);
          setIndirizzo(data.indirizzo);
          setZona(data.zona);
          setDescrizione(data.descrizione);
          setSuperficie(data.superficie);
          setNumeroBagni(data.numeroBagni);
          setNumeroBalconi(data.numeroBalconi);
          setPreview(data.imageUrl); // Mostra l'immagine esistente come anteprima
        } else {
          setError("Errore nel recuperare i dettagli dell'annuncio.");
        }
      } catch (error) {
        console.error("Errore nel caricamento dell'annuncio:", error);
        setError("Errore nel caricamento dell'annuncio.");
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (image) {
      formData.append("file", image); // Aggiungi il file solo se l'utente lo carica
    }
    if (titolo) {
      formData.append("titolo", titolo);
    }
    if (prezzo) {
      formData.append("prezzo", prezzo);
    }
    if (tipo) {
      formData.append("tipo", tipo.toUpperCase()); // Converti in maiuscolo
    }
    if (indirizzo) {
      formData.append("indirizzo", indirizzo);
    }
    if (zona) {
      formData.append("zona", zona);
    }
    if (descrizione) {
      formData.append("descrizione", descrizione);
    }
    if (superficie) {
      formData.append("superficie", superficie);
    }
    if (numeroBagni) {
      formData.append("numeroBagni", numeroBagni);
    }
    if (numeroBalconi) {
      formData.append("numeroBalconi", numeroBalconi);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/properties/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (response.ok) {
        setSuccess(true);
        setError("");
        navigate("/profile"); // Reindirizza all'area personale
      } else {
        const data = await response.json();
        setError(data.error || "Errore durante la modifica dell'annuncio.");
      }
    } catch (error) {
      console.error("Errore durante la modifica:", error);
      setError("Errore durante la modifica dell'annuncio.");
    }
  };

  return (
    <Container className="my-5 property-form-custom">
      <h3>Modifica il tuo Annuncio:</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTitolo">
              <Form.Label>Titolo:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il titolo"
                value={titolo}
                onChange={(e) => setTitolo(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formPrezzo">
              <Form.Label>Prezzo (€):</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il prezzo"
                value={prezzo}
                onChange={(e) => setPrezzo(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo:</Form.Label>
              <Form.Select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="AFFITTO">AFFITTO</option>
                <option value="VENDITA">VENDITA</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formIndirizzo">
              <Form.Label>Indirizzo:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci l'indirizzo"
                value={indirizzo}
                onChange={(e) => setIndirizzo(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formZona">
              <Form.Label>Zona:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la zona"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDescrizione">
              <Form.Label>Descrizione:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci una descrizione"
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formSuperficie">
              <Form.Label>Superficie (mq):</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci la superficie"
                value={superficie}
                onChange={(e) => setSuperficie(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formNumeroBagni">
              <Form.Label>Numero di Bagni:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il numero di bagni"
                value={numeroBagni}
                onChange={(e) => setNumeroBagni(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formNumeroBalconi">
              <Form.Label>Numero di Balconi:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il numero di balconi"
                value={numeroBalconi}
                onChange={(e) => setNumeroBalconi(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formImage">
              <Form.Label>Immagine della Proprietà:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
          <Alert variant="success">Annuncio modificato con successo!</Alert>
        )}
        <Button className="btn-publish w-100" type="submit">
          Salva Modifiche
        </Button>
      </Form>
    </Container>
  );
};

export default ModificaAnnuncio;
