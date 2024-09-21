import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import trackerService from '../../services/tracker.service';
import './HabitsTrackerPage.css';

const HabitsTrackerPage = () => {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksForDay, setTasksForDay] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    trackerService
      .getAll()
      .then((response) => {
        setHabits(response.data);  // Store fetched tasks
      })
      .catch((error) => console.error('There was an error fetching the habits!', error));
  }, []);

  // Function to handle date change in the calendar
  const onDateChange = (date) => {
    setSelectedDate(date);

    // Filter tasks for the selected date
    const tasksOnSelectedDate = habits.filter((habit) => {
      for (let taskTracker of habit.taskTrackerIds) {
        let taskDate = new Date(taskTracker.date);
        if (
            taskDate.getFullYear() === date.getFullYear() &&
            taskDate.getMonth() === date.getMonth() &&
            taskDate.getDate() === date.getDate()
        ) {
          return true;
        }
    }
    });

    setTasksForDay(tasksOnSelectedDate);  // Update tasks for selected date
  };

  return (
    <Container className="habits-page">
      <h1 className="text-center">Habits Tracker</h1>
      
      <Row>
        <Col md={6} className="calendar-col">
          <h3 className="text-center">Select a Date</h3>
          <Calendar onChange={onDateChange} value={selectedDate} />
        </Col>

        <Col md={6} className="tasks-col">
          <h3 className="text-center">Tasks for {selectedDate.toDateString()}</h3>
          {tasksForDay.length > 0 ? (
            tasksForDay.map((task) => (
              <Card key={task._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{task.habitId.name}</Card.Title>
                  <Card.Text>{task.habitId.description}</Card.Text>
                  <Card.Text>
                    <strong>Task:</strong> {task.taskTrackerIds[0].taskId.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Status:</strong> {task.taskTrackerIds[0].isCompleted ? 'Completed' : 'Pending'}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">No tasks for this day.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HabitsTrackerPage;
