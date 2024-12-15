import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error('Failed to verify session:', error);
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const cardsData = [
    { image: 'chrome 1.jpg', title: 'Chrome Hearts Premium Shirt', description: 'Embrace sleek fashion with this premium Chrome Hearts shirt.' },
    { image: 'chrome 2.jpg', title: 'Chrome Hearts Lit Shirt', description: 'Upgrade your casual look with the trendy Chrome Hearts lit shirt.' },
    { image: 'chrome 3.jpg', title: 'Chrome Hearts x Long Sleeve', description: 'Keep it cozy and stylish with the Chrome Hearts long sleeve.' },
    { image: 'chrome 4.jpg', title: 'Chrome Hearts Jacket', description: 'Elevate your outerwear game with this classic Chrome Hearts jacket.' },
    { image: 'chrome 5.jpg', title: 'Chrome Hearts Denim Pants', description: 'Add bold character to your outfit with Chrome Hearts denim pants.' },
    { image: 'chrome 6.jpg', title: 'Chrome Hearts Cargo Shorts', description: 'Stay cool and versatile with Chrome Hearts cargo shorts.' },
    { image: 'chrome 7.jpg', title: 'Chrome Hearts Skinny Jeans', description: 'Flaunt your edgy style with these sleek Chrome Hearts skinny jeans.' },
    { image: 'chrome 8.jpg', title: 'Chrome Hearts Casual Shorts', description: 'Perfect for laid-back days, these Chrome Hearts casual shorts blend comfort and style.' },
];


  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#343a40', padding: '10px' }}>
        <Container>
          <Navbar.Brand as={Link} to="/dashboard" style={{ color: '#fff', fontWeight: 'bold' }}>Chrome Hearts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard/logbook" style={{ color: '#fff' }}>Employee's Records</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title={user?.username || 'Account'} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
      <h2 
  className="mt-4 text-center flex items-center justify-center h-full"
>
  Welcome to Chrome Hearts Apparel, {user ? user.username : 'Guest'}!
</h2>

        <Row>
          {cardsData.map((card, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Img variant="top" src={card.image} alt={card.title} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
