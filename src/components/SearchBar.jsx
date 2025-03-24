import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [prezzo, setPrezzo] = useState("");
  const [tipo, setTipo] = useState("AFFITTO");
  const [combinedInput, setCombinedInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const [zona, indirizzo, superficie, numeroBagni] = combinedInput
      .split(",")
      .map((item) => item.trim());

    const queryParams = new URLSearchParams({
      prezzo: prezzo || "",
      tipo: tipo || "",
      zona: zona || "",
      indirizzo: indirizzo || "",
      superficie: superficie || "",
      numeroBagni: numeroBagni || "",
    }).toString();

    navigate(`/search-results?${queryParams}`);
  };

  return (
    <Form onSubmit={handleSearch} className="search-bar-wrapper">
      <Row className="align-items-center">
        <Col xs={3}>
          <Form.Control
            type="number"
            placeholder="Prezzo"
            value={prezzo}
            onChange={(e) => setPrezzo(e.target.value)}
            className="form-control-custom"
          />
        </Col>
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
        <Col xs={4}>
          <Form.Control
            type="text"
            placeholder="Zona, Indirizzo, Metro, N. Bagni"
            value={combinedInput}
            onChange={(e) => setCombinedInput(e.target.value)}
            className="form-control-custom"
          />
        </Col>
        <Col xs={2}>
          <Button type="submit" className="btn-search">
            Cerca
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
