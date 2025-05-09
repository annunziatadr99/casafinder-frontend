import { useState, useEffect } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/"); // 🔥 Protezione: solo gli ADMIN possono accedere
    }

    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/admin/properties",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Errore nel recuperare gli annunci:", error);
        setError("Errore nel recuperare gli annunci. Riprova più tardi.");
      }
    };

    fetchProperties();
  }, [navigate]);

  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Autenticazione richiesta. Effettua il login.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/api/admin/properties/${propertyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setProperties((prevProperties) =>
          prevProperties.filter((prop) => prop.id !== propertyId)
        );
      } else {
        setError("Errore durante l'eliminazione dell'annuncio.");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'annuncio:", error);
      setError("Non è stato possibile eliminare l'annuncio. Riprova.");
    }
  };

  const handleEditProperty = (propertyId) => {
    navigate(`/modifica-annuncio/${propertyId}`); // 🔥 Reindirizza correttamente alla pagina di modifica
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Gestione Annunci</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrizione</th>
            <th>Immagine</th>
            <th>Indirizzo</th>
            <th>Bagni</th>
            <th>Balconi</th>
            <th>Prezzo</th>
            <th>Superficie</th>
            <th>Tipo</th>
            <th>Titolo</th>
            <th>Zona</th>
            <th>User ID</th>
            <th>Immagini Annuncio</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.id}>
              <td>{prop.id}</td>
              <td>{prop.descrizione}</td>
              <td>
                <img
                  src={prop.image_url}
                  alt="Annuncio"
                  style={{ width: "50px" }}
                />
              </td>
              <td>{prop.indirizzo}</td>
              <td>{prop.numeroBagni}</td>
              <td>{prop.numeroBalconi}</td>
              <td>€{prop.prezzo.toLocaleString()}</td>
              <td>{prop.superficie} mq</td>
              <td>{prop.tipo}</td>
              <td>{prop.titolo}</td>
              <td>{prop.zona}</td>
              <td>{prop.user?.id}</td>
              <td>{(prop.image_urls || []).join(", ")}</td>

              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEditProperty(prop.id)}
                >
                  Modifica
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProperty(prop.id)}
                >
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminProperties;
