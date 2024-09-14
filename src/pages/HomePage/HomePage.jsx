import './HomePage.css';
import { useState, useEffect } from "react";
import { Carousel, Card, Col, Row } from 'react-bootstrap';
import HabitsService from "../../services/habits.service";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported

function HomePage() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    HabitsService.getAll().then((response) => {
      setHabits(response.data);
    }).catch(error => {
      console.error("There was an error fetching the habits!", error);
    });
  }, []);

  return (
    <div className="home-page">
      <h1 className="main-heading">Master your <span className="highlight">Habits</span></h1>

      <Carousel>
        {habits.map(habit => (
          <Carousel.Item key={habit._id}>
            <img
              className="d-block w-100"
              src={habit.displayedPicture || 'https://via.placeholder.com/800x400'}
              alt={habit.name}
            />
            <Carousel.Caption>
              <h3>{habit.name}</h3>
              <p>{habit.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="card-container">
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <Card>
              <Card.Body>
                <Card.Title>What is a Habit?</Card.Title>
                <Card.Text>
                  Learn about the concept of habits and why they are essential for personal growth.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <Card>
              <Card.Body>
                <Card.Title>How to Develop a Habit?</Card.Title>
                <Card.Text>
                  Discover strategies and tips to build and maintain new habits effectively.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <Card>
              <Card.Body>
                <Card.Title>Success Stories</Card.Title>
                <Card.Text>
                  Read inspiring stories of individuals who have successfully changed their habits.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
