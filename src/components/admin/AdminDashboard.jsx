import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/"); // 🔥 Se l'utente non è ADMIN, reindirizziamo alla home
    }
  }, [navigate]);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">BackOffice Admin</h1>

      <Row className="g-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Gestione Utenti</Card.Title>
              <Card.Text>
                Visualizza e gestisci gli utenti registrati.
              </Card.Text>
              <Button as={Link} to="/admin/users" variant="primary">
                Vai
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Gestione Annunci</Card.Title>
              <Card.Text>
                Modifica, elimina e gestisci le proprietà pubblicate.
              </Card.Text>
              <Button as={Link} to="/admin/properties" variant="success">
                Vai
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Gestione Email</Card.Title>
              <Card.Text>Visualizza le email inviate dagli utenti.</Card.Text>
              <Button as={Link} to="/admin/emails" variant="warning">
                Vai
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
