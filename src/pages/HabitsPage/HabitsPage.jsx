// pages/HabitsPage/HabitsPage.jsx
import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/auth.context';
import habitsService from '../../services/habits.service';
import './HabitsPage.css'; // Ensure this file exists for styling

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    habitsService
      .getAll()
      .then((response) => setHabits(response.data))
      .catch((error) => console.error('There was an error fetching the habits!', error));
  }, []);

  const handleCreateHabit = (e) => {
    e.preventDefault();
    const habitData = { name: newHabit };

    habitsService
      .createOne(habitData)
      .then(() => {
        setSuccessMessage('Habit added successfully!');
        setNewHabit('');
        return habitsService.getAllHabits(); // Refresh the list of habits
      })
      .then((response) => setHabits(response.data))
      .catch((error) => setErrorMessage('Failed to add habit. Please try again.'));
  };

  return (
    <Container className="habits-page">
      <h1 className="text-center">Habits</h1>

      <Row className="mb-4">
        {habits.map((habit) => (
          <Col xs={12} md={4} key={habit._id} className="mb-3">
            <Card className="habit-card">
              <Card.Body>
                <Card.Title>{habit.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {isAuthenticated && (
        <Row className="add-habit-form">
          <Col>
            <h2>Add a New Habit</h2>
            <Form onSubmit={handleCreateHabit}>
              <Form.Group controlId="formHabitName">
                <Form.Label>Habit Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter habit name"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                />
              </Form.Group>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <Button variant="primary" type="submit">Add Habit</Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HabitsPage;
