import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios"; // Assicurati di installare axios con "npm install axios"
import "../index.css"; // Assicurati di importare il CSS correttamente

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    username: "",
    password: "",
    email: "",
    telefono: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/registrazione",
        formData
      );
      if (response.data.message) {
        setSuccess(true);
        setError("");
      } else {
        setError("Registrazione fallita. Riprova.");
      }
    } catch (error) {
      console.error("Registrazione error:", error);
      setError("Errore nel server. Riprova più tardi.");
    }
  };

  return (
    <div className="register-page">
      <Container className="my-5">
        <p className="register-intro">
          Registrati per usufruire di tutti i vantaggi offerti da CasaFinder
        </p>
        <Form onSubmit={handleSubmit} className="register-form p-4">
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCognome">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci cognome"
              name="cognome"
              value={formData.cognome}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTelefono" className="mb-4">
            {" "}
            {/* Aggiungi un margine inferiore */}
            <Form.Label>Numero di Telefono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Inserisci numero di telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="btn-register">
            Registrati
          </Button>
        </Form>
        {success && (
          <Alert variant="success" className="mt-3">
            Registrazione effettuata con successo!
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default RegisterForm;
