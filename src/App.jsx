import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import axios from "axios";
import HomePage from "./Homepage";
import RegisterForm from "./components/RegisterForm";
import SearchResultsPage from "./components/searchResultsPage";
import DettaglioAnnuncio from "./components/DettaglioAnnuncio";
import AreaPersonale from "./components/AreaPersonale";
import ModificaAnnuncio from "./components/ModificaAnnuncio";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminUsers from "./components/admin/AdminUsers";
import AdminProperties from "./components/admin/AdminProperties";
import AdminEmails from "./components/admin/AdminEmails";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

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

    // 🔥 Protezione accesso al backoffice: solo gli ADMIN possono accedere
    if (window.location.pathname.startsWith("/admin") && role !== "ADMIN") {
      navigate("/"); // Reindirizza gli USER alla home se provano ad accedere al backoffice
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/annuncio/:id" element={<DettaglioAnnuncio />} />
          <Route path="/profile" element={<AreaPersonale />} />
          <Route path="/modifica-annuncio/:id" element={<ModificaAnnuncio />} />

          {/* 🔥 Percorsi per il BackOffice */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route path="/admin/emails" element={<AdminEmails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
