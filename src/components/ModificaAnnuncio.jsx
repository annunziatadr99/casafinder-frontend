import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ModificaAnnuncio = () => {
  const { id } = useParams(); // Ottiene l'id dell'annuncio dall'URL
  const navigate = useNavigate();

  const [previews, setPreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [titolo, setTitolo] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [tipo, setTipo] = useState("AFFITTO");
  const [indirizzo, setIndirizzo] = useState("");
  const [zona, setZona] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [numeroBagni, setNumeroBagni] = useState("");
  const [numeroBalconi, setNumeroBalconi] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
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
          setPreviews(data.imageUrls || [data.imageUrl]);
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
    const files = Array.from(e.target.files);
    setImages(files);

    const previewsArray = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewsArray).then((results) => setPreviews(results));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // 🔥 Recupera il ruolo
    const url =
      role === "ADMIN"
        ? `http://localhost:8080/api/admin/properties/${id}`
        : `http://localhost:8080/api/properties/${id}`;

    const formData = new FormData();

    images.forEach((image) => formData.append("files", image));
    if (titolo) formData.append("titolo", titolo);
    if (prezzo) formData.append("prezzo", prezzo);
    if (tipo) formData.append("tipo", tipo.toUpperCase());
    if (indirizzo) formData.append("indirizzo", indirizzo);
    if (zona) formData.append("zona", zona);
    if (descrizione) formData.append("descrizione", descrizione);
    if (superficie) formData.append("superficie", superficie);
    if (numeroBagni) formData.append("numeroBagni", numeroBagni);
    if (numeroBalconi) formData.append("numeroBalconi", numeroBalconi);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setError("");

        // 🔥 Corretta la logica di navigazione
        if (role === "ADMIN") {
          navigate("/admin/properties"); // 🔥 Gli ADMIN restano nella gestione annunci
        } else {
          navigate("/profile"); // 🔥 Gli USER vengono reindirizzati alla propria area personale
        }
      } else {
        let errorMessage = "Errore durante la modifica dell'annuncio.";

        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = text || errorMessage;
        }

        setError(errorMessage);
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
          {/* Sezione per la gestione dell'upload multiplo di immagini */}

          <Col>
            <Form.Group controlId="formImages">
              <Form.Label>Immagini della Proprietà:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Form.Group>
          </Col>
        </Row>
        {previews.length > 0 && (
          <div className="form-group mb-3 text-center">
            <label>Anteprima Immagini:</label>
            <div className="d-flex flex-wrap justify-content-center">
              {previews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Anteprima ${index + 1}`}
                  className="img-thumbnail mt-2 mx-2"
                  style={{ maxWidth: "100px", maxHeight: "300px" }}
                />
              ))}
            </div>
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
