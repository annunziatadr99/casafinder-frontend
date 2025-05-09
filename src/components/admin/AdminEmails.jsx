import { useState, useEffect } from "react";
import { Container, Table, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminEmails = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/"); // 🔥 Protezione: solo gli ADMIN possono accedere
    }

    const fetchEmails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/admin/emails",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmails(response.data);
      } catch (error) {
        console.error("Errore nel recuperare le email:", error);
        setError("Errore nel recuperare le email. Riprova più tardi.");
      }
    };

    fetchEmails();
  }, [navigate]);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Gestione Email</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mittente</th>
            <th>Destinatario</th>
            <th>Oggetto</th>
            <th>Contenuto</th>
            <th>Ora Invio</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td>{email.id}</td>
              <td>{email.sender}</td>
              <td>{email.recipient}</td>
              <td>{email.subject}</td>
              <td>{email.content}</td>
              <td>{new Date(email.sentAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminEmails;
