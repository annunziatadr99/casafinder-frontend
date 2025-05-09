import { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, FormControl, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";
import HomeContent from "./HomeContent.jsx";

const NavBar = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/user/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          localStorage.setItem("userId", response.data.id);
          setNome(response.data.nome);
          setLoggedIn(true);
        } catch (error) {
          console.error("Errore nel recuperare i dati utente:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        }
      };
      fetchUserData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        { username, password }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("role", response.data.role); // 🔥 Salviamo il ruolo
        setNome(response.data.nome);
        setLoggedIn(true);
        setError("");

        // 🔥 Reindirizzamento in base al ruolo
        if (response.data.role === "ADMIN") {
          navigate("/admin"); // 🔥 Se è ADMIN, reindirizzalo al backoffice
        } else {
          navigate("/profile"); // 🔥 Se è USER, reindirizzalo alla sua area personale
        }
      } else {
        setError("Credenziali non valide. Riprova.");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      setError("Errore nel server. Riprova più tardi.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLoggedIn(false);
    setNome("");
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <Navbar className="navbar-custom" expand="lg">
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="navbar-nav me-auto">
            <Nav.Link as={Link} to="/" className="nav-item">
              Home
            </Nav.Link>

            {/* 🔥 Mostra Area Personale e Registrazione solo agli USER */}
            {localStorage.getItem("role") !== "ADMIN" && (
              <>
                <Nav.Link as={Link} to="/register" className="nav-item">
                  Registrazione
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-item">
                  Area Personale
                </Nav.Link>
              </>
            )}

            {/* 🔥 Mostra BackOffice solo agli ADMIN */}
            {localStorage.getItem("role") === "ADMIN" && (
              <Nav.Link as={Link} to="/admin" className="nav-item">
                BackOffice Admin
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

        {loggedIn ? (
          <Nav className="ml-auto d-flex align-items-center user-section">
            {localStorage.getItem("role") !== "ADMIN" && (
              <Nav.Link
                as={Link}
                to="/profile"
                className="d-flex align-items-center profile-section"
                onClick={handleProfileClick}
              >
                <i className="bi bi-person-circle user-icon"></i>
                <span className="user-name ms-2">Ciao, {nome}</span>
              </Nav.Link>
            )}
            <Button
              variant="danger"
              className="ms-2 btn-sm logout-button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        ) : (
          <Form className="d-flex login-form" onSubmit={handleLogin}>
            <FormControl
              type="text"
              placeholder="Username"
              className="input-custom me-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl
              type="password"
              placeholder="Password"
              className="input-custom me-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="btn-login me-2">
              Accedi
            </Button>
            <Button className="btn-register" as={Link} to="/register">
              Registrati
            </Button>
          </Form>
        )}

        {error && (
          <Alert variant="danger" className="w-100 text-center small mt-2">
            {error}
          </Alert>
        )}
      </Navbar>
      <HomeContent />
    </>
  );
};

export default NavBar;
