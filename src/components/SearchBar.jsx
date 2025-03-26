import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [prezzo, setPrezzo] = useState("");
  const [tipo, setTipo] = useState("AFFITTO");
  const [zona, setZona] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      prezzo: prezzo || "",
      tipo: tipo || "",
      zona: zona || "",
      indirizzo: indirizzo || "",
    }).toString();

    navigate(`/search-results?${queryParams}`);
  };

  return (
    <Form onSubmit={handleSearch} className="search-bar-wrapper">
      <Row className="align-items-center">
        {/* Riquadro Prezzo */}
        <Col xs={3}>
          <Form.Control
            type="number"
            placeholder="Prezzo"
            value={prezzo}
            onChange={(e) => setPrezzo(e.target.value)}
            className="form-control-custom"
          />
        </Col>

        {/* Riquadro Tipo */}
        <Col xs={3}>
          <Form.Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="form-control-custom"
          >
            <option value="AFFITTO">Affitto</option>
            <option value="VENDITA">Vendita</option>
          </Form.Select>
        </Col>

        {/* Riquadro Zona */}
        <Col xs={3}>
          <Form.Control
            type="text"
            placeholder="Zona"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="form-control-custom"
          />
        </Col>

        {/* Riquadro Indirizzo */}
        <Col xs={3}>
          <Form.Control
            type="text"
            placeholder="Indirizzo"
            value={indirizzo}
            onChange={(e) => setIndirizzo(e.target.value)}
            className="form-control-custom"
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={12}>
          <Button type="submit" className="btn-search">
            Cerca
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
