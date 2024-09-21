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
    const navigate = useNavigate();

    useEffect(() => {
        trackerService
            .getAll()
            .then((response) => setUserHabits(response.data))
            .catch((error) => setErrorMessage('Failed to fetch user habits.'));
    }, []);

    // Delete habit function
    const handleDeleteHabit = async (habitId) => {
        console.log(habitId);
        try {
            // Fetch all habit trackers related to the habit
            const habitTrackers = await trackerService.getAllForAHabit(habitId);
            const taskTrackerIds = habitTrackers.data.map(tracker => tracker._id); // Extract task tracker IDs
            
            // Delete habit tracker
            await habitsService.deleteHabitTracker(habitId);
            
            // Delete all task trackers
            await habitsService.deleteAllTaskTrackers(taskTrackerIds);
            
            // Fetch updated habits to refresh the page
            const updatedHabits = await trackerService.getAll();
            setUserHabits(updatedHabits.data);
            
        } catch (error) {
            setErrorMessage('Failed to delete habit.');
        }
    };    

    return (
        <Container className="your-habits-page">
            <h1 className="text-center">Your Habits</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {console.log(userHabits)}
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
