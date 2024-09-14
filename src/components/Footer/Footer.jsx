import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
          </Col>
          <Col md={6}>
            <Nav className="justify-content-end">
              <Nav.Link href="#" className="text-white">Privacy Policy</Nav.Link>
              <Nav.Link href="#" className="text-white">Terms of Service</Nav.Link>
              <Nav.Link href="#" className="text-white">Contact</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
