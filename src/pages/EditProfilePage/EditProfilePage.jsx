import "./EditProfilePage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
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

// EditProfilePage Component
function EditProfilePage() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [preview, setPreview] = useState(null); // For preview image

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user data from the backend and pre-fill the form
    authService
      .getUserProfile()
      .then((response) => {
        const { name, age, gender, picture } = response.data;
        setName(name);
        setAge(age);
        setGender(gender);
        // If the picture is a URL or blob, handle it accordingly
        // For demo, assuming picture is a URL
        setPicture(picture); 
      })
      .catch((error) => {
        setErrorMessage(
          `Failed to load profile data: ${error.response?.data?.message}`
        );
      });
  }, []);

  useEffect(() => {
    // Generate preview URL when picture is set
    if (picture && picture instanceof File) {
      const objectUrl = URL.createObjectURL(picture);
      setPreview(objectUrl);

      // Clean up object URL when component unmounts or picture changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [picture]);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handlePicture = (e) => {
    if (e.target.files.length > 0) {
      setPicture(e.target.files[0]);
    }
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    if (picture) formData.append("picture", picture);

    authService
      .updateUserProfile(formData)
      .then(() => {
        setSuccessMessage("Profile updated successfully.");
        setTimeout(() => navigate("/profile"), 2000); // Redirect after 2 seconds
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "An error occurred.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <ErrorBoundary>
      <Container className="EditProfilePage">
        <h1 className="main-heading">Edit Profile</h1>

        <Form onSubmit={handleEditProfileSubmit}>
          <Form.Group as={Row} controlId="formName">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={name}
                onChange={handleName}
                placeholder="Enter your name"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePassword}
                placeholder="Enter new password"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAge">
            <Form.Label column sm={2}>
              Age
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                value={age}
                onChange={handleAge}
                placeholder="Enter your age"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formGender">
            <Form.Label column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Control as="select" value={gender} onChange={handleGender}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPicture">
            <Form.Label column sm={2}>
              Profile Picture
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="file" onChange={handlePicture} />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  width="100"
                  className="mt-2"
                />
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Col>
          </Form.Group>
        </Form>

        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success" className="mt-3">
            {successMessage}
          </Alert>
        )}
      </Container>
    </ErrorBoundary>
  );
}

export default EditProfilePage;
