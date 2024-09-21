import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import trackerService from "../../services/tracker.service";
// import './YourHabitsPage.css'; // Ensure styling is set

const YourHabitsPage = () => {
  const [userHabitsTrackers, setuserHabitsTrackers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    trackerService
      .getAll()
      .then((response) => {
        setuserHabitsTrackers(response.data);
        console.log(response.data);
      })
      .catch((error) =>
        setErrorMessage(`Failed to fetch user habits. ${error.message}`)
      );
  }, []);

  // Delete habit function
  const handleDeleteHabit = async (habitId) => {
    console.log(habitId);
    try {
      // Fetch all habit trackers related to the habit
      const habitTrackers = await trackerService.getAllForAHabit(habitId);
      console.log(habitTrackers);
      const taskTrackerIds = habitTrackers.data.taskTrackerIds;

      // Delete habit tracker
      await trackerService.deleteHabitTracker(habitId);

      // Delete all task trackers
      await trackerService.deleteAllTaskTrackers(taskTrackerIds);

      // Fetch updated habits to refresh the page
      const updatedHabits = await trackerService.getAll();
      setuserHabitsTrackers(updatedHabits.data);
    } catch (error) {
      setErrorMessage(`Failed to delete habit. ${error.message}`);
    }
  };

  return (
    <Container className="your-habits-page">
      <h1 className="text-center">Your Habits</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Row className="mb-4">
        {userHabitsTrackers.map((habitsTracker) => (
          <Col xs={12} md={4} key={habitsTracker.habitId._id} className="mb-3">
            <Card className="habit-card">
              <Card.Body>
                <Card.Title>{habitsTracker.habitId.name}</Card.Title>
                <Card.Text>{habitsTracker.habitId.description}</Card.Text>
                <Card.Text>
                  Frequency: {habitsTracker.habitId.frequency}
                </Card.Text>

                {/* See Progress Button */}
                <Link to={`/your-habit-progress/${habitsTracker.habitId._id}`}>
                  <Button variant="success" className="mb-2">
                    See Progress
                  </Button>
                </Link>

                {/* Delete Habit Button */}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteHabit(habitsTracker.habitId._id)}
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
