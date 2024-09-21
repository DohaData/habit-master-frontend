import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import habitsService from '../../services/habits.service';
import trackerService from '../../services/tracker.service';
// import './YourHabitsPage.css'; // Ensure styling is set

const YourHabitsPage = () => {
  const [userHabits, setUserHabits] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      trackerService
        .getAll ()
        .then((response) => setUserHabits(response.data))
        .catch((error) => setErrorMessage('Failed to fetch user habits.'));
    }
  }, [isLoggedIn, navigate, user]);

// Delete habit function
const handleDeleteHabit = (habitId) => {
    habitsService
        .getAllTaskTrackers(habitId) // Query all habit trackers for this user and habit
        .then((response) => {
            const taskTrackerIds = response.data.map((tracker) => tracker._id);
            return habitsService.deleteAllTaskTrackers(taskTrackerIds); // Delete all task trackers
        })
        .then(() => {
            return habitsService.deleteUserHabit(habitId); // Delete the habit tracker for this user and habit
        })
        .then(() => {
            setUserHabits((prevHabits) =>
                prevHabits.filter((habit) => habit._id !== habitId)
            );
        })
        .catch((error) => setErrorMessage('Failed to delete habit.'));
};

  return (
    <Container className="your-habits-page">
      <h1 className="text-center">Your Habits</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Row className="mb-4">
        {userHabits.map((habit) => (
          <Col xs={12} md={4} key={habit._id} className="mb-3">
            <Card className="habit-card">
              <Card.Body>
                <Card.Title>{habit.name}</Card.Title>
                <Card.Text>{habit.description}</Card.Text>
                <Card.Text>Frequency: {habit.frequency}</Card.Text>

                {/* See Progress Button */}
                <Link to={`/YourHabitProgress/${habit._id}`}>
                  <Button variant="success" className="mb-2">
                    See Progress
                  </Button>
                </Link>

                {/* Delete Habit Button */}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteHabit(habit._id)}
                >
                  Delete Habit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default YourHabitsPage;
