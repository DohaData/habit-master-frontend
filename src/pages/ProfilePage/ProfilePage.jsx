import "./ProfilePage.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import authService from "../../services/auth.service";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// ProfilePage Component
function ProfilePage() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    // Fetch current user data from the backend
    authService
      .getUserProfile()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setErrorMessage(
          `Failed to load profile data: ${error.response?.data?.message}`
        );
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Optionally, show a loading spinner or message
  }

  const { name, age, gender, picture } = user;

  return (
    <ErrorBoundary>
      <Container className="ProfilePage">
        <h1 className="main-heading">Profile</h1>

        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}

        <Row>
          <Col md={4}>
            {picture && (
              <img
                src={picture}
                alt="Profile"
                width="100%"
                className="profile-picture"
              />
            )}
          </Col>
          <Col md={8}>
            <h2>{name}</h2>
            <p>
              <strong>Age:</strong> {age}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
  );
}

export default ProfilePage;
