import { Route, Routes, useNavigate } from "react-router-dom"; // Rimuovi l'importazione di Router
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import axios from "axios";
import HomePage from "./Homepage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserData = async () => {
        try {
          await axios.get("http://localhost:8080/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Utente verificato correttamente, nessuna azione necessaria
        } catch (error) {
          console.error("Errore nel verificare il token:", error);
          localStorage.removeItem("token");
          navigate("/"); // Reindirizza alla home se il token non è valido
        }
      };
      fetchUserData();
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
