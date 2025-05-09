import { useState, useEffect } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    console.log("Ruolo salvato nel LocalStorage:", role); // 🔥 Debug
    console.log("Token salvato nel LocalStorage:", token); // 🔥 Debug

    if (role !== "ADMIN") {
      navigate("/"); // 🔥 Protezione: solo gli ADMIN possono accedere
    }

    if (!token) {
      setError("Autenticazione richiesta. Effettua il login.");
      return;
    }

    const fetchUsers = async () => {
      try {
        console.log("Token inviato nella richiesta a /api/admin/users:", token); // 🔥 Debug
        const response = await axios.get(
          "http://localhost:8080/api/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Risposta API utenti:", response.data); // 🔥 Debug
        setUsers(response.data);
      } catch (error) {
        console.error("Errore nel recuperare gli utenti:", error.response);
        setError(
          "Errore nel recuperare gli utenti. Assicurati di essere autenticato e riprova."
        );
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Autenticazione richiesta. Effettua il login.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/api/admin/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        setError("Errore durante l'eliminazione dell'utente.");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'utente:", error);
      setError("Non è stato possibile eliminare l'utente. Riprova.");
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Gestione Utenti</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
            <th>Password</th>
            <th>Telefono</th>
            <th>Username</th>
            <th>Ruolo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.cognome}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.telefono}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
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

export default AdminUsers;
