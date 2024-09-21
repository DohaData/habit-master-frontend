import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/auth.context';
import habitsService from '../../services/habits.service';
import './HabitsPage.css'; // Ensure this file exists for styling

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [defaultTasks, setDefaultTasks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    habitsService
      .getAll()
      .then((response) => setHabits(response.data))
      .catch((error) => console.error('There was an error fetching the habits!', error));
  }, []);

  const handleCreateHabit = (e) => {
    e.preventDefault();
    const habitData = { 
      name: newHabit, 
      description, 
      frequency, 
      defaultTasks 
    };

    habitsService
      .createOne(habitData)
      .then(() => {
        setSuccessMessage('Habit added successfully!');
        setNewHabit('');
        setDescription('');
        setFrequency('');
        setDefaultTasks('');
        return habitsService.getAllHabits(); // Refresh the list of habits
      })
      .then((response) => setHabits(response.data))
      .catch(() => setErrorMessage('Failed to add habit. Please try again.'));
  };

  const addHabitForUser = (habitId) => {
    habitsService
      .addHabitForUser(habitId)
      .then(() => setSuccessMessage('Habit added successfully!'))
      .catch(() => setErrorMessage('Failed to add habit. Please try again.'));
  }

  return (
    <Container className="habits-page">
      <h1 className="text-center">Habits</h1>

      <Row className="mb-4">
        {habits.map((habit) => (
          <Col xs={12} md={4} key={habit._id} className="mb-3">
            {/* Wrap the Card in a Link */}
              <Card className="habit-card">
                <Card.Body>
                  <Card.Title>{habit.name}</Card.Title>
                  {isLoggedIn && <Button variant="primary" onClick={() => addHabitForUser(habit._id)}>Add Habit</Button>}
                </Card.Body>
              </Card>
          </Col>
        ))}
      </Row>

      {isLoggedIn && (
        <Row className="add-habit-form">
          <Col>
            <h2>Add a New Habit</h2>
            <Form onSubmit={handleCreateHabit}>
              {/* Form fields */}
              {/* Habit Name */}
              <Form.Group controlId="formHabitName">
                <Form.Label>Habit Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter habit name"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                />
              </Form.Group>

              {/* Habit Description */}
              <Form.Group controlId="formHabitDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter habit description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              {/* Habit Frequency */}
              <Form.Group controlId="formHabitFrequency">
                <Form.Label>Frequency</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter habit frequency (e.g., daily, weekly)"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                />
              </Form.Group>

              {/* Default Tasks */}
              <Form.Group controlId="formDefaultTasks">
                <Form.Label>Default Tasks</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter default tasks"
                  value={defaultTasks}
                  onChange={(e) => setDefaultTasks(e.target.value)}
                />
              </Form.Group>

              {successMessage && <p className="success-message">{successMessage}</p>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <Button variant="primary" type="submit">Add Habit</Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HabitsPage;
