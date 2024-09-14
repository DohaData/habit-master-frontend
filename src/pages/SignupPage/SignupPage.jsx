import "./SignupPage.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handlePicture = (e) => setPicture(e.target.files[0]);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('gender', gender);
    if (picture) formData.append('picture', picture);

    authService.signup(formData)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An error occurred.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container className="SignupPage">
      <h1 className="main-heading">Sign Up</h1>

      <Form onSubmit={handleSignupSubmit}>
        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm={2}>Name</Form.Label>
          <Col sm={10}>
            <Form.Control 
              type="text" 
              value={name} 
              onChange={handleName} 
              placeholder="Enter your name" 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={handleEmail} 
              placeholder="Enter your email" 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPassword">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={handlePassword} 
              placeholder="Enter your password" 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAge">
          <Form.Label column sm={2}>Age</Form.Label>
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
          <Form.Label column sm={2}>Gender</Form.Label>
          <Col sm={10}>
            <Form.Control 
              as="select" 
              value={gender} 
              onChange={handleGender}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPicture">
          <Form.Label column sm={2}>Profile Picture</Form.Label>
          <Col sm={10}>
            <Form.Control 
              type="file" 
              onChange={handlePicture} 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Col>
        </Form.Group>
      </Form>

      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

      <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
    </Container>
  );
}

export default SignupPage;
