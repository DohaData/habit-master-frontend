import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css";

function CustomNavbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-title">
          Habits<span className="brand-highlight">Master</span>
        </Navbar.Brand>

        {/* Hamburger menu (navbar toggle) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible navbar */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/habits" className="nav-link-custom">
              Habits
            </Nav.Link>
            <Nav.Link as={Link} to="/habits-tracker" className="nav-link-custom">
              Habits Tracker
            </Nav.Link>
            <Nav.Link as={Link} to="/your-habits" className="nav-link-custom">
              Your Habits
            </Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link
                  as={Link}
                  to="/edit-profile"
                  className="nav-link-custom"
                >
                  Edit Profile
                </Nav.Link>
                <Button
                  variant="outline-light"
                  onClick={logOutUser}
                  className="logout-button"
                >
                  Logout
                </Button>
                <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                  {user && user.name}
                </Nav.Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/signup" className="nav-link-custom">
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
